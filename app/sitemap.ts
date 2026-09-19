export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug, getAllSeries, type Post } from "@/lib/posts";

const SITE_URL = "https://harukamuy.com";

// 更新日（lastmod）は「中身が本当に変わった日」にする。
// 以前はトップ・一覧・タグ・シリーズのページが new Date()（＝ビルドした日）になっていて、
// ビルドのたびに73ページが「今日更新」と申告されていた。Googleは当てにならない
// lastmod を無視するようになるので、記事の更新日の合図まで効かなくなる（2026-09-20）。
// 一覧系は「載っている記事のうち最新の日付」、固定ページは日付を出さない。
const postDate = (p: Post) => p.updated ?? p.date;
const newest = (posts: Post[]) =>
  posts.length ? new Date(posts.map(postDate).sort().at(-1)!) : undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = newest(posts);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                          lastModified: latest, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,                                     changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`,                lastModified: latest, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/sidefire`,            lastModified: newest(posts.filter((p) => p.category === "sidefire")), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gomamochi`,           lastModified: newest(posts.filter((p) => p.category === "gomazochi")), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`,                                   changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/tags`,                lastModified: latest, changeFrequency: "weekly",  priority: 0.5 },
    { url: `${SITE_URL}/tools/jack-and-jill`,                       changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/tools/lifeplan`,                            changeFrequency: "monthly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(postDate(post)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tag/${tagToSlug(tag)}`,
    lastModified: newest(posts.filter((p) => p.tags.includes(tag))),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const seriesPages: MetadataRoute.Sitemap = getAllSeries().map((s) => ({
    url: `${SITE_URL}/series/${s}`,
    lastModified: newest(posts.filter((p) => p.series === s)),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...tagPages, ...seriesPages];
}
