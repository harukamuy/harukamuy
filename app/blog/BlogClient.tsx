"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { PostMeta, Category } from "@/lib/posts";
import BlogView from "./BlogView";
import { PAGE_SIZE } from "./constants";

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

  return (
    <BlogView
      visible={filtered.slice(0, visibleCount)}
      total={filtered.length}
      category={category}
      onMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
    />
  );
}
