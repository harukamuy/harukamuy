import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(248,244,238,0.93)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--beige)",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 62,
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 600,
          fontSize: 21,
          color: "var(--brown)",
          textDecoration: "none",
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>🐾</span>
          harukamuy
        </Link>
        <nav className="header-nav" style={{ display: "flex", alignItems: "center" }}>
          <Link href="/blog" className="nav-link" style={{
            fontSize: 13,
            color: "var(--brown-2)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}>
            ブログ
          </Link>
          <Link href="/gomamochi" className="nav-link" style={{
            fontSize: 13,
            color: "var(--brown-2)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}>
            ごまもち
          </Link>
          <Link href="/sidefire" className="nav-link" style={{
            fontSize: 13,
            color: "var(--brown-2)",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}>
            サイドFIRE
          </Link>
          <Link href="/about" style={{
            background: "var(--blush)",
            color: "var(--brown)",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
