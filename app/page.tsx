import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="text-6xl mb-6">🐾</div>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 leading-tight">
          ごまもちとサイドFIREの記録
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">
          ボストンテリアのごまもちとの日々、そして澪のサイドFIREへの道のりを綴るブログ。
        </p>

        {/* Category pills */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/blog?category=gomazochi"
            className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-100 transition-colors"
          >
            🐾 ごまもち
          </Link>
          <Link
            href="/blog?category=sidefire"
            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-100 transition-colors"
          >
            💰 サイドFIRE
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-700">最新の記事</h2>
          <Link
            href="/blog"
            className="text-sm text-amber-600 hover:underline font-medium"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
