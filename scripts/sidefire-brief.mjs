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
import { compareWithPrev, archiveCurrent } from "./sidefire-compare.mjs";

const FAST = process.argv.includes("--fast");
const CSV = "data/sidefire/input/holdings.csv";

// ── 買い増しルール（ここだけ直せば基準を変えられる）──
const RULE = {
  yieldMin: 3.5,    // これ未満は買わない（方針の「3.5〜4%中心」より）
  yieldMax: 6.0,    // これ超は「市場が減配を予想している」とみなして除外
  maxWeight: 3.0,   // 1銘柄が全体のこの%を超えたら買い増さない
  maxSector: 10.0,  // その業種が全体のこの%を超えていたら買い増さない
  minNoCut: 5,      // 何年連続で減配していなければ買ってよいか（実績ベース）
  listSize: 20,     // 毎月出す候補リストの件数
  // ── バランスの目標（ここを変えると「今月どこを厚くするか」が変わる）──
  targetDrop: 5.0,      // 不況時の配当減少率をここまで下げたい（%）
  targetDefensive: 35,  // ディフェンシブ比率の目標（%）
};

const { map: SEC } = JSON.parse(readFileSync("data/sidefire/sectors.json", "utf8"));
const master = JSON.parse(readFileSync("data/sidefire/dividend-master.json", "utf8"));
const manual = JSON.parse(readFileSync("data/sidefire/manual.json", "utf8"));
const divPolicy = existsSync("data/sidefire/dividend-policy.json")
  ? JSON.parse(readFileSync("data/sidefire/dividend-policy.json", "utf8"))
  : { stable: {}, watch: {} };
// 配当の実績（sidefire-dividend-history.mjs が作る。なくても動く）
const HIST = existsSync("data/sidefire/dividend-history.json")
  ? JSON.parse(readFileSync("data/sidefire/dividend-history.json", "utf8"))
  : { data: {}, _生成: null };
const hist = HIST.data || {};

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

// ── 配当の減りにくさ（dividend-policy.json）──
const stableCodes = codes.filter((c) => divPolicy.stable?.[c]);
const watchCodes = codes.filter((c) => divPolicy.watch?.[c]);
const stableValue = stableCodes.reduce((s, c) => s + pos[c].value, 0);
const watchValue = watchCodes.reduce((s, c) => s + pos[c].value, 0);

// 実績ベースの減配耐性（dividend-history.json より）
const vOf = (list) => list.reduce((s, c) => s + pos[c].value, 0);
const band = (lo, hi) => codes.filter((c) => hist[c] && hist[c].noCut >= lo && hist[c].noCut < hi);
const noHist = codes.filter((c) => !hist[c]);
const recentCut = codes.filter((c) => hist[c] && hist[c].noCut === 0);
const covidOk = codes.filter((c) => hist[c]?.covid === "減配なし");
const covidCut = codes.filter((c) => hist[c]?.covid === "減配あり");
const HIST_BANDS = [
  ["15年以上", 15, 99], ["10〜14年", 10, 15], ["5〜9年", 5, 10],
  ["1〜4年", 1, 5], ["直近で減配・据え置き", 0, 1],
];

const sectorPct = (s) => (bySector[s].value / total) * 100;

// ── 物差し① 不況が来たら配当がいくら減るか（コロナの実績から）──
// 業種名で「景気敏感だから減る」と決めつけず、実際に減らした実績で測る。
let dropYen = 0, dropKnown = 0;
for (const c of codes) {
  const d = hist[c]?.covidDrop, dv = pos[c].annualDiv;
  if (d == null || !dv) continue;
  dropKnown += dv;
  dropYen += (dv * d) / 100;
}
const dropPct = dropKnown ? (dropYen / dropKnown) * 100 : null;
const dropTop = codes
  .filter((c) => hist[c]?.covidDrop > 0 && pos[c].annualDiv)
  .map((c) => ({ c, name: pos[c].name, s33: pos[c].s33, div: pos[c].annualDiv, d: hist[c].covidDrop, lost: (pos[c].annualDiv * hist[c].covidDrop) / 100 }))
  .sort((a, b) => b.lost - a.lost);

// ── 物差し② 業種の集中（上限を超えているところ）──
const overCap = sectorRows.filter((r) => r.pct > RULE.maxSector);

// ── 物差し③ ディフェンシブ比率 ──
const defPct = (defV / total) * 100;

