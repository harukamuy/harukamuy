import Link from "next/link";
import type { Post } from "@/lib/posts";

const categoryLabel: Record<string, string> = {
  gomazochi: "🐾 ごまもち",
  sidefire: "💰 サイドFIRE",
  all: "📝 その他",
};

const categoryColor: Record<string, string> = {
  gomazochi: "bg-amber-100 text-amber-700",
  sidefire: "bg-emerald-100 text-emerald-700",
  all: "bg-stone-100 text-stone-600",
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[post.category] ?? categoryColor.all}`}
          >
            {categoryLabel[post.category] ?? post.category}
          </span>
          <time className="text-xs text-stone-400">{post.date}</time>
        </div>
        <h2 className="text-lg font-bold text-stone-800 group-hover:text-amber-600 transition-colors mb-2 leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-stone-500 line-clamp-2">{post.excerpt}</p>
      </article>
    </Link>
  );
}
