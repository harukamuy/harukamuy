import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import SideFireInteractive from "@/components/SideFireInteractive";
import { latestStats } from "@/components/sidefireData";

export const metadata: Metadata = {
  title: "サイドFIREの記録",
  description: "フリーランス映像プロデューサーが5年かけて達成したサイドFIREの全記録。資産推移・配当ログ・投資方針を公開します。",
  alternates: { canonical: "https://harukamuy.com/sidefire" },
  openGraph: {
    title: "サイドFIREの記録 | harukamuy",
    description: "フリーランス映像プロデューサーが5年かけて達成したサイドFIREの全記録。資産推移・配当ログ・投資方針を公開します。",
    url: "https://harukamuy.com/sidefire",
    images: [{ url: "/images/mio-room.png", width: 1200, height: 630, alt: "サイドFIREの記録" }],
  },
};

const thumbColors = ["#8fa87f", "#d4957e", "#7a9e96", "#c9b99a"];


const strategyCards = [
  { icon: "🌍", title: "インデックス積立は「ほったらかし」", text: "オルカン・S&P500をNISAで月5万円ずつ自動積立。市場を予測せず、淡々と積み上げることが最大の戦略。" },
  { icon: "💰", title: "高配当株で「生活費の一部」を稼ぐ", text: "日本の高配当株とBND（米国債券ETF）を保有。6月・12月を中心に配当金が入ることで、精神的な安定につながっている。" },
  { icon: "🛡️", title: "生活防衛資金は「12ヶ月分」固定", text: "フリーランスは収入が不安定なため、生活費12ヶ月分を現金で確保。これがあると投資を焦らず続けられる。" },
  { icon: "📊", title: "月1回だけ見直す", text: "毎月末に資産チェック＆配当ログを更新。それ以外は基本的に動かさない。頻繁に見ると余計なことをしてしまうので。" },
];



export default function SideFirePage() {
  const stats = latestStats();
  const allPosts = getAllPosts();
  const sidePosts = allPosts.filter((p) => p.category === "sidefire").slice(0, 4);
  // fallback: show any posts if no sidefire articles yet
  const displayPosts = sidePosts.length > 0 ? sidePosts : allPosts.slice(0, 4);

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ background: "var(--green)", color: "white", padding: "68px 24px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -50, left: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div className="sidefire-hero-grid" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div>
            {/* badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.18)", borderRadius: 20, padding: "5px 16px", fontSize: 12, letterSpacing: "0.1em", marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, background: "#a8e0a0", borderRadius: "50%", display: "inline-block" }} />
              FIRE 達成済み ✓
            </div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 17, opacity: 0.75, marginBottom: 12 }}>わたしの資産記録</div>
            <h1 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 700, lineHeight: 1.5, marginBottom: 16 }}>
              サイドFIRE の記録
            </h1>
            <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.85, maxWidth: 480 }}>
              フリーランス映像プロデューサーが5年かけて達成したサイドFIREの全記録。資産推移・配当ログ・投資方針を公開します。
            </p>
          </div>

          {/* asset numbers */}
          <div className="sidefire-nums-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,auto)", gap: 28 }}>
            {[
              { n: stats.totalManYenStr, unit: "万", label: "総資産" },
              { n: String(stats.annualDividendManYen), unit: "万", label: "年間配当" },
              { n: stats.yieldPctStr, unit: "%", label: "配当利回り" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, lineHeight: 1.1 }}>
                  {item.n}<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>{item.unit}</span>
                </div>
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 3, letterSpacing: "0.06em" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* ── MONTHLY ASSET LOG (ドーナツ＋テーブル) ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>ポートフォリオ内訳</div>
            </div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Portfolio / Monthly Asset Log</div>
          </div>
          <SideFireInteractive />
        </div>

        {/* ── STRATEGY ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>わたしの投資方針</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Strategy</div>
          </div>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {strategyCards.map((card) => (
              <div key={card.title} style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 18, padding: "24px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--brown)", marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: "var(--brown-2)", lineHeight: 1.8 }}>{card.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ARTICLES ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>サイドFIRE 関連記事</div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Articles</div>
            </div>
            <Link href="/blog?category=sidefire" style={{ marginLeft: "auto", fontSize: 12, color: "var(--terra)", textDecoration: "none", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4 }}>
              すべて見る →
            </Link>
          </div>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {displayPosts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 16, overflow: "hidden", textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ aspectRatio: "16/9", background: thumbColors[i % thumbColors.length], position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: post.coverImagePosition ?? "top center" }} />
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,.25) 7px,rgba(255,255,255,.25) 8px)" }} />
                      <span style={{ fontFamily: "var(--font-hand)", fontSize: 11, color: "rgba(255,255,255,.85)", zIndex: 1 }}>記事アイキャッチ</span>
                    </>
                  )}
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: "0.1em", marginBottom: 6 }}>サイドFIRE</div>
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.7, color: "var(--brown)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--brown-3)", marginTop: 6 }}>{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── AFFILIATE ── */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>わたしが使っているサービス</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Recommended</div>
          </div>
          <p style={{ fontSize: 11, color: "var(--brown-3)", marginBottom: 16, letterSpacing: "0.04em" }}>
            ※実際に使っているサービスのみ紹介しています。一部アフィリエイトリンクを含みます。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

            {/* SBI wide */}
            <a href="https://go.sbisec.co.jp/account/sogoflow_01.html" rel="noopener" target="_blank" style={{ gridColumn: "1 / -1", background: "#f4efe8", border: "1.5px solid var(--beige)", borderRadius: 16, padding: "18px 20px", textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, background: "var(--beige)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <rect x="3" y="14" width="5" height="8" rx="1" fill="#5e7252"/>
                  <rect x="10" y="9" width="5" height="13" rx="1" fill="#5e7252" opacity=".7"/>
                  <rect x="17" y="4" width="5" height="18" rx="1" fill="#5e7252" opacity=".4"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 4, letterSpacing: "0.08em", display: "inline-block", marginBottom: 5 }}>★ 最もおすすめ</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brown)", marginBottom: 3 }}>SBI証券 — わたしのメイン口座</div>
                <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>手数料ゼロ・新NISA対応・米国ETF買付も便利。5年以上愛用しています。</div>
                <div style={{ marginTop: 8, fontSize: 11, color: "var(--terra)", fontWeight: 500 }}>公式サイトで詳しく見る →</div>
              </div>
            </a>

            {/* eMAXIS */}
            <a href="#" style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 16, padding: "18px 18px", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 4, letterSpacing: "0.08em", display: "inline-block", marginBottom: 5 }}>新NISA対応</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brown)", marginBottom: 3 }}>eMAXIS Slim 全世界株式</div>
              <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>積立NISAで5年間愛用。信託報酬が最安水準。</div>
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--terra)", fontWeight: 500 }}>詳細を見る →</div>
            </a>

            {/* freee */}
            <a href="https://px.a8.net/svt/ejp?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y" rel="nofollow" target="_blank" style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 16, padding: "18px 18px", textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 4, letterSpacing: "0.08em", display: "inline-block", marginBottom: 5 }}>フリーランス向け</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brown)", marginBottom: 3 }}>freee 確定申告</div>
              <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>経費管理から確定申告まで。1年目から愛用中。</div>
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--terra)", fontWeight: 500 }}>詳細を見る →</div>
            </a>

          </div>
        </div>
        {/* A8 tracking pixel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={1} height={1} src="https://www12.a8.net/0.gif?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y" alt="" style={{ display: "block", border: 0 }} />

      </div>
    </>
  );
}
