import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "ページが見つかりません",
  description: "お探しのページが見つかりませんでした。",
};

export default function NotFound() {
  const recent = getAllPosts().slice(0, 5);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px 96px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-hand)", fontSize: 80, color: "var(--blush)", lineHeight: 1, marginBottom: 16 }}>404</div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, color: "var(--brown)", marginBottom: 12, letterSpacing: "0.02em" }}>
        ページが見つかりません
      </h1>
      <p style={{ fontSize: 14, color: "var(--brown-2)", lineHeight: 1.8, marginBottom: 28 }}>
        URLが変わったか、もう存在しないページかもしれません。
        <br />
        以下から探してみてください。
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 44 }}>
        <Link href="/" style={pillStyle()}>🏠 TOPへ</Link>
        <Link href="/blog" style={pillStyle()}>📝 記事一覧</Link>
        <Link href="/sidefire" style={pillStyle()}>💰 サイドFIRE</Link>
        <Link href="/gomamochi" style={pillStyle()}>🐾 ごまもち</Link>
      </div>

      <div style={{ textAlign: "left", background: "var(--white)", border: "1.5px solid var(--beige)", borderRadius: 16, padding: "20px 22px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--terra)", marginBottom: 14 }}>📚 最新の記事</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {recent.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} style={{ fontSize: 13, color: "var(--brown)", textDecoration: "none", lineHeight: 1.6, fontWeight: 500 }}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function pillStyle(): React.CSSProperties {
  return {
    background: "var(--white)",
    border: "1.5px solid var(--beige)",
    borderRadius: 22,
    padding: "8px 18px",
    fontSize: 13,
    color: "var(--brown-2)",
    textDecoration: "none",
    letterSpacing: "0.04em",
  };
}
