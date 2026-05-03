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
  coverImagePosition?: string;
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
      coverImagePosition: data.coverImagePosition,
      content,
    };
  } catch {
    return null;
  }
}

// アフィリエイトIDは環境変数から取得（コード直書き禁止）
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "";
const RAKUTEN_AFF_ID = process.env.NEXT_PUBLIC_RAKUTEN_AFF_ID ?? "";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseBlock(body: string): Record<string, string> {
  const obj: Record<string, string> = {};
  body.split("\n").forEach((line) => {
    const m = line.match(/^([a-zA-Z_]+)\s*:\s*(.+)$/);
    if (m) obj[m[1].trim()] = m[2].trim();
  });
  return obj;
}

function buildAmazonUrl(asin: string): string {
  if (!asin) return "#";
  const tagPart = AMAZON_TAG ? `?tag=${encodeURIComponent(AMAZON_TAG)}` : "";
  return `https://www.amazon.co.jp/dp/${encodeURIComponent(asin)}/${tagPart}`;
}

function buildRakutenUrl(itemCode: string): string {
  if (!itemCode) return "#";
  // rb:xxxxxxxx → 楽天ブックス、それ以外 → 楽天市場
  let itemUrl: string;
  if (itemCode.startsWith("rb:")) {
    itemUrl = `https://books.rakuten.co.jp/rb/${itemCode.slice(3)}/`;
  } else {
    itemUrl = `https://item.rakuten.co.jp/${itemCode.replace(":", "/")}/`;
  }
  if (!RAKUTEN_AFF_ID) return itemUrl;
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFF_ID}/?pc=${encodeURIComponent(itemUrl)}&m=${encodeURIComponent(itemUrl)}`;
}

function renderProductCard(fields: Record<string, string>): string {
  const title = escapeHtml(fields.title ?? "");
  const description = escapeHtml(fields.description ?? "");
  const image = escapeHtml(fields.image ?? "");
  const amazonUrl = fields.amazon ? buildAmazonUrl(fields.amazon) : "";
  const rakutenUrl = fields.rakuten ? buildRakutenUrl(fields.rakuten) : "";

  const buttons: string[] = [];
  if (amazonUrl) {
    buttons.push(
      `<a class="aff-btn aff-btn-amazon" href="${amazonUrl}" target="_blank" rel="nofollow sponsored noopener">Amazonで見る</a>`
    );
  }
  if (rakutenUrl) {
    buttons.push(
      `<a class="aff-btn aff-btn-rakuten" href="${rakutenUrl}" target="_blank" rel="nofollow sponsored noopener">楽天で見る</a>`
    );
  }

  const imgHtml = image
    ? `<div class="aff-card-img"><img src="${image}" alt="${title}" loading="lazy" /></div>`
    : `<div class="aff-card-img aff-card-img-placeholder"><span>No Image</span></div>`;

  return `<div class="aff-card" data-aff="product">
  <span class="aff-pr-badge">広告</span>
  ${imgHtml}
  <div class="aff-card-body">
    <div class="aff-card-title">${title}</div>
    ${description ? `<div class="aff-card-desc">${description}</div>` : ""}
    <div class="aff-card-actions">${buttons.join("")}</div>
  </div>
</div>`;
}

function renderServiceCard(fields: Record<string, string>): string {
  const icon = escapeHtml(fields.icon ?? "🔗");
  const name = escapeHtml(fields.name ?? "");
  const sub = escapeHtml(fields.sub ?? "");
  const url = fields.url ?? "#";
  const safeUrl = /^https?:\/\//.test(url) ? url : "#";
  return `<a class="aff-service" data-aff="service" href="${escapeHtml(safeUrl)}" target="_blank" rel="nofollow sponsored noopener">
  <span class="aff-pr-badge">広告</span>
  <span class="aff-service-icon">${icon}</span>
  <span class="aff-service-text">
    <span class="aff-service-name">${name}</span>
    ${sub ? `<span class="aff-service-sub">${sub}</span>` : ""}
  </span>
</a>`;
}

function renderCtaCard(fields: Record<string, string>): string {
  const title = escapeHtml(fields.title ?? "");
  const description = escapeHtml(fields.description ?? "");
  const buttonText = escapeHtml(fields.button ?? "詳しく見る →");
  const url = fields.url ?? "#";
  const safeUrl = /^https?:\/\//.test(url) ? url : "#";
  const isPlaceholder = safeUrl === "#";
  return `<div class="aff-cta" data-aff="cta">
  <span class="aff-pr-badge aff-pr-badge-light">広告</span>
  <div class="aff-cta-title">${title}</div>
  ${description ? `<p class="aff-cta-desc">${description}</p>` : ""}
  <a class="aff-cta-btn" href="${escapeHtml(safeUrl)}" target="_blank" rel="nofollow sponsored noopener">${buttonText}</a>
  ${isPlaceholder ? `<div class="aff-cta-placeholder">※ 広告URL設定待ち</div>` : ""}
</div>`;
}

function preprocessAffiliate(markdown: string): string {
  return markdown.replace(
    /^:::(product|service|cta)\s*\n([\s\S]*?)\n:::\s*$/gm,
    (_match, kind: string, body: string) => {
      const fields = parseBlock(body);
      if (kind === "product") return renderProductCard(fields);
      if (kind === "service") return renderServiceCard(fields);
      if (kind === "cta") return renderCtaCard(fields);
      return "";
    }
  );
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const processed = preprocessAffiliate(markdown);
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(processed);
  return result.toString();
}