// ── 買い増しの優先度スコア（なぜ高いのかが見えるように内訳を持つ）──
function priority(c) {
  const p = pos[c], h = hist[c], parts = [];
  let pt = 0;
  if (h) {
    if (h.noCut >= 15) { pt += 3; parts.push(`非減配${h.noCut}年${h.capped ? "以上" : ""} +3`); }
    else if (h.noCut >= 10) { pt += 2; parts.push(`非減配${h.noCut}年 +2`); }
    else if (h.noCut >= 5) { pt += 1; parts.push(`非減配${h.noCut}年 +1`); }
    if (h.covidDrop === 0) { pt += 3; parts.push("コロナで減配なし +3"); }
    else if (h.covidDrop > 30) { pt -= 2; parts.push(`コロナで${h.covidDrop}%減 −2`); }
  }
  if (p.defensive && defPct < RULE.targetDefensive) { pt += 2; parts.push("ディフェンシブ +2"); }
  const sp = sectorPct(p.s33);
  if (sp < 5) { pt += 2; parts.push(`${p.s33}に余裕 +2`); }
  else if (sp < 8) { pt += 1; parts.push(`${p.s33}に余裕 +1`); }
  if (p.yieldNow >= 4) { pt += 1; parts.push(`利回り${p1(p.yieldNow)}% +1`); }
  return { pt, why: parts.join(" / ") };
}

// 「買ってよい条件」を満たす銘柄（割安かどうかはここでは見ない）
const eligible = codes.filter((c) => {
  const p = pos[c], h = hist[c];
  if (divPolicy.watch?.[c]) return false;
  if (p.yieldNow == null || p.yieldNow < RULE.yieldMin || p.yieldNow > RULE.yieldMax) return false;
  if (!h || h.noCut < RULE.minNoCut) return false;
  if ((p.value / total) * 100 > RULE.maxWeight) return false;
  if (sectorPct(p.s33) > RULE.maxSector) return false;
  return true;
});

// ── 前月との比較（分割補正込み）──
const stamp = `${manual.month.slice(0, 4)}-${String(manual.monthNum).padStart(2, "0")}`;
const cmp = compareWithPrev(pos, stamp);
const cmpByCode = Object.fromEntries(cmp.rows.map((r) => [r.code, r]));

// ── 買い増し候補の絞り込み ──
// 「①前月より下がった ②利回りが帯に入る ③減配リスク ④業種が厚すぎない ⑤1銘柄が大きすぎない」
// を順に当てはめ、落ちた理由も残す（なぜ候補が0件なのかが分かるように）。
const screened = [];
for (const c of codes) {
  const p = pos[c];
  const r = cmpByCode[c];
  const w = (p.value / total) * 100;
  const reject = [];

  if (!cmp.available) reject.push("前月データなし");
  else if (r?.isNew) reject.push("先月は保有なし");
  else if (r == null || r.chgPct >= 0) reject.push("値下がりしていない");

  if (p.yieldNow == null) reject.push("配当データなし");
  else if (p.yieldNow < RULE.yieldMin) reject.push(`利回り${p1(p.yieldNow)}%が低い`);
  else if (p.yieldNow > RULE.yieldMax) reject.push(`利回り${p1(p.yieldNow)}%が高すぎ（減配疑い）`);

  if (divPolicy.watch?.[c]) reject.push("減配リスクあり");
  if (w > RULE.maxWeight) reject.push(`1銘柄で${p1(w)}%（上限${RULE.maxWeight}%）`);
  if (sectorPct(p.s33) > RULE.maxSector) reject.push(`${p.s33}が${p1(sectorPct(p.s33))}%で厚い`);

  const h = hist[c];
  if (!h) reject.push("配当の実績データなし");
  else if (h.noCut < RULE.minNoCut) reject.push(`非減配${h.noCut}年（${RULE.minNoCut}年未満）`);

  if (!reject.length) {
    screened.push({
      code: c, name: p.name, s33: p.s33, value: p.value, weight: w,
      yieldNow: p.yieldNow, chgPct: r.chgPct, h, defensive: p.defensive,
      stable: divPolicy.stable?.[c] || null,
      nisa: p.yieldNow >= RULE.yieldMin,
      ...priority(c),
    });
  }
}
// バランスへの効き（優先度スコア）が高い順 → 同じなら下がり幅の大きい順
screened.sort((a, b) => b.pt - a.pt || a.chgPct - b.chgPct);

