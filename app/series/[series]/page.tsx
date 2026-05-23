import { getAllSeries, getSeriesPosts, SERIES_NAMES } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";

type Props = { params: Promise<{ series: string }> };

const SITE_URL = "https://harukamuy.com";

export async function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series } = await params;
  const posts = getSeriesPosts(series);
  if (posts.length === 0) return {};
  const name = SERIES_NAMES[series] ?? series;
  return {
    title: `${name}（連載）`,
    description: `${name}の連載記事一覧（全${posts.length}回）。${posts[0]?.excerpt ?? ""}`,
    alternates: { canonical: `${SITE_URL}/series/${series}` },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { series } = await params;
  const posts = getSeriesPosts(series);
  if (posts.length === 0) notFound();
  const name = SERIES_NAMES[series] ?? series;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--brown-3)", marginBottom: 22 }}>
        <Link href="/" style={{ color: "var(--brown-3)", textDecoration: "none" }}>TOP</Link>
        <span style={{ opacity: 0.5 }}>›</span>
        <Link href="/blog" style={{ color: "var(--brown-3)", textDecoration: "none" }}>記事一覧</Link>
        <span style={{ opacity: 0.5 }}>›</span>
        <span>連載「{name}」</span>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--terra)", letterSpacing: "0.12em", marginBottom: 6 }}>📚 SERIES</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 700, color: "var(--brown)", marginBottom: 6, letterSpacing: "0.02em" }}>
          {name}
        </h1>
        <p style={{ fontSize: 13, color: "var(--brown-3)" }}>
          全{posts.length}回の連載
        </p>
      </div>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 16,
                alignItems: "start",
                background: "var(--white)",
                border: "1.5px solid var(--beige)",
                borderRadius: 14,
                padding: "16px 20px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "var(--blush)",
                color: "var(--brown)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: 15,
                flexShrink: 0,
              }}>
                {p.seriesOrder ?? "?"}
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--brown-3)", letterSpacing: "0.06em", marginBottom: 4 }}>
                  {format(new Date(p.date), "yyyy.MM.dd")}
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, color: "var(--brown)", marginBottom: 4, lineHeight: 1.5 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--brown-2)", lineHeight: 1.7 }}>
                  {p.excerpt}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
