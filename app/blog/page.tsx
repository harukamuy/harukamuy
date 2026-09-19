import { getAllPostMeta } from "@/lib/posts";
import BlogClient from "./BlogClient";
import BlogView from "./BlogView";
import { PAGE_SIZE } from "./constants";
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
    images: [{ url: "/images/harukamuy-ogp.jpg", width: 1200, height: 630, alt: "harukamuy ブログ" }],
  },
};

export default function BlogPage() {
  const posts = getAllPostMeta();
  return (
    // 初期表示（最新24本）をサーバーで組み立てておく。URLのカテゴリを読む BlogClient は
    // ブラウザでしか動かないので、ここを「読み込み中...」にすると空白のページが届いていた。
    <Suspense fallback={<BlogView visible={posts.slice(0, PAGE_SIZE)} total={posts.length} category={null} />}>
      <BlogClient posts={posts} />
    </Suspense>
  );
}
