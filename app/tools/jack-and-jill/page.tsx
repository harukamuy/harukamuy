import type { Metadata } from "next";
import Link from "next/link";
import JackJillCalculator from "@/components/JackJillCalculator";

export const metadata: Metadata = {
  title: "ジャックとジルの投資シミュレーター | 複利と積立開始年齢の計算機",
  description:
    "投資の複利の力を伝える有名な「ジャックとジル」の話を、自分の数字で試せるシミュレーターです。年間積立額・開始年齢・利回りを入力すると、ふたりの資産推移と勝敗が入れ替わる利回りがわかります。",
  alternates: { canonical: "https://harukamuy.com/tools/jack-and-jill" },
};

export default function JackJillPage() {
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
          ジャックとジルの投資シミュレーター
        </h1>
        <p style={{ fontSize: 13, color: "var(--brown-3)", marginTop: 10 }}>
          「早く始める」と「長く続ける」、複利ではどちらが強い?
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 80px" }}>
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
          投資の世界には、複利の力を伝える「ジャックとジル」という有名なたとえ話があります。先に始めて早々にやめた
          <strong>ジル</strong>と、出遅れたぶん長く積み立てた<strong>ジャック</strong>
          。勝つのはどちらか、じつは<strong>利回りしだいで入れ替わります</strong>
          。最初にまとめて投資する「一括」と、コツコツ続ける「毎年の積立」は、組み合わせも自由。プリセットで有名な設定を試すもよし、自分の年齢と金額に書き換えるもよし。ふたりの人生を、自由に比べてみてください。
        </div>

        <JackJillCalculator />

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
          ジャックとジルの話の中身と、「大学の費用を投資に回したらどうなる?」という思考実験は、こちらの記事に書きました。
          <br />
          <Link href="/blog/jack-and-jill-university-money" style={{ color: "#4a6640", fontWeight: 700 }}>
            ジャックとジルの話とは?「大学に行くのは収入のため」を複利で考えてみた →
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
          本シミュレーターは複利計算のイメージをつかむための簡易ツールです。税金・手数料・インフレ等は考慮しておらず、計算結果は将来の運用成果を保証するものではありません。特定の金融商品への投資を推奨・勧誘するものではなく、投資の最終判断はご自身の責任で行ってください。
        </div>
      </div>
    </>
  );
}
