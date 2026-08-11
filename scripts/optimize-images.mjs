// 記事のカバー画像を自動最適化する（ビルド前に自動実行される）。
//
// やること:
//  - 各記事の coverImage について、表示用の軽量WebPを生成
//  - SNSシェア用のOGP画像（1200px・軽量JPG）を public/images/og/ に生成
//
// package.json の prebuild / predev フックから自動実行されるので、
// 記事を追加するときは画像を public/images/ に置くだけでよい。
// （元画像が .png / .jpg / .webp のいずれでも動く）

import sharp from "sharp";
import { readdirSync, readFileSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const postsDir = join(root, "content/posts");
const imagesDir = join(root, "public/images");
const ogDir = join(imagesDir, "og");
// OGP画像の実寸を書き出す先。og:image:width / height をここから読むことで、
// 宣言値と実物のズレ（Xがカードを描けない原因になる）を防ぐ。
const sizesPath = join(root, "lib/og-sizes.json");
// 1200×630に合わせたとき、余白を埋める色（ブログのアイボリー）
const OG_BG = { r: 243, g: 235, b: 220 };

if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true });

// 全記事の coverImage（フロントマター記載のまま）を集める
const covers = new Set();
for (const file of readdirSync(postsDir)) {
  if (!file.endsWith(".md")) continue;
  const fm = readFileSync(join(postsDir, file), "utf8").split("---")[1] ?? "";
  const m = fm.match(/coverImage:\s*"?\/images\/([^"\s]+)"?/);
  if (m) covers.add(m[1]);
}

const isStale = (out, src) =>
  !existsSync(out) || statSync(out).mtimeMs < statSync(src).mtimeMs;

// coverImage の拡張子違いも探す（フロントマターが .png でも実体が .webp 等のケースに対応）
const extCandidates = [".webp", ".png", ".jpg", ".jpeg", ".PNG", ".JPG"];

let webpMade = 0;
let ogMade = 0;
let skipped = 0;
let missing = 0;

for (const cover of covers) {
  const base = cover.replace(/\.[a-z]+$/i, "");

  // 元画像を探す（フロントマター記載のファイル → 同名の別拡張子）
  let src = null;
  for (const cand of [cover, ...extCandidates.map((e) => base + e)]) {
    const p = join(imagesDir, cand);
    if (existsSync(p)) {
      src = p;
      break;
    }
  }
  if (!src) {
    console.log(`  ⚠ 元画像が見つかりません: ${cover}`);
    missing++;
    continue;
  }

  const webpPath = join(imagesDir, `${base}.webp`);
  const ogPath = join(ogDir, `${base}.jpg`);

  // 表示用WebP（元がWebPそのものなら生成不要）
  if (src !== webpPath && isStale(webpPath, src)) {
    await sharp(src).webp({ quality: 82 }).toFile(webpPath);
    console.log(`  ✓ ${base}.webp`);
    webpMade++;
  }

  // OGP用JPG（1200×630ちょうど・軽量。SNSカードは小さく表示されるので品質68で十分）
  //
  // サイズを固定するのは、X が og:image:width / height の宣言値をもとにカードを
  // 組むため。実物とズレると画像を出さないことがある。1200×630 は X / Facebook /
  // LINE 共通の標準サイズ。
  //
  // fit: "contain" にしているのは、元画像が正方形や縦長のときに人物の頭が
  // 切れるのを避けるため。余った部分はブログの背景色で埋める。
  if (isStale(ogPath, src)) {
    await sharp(src)
      .resize(1200, 630, { fit: "contain", background: OG_BG })
      .flatten({ background: OG_BG })
      .jpeg({ quality: 68, mozjpeg: true })
      .toFile(ogPath);
    console.log(`  ✓ og/${base}.jpg`);
    ogMade++;
  } else {
    skipped++;
  }
}

// 生成済みのOGP画像すべての実寸を記録する（スキップしたものも含めて毎回作り直す）
const sizes = {};
for (const file of readdirSync(ogDir)) {
  if (!file.endsWith(".jpg")) continue;
  const { width, height } = await sharp(join(ogDir, file)).metadata();
  if (width && height) sizes[file.replace(/\.jpg$/, "")] = { w: width, h: height };
}
writeFileSync(sizesPath, JSON.stringify(sizes, null, 0) + "\n");

console.log(
  `\n画像最適化: WebP ${webpMade}件 / OGP ${ogMade}件 / 最新のためスキップ ${skipped}件 / 元画像なし ${missing}件`
);
console.log(`OGP実寸を記録: ${Object.keys(sizes).length}件 → lib/og-sizes.json`);
