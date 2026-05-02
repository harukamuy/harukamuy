import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ごまもち",
  description: "ボストンテリアのごまもち（3歳）の日常とブログへの参加記録。食いしん坊で甘えん坊な毎日をお届けします。",
  alternates: { canonical: "https://harukamuy.com/gomamochi" },
  openGraph: {
    title: "ごまもち | harukamuy",
    description: "ボストンテリアのごまもち（3歳）の日常とブログへの参加記録。食いしん坊で甘えん坊な毎日をお届けします。",
    url: "https://harukamuy.com/gomamochi",
    images: [{ url: "/images/gomamochi-sit.png", width: 1200, height: 630, alt: "ごまもち" }],
  },
};

const routines = [
  { time: "5:30",  ampm: "AM", icon: "🌅", title: "起床", text: "あずきちゃんを起こしに行く。これが毎朝の日課。" },
  { time: "6:00",  ampm: "AM", icon: "🌿", title: "朝の散歩（約1時間）", text: "近所をぐるっと1時間。においを嗅ぎ回るのが何より好き。" },
  { time: "7:00",  ampm: "AM", icon: "🦴", title: "帰宅・朝ごはん", text: "落ち着いてからごはん。ドライフード＋手作りトッピング。食べ終わるまで3分。" },
  { time: "9:00〜", ampm: "",  icon: "😴", title: "まったりタイム", text: "あずきちゃんが仕事中はソファで爆睡。いびきをかく。" },
  { time: "18:30", ampm: "PM", icon: "🐾", title: "夕方散歩（約1時間）", text: "1日で一番テンションが上がる時間帯。" },
  { time: "19:30", ampm: "PM", icon: "🦴", title: "帰宅・夕ごはん", text: "お腹ぺこぺこ。夕ごはんが待っている。" },
  { time: "夜",    ampm: "",   icon: "✨", title: "ブラッシング・スキンシップ", text: "歯磨きとブラッシング。あずきちゃんと過ごす一番好きな時間。" },
];

const recoItems = [
  { icon: "🦴", badge: "愛用中",    name: "オリジン ドッグフード スモールブリード", price: "¥3,980〜" },
  { icon: "🎾", badge: "ベストバイ", name: "KONG クラシック Mサイズ", price: "¥1,480〜" },
  { icon: "🛏️", badge: "ソファ占拠中", name: "ABO ドッグベッド Lサイズ", price: "¥6,800〜" },
];

const photoColors = ["#d4a898", "#c9b99a", "#b8c9a0", "#d4957e", "#a0b8c8", "#c8b08a"];

