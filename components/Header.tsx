"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/blog", label: "ブログ" },
  { href: "/gomamochi", label: "ごまもち" },
  { href: "/sidefire", label: "サイドFIRE" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(248,244,238,0.93)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--beige)",
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 62,
      }}>
        <Link href="/" onClick={handleLogoClick} style={{
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

        {/* Desktop nav */}
        <nav className="header-nav desktop-nav" style={{ display: "flex", alignItems: "center" }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: 13,
              color: "var(--brown-2)",
              textDecoration: "none",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}>
              {label}
            </Link>
          ))}
          <Link href="/about" style={{
            background: "var(--blush)",
            color: "var(--brown)",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}>
            About
          </Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="hamburger-btn"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "var(--brown)",
            fontSize: 22,
            lineHeight: 1,
            display: "none",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: "rgba(248,244,238,0.97)",
          borderTop: "1px solid var(--beige)",
          padding: "8px 24px 16px",
        }}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "13px 0",
                borderBottom: "1px solid var(--beige)",
                fontSize: 15,
                color: "var(--brown-2)",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "13px 0",
              fontSize: 15,
              color: "var(--brown-2)",
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
