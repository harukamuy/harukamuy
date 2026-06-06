"use client";

import { useState } from "react";
import AssetTrendChart from "./AssetTrendChart";
import { SNAPSHOTS } from "./sidefireData";

// トップページ用の資産推移グラフ。
// AssetTrendChart は selectedIdx を親が持つ設計なので、
// ここで状態だけ管理して最新月を初期選択にする。
export default function HomeAssetChart() {
  const [idx, setIdx] = useState(SNAPSHOTS.length - 1);
  return (
    <AssetTrendChart snapshots={SNAPSHOTS} selectedIdx={idx} onSelect={setIdx} />
  );
}
