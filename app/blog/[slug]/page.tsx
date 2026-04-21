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
            <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
              {categoryLabel[post.category] ?? post.category}
            </span>
            <time className="text-sm text-stone-400">{post.date}</time>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-tight">
            {post.title}
          </h1>
        </header>

        <div
          className="prose prose-stone prose-a:text-amber-600 max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