// ── 毎月の候補リスト ──
// 「安い銘柄」と「厚くしたい銘柄」を1つの表にまとめる。
// 買ってよい条件を満たすものを優先度で並べ、そのうえで「今月下がったか」を印で出す。
// 割安かどうかを足切りに使わないのは、下がる月が少なく候補が枯れてしまうため。
// 買うタイミングの判断（割安を待つ）は、印を見て本人がする。
const monthly = eligible
  .map((c) => {
    const r = cmpByCode[c];
    const fell = !!r && !r.isNew && r.chgPct < 0;
    return {
      c, name: pos[c].name, s33: pos[c].s33, y: pos[c].yieldNow,
      w: (pos[c].value / total) * 100, def: pos[c].defensive, h: hist[c],
      chgPct: r && !r.isNew ? r.chgPct : null, fell, ...priority(c),
    };
  })
  .sort((a, b) => b.pt - a.pt || (a.chgPct ?? 99) - (b.chgPct ?? 99))
  .slice(0, RULE.listSize);
const buyNow = monthly.filter((x) => x.fell);

// 値下がりした銘柄（候補に残らなかったものも含めて全部見せる）
const fallen = cmp.rows
  .filter((r) => !r.isNew && r.chgPct < 0)
  .sort((a, b) => a.chgPct - b.chgPct);

