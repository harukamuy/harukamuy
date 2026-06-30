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
            <img src="/images/logo.png" alt="harukamuy" width={20} height={20} loading="lazy" style={{ width: 20, height: 20, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
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
            <a href="https://www.instagram.com/harukamuy_azuki/" target="_blank" rel="noopener" aria-label="Instagram" style={{ color: "rgba(253,250,246,0.55)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
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
