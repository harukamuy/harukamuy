import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "フリーランス映像プロデューサーのあずきと愛犬ごまもちの自己紹介ページ。北海道出身・上京・FIRE達成までの軌跡を公開。",
  alternates: { canonical: "https://harukamuy.com/about" },
  openGraph: {
    title: "About | harukamuy",
    description: "フリーランス映像プロデューサーのあずきと愛犬ごまもちの自己紹介ページ。北海道出身・上京・FIRE達成までの軌跡を公開。",
    url: "https://harukamuy.com/about",
    images: [{ url: "/images/mio-fullbody.png", width: 1200, height: 630, alt: "あずき" }],
  },
};

const timeline = [
  { year: "2018", label: "本格的に資産形成スタート（26歳）", desc: "北海道十勝から上京し映像の仕事を続けながら、NISAとインデックス投資を開始。貯金500万円からのスタート。" },
  { year: "2023.3", label: "会社退職・フリーランス転向（31歳）", desc: "8年間勤めた映像プロダクションを退職。退職時の総資産は2,000万円ほど。不安より解放感が大きかった。" },
  { year: "2023.5", label: "ごまもちをお迎え", desc: "ボストンテリアのごまもちが家族に加わる🐾 一緒に暮らし始めて、毎日がもっと楽しくなった。" },
  { year: "2026.4", label: "サイドFIRE達成、ブログ開設（34歳）", desc: "総資産5,463万円・年間配当49万円でサイドFIRE達成。好きな仕事を続けながら、harukamuyを開設。" },
];

const purposeItems = [
  "フリーランスでも地道にFIREできる、という実証記録",
  "難しく考えなくていい、シンプルなインデックス投資の話",
  "ごまもちと一緒に、お金と向き合う楽しさ",
  "サイドFIRE後も「好きな仕事だけ」を選ぶ生き方のヒント",
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: "var(--green)",
        color: "white",
        padding: "72px 24px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ fontFamily: "var(--font-hand)", fontSize: 17, opacity: 0.75, marginBottom: 12, letterSpacing: "0.05em", position: "relative" }}>
          わたしたちについて
        </div>
        <h1 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 700, lineHeight: 1.5, marginBottom: 16, letterSpacing: "0.03em", position: "relative" }}>
          harukamuy について
        </h1>
        <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.8, maxWidth: 500, margin: "0 auto", position: "relative" }}>
          フリーランス映像プロデューサーのあずきちゃんと、愛犬ごまもちによる暮らしとお金の記録です。
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ── PROFILE DUO ── */}
        <div className="profile-duo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 56 }}>

          {/* 澪カード */}
          <div style={{ background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 16px", overflow: "hidden", border: "3px solid var(--ivory-2)" }}>
              <img src="/images/mio-fullbody.png" alt="あずきちゃん" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>あずき</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)", marginBottom: 12 }}>Azuki</div>
            <p style={{ fontSize: 13, color: "var(--brown-2)", lineHeight: 1.85, textAlign: "left" }}>
              北海道十勝出身、34歳。都内在住の映像プロデューサー。2018年から8年間コツコツ積み上げ、2026年4月にサイドFIRE達成。好きな仕事を続けながら、ごまもちと楽しく暮らしています。
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12, justifyContent: "center" }}>
              {["映像プロデューサー", "サイドFIRE達成済み", "インデックス投資", "料理好き"].map((tag) => (
                <span key={tag} style={{ fontSize: 11, background: "var(--ivory-2)", padding: "3px 10px", borderRadius: 20, color: "var(--brown-3)", border: "1px solid var(--beige)" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ごまもちカード */}
          <div style={{ background: "#fdf0ea", border: "1.5px solid var(--blush)", borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 16px", overflow: "hidden", border: "3px solid var(--blush)" }}>
              <img src="/images/gomamochi-sit.png" alt="ごまもち" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>ごまもち</div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "var(--brown-3)", marginBottom: 12 }}>Gomamochi, Boston Terrier</div>
            <p style={{ fontSize: 13, color: "var(--brown-2)", lineHeight: 1.85, textAlign: "left" }}>
              2023年生まれ、もうすぐ3歳。わが家の末っ子ボストンテリア。表情豊かで食いしん坊。散歩とおやつが大好き。ブログでは読者目線であずきちゃんに質問する役を担当。
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12, justifyContent: "center" }}>
              {["ボストンテリア", "食いしん坊", "散歩大好き", "質問担当🐾"].map((tag) => (
                <span key={tag} style={{ fontSize: 11, background: "var(--ivory-2)", padding: "3px 10px", borderRadius: 20, color: "var(--brown-3)", border: "1px solid var(--beige)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── HISTORY TIMELINE ── */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--brown)", marginBottom: 24, paddingLeft: 16, borderLeft: "4px solid var(--terra)", lineHeight: 1.5 }}>
            わたしの歩み
          </h2>
          <div>
            {timeline.map((item, i) => (
              <div key={item.year} style={{ display: "grid", gridTemplateColumns: "112px 1fr", gap: 0, position: "relative" }}>
                {/* vertical line (not on last item) */}
                {i < timeline.length - 1 && (
                  <div style={{ position: "absolute", left: 105, top: 28, bottom: 0, width: 2, background: "var(--beige-2)" }} />
                )}
                {/* year */}
                <div style={{ fontFamily: "var(--font-hand)", fontSize: 15, color: "var(--terra)", fontWeight: 600, paddingTop: 6, paddingRight: 20, textAlign: "right", lineHeight: 1.3 }}>
                  {item.year}
                </div>
                {/* dot */}
                <div style={{ position: "absolute", left: 99, top: 8, width: 14, height: 14, background: "var(--terra)", borderRadius: "50%", border: "3px solid var(--ivory)" }} />
                {/* body */}
                <div style={{ padding: "0 0 32px 20px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brown)", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: "var(--brown-2)", lineHeight: 1.8 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PURPOSE BOX ── */}
        <div style={{ background: "var(--ivory-2)", border: "1.5px solid var(--beige-2)", borderRadius: 20, padding: "32px 28px", marginBottom: 52 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--brown)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            🐾 このブログでお伝えしたいこと
          </div>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {purposeItems.map((text) => (
              <li key={text} style={{ fontSize: 14, color: "var(--brown-2)", display: "flex", alignItems: "flex-start", gap: 10, lineHeight: 1.75 }}>
                <span style={{ flexShrink: 0, fontSize: 13, marginTop: 2 }}>🐾</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* ── CONTACT BOX ── */}
        <div style={{ background: "var(--green)", color: "white", borderRadius: 20, padding: "32px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>お問い合わせ・コラボのご依頼</div>
          <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 22, lineHeight: 1.8 }}>
            記事へのご感想、取材・コラボのご依頼はお気軽にどうぞ。<br />
            アフィリエイト案件のご相談も受け付けています。
          </p>
          <a href="mailto:mio@harukamuy.com" style={{ display: "inline-block", background: "white", color: "var(--green)", padding: "12px 28px", borderRadius: 30, fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.06em" }}>
            お問い合わせはこちら →
          </a>
        </div>

      </div>
    </>
  );
}
