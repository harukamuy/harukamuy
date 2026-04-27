import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BostonTerrierSVG from "@/components/BostonTerrierSVG";
import ArticlesSection from "@/components/ArticlesSection";

export const metadata: Metadata = {
  title: {
    absolute: "harukamuy | ごまもちとサイドFIREの記録",
  },
  description:
    "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。",
  alternates: {
    canonical: "https://harukamuy.com",
  },
  openGraph: {
    title: "harukamuy | ごまもちとサイドFIREの記録",
    description:
      "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。",
    url: "https://harukamuy.com",
    images: [{ url: "/images/mio-room.png", width: 1200, height: 630, alt: "harukamuy" }],
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-text-wrap">
          <div style={{
            fontFamily: "var(--font-hand)",
            fontSize: 16,
            color: "var(--terra)",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <svg width="30" height="12" viewBox="0 0 30 12" fill="none">
              <path d="M2 6 Q7 2 13 6 Q19 10 25 6 Q27 4 28 6" stroke="#c4674a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            フリーランス × FIRE の記録
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(20px, 5vw, 38px)",
            fontWeight: 600,
            lineHeight: 1.65,
            color: "var(--brown)",
            letterSpacing: "0.03em",
            marginBottom: 22,
          }}>
            フリーランスで働きながら、<br />
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(120deg, var(--blush) 0%, var(--blush) 100%)",
              backgroundSize: "100% 40%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 85%",
              padding: "0 2px",
            }}>ごまもち</em>と一緒に<br />サイドFIREを達成した記録。
          </h1>
          <div style={{
            fontSize: 13,
            color: "var(--brown-3)",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}>
            <span>あずきちゃん（34歳・映像プロデューサー）</span>
            <span style={{
              background: "var(--beige)",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              color: "var(--brown-2)",
            }}>🐶 ごまもち（ボストンテリア）</span>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img src="/images/mio-room.png" alt="あずきちゃんとごまもち" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
        </div>
      </section>

      {/* ASSET SUMMARY */}
      <div style={{ maxWidth: 852, margin: "0 auto 52px", padding: "0 24px" }}>
        <div style={{
          background: "var(--green)",
          borderRadius: 24,
          padding: "32px 28px",
          color: "var(--white)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }} />
          <svg style={{ position: "absolute", right: 20, bottom: 16, opacity: 0.1 }} width="90" height="90" viewBox="0 0 90 90">
            <path d="M45 8 Q82 8 82 45 Q82 82 45 82 Q8 82 8 45 Q8 8 45 8Z" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
          </svg>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.18)",
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: 11,
            letterSpacing: "0.1em",
            marginBottom: 18,
          }}>
            <span style={{
              width: 6,
              height: 6,
              background: "#a8e0a0",
              borderRadius: "50%",
              animation: "blink 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            サイドFIRE 達成済み ✓
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8, letterSpacing: "0.04em" }}>わたしの資産状況（2026年4月）</div>
          <div className="asset-grid-3col" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            marginTop: 16,
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                5,463<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>万円</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>総資産</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                49<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>万円</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>年間配当・分配金</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                4.94<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>%</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>配当利回り（平均）</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE */}
      <div style={{ maxWidth: 852, margin: "0 auto 52px", padding: "0 24px" }}>
        <div className="profile-grid" style={{
          background: "#fdf0ea",
          border: "1.5px solid var(--blush)",
          borderRadius: 24,
          padding: "28px 24px",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 20,
          alignItems: "start",
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              border: "3px solid var(--white)",
              overflow: "hidden",
              position: "relative",
            }}>
              <img src="/images/mio-fullbody.png" alt="あずき" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div style={{
              position: "absolute",
              bottom: -4,
              right: -4,
              width: 26,
              height: 26,
              background: "var(--terra)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              border: "2px solid var(--white)",
            }}>
              🐾
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, marginBottom: 2 }}>あずき</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 13, color: "var(--brown-3)", marginBottom: 10 }}>Azuki, 34</div>
            <div style={{ fontSize: 13, color: "var(--brown-2)", lineHeight: 1.85 }}>
              北海道十勝出身の映像プロデューサー。2018年から8年かけて資産を積み上げ、2026年4月にサイドFIRE達成。愛犬ごまもちと都内でのんびり暮らしながら、好きな仕事を続けています。
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              {["映像プロデューサー", "サイドFIRE", "インデックス投資", "🐶 ボストンテリア"].map((tag) => (
                <span key={tag} style={{
                  fontSize: 11,
                  background: "var(--white)",
                  padding: "3px 10px",
                  borderRadius: 20,
                  color: "var(--brown-2)",
                  border: "1px solid var(--beige)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLES with category filter (Client Component) */}
      <ArticlesSection posts={posts} />

      {/* PAW DIVIDER */}
      <div style={{
        textAlign: "center",
        padding: "0 24px",
        maxWidth: 900,
        margin: "0 auto 44px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{ flex: 1, height: 1, background: "var(--beige-2)" }} />
        <div style={{ fontSize: 16, color: "var(--terra)", opacity: 0.6, display: "flex", gap: 4, alignItems: "center" }}>🐾</div>
        <div style={{ flex: 1, height: 1, background: "var(--beige-2)" }} />
      </div>

      {/* AFFILIATE */}
      <section style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto 64px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 600, color: "var(--brown)", letterSpacing: "0.04em" }}>わたしが使っているサービス</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 13, color: "var(--brown-3)" }}>Recommended</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--brown-3)", marginBottom: 16, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "var(--terra)" }}>※</span>
          実際に使っているサービスのみ紹介しています。一部アフィリエイトリンクを含みます。
        </div>
        <div className="affiliate-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* SBI 証券 - wide */}
          <a href="#" className="affiliate-wide" style={{
            gridColumn: "1 / -1",
            borderRadius: "var(--r)",
            padding: "24px 26px",
            textDecoration: "none",
            color: "inherit",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 20,
            alignItems: "center",
            border: "1.5px solid var(--beige)",
            background: "#f4efe8",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: "var(--beige)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 26,
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="16" width="5" height="8" rx="1" fill="#5e7252"/>
                <rect x="11.5" y="10" width="5" height="14" rx="1" fill="#5e7252" opacity="0.7"/>
                <rect x="19" y="4" width="5" height="20" rx="1" fill="#5e7252" opacity="0.4"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 6, letterSpacing: "0.08em", display: "inline-block", marginBottom: 6 }}>★ 最もおすすめ</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>SBI証券 — わたしのメイン口座</div>
              <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>手数料ゼロ・米国ETFの買付も便利。配当金管理もシンプルで5年以上愛用しています。</div>
              <div style={{ marginTop: 10, fontSize: 11, color: "var(--terra)", fontWeight: 500, letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>公式サイトで詳しく見る →</div>
            </div>
          </a>

          {/* eMAXIS */}
          <a href="#" style={{
            borderRadius: "var(--r)",
            padding: "20px 22px",
            textDecoration: "none",
            color: "inherit",
            display: "block",
            border: "1.5px solid var(--beige)",
            background: "var(--white)",
          }}>
            <div style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 6, letterSpacing: "0.08em", display: "inline-block", marginBottom: 6 }}>新NISA対応</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>eMAXIS Slim 全世界株式</div>
            <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>積立NISAで5年間愛用。信託報酬が最安水準で迷ったらこれ。</div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--terra)", fontWeight: 500, letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>詳細を見る →</div>
          </a>

          {/* freee */}
          <a href="https://px.a8.net/svt/ejp?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y" rel="nofollow" target="_blank" style={{
            borderRadius: "var(--r)",
            padding: "20px 22px",
            textDecoration: "none",
            color: "inherit",
            display: "block",
            border: "1.5px solid var(--beige)",
            background: "var(--white)",
          }}>
            <div style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 6, letterSpacing: "0.08em", display: "inline-block", marginBottom: 6 }}>フリーランス向け</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>freee 確定申告</div>
            <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>フリーランス3年目から導入。経費管理が劇的に楽になりました。</div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--terra)", fontWeight: 500, letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>詳細を見る →</div>
          </a>
        </div>
        {/* A8 tracking pixel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img border={0} width={1} height={1} src="https://www12.a8.net/0.gif?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y" alt="" style={{ display: "block" }} />
      </section>
    </>
  );
}
