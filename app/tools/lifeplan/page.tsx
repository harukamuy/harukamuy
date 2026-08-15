import type { Metadata } from "next";
import Link from "next/link";
import LifeplanSimulator from "@/components/LifeplanSimulator";

export const metadata: Metadata = {
  title: "ライフプラン・シミュレーター | 何歳まで資産が持つかの計算機",
  description:
    "年齢・資産・収入・生活費・子どもの教育費・退職年齢・年金・iDeCo・利回り・インフレを自由に設定して、資産が何歳まで持つかを試せるシミュレーターです。年ごとの明細つきで、金額はそのとき実際に動く金額で表示します。",
  alternates: { canonical: "https://harukamuy.com/tools/lifeplan" },
};

export default function LifeplanPage() {
  return (
    <>
      {/* HERO */}
      <div
        style={{
          background: "var(--ivory-2)",
          borderBottom: "1px solid var(--beige)",
          padding: "56px 24px 44px",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--brown-3)", marginBottom: 10 }}>
          Tools
        </div>
        <h1 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 700, color: "var(--brown)", lineHeight: 1.5 }}>
          ライフプラン・シミュレーター
        </h1>
        <p style={{ fontSize: 13, color: "var(--brown-3)", marginTop: 10 }}>
          いまの資産と暮らし方で、何歳まで持つ? 年ごとの明細つきで確かめられます
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* intro */}
        <div
          style={{
            background: "var(--white)",
            border: "1.5px solid var(--beige)",
            borderRadius: 16,
            padding: "20px 24px",
            fontSize: 13,
            color: "var(--brown-2)",
            lineHeight: 1.9,
            marginBottom: 28,
          }}
        >
          自分のライフプランを95歳まで計算した
          <Link href="/blog/lifeplan-one-line-95" style={{ color: "var(--brown)", fontWeight: 700 }}>記事</Link>
          で使った計算を、だれでも自分の数字で試せるようにしたツールです。家族構成・収入・教育費・退職年齢・年金・iDeCo・利回り・インフレを設定すると、
          <strong>資産が何歳まで持つか</strong>が年ごとの表とグラフでわかります。金額は
          <strong>そのとき実際に動く金額</strong>で出すので、物価が上がるぶん支出も増えていきます。ただし金額が大きく見えても価値が増えたわけではないので、
          結果には<strong>「いまの物価だといくらか」</strong>も添えています。
        </div>

        <LifeplanSimulator />

        {/* 記事への導線 */}
        <div
          style={{
            marginTop: 28,
            background: "#f0f5ee",
            border: "1.5px solid #c8d8c0",
            borderRadius: 16,
            padding: "18px 22px",
            fontSize: 13,
            color: "#3a5030",
            lineHeight: 1.9,
          }}
        >
          📖 <strong>このツールの解説記事</strong>
          <br />
          前提の決め方（なぜインフレ2%・利回り5%なのか、年金をいくらで見るか）と、条件を崩したときに何が効くのかは、こちらの記事に書きました。
          <br />
          <Link href="/blog/lifeplan-one-line-95" style={{ color: "#4a6640", fontWeight: 700 }}>
            40歳で十勝に帰って、95歳まで。ライフプランを一本の線にしたら →
          </Link>
          <br />
          <Link href="/tools/jack-and-jill" style={{ color: "#4a6640", fontWeight: 700 }}>
            🧮 積立の複利を比べるなら: ジャックとジルの投資シミュレーター →
          </Link>
        </div>

        {/* 免責 */}
        <div
          style={{
            background: "#f5f3f0",
            border: "1.5px solid #ddd8d0",
            borderRadius: 14,
            padding: "20px 22px",
            fontSize: 12,
            color: "#888",
            lineHeight: 1.9,
            margin: "28px 0 0",
          }}
        >
          <strong style={{ display: "block", marginBottom: 6, color: "#666" }}>⚠ 免責事項</strong>
          本シミュレーターはライフプランのイメージをつかむための簡易ツールです。運用利回りを毎年一定と仮定しており、実際の相場の変動（とくに取り崩し初期の暴落）は表現できません。税金は取り崩し時の概算のみで、社会保険料・住民税・住宅費の変動・児童手当などの給付は考慮していません。教育費は文部科学省「令和5年度子供の学習費調査」等をもとにした平均的な金額で、実際は進路や地域により大きく変わります。計算結果は将来を保証するものではなく、特定の金融商品への投資を推奨・勧誘するものでもありません。重要な判断の際はファイナンシャルプランナー等の専門家にもご相談ください。
        </div>
      </div>
    </>
  );
}
