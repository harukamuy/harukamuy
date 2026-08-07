// ═══════════════════════════════════════════════════════════════════
// 保有CSVから「日本株ポートフォリオの年率リスク」を計算する
//   実行: node scripts/sidefire-risk.mjs
//   株価履歴は Yahoo Finance から取得（過去1年・日次）
// ═══════════════════════════════════════════════════════════════════

import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const CSV = "data/sidefire/input/holdings.csv";
const TRADING_DAYS = 252;

// 保有を銘柄コード単位に合算（特定＋NISA）
const { holdings } = parseHoldingsCsv(CSV);
const pos = {};
for (const h of holdings) {
  if (h.kind !== "stock" || !h.code) continue;
  pos[h.code] = pos[h.code] || { value: 0, name: h.name };
  pos[h.code].value += h.value;
}
const codes = Object.keys(pos);
const totalValue = codes.reduce((s, c) => s + pos[c].value, 0);

async function fetchCloses(code) {
  // 数字4桁は東証(.T)、それ以外(AFK等)はそのまま
  const sym = /^\d{4}$/.test(code) ? `${code}.T` : code;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=1y&interval=1d`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await res.json();
    const q = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
    if (!q) return null;
    return q.filter((v) => v != null);
  } catch {
    return null;
  }
}

// 日次リターン（対数ではなく単純収益率）
function returnsOf(closes) {
  const r = [];
  for (let i = 1; i < closes.length; i++) r.push(closes[i] / closes[i - 1] - 1);
  return r;
}

function stdev(arr) {
  const m = arr.reduce((a, b) => a + b, 0) / arr.length;
  const v = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(v);
}

console.log(`\n株価履歴を取得中… (${codes.length}銘柄)`);

const series = {};
let ok = 0;
const failed = [];
// 8件ずつ並列で取得（相手に負荷をかけすぎない）
for (let i = 0; i < codes.length; i += 8) {
  const batch = codes.slice(i, i + 8);
  const results = await Promise.all(batch.map((c) => fetchCloses(c)));
  batch.forEach((c, j) => {
    if (results[j] && results[j].length > 100) {
      series[c] = results[j];
      ok++;
    } else {
      failed.push(c);
    }
  });
  process.stdout.write(`\r  ${Math.min(i + 8, codes.length)}/${codes.length}`);
}
console.log(`\n  取得成功: ${ok}銘柄${failed.length ? ` / 失敗: ${failed.join(", ")}` : ""}`);

// 全銘柄で共通の日数にそろえる（末尾から）
const minLen = Math.min(...Object.values(series).map((s) => s.length));
const rets = {};
for (const c of Object.keys(series)) {
  rets[c] = returnsOf(series[c].slice(-minLen));
}
const days = minLen - 1;

// 取得できた銘柄だけでウェイトを再計算
const used = Object.keys(rets);
const usedValue = used.reduce((s, c) => s + pos[c].value, 0);
const w = {};
for (const c of used) w[c] = pos[c].value / usedValue;

// ポートフォリオの日次リターン＝各銘柄の加重合計
const port = [];
for (let d = 0; d < days; d++) {
  let r = 0;
  for (const c of used) r += w[c] * rets[c][d];
  port.push(r);
}

const portVol = stdev(port) * Math.sqrt(TRADING_DAYS) * 100;

// 各銘柄の単独リスク
const indiv = used
  .map((c) => ({
    code: c,
    name: pos[c].name,
    w: w[c] * 100,
    vol: stdev(rets[c]) * Math.sqrt(TRADING_DAYS) * 100,
  }))
  .sort((a, b) => b.vol - a.vol);

// 分散の効果：もし全部バラバラに動かなかったら（単純加重平均）
const weightedAvgVol = indiv.reduce((s, x) => s + (x.w / 100) * x.vol, 0);

const f = (n) => n.toFixed(1);

console.log("\n════════ 日本株ポートフォリオの年率リスク ════════");
console.log(`  対象: ${used.length}銘柄 / 評価額 ${Math.round(usedValue / 10000).toLocaleString("ja-JP")}万円`);
console.log(`  期間: 直近${days}営業日（約1年）\n`);
console.log(`  ★ ポートフォリオ全体の年率リスク: ${f(portVol)}%`);
console.log(`     （1銘柄ずつの平均リスク: ${f(weightedAvgVol)}%）`);
console.log(`     → 分散によって ${f(weightedAvgVol - portVol)}ポイント リスクが減っている\n`);

const v = usedValue;
console.log("  この数字の意味（1年後の評価額の目安・配当を除く）:");
console.log(`    約68%の確率で  ±${f(portVol)}%  = ${Math.round((v * (1 - portVol / 100)) / 10000)}〜${Math.round((v * (1 + portVol / 100)) / 10000)}万円`);
console.log(`    約95%の確率で  ±${f(portVol * 2)}%  = ${Math.round((v * (1 - (portVol * 2) / 100)) / 10000)}〜${Math.round((v * (1 + (portVol * 2) / 100)) / 10000)}万円\n`);

console.log("  値動きが激しい銘柄トップ5:");
indiv.slice(0, 5).forEach((x) => console.log(`    ${x.code} ${x.name.padEnd(10)} リスク${f(x.vol).padStart(5)}%  （保有比率${f(x.w)}%）`));
console.log("\n  値動きが穏やかな銘柄トップ5:");
indiv.slice(-5).reverse().forEach((x) => console.log(`    ${x.code} ${x.name.padEnd(10)} リスク${f(x.vol).padStart(5)}%  （保有比率${f(x.w)}%）`));
console.log("");
