import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Category = "gomazochi" | "sidefire" | "all";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  coverImage?: string;
  content: string;
};

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostsByCategory(category: Category): Post[] {
  if (category === "all") return getAllPosts();
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      category: data.category ?? "all",
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage,
      content,
    };
  } catch {
    return null;
  }
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return result.toString();
}
