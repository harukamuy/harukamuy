"use client";

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

// 記事一覧の見た目だけを受け持つ部品。
// URLのカテゴリを読む BlogClient と、サーバーで先に組み立てる初期表示の両方から使う。
// 初期表示を別に持つのは、BlogClient だけだとサーバーから届くHTMLが
// 「読み込み中...」だけになり、読者には空白が見え、Googleにも中身が届かなかったため。
export default function BlogView({
  visible,
  total,
  category,
  onMore,
}: {
  visible: PostMeta[];
  total: number;
  category: Category | null;
  onMore?: () => void;
}) {
  const remaining = total - visible.length;

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
        {total} 件の記事{visible.length < total ? `（${visible.length} 件を表示中）` : ""}
      </p>

      {total === 0 ? (
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
            onClick={onMore}
            className="px-8 py-3 rounded-full text-sm font-semibold border border-stone-300 bg-white text-stone-600 hover:border-stone-500 transition-colors cursor-pointer"
          >
            もっと見る（残り {remaining} 件）
          </button>
        </div>
      )}
    </div>
  );
}
