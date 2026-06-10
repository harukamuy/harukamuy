#!/usr/bin/env node
/**
 * インスタグラム用カルーセルスライド生成
 *
 * 使い方:
 *   node scripts/instagram-slides.mjs instagram/<slug>/slides.json
 *   node scripts/instagram-slides.mjs <slug>            ← 上の省略形
 *
 * instagram/<slug>/slides.json を読み、同じフォルダに
 * 01.png〜NN.png（1080x1350）と caption.txt を出力する。
 *
 * slides.json の形式:
 * {
 *   "slug": "monthly-report-2026-05",
 *   "caption": "インスタ投稿文（ハッシュタグ込み）",
 *   "slides": [
 *     { "type": "cover", "label": "サイドFIRE実録", "title": "...", "sub": "..." },
 *     { "type": "stat", "title": "...", "value": "5,806万円", "delta": "前月比 +246万円", "note": "..." },
 *     { "type": "breakdown", "title": "...", "rows": [{"label":"...","value":"...","amount": 3823, "note":"..."}], "total": "..." },
 *     { "type": "point", "no": "01", "title": "...", "body": "...", "bullets": ["..."] },
 *     { "type": "quote", "text": "...", "by": "..." },
 *     { "type": "cta", "title": "...", "body": "..." }
 *   ]
 * }
 * テキスト内の **太字** はテラコッタ色の強調になる。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const W = 1080;
const H = 1350;

// 画像はbase64で埋め込む（file://はsetContentしたページから読めないため）
const dataUri = (p, mime) =>
  `data:${mime};base64,${fs.readFileSync(p).toString("base64")}`;
const AZUKI_IMG = dataUri(path.join(ROOT, "public/images/mio-fullbody.webp"), "image/webp");
const GOMA_IMG = dataUri(path.join(ROOT, "public/images/gomamochi-sit.webp"), "image/webp");
const LOGO_IMG = dataUri(path.join(ROOT, "public/images/logo.png"), "image/png");

// ---- 入力の解決 ----
const arg = process.argv[2];
if (!arg) {
  console.error("使い方: node scripts/instagram-slides.mjs instagram/<slug>/slides.json");
  process.exit(1);
}
const jsonPath = arg.endsWith(".json")
  ? path.resolve(ROOT, arg)
  : path.join(ROOT, "instagram", arg, "slides.json");
const outDir = path.dirname(jsonPath);
const spec = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

// ---- HTML部品 ----
const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// **強調** をテラコッタの太字に、改行を<br>に変換
const rich = (s = "") =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="em">$1</strong>')
    .replace(/\n/g, "<br>");

const header = (i, total) => `
  <div class="head">
    <div class="brand">
      <img src="${LOGO_IMG}" class="brand-logo" />
      <span class="brand-name">harukamuy</span>
      <span class="brand-sub">サイドFIRE実録</span>
    </div>
    <div class="page">${i} / ${total}</div>
  </div>`;

const dots = (i, total) =>
  `<div class="dots">${Array.from({ length: total }, (_, k) =>
    `<span class="dot${k === i - 1 ? " on" : ""}"></span>`).join("")}</div>`;

function coverHtml(s) {
  return `
  <div class="slide cover">
    <div class="cover-top">
      <div class="chip">${esc(s.label || "サイドFIRE実録")}</div>
      <h1 class="cover-title">${rich(s.title)}</h1>
      ${s.sub ? `<p class="cover-sub">${rich(s.sub)}</p>` : ""}
    </div>
    <div class="cover-chars">
      <img src="${AZUKI_IMG}" class="char azuki" />
      <img src="${GOMA_IMG}" class="char goma" />
    </div>
    <div class="cover-foot">
      <span class="hand">side-FIRE diary</span>
      <span class="swipe">スワイプして見る →</span>
    </div>
  </div>`;
}

function statHtml(s) {
  return `
  <div class="slide center">
    ${s.title ? `<div class="stat-title">${rich(s.title)}</div>` : ""}
    <div class="stat-value">${rich(s.value)}</div>
    ${s.delta ? `<div class="stat-delta">${rich(s.delta)}</div>` : ""}
    ${s.note ? `<div class="stat-note">${rich(s.note)}</div>` : ""}
  </div>`;
}

function breakdownHtml(s) {
  const max = Math.max(...s.rows.map((r) => r.amount || 0), 1);
  const rows = s.rows
    .map(
      (r) => `
      <div class="bd-row">
        <div class="bd-head"><span class="bd-label">${esc(r.label)}</span><span class="bd-value">${esc(r.value)}</span></div>
        <div class="bd-bar-bg"><div class="bd-bar" style="width:${Math.max(((r.amount || 0) / max) * 100, 4)}%"></div></div>
        ${r.note ? `<div class="bd-note">${esc(r.note)}</div>` : ""}
      </div>`
    )
    .join("");
  return `
  <div class="slide">
    <h2 class="h2">${rich(s.title)}</h2>
    <div class="card">${rows}
      ${s.total ? `<div class="bd-total">${rich(s.total)}</div>` : ""}
    </div>
  </div>`;
}

function pointHtml(s) {
  const bullets = s.bullets?.length
    ? `<ul class="bullets">${s.bullets.map((b) => `<li>${rich(b)}</li>`).join("")}</ul>`
    : "";
  return `
  <div class="slide">
    ${s.no ? `<div class="no">${esc(String(s.no))}</div>` : ""}
    <h2 class="h2">${rich(s.title)}</h2>
    ${s.body ? `<p class="body">${rich(s.body)}</p>` : ""}
    ${bullets}
  </div>`;
}

function quoteHtml(s) {
  return `
  <div class="slide center">
    <div class="quote-mark">“</div>
    <div class="quote">${rich(s.text)}</div>
    ${s.by ? `<div class="quote-by">${esc(s.by)}</div>` : ""}
  </div>`;
}

function ctaHtml(s) {
  return `
  <div class="slide center cta">
    <div class="cta-chars">
      <img src="${AZUKI_IMG}" class="char azuki" />
      <img src="${GOMA_IMG}" class="char goma" />
    </div>
    <h2 class="cta-title">${rich(s.title || "続きはブログで")}</h2>
    ${s.body ? `<p class="cta-body">${rich(s.body)}</p>` : ""}
    <div class="cta-url">harukamuy.com</div>
    <div class="cta-hint">プロフィールのリンクから読めます</div>
    <div class="cta-save">🔖 あとで見返すには「保存」が便利です</div>
  </div>`;
}

const builders = {
  cover: coverHtml,
  stat: statHtml,
  breakdown: breakdownHtml,
  point: pointHtml,
  quote: quoteHtml,
  cta: ctaHtml,
};

const CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; }
  body {
    font-family: 'Zen Maru Gothic', 'Hiragino Maru Gothic ProN', 'Hiragino Sans', sans-serif;
    background: #f8f4ee;
    color: #2e2318;
    position: relative;
    overflow: hidden;
  }
  /* 紙っぽいノイズ（ブログと同じ） */
  body::before {
    content: ''; position: fixed; inset: 0; z-index: 50; pointer-events: none; opacity: .5;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  }
  .frame { position: absolute; inset: 28px; border: 2.5px solid #e2d4c0; border-radius: 36px; pointer-events: none; }
  .head {
    position: absolute; top: 64px; left: 84px; right: 84px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .brand { display: flex; align-items: center; gap: 14px; }
  .brand-logo { width: 44px; height: 44px; object-fit: contain; }
  .brand-name { font-weight: 900; font-size: 30px; letter-spacing: .04em; }
  .brand-sub { font-size: 24px; color: #9c8a76; font-weight: 700; margin-left: 6px; }
  .page { font-size: 26px; color: #9c8a76; font-weight: 700; }
  .dots { position: absolute; bottom: 64px; left: 0; right: 0; display: flex; justify-content: center; gap: 12px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #d5c3a8; }
  .dot.on { background: #c4674a; }

  .slide { position: absolute; inset: 0; padding: 170px 96px 140px; display: flex; flex-direction: column; }
  .slide.center { justify-content: center; align-items: center; text-align: center; padding-top: 140px; }

  .em { color: #c4674a; font-weight: 900; }
  .h2 { font-size: 56px; font-weight: 900; line-height: 1.45; margin-bottom: 36px; }
  .body { font-size: 36px; line-height: 2.0; color: #5c4a38; font-weight: 500; }
  .no {
    font-size: 40px; font-weight: 900; color: #c4674a; margin-bottom: 18px;
    display: flex; align-items: center; gap: 20px;
  }
  .no::after { content: ''; flex: 0 0 120px; height: 4px; background: #ebbfb0; border-radius: 2px; }
  .bullets { list-style: none; margin-top: 28px; display: flex; flex-direction: column; gap: 22px; }
  .bullets li {
    background: #fdfaf6; border: 2px solid #e2d4c0; border-radius: 20px;
    padding: 26px 32px; font-size: 33px; line-height: 1.75; font-weight: 500; color: #2e2318;
  }

  /* cover */
  .cover { padding: 150px 96px 120px; }
  .chip {
    display: inline-block; align-self: flex-start; background: #5e7252; color: #fdfaf6;
    font-size: 27px; font-weight: 700; padding: 12px 30px; border-radius: 999px; margin-bottom: 44px;
  }
  .cover-title { font-size: 76px; font-weight: 900; line-height: 1.4; }
  .cover-sub { font-size: 36px; color: #5c4a38; margin-top: 36px; line-height: 1.8; font-weight: 700; }
  .cover-chars { position: absolute; bottom: 130px; right: 90px; display: flex; align-items: flex-end; gap: 20px; }
  .char {
    border-radius: 50%; object-fit: cover; object-position: top center;
    background: #fdfaf6; border: 4px solid #e2d4c0;
  }
  .cover .char.azuki { width: 290px; height: 290px; }
  .cover .char.goma { width: 195px; height: 195px; }
  .cover-foot {
    position: absolute; bottom: 120px; left: 96px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .hand { font-family: 'Caveat', cursive; font-size: 44px; color: #c4674a; }
  .swipe { font-size: 30px; font-weight: 700; color: #2e2318; background: #ebbfb0; padding: 14px 30px; border-radius: 999px; }

  /* stat */
  .stat-title { font-size: 46px; font-weight: 900; margin-bottom: 50px; }
  .stat-value { font-size: 130px; font-weight: 900; color: #c4674a; line-height: 1.2; letter-spacing: .01em; }
  .stat-delta {
    margin-top: 44px; font-size: 40px; font-weight: 900; color: #5e7252;
    background: #eef2ea; border: 2px solid #cddac4; padding: 18px 44px; border-radius: 999px;
  }
  .stat-note { margin-top: 44px; font-size: 30px; color: #9c8a76; line-height: 1.8; font-weight: 500; }

  /* breakdown */
  .card {
    background: #fdfaf6; border: 2px solid #e2d4c0; border-radius: 28px; padding: 44px 48px;
    display: flex; flex-direction: column; gap: 30px;
  }
  .bd-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
  .bd-label { font-size: 32px; font-weight: 700; }
  .bd-value { font-size: 36px; font-weight: 900; color: #2e2318; }
  .bd-bar-bg { height: 26px; background: #ede6d8; border-radius: 13px; overflow: hidden; }
  .bd-bar { height: 100%; background: linear-gradient(90deg, #e09a82, #c4674a); border-radius: 13px; }
  .bd-note { font-size: 24px; color: #9c8a76; margin-top: 10px; font-weight: 500; }
  .bd-total {
    margin-top: 6px; padding-top: 28px; border-top: 2px dashed #d5c3a8;
    font-size: 38px; font-weight: 900; text-align: right;
  }

  /* quote */
  .quote-mark { font-size: 160px; color: #ebbfb0; font-weight: 900; line-height: .6; margin-bottom: 10px; }
  .quote { font-size: 56px; font-weight: 900; line-height: 1.7; }
  .quote-by { margin-top: 40px; font-size: 30px; color: #9c8a76; font-weight: 700; }

  /* cta */
  .cta-chars { display: flex; align-items: flex-end; gap: 22px; margin-bottom: 44px; }
  .cta .char.azuki { width: 260px; height: 260px; }
  .cta .char.goma { width: 175px; height: 175px; }
  .cta-title { font-size: 62px; font-weight: 900; }
  .cta-body { font-size: 34px; color: #5c4a38; margin-top: 28px; line-height: 1.9; font-weight: 500; }
  .cta-url {
    margin-top: 44px; font-size: 44px; font-weight: 900; color: #fdfaf6; background: #c4674a;
    padding: 20px 56px; border-radius: 999px;
  }
  .cta-hint { margin-top: 20px; font-size: 28px; color: #9c8a76; font-weight: 700; }
  .cta-save {
    margin-top: 48px; font-size: 30px; font-weight: 700; color: #5e7252;
    background: #eef2ea; border: 2px solid #cddac4; padding: 16px 40px; border-radius: 999px;
  }
`;

function slideDocument(slide, i, total) {
  const build = builders[slide.type];
  if (!build) throw new Error(`不明なスライドtype: ${slide.type}`);
  const isCover = slide.type === "cover";
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&family=Caveat:wght@600&display=swap" rel="stylesheet">
  <style>${CSS}</style></head>
  <body>
    <div class="frame"></div>
    ${isCover ? "" : header(i, total)}
    ${build(slide)}
    ${isCover ? "" : dots(i, total)}
  </body></html>`;
}

// ---- レンダリング ----
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const total = spec.slides.length;
  for (let i = 0; i < total; i++) {
    const html = slideDocument(spec.slides[i], i + 1, total);
    await page.setContent(html, { waitUntil: "load", timeout: 30000 });
    // フォント読み込みを待つ（最大4秒で諦めてフォールバックフォントで描画）
    await page.evaluate(() =>
      Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 4000)),
      ])
    );
    await new Promise((r) => setTimeout(r, 200));
    const file = path.join(outDir, `${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: file });
    console.log(`✓ ${path.relative(ROOT, file)}  (${spec.slides[i].type})`);
  }

  if (spec.caption) {
    fs.writeFileSync(path.join(outDir, "caption.txt"), spec.caption.trim() + "\n");
    console.log(`✓ ${path.relative(ROOT, path.join(outDir, "caption.txt"))}`);
  }
  console.log(`\n完了: ${total}枚のスライドを ${path.relative(ROOT, outDir)}/ に出力しました`);
} finally {
  await browser.close();
}
