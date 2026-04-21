import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ブログ",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-stone-400">読み込み中...</div>}>
      <BlogClient posts={posts} />
    </Suspense>
  );
}
