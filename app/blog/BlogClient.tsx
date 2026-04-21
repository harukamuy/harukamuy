"use client";

import { useSearchParams } from "next/navigation";
import type { Post, Category } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "gomazochi", label: "🐾 ごまもち" },
  { value: "sidefire", label: "💰 サイドFIRE" },
];

export default function BlogClient({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as Category | null;

  const filtered =
    category && category !== "all"
      ? posts.filter((p) => p.category === category)
      : posts;

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

      {filtered.length === 0 ? (
        <p className="text-stone-400 text-center py-20">記事がまだありません。</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
