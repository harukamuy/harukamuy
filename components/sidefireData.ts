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
    month: "2026年3月末",
    monthNum: 3,
    index: 3582,
    highDiv: 1482,
    cash: 300,
    btc: 120,
    //                  1月 2月    3月     4月   5月     6月      7月   8月     9月     10月   11月    12月
    dividendForecast: [0, 11038, 43523, 7963, 17125, 157139, 9728, 11038, 39475, 13665, 11280, 148025],
    dividendYieldPct: 4.90,
  },
  {
    month: "2026年4月末",
    monthNum: 4,
    index: 3669,
    highDiv: 1471,
    cash: 300,
    btc: 120,
    //                  1月 2月    3月     4月   5月     6月      7月   8月     9月     10月   11月    12月
    dividendForecast: [0, 11226, 44264, 8099, 17416, 159813, 9894, 11226, 40147, 13898, 11472, 150544],
    dividendYieldPct: 4.87,
  },
  {
    month: "2026年5月末",
    monthNum: 5,
    index: 3823,
    highDiv: 1565,
    cash: 300,
    btc: 118,
    //                  1月 2月    3月     4月   5月     6月       7月   8月     9月     10月   11月    12月
    dividendForecast: [0, 11426, 45051, 8243, 17726, 162656, 10070, 11426, 40861, 14145, 11676, 153222],
    dividendYieldPct: 4.85,
  },
  {
    month: "2026年6月末",
    monthNum: 6,
    index: 3839,
    highDiv: 1575,
    cash: 300,
    btc: 95,
    //                  1月 2月    3月     4月   5月     6月       7月   8月     9月     10月   11月    12月
    dividendForecast: [0, 11486, 45111, 8303, 18099, 164602, 10130, 11486, 40921, 14206, 12049, 155168],
    dividendYieldPct: 4.83,
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
    monthLabel: s.month,                                      // "2026年5月末"
    totalManYen: totalOf(s),                                  // 5806
    totalManYenStr: totalOf(s).toLocaleString("ja-JP"),       // "5,806"
    annualDividendManYen: Math.round(dividendTotalOf(s) / 10000), // 49
    yieldPctStr: s.dividendYieldPct.toFixed(2),               // "4.85"
  };
}

export const MONTH_LABELS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];
