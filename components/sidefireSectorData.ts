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

export const SECTOR_AS_OF = "2026-08-13";
export const SECTOR_TOTAL_MANYEN = 1315;
export const SECTOR_STOCK_COUNT = 117;

export const SECTORS: SectorRow[] = [
  {
    "name": "素材・化学",
    "manYen": 152,
    "pct": 11.5,
    "count": 16,
    "bucket": "cyclical"
  },
  {
    "name": "商社・卸売",
    "manYen": 147,
    "pct": 11.2,
    "count": 9,
    "bucket": "cyclical"
  },
  {
    "name": "情報・通信業",
    "manYen": 130,
    "pct": 9.9,
    "count": 13,
    "bucket": "defensive"
  },
  {
    "name": "自動車・輸送機",
    "manYen": 105,
    "pct": 8,
    "count": 7,
    "bucket": "cyclical"
  },
  {
    "name": "建設・資材",
    "manYen": 94,
    "pct": 7.2,
    "count": 10,
    "bucket": "cyclical"
  },
  {
    "name": "金融（除く銀行）",
    "manYen": 94,
    "pct": 7.1,
    "count": 5,
    "bucket": "cyclical"
  },
  {
    "name": "電機・精密",
    "manYen": 85,
    "pct": 6.5,
    "count": 6,
    "bucket": "cyclical"
  },
  {
    "name": "サービス業",
    "manYen": 79,
    "pct": 6,
    "count": 10,
    "bucket": "defensive"
  },
  {
    "name": "その他製品",
    "manYen": 56,
    "pct": 4.3,
    "count": 3,
    "bucket": "cyclical"
  },
  {
    "name": "機械",
    "manYen": 54,
    "pct": 4.1,
    "count": 6,
    "bucket": "cyclical"
  },
  {
    "name": "不動産",
    "manYen": 54,
    "pct": 4.1,
    "count": 3,
    "bucket": "cyclical"
  },
  {
    "name": "銀行",
    "manYen": 53,
    "pct": 4,
    "count": 3,
    "bucket": "cyclical"
  },
  {
    "name": "食品",
    "manYen": 48,
    "pct": 3.7,
    "count": 6,
    "bucket": "defensive"
  },
  {
    "name": "医薬品",
    "manYen": 38,
    "pct": 2.9,
    "count": 3,
    "bucket": "defensive"
  },
  {
    "name": "倉庫・運輸関連業",
    "manYen": 37,
    "pct": 2.8,
    "count": 6,
    "bucket": "cyclical"
  },
  {
    "name": "空運業",
    "manYen": 35,
    "pct": 2.7,
    "count": 2,
    "bucket": "cyclical"
  },
  {
    "name": "陸運業",
    "manYen": 17,
    "pct": 1.3,
    "count": 3,
    "bucket": "defensive"
  },
  {
    "name": "小売",
    "manYen": 15,
    "pct": 1.2,
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
    "manYen": 7,
    "pct": 0.5,
    "count": 1,
    "bucket": "cyclical"
  },
  {
    "name": "鉄鋼・非鉄",
    "manYen": 5,
    "pct": 0.4,
    "count": 1,
    "bucket": "cyclical"
  }
];

/** 景気敏感 / ディフェンシブ の内訳 */
export const CYCLE_SPLIT = {
  "cyclical": {
    "manYen": 978,
    "count": 78,
    "pct": 74.3
  },
  "defensive": {
    "manYen": 338,
    "count": 39,
    "pct": 25.7
  }
};

/** 年率リスク（直近1年・日次・242営業日） */
export const RISK = {
  /** ポートフォリオ全体の年率リスク（%） */
  annualPct: 14.8,
  /** 1銘柄ずつのリスクを保有金額の重みで平均したもの（%） */
  soloAvgPct: 26.9,
  /** 分散で消えたぶん（ポイント） */
  diversifiedPt: 12.2,
  /** ふつうの1年の振れ幅（万円・±1σ） */
  swingManYen: 194,
  /** 計算に使った営業日数 */
  tradingDays: 242,
};
