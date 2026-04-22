import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--brown)", color: "rgba(253,250,246,0.7)", padding: "40px 24px 28px" }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 32,
        alignItems: "start",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--white)",
            marginBottom: 8,
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            🐾 harukamuy
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.85, maxWidth: 300 }}>
            フリーランス映像プロデューサー・あずきちゃんと愛犬ごまもちによる、FIRE達成後の暮らしと資産管理の記録ブログ。
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <Link href="/blog" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>ブログ</Link>
          <Link href="/blog?category=gomazochi" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>ごまもち</Link>
          <Link href="/blog?category=sidefire" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>サイドFIRE</Link>
          <Link href="/about" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>About</Link>
          <Link href="/privacy" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>プライバシーポリシー</Link>
        </nav>
      </div>
      <div style={{
        marginTop: 28,
        paddingTop: 18,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        fontSize: 11,
        textAlign: "center",
        letterSpacing: "0.06em",
      }}>
        © 2025 harukamuy — あずき
      </div>
    </footer>
  );
}
