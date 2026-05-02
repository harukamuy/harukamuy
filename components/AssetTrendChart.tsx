"use client";

import { Snapshot, totalOf } from "./sidefireData";

interface Props {
  snapshots: Snapshot[];
  selectedIdx: number;
  onSelect: (i: number) => void;
}

// SVG viewBox 内の論理座標
const VB_W = 800;
const VB_H = 240;
const PAD_L = 56;   // 左の数値ラベル領域
const PAD_R = 24;
const PAD_T = 24;
const PAD_B = 36;   // 下の月ラベル領域

function fmt(n: number) {
  return n.toLocaleString("ja-JP");
}

export default function AssetTrendChart({ snapshots, selectedIdx, onSelect }: Props) {
  const totals = snapshots.map(totalOf);
  const minVal = Math.min(...totals);
  const maxVal = Math.max(...totals);

  // Y軸範囲は ±5% のマージンを追加（差が小さくても変化が見えるように）
  const range = Math.max(maxVal - minVal, 1);
  const yMin = Math.floor((minVal - range * 0.4) / 100) * 100;
  const yMax = Math.ceil((maxVal + range * 0.4) / 100) * 100;

  const innerW = VB_W - PAD_L - PAD_R;
  const innerH = VB_H - PAD_T - PAD_B;

  // X座標: 1点しかない場合は中央、それ以外は等間隔
  const xOf = (i: number) => {
    if (snapshots.length === 1) return PAD_L + innerW / 2;
    return PAD_L + (i / (snapshots.length - 1)) * innerW;
  };
  const yOf = (v: number) =>
    PAD_T + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  // Y軸目盛 (4本)
  const yTicks = Array.from({ length: 5 }, (_, i) => yMin + ((yMax - yMin) * i) / 4);

  // ラインのパス
  const linePath = snapshots
    .map((_, i) => `${i === 0 ? "M" : "L"} ${xOf(i)} ${yOf(totals[i])}`)
    .join(" ");

  // エリア塗りのパス
  const areaPath =
    linePath +
    ` L ${xOf(snapshots.length - 1)} ${PAD_T + innerH}` +
    ` L ${xOf(0)} ${PAD_T + innerH} Z`;

  // 開始からの増減
  const firstTotal = totals[0];
  const selectedTotal = totals[selectedIdx];
  const diff = selectedTotal - firstTotal;
  const diffPct = (diff / firstTotal) * 100;

  return (
    <div
      style={{
        background: "var(--white)",
        border: "1.5px solid var(--beige)",
        borderRadius: 18,
        padding: "20px 22px 16px",
      }}
    >
      {/* ヘッダー */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brown)" }}>
          総資産の推移
        </div>
        <div style={{ fontSize: 11, color: "var(--brown-3)" }}>Total Asset Trend</div>
        {snapshots.length > 1 && selectedIdx > 0 && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
            }}
          >
            <span style={{ color: "var(--brown-3)" }}>
              {snapshots[0].month}比
            </span>
            <span
              style={{
                fontWeight: 700,
                color: diff >= 0 ? "var(--green)" : "var(--terra)",
              }}
            >
              {diff >= 0 ? "▲" : "▼"} {fmt(Math.abs(diff))}万円
            </span>
            <span
              style={{
                fontSize: 11,
                color: diff >= 0 ? "var(--green)" : "var(--terra)",
                opacity: 0.8,
              }}
            >
              ({diff >= 0 ? "+" : ""}
              {diffPct.toFixed(1)}%)
            </span>
          </div>
        )}
      </div>

      {/* SVG グラフ */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 背景グリッド（横線） */}
        {yTicks.map((t, i) => (
          <line
            key={i}
            x1={PAD_L}
            x2={VB_W - PAD_R}
            y1={yOf(t)}
            y2={yOf(t)}
            stroke="var(--beige)"
            strokeWidth={1}
            strokeDasharray={i === 0 ? "0" : "3 3"}
            opacity={i === 0 ? 0.6 : 0.4}
          />
        ))}

        {/* Y軸ラベル */}
        {yTicks.map((t, i) => (
          <text
            key={i}
            x={PAD_L - 8}
            y={yOf(t) + 4}
            fontSize={11}
            fill="var(--brown-3)"
            textAnchor="end"
          >
            {fmt(Math.round(t))}
          </text>
        ))}

        {/* エリア塗り（2点以上のとき） */}
        {snapshots.length > 1 && (
          <path d={areaPath} fill="var(--green-lt)" opacity={0.15} />
        )}

        {/* 折れ線 */}
        {snapshots.length > 1 && (
          <path
            d={linePath}
            fill="none"
            stroke="var(--green)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* X軸ラベル */}
        {snapshots.map((s, i) => (
          <text
            key={i}
            x={xOf(i)}
            y={VB_H - 12}
            fontSize={11}
            fill={i === selectedIdx ? "var(--green)" : "var(--brown-3)"}
            fontWeight={i === selectedIdx ? 700 : 400}
            textAnchor="middle"
          >
            {s.month.replace("2026年", "")}
          </text>
        ))}

        {/* データ点 + クリック領域 */}
        {snapshots.map((s, i) => {
          const isSelected = i === selectedIdx;
          const cx = xOf(i);
          const cy = yOf(totals[i]);
          return (
            <g
              key={i}
              onClick={() => onSelect(i)}
              style={{ cursor: "pointer" }}
            >
              {/* 透明な大きい円（クリック領域拡大） */}
              <circle cx={cx} cy={cy} r={20} fill="transparent" />
              {/* 選択時の外側リング */}
              {isSelected && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={11}
                  fill="var(--green)"
                  opacity={0.18}
                />
              )}
              {/* メインの点 */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 6.5 : 4.5}
                fill={isSelected ? "var(--terra)" : "var(--green)"}
                stroke="white"
                strokeWidth={2}
                style={{ transition: "r 0.2s" }}
              />
              {/* 選択時の数値ラベル */}
              {isSelected && (
                <g>
                  <rect
                    x={cx - 38}
                    y={cy - 32}
                    width={76}
                    height={20}
                    rx={5}
                    fill="var(--brown)"
                  />
                  <text
                    x={cx}
                    y={cy - 18}
                    fontSize={11}
                    fontWeight={700}
                    fill="white"
                    textAnchor="middle"
                  >
                    {fmt(totals[i])}万円
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
