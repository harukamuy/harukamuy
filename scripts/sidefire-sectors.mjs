// ═══════════════════════════════════════════════════════════════════
// 日本の高配当株の「業種別内訳」と「年率リスク」を計算して
// components/sidefireSectors.ts を書き出す。
//   実行: node scripts/sidefire-sectors.mjs
//   入力: data/sidefire/input/holdings.csv（証券CSV／非公開）
//         data/sidefire/sectors.json（銘柄コード→業種／非公開）
//   出力: components/sidefireSectorData.ts（集計値だけ。これはコミットする）
//         ※ 表示側は components/SideFireSectors.tsx。
//           macOSはファイル名の大文字小文字を区別しないので、
//           この2つは大文字小文字だけが違う名前にしないこと。
//
// ※ data/ は .gitignore 済み。個別銘柄名・保有株数は出力に含めない。
//
// 【sectors.json の更新方法】銘柄を買い増して未収録コードが出たとき:
//   1. JPXの「東証上場銘柄一覧」をダウンロード
//      https://www.jpx.co.jp/markets/statistics-equities/misc/tvdivq0000001vg2-att/data_j.xls
//   2. 「コード」「33業種区分」「17業種区分」を {code:{s33,s17}} の形にして
//      data/sidefire/sectors.json の map に入れる
//   3. ETF（業種区分が「-」）は中身のテーマで手当てする（例: 1343→不動産業）
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const CSV = "data/sidefire/input/holdings.csv";
const SECTORS = "data/sidefire/sectors.json";
const OUT = "components/sidefireSectorData.ts";

// ── 景気敏感 / ディフェンシブ の分け方（東証33業種ベース）──
// ディフェンシブ＝景気が悪くても需要が大きく減らない業種。それ以外を景気敏感とする。
// 金融（銀行・保険・証券）は景気に左右される側に入れている。
const DEFENSIVE_33 = new Set([
  "食料品", "医薬品", "電気・ガス業", "情報・通信業",
  "陸運業", "小売業", "サービス業", "水産・農林業",
]);

// ── 表示の粒度 ──
// 基本は東証17業種。ただし17業種のなかで景気敏感とディフェンシブが混ざる区分は、
// 塗り分けができなくなるので33業種まで分解する。
const SPLIT_17 = new Set(["情報通信・サービスその他", "運輸・物流"]);

// ═══ 1. 保有を読む ═══
const { holdings } = parseHoldingsCsv(CSV);
const pos = {};
for (const h of holdings) {
  if (h.kind !== "stock" || !h.code) continue;
  pos[h.code] = (pos[h.code] || 0) + h.value;
}
const codes = Object.keys(pos);
const total = codes.reduce((s, c) => s + pos[c], 0);

// ═══ 2. 業種をつける ═══
const { map: SEC } = JSON.parse(readFileSync(SECTORS, "utf8"));
const missing = codes.filter((c) => !SEC[c]);
if (missing.length) {
  console.error(`\n❌ 業種が分からない銘柄が ${missing.length} 件あります: ${missing.join(", ")}`);
  console.error("   → このファイル冒頭の「sectors.json の更新方法」を見て追加してください。\n");
  process.exit(1);
}
const bucketOf = (c) => (DEFENSIVE_33.has(SEC[c].s33) ? "defensive" : "cyclical");
const labelOf = (c) => (SPLIT_17.has(SEC[c].s17) ? SEC[c].s33 : SEC[c].s17);

// ═══ 3. 集計 ═══
const agg = {};
for (const c of codes) {
  const k = labelOf(c);
  agg[k] ??= { name: k, value: 0, count: 0, bucket: bucketOf(c) };
  agg[k].value += pos[c];
  agg[k].count += 1;
}
const sectors = Object.values(agg)
  .map((s) => ({ ...s, manYen: Math.round(s.value / 10000), pct: +((s.value / total) * 100).toFixed(1) }))
  .sort((a, b) => b.value - a.value);

// 万円は「部分を足すと全体に一致する」ように丸める。
// 素直に四捨五入すると 978+338=1316（総額1315）となり、読者が足し算すると合わなくなるため、
// 小さいほうを四捨五入し、大きいほうは差で埋める。
const split = { cyclical: { yen: 0, count: 0 }, defensive: { yen: 0, count: 0 } };
for (const c of codes) {
  const b = bucketOf(c);
  split[b].yen += pos[c];
  split[b].count += 1;
}
const totalMan = Math.round(total / 10000);
split.defensive.manYen = Math.round(split.defensive.yen / 10000);
split.cyclical.manYen = totalMan - split.defensive.manYen;
for (const b of ["cyclical", "defensive"]) {
  // ％も、表示する万円から計算した値にそろえる（読者が割り算しても一致する）
  split[b].pct = +((split[b].manYen / totalMan) * 100).toFixed(1);
  delete split[b].yen;
}

