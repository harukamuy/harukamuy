import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Category = "gomazochi" | "sidefire" | "investment" | "freelance" | "news" | "all";

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  category: Category;
  tags: string[];
  series?: string;       // 連載ID（例: "tokachi-plan"）
  seriesOrder?: number;  // 連載内の順序（1, 2, 3...）
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

// 一覧表示用の「本文抜き」記事データ。
// "use client" コンポーネントに Post(本文含む) を渡すと全記事本文が
// ページのHTMLに埋め込まれてしまう（トップ/blogが1.6MB超になっていた原因）ため、
// 一覧系は必ずこちらを使うこと。
export type PostMeta = Omit<Post, "content">;

export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

// 人気記事ランキング（GA4のPVから scripts/popular-posts.js が生成した
// data/popular-posts.json を読む。ファイルが無い/壊れている場合は空配列）。
export function getPopularPosts(limit = 5): Post[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "data", "popular-posts.json"),
      "utf8"
    );
    const data = JSON.parse(raw) as { posts?: { slug: string }[] };
    return (data.posts ?? [])
      .map((p) => getPostBySlug(p.slug))
      .filter((p): p is Post => p !== null)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function getPostsByCategory(category: Category): Post[] {
  if (category === "all") return getAllPosts();
  return getAllPosts().filter((p) => p.category === category);
}

// タグ名 → URL用スラッグ（ASCII）。日本語URLはCloudflare Pagesで配信できないため、
// URLは必ずASCIIにする。新しいタグを追加したらこの表にも1行足すこと。
export const TAG_SLUGS: Record<string, string> = {
  "サイドFIRE": "sidefire",
  "新NISA": "new-nisa",
  "NISA": "nisa",
  "高配当株": "high-dividend",
  "配当投資": "dividend",
  "インデックス投資": "index-investing",
  "ETF": "etf",
  "債券": "bonds",
  "iDeCo": "ideco",
  "フリーランス": "freelance",
  "独立・キャリア": "career",
  "ごまもち": "gomamochi",
  "家計・資産管理": "household",
  "女性の資産形成": "women-finance",
  "ふるさと納税": "furusato-nozei",
  "証券・銀行": "securities",
  "クレジットカード": "credit-card",
  "会計ツール": "accounting",
  "市場の話": "market",
  "十勝計画": "tokachi-plan",
  "ポートフォリオ": "portfolio",
  "資産公開": "asset-disclosure",
  "月次資産公開": "monthly-report",
  "副業": "side-job",
  "固定費・節約": "saving",
  "映像×AI": "video-ai",
  "AI": "ai",
  "投資": "investing",
  "確定申告": "tax-return",
  "税金・社会保険": "tax-insurance",
  "資産推移": "asset-growth",
};

// 対応表に無いタグ用のフォールバック（ASCIIならそのまま、日本語なら短いハッシュ）
function fallbackSlug(tag: string): string {
  if (/^[\x20-\x7e]+$/.test(tag)) {
    return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) | 0;
  return "t-" + Math.abs(h).toString(36);
}

export function tagToSlug(tag: string): string {
  return TAG_SLUGS[tag] ?? fallbackSlug(tag);
}

export function slugToTag(slug: string): string | null {
  for (const tag of getAllTags()) {
    if (tagToSlug(tag) === slug) return tag;
  }
  return null;
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) set.add(t);
  }
  return Array.from(set).sort();
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

// 連載ID → 表示名。新しい連載を始めたらここに1行追加。
export const SERIES_NAMES: Record<string, string> = {
  "tokachi-plan": "十勝計画",
};

export function getAllSeries(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) {
    if (p.series) set.add(p.series);
  }
  return Array.from(set).sort();
}

// 連載に属する記事を seriesOrder 順（昇順）で返す
export function getSeriesPosts(series: string): Post[] {
  return getAllPosts()
    .filter((p) => p.series === series)
    .sort((a, b) => (a.seriesOrder ?? 999) - (b.seriesOrder ?? 999));
}

// フロントマターの coverImage を必ず最適化済みWebPに正規化する。
// （元画像が .png / .jpg でも、ビルド時に同名の .webp が生成されるため）
function normalizeCoverImage(cover: unknown): string | undefined {
  if (typeof cover !== "string" || !cover) return undefined;
  return cover.replace(/\.(png|jpe?g)$/i, ".webp");
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
      updated: data.updated,
      category: data.category ?? "all",
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      series: typeof data.series === "string" ? data.series : undefined,
      seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
      excerpt: data.excerpt ?? "",
      coverImage: normalizeCoverImage(data.coverImage),
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
      let html = "";
      if (kind === "product") html = renderProductCard(fields);
      else if (kind === "service") html = renderServiceCard(fields);
      else if (kind === "cta") html = renderCtaCard(fields);
      // markdown のブロック判定が崩れないよう前後に空行を保証
      return `\n\n${html}\n\n`;
    }
  );
}

export type Heading = { level: 2 | 3; text: string; id: string };

// マークダウン本文から ## / ### 見出しを抜き出して目次データを返す
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;
  let index = 0;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/[*_`]/g, "").trim();
      headings.push({ level, text, id: `h-${index++}` });
    }
  }
  return headings;
}

// 日本語記事の読了時間を見積もる（500文字/分）
export function estimateReadingMinutes(markdown: string): number {
  // コード・記号・空白を雑に除いた文字数で概算
  const text = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*_`>\-\[\]\(\)!]/g, "");
  const chars = text.replace(/\s/g, "").length;
  return Math.max(1, Math.round(chars / 500));
}

// remark-html 出力後の <h2>/<h3> に id を付与（目次のアンカー用）
function injectHeadingIds(html: string, headings: Heading[]): string {
  let i = 0;
  return html.replace(/<(h2|h3)>/g, (match, tag) => {
    if (i < headings.length) {
      const id = headings[i++].id;
      return `<${tag} id="${id}">`;
    }
    return match;
  });
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const processed = preprocessAffiliate(markdown);
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(processed);
  const headings = extractHeadings(markdown);
  return injectHeadingIds(result.toString(), headings);
}