// ── 書き出し ──
const policy = existsSync("data/sidefire/policy.md")
  ? readFileSync("data/sidefire/policy.md", "utf8").replace(/^# .*\n/, "").trim()
  : "（data/sidefire/policy.md がありません）";

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

## 8. 配当の減りにくさ（実績ベース・自動集計）

**利回りの高さより、この比率を上げていくのが方針**（policy.md）。

過去20年の配当実績から「何年連続で配当を減らしていないか」を自動計算しています。
${HIST._生成 ? `データ取得日：${HIST._生成}` : ""}
会社が言っている方針ではなく、**実際に払った配当の記録**なので、宣言より確かな材料です。

### 非減配年数の分布

| 何年減らしていないか | 金額 | 比率 | 銘柄数 |
|---|--:|--:|--:|
${HIST_BANDS.map(([label, lo, hi]) => {
  const g = band(lo, hi);
  return `| ${label} | ${man(vOf(g))}万 | ${p1((vOf(g) / total) * 100)}% | ${g.length} |`;
}).join("\n")}
${noHist.length ? `| データなし | ${man(vOf(noHist))}万 | ${p1((vOf(noHist) / total) * 100)}% | ${noHist.length} |` : ""}

### コロナ（2019・2020年度）を減配せずに通ったか

| | 金額 | 比率 | 銘柄数 |
|---|--:|--:|--:|
| 減配なしで通過 | ${man(vOf(covidOk))}万 | ${p1((vOf(covidOk) / total) * 100)}% | ${covidOk.length} |
| 減配した | ${man(vOf(covidCut))}万 | ${p1((vOf(covidCut) / total) * 100)}% | ${covidCut.length} |

**これが「不況が来たら配当がいくら減るか」の最も実証的な手がかりです。**
コロナで減配した銘柄が多いほど、次の不況でも同じことが起きる可能性が高くなります。

### ⚠️ 直近の年度で減配・据え置きだった銘柄（${recentCut.length}件）

${recentCut.length
  ? `| コード | 銘柄 | 保有額 | 直近5年度の1株配当 | 記念配当疑い |
|---|---|--:|---|:--:|
${recentCut.sort((a, b) => pos[b].value - pos[a].value).map((c) => `| ${c} | ${pos[c].name} | ${yen(pos[c].value)}円 | ${hist[c].recent.map((r) => r.div).join(" → ")} | ${hist[c].spike ? "あり" : "－"} |`).join("\n")}

「記念配当疑い＝あり」は、一時的な上乗せが剥がれただけの可能性があります（本当の減配ではない）。
そうでないものは、**業績が落ちて配当を減らした**可能性を疑ってください。`
  : "- なし"}

### 「累進配当を宣言している」と登録済みの銘柄（手動・${p1((stableValue / total) * 100)}%）

宣言は数字に出ないので、ここだけ手で登録します（\`dividend-policy.json\`）。

${stableCodes.sort((a, b) => pos[b].value - pos[a].value).map((c) => `- ${c} ${pos[c].name}：${divPolicy.stable[c].type}｜${yen(pos[c].value)}円｜実績は非減配${hist[c] ? hist[c].noCut + "年" + (hist[c].capped ? "以上" : "") : "不明"}`).join("\n") || "- なし"}

### 買い増し候補から自動で外している銘柄

${watchCodes.map((c) => `- ${c} ${pos[c].name}：${divPolicy.watch[c].note}｜${yen(pos[c].value)}円`).join("\n") || "- なし"}

---

## 9. バランスの現在地（3つの物差し）

買い増しの向きを決めるための指標。**目標は \`sidefire-brief.mjs\` 冒頭の \`RULE\` で変えられます。**

### 物差し① 不況が来たら配当がいくら減るか ${dropPct == null ? "（データ不足）" : `**${p1(dropPct)}%**`}

${dropPct == null ? "" : `コロナのとき、いま持っている銘柄が実際に配当をどれだけ減らしたかを保有額で加重したものです。
**同じことが今起きると、年間配当 ${yen(divTotal)}円が ${yen(dropYen)}円 減ります。**

| | 数値 |
|---|--:|
| 現在 | ${p1(dropPct)}% |
| 目標 | ${p1(RULE.targetDrop)}%以下 |
| 差 | ${dropPct <= RULE.targetDrop ? "**達成済み**" : `${p1(dropPct - RULE.targetDrop)}pt 超過`} |

業種名で「景気敏感だから減る」と決めつけず、**実際に減らした実績**で測っています。
景気敏感に分類される会社でも、コロナで配当を守った会社は多いためです。

#### 配当を減らした影響が大きい銘柄
| コード | 銘柄 | 業種 | 年間配当 | コロナ時 | 目減り |
|---|---|---|--:|--:|--:|
${dropTop.slice(0, 8).map((x) => `| ${x.c} | ${x.name} | ${x.s33} | ${yen(x.div)}円 | −${p1(x.d)}% | **${yen(x.lost)}円** |`).join("\n")}

この表の上位を**買い増さない**だけで、比率は時間とともに下がります。`}

### 物差し② 業種が厚くなりすぎていないか（上限 ${RULE.maxSector}%）

${overCap.length
  ? `**上限を超えている業種：${overCap.length}件**

| 業種 | 現在 | 上限 | 超過 |
|---|--:|--:|--:|
${overCap.map((r) => `| ${r.s} | ${p1(r.pct)}% | ${RULE.maxSector}% | +${p1(r.pct - RULE.maxSector)}pt |`).join("\n")}

この業種の銘柄は買い増し候補から自動で外れます。`
  : `**すべて上限内です。**`}

### 物差し③ ディフェンシブ比率 **${p1(defPct)}%**

| | 数値 |
|---|--:|
| 現在 | ${p1(defPct)}% |
| 目標 | ${RULE.targetDefensive}% |
| 差 | ${defPct >= RULE.targetDefensive ? "**達成済み**" : `${p1(RULE.targetDefensive - defPct)}pt 不足`} |

${defPct < RULE.targetDefensive ? "不足しているので、ディフェンシブ銘柄に **+2点** の加点がついています。" : "達成しているので、加点はつけていません。"}

### → 今月の優先方向

${[
  dropPct != null && dropPct > RULE.targetDrop ? `1. **不況に強い銘柄を厚くする**（減少率 ${p1(dropPct)}% → 目標 ${p1(RULE.targetDrop)}%）。コロナで減配しなかった銘柄に +3点` : null,
  defPct < RULE.targetDefensive ? `2. **ディフェンシブを厚くする**（${p1(defPct)}% → 目標 ${RULE.targetDefensive}%）` : null,
  overCap.length ? `3. **${overCap.map((r) => r.s).join("・")}は買い増さない**（上限${RULE.maxSector}%超）` : null,
].filter(Boolean).join("\n") || "- 3つとも目標を満たしています。利回りと割安さだけで選んで問題ありません。"}

---

## 10. 今月の買い増し候補（上位${monthly.length}銘柄）

**すべて すでに保有している銘柄**です。新しく調べる必要はありません。
単元未満株なので、この中から数千円ずつ足していけば全体のバランスが整います。

### 買ってよい条件（これを満たすもの＝${eligible.length}銘柄）

| 条件 | 基準 |
|---|---|
| 利回りの帯 | ${RULE.yieldMin}% 以上 ${RULE.yieldMax}% 以下（高すぎは減配疑いで除外） |
| 減配していないか | **非減配${RULE.minNoCut}年以上**（実績）＋ \`watch\` 登録は除外 |
| 業種の厚さ | その業種が ${RULE.maxSector}% を超えていたら除外 |
| 1銘柄の上限 | 全体の ${RULE.maxWeight}% を超えていたら除外 |

この${eligible.length}銘柄を**優先度（§9のバランス指標）が高い順**に並べ、上位${monthly.length}件を出しています。

> **割安かどうかは足切りに使っていません。**
> 株価が下がる月は少なく、そこで切ると候補が数件まで枯れてしまうためです。
> 代わりに「今月」列に印を出すので、**買うタイミングはそこで判断**してください。

### 候補リスト

| 今月 | 優先度 | コード | 銘柄 | 業種 | 前月比 | 利回り | 非減配 | コロナ | 性格 |
|:--:|--:|---|---|---|--:|--:|--:|:--:|---|
${monthly.map((x) => `| ${x.fell ? "**✅**" : "－"} | **${x.pt}点** | ${x.c} | ${x.name} | ${x.s33} | ${x.chgPct == null ? "－" : p1(x.chgPct) + "%"} | ${p1(x.y)}% | ${x.h.noCut}年${x.h.capped ? "以上" : ""} | ${x.h.covidDrop === 0 ? "○" : `−${p1(x.h.covidDrop)}%`} | ${x.def ? "ディフェンシブ" : "景気敏感"} |`).join("\n")}

**✅ ＝ 前月末より株価が下がっている（いまが買い時）**
「コロナ」欄は2020年前後に**実際に1株配当が何%減ったか**。○は減らさなかった銘柄です。

${cmp.available
  ? buyNow.length
    ? `### いま下がっているのは ${buyNow.length}件

${buyNow.map((x) => `- **${x.name}（${x.pt}点・${p1(x.chgPct)}%）**：${x.why || "加点なし"}`).join("\n")}

この中から優先度の高いものを選べば、割安さとバランスの両方を満たせます。`
    : `### いま下がっている銘柄はありません

**これは失敗ではありません。** 相場が上がっている月は印がつきません。
その月は買わずに翌月へ繰り越してください（繰り越しは6ヶ月分までが目安）。
リストの銘柄が下がるのを待つ、という使い方になります。`
  : `前月（${cmp.prev}）のCSVが \`data/sidefire/archive/\` にないため、「今月」列は空欄です。
来月からは自動で保存されるので印がつきます。`}

