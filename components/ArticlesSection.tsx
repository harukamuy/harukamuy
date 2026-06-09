"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

const catTabs: { value: string; label: string; kind: "all" | "category" | "tag" }[] = [
  { value: "all", label: "すべて", kind: "all" },
  { value: "sidefire", label: "サイドFIRE", kind: "category" },
  { value: "investment", label: "投資", kind: "category" },
  { value: "freelance", label: "フリーランス", kind: "category" },
  { value: "gomazochi", label: "ごまもち🐾", kind: "category" },
  { value: "十勝計画", label: "十勝計画", kind: "tag" },
];

export default function ArticlesSection({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState("all");

  const activeTab = catTabs.find((t) => t.value === active);
  const filteredAll =
    !activeTab || activeTab.kind === "all"
      ? posts
      : activeTab.kind === "tag"
        ? posts.filter((p) => p.tags?.includes(activeTab.value))
        : posts.filter((p) => p.category === activeTab.value);
  // トップは「最新の数本」だけ見せる。全部は /blog（すべて見る →）へ
  const VISIBLE = 7; // 注目1本 + 6本
  const filtered = filteredAll.slice(0, VISIBLE);
  const hasMore = filteredAll.length > VISIBLE;
  const firstPost = filtered[0];
  const restPosts = filtered.slice(1);

  return (
    <section style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto 56px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 600, color: "var(--brown)", letterSpacing: "0.04em" }}>最新の記事</div>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 13, color: "var(--brown-3)" }}>Latest Posts</div>
        </div>
        <a href="/blog" style={{ marginLeft: "auto", fontSize: 12, color: "var(--terra)", textDecoration: "none", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4 }}>
          すべて見る →
        </a>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 22, scrollbarWidth: "none" }}>
        {catTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            style={{
              whiteSpace: "nowrap",
              padding: "7px 16px",
              borderRadius: 20,
              fontSize: 12,
              letterSpacing: "0.06em",
              cursor: "pointer",
              border: active === tab.value ? "1.5px solid var(--brown)" : "1.5px solid var(--beige-2)",
              background: active === tab.value ? "var(--brown)" : "transparent",
              color: active === tab.value ? "var(--white)" : "var(--brown-2)",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <p style={{ color: "var(--brown-3)", textAlign: "center", padding: "48px 0" }}>記事がまだありません。</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {firstPost && <PostCard post={firstPost} featured />}
          {restPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a href="/blog" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: "1.5px solid var(--beige-2)",
            borderRadius: 24,
            padding: "10px 24px",
            fontSize: 13,
            color: "var(--brown-2)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}>
            記事をもっと見る →
          </a>
        </div>
      )}
    </section>
  );
}
