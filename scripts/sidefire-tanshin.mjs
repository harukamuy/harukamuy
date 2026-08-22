// ═══════════════════════════════════════════════════════════════════
// 決算短信PDFから ROIC−WACC に必要な4つの数字を拾う。
//   実行: node scripts/sidefire-tanshin.mjs <コード> <PDFのURL> [...]
//   例:   node scripts/sidefire-tanshin.mjs 3231 https://.../renketsu_20260424.pdf
//
// 決算短信には前期比較が載っているので、1本で2期分取れる。
// 3期分ほしいときは2本（今期ぶんと2年前ぶん）を渡す。
//
// 拾うもの: 営業利益 / 総資産 / 純資産 / 流動負債合計
// 出力: data/sidefire/fundamentals.json の stocks に追記（既存は上書き）
//
// ⚠️ 表はラベルと数値が別々に描かれているので、
//    ラベルと同じ「高さ」にある数値を左から拾う。ラベルは完全一致で探す
//    （「資産合計」で部分一致させると「負債純資産合計」を拾ってしまう）。
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const OUT = "data/sidefire/fundamentals.json";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)";

// PDFの表からラベル行の数値を拾うPythonスクリプト（PyMuPDFを使う）
const PY = `
import fitz, json, re, sys
doc = fitz.open(sys.argv[1])

# ページごとに単位が違う。決算短信は損益計算書が百万円、貸借対照表が千円のことがある。
# 単位を見ずに拾うと桁が1000倍ずれるので、必ずページごとに判定して百万円に揃える。
UNIT = {"千円": 0.001, "百万円": 1.0, "億円": 100.0, "円": 0.000001}
def unit_of(text):
    m = re.search(r"単位[：:]\\s*[（(]?\\s*(千円|百万円|億円|円)", text)
    if m: return UNIT[m.group(1)], m.group(1)
    m = re.search(r"[（(]\\s*(千円|百万円|億円)\\s*未満", text)
    if m: return UNIT[m.group(1)], m.group(1)
    return 1.0, "百万円(既定)"

def row_values(page, label, factor):
    words = page.get_text("words")
    # ラベルは完全一致。部分一致だと「負債純資産合計」を「資産合計」で拾ってしまう
    tgt = [w for w in words if w[4] == label]
    if not tgt: return None
    y = (tgt[0][1] + tgt[0][3]) / 2
    out = []
    for w in words:
        wy = (w[1] + w[3]) / 2
        if abs(wy - y) <= 3.0:
            t = w[4].replace(",", "").replace("△", "-").replace("▲", "-")
            if re.fullmatch(r"-?\\d+", t): out.append((w[0], round(int(t) * factor)))
    out.sort()
    return [v for _, v in out] or None

want = ["営業利益", "総資産", "純資産合計", "流動負債合計", "負債純資産合計"]
found = {}
for i in range(doc.page_count):
    p = doc[i]
    factor, uname = unit_of(p.get_text())
    for lbl in want:
        if lbl in found: continue
        v = row_values(p, lbl, factor)
        if v and len(v) >= 2:
            found[lbl] = {"page": i + 1, "values": v, "unit": uname}
title = doc[0].get_text().strip().split("\\n")[0]
print(json.dumps({"title": title, "pages": doc.page_count, "found": found}, ensure_ascii=False))
`;

// PyMuPDF(fitz)が入っているPythonを探す。
// pyenv などで python3 の実体がディレクトリごとに変わるため、決め打ちにしない。
let PYTHON = null;
function findPython() {
  if (PYTHON) return PYTHON;
  const cands = ["python3"];
  try {
    const vers = execFileSync("bash", ["-lc", "ls ~/.pyenv/versions 2>/dev/null"], { encoding: "utf8" })
      .trim().split("\n").filter(Boolean);
    for (const v of vers) cands.push(`${process.env.HOME}/.pyenv/versions/${v}/bin/python3`);
  } catch {}
  cands.push("/opt/homebrew/bin/python3", "/usr/local/bin/python3", "/usr/bin/python3");
  for (const c of cands) {
    try {
      execFileSync(c, ["-c", "import fitz"], { stdio: "ignore" });
      PYTHON = c;
      return c;
    } catch {}
  }
  throw new Error(
    "PyMuPDF(fitz) が入っているPythonが見つかりません。\n" +
    "   インストール: python3 -m pip install pymupdf"
  );
}

