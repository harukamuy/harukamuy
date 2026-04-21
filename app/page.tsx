import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="flex justify-center gap-3 mb-6 text-5xl">
          <span>👩</span>
          <span>🐾</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4 leading-tight">
          フリーランスで働きながら、<br />ごまもちと一緒にFIREを目指す記録。
        </h1>
        <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed mb-2">
          白川澪（34歳・フリーランス映像プロデューサー）と<br />
          愛犬ごまもち（ボストンテリア）の会話形式サイドFIREブログ。
        </p>
        <p className="text-amber-600 font-semibold text-sm">毎月の資産を正直に公開しています。</p>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <Link
            href="/blog?category=sidefire"
            className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-100 transition-colors"
          >
            💰 サイドFIRE実録
          </Link>
          <Link
            href="/blog?category=gomazochi"
            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-100 transition-colors"
          >
            🐾 ごまもち日記
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 bg-stone-50 border border-stone-200 text-stone-600 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-stone-100 transition-colors"
          >
            👤 澪とごまもちについて
          </Link>
        </div>
      </section>

      {/* 資産サマリー */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            <h2 className="font-bold text-stone-700">2026年4月 資産サマリー</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-1">総資産</p>
              <p className="text-xl font-bold text-stone-800">5,463万円</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-1">年間配当（税引後）</p>
              <p className="text-xl font-bold text-emerald-600">49万円</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-1">配当利回り</p>
              <p className="text-xl font-bold text-stone-800">4.94%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-1">FIRE目標</p>
              <p className="text-xl font-bold text-amber-600">達成済み✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新記事 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-700">最新の記事</h2>
          <Link href="/blog" className="text-sm text-amber-600 hover:underline font-medium">
            すべて見る →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-stone-400 text-center py-12">記事準備中です。</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
