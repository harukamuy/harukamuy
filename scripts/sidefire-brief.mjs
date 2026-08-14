// ═══════════════════════════════════════════════════════════════════
// 日本の高配当株を「別セッションで分析してもらう」ための資料を作る。
//   実行: node scripts/sidefire-brief.mjs        （リスク計算あり／1〜2分）
//         node scripts/sidefire-brief.mjs --fast （株価を取らず即時）
//   入力: data/sidefire/input/holdings.csv    証券CSV（非公開）
//         data/sidefire/sectors.json          銘柄コード→業種（非公開）
//         data/sidefire/dividend-master.json  1株配当・配当月（非公開）
//         data/sidefire/policy.md             投資方針（非公開）
//   出力: data/sidefire/brief-YYYY-MM.md
//
// ⚠️ 出力には個別銘柄名・保有金額が入る。data/ はGit除外なので
//    コミットされないが、**公開の場に貼らないこと**。
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const FAST = process.argv.includes("--fast");
const CSV = "data/sidefire/input/holdings.csv";

const { map: SEC } = JSON.parse(readFileSync("data/sidefire/sectors.json", "utf8"));
const master = JSON.parse(readFileSync("data/sidefire/dividend-master.json", "utf8"));
const manual = JSON.parse(readFileSync("data/sidefire/manual.json", "utf8"));

// ディフェンシブの定義は sidefire-sectors.mjs と揃えている
const DEFENSIVE_33 = new Set([
  "食料品", "医薬品", "電気・ガス業", "情報・通信業",
  "陸運業", "小売業", "サービス業", "水産・農林業",
]);

// ── 保有を読む（特定とNISAを分けて持つ）──
const { holdings } = parseHoldingsCsv(CSV);
const pos = {};
for (const h of holdings) {
  if (h.kind !== "stock" || !h.code) continue;
  const p = (pos[h.code] ??= {
    name: h.name, shares: 0, value: 0, cost: 0, nisa: 0, tokutei: 0,
  });
  p.shares += h.shares;
  p.value += h.value;
  p.cost += h.cost;
  if (h.account.includes("NISA")) p.nisa += h.value;
  else p.tokutei += h.value;
}
const codes = Object.keys(pos).sort((a, b) => pos[b].value - pos[a].value);
const total = codes.reduce((s, c) => s + pos[c].value, 0);

const missing = codes.filter((c) => !SEC[c]);
if (missing.length) {
  console.error(`\n❌ 業種が分からない銘柄: ${missing.join(", ")}`);
  console.error("   scripts/sidefire-sectors.mjs 冒頭の手順で sectors.json に追加してください。\n");
  process.exit(1);
}

// 1銘柄ごとの利回り・年間配当
for (const c of codes) {
  const p = pos[c];
  const ps = master.perShare[c];
  p.annualDiv = ps == null ? null : ps * p.shares;
  p.yieldNow = ps == null ? null : (ps / (p.value / p.shares)) * 100;
  p.s33 = SEC[c].s33;
  p.defensive = DEFENSIVE_33.has(p.s33);
}

const yen = (n) => Math.round(n).toLocaleString("ja-JP");
const man = (n) => Math.round(n / 10000).toLocaleString("ja-JP");
const p1 = (n) => n.toFixed(1);

// ── 業種別（33業種）＋ 東証全体との比較 ──
// ベンチマークは sectors.json にある東証全上場銘柄の「銘柄数」構成比。
// 時価総額ではなく銘柄数ベースである点に注意（手元のデータだけで作れる中立な物差し）。
const univCount = {};
let univTotal = 0;
for (const c of Object.keys(SEC)) {
  const s = SEC[c].s33;
  if (!s || s === "-") continue;
  univCount[s] = (univCount[s] || 0) + 1;
  univTotal++;
}

const bySector = {};
for (const c of codes) {
  const s = pos[c].s33;
  const b = (bySector[s] ??= { value: 0, count: 0, div: 0, defensive: pos[c].defensive });
  b.value += pos[c].value;
  b.count += 1;
  b.div += pos[c].annualDiv || 0;
}
const sectorRows = Object.entries(bySector)
  .map(([s, b]) => ({
    s, ...b,
    pct: (b.value / total) * 100,
    univPct: ((univCount[s] || 0) / univTotal) * 100,
  }))
  .map((r) => ({ ...r, gap: r.pct - r.univPct }))
  .sort((a, b) => b.pct - a.pct);

// 保有ゼロの業種（＝完全に空いているところ）
const held = new Set(Object.keys(bySector));
const emptySectors = Object.entries(univCount)
  .filter(([s]) => !held.has(s))
  .sort((a, b) => b[1] - a[1])
  .map(([s, n]) => `${s}（東証${n}社）`);

// ── 景気敏感 / ディフェンシブ ──
let cycV = 0, cycN = 0, defV = 0, defN = 0;
for (const c of codes) {
  if (pos[c].defensive) { defV += pos[c].value; defN++; } else { cycV += pos[c].value; cycN++; }
}

