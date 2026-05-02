"use client";

import { MONTH_LABELS } from "./sidefireData";

function fmt(n: number) {
  return n.toLocaleString("ja-JP");
}

interface Props {
  /** その時点の12ヶ月想定配当（円） */
  dividendByMonth: number[];
  /** 表示するスナップショットラベル（例: "2026年4月時点"） */
  snapshotLabel: string;
  /** スナップショットの月（1-12）。これ以前 = 実績、これ以降 = 想定 */
  snapshotMonthNum: number;
}

export default function DividendLog({
  dividendByMonth,
  snapshotLabel,
  snapshotMonthNum,
}: Props) {
  const total = dividendByMonth.reduce((s, v) => s + v, 0);
  const max = Math.max(...dividendByMonth);

  // 実績 / 想定の合計
  const actualTotal = dividendByMonth
    .slice(0, snapshotMonthNum)
    .reduce((s, v) => s + v, 0);
  const forecastTotal = total - actualTotal;

  return (
    <div>
      {/* サマリーカード */}
      <div
        style={{
          background: "var(--green)",
          color: "white",
          borderRadius: 20,
          padding: "28px 24px",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            fontSize: 13,
            opacity: 0.7,
            letterSpacing: "0.08em",
            marginBottom: 14,
          }}
        >
          📊 {snapshotLabel}での年間配当（日本株＋BND）
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { val: fmt(total), unit: "円", label: "年間配当合計" },
            { val: "1,200,000", unit: "円", label: "年間目標（月10万）" },
            { val: `${Math.round((total / 1200000) * 100)}%`, unit: "", label: "達成率" },
          ].map((item) => (
            <div key={item.label}>
              <div
                style={{
                  fontSize: "clamp(18px,3vw,26px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                {item.val}
                <span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>
                  {item.unit}
                </span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* 実績/想定の内訳 */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            gap: 20,
            fontSize: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, background: "white", borderRadius: 2 }} />
            <span style={{ opacity: 0.7 }}>実績（〜{snapshotMonthNum}月）</span>
            <span style={{ fontWeight: 700 }}>{fmt(actualTotal)}円</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 10,
                height: 10,
                background: "rgba(255,255,255,0.35)",
                border: "1px dashed rgba(255,255,255,0.6)",
                borderRadius: 2,
              }}
            />
            <span style={{ opacity: 0.7 }}>想定（{snapshotMonthNum + 1}月〜）</span>
            <span style={{ fontWeight: 700 }}>{fmt(forecastTotal)}円</span>
          </div>
        </div>
      </div>

      {/* バーチャート */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {dividendByMonth.map((val, i) => {
          const monthNum = i + 1;
          const isActual = monthNum <= snapshotMonthNum;
          const pct = (val / max) * 100;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--brown-3)",
                  width: 36,
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                {MONTH_LABELS[i]}
              </div>
              <div
                style={{
                  flex: 1,
                  background: "var(--beige)",
                  borderRadius: 4,
                  height: 22,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                    fontSize: 10,
                    color: "white",
                    fontWeight: 600,
                    transition: "width 0.5s ease, background 0.3s",
                    background: isActual
                      ? "var(--green)"
                      : "repeating-linear-gradient(135deg, var(--green-lt) 0 6px, rgba(138,170,122,0.55) 6px 10px)",
                    minWidth: val > 0 ? 8 : 0,
                  }}
                >
                  {pct > 12 ? fmt(val) : ""}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  width: 56,
                  flexShrink: 0,
                  textAlign: "right",
                  color: isActual ? "var(--brown-2)" : "var(--brown-3)",
                  fontStyle: isActual ? "normal" : "italic",
                }}
              >
                {fmt(val)}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 14,
          fontSize: 11,
          color: "var(--brown-3)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 8,
              background: "var(--green)",
              borderRadius: 2,
            }}
          />
          実績
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 8,
              background:
                "repeating-linear-gradient(135deg, var(--green-lt) 0 4px, rgba(138,170,122,0.55) 4px 7px)",
              borderRadius: 2,
            }}
          />
          想定（保有銘柄からの予測）
        </span>
      </div>
    </div>
  );
}