### 点数の内訳（なぜこの順番か）

${monthly.map((x) => `- **${x.name}（${x.pt}点）**：${x.why || "加点なし"}`).join("\n")}

${monthly.some((x) => x.h.spike) ? `⚠️ 記念配当の疑いがある銘柄：${monthly.filter((x) => x.h.spike).map((x) => x.name).join("、")}\n` : ""}
${cmp.available && fallen.length ? `### 参考：値下がりした銘柄すべて（${fallen.length}件／${cmp.rows.filter((r) => !r.isNew).length}銘柄中）

候補に入らなかったものは、その理由も出しています。

| コード | 銘柄 | 業種 | 前月比 | 利回り | 候補に入ったか |
|---|---|---|--:|--:|---|
${fallen.slice(0, 25).map((r) => {
    const p = pos[r.code];
    const hit = monthly.find((s) => s.c === r.code);
    let why = hit ? `✅ 候補（${hit.pt}点）` : "";
    if (!hit) {
      const w = (p.value / total) * 100;
      if (divPolicy.watch?.[r.code]) why = "減配リスクあり";
      else if (p.yieldNow == null) why = "配当データなし";
      else if (p.yieldNow < RULE.yieldMin) why = `利回り${p1(p.yieldNow)}%が低い`;
      else if (p.yieldNow > RULE.yieldMax) why = `利回り${p1(p.yieldNow)}%が高すぎ`;
      else if (!hist[r.code]) why = "配当の実績データなし";
      else if (hist[r.code].noCut < RULE.minNoCut) why = `**非減配${hist[r.code].noCut}年**（${RULE.minNoCut}年未満）`;
      else if (w > RULE.maxWeight) why = `1銘柄で${p1(w)}%`;
      else if (sectorPct(p.s33) > RULE.maxSector) why = `${p.s33}が厚い（${p1(sectorPct(p.s33))}%）`;
      else why = `優先度が${RULE.listSize}位以内に届かず`;
    }
    return `| ${r.code} | ${r.name} | ${p.s33} | ${p1(r.chgPct)}% | ${p.yieldNow == null ? "-" : p1(p.yieldNow) + "%"} | ${why} |`;
  }).join("\n")}` : ""}

