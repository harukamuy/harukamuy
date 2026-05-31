// 各銘柄の配当を「支払い月」に振り分けて月別配当を作る
import { readFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const master = JSON.parse(readFileSync("data/sidefire/dividend-master.json", "utf8"));

// schedule {fy,n} → 支払い月の配列を返す（標準ルール: fy+3 と fy+9）
function payMonthsOf(code) {
  const sc = master.schedule[code];
  if (!sc) return [];
  if (sc.months) return sc.months;
  const end = ((sc.fy + 3 - 1) % 12) + 1; // 期末配当の支払月
  if (sc.n === 1) return [end];
  const mid = ((end + 6 - 1) % 12) + 1; // 中間配当の支払月
  return [end, mid];
}

// 1銘柄の年間配当を支払い月に配分して months[] に加算（weights があれば不均等配分）
function distribute(months, code, annual) {
  const pm = payMonthsOf(code);
  if (pm.length === 0) return; // 不明はスキップ
  const sc = master.schedule[code];
  const w = sc && sc.weights && sc.weights.length === pm.length ? sc.weights : null;
  if (w) {
    const wsum = w.reduce((a, b) => a + b, 0);
    pm.forEach((m, i) => (months[m - 1] += (annual * w[i]) / wsum));
  } else {
    const per = annual / pm.length;
    for (const m of pm) months[m - 1] += per;
  }
}

// 外国株の税引後係数（market と口座で切替）
function foreignAfterTaxFactor(market, account) {
  if (account === "NISA") return market === "HK" ? 1 : 1 - 0.1; // 香港=非課税, 米国=米10%残る
  return market === "HK" ? 1 - 0.20315 : 1 - 0.2828; // 特定: 香港=日本20.315%, 米国=28.28%
}

export function buildMonthly(csvPath, { afterTax }) {
  const { holdings } = parseHoldingsCsv(csvPath);
  const foreign = JSON.parse(readFileSync("data/sidefire/foreign.json", "utf8"));

  const TAX_DOM = 0.20315; // 特定・日本株

  const months = new Array(12).fill(0);

  // 国内株式
  for (const h of holdings) {
    if (h.kind !== "stock" || !h.code) continue;
    const ps = master.perShare[h.code];
    if (ps == null) continue;
    let annual = h.shares * ps;
    if (afterTax) {
      annual *= h.account.includes("NISA") ? 1 : 1 - TAX_DOM;
    }
    distribute(months, h.code, annual);
  }

  // 外国株（米国ETF・香港株など）
  for (const f of foreign.holdings) {
    const ps = master.perShare[f.code];
    if (ps == null) continue;
    let annual = f.shares * ps;
    if (afterTax) annual *= foreignAfterTaxFactor(f.market, f.account);
    distribute(months, f.code, annual);
  }

  return months.map((v) => Math.round(v));
}

// 直接実行したら検証
if (import.meta.url === `file://${process.argv[1]}`) {
  const csv = "data/sidefire/input/holdings.csv";
  const pre = buildMonthly(csv, { afterTax: false });
  const after = buildMonthly(csv, { afterTax: true });

  // あなたのグラフ（税引前）
  const chart = [0, 9472, 53629, 10922, 17597, 183944, 9472, 15478, 46379, 10922, 11547, 177424];
  const L = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const f = (n) => n.toLocaleString("ja-JP").padStart(9);

  console.log("\n月別配当の検証（税引前モデル vs あなたのグラフ）");
  console.log("月      モデル(税引前)   グラフ実値      差");
  for (let i = 0; i < 12; i++) {
    const diff = pre[i] - chart[i];
    const mark = Math.abs(diff) > 5000 ? "  ⚠️" : "";
    console.log(`${L[i].padEnd(4)} ${f(pre[i])}  ${f(chart[i])}  ${f(diff)}${mark}`);
  }
  const sumPre = pre.reduce((a, b) => a + b, 0);
  const sumChart = chart.reduce((a, b) => a + b, 0);
  console.log(`合計 ${f(sumPre)}  ${f(sumChart)}  ${f(sumPre - sumChart)}`);

  console.log("\n税引後（ブログ表示用）:");
  console.log("  " + after.map((v, i) => `${L[i]}:${v.toLocaleString("ja-JP")}`).join("  "));
  console.log(`  税引後合計: ${after.reduce((a, b) => a + b, 0).toLocaleString("ja-JP")} 円`);
}
