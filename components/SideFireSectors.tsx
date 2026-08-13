import Link from "next/link";
import {
  SECTORS,
  CYCLE_SPLIT,
  RISK,
  SECTOR_AS_OF,
  SECTOR_TOTAL_MANYEN,
  SECTOR_STOCK_COUNT,
} from "@/components/sidefireSectorData";

// 景気敏感＝緑、ディフェンシブ＝テラコッタ薄。
// この2色は色覚特性のある方でも見分けられる組み合わせを選んでいる（OKLab ΔE 17.7）。
// ただし薄いほうは背景とのコントラストが十分ではないので、色だけに頼らず
// すべての行に業種名・銘柄数・金額・％を文字で出している。
const CYCLICAL = "#5e7252"; // var(--green)
const DEFENSIVE = "#e09a82"; // var(--terra-lt)

const maxPct = Math.max(...SECTORS.map((s) => s.pct));
const man = (n: number) => n.toLocaleString("ja-JP");
const pct1 = (n: number) => n.toFixed(1);

function asOfLabel(iso: string) {
  const [, m, d] = iso.split("-");
  return `${Number(m)}月${Number(d)}日`;
}

export default function SideFireSectors() {
  return (
    <div>
      {/* ── 数字 3つ ── */}
      <div
        className="sidefire-stat-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}
      >
        {[
          { n: RISK.annualPct, unit: "%", label: "年率リスク", sub: "1年でこれくらい上下する幅" },
          { n: `±${man(RISK.swingManYen)}`, unit: "万", label: "ふつうの1年の振れ幅", sub: `${man(SECTOR_TOTAL_MANYEN)}万円に対して` },
          { n: RISK.diversifiedPt, unit: "pt", label: "分散で下がったぶん", sub: `1銘柄ずつなら${pct1(RISK.soloAvgPct)}%` },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--white)",
              border: "1.5px solid var(--beige)",
              borderRadius: 16,
              padding: "16px 14px",
            }}
          >
            <div style={{ fontSize: "clamp(20px,3.4vw,28px)", fontWeight: 700, color: "var(--green)", lineHeight: 1.15 }}>
              {s.n}
              <span style={{ fontSize: "0.5em", fontWeight: 400, opacity: 0.8 }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--brown)", marginTop: 6 }}>{s.label}</div>
            <div style={{ fontSize: 10.5, color: "var(--brown-3)", marginTop: 2, lineHeight: 1.5 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── 景気敏感 / ディフェンシブ ── */}
      <div
        style={{
          background: "var(--white)",
          border: "1.5px solid var(--beige)",
          borderRadius: 18,
          padding: "20px 18px",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brown)", marginBottom: 14 }}>
          景気に左右されやすいか
        </div>

        {/* 100%積み上げ棒。セグメント間は2pxあける */}
        <div style={{ display: "flex", gap: 2, height: 26, marginBottom: 12 }}>
          <div
            style={{
              flex: CYCLE_SPLIT.cyclical.pct,
              background: CYCLICAL,
              borderRadius: "6px 2px 2px 6px",
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              color: "white",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {pct1(CYCLE_SPLIT.cyclical.pct)}%
          </div>
          <div
            style={{
              flex: CYCLE_SPLIT.defensive.pct,
              background: DEFENSIVE,
              borderRadius: "2px 6px 6px 2px",
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              color: "var(--brown)",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {pct1(CYCLE_SPLIT.defensive.pct)}%
          </div>
        </div>

        {/* 凡例。色だけに頼らないよう、名前と数字を必ず添える */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
          {[
            { c: CYCLICAL, name: "景気敏感", d: CYCLE_SPLIT.cyclical, note: "素材・商社・機械・金融など" },
            { c: DEFENSIVE, name: "ディフェンシブ", d: CYCLE_SPLIT.defensive, note: "通信・食品・医薬・小売など" },
          ].map((x) => (
            <div key={x.name} style={{ display: "flex", alignItems: "flex-start", gap: 7, minWidth: 150 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: x.c,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              />
              <div>
                <div style={{ fontSize: 12.5, color: "var(--brown)" }}>
                  <strong>{x.name}</strong>
                  <span style={{ color: "var(--brown-2)" }}>
                    {" "}
                    {x.d.count}銘柄・{man(x.d.manYen)}万円
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: "var(--brown-3)", marginTop: 1 }}>{x.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 業種別 ── */}
      <div
        style={{
          background: "var(--white)",
          border: "1.5px solid var(--beige)",
          borderRadius: 18,
          padding: "20px 18px",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brown)", marginBottom: 4 }}>
          業種別の内訳（{SECTORS.length}区分）
        </div>
        <div style={{ fontSize: 10.5, color: "var(--brown-3)", marginBottom: 16, lineHeight: 1.6 }}>
          東証17業種をもとにしています。ひとつの区分に景気敏感とディフェンシブが混ざる場合だけ、33業種まで分けています
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {SECTORS.map((s) => (
            <div key={s.name}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <div style={{ fontSize: 12.5, color: "var(--brown)", minWidth: 0 }}>
                  {s.name}
                  <span style={{ fontSize: 10.5, color: "var(--brown-3)" }}> {s.count}銘柄</span>
                </div>
                <div style={{ fontSize: 11.5, color: "var(--brown-2)", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {man(s.manYen)}万円
                  <strong style={{ color: "var(--brown)", marginLeft: 6 }}>{pct1(s.pct)}%</strong>
                </div>
              </div>
              <div style={{ height: 8, background: "var(--ivory-2)", borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${(s.pct / maxPct) * 100}%`,
                    height: "100%",
                    background: s.bucket === "cyclical" ? CYCLICAL : DEFENSIVE,
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 10.5,
            color: "var(--brown-3)",
            marginTop: 16,
            paddingTop: 12,
            borderTop: "1px dashed var(--beige)",
            lineHeight: 1.7,
          }}
        >
          {SECTOR_AS_OF.slice(0, 4)}年{asOfLabel(SECTOR_AS_OF)}時点。日本の高配当株{SECTOR_STOCK_COUNT}銘柄・
          {man(SECTOR_TOTAL_MANYEN)}万円の内訳です。業種はJPX（日本取引所グループ）の分類にそろえています。
          年率リスクは直近1年（{RISK.tradingDays}営業日）の値動きから計算したもので、配当は含みません。
          このうち2銘柄はETF（東証REIT指数・東証銀行業株価指数）で、中身のテーマで業種に振り分けています。
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: "6px 16px", fontSize: 12 }}>
        <Link href="/blog/portfolio-risk-117-stocks" style={{ color: "var(--terra)", textDecoration: "none" }}>
          → 何銘柄あれば足りるのか、計算した記事
        </Link>
        <Link href="/blog/total-portfolio-risk-correlation" style={{ color: "var(--terra)", textDecoration: "none" }}>
          → 資産全体のリスクを計算した記事
        </Link>
      </div>
    </div>
  );
}
