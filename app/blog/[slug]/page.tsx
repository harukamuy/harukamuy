import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const categoryLabel: Record<string, string> = {
  gomazochi: "🐾 ごまもち",
  sidefire: "💰 サイドFIRE",
};

const categoryColor: Record<string, string> = {
  gomazochi: "bg-emerald-100 text-emerald-700",
  sidefire: "bg-amber-100 text-amber-700",
};

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const contentHtml = await renderMarkdown(post.content);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-sm text-stone-400 hover:text-amber-600 transition-colors mb-8 inline-block"
      >
        ← ブログ一覧
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[post.category] ?? "bg-stone-100 text-stone-600"}`}>
              {categoryLabel[post.category] ?? post.category}
            </span>
            <time className="text-sm text-stone-400">{post.date}</time>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed border-l-4 border-amber-200 pl-4">
            {post.excerpt}
          </p>
        </header>

        <div
          className="prose prose-stone prose-a:text-amber-600 max-w-none
            prose-headings:font-bold prose-headings:text-stone-800
            prose-p:leading-relaxed prose-p:text-stone-700
            prose-strong:text-stone-800
            prose-table:text-sm
            prose-th:bg-stone-50 prose-th:font-semibold
            prose-td:border prose-td:border-stone-200 prose-td:px-3 prose-td:py-2
            prose-th:border prose-th:border-stone-200 prose-th:px-3 prose-th:py-2"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>

      {/* ナビゲーション */}
      <div className="mt-12 pt-8 border-t border-stone-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-amber-600 hover:underline font-medium"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
