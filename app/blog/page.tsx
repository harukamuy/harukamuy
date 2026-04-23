import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ブログ",
  description: "サイドFIRE・投資・愛犬ごまもちの日常をテーマにした記事一覧。インデックス投資・高配当株・フリーランスのお金事情など。",
  alternates: { canonical: "https://harukamuy.com/blog" },
  openGraph: {
    title: "ブログ | harukamuy",
    description: "サイドFIRE・投資・愛犬ごまもちの日常をテーマにした記事一覧。インデックス投資・高配当株・フリーランスのお金事情など。",
    url: "https://harukamuy.com/blog",
    images: [{ url: "/images/mio-room.png", width: 1200, height: 630, alt: "harukamuy ブログ" }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-stone-400">読み込み中...</div>}>
      <BlogClient posts={posts} />
    </Suspense>
  );
}
