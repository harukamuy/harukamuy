// ═══════════════════════════════════════════════════════════════════
// 毎月これ1本を実行すれば、sidefireData.ts に貼る Snapshot が出ます。
//   実行: node scripts/sidefire-generate.mjs
//   入力: data/sidefire/input/holdings.csv（証券CSV）
//         data/sidefire/manual.json（iDeCo・現金・BTC・対象月）
//         data/sidefire/foreign.json（外国ETF）
//         data/sidefire/dividend-master.json（配当データ）
// ═══════════════════════════════════════════════════════════════════

import { readFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";
import { buildMonthly } from "./sidefire-monthly.mjs";

const CSV = "data/sidefire/input/holdings.csv";
const manual = JSON.parse(readFileSync("data/sidefire/manual.json", "utf8"));
const foreign = JSON.parse(readFileSync("data/sidefire/foreign.json", "utf8"));
const master = JSON.parse(readFileSync("data/sidefire/dividend-master.json", "utf8"));

const { holdings } = parseHoldingsCsv(CSV);

// ── 資産の集計（円→万円）──
let fundVal = 0; // 投資信託（インデックス）
let stockVal = 0; // 国内株式
let stockCost = 0;
for (const h of holdings) {
  if (h.kind === "fund") fundVal += h.value;
  else if (h.kind === "stock") {
    stockVal += h.value;
    stockCost += h.cost;
  }
}
let foreignVal = 0;
let foreignCost = 0;
for (const f of foreign.holdings) {
  foreignVal += f.value_yen;
  foreignCost += f.cost_yen;
}

const man = (yen) => Math.round(yen / 10000);

const index = man(fundVal) + manual.ideco_man; // インデックス＋iDeCo
const highDiv = man(stockVal) + man(foreignVal); // 国内株＋外国ETF
const cash = manual.cash_man;
const btc = manual.btc_man;

// ── 月別配当（税引後）──
const dividendForecast = buildMonthly(CSV, { afterTax: true });

// ── 配当利回り（税引前配当 ÷ 取得金額）──
const preTaxAnnual = buildMonthly(CSV, { afterTax: false }).reduce((a, b) => a + b, 0);
const yieldPct = (preTaxAnnual / (stockCost + foreignCost)) * 100;

// ── 出力 ──
const total = index + highDiv + cash + btc;
const afterTaxAnnual = dividendForecast.reduce((a, b) => a + b, 0);

const snapshot = `  {
    month: "${manual.month}",
    monthNum: ${manual.monthNum},
    index: ${index},
    highDiv: ${highDiv},
    cash: ${cash},
    btc: ${btc},
    dividendForecast: [${dividendForecast.join(", ")}],
    dividendYieldPct: ${yieldPct.toFixed(2)},
  },`;

console.log("\n══════════ ${manual.month} サマリー ══════════".replace("${manual.month}", manual.month));
console.log(`  総資産        : ${total.toLocaleString("ja-JP")} 万円`);
console.log(`    ├ インデックス: ${index} 万円（投信 ${man(fundVal)} + iDeCo ${manual.ideco_man}）`);
console.log(`    ├ 高配当株+BND: ${highDiv} 万円（国内株 ${man(stockVal)} + 外国ETF ${man(foreignVal)}）`);
console.log(`    ├ 現金        : ${cash} 万円`);
console.log(`    └ BTC         : ${btc} 万円`);
console.log(`  年間配当(税引前): ${Math.round(preTaxAnnual).toLocaleString("ja-JP")} 円`);
console.log(`  年間配当(税引後): ${afterTaxAnnual.toLocaleString("ja-JP")} 円`);
console.log(`  配当利回り     : ${yieldPct.toFixed(2)} %`);

console.log("\n══════════ sidefireData.ts に貼り付け ══════════");
console.log(snapshot);
console.log("");
