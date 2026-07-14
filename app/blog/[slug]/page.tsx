import { getAllPosts, getPostBySlug, renderMarkdown, extractHeadings, estimateReadingMinutes, tagToSlug, getSeriesPosts, SERIES_NAMES } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";
import { latestStats } from "@/components/sidefireData";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const SITE_URL = "https://harukamuy.com";

// YYYY-MM-DD → ISO 8601 with JST timezone (for schema.org / OpenGraph date properties)
const toIsoJst = (d: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00+09:00` : d;

// OGP用の軽量JPG（scripts/make-og-images.mjs が public/images/og/ に生成）。
// X や LINE は大きい画像・WebPだとカードに画像を出さないことがあるため。
function ogImageUrl(coverImage?: string): string {
  if (!coverImage) return `${SITE_URL}/images/harukamuy-ogp.jpg`;
  const base = coverImage.replace(/^\/images\//, "").replace(/\.[a-z]+$/i, "");
  return `${SITE_URL}/images/og/${base}.jpg`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogImage = ogImageUrl(post.coverImage);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: toIsoJst(post.date),
      modifiedTime: toIsoJst(post.updated ?? post.date),
      authors: ["あずき"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

const categoryLabel: Record<string, string> = {
  gomazochi: "ごまもち🐾",
  sidefire: "サイドFIRE",
  investment: "投資",
  freelance: "フリーランス",
  news: "ニュース",
  all: "その他",
};

const thumbColors: Record<string, string> = {
  sidefire: "#8fa87f",
  gomazochi: "#d4a898",
  all: "#c9b99a",
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const stats = latestStats();

  const contentHtml = await renderMarkdown(post.content);
  const headings = extractHeadings(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);

  const allPosts = getAllPosts();
  // 同カテゴリの記事を優先し、不足分は他カテゴリの新着で補う
  const sameCategory = allPosts.filter((p) => p.slug !== slug && p.category === post.category);
  const otherCategory = allPosts.filter((p) => p.slug !== slug && p.category !== post.category);
  const relatedPosts = [...sameCategory, ...otherCategory].slice(0, 4);

  // 連載情報（series が指定されていれば、シリーズ内の前後記事と目次を出す）
  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];
  const seriesIndex = seriesPosts.findIndex((p) => p.slug === slug);
  const prevInSeries = seriesIndex > 0 ? seriesPosts[seriesIndex - 1] : null;
  const nextInSeries = seriesIndex >= 0 && seriesIndex < seriesPosts.length - 1 ? seriesPosts[seriesIndex + 1] : null;
  const seriesName = post.series ? (SERIES_NAMES[post.series] ?? post.series) : "";

  const relatedThumbColors = ["#d4957e", "#d4a898", "#7a9e96", "#8fa87f"];

  const ogImage = ogImageUrl(post.coverImage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: toIsoJst(post.date),
    dateModified: toIsoJst(post.updated ?? post.date),
    author: {
      "@type": "Person",
      name: "あずき",
      url: SITE_URL,
      sameAs: ["https://x.com/harukamuy", "https://www.instagram.com/harukamuy_azuki/"],
    },
    publisher: {
      "@type": "Organization",
      name: "harukamuy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/mio-fullbody.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TOP", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: categoryLabel[post.category] ?? post.category, item: `${SITE_URL}/blog?category=${post.category}` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      {/* 構造化データ (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="blog-post-layout" style={{
      maxWidth: 960,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 272px",
      gap: 48,
      padding: "48px 24px 80px",
      alignItems: "start",
    }}>
      {/* minWidth: 0 がないと grid item が中身（パンくずの nowrap タイトル）の幅まで広がり、モバイルで横スクロールが発生する */}
      <article style={{ minWidth: 0 }}>
        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" style={{ marginBottom: 22 }}>
          <ol style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "clamp(11px, 2vw, 13px)",
            color: "var(--brown-2)",
          }}>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link href="/" style={{ color: "var(--brown-2)", textDecoration: "none" }}>TOP</Link>
              <span aria-hidden="true" style={{ opacity: 0.5 }}>›</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link href={`/blog?category=${post.category}`} style={{ color: "var(--brown-2)", textDecoration: "none" }}>
                {categoryLabel[post.category] ?? post.category}
              </Link>
              <span aria-hidden="true" style={{ opacity: 0.5 }}>›</span>
            </li>
            <li style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }} aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Hero image area */}
        <div style={{
          width: "100%",
          aspectRatio: "16/9",
          background: thumbColors[post.category] ?? "#c9b99a",
          borderRadius: 20,
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: post.coverImagePosition ?? "top center" }}
            />
          ) : (
            <>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(-45deg,transparent,transparent 10px,rgba(255,255,255,0.2) 10px,rgba(255,255,255,0.2) 11px)",
              }} />
              <span style={{ fontFamily: "var(--font-hand)", fontSize: 14, color: "rgba(255,255,255,0.9)", zIndex: 1 }}>
                記事アイキャッチ画像（1200 × 630）
              </span>
            </>
          )}
        </div>

        {/* Category + date */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{
            fontSize: 11,
            background: "var(--terra)",
            color: "white",
            padding: "3px 12px",
            borderRadius: 20,
            letterSpacing: "0.1em",
          }}>
            {categoryLabel[post.category] ?? post.category}
          </span>
          <span style={{ fontSize: 12, color: "var(--brown-3)" }}>{post.date}</span>
          <span style={{ fontSize: 12, color: "var(--brown-3)" }}>📖 約{readingMinutes}分で読めます</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(20px, 3.2vw, 28px)",
          fontWeight: 700,
          lineHeight: 1.6,
          color: "var(--brown)",
          marginBottom: 10,
          letterSpacing: "0.02em",
          fontFamily: "var(--font-serif)",
        }}>
          {post.title}
        </h1>

        {/* PR表記（ステマ規制対応：サイドバー含めページ内に広告リンクがあるため全記事に表示） */}
        <div style={{ fontSize: 11, color: "var(--brown-3)", marginBottom: 24, letterSpacing: "0.02em" }}>
          ※本記事にはアフィリエイト広告（プロモーション）が含まれています
        </div>

        {/* Series banner */}
        {post.series && seriesPosts.length > 0 && (
          <div
            style={{
              background: "var(--white)",
              border: "1.5px solid var(--blush)",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--terra)", letterSpacing: "0.1em" }}>📚 SERIES</span>
              <Link href={`/series/${post.series}`} style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 600, color: "var(--brown)", textDecoration: "none" }}>
                {seriesName}（全{seriesPosts.length}回）
              </Link>
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {seriesPosts.map((p) => {
                const isCurrent = p.slug === slug;
                return (
                  <li key={p.slug} style={{ fontSize: 12, lineHeight: 1.6 }}>
                    {isCurrent ? (
                      <span style={{ color: "var(--brown)", fontWeight: 600 }}>
                        ▶ {p.seriesOrder ?? "?"}. {p.title}
                      </span>
                    ) : (
                      <Link href={`/blog/${p.slug}`} style={{ color: "var(--brown-2)", textDecoration: "none" }}>
                        {p.seriesOrder ?? "?"}. {p.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* Table of Contents */}
        {headings.length >= 2 && (
          <nav
            aria-label="目次"
            style={{
              background: "var(--ivory-2)",
              border: "1px solid var(--beige)",
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 28,
            }}
          >
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--brown-2)",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              📑 目次
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {headings.map((h) => (
                <li key={h.id} style={{ marginLeft: h.level === 3 ? 16 : 0, marginBottom: 6 }}>
                  <a
                    href={`#${h.id}`}
                    style={{
                      fontSize: h.level === 3 ? 12 : 13,
                      color: "var(--brown-2)",
                      textDecoration: "none",
                      lineHeight: 1.6,
                    }}
                  >
                    {h.level === 3 ? "– " : ""}{h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Content */}
        <div
          className="prose prose-stone prose-a:text-amber-600 max-w-none
            prose-headings:font-bold prose-headings:text-stone-800
            prose-p:leading-relaxed prose-p:text-stone-700
            prose-strong:text-stone-800"
          style={{ fontFamily: "var(--font-body)" }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--brown-2)", letterSpacing: "0.08em" }}>TAGS</span>
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/tag/${tagToSlug(t)}`}
                style={{
                  fontSize: 12,
                  color: "var(--brown-2)",
                  background: "var(--ivory-2)",
                  border: "1px solid var(--beige)",
                  borderRadius: 20,
                  padding: "3px 12px",
                  textDecoration: "none",
                }}
              >
                #{t}
              </Link>
            ))}
          </div>
        )}

        {/* Series prev/next */}
        {post.series && (prevInSeries || nextInSeries) && (
          <nav
            aria-label="連載ナビゲーション"
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {prevInSeries ? (
              <Link
                href={`/blog/${prevInSeries.slug}`}
                style={{
                  background: "var(--white)",
                  border: "1.5px solid var(--beige)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: "0.1em", marginBottom: 4 }}>← 前の話（第{prevInSeries.seriesOrder}回）</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--brown)", lineHeight: 1.5 }}>{prevInSeries.title}</div>
              </Link>
            ) : <div />}
            {nextInSeries ? (
              <Link
                href={`/blog/${nextInSeries.slug}`}
                style={{
                  background: "var(--white)",
                  border: "1.5px solid var(--beige)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  textAlign: "right",
                }}
              >
                <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: "0.1em", marginBottom: 4 }}>次の話（第{nextInSeries.seriesOrder}回）→</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--brown)", lineHeight: 1.5 }}>{nextInSeries.title}</div>
              </Link>
            ) : <div />}
          </nav>
        )}

        {/* Share */}
        <ShareButtons title={post.title} />

        {/* Related */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: 44 }}>
            <div style={{
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontFamily: "var(--font-serif)",
            }}>
              🐾 関連記事
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {relatedPosts.map((related, i) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  style={{
                    background: "var(--white)",
                    border: "1.5px solid var(--beige)",
                    borderRadius: 14,
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <div style={{
                    aspectRatio: "16/9",
                    background: relatedThumbColors[i % relatedThumbColors.length],
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {related.coverImage ? (
                      <img src={related.coverImage} alt={related.title} width={1600} height={900} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: related.coverImagePosition ?? "top center" }} />
                    ) : (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,0.25) 7px,rgba(255,255,255,0.25) 8px)",
                      }} />
                    )}
                  </div>
                  <div style={{ padding: "11px 13px" }}>
                    <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: "0.1em", marginBottom: 4 }}>
                      {categoryLabel[related.category] ?? related.category}
                    </div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: 1.65,
                      color: "var(--brown)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {related.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* SIDEBAR */}
      <aside className="blog-post-sidebar" style={{ position: "sticky", top: 86, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Profile card */}
        <div style={{
          background: "var(--white)",
          border: "1.5px solid var(--beige)",
          borderRadius: 18,
          padding: "18px 16px",
          overflow: "hidden",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brown)", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
            このブログについて
          </div>
          <div style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            margin: "0 auto 10px",
            border: "3px solid var(--ivory-2)",
            overflow: "hidden",
          }}>
            <img src="/images/mio-fullbody.webp" alt="あずき" width={400} height={400} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>あずき ＆ ごまもち</div>
          <div style={{ fontSize: 11, color: "var(--brown-3)", marginBottom: 9 }}>映像プロデューサー・34歳</div>
          <div style={{ fontSize: 11, color: "var(--brown-2)", lineHeight: 1.8, textAlign: "left" }}>
            愛犬ごまもちと会話しながら、投資・FIRE・フリーランスの話をゆるく発信中。
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
            <a
              href="https://x.com/harukamuy"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "var(--brown)",
                background: "var(--ivory-2)",
                border: "1px solid var(--beige)",
                padding: "5px 12px",
                borderRadius: 20,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Xでフォロー
            </a>
            <a
              href="https://www.instagram.com/harukamuy_azuki/"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "var(--brown)",
                background: "var(--ivory-2)",
                border: "1px solid var(--beige)",
                padding: "5px 12px",
                borderRadius: 20,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
          </div>
        </div>

        {/* Asset card */}
        <div style={{
          background: "var(--green)",
          border: "1.5px solid transparent",
          borderRadius: 18,
          padding: "18px 16px",
          overflow: "hidden",
          color: "white",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            📊 現在の資産状況（{stats.monthLabel}）
          </div>
          {[
            { label: "総資産", value: stats.totalManYenStr, unit: "万円" },
            { label: "年間配当", value: String(stats.annualDividendManYen), unit: "万円" },
            { label: "利回り", value: stats.yieldPctStr, unit: "%" },
          ].map((row) => (
            <div key={row.label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "7px 0",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              fontSize: 12,
            }}>
              <span>{row.label}</span>
              <span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{row.value}</span>
                <span style={{ fontSize: 10, opacity: 0.7 }}>{row.unit}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Recommended services */}
        <div style={{
          background: "var(--white)",
          border: "1.5px solid var(--beige)",
          borderRadius: 18,
          padding: "18px 16px",
          overflow: "hidden",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brown)", letterSpacing: "0.08em", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            🔗 おすすめサービス
          </div>
          {[
            { icon: "📈", name: "SBI証券", sub: "メイン証券口座", href: "https://h.accesstrade.net/sp/cc?rk=0100piab00orlw", rel: "nofollow sponsored noopener" },
            { icon: "📊", name: "freee 確定申告", sub: "フリーランス必須ツール", href: "https://px.a8.net/svt/ejp?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y", rel: "nofollow sponsored noopener" },
          ].map((item, i, arr) => (
            <a
              key={item.name}
              href={item.href}
              rel={item.rel || undefined}
              target={item.rel ? "_blank" : undefined}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "9px 0",
                borderBottom: i < arr.length - 1 ? "1px solid var(--beige)" : "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{
                width: 34,
                height: 34,
                background: "var(--ivory-2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "var(--brown-3)" }}>{item.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </aside>
    </div>
    {/* A8 tracking pixel */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img width={1} height={1} src="https://www12.a8.net/0.gif?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y" alt="" style={{ display: "block", border: 0 }} />
    {/* accesstrade impression pixel - SBI ゼロ革命 */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img width={1} height={1} src="https://h.accesstrade.net/sp/rr?rk=0100piab00orlw" alt="" style={{ display: "block", border: 0 }} />
    </>
  );
}