// ═══ 4. 年率リスク（直近1年・日次）═══
const std = (a) => {
  const m = a.reduce((x, y) => x + y, 0) / a.length;
  return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1));
};
async function series(sym) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=1y&interval=1d`;
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const x = (await r.json())?.chart?.result?.[0];
  const ts = x?.timestamp || [];
  const cl = x?.indicators?.adjclose?.[0]?.adjclose || x?.indicators?.quote?.[0]?.close || [];
  const m = new Map();
  ts.forEach((t, i) => { if (cl[i] != null) m.set(new Date(t * 1000).toISOString().slice(0, 10), cl[i]); });
  return m;
}

console.log("株価を取得中…");
const px = {};
for (let i = 0; i < codes.length; i += 8) {
  const batch = codes.slice(i, i + 8);
  const got = await Promise.all(batch.map((c) => series(`${c}.T`)));
  batch.forEach((c, j) => { if (got[j] && got[j].size > 150) px[c] = got[j]; });
}
const used = Object.keys(px);
if (used.length < codes.length) {
  console.warn(`⚠️ 株価が取れなかった銘柄が ${codes.length - used.length} 件あります（計算から除外）`);
}

// 全銘柄がそろって取引された日だけを使う
let days = null;
for (const c of used) {
  const s = new Set(px[c].keys());
  days = days ? days.filter((d) => s.has(d)) : [...s];
}
days.sort();
const ret = {};
for (const c of used) {
  ret[c] = [];
  for (let i = 1; i < days.length; i++) ret[c].push(px[c].get(days[i]) / px[c].get(days[i - 1]) - 1);
}
const n = days.length - 1;
const usedTotal = used.reduce((s, c) => s + pos[c], 0);

const port = [];
for (let i = 0; i < n; i++) {
  let x = 0;
  for (const c of used) x += (pos[c] / usedTotal) * ret[c][i];
  port.push(x);
}
const risk = std(port) * Math.sqrt(252) * 100;
// 1銘柄ずつのリスクを、保有金額の重みで平均したもの（＝分散が効かなかった場合）
const solo = used.reduce((s, c) => s + (pos[c] / usedTotal) * std(ret[c]) * Math.sqrt(252) * 100, 0);

// ═══ 5. 書き出し ═══
const asOf = days[days.length - 1];
const ts = `// このファイルは scripts/sidefire-sectors.mjs が自動生成します。手で編集しないでください。
// 生成元は data/ 配下（非公開）。ここに出るのは集計値だけです。

export type SectorRow = {
  /** 業種名（東証17業種ベース） */
  name: string;
  /** 評価額（万円） */
  manYen: number;
  /** 全体に占める割合（%） */
  pct: number;
  /** 銘柄数 */
  count: number;
  /** 景気敏感 or ディフェンシブ */
  bucket: "cyclical" | "defensive";
};

export const SECTOR_AS_OF = ${JSON.stringify(asOf)};
export const SECTOR_TOTAL_MANYEN = ${Math.round(total / 10000)};
export const SECTOR_STOCK_COUNT = ${codes.length};

export const SECTORS: SectorRow[] = ${JSON.stringify(sectors.map(({ name, manYen, pct, count, bucket }) => ({ name, manYen, pct, count, bucket })), null, 2)};

/** 景気敏感 / ディフェンシブ の内訳 */
export const CYCLE_SPLIT = ${JSON.stringify(split, null, 2)};

/** 年率リスク（直近1年・日次・${n}営業日） */
export const RISK = {
  /** ポートフォリオ全体の年率リスク（%） */
  annualPct: ${risk.toFixed(1)},
  /** 1銘柄ずつのリスクを保有金額の重みで平均したもの（%） */
  soloAvgPct: ${solo.toFixed(1)},
  /** 分散で消えたぶん（ポイント） */
  diversifiedPt: ${(solo - risk).toFixed(1)},
  /** ふつうの1年の振れ幅（万円・±1σ） */
  swingManYen: ${Math.round((total * risk) / 100 / 10000)},
  /** 計算に使った営業日数 */
  tradingDays: ${n},
};
`;
writeFileSync(OUT, ts);

console.log(`\n✅ ${OUT} を書き出しました`);
console.log(`   ${codes.length}銘柄 / ${Math.round(total / 10000)}万円 / ${asOf}時点`);
console.log(`   年率リスク ${risk.toFixed(1)}%（1銘柄平均 ${solo.toFixed(1)}% → 分散で ${(solo - risk).toFixed(1)}ポイント）`);
console.log(`   景気敏感 ${split.cyclical.pct}% / ディフェンシブ ${split.defensive.pct}%`);
console.log(`   業種 ${sectors.length}区分（最大 ${sectors[0].name} ${sectors[0].pct}%）`);
