// ═══════════════════════════════════════════════════════════════════
// WACCの「株主資本コスト」を自動で出す。ROIC−WACC の半分。
//   実行: node scripts/sidefire-beta.mjs
//   出力: data/sidefire/beta.json
//
// 株主資本コスト = 国債10年 + β × リスクプレミアム
//   - β        … 過去5年の日次リターンをTOPIXと比べて算出
//   - 国債10年  … 財務省の公表CSVから当日分を取得
//   - プレミアム … 仮定値（下のPREMIUM）。日本株では5〜6%が一般的
//
// 注意: TOPIXは 1348.T を使う。1306.T は分割が履歴に反映されておらず壊れる。
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const CSV = "data/sidefire/input/holdings.csv";
const OUT = "data/sidefire/beta.json";
const TOPIX = "1348.T";
const PREMIUM = 6.0; // 株式リスクプレミアム（%）。仮定値なので変えてよい

async function daily(sym) {
  try {
    const r = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=5y&interval=1d`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const t = (await r.json())?.chart?.result?.[0];
    if (!t) return null;
    const ts = t.timestamp || [];
    const cl = t.indicators?.adjclose?.[0]?.adjclose || t.indicators?.quote?.[0]?.close || [];
    const m = new Map();
    ts.forEach((s, i) => {
      if (cl[i] != null) m.set(new Date(s * 1000).toISOString().slice(0, 10), cl[i]);
    });
    return m.size > 250 ? m : null;
  } catch { return null; }
}

// 財務省の国債金利CSV（Shift-JIS）から10年債の最新値を取る
async function riskFree() {
  try {
    const buf = await (await fetch("https://www.mof.go.jp/jgbs/reference/interest_rate/jgbcm.csv")).arrayBuffer();
    const txt = new TextDecoder("shift-jis").decode(buf);
    const rows = txt.split(/\r?\n/).filter((l) => /^[RHS]\d/.test(l));
    const last = rows[rows.length - 1].split(",");
    const v = Number(last[10]); // 11列目 = 10年
    return Number.isFinite(v) ? { rate: v, asOf: last[0] } : null;
  } catch { return null; }
}

function beta(mkt, stk) {
  const days = [...mkt.keys()].filter((d) => stk.has(d)).sort();
  if (days.length < 250) return null;
  const rm = [], rs = [];
  for (let i = 1; i < days.length; i++) {
    rm.push(mkt.get(days[i]) / mkt.get(days[i - 1]) - 1);
    rs.push(stk.get(days[i]) / stk.get(days[i - 1]) - 1);
  }
  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const mm = avg(rm), ms = avg(rs);
  let cov = 0, varm = 0;
  for (let i = 0; i < rm.length; i++) {
    cov += (rm[i] - mm) * (rs[i] - ms);
    varm += (rm[i] - mm) ** 2;
  }
  return varm ? { beta: +(cov / varm).toFixed(2), days: rm.length } : null;
}

// ── 実行 ──
const codes = [...new Set(
  parseHoldingsCsv(CSV).holdings.filter((h) => h.kind === "stock" && h.code).map((h) => h.code)
)];

const rf = await riskFree();
if (!rf) { console.error("❌ 国債金利の取得に失敗しました"); process.exit(1); }
console.log(`国債10年：${rf.rate}%（${rf.asOf}）／リスクプレミアム：${PREMIUM}%（仮定）`);

const mkt = await daily(TOPIX);
if (!mkt) { console.error("❌ TOPIXの取得に失敗しました"); process.exit(1); }
console.log(`TOPIX(${TOPIX})：${mkt.size}営業日`);

process.stdout.write(`βを計算中（${codes.length}銘柄）… `);
const data = {};
for (let i = 0; i < codes.length; i += 8) {
  const batch = codes.slice(i, i + 8);
  const got = await Promise.all(batch.map((c) => daily(c + ".T")));
  batch.forEach((c, j) => {
    const b = got[j] && beta(mkt, got[j]);
    if (b) data[c] = { ...b, costOfEquity: +(rf.rate + b.beta * PREMIUM).toFixed(2) };
  });
  process.stdout.write(".");
}
console.log(` 完了（${Object.keys(data).length}/${codes.length}銘柄）`);

writeFileSync(OUT, JSON.stringify({
  _説明: "βと株主資本コスト。手で編集しない（再実行で上書き）。",
  _株主資本コスト: `国債10年(${rf.rate}%) + β × リスクプレミアム(${PREMIUM}%)`,
  _注意: "リスクプレミアムは仮定値。WACC全体には有利子負債の割合と負債コストが別途必要",
  riskFree: rf.rate, riskFreeAsOf: rf.asOf, premium: PREMIUM, market: TOPIX,
  _生成: new Date().toISOString().slice(0, 10),
  data,
}, null, 2));

const s = Object.entries(data).sort((a, b) => a[1].beta - b[1].beta);
console.log(`\n✅ ${OUT} に保存`);
console.log(`\n値動きが穏やかな銘柄（β小）`);
for (const [c, v] of s.slice(0, 5)) console.log(`   ${c}  β=${v.beta}  株主資本コスト ${v.costOfEquity}%`);
console.log(`\n値動きが荒い銘柄（β大）`);
for (const [c, v] of s.slice(-5).reverse()) console.log(`   ${c}  β=${v.beta}  株主資本コスト ${v.costOfEquity}%`);
