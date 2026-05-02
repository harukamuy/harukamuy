// ═══════════════════════════════════════════════════════════════════
// 月次スナップショットデータ（毎月この配列に1件追加するだけ）
// ═══════════════════════════════════════════════════════════════════

export type Snapshot = {
  /** 表示用ラベル（例: "2026年4月"） */
  month: string;
  /** 何月のスナップショットか（1-12） */
  monthNum: number;
  /** インデックス（オルカン・S&P500・iDeCo合算）万円 */
  index: number;
  /** 高配当株＋BND（米国債券ETF） 万円 */
  highDiv: number;
  /** 現金 万円 */
  cash: number;
  /** ビットコイン 万円 */
  btc: number;
  /** その時点での「12ヶ月の年間配当想定」円（1月〜12月の順、BND込み） */
  dividendForecast: number[];
  /** 配当利回り(%) ※高配当株部分（BND除く）に対する利回り */
  dividendYieldPct: number;
};

export const SNAPSHOTS: Snapshot[] = [
  {
    month: "2026年4月",
    monthNum: 4,
    index: 3582,
    highDiv: 1461,
    cash: 300,
    btc: 120,
    //                  1月    2月    3月     4月    5月     6月      7月    8月    9月     10月   11月  12月
    dividendForecast: [3000, 3000, 35407, 4440, 16206, 198287, 3000, 3000, 30207, 4440, 5000, 184312],
    dividendYieldPct: 4.94,
  },
  {
    month: "2026年5月",
    monthNum: 5,
    index: 3669,
    highDiv: 1450,
    cash: 300,
    btc: 120,
    dividendForecast: [3000, 3000, 35407, 4440, 16206, 199487, 3000, 3000, 30607, 4440, 5050, 184812],
    dividendYieldPct: 4.94,
  },
];

// ═══════════════════════════════════════════════════════════════════
// 計算ヘルパー
// ═══════════════════════════════════════════════════════════════════

export function totalOf(s: Snapshot): number {
  return s.index + s.highDiv + s.cash + s.btc;
}

export function dividendTotalOf(s: Snapshot): number {
  return s.dividendForecast.reduce((a, b) => a + b, 0);
}

/** 最新のスナップショット（配列の末尾） */
export function latestSnapshot(): Snapshot {
  return SNAPSHOTS[SNAPSHOTS.length - 1];
}

/** 各ページのHero/Sidebarに表示する数値（最新月ベース） */
export function latestStats() {
  const s = latestSnapshot();
  return {
    monthLabel: s.month,                                      // "2026年5月"
    totalManYen: totalOf(s),                                  // 5539
    totalManYenStr: totalOf(s).toLocaleString("ja-JP"),       // "5,539"
    annualDividendManYen: Math.round(dividendTotalOf(s) / 10000), // 49
    yieldPctStr: s.dividendYieldPct.toFixed(2),               // "4.94"
  };
}

export const MONTH_LABELS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];