${cmp.notes.length ? `### ⚠️ 確認してほしいこと\n${cmp.notes.map((n) => `- ${n}`).join("\n")}` : ""}

---

## 11. 全保有銘柄

金額の大きい順。利回りは「今の株価に対する」もの（取得価格ベースではない）。

| # | コード | 銘柄 | 業種 | 金額 | 比率 | 利回り | 年間配当 | 口座 |
|--:|---|---|---|--:|--:|--:|--:|:--|
${codes.map((c, i) => {
  const p = pos[c];
  const acct = p.nisa && p.tokutei ? "両方" : p.nisa ? "NISA" : "特定";
  return `| ${i + 1} | ${c} | ${p.name} | ${p.s33} | ${yen(p.value)}円 | ${p1((p.value / total) * 100)}% | ${p.yieldNow == null ? "-" : p1(p.yieldNow) + "%"} | ${p.annualDiv == null ? "-" : yen(p.annualDiv) + "円"} | ${acct} |`;
}).join("\n")}

---

## 12. 分析をお願いしたいこと

**前提：売却はしません。買い増しだけでバランスを整えていきます。**
単元未満株を使っているので、1銘柄あたり数千円から調整できます。

1. §9の買い増し候補は妥当か。見落としているリスクはないか
2. 業種の偏りをどう見るか。厚すぎる／薄すぎる業種はどれか
3. 景気敏感 ${p1((cycV / total) * 100)}% ／ ディフェンシブ ${p1((defV / total) * 100)}% のバランスは方針に合っているか
4. コロナで減配した銘柄が ${p1((vOf(covidCut) / total) * 100)}% ある。次の不況にどう備えるか
5. 配当が6月・12月に偏っているのは直すべきか、気にしなくてよいか

**お願い**：専門用語は避けて平易に。リスクも正直に。
個別の売買指示ではなく、考え方とバランスの助言をお願いします。
`;

const out = `data/sidefire/brief-${stamp}.md`;
writeFileSync(out, md);
console.log(`\n✅ ${out} に書き出しました（${codes.length}銘柄）`);

// データが古いまま分析していないか警告する。
// 自動実行では気づけないので、ここで止めずに大きく出す。
const now = new Date();
const behind =
  (now.getFullYear() - +manual.month.slice(0, 4)) * 12 + (now.getMonth() + 1) - manual.monthNum;
if (behind > 1) {
  console.log(`\n⚠️⚠️  データが ${behind}ヶ月ぶん古いままです（manual.json は「${manual.month}」）`);
  console.log(`     証券CSVを ${CSV} に置き換えて、manual.json の month / monthNum を直してください。`);
  console.log(`     このまま出したレポートは古い保有状況にもとづいています。`);
}

// 次回の比較用に今月のCSVを保存
const arc = archiveCurrent(CSV, stamp);
console.log(arc.saved ? `📁 ${arc.dest} に保存（来月の比較用）` : `📁 ${arc.dest} は保存済み`);

console.log(`\n📊 買い増し候補 上位${monthly.length}銘柄（条件を満たすのは${eligible.length}銘柄）`);
for (const x of monthly)
  console.log(`   ${x.fell ? "✅" : "  "} ${String(x.pt).padStart(2)}点 ${x.c} ${x.name}（利回り${p1(x.y)}% / 非減配${x.h.noCut}年${x.h.capped ? "以上" : ""}${x.chgPct == null ? "" : ` / 前月比${p1(x.chgPct)}%`}）`);

if (cmp.available) {
  console.log(`\n   ✅ = いま下がっている銘柄：${buyNow.length}件${buyNow.length ? "" : "（今月は見送って繰り越すのが素直です）"}`);
  for (const n of cmp.notes) console.log(`   ⚠️ ${n.replace(/\*\*/g, "")}`);
} else {
  console.log(`\n   前月（${cmp.prev}）のCSVがないため「今月下がったか」は判定なし。`);
}

console.log("\n   ⚠️ 個別銘柄が入っています。公開の場に貼らないでください。\n");
