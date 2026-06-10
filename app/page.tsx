import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostMeta, getPopularPosts } from "@/lib/posts";
import BostonTerrierSVG from "@/components/BostonTerrierSVG";
import ArticlesSection from "@/components/ArticlesSection";
import HomeAssetChart from "@/components/HomeAssetChart";
import { latestStats } from "@/components/sidefireData";

const categoryLabel: Record<string, string> = {
  sidefire: "サイドFIRE",
  investment: "投資",
  freelance: "フリーランス",
  gomazochi: "ごまもち🐾",
  all: "コラム",
};

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
    images: [{ url: "/images/mio-room.jpg", width: 1200, height: 630, alt: "harukamuy" }],
  },
};

const SITE_URL = "https://harukamuy.com";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "harukamuy",
  alternateName: "ごまもちとサイドFIREの記録",
  url: SITE_URL,
  inLanguage: "ja-JP",
  description:
    "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。",
  publisher: {
    "@type": "Organization",
    name: "harukamuy",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/mio-fullbody.webp`,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "あずき",
  url: SITE_URL,
  image: `${SITE_URL}/images/mio-fullbody.webp`,
  description:
    "北海道十勝出身、34歳のフリーランス映像プロデューサー。愛犬ごまもち（ボストンテリア）と暮らしながら、2026年4月にサイドFIREを達成。",
  jobTitle: "映像プロデューサー",
  knowsAbout: ["サイドFIRE", "インデックス投資", "高配当株投資", "フリーランス", "確定申告"],
  sameAs: ["https://x.com/harukamuy", "https://www.instagram.com/harukamuy_azuki/"],
  mainEntityOfPage: SITE_URL,
};

export default function Home() {
  const stats = latestStats();
  const posts = getAllPostMeta();
  const popularPosts = getPopularPosts(5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
          <img src="/images/mio-room.webp" alt="あずきちゃんとごまもち" width={1672} height={941} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
        </div>
      </section>

      {/* ASSET SUMMARY */}
      <div style={{ maxWidth: 852, margin: "0 auto 52px", padding: "0 24px" }}>
        <Link href="/sidefire" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
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
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8, letterSpacing: "0.04em" }}>わたしの資産状況（{stats.monthLabel}）</div>
          <div className="asset-grid-3col" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            marginTop: 16,
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                {stats.totalManYenStr}<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>万円</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>総資産</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                {stats.annualDividendManYen}<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>万円</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>年間配当・分配金</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                {stats.yieldPctStr}<span style={{ fontSize: "0.5em", opacity: 0.8, fontWeight: 400 }}>%</span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, letterSpacing: "0.06em" }}>配当利回り（平均）</div>
            </div>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.92)" }}>
            資産の内訳・毎月の記録を見る →
          </div>
        </div>
        </Link>

        {/* 資産推移グラフ（クリックで各月の総資産を表示） */}
        <div style={{ marginTop: 16 }}>
          <HomeAssetChart />
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
              <img src="/images/mio-fullbody.webp" alt="あずき" width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
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
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14, alignItems: "center" }}>
              <a href="https://x.com/harukamuy" target="_blank" rel="noopener" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: "var(--brown)",
                background: "var(--white)",
                border: "1px solid var(--beige)",
                borderRadius: 20,
                padding: "6px 14px",
                textDecoration: "none",
              }}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Xでフォロー
              </a>
              <a href="https://www.instagram.com/harukamuy_azuki/" target="_blank" rel="noopener" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: "var(--brown)",
                background: "var(--white)",
                border: "1px solid var(--beige)",
                borderRadius: 20,
                padding: "6px 14px",
                textDecoration: "none",
              }}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
              <Link href="/about" style={{ fontSize: 12, fontWeight: 500, color: "var(--terra)", textDecoration: "none", letterSpacing: "0.04em" }}>
                プロフィール詳細 →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR RANKING（GA4のPVから自動生成） */}
      {popularPosts.length > 0 && (
        <section style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 600, color: "var(--brown)", letterSpacing: "0.04em" }}>よく読まれている記事</div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 13, color: "var(--brown-3)" }}>Popular Posts</div>
            </div>
          </div>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {popularPosts.map((post, i) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 16,
                  alignItems: "center",
                  background: "var(--white)",
                  border: "1.5px solid var(--beige)",
                  borderRadius: 14,
                  padding: "14px 18px",
                  textDecoration: "none",
                  color: "inherit",
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 22,
                    fontWeight: 700,
                    color: i === 0 ? "var(--terra)" : "var(--brown-3)",
                    width: 28,
                    textAlign: "center",
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: "0.1em", marginBottom: 3 }}>
                      {categoryLabel[post.category] ?? "コラム"}
                    </div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600, color: "var(--brown)", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.title}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

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
          {/* SBI 証券 */}
          <a href="https://h.accesstrade.net/sp/cc?rk=0100piab00orlw" rel="nofollow sponsored noopener" target="_blank" style={{
            borderRadius: "var(--r)",
            padding: "20px 22px",
            textDecoration: "none",
            color: "inherit",
            display: "block",
            border: "1.5px solid var(--beige)",
            background: "#f4efe8",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 6, letterSpacing: "0.08em", display: "inline-block" }}>★ 最もおすすめ</span>
              <span style={{ fontSize: 9, background: "var(--beige)", color: "var(--brown-3)", padding: "2px 7px", borderRadius: 5, letterSpacing: "0.08em" }}>PR</span>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>SBI証券 — わたしのメイン口座</div>
            <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>手数料ゼロ・米国ETFの買付も便利。配当金管理もシンプルで5年以上愛用しています。</div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--terra)", fontWeight: 500, letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>公式サイトで詳しく見る →</div>
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
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 10, background: "var(--terra)", color: "white", padding: "2px 9px", borderRadius: 6, letterSpacing: "0.08em", display: "inline-block" }}>フリーランス向け</span>
              <span style={{ fontSize: 9, background: "var(--beige)", color: "var(--brown-3)", padding: "2px 7px", borderRadius: 5, letterSpacing: "0.08em" }}>PR</span>
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>freee 確定申告</div>
            <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>フリーランス1年目から導入。経費管理が劇的に楽になりました。</div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--terra)", fontWeight: 500, letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>詳細を見る →</div>
          </a>
        </div>
        {/* A8 tracking pixel */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={1} height={1} src="https://www12.a8.net/0.gif?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y" alt="" style={{ display: "block", border: 0 }} />
        {/* accesstrade impression pixel - SBI ゼロ革命 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={1} height={1} src="https://h.accesstrade.net/sp/rr?rk=0100piab00orlw" alt="" style={{ display: "block", border: 0 }} />
      </section>
    </>
  );
}
