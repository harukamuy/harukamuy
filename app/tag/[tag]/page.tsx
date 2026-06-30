import { getAllTags, getPostsByTag, tagToSlug, slugToTag } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";

type Props = { params: Promise<{ tag: string }> };

const SITE_URL = "https://harukamuy.com";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = slugToTag(slug);
  if (!tag) return {};
  const posts = getPostsByTag(tag);
  return {
    title: `${tag}の記事一覧`,
    description: `${tag}に関する記事 ${posts.length} 件`,
    alternates: { canonical: `${SITE_URL}/tag/${slug}` },
    openGraph: {
      title: `${tag}の記事一覧 | harukamuy`,
      description: `${tag}に関する記事 ${posts.length} 件`,
      url: `${SITE_URL}/tag/${slug}`,
      images: [{ url: "/images/harukamuy-ogp.jpg", width: 1200, height: 630, alt: `${tag}の記事一覧` }],
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: slug } = await params;
  const tag = slugToTag(slug);
  if (!tag) notFound();
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--brown-3)", marginBottom: 22 }}>
        <Link href="/" style={{ color: "var(--brown-3)", textDecoration: "none" }}>TOP</Link>
        <span style={{ opacity: 0.5 }}>›</span>
        <Link href="/blog" style={{ color: "var(--brown-3)", textDecoration: "none" }}>記事一覧</Link>
        <span style={{ opacity: 0.5 }}>›</span>
        <span>#{tag}</span>
      </div>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "var(--brown)", marginBottom: 6, letterSpacing: "0.02em" }}>
        #{tag}
      </h1>
      <p style={{ fontSize: 13, color: "var(--brown-3)", marginBottom: 32 }}>
        {posts.length} 件の記事
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              style={{
                display: "block",
                background: "var(--white)",
                border: "1.5px solid var(--beige)",
                borderRadius: 14,
                padding: "16px 18px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: 11, color: "var(--terra)", letterSpacing: "0.08em", marginBottom: 4 }}>
                {format(new Date(p.date), "yyyy.MM.dd")}
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: "var(--brown)", marginBottom: 4, lineHeight: 1.5 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>
                {p.excerpt}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
