import Link from "next/link";
import type { Post } from "@/lib/posts";

const categoryLabel: Record<string, string> = {
  gomazochi: "ごまもち🐾",
  sidefire: "サイドFIRE",
  all: "その他",
};

const thumbClass: Record<string, string> = {
  gomazochi: "t-blush",
  sidefire: "t-green",
  all: "t-beige",
};

export default function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  const catLabel = categoryLabel[post.category] ?? post.category;
  const thumbCls = thumbClass[post.category] ?? "t-beige";

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="article-card featured"
        data-cat={post.category}
        style={{
          background: "var(--white)",
          borderRadius: "var(--r)",
          overflow: "hidden",
          border: "1.5px solid var(--beige)",
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "1fr 1.25fr",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          className={thumbCls}
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
          }}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            background: "repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,0.28) 8px,rgba(255,255,255,0.28) 9px)",
          }} />
          <span style={{
            fontFamily: "var(--font-hand)",
            fontSize: 11,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            lineHeight: 1.5,
            zIndex: 1,
          }}>記事アイキャッチ<br />（1200×630推奨）</span>
        </div>
        <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--terra)",
            fontWeight: 500,
            marginBottom: 7,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <span style={{ width: 14, height: 1, background: "var(--terra)", display: "inline-block", flexShrink: 0 }} />
            {catLabel}
          </div>
          <div style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.75,
            color: "var(--brown)",
            marginBottom: 9,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.title}
          </div>
          <div style={{ fontSize: 11, color: "var(--brown-3)", letterSpacing: "0.04em" }}>{post.date}</div>
          {post.excerpt && (
            <div style={{ fontSize: 12, color: "var(--brown-3)", marginTop: 10, lineHeight: 1.75 }}>
              {post.excerpt}
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="article-card"
      data-cat={post.category}
      style={{
        background: "var(--white)",
        borderRadius: "var(--r)",
        overflow: "hidden",
        border: "1.5px solid var(--beige)",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        className={thumbCls}
        style={{
          width: "100%",
          aspectRatio: "16/9",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,0.28) 8px,rgba(255,255,255,0.28) 9px)",
        }} />
        <span style={{
          fontFamily: "var(--font-hand)",
          fontSize: 11,
          color: "rgba(255,255,255,0.85)",
          textAlign: "center",
          lineHeight: 1.5,
          zIndex: 1,
        }}>記事アイキャッチ</span>
      </div>
      <div style={{ padding: "15px 17px 18px" }}>
        <div style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "var(--terra)",
          fontWeight: 500,
          marginBottom: 7,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <span style={{ width: 14, height: 1, background: "var(--terra)", display: "inline-block", flexShrink: 0 }} />
          {catLabel}
        </div>
        <div style={{
          fontFamily: "var(--font-serif)",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.75,
          color: "var(--brown)",
          marginBottom: 9,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {post.title}
        </div>
        <div style={{ fontSize: 11, color: "var(--brown-3)", letterSpacing: "0.04em" }}>{post.date}</div>
      </div>
    </Link>
  );
}
