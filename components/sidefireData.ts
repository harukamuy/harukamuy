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
  },
  {
    month: "2026年5月",
    monthNum: 5,
    index: 3669,
    highDiv: 1450,
    cash: 300,
    btc: 120,
    dividendForecast: [3000, 3000, 35407, 4440, 16206, 199487, 3000, 3000, 30607, 4440, 5050, 184812],
  },
];

export function totalOf(s: Snapshot): number {
  return s.index + s.highDiv + s.cash + s.btc;
}

export function dividendTotalOf(s: Snapshot): number {
  return s.dividendForecast.reduce((a, b) => a + b, 0);
}

export const MONTH_LABELS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];
