/**
 * サイト全体の定期点検（週1回、スケジュールタスク「site-health-weekly」から実行）
 *
 * 使い方:
 *   npm run build              # 先に組み立てる（表示の点検は out/ を見る）
 *   node scripts/site-health.mjs
 *
 * 公開前チェック（scripts/check-article.sh / article-review）は1記事ずつ見る。
 * こちらは「公開後に時間がたってから起きる問題」を全記事まとめて見る。
 *
 *   1. 表示の崩れ … カード内の生markdownリンク、残った **、<strong> の入れ子、
 *                   展開されなかった ::: ブロック、存在しない記事へのリンク
 *   2. 出典リンク切れ … 404 / 410 / ドメイン消滅だけを数える。
 *                   Bloomberg・SEC などは機械のアクセスを 403 で断るだけで、
 *                   人が開けば読めるので数えない（2026-09-20 の点検で確認）
 *   3. Googleへの登録 … 直近21日に公開した記事と、登録されていない記事の状態
 *   4. 検索とDiscoverの表示回数（直近28日）
 *   5. メタ情報 … タイトル・説明文の重複、SNS用画像の欠け
 *
 * 何も直さない。見つけたものを一覧にするだけ（公開＝pushは本人の指示があるときだけ）。
 */

import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = new URL("..", import.meta.url).pathname;
const postsDir = join(root, "content/posts");
const outBlog = join(root, "out/blog");
const SITE = "https://harukamuy.com/";

