import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const categoryLabel: Record<string, string> = {
  gomazochi: "ごまもち🐾",
  sidefire: "サイドFIRE",
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

  const contentHtml = await renderMarkdown(post.content);

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  const relatedThumbColors = ["#d4957e", "#d4a898", "#7a9e96", "#8fa87f"];

  return (
    <div style={{
      maxWidth: 960,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 272px",
      gap: 48,
      padding: "48px 24px 80px",
      alignItems: "start",
    }}>
      <article>
        {/* Breadcrumb */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: "var(--brown-3)",
          marginBottom: 22,
        }}>
          <Link href="/" style={{ color: "var(--brown-3)", textDecoration: "none" }}>TOP</Link>
          <span style={{ opacity: 0.5 }}>›</span>
          <Link href={`/blog?category=${post.category}`} style={{ color: "var(--brown-3)", textDecoration: "none" }}>
            {categoryLabel[post.category] ?? post.category}
          </Link>
          <span style={{ opacity: 0.5 }}>›</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
            {post.title}
          </span>
        </div>

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
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
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
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(20px, 3.2vw, 28px)",
          fontWeight: 700,
          lineHeight: 1.6,
          color: "var(--brown)",
          marginBottom: 24,
          letterSpacing: "0.02em",
          fontFamily: "var(--font-serif)",
        }}>
          {post.title}
        </h1>

        {/* Content */}
        <div
          className="prose prose-stone prose-a:text-amber-600 max-w-none
            prose-headings:font-bold prose-headings:text-stone-800
            prose-p:leading-relaxed prose-p:text-stone-700
            prose-strong:text-stone-800"
          style={{ fontFamily: "var(--font-body)" }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

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
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,0.25) 7px,rgba(255,255,255,0.25) 8px)",
                    }} />
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
      <aside style={{ position: "sticky", top: 86, display: "flex", flexDirection: "column", gap: 20 }}>
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
            <img src="/images/mio-fullbody.png" alt="あずき" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>あずき ＆ ごまもち</div>
          <div style={{ fontSize: 11, color: "var(--brown-3)", marginBottom: 9 }}>映像プロデューサー・34歳</div>
          <div style={{ fontSize: 11, color: "var(--brown-2)", lineHeight: 1.8, textAlign: "left" }}>
            愛犬ごまもちと会話しながら、投資・FIRE・フリーランスの話をゆるく発信中。
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 9, justifyContent: "center" }}>
            {["サイドFIRE", "投資", "🐶 ごまもち"].map((tag) => (
              <span key={tag} style={{
                fontSize: 10,
                background: "var(--ivory-2)",
                padding: "2px 8px",
                borderRadius: 20,
                color: "var(--brown-3)",
                border: "1px solid var(--beige)",
              }}>{tag}</span>
            ))}
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
            📊 現在の資産状況
          </div>
          {[
            { label: "総資産", value: "5,463", unit: "万円" },
            { label: "年間配当", value: "49", unit: "万円" },
            { label: "利回り", value: "4.94", unit: "%" },
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
            { icon: "📈", name: "SBI証券", sub: "メイン証券口座" },
            { icon: "🌏", name: "eMAXIS Slim 全世界", sub: "積立NISAで5年愛用" },
            { icon: "📊", name: "freee 確定申告", sub: "フリーランス必須ツール" },
          ].map((item, i, arr) => (
            <a
              key={item.name}
              href="#"
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
  );
}
