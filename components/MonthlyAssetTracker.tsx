"use client";

import { Snapshot, totalOf } from "./sidefireData";

const SEGMENTS = [
  { key: "index"   as const, label: "オルカン・S&P500（投資信託＋iDeCo）", color: "#5e7252" },
  { key: "highDiv" as const, label: "高配当株＋BND（米国債券ETF）",        color: "#8aaa7a" },
  { key: "btc"     as const, label: "ビットコイン（0.1BTC）",              color: "#c4674a" },
  { key: "cash"    as const, label: "現金",                               color: "#d5c3a8" },
];

// SVGドーナツ計算 (r=15.9, 周長≈100, 開始オフセット=25)
function calcDonut(row: Snapshot) {
  const total = totalOf(row);
  let cum = 0;
  return SEGMENTS.map((s) => {
    const pct = (row[s.key] / total) * 100;
    const offset = 25 - cum;
    cum += pct;
    return {
      ...s,
      val: row[s.key],
      pct,
      dasharray: `${pct.toFixed(2)} ${(100 - pct).toFixed(2)}`,
      offset: offset.toFixed(2),
    };
  });
}

function fmt(n: number) {
  return n.toLocaleString("ja-JP");
}

interface Props {
  snapshots: Snapshot[];
  selectedIdx: number;
  onSelect: (i: number) => void;
}

export default function MonthlyAssetTracker({ snapshots, selectedIdx, onSelect }: Props) {
  const row = snapshots[selectedIdx];
  const total = totalOf(row);
  const segs = calcDonut(row);

  return (
    <div>
      {/* ── ドーナツ + 凡例 ── */}
      <div
        className="portfolio-wrap-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 32,
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        {/* donut */}
        <div
          className="donut-wrap"
          style={{ position: "relative", width: 180, height: 180, flexShrink: 0 }}
        >
          <svg viewBox="0 0 36 36" width="180" height="180">
            {segs.map((s) => (
              <circle
                key={s.key}
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke={s.color}
                strokeWidth="3.5"
                strokeDasharray={s.dasharray}
                strokeDashoffset={s.offset}
                transform="rotate(-90 18 18)"
                style={{ transition: "stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease" }}
              />
            ))}
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--brown)", lineHeight: 1 }}>
              {fmt(total)}
              <span style={{ fontSize: 12, color: "var(--brown-3)" }}>万</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--brown-3)", letterSpacing: "0.04em" }}>
              総資産
            </div>
          </div>
        </div>

        {/* legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {segs.map((s) => (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: s.color,
                  flexShrink: 0,
                }}
              />
              <div style={{ fontSize: 13, color: "var(--brown-2)", flex: 1 }}>{s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brown)" }}>
                {fmt(s.val)}万
              </div>
              <div style={{ fontSize: 11, color: "var(--brown-3)", marginLeft: 4 }}>
                {s.pct.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── テーブル ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["月", "総資産", "インデックス", "高配当株＋BND", "現金", "BTC", "年間配当想定"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 14px",
                    background: "var(--green)",
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textAlign: h === "月" ? "left" : "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {snapshots.map((r, i) => {
              const rowTotal = totalOf(r);
              const dividendTotal = r.dividendForecast.reduce((a, b) => a + b, 0);
              const isSelected = i === selectedIdx;
              return (
                <tr
                  key={r.month}
                  onClick={() => onSelect(i)}
                  style={{
                    background: isSelected
                      ? "#e8f0e4"
                      : i % 2 === 0
                      ? "var(--white)"
                      : "var(--ivory-2)",
                    cursor: "pointer",
                    outline: isSelected ? "2px solid var(--green)" : "none",
                    outlineOffset: -2,
                    transition: "background 0.2s",
                  }}
                >
                  <td
                    style={{
                      padding: "11px 14px",
                      fontWeight: 700,
                      fontSize: 12,
                      color: isSelected ? "var(--green)" : "var(--brown-2)",
                      borderBottom: "1px solid var(--beige)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isSelected && <span style={{ marginRight: 5 }}>▶</span>}
                    {r.month}
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "var(--brown)" }}>
                      {fmt(rowTotal)}
                    </span>
                    <Unit />
                  </td>
                  {([r.index, r.highDiv, r.cash, r.btc] as number[]).map((val, ci) => (
                    <td key={ci} style={tdStyle}>
                      <span style={{ fontWeight: 500, color: "var(--brown-2)" }}>{fmt(val)}</span>
                      <Unit />
                    </td>
                  ))}
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 500, color: "var(--green)" }}>
                      {(dividendTotal / 10000).toFixed(1)}
                    </span>
                    <Unit />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "var(--brown-3)", lineHeight: 1.8 }}>
        ※ 月をクリックするとグラフが切り替わります。インデックス＝オルカン・S&P500・iDeCo合算。年間配当想定は税引後の概算。
      </div>
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "11px 14px",
  textAlign: "right",
  borderBottom: "1px solid var(--beige)",
  whiteSpace: "nowrap",
};

function Unit() {
  return <span style={{ fontSize: 10, color: "var(--brown-3)", marginLeft: 2 }}>万円</span>;
}
