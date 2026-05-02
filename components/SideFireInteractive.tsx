"use client";

import { useState } from "react";
import MonthlyAssetTracker from "./MonthlyAssetTracker";
import DividendLog from "./DividendLog";
import AssetTrendChart from "./AssetTrendChart";
import { SNAPSHOTS } from "./sidefireData";

export default function SideFireInteractive() {
  // デフォルトは最新月
  const [selectedIdx, setSelectedIdx] = useState(SNAPSHOTS.length - 1);
  const snapshot = SNAPSHOTS[selectedIdx];

  return (
    <>
      {/* ── 月タブ（クリック可能性を明示） ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--brown-3)",
            letterSpacing: "0.06em",
            marginRight: 4,
          }}
        >
          表示する月：
        </span>
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            flexWrap: "wrap",
          }}
        >
          {SNAPSHOTS.map((s, i) => {
            const isActive = i === selectedIdx;
            return (
              <button
                key={s.month}
                onClick={() => setSelectedIdx(i)}
                style={{
                  background: isActive ? "var(--green)" : "var(--white)",
                  color: isActive ? "white" : "var(--brown-2)",
                  border: `1.5px solid ${isActive ? "var(--green)" : "var(--beige)"}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {s.month}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 資産推移の折れ線グラフ ── */}
      <div style={{ marginBottom: 32 }}>
        <AssetTrendChart
          snapshots={SNAPSHOTS}
          selectedIdx={selectedIdx}
          onSelect={setSelectedIdx}
        />
      </div>

      {/* ── 内訳ドーナツ + テーブル ── */}
      <MonthlyAssetTracker
        snapshots={SNAPSHOTS}
        selectedIdx={selectedIdx}
        onSelect={setSelectedIdx}
      />

      {/* ── 配当金ログ見出し ── */}
      <div style={{ marginTop: 56, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>
            配当金ログ
          </div>
          <div style={{ fontSize: 12, color: "var(--brown-3)" }}>
            {snapshot.month}時点
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: 14,
            color: "var(--brown-3)",
          }}
        >
          Dividend Log
        </div>
      </div>

      <DividendLog
        dividendByMonth={snapshot.dividendForecast}
        snapshotLabel={`${snapshot.month}`}
        snapshotMonthNum={snapshot.monthNum}
      />
    </>
  );
}
