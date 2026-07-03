"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { PostMeta, Category } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "sidefire", label: "💰 サイドFIRE" },
  { value: "investment", label: "📈 投資" },
  { value: "freelance", label: "💼 フリーランス" },
  { value: "news", label: "📰 ニュース" },
  { value: "gomazochi", label: "🐾 ごまもち" },
];

// 一度に表示する記事数（「もっと見る」で増える）
const PAGE_SIZE = 24;

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as Category | null;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // カテゴリを切り替えたら表示数をリセット
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category]);

  const filtered =
    category && category !== "all"
      ? posts.filter((p) => p.category === category)
      : posts;

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">ブログ</h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value === "all" ? "/blog" : `/blog?category=${cat.value}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              (cat.value === "all" && !category) || category === cat.value
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <p className="text-sm text-stone-400 mb-6">
        {filtered.length} 件の記事{visibleCount < filtered.length ? `（${visible.length} 件を表示中）` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="text-stone-400 text-center py-20">記事がまだありません。</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {remaining > 0 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-8 py-3 rounded-full text-sm font-semibold border border-stone-300 bg-white text-stone-600 hover:border-stone-500 transition-colors cursor-pointer"
          >
            もっと見る（残り {remaining} 件）
          </button>
        </div>
      )}
    </div>
  );
}