// ── 集中度 ──
const top10 = codes.slice(0, 10);
const top10Pct = (top10.reduce((s, c) => s + pos[c].value, 0) / total) * 100;
const hhi = codes.reduce((s, c) => s + ((pos[c].value / total) * 100) ** 2, 0);

// ── 配当の支払い月の偏り ──
function payMonthsOf(code) {
  const sc = master.schedule[code];
  if (!sc) return [];
  if (sc.months) return sc.months;
  const end = ((sc.fy + 3 - 1) % 12) + 1;
  return sc.n === 1 ? [end] : [end, ((end + 6 - 1) % 12) + 1];
}
const byMonth = new Array(12).fill(0);
for (const c of codes) {
  const pm = payMonthsOf(c);
  if (!pm.length || !pos[c].annualDiv) continue;
  for (const m of pm) byMonth[m - 1] += pos[c].annualDiv / pm.length;
}
const divTotal = byMonth.reduce((a, b) => a + b, 0);

// ── 年率リスク ──
let riskBlock = "（--fast のため未計算）";
let soloTop = [];
if (!FAST) {
  const std = (a) => {
    const m = a.reduce((x, y) => x + y, 0) / a.length;
    return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1));
  };
  async function series(code) {
    try {
      const r = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${code}.T?range=1y&interval=1d`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
      );
      const x = (await r.json())?.chart?.result?.[0];
      const ts = x?.timestamp || [];
      const cl = x?.indicators?.adjclose?.[0]?.adjclose || x?.indicators?.quote?.[0]?.close || [];
      const m = new Map();
      ts.forEach((t, i) => { if (cl[i] != null) m.set(new Date(t * 1000).toISOString().slice(0, 10), cl[i]); });
      return m;
    } catch { return null; }
  }
  process.stdout.write("株価を取得中… ");
  const px = {};
  for (let i = 0; i < codes.length; i += 8) {
    const batch = codes.slice(i, i + 8);
    const got = await Promise.all(batch.map(series));
    batch.forEach((c, j) => { if (got[j] && got[j].size > 150) px[c] = got[j]; });
    process.stdout.write(".");
  }
  console.log(" 完了");
  const used = Object.keys(px);
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
  const uT = used.reduce((s, c) => s + pos[c].value, 0);
  const port = [];
  for (let i = 0; i < days.length - 1; i++) {
    let x = 0;
    for (const c of used) x += (pos[c].value / uT) * ret[c][i];
    port.push(x);
  }
  const risk = std(port) * Math.sqrt(252) * 100;
  const solo = used.reduce((s, c) => s + (pos[c].value / uT) * std(ret[c]) * Math.sqrt(252) * 100, 0);
  soloTop = used
    .map((c) => ({ c, name: pos[c].name, v: std(ret[c]) * Math.sqrt(252) * 100, w: (pos[c].value / uT) * 100 }))
    .sort((a, b) => b.v - a.v);
  riskBlock = [
    `- **ポートフォリオ全体の年率リスク：${p1(risk)}%**（${used.length}銘柄・直近${days.length - 1}営業日）`,
    `- 1銘柄ずつのリスクを保有額で加重平均すると ${p1(solo)}%。**分散で ${p1(solo - risk)}ポイント下がっている**`,
    `- ふつうの1年の振れ幅の目安：±${man(total * (risk / 100))}万円（約68%の確率）`,
    `- 基準日：${days[days.length - 1]}`,
  ].join("\n");
}

// ── 書き出し ──
const policy = existsSync("data/sidefire/policy.md")
  ? readFileSync("data/sidefire/policy.md", "utf8").replace(/^# .*\n/, "").trim()
  : "（data/sidefire/policy.md がありません）";

// "2026年7月末" → "2026-07"
const stamp = `${manual.month.slice(0, 4)}-${String(manual.monthNum).padStart(2, "0")}`;

const md = `# 【非公開】日本の高配当株ポートフォリオ 分析用ブリーフ

> ⚠️ **このファイルは個人の保有銘柄そのものです。公開の場に貼らないでください。**
> 基準：${manual.month}時点の保有／株価は実行時点

---

## 1. 投資方針（本人）

${policy}

---

## 2. 全体像

- 日本の高配当株：**${codes.length}銘柄・${man(total)}万円**
- 年間配当（税引前・概算）：**${yen(divTotal)}円** ※日本株のみ。BND・外国ETFは含まない
- 平均利回り：**${p1((divTotal / total) * 100)}%**（いまの株価に対する利回り）
  ※ブログに出している4.8%台は「取得価格に対する利回り」で、基準が違うだけで矛盾ではない
- 口座の内訳：NISA ${man(codes.reduce((s, c) => s + pos[c].nisa, 0))}万円 ／ 特定 ${man(codes.reduce((s, c) => s + pos[c].tokutei, 0))}万円
  （NISAの配当は非課税なので、高利回り銘柄をNISAに置けているかは見どころ）

### 分散の効き具合
- 上位10銘柄で全体の **${p1(top10Pct)}%**
- 1銘柄あたり平均 ${p1(100 / codes.length)}%、最大 ${p1((pos[codes[0]].value / total) * 100)}%（${pos[codes[0]].name}）
- HHI（集中度の指標）：**${Math.round(hhi)}**（1500未満なら十分に分散、と一般に言われる水準）

---

## 3. 業種のバランス（東証33業種）

「東証比」は、東証に上場している会社の**銘柄数**の構成比と比べた差です。
時価総額ではないので厳密なベンチマークではありませんが、
「世の中の業種の広がりに対して、自分がどこに寄っているか」の目安になります。

| 業種 | 金額 | 比率 | 銘柄数 | 東証比 | 性格 |
|---|--:|--:|--:|--:|:--|
${sectorRows.map((r) => `| ${r.s} | ${man(r.value)}万 | ${p1(r.pct)}% | ${r.count} | ${r.gap >= 0 ? "+" : ""}${p1(r.gap)}pt | ${r.defensive ? "ディフェンシブ" : "景気敏感"} |`).join("\n")}

### 厚い業種（東証比 +3pt以上）
${sectorRows.filter((r) => r.gap >= 3).map((r) => `- ${r.s}：${p1(r.pct)}%（東証 ${p1(r.univPct)}%）`).join("\n") || "- なし"}

### 薄い業種（東証比 −2pt以下）
${sectorRows.filter((r) => r.gap <= -2).map((r) => `- ${r.s}：${p1(r.pct)}%（東証 ${p1(r.univPct)}%）`).join("\n") || "- なし"}

### 1社も持っていない業種
${emptySectors.length ? emptySectors.map((s) => `- ${s}`).join("\n") : "- なし"}

---

## 4. 景気敏感 vs ディフェンシブ

| | 金額 | 比率 | 銘柄数 |
|---|--:|--:|--:|
| 景気敏感 | ${man(cycV)}万 | ${p1((cycV / total) * 100)}% | ${cycN} |
| ディフェンシブ | ${man(defV)}万 | ${p1((defV / total) * 100)}% | ${defN} |

ディフェンシブ＝食料品・医薬品・電気ガス・情報通信・陸運・小売・サービス・水産農林。
金融（銀行・保険・証券）は景気に左右されるため景気敏感に入れています。

---

## 5. 配当がいつ入るか（税引前・銘柄ベース）

| 月 | 金額 | 割合 |
|---|--:|--:|
${byMonth.map((v, i) => `| ${i + 1}月 | ${yen(v)}円 | ${p1((v / divTotal) * 100)}% |`).join("\n")}

---

## 6. リスク（過去1年の値動きから）

${riskBlock}

${soloTop.length ? `### 値動きが激しい銘柄トップ10
${soloTop.slice(0, 10).map((x) => `- ${x.c} ${x.name}：年率${p1(x.v)}%（保有比率${p1(x.w)}%）`).join("\n")}` : ""}

---

## 7. 利回りの分布

| 帯 | 銘柄数 | 金額 |
|---|--:|--:|
${[[0, 2], [2, 3], [3, 4], [4, 5], [5, 100]].map(([lo, hi]) => {
  const g = codes.filter((c) => pos[c].yieldNow != null && pos[c].yieldNow >= lo && pos[c].yieldNow < hi);
  return `| ${lo}〜${hi === 100 ? "" : hi}% | ${g.length} | ${man(g.reduce((s, c) => s + pos[c].value, 0))}万 |`;
}).join("\n")}

---

## 8. 全保有銘柄

金額の大きい順。利回りは「今の株価に対する」もの（取得価格ベースではない）。

| # | コード | 銘柄 | 業種 | 金額 | 比率 | 利回り | 年間配当 | 口座 |
|--:|---|---|---|--:|--:|--:|--:|:--|
${codes.map((c, i) => {
  const p = pos[c];
  const acct = p.nisa && p.tokutei ? "両方" : p.nisa ? "NISA" : "特定";
  return `| ${i + 1} | ${c} | ${p.name} | ${p.s33} | ${yen(p.value)}円 | ${p1((p.value / total) * 100)}% | ${p.yieldNow == null ? "-" : p1(p.yieldNow) + "%"} | ${p.annualDiv == null ? "-" : yen(p.annualDiv) + "円"} | ${acct} |`;
}).join("\n")}

---

## 9. 分析をお願いしたいこと

1. 業種の偏りをどう見るか。厚すぎる／薄すぎる業種はどれか
2. 景気敏感 ${p1((cycV / total) * 100)}% ／ ディフェンシブ ${p1((defV / total) * 100)}% のバランスは方針に合っているか
3. 配当が6月・12月に偏っているのは直すべきか、気にしなくてよいか
4. 減配リスクが高そうな銘柄が混ざっていないか
5. 次に買い足すならどの業種か（利回りだけで選ばないために）

**お願い**：専門用語は避けて平易に。リスクも正直に。
個別の売買指示ではなく、考え方とバランスの助言をお願いします。
`;

const out = `data/sidefire/brief-${stamp}.md`;
writeFileSync(out, md);
console.log(`\n✅ ${out} に書き出しました（${codes.length}銘柄）`);
console.log("   ⚠️ 個別銘柄が入っています。公開の場に貼らないでください。\n");
