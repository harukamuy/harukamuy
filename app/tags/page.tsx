import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";

const SITE_URL = "https://harukamuy.com";

export const metadata: Metadata = {
  title: "タグ一覧",
  description: "harukamuyの記事タグ一覧。気になるテーマから記事を探せます。",
  alternates: { canonical: `${SITE_URL}/tags` },
};

export default function TagsIndexPage() {
  const allPosts = getAllPosts();
  // タグごとの記事数を数えて、多い順に並べる
  const counts = new Map<string, number>();
  for (const p of allPosts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  const tags = getAllTags()
    .map((t) => ({ name: t, count: counts.get(t) ?? 0 }))
    .sort((a, b) => b.count - a.count);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--brown-3)", marginBottom: 22 }}>
        <Link href="/" style={{ color: "var(--brown-3)", textDecoration: "none" }}>TOP</Link>
        <span style={{ opacity: 0.5 }}>›</span>
        <span>タグ一覧</span>
      </div>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "var(--brown)", marginBottom: 6, letterSpacing: "0.02em" }}>
        タグ一覧
      </h1>
      <p style={{ fontSize: 13, color: "var(--brown-3)", marginBottom: 28 }}>
        {tags.length} 個のタグ・{allPosts.length} 記事
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tags.map((t) => (
          <Link
            key={t.name}
            href={`/tag/${tagToSlug(t.name)}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--white)",
              border: "1.5px solid var(--beige)",
              borderRadius: 22,
              padding: "8px 16px",
              textDecoration: "none",
              color: "var(--brown)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <span>#{t.name}</span>
            <span style={{ fontSize: 11, color: "var(--brown-3)", background: "var(--ivory-2)", padding: "1px 8px", borderRadius: 10 }}>
              {t.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
