// One-shot: scan all posts and add `tags:` to frontmatter based on filename keywords.
// Skips posts that already have a `tags:` line.
//
// Usage: node scripts/apply-tags.mjs

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../content/posts/", import.meta.url).pathname;

// 順序＝優先度。マッチしたものを集めて重複排除。
const rules = [
  { match: /gomamochi|gomazochi/, tags: ["ごまもち"] },
  { match: /high-dividend|dividend/, tags: ["高配当株", "配当投資"] },
  { match: /new-nisa/, tags: ["新NISA"] },
  { match: /nisa(?!.*new)/, tags: ["NISA"] },
  { match: /furusato/, tags: ["ふるさと納税"] },
  { match: /freelance|kokuho|tax-return|invoice/, tags: ["フリーランス"] },
  { match: /sidefire|fire/, tags: ["サイドFIRE"] },
  { match: /ideco/, tags: ["iDeCo"] },
  { match: /orukan|sp500|index|investment-start/, tags: ["インデックス投資"] },
  { match: /sbi|rakuten|monex|neobank/, tags: ["証券・銀行"] },
  { match: /jal-card/, tags: ["クレジットカード"] },
  { match: /market-crash|middle-east-shock/, tags: ["市場の話"] },
  { match: /single-woman|women-financial|30s/, tags: ["女性の資産形成"] },
  { match: /freee|mf/, tags: ["会計ツール"] },
  { match: /asset|monthly-living|emergency-fund/, tags: ["家計・資産管理"] },
  { match: /quit-job|video-producer|welcome/, tags: ["独立・キャリア"] },
];

const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
let updated = 0;
let skipped = 0;

for (const filename of files) {
  const path = join(dir, filename);
  const content = readFileSync(path, "utf8");

  // 既に tags: 行があればスキップ
  if (/^tags:\s*\[/m.test(content.split("---")[1] ?? "")) {
    skipped++;
    continue;
  }

  // ファイル名から該当タグを集める
  const slug = filename.replace(/\.md$/, "");
  const tagSet = new Set();
  for (const { match, tags } of rules) {
    if (match.test(slug)) tags.forEach((t) => tagSet.add(t));
  }
  if (tagSet.size === 0) {
    skipped++;
    continue;
  }

  const tagsLine = `tags: [${Array.from(tagSet).map((t) => `"${t}"`).join(", ")}]\n`;

  // frontmatter 末尾の --- の直前に挿入
  const lines = content.split("\n");
  let secondDashIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      secondDashIdx = i;
      break;
    }
  }
  if (secondDashIdx < 0) {
    skipped++;
    continue;
  }

  lines.splice(secondDashIdx, 0, tagsLine.trimEnd());
  writeFileSync(path, lines.join("\n"));
  updated++;
  console.log(`  ${filename} → [${Array.from(tagSet).join(", ")}]`);
}

console.log(`\n更新: ${updated}件 / スキップ: ${skipped}件`);
