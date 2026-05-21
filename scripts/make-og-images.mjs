// Generate small JPG copies of every post cover image for use as OGP images.
//
// X (Twitter), LINE などは OGP画像が大きすぎたり WebP だと表示しないことがある。
// 各記事の coverImage から public/images/og/<name>.jpg を作る（1200px幅・軽量JPG）。
// 記事を追加してカバー画像を増やしたら、このスクリプトを再実行すること:
//
//   node scripts/make-og-images.mjs
//
// 生成された og/*.jpg はリポジトリにコミットする（CIは画像変換ツールを持たないため）。

import { readdirSync, readFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const postsDir = join(root, "content/posts");
const imagesDir = join(root, "public/images");
const ogDir = join(imagesDir, "og");

if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true });

// 全記事の coverImage を集める
const covers = new Set();
for (const file of readdirSync(postsDir)) {
  if (!file.endsWith(".md")) continue;
  const fm = readFileSync(join(postsDir, file), "utf8").split("---")[1] ?? "";
  const m = fm.match(/coverImage:\s*"?\/images\/([^"\s]+)"?/);
  if (m) covers.add(m[1]);
}

let made = 0;
let skipped = 0;
let missing = 0;

for (const cover of covers) {
  const src = join(imagesDir, cover);
  const base = cover.replace(/\.[a-z]+$/i, "");
  const out = join(ogDir, `${base}.jpg`);

  if (!existsSync(src)) {
    console.log(`  ⚠ 元画像なし: ${cover}`);
    missing++;
    continue;
  }
  // 既に最新の og JPG があればスキップ
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) {
    skipped++;
    continue;
  }

  // sips: 長辺1200pxに縮小し、JPEG品質80で書き出す
  execFileSync("sips", [
    "-Z", "1200",
    "-s", "format", "jpeg",
    "-s", "formatOptions", "80",
    src,
    "--out", out,
  ], { stdio: "ignore" });
  console.log(`  ✓ og/${base}.jpg`);
  made++;
}

console.log(`\n生成: ${made}件 / スキップ: ${skipped}件 / 元画像なし: ${missing}件`);
