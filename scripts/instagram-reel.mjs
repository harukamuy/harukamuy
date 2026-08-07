#!/usr/bin/env node
/**
 * インスタ用スライドショー動画（リール）生成
 *
 * 使い方:
 *   node scripts/instagram-reel.mjs <slug>              全スライド
 *   node scripts/instagram-reel.mjs <slug> 1,3,6        指定スライドだけ（サンプル用）
 *
 * カルーセルと同じ slides.json / 同じデザインを使い、
 * 文字がふわっと下から現れるアニメーションを付けて MP4 にする。
 *
 * 仕組み:
 *   1. 各スライドのHTMLに「文字が順番に現れる」CSSアニメを注入
 *   2. アニメの時間軸を少しずつ進めながらスクショ（= 動画のコマ）
 *   3. 出現後は静止画のまま「読む時間」を確保
 *   4. ffmpeg でつないでクロスフェード
 *
 * 出力: instagram/<slug>/reel.mp4
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer-core";

// リールは9:16。スライド自体をこのサイズで描くので、あとで余白を足さない
process.env.SLIDE_W = process.env.SLIDE_W || "1080";
process.env.SLIDE_H = process.env.SLIDE_H || "1920";
const { slideDocument, W, H, CHROME, ROOT } = await import("./instagram-slides.mjs");

// ---- 調整しやすいパラメータ（環境変数で上書き可） ----
const FPS = 25;
const ANIM_SEC = Number(process.env.REEL_ANIM || 1.6);  // 文字が出そろうまで
const HOLD_SEC = Number(process.env.REEL_HOLD || 3.0);  // 出そろってから次へ（読む時間）
const XFADE_SEC = 0.5;                                  // スライド間のクロスフェード
const REEL_W = 1080;                                    // リールは縦長9:16
const REEL_H = 1920;

const arg = process.argv[2];
if (!arg) {
  console.error("使い方: node scripts/instagram-reel.mjs <slug> [1,3,6]");
  process.exit(1);
}
const pick = process.argv[3]
  ? process.argv[3].split(",").map((n) => parseInt(n, 10) - 1)
  : null;

const outDir = path.join(ROOT, "instagram", arg);
// 動画用に文を短くした slides.reel.json があればそちらを優先する
const reelJson = path.join(outDir, "slides.reel.json");
const srcJson = fs.existsSync(reelJson) ? reelJson : path.join(outDir, "slides.json");
console.log(`元データ: ${path.relative(ROOT, srcJson)}`);
const spec = JSON.parse(fs.readFileSync(srcJson, "utf8"));
const total = spec.slides.length;
const indexes = pick ?? spec.slides.map((_, i) => i);

const frameDir = path.join(outDir, ".reel-frames");
fs.rmSync(frameDir, { recursive: true, force: true });
fs.mkdirSync(frameDir, { recursive: true });

/**
 * 文字を順番に出すCSS。
 * body直下の主要な要素を上から拾って、少しずつ遅らせて表示する。
 */
const ANIM_CSS = `
  <style id="reel-anim">
  /* 9:16は縦に長いので、内容を上下の中央に寄せる（上寄せだと下が大きく空く） */
  .slide { justify-content: center !important; }

  /* 動画は「めくる」ものではないので、カルーセル用の表示はすべて隠す */
  .swipe { display: none !important; }  /* スワイプして見る → */
  .page  { display: none !important; }  /* 右上のページ番号 5/8 */
  .dots  { display: none !important; }  /* 下部のドット */

  /* 縦に余裕ができたぶん、文字を約1.2倍に。スマホで一瞬見るリールは大きいほうが読める。
     横幅は1080のままなので、見出しは控えめ（1.1倍）にして折り返し事故を防ぐ */
  .h2        { font-size: 66px !important; }
  .body      { font-size: 44px !important; }
  .bullets li{ font-size: 40px !important; padding: 30px 36px !important; }
  .bullets   { gap: 26px !important; }
  .cover-title { font-size: 84px !important; }
  .cover-sub   { font-size: 42px !important; }
  .chip      { font-size: 30px !important; }
  .no        { font-size: 46px !important; }
  .quote-mark{ font-size: 180px !important; }
  .quote     { font-size: 66px !important; }
  .quote-by  { font-size: 34px !important; }
  .bd-label  { font-size: 38px !important; }
  .bd-value  { font-size: 42px !important; }
  .bd-note   { font-size: 28px !important; }
  .stat-title{ font-size: 54px !important; }
  .stat-value{ font-size: 150px !important; }
  .stat-note { font-size: 35px !important; }
  .cta-title { font-size: 72px !important; }
  .cta-body  { font-size: 40px !important; }
  .cta-hint  { font-size: 32px !important; }
  @keyframes reelIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .reel-el {
    opacity: 0;
    animation: reelIn 0.72s cubic-bezier(.22,.9,.3,1) forwards;
    animation-play-state: paused;
  }
  </style>
`;