function extract(pdfPath) {
  const dir = mkdtempSync(join(tmpdir(), "tanshin-"));
  const py = join(dir, "x.py");
  writeFileSync(py, PY);
  return JSON.parse(execFileSync(findPython(), [py, pdfPath], { encoding: "utf8" }));
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.subarray(0, 4).toString() !== "%PDF") throw new Error("PDFではありません");
  writeFileSync(dest, buf);
  return buf.length;
}

// ── 実行 ──
const [code, ...urls] = process.argv.slice(2);
if (!code || !urls.length) {
  console.error("使い方: node scripts/sidefire-tanshin.mjs <コード> <決算短信PDFのURL> [URL2...]");
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "tanshin-pdf-"));
const results = [];
for (const [i, url] of urls.entries()) {
  const dest = join(dir, `t${i}.pdf`);
  try {
    const size = await download(url, dest);
    const r = extract(dest);
    console.log(`\n📄 ${r.title}（${r.pages}ページ・${Math.round(size / 1024)}KB）`);
    for (const [k, v] of Object.entries(r.found)) {
      console.log(`   ${k.padEnd(8)} p${String(v.page).padStart(2)}  左(前期)=${v.values[0].toLocaleString()}  右(当期)=${v.values[1].toLocaleString()}  [原単位 ${v.unit}]`);
    }
    const miss = ["営業利益", "純資産合計", "流動負債合計"].filter((k) => !r.found[k]);
    if (miss.length) console.log(`   ⚠️ 拾えなかった項目: ${miss.join("、")}（PDFを開いて手で入れてください）`);
    results.push(r);
  } catch (e) {
    console.log(`\n❌ ${url}\n   ${e.message}`);
  }
}

if (!results.length) process.exit(1);

// 年度は短信のタイトル（例「2026年３月期 決算短信」）から取る
const zen = (s) => s.replace(/[０-９]/g, (d) => "０１２３４５６７８９".indexOf(d));
const fyOf = (title) => {
  const m = zen(title).match(/(\d{4})年\s*(\d{1,2})月期/);
  return m ? +m[1] - (+m[2] < 4 ? 1 : 0) : null; // 3月期なら前年度扱い
};

const fund = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { stocks: {} };
fund.stocks ??= {};
const entry = (fund.stocks[code] ??= { years: {} });
entry.years ??= {};

let added = 0;
for (const r of results) {
  const fy = fyOf(r.title);
  if (fy == null) { console.log(`\n⚠️ 年度が読めません: ${r.title}`); continue; }
  const g = (k, idx) => r.found[k]?.values?.[idx] ?? null;
  const ta = r.found["総資産"] ? "総資産" : "負債純資産合計";
  // 短信は「左=前期・右=当期」。当期はfy、前期はfy-1として2期ぶん入る
  for (const [idx, y] of [[1, fy], [0, fy - 1]]) {
    const row = {
      operatingIncome: g("営業利益", idx),
      totalAssets: g(ta, idx),
      netAssets: g("純資産合計", idx),
      currentLiabilities: g("流動負債合計", idx),
    };
    if (Object.values(row).some((v) => v == null)) continue;
    entry.years[y] = row;
    added++;
  }
}

entry.source ??= [];
for (const u of urls) if (!entry.source.includes(u)) entry.source.push(u);
entry.unit = "百万円";

writeFileSync(OUT, JSON.stringify(fund, null, 2));
console.log(`\n✅ ${OUT} に ${code} の ${added}期分を保存`);
console.log(`   年度: ${Object.keys(entry.years).sort().join(", ")}`);
console.log(`\n   ⚠️ 数字は必ず短信PDFと突き合わせて確認してください。表の読み取りは完璧ではありません。`);
