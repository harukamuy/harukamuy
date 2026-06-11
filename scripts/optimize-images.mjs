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
import { readdirSync, readFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const postsDir = join(root, "content/posts");
const imagesDir = join(root, "public/images");
const ogDir = join(imagesDir, "og");

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

  // OGP用JPG（横1200px・軽量。SNSカードは小さく表示されるので品質68で十分）
  if (isStale(ogPath, src)) {
    await sharp(src)
      .resize(1200, null, { withoutEnlargement: true })
      .jpeg({ quality: 68, mozjpeg: true })
      .toFile(ogPath);
    console.log(`  ✓ og/${base}.jpg`);
    ogMade++;
  } else {
    skipped++;
  }
}

console.log(
  `\n画像最適化: WebP ${webpMade}件 / OGP ${ogMade}件 / 最新のためスキップ ${skipped}件 / 元画像なし ${missing}件`
);
