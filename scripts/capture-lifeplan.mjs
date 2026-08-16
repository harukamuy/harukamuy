// ライフプラン・シミュレーターの画面キャプチャを撮る。
//   実行: node scripts/capture-lifeplan.mjs
//   前提: npm run dev が動いていること（http://localhost:3000）
//
// 記事「21の数字で、95歳までの線を一緒に引いてみる」
// (content/posts/lifeplan-make-your-own.md) に貼る画像を作る。
// ツールの見た目を変えたら撮り直す。
//
// 【撮り分けの決めごと】
//   入力欄  … 「子ども2人の世帯」。読む人にいちばん近い形なので
//   結果と表 … 「あずき（記事の設定）」。lifeplan-one-line-95 で検算した
//              数字なので、画面に出る金額の裏が取れている
//
// 出力: public/images/lifeplan-tool-*.webp（PNGは残さない）

import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { unlinkSync } from "node:fs";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PAGE_URL = "http://localhost:3000/tools/lifeplan";
const OUT = new URL("../public/images/", import.meta.url).pathname;

// PC画面で撮る。記事の本文幅はPCで592pxなので、700pxで撮ると
// ほぼ等倍で表示できる（文字が潰れない）。スマホでは記事側の
// 横スクロール枠に入れて、原寸のまま横に送って読んでもらう。
// 明細の表は列が多いので、そこだけさらに広く撮る。
const WIDTH_PC = 700;
const WIDTH_WIDE = 860;

const SHOTS = [
  { name: "lifeplan-tool-01-preset", preset: "子ども2人", pick: "preset" },
  { name: "lifeplan-tool-02-now", preset: "子ども2人", pick: "👤" },
  // 本文で説明している二段構え（65歳まで働いて、その後75歳までゆるく）を画面に出す
  { name: "lifeplan-tool-03-work", preset: "子ども2人", pick: "💼",
    tweak: [["退職後のゆるい収入（月）", "8"], ["ゆるい収入は何歳まで", "75"]] },
  { name: "lifeplan-tool-04-pension", preset: "子ども2人", pick: "🏛" },
  { name: "lifeplan-tool-05-result", preset: "あずき", pick: "result" },
  { name: "lifeplan-tool-06-table", preset: "あずき", pick: "table", wide: true },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.goto(PAGE_URL, { waitUntil: "networkidle0" });

const made = [];
let current = null;

for (const s of SHOTS) {
  const w = s.wide ? WIDTH_WIDE : WIDTH_PC;
  await page.setViewport({ width: w, height: 1400, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 400));
  current = null;   // 幅を変えたので毎回プリセットを入れ直す
  if (s.preset !== current) {
    await page.evaluate((p) => {
      const b = [...document.querySelectorAll("button")].find((x) => x.textContent.includes(p));
      if (b) b.click();
    }, s.preset);
    await new Promise((r) => setTimeout(r, 700));
    await page.evaluate(() => { const d = document.querySelector("details"); if (d) d.open = true; });
    await new Promise((r) => setTimeout(r, 400));
    current = s.preset;
  }

  if (s.tweak) {
    await page.evaluate((pairs) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      for (const [label, val] of pairs) {
        // ラベル文字列は <label> の直下のテキストノード。textContent だと単位まで拾ってしまう
        const lab = [...document.querySelectorAll("label")]
          .find((x) => (x.childNodes[0] ? x.childNodes[0].textContent : "").trim() === label);
        const input = lab && lab.querySelector("input");
        if (!input) { console.warn("入力欄が見つからない: " + label); continue; }
        setter.call(input, val);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, s.tweak);
    await new Promise((r) => setTimeout(r, 600));
    current = null;   // 値を変えたので、次のショットでプリセットを入れ直す
  }

  const rect = await page.evaluate((pick) => {
    const all = [...document.querySelectorAll("div,section,details")];
    let el = null;
    if (pick === "preset") {
      el = all.find((x) => /あずき（記事の設定）/.test(x.textContent || "") && x.getBoundingClientRect().height < 320);
    } else if (pick === "result") {
      el = all.find((x) => /95歳時点の資産|資産が尽きる年齢/.test(x.textContent || "") && x.getBoundingClientRect().height < 700);
    } else if (pick === "table") {
      el = document.querySelector("details");
    } else {
      el = all.find((x) => (x.textContent || "").trim().startsWith(pick));
    }
    if (!el) return null;
    el.scrollIntoView();
    const r = el.getBoundingClientRect();
    return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height };
  }, s.pick);

  if (!rect) { console.log(`  ⚠ 見つからず: ${s.name}`); continue; }
  await new Promise((r) => setTimeout(r, 200));

  // 明細の表は長すぎるので、退職の年が見えるところ（17年ぶんくらい）で切る
  const h = Math.min(rect.h, s.pick === "table" ? 700 : 1600);
  const png = join(OUT, `${s.name}.png`);
  await page.screenshot({ path: png, clip: { x: rect.x, y: rect.y, width: rect.w, height: h } });
  const webp = join(OUT, `${s.name}.webp`);
  const info = await sharp(png).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(webp);
  unlinkSync(png);
  made.push(`${s.name}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB  [${s.preset}]`);
}

await browser.close();
console.log("✅ 生成:\n  " + made.join("\n  "));
