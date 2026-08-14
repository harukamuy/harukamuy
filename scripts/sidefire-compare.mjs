// ═══════════════════════════════════════════════════════════════════
// 前月の保有CSVと比べて「株価が下がった銘柄」を出す。
//
// いちばん大事な仕事は **株式分割の除外**。
// 分割（1株→4株など）が起きると株価は見かけ上70%以上下がるので、
// 素直に比べると「大暴落した割安銘柄」に見えてしまう。
// 保有株数が同時に増えていれば分割と判定して、価格を補正する。
//
// 使い方: sidefire-brief.mjs から import して使う。単体では実行しない。
// ═══════════════════════════════════════════════════════════════════

import { existsSync, copyFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const ARCHIVE = "data/sidefire/archive";

// 日本株でよくある分割比率。ここにない比率は分割と判定されない。
const SPLIT_FACTORS = [1.5, 2, 2.5, 3, 4, 5, 10];

/** "2026-07" → "2026-06" */
export function prevStamp(stamp) {
  const [y, m] = stamp.split("-").map(Number);
  return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
}

/**
 * 分割比率を推定する。分割でなければ 1 を返す。
 * @param {number} sharesRatio 株数の倍率（今 ÷ 前月）
 * @param {number} priceRatio  株価の倍率（今 ÷ 前月）
 */
function detectSplit(sharesRatio, priceRatio) {
  // 株価がさほど下がっていない、または株数が増えていないなら分割ではない
  if (priceRatio > 0.75 || sharesRatio < 1.4) return 1;

  let best = 1;
  let bestErr = Infinity;
  for (const f of SPLIT_FACTORS) {
    // 分割なら株数はほぼ f 倍になっているはず（買い増し分があるので下限だけ見る）
    if (sharesRatio < f * 0.85) continue;
    // 補正後の株価が元に戻る（＝倍率が1に近づく）比率を採用
    const err = Math.abs(priceRatio * f - 1);
    if (err < bestErr && err < 0.3) {
      best = f;
      bestErr = err;
    }
  }
  return best;
}

/**
 * 前月と比較する。
 * @param {Record<string, {name:string, shares:number, value:number}>} pos 今月の保有
 * @param {string} stamp 今月（"2026-07"）
 * @returns {{ available: boolean, prev: string, rows: Object[], notes: string[] }}
 */
export function compareWithPrev(pos, stamp) {
  const prev = prevStamp(stamp);
  const path = `${ARCHIVE}/holdings-${prev}.csv`;
  if (!existsSync(path)) {
    return { available: false, prev, rows: [], notes: [] };
  }

  // 前月CSVを銘柄コードごとに集約（特定とNISAが別行になっているため）
  const before = {};
  for (const h of parseHoldingsCsv(path).holdings) {
    if (h.kind !== "stock" || !h.code) continue;
    const b = (before[h.code] ??= { shares: 0, value: 0 });
    b.shares += h.shares;
    b.value += h.value;
  }

  const rows = [];
  const notes = [];

  for (const [code, p] of Object.entries(pos)) {
    const b = before[code];
    if (!b || !b.shares || !p.shares) {
      rows.push({ code, name: p.name, isNew: true });
      continue;
    }

    const nowPrice = p.value / p.shares;
    const rawPrevPrice = b.value / b.shares;
    const sharesRatio = p.shares / b.shares;
    const rawPriceRatio = nowPrice / rawPrevPrice;

    const split = detectSplit(sharesRatio, rawPriceRatio);
    const prevPrice = rawPrevPrice / split; // 分割後の株価に揃える
    const chgPct = (nowPrice / prevPrice - 1) * 100;

    // 株数が減っている＝売却か株式併合。売らない方針なので、出たら人が確認する
    if (sharesRatio < 0.98) {
      notes.push(
        `${code} ${p.name}：株数が ${b.shares} → ${p.shares} に減っています（株式併合か売却。要確認）`
      );
    }

    rows.push({
      code, name: p.name, nowPrice, prevPrice, chgPct, split,
      addedShares: p.shares - b.shares * split,
      isNew: false,
    });
  }

  for (const r of rows.filter((x) => x.split > 1)) {
    notes.push(
      `${r.code} ${r.name}：**${r.split}分割**を検出したので補正済み（補正しないと ${((1 / r.split - 1) * 100).toFixed(0)}% の暴落に見えます）`
    );
  }

  return { available: true, prev, rows, notes };
}

/** 今月のCSVを archive/ に保存する（次回の比較用） */
export function archiveCurrent(csvPath, stamp) {
  const dest = `${ARCHIVE}/holdings-${stamp}.csv`;
  if (existsSync(dest)) return { saved: false, dest };
  copyFileSync(csvPath, dest);
  return { saved: true, dest };
}
