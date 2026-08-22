// ═══════════════════════════════════════════════════════════════════
// ROIC − WACC を計算する。
//   ROIC … 事業に投じた資本が、どれだけ利益を生んでいるか
//   WACC … その資本を調達するのにかかっているコスト
//   差がプラス＝資本コストを上回る価値を生んでいる（長期の増配余力の裏づけ）
//
// 財務データ（fundamentals.json）は手入力、βは beta.json から自動。
// 埋まっている銘柄だけ返す。未入力は null（表では空欄になる）。
//
// ⚠️ 単年で判断しないこと。一時的な損失で「WACC割れ」に見えることがある
//    （JTの2024年が訴訟費用でそうなった）。複数年の平均を返している。
// ═══════════════════════════════════════════════════════════════════

// 投下資本の概念が違うため計算しない業種
const SKIP_SECTORS = new Set([
  "銀行業", "保険業", "証券、商品先物取引業", "その他金融業",
]);

/**
 * @param {string} code 銘柄コード
 * @param {object} fund fundamentals.json をパースしたもの
 * @param {object} betaData beta.json の data
 * @param {string} sector 33業種名
 */
export function roicWacc(code, fund, betaData, sector) {
  if (SKIP_SECTORS.has(sector)) return { skipped: "金融は対象外" };

  const entry = fund?.stocks?.[code];
  const years = entry?.years;
  if (!years || !Object.keys(years).length) return null;

  const b = betaData?.[code];
  if (!b) return null;

  const taxRate = entry.taxRate ?? fund._前提?.実効税率 ?? 0.3;
  const costOfDebt = entry.costOfDebt ?? fund._前提?.負債コスト ?? 0.01;
  const coe = b.costOfEquity / 100; // beta.json は % で持っている

  const rows = [];
  for (const [fy, v] of Object.entries(years)) {
    const { operatingIncome: op, totalAssets: ta, netAssets: na, currentLiabilities: cl } = v;
    if ([op, ta, na, cl].some((x) => typeof x !== "number")) continue;

    const invested = ta - cl;           // 投下資本
    if (invested <= 0 || na <= 0) continue;

    const nopat = op * (1 - taxRate);
    const roic = (nopat / invested) * 100;

    const E = na;
    const D = Math.max(0, invested - na);
    const wacc = ((E / (D + E)) * coe + (D / (D + E)) * costOfDebt * (1 - taxRate)) * 100;

    rows.push({ fy: +fy, roic: +roic.toFixed(1), wacc: +wacc.toFixed(1), spread: +(roic - wacc).toFixed(1) });
  }
  if (!rows.length) return null;

  rows.sort((a, b2) => a.fy - b2.fy);
  const avg = (k) => rows.reduce((s, r) => s + r[k], 0) / rows.length;
  return {
    roic: +avg("roic").toFixed(1),
    wacc: +avg("wacc").toFixed(1),
    spread: +avg("spread").toFixed(1),
    beta: b.beta,
    n: rows.length,
    single: rows.length < 2,       // 単年しかない＝鵜呑みにしない印
    negativeYears: rows.filter((r) => r.spread < 0).length,
    rows,
  };
}