export default function GomamochiPage() {
  const allPosts = getAllPosts();
  const gomaPosts = allPosts.filter((p) => p.category === "gomazochi").slice(0, 4);
  const displayPosts = gomaPosts.length > 0 ? gomaPosts : allPosts.slice(0, 4);

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: "#fde8e0",
        borderBottom: "2px solid var(--blush)",
        padding: "60px 24px 52px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative paw */}
        <div style={{ position: "absolute", fontSize: 120, opacity: 0.06, top: -10, right: -20, transform: "rotate(15deg)", lineHeight: 1 }}>🐾</div>
        <div style={{ position: "absolute", fontSize: 80, opacity: 0.05, bottom: -10, left: -10, transform: "rotate(-10deg)", lineHeight: 1 }}>🐾</div>

        <div style={{ fontFamily: "var(--font-hand)", fontSize: 18, color: "var(--terra)", marginBottom: 12, position: "relative" }}>
          わが家のアイドル
        </div>
        <h1 style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 700, lineHeight: 1.4, color: "var(--brown)", marginBottom: 16, position: "relative" }}>
          🐾 ごまもち
        </h1>
        <p style={{ fontSize: 14, color: "var(--brown-2)", lineHeight: 1.8, maxWidth: 460, margin: "0 auto 28px", position: "relative" }}>
          ボストンテリアのごまもち（3歳）の日常とブログへの参加記録。食いしん坊で甘えん坊な毎日をお届けします。
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* ── PROFILE ── */}
        <div className="portfolio-wrap-grid" style={{
          background: "white",
          border: "1.5px solid var(--blush)",
          borderRadius: 24,
          padding: "32px 28px",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 28,
          alignItems: "center",
          marginBottom: 52,
        }}>
          {/* big illustration */}
          <div style={{ width: 140, height: 160, flexShrink: 0, borderRadius: 16, overflow: "hidden" }}>
            <img src="/images/gomamochi-sit.png" alt="ごまもち" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
          </div>

          {/* profile info */}
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 3 }}>ごまもち</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)", marginBottom: 16 }}>Gomamochi / Boston Terrier ♂</div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 16px", fontSize: 13, marginBottom: 14 }}>
              <span style={{ color: "var(--brown-3)", fontSize: 12, letterSpacing: "0.06em" }}>生年月日</span>
              <span style={{ color: "var(--brown-2)" }}>2023年5月（3歳）</span>
              <span style={{ color: "var(--brown-3)", fontSize: 12, letterSpacing: "0.06em" }}>体重</span>
              <span style={{ color: "var(--brown-2)" }}>8.2kg</span>
              <span style={{ color: "var(--brown-3)", fontSize: 12, letterSpacing: "0.06em" }}>好きな食べ物</span>
              <span style={{ color: "var(--brown-2)" }}>りんご🍎・キャベツ🥬・スイカ🍉（夏）・さつまいも🍠（秋冬）</span>
              <span style={{ color: "var(--brown-3)", fontSize: 12, letterSpacing: "0.06em" }}>好きなこと</span>
              <span style={{ color: "var(--brown-2)" }}>散歩・ソファ・あずきとのじかん</span>
              <span style={{ color: "var(--brown-3)", fontSize: 12, letterSpacing: "0.06em" }}>ブログでの役割</span>
              <span style={{ color: "var(--brown-2)" }}>読者目線の質問担当</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["食いしん坊", "りんご大好き", "甘えん坊", "表情豊か", "散歩好き", "ソファ占拠中"].map((tag) => (
                <span key={tag} style={{ fontSize: 11, background: "#fde8e0", padding: "3px 10px", borderRadius: 20, color: "var(--brown-2)", border: "1px solid var(--blush)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── PHOTO GALLERY ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>フォトギャラリー</div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Gallery</div>
            </div>
            <a href="#" style={{ marginLeft: "auto", fontSize: 12, color: "var(--terra)", textDecoration: "none", letterSpacing: "0.06em" }}>もっと見る →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {/* wide first photo - 散歩シーン */}
            <div style={{ gridColumn: "span 2", aspectRatio: "2/1", borderRadius: 14, overflow: "hidden" }}>
              <img src="/images/mio-walk.png" alt="多摩川散歩" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* ごまもち立ち姿 */}
            <div style={{ aspectRatio: "1", borderRadius: 14, overflow: "hidden" }}>
              <img src="/images/gomamochi-stand.png" alt="ごまもち" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
            </div>
            {photoColors.slice(2).map((color, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 14, background: color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,.3) 8px,rgba(255,255,255,.3) 9px)" }} />
                <span style={{ fontFamily: "var(--font-hand)", fontSize: 12, color: "rgba(255,255,255,.85)", zIndex: 1 }}>写真</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIARY ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>ごまもちの日記</div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Diary</div>
            </div>
            <Link href="/blog?category=gomazochi" style={{ marginLeft: "auto", fontSize: 12, color: "var(--terra)", textDecoration: "none", letterSpacing: "0.06em" }}>
              すべて見る →
            </Link>
          </div>
          <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {displayPosts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 16, overflow: "hidden", textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ aspectRatio: "16/9", background: photoColors[i % photoColors.length], position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: post.coverImagePosition ?? "top center" }} />
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,.25) 7px,rgba(255,255,255,.25) 8px)" }} />
                      <span style={{ fontFamily: "var(--font-hand)", fontSize: 11, color: "rgba(255,255,255,.85)", zIndex: 1 }}>写真</span>
                    </>
                  )}
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: "0.1em", marginBottom: 6 }}>ごまもち🐾</div>
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.7, color: "var(--brown)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--brown-3)", marginTop: 6 }}>{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── DAILY ROUTINE ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>ごまもちの1日</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Daily Routine</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {routines.map((r) => (
              <div key={r.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ fontFamily: "var(--font-hand)", fontSize: 22, color: "var(--terra)", fontWeight: 600, minWidth: 60, textAlign: "center", lineHeight: 1 }}>
                  {r.time}
                  {r.ampm && <span style={{ display: "block", fontSize: 12, fontFamily: "var(--font-body)", color: "var(--brown-3)", marginTop: 3 }}>{r.ampm}</span>}
                </div>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{r.icon}</div>
                <div>
                  <strong style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--brown)", marginBottom: 3 }}>{r.title}</strong>
                  <span style={{ fontSize: 13, color: "var(--brown-2)" }}>{r.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RECOMMENDED ITEMS ── */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--brown)" }}>ごまもちのお気に入りグッズ</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)" }}>Favorites</div>
          </div>
          <p style={{ fontSize: 13, color: "var(--brown-3)", marginBottom: 16, letterSpacing: "0.04em" }}>
            ※実際に使用しているものをご紹介しています。一部アフィリエイトリンクを含みます。
          </p>
          <div className="three-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {recoItems.map((item) => (
              <a key={item.name} href="#" style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 14, padding: "16px 14px", textAlign: "center", textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ aspectRatio: "1", background: "var(--ivory-2)", borderRadius: 10, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid var(--beige)" }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: 9, background: "var(--terra)", color: "white", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.08em", display: "inline-block", marginBottom: 6 }}>{item.badge}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brown)", marginBottom: 3, lineHeight: 1.5 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "var(--brown-3)" }}>{item.price}</div>
                <div style={{ marginTop: 8, fontSize: 11, color: "var(--terra)", fontWeight: 500 }}>Amazonで見る →</div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
