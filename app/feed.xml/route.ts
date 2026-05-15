import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const SITE_URL = "https://harukamuy.com";
const SITE_TITLE = "harukamuy | ごまもちとサイドFIREの記録";
const SITE_DESCRIPTION =
  "ボストンテリアのごまもちと暮らすフリーランス映像プロデューサー・あずきが、サイドFIRE達成までの資産形成・投資・日常をゆるく発信するブログ。";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(date: string): string {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00+09:00` : date;
  return new Date(iso).toUTCString();
}

export async function GET() {
  const posts = getAllPosts().slice(0, 30);
  const latest = posts[0]?.updated ?? posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${toRfc822(p.date)}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
      <category>${escapeXml(p.category)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja-JP</language>
    <lastBuildDate>${toRfc822(latest)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
