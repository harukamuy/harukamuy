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
            <img src="/images/logo.png" alt="harukamuy" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            harukamuy
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.85, maxWidth: 300 }}>
            フリーランス映像プロデューサー・あずきちゃんと愛犬ごまもちによる、サイドFIRE達成後の暮らしと資産管理の記録ブログ。
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <Link href="/blog" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>ブログ</Link>
          <Link href="/blog?category=gomazochi" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>ごまもち</Link>
          <Link href="/blog?category=sidefire" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>サイドFIRE</Link>
          <Link href="/tags" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>タグ一覧</Link>
          <Link href="/about" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>About</Link>
          <Link href="/privacy" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>プライバシーポリシー</Link>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 4 }}>
            <a href="https://x.com/harukamuy" target="_blank" rel="noopener" aria-label="X (Twitter)" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="/feed.xml" aria-label="RSSフィード" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>RSS</a>
          </div>
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
        © {new Date().getFullYear()} harukamuy — あずき
      </div>
    </footer>
  );
}
