// このファイルは scripts/sidefire-sectors.mjs が自動生成します。手で編集しないでください。
// 生成元は data/ 配下（非公開）。ここに出るのは集計値だけです。

export type SectorRow = {
  /** 業種名（東証17業種ベース） */
  name: string;
  /** 評価額（万円） */
  manYen: number;
  /** 全体に占める割合（%） */
  pct: number;
  /** 銘柄数 */
  count: number;
  /** 景気敏感 or ディフェンシブ */
  bucket: "cyclical" | "defensive";
};

export const SECTOR_AS_OF = "2026-08-31";
export const SECTOR_TOTAL_MANYEN = 1391;
export const SECTOR_STOCK_COUNT = 119;

export const SECTORS: SectorRow[] = [
  {
    "name": "素材・化学",
    "manYen": 167,
    "pct": 12,
    "count": 16,
    "bucket": "cyclical"
  },
  {
    "name": "商社・卸売",
    "manYen": 153,
    "pct": 11,
    "count": 9,
    "bucket": "cyclical"
  },
  {
    "name": "情報・通信業",
    "manYen": 146,
    "pct": 10.5,
    "count": 14,
    "bucket": "defensive"
  },
  {
    "name": "自動車・輸送機",
    "manYen": 115,
    "pct": 8.2,
    "count": 7,
    "bucket": "cyclical"
  },
  {
    "name": "建設・資材",
    "manYen": 97,
    "pct": 7,
    "count": 10,
    "bucket": "cyclical"
  },
  {
    "name": "金融（除く銀行）",
    "manYen": 95,
    "pct": 6.8,
    "count": 5,
    "bucket": "cyclical"
  },
  {
    "name": "電機・精密",
    "manYen": 88,
    "pct": 6.3,
    "count": 6,
    "bucket": "cyclical"
  },
  {
    "name": "サービス業",
    "manYen": 82,
    "pct": 5.9,
    "count": 10,
    "bucket": "defensive"
  },
  {
    "name": "その他製品",
    "manYen": 58,
    "pct": 4.2,
    "count": 3,
    "bucket": "cyclical"
  },
  {
    "name": "機械",
    "manYen": 56,
    "pct": 4,
    "count": 6,
    "bucket": "cyclical"
  },
  {
    "name": "銀行",
    "manYen": 56,
    "pct": 4,
    "count": 3,
    "bucket": "cyclical"
  },
  {
    "name": "不動産",
    "manYen": 53,
    "pct": 3.8,
    "count": 3,
    "bucket": "cyclical"
  },
  {
    "name": "食品",
    "manYen": 49,
    "pct": 3.5,
    "count": 6,
    "bucket": "defensive"
  },
  {
    "name": "医薬品",
    "manYen": 42,
    "pct": 3,
    "count": 3,
    "bucket": "defensive"
  },
  {
    "name": "倉庫・運輸関連業",
    "manYen": 39,
    "pct": 2.8,
    "count": 6,
    "bucket": "cyclical"
  },
  {
    "name": "空運業",
    "manYen": 36,
    "pct": 2.6,
    "count": 2,
    "bucket": "cyclical"
  },
  {
    "name": "小売",
    "manYen": 18,
    "pct": 1.3,
    "count": 3,
    "bucket": "defensive"
  },
  {
    "name": "陸運業",
    "manYen": 17,
    "pct": 1.3,
    "count": 3,
    "bucket": "defensive"
  },
  {
    "name": "電力・ガス",
    "manYen": 10,
    "pct": 0.7,
    "count": 1,
    "bucket": "defensive"
  },
  {
    "name": "エネルギー資源",
    "manYen": 9,
    "pct": 0.6,
    "count": 2,
    "bucket": "cyclical"
  },
  {
    "name": "鉄鋼・非鉄",
    "manYen": 5,
    "pct": 0.3,
    "count": 1,
    "bucket": "cyclical"
  }
];

/** 景気敏感 / ディフェンシブ の内訳 */
export const CYCLE_SPLIT = {
  "cyclical": {
    "count": 79,
    "manYen": 1026,
    "pct": 73.8
  },
  "defensive": {
    "count": 40,
    "manYen": 365,
    "pct": 26.2
  }
};

/** 年率リスク（直近1年・日次・241営業日） */
export const RISK = {
  /** ポートフォリオ全体の年率リスク（%） */
  annualPct: 15.0,
  /** 1銘柄ずつのリスクを保有金額の重みで平均したもの（%） */
  soloAvgPct: 27.4,
  /** 分散で消えたぶん（ポイント） */
  diversifiedPt: 12.4,
  /** ふつうの1年の振れ幅（万円・±1σ） */
  swingManYen: 208,
  /** 計算に使った営業日数 */
  tradingDays: 241,
};
