// 見出し画像を画面の大きさに応じて出し分ける。
// scripts/optimize-images.mjs が <base>.webp（最大1280px）と <base>-960.webp を作るので、
// スマホや一覧のカードでは小さい版、パソコンの記事ページでは大きい版がブラウザに選ばれる。

export function coverSrcSet(cover?: string): string | undefined {
  if (!cover || !/^\/images\/[^/]+\.webp$/.test(cover)) return undefined;
  return `${cover.replace(/\.webp$/, "-960.webp")} 960w, ${cover} 1280w`;
}

// 記事ページの見出し画像（本文の枠は最大740px）
export const HERO_SIZES = "(max-width: 800px) 100vw, 740px";
// 記事一覧のカード（スマホでは画面幅いっぱい、パソコンでは2〜3列）
export const CARD_SIZES = "(max-width: 700px) 100vw, 560px";