/** 見出し・本文・箇条書きなどにアニメを割り当てる */
const ASSIGN_ANIM = () => {
  const sels = [
    ".chip", ".cover-title", ".cover-sub", ".hand", ".swipe",
    ".no", ".h2", ".body", ".bullets li",
    ".stat-title", ".stat-value", ".stat-delta", ".stat-note",
    ".bd-row", ".bd-total",
    ".quote-mark", ".quote", ".quote-by",
    ".cta-title", ".cta-body", ".cta-url", ".cta-hint", ".cta-save",
  ];
  const seen = new Set();
  const els = [];
  for (const sel of sels) {
    document.querySelectorAll(sel).forEach((el) => {
      if (!seen.has(el)) { seen.add(el); els.push(el); }
    });
  }
  // 画面上での位置（上から順）に並べ替えてから遅延を付ける
  els.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  els.forEach((el, i) => {
    el.classList.add("reel-el");
    el.style.animationDelay = `${(i * 0.13).toFixed(3)}s`;
  });
  return els.length;
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const clips = [];
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  for (const idx of indexes) {
    const slide = spec.slides[idx];
    const html = slideDocument(slide, idx + 1, total).replace(
      "</head>",
      `${ANIM_CSS}</head>`
    );
    await page.setContent(html, { waitUntil: "load", timeout: 30000 });
    await page.evaluate(() =>
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 4000))])
    );
    const n = await page.evaluate(ASSIGN_ANIM);

    const dir = path.join(frameDir, String(idx + 1).padStart(2, "0"));
    fs.mkdirSync(dir, { recursive: true });

    // アニメの時間軸を手で進めながら1コマずつ撮る（＝再生に依存しない確実な方法）
    const animFrames = Math.round(ANIM_SEC * FPS);
    for (let f = 0; f < animFrames; f++) {
      const t = (f / FPS) * 1000;
      await page.evaluate((ms) => {
        document.getAnimations().forEach((a) => {
          a.pause();
          a.currentTime = ms;
        });
      }, t);
      await page.screenshot({
        path: path.join(dir, `${String(f).padStart(4, "0")}.png`),
      });
    }
    console.log(`✓ スライド${idx + 1}（要素${n}個・${animFrames}コマ）`);

    // 静止部分はコマを撮らず、ffmpeg側で最後のコマを引き伸ばす
    const last = path.join(dir, `${String(animFrames - 1).padStart(4, "0")}.png`);
    const clip = path.join(frameDir, `clip${String(idx + 1).padStart(2, "0")}.mp4`);
    execFileSync("ffmpeg", [
      "-y", "-hide_banner", "-loglevel", "error",
      "-framerate", String(FPS), "-i", path.join(dir, "%04d.png"),
      "-loop", "1", "-t", String(HOLD_SEC), "-i", last,
      "-filter_complex", "[0:v][1:v]concat=n=2:v=1:a=0,format=yuv420p[v]",
      "-map", "[v]", "-r", String(FPS),
      "-c:v", "libx264", "-crf", "20", "-preset", "veryfast",
      clip,
    ]);
    clips.push(clip);
  }
} finally {
  await browser.close();
}

// ---- クロスフェードでつなぐ ----
const CLIP_SEC = ANIM_SEC + HOLD_SEC;
const inputs = clips.flatMap((c) => ["-i", c]);
let filter = "";
let prev = "[0:v]";
for (let i = 1; i < clips.length; i++) {
  const offset = (CLIP_SEC - XFADE_SEC) * i;
  const out = i === clips.length - 1 ? "[v]" : `[x${i}]`;
  filter += `${prev}[${i}:v]xfade=transition=fade:duration=${XFADE_SEC}:offset=${offset.toFixed(2)}${out};`;
  prev = `[x${i}]`;
}
// スライドを最初から9:16で描いているので、余白を足す処理は不要
const outFile = path.join(outDir, "reel.mp4");
if (clips.length === 1) {
  fs.copyFileSync(clips[0], outFile);
} else {
  execFileSync("ffmpeg", [
    "-y", "-hide_banner", "-loglevel", "error",
    ...inputs,
    "-filter_complex", filter.replace(/;$/, ""),
    "-map", "[v]", "-r", String(FPS),
    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
    outFile,
  ]);
}

fs.rmSync(frameDir, { recursive: true, force: true });
const dur = clips.length * CLIP_SEC - (clips.length - 1) * XFADE_SEC;
console.log(`\n完了: ${path.relative(ROOT, outFile)}（約${dur.toFixed(1)}秒・音声なし）`);
