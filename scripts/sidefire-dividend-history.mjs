// ═══════════════════════════════════════════════════════════════════
// 「この会社は何年、配当を減らしていないか」を配当の実績から自動で出す。
//   実行: node scripts/sidefire-dividend-history.mjs
//   出力: data/sidefire/dividend-history.json（brief が読む）
//
// なぜ配当性向ではなくこれなのか:
//   配当性向は「今この瞬間の余裕」しか表さない。
//   非減配年数は「不況を実際に減配せず通り抜けた」という証拠なので、
//   減配リスクを見るには配当性向より強い材料になる。
//
// 注意:
//   - 株式分割はYahoo側で調整済み（1:4分割でも履歴は滑らかなまま）
//   - 決算期の途中の年は「まだ配当が出そろっていない」ので自動で捨てる
//   - 記念配当が入った翌年は減配に見える。疑いがあれば印を付ける
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const CSV = "data/sidefire/input/holdings.csv";
const OUT = "data/sidefire/dividend-history.json";

// 権利落ち日が4月〜翌3月なら同じ年度とみなす（3月決算の中間9月・期末3月が揃う）
const fyOf = (t) => {
  const d = new Date(t * 1000);
  return d.getUTCMonth() + 1 >= 4 ? d.getUTCFullYear() : d.getUTCFullYear() - 1;
};

async function fetchDividends(code) {
  try {
    const r = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${code}.T?range=20y&interval=1mo&events=div`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    return (await r.json())?.chart?.result?.[0]?.events?.dividends || null;
  } catch {
    return null;
  }
}

function analyse(events) {
  const sum = {}, count = {};
  for (const k in events) {
    const f = fyOf(+k);
    sum[f] = (sum[f] || 0) + events[k].amount;
    count[f] = (count[f] || 0) + 1;
  }
  let years = Object.keys(sum).map(Number).sort((a, b) => a - b);
  if (years.length < 3) return null;

  // 直近の年度が「まだ配当が出そろっていない」なら捨てる。
  // 年1回→年2回に変えた会社（例: 6785 鈴木）を誤判定しないよう、
  // 全履歴の最頻値ではなく **直近3年の最大回数** と比べる。
  while (years.length >= 4) {
    const last = years[years.length - 1];
    const prevMax = Math.max(...years.slice(-4, -1).map((y) => count[y]));
    if (count[last] < prevMax) years.pop();
    else break;
  }
  if (years.length < 3) return null;

  // 直近の完了年度からさかのぼって連続年数を数える
  let noCut = 0, raise = 0;
  for (let i = years.length - 1; i > 0; i--) {
    const now = sum[years[i]], prev = sum[years[i - 1]];
    if (now >= prev - 1e-9) noCut++; else break;
  }
  for (let i = years.length - 1; i > 0; i--) {
    const now = sum[years[i]], prev = sum[years[i - 1]];
    if (now > prev + 1e-9) raise++; else break;
  }

  // コロナ（2019・2020年度）を減配せずに通ったか
  let covid = "データなし";
  const c19 = sum[2019], c20 = sum[2020], c18 = sum[2018];
  if (c18 != null && c19 != null && c20 != null) {
    covid = c19 >= c18 - 1e-9 && c20 >= c19 - 1e-9 ? "減配なし" : "減配あり";
  }

  // 記念配当の疑い：ある年に5割以上増えて、翌年に減っている
  let spike = false;
  for (let i = 1; i < years.length - 1; i++) {
    if (sum[years[i]] > sum[years[i - 1]] * 1.5 && sum[years[i + 1]] < sum[years[i]]) spike = true;
  }

  const recent = years.slice(-5).map((y) => ({ fy: y, div: +sum[y].toFixed(2) }));
  // 記録が取得できる範囲（20年）を丸ごと使い切っている＝「◯年以上」の意味
  const capped = noCut >= years.length - 1;
  return { noCut, raise, covid, spike, capped, lastFy: years[years.length - 1], span: years.length, recent };
}

// ── 実行 ──
const codes = [
  ...new Set(
    parseHoldingsCsv(CSV).holdings.filter((h) => h.kind === "stock" && h.code).map((h) => h.code)
  ),
];

process.stdout.write(`配当の実績を取得中（${codes.length}銘柄）… `);
const result = {};
let ok = 0;
for (let i = 0; i < codes.length; i += 8) {
  const batch = codes.slice(i, i + 8);
  const got = await Promise.all(batch.map(fetchDividends));
  batch.forEach((c, j) => {
    const a = got[j] ? analyse(got[j]) : null;
    if (a) { result[c] = a; ok++; }
  });
  process.stdout.write(".");
}
console.log(` 完了（${ok}/${codes.length}銘柄）`);

writeFileSync(
  OUT,
  JSON.stringify(
    {
      _説明: "配当の実績から自動計算。手で編集しない（再実行で上書きされる）。",
      _noCut: "非減配年数。何年連続で配当を減らしていないか。減配リスクを見る主指標",
      _raise: "連続増配年数。据え置きの年があると途切れる",
      _covid: "2019・2020年度（コロナ）を減配せずに通ったか",
      _spike: "記念配当の疑い。trueなら年数を鵜呑みにしない",
      _生成: new Date().toISOString().slice(0, 10),
      data: result,
    },
    null,
    2
  )
);

const rank = Object.entries(result).sort((a, b) => b[1].noCut - a[1].noCut);
console.log(`\n✅ ${OUT} に保存`);
console.log(`\n非減配年数トップ10`);
for (const [c, v] of rank.slice(0, 10))
  console.log(`   ${c}  ${String(v.noCut).padStart(2)}年連続で減配なし（増配${v.raise}年 / コロナ:${v.covid}）`);
const cut = rank.filter(([, v]) => v.noCut === 0);
console.log(`\n直近で減配・据え置きがあった銘柄：${cut.length}件`);