const slugs = readdirSync(postsDir).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
const fm = (slug) => {
  const src = readFileSync(join(postsDir, `${slug}.md`), "utf8");
  const head = src.split("---")[1] ?? "";
  const get = (k) => head.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?`, "m"))?.[1] ?? "";
  return { src, title: get("title"), date: get("date") };
};
const report = [];
const section = (t) => report.push(`\n## ${t}`);
const line = (t) => report.push(t);

// ---------- 1. 表示の崩れ ----------
section("1. 表示の崩れ（全記事）");
if (!existsSync(outBlog)) {
  line("⚠ out/ がありません。先に npm run build を実行してください。");
} else {
  const slugSet = new Set(slugs);
  const found = { raw: [], bold: [], nested: [], colon: [], deadInternal: [] };
  for (const s of slugs) {
    const f = join(outBlog, `${s}.html`);
    if (!existsSync(f)) continue;
    let h = readFileSync(f, "utf8");
    const m = h.match(/<article[\s\S]*?<\/article>/);
    h = (m ? m[0] : h).replace(/<script[\s\S]*?<\/script>/g, "");
    const text = h.replace(/<[^>]+>/g, "\n");
    if (/\]\(\/(blog|tools)\//.test(h)) found.raw.push(s);
    if (/(^|[^`\w])\*\*(?=\S)/m.test(text)) found.bold.push(s);
    if (/<strong>(?:(?!<\/strong>)[\s\S])*<strong>/.test(h)) found.nested.push(s);
    if (/^:::/m.test(text)) found.colon.push(s);
    for (const [, t] of h.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)) {
      if (!slugSet.has(t)) found.deadInternal.push(`${s} → /blog/${t}`);
    }
  }
  const lab = {
    raw: "カード内に生のmarkdownリンク（<a href> に直す）",
    bold: "** が残っている（太字の崩れ）",
    nested: "<strong> が入れ子（太字の崩れ）",
    colon: ":::ブロックが展開されていない",
    deadInternal: "存在しない記事へのリンク",
  };
  let any = false;
  for (const [k, v] of Object.entries(found)) {
    if (!v.length) continue;
    any = true;
    line(`- ${lab[k]}: ${v.length}件`);
    for (const x of [...new Set(v)].slice(0, 15)) line(`  - ${x}`);
  }
  if (!any) line("- 問題なし");
}

// ---------- 2. 出典リンク切れ ----------
section("2. 出典リンク切れ（404・410・ドメイン消滅のみ）");
const SKIP = /harukamuy\.com|accesstrade|a8\.net|amazon\.co\.jp|rakuten|r10s\.jp/;
const links = new Map();
for (const s of slugs) {
  for (const [u] of fm(s).src.matchAll(/https?:\/\/[^\s)\]"'<>]+/g)) {
    const url = u.replace(/[.,;:）」』]+$/, "").replace(/&amp;/g, "&");
    if (SKIP.test(url)) continue;
    if (!links.has(url)) links.set(url, new Set());
    links.get(url).add(s);
  }
}
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";
async function probe(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const r = await fetch(url, { method, redirect: "follow", headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(20000) });
      if (method === "HEAD" && r.status >= 400) continue; // HEADを嫌うサイトがあるのでGETで再確認
      return r.status;
    } catch (e) {
      if (method === "HEAD") continue;
      const code = e?.cause?.code ?? "";
      return /ENOTFOUND|EAI_AGAIN/.test(code) ? "DNS" : "ERR";
    }
  }
  return "ERR";
}
const entries = [...links.entries()];
const dead = [];
let idx = 0;
await Promise.all(
  Array.from({ length: 10 }, async () => {
    while (idx < entries.length) {
      const [url, where] = entries[idx++];
      const st = await probe(url);
      if (st === 404 || st === 410 || st === "DNS") dead.push({ url, st, where: [...where] });
    }
  })
);
line(`- 調べた出典: ${entries.length}件`);
if (!dead.length) line("- 切れているリンクなし");
for (const d of dead.sort((a, b) => a.where[0].localeCompare(b.where[0]))) {
  line(`- [${d.st}] ${d.where.join(", ")}\n  ${d.url}`);
}

// ---------- 3〜5. Google ----------
let auth = null;
try {
  const { google } = require(join(root, "node_modules/googleapis"));
  const credFile = readdirSync(root).find((f) => f.startsWith("client_secret_") && f.endsWith(".json"));
  const c = JSON.parse(readFileSync(join(root, credFile), "utf8")).installed;
  auth = new google.auth.OAuth2(c.client_id, c.client_secret, c.redirect_uris[0]);
  auth.setCredentials(JSON.parse(readFileSync(join(root, "gsc-token.json"), "utf8")));
  const sc = google.searchconsole({ version: "v1", auth });

  section("3. Googleへの登録（直近21日の記事＋前回までに未登録だった記事）");
  const statePath = join(root, "data/site-health-unindexed.json");
  const prevUnindexed = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : [];
  const since = new Date(Date.now() - 21 * 864e5).toISOString().slice(0, 10);
  const targets = [...new Set([...slugs.filter((s) => fm(s).date >= since), ...prevUnindexed.filter((s) => slugs.includes(s))])];
  const notIndexed = [];
  for (const s of targets) {
    try {
      const r = await sc.urlInspection.index.inspect({ requestBody: { inspectionUrl: `${SITE}blog/${s}`, siteUrl: SITE } });
      const x = r.data.inspectionResult.indexStatusResult;
      if (x.coverageState !== "Submitted and indexed") {
        const age = Math.round((Date.now() - new Date(fm(s).date).getTime()) / 864e5);
        notIndexed.push({ s, state: x.coverageState, age, crawl: (x.lastCrawlTime ?? "未クロール").slice(0, 10) });
      }
    } catch (e) {
      notIndexed.push({ s, state: `検査エラー: ${String(e.message).slice(0, 40)}`, age: 0, crawl: "-" });
    }
  }
  writeFileSync(statePath, JSON.stringify(notIndexed.map((n) => n.s)) + "\n");
  line(`- 調べた記事: ${targets.length}本 / 未登録: ${notIndexed.length}本`);
  for (const n of notIndexed.sort((a, b) => b.age - a.age)) {
    const warn = n.age >= 7 ? " ← 公開から1週間以上。Search Consoleで登録リクエストを" : "";
    line(`- ${n.s}（公開${n.age}日・${n.state}・最終クロール ${n.crawl}）${warn}`);
  }

  section("4. 検索とDiscoverの表示（直近28日）");
  const d = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
  for (const type of ["web", "discover"]) {
    const r = await sc.searchanalytics.query({ siteUrl: SITE, requestBody: { startDate: d(30), endDate: d(2), type, rowLimit: 1 } });
    const x = (r.data.rows ?? [])[0];
    line(`- ${type === "web" ? "検索" : "Discover"}: ${x ? `表示 ${x.impressions} / クリック ${x.clicks}` : "表示なし"}`);
  }
} catch (e) {
  section("3. Googleへの登録");
  line(`⚠ Search Console に接続できませんでした（${String(e.message).slice(0, 60)}）。gsc-token.json の期限切れなら再認証が必要です。`);
}

// ---------- 4. メタ情報 ----------
section("5. タイトル・説明文・SNS用画像");
if (existsSync(outBlog)) {
  const titles = new Map(), descs = new Map(), noOg = [];
  for (const s of slugs) {
    const f = join(outBlog, `${s}.html`);
    if (!existsSync(f)) continue;
    const h = readFileSync(f, "utf8");
    const t = h.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const ds = h.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const og = h.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
    if (t) titles.set(t, [...(titles.get(t) ?? []), s]);
    if (ds) descs.set(ds, [...(descs.get(ds) ?? []), s]);
    if (!og || !existsSync(join(root, "out", og.replace(SITE.slice(0, -1), "")))) noOg.push(s);
  }
  const dupT = [...titles.values()].filter((v) => v.length > 1);
  const dupD = [...descs.values()].filter((v) => v.length > 1);
  line(`- タイトル重複: ${dupT.length}組${dupT.map((v) => `\n  - ${v.join(", ")}`).join("")}`);
  line(`- 説明文重複: ${dupD.length}組${dupD.map((v) => `\n  - ${v.join(", ")}`).join("")}`);
  line(`- SNS用画像が無い記事: ${noOg.length}本${noOg.length ? ` (${noOg.slice(0, 10).join(", ")})` : ""}`);
}

console.log(`# サイト点検 ${new Date().toLocaleDateString("ja-JP")}（記事 ${slugs.length}本）`);
console.log(report.join("\n"));
