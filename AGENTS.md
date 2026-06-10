<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# インスタ用スライド生成

記事をインスタのカルーセル投稿（10枚・1080x1350）に変換できる。

1. `instagram/<slug>/slides.json` を作る（記事を要約してスライド原稿にする。形式は `scripts/instagram-slides.mjs` 冒頭のコメント参照）
2. `node scripts/instagram-slides.mjs <slug>` を実行
3. `instagram/<slug>/` に 01.png〜NN.png と caption.txt（投稿文）が出力される

- デザインはブログと同テイスト（アイボリー×テラコッタ、Zen Maru Gothic、あずき＆ごまもちの丸アイコン）
- スライド・投稿文にアフィリエイトリンクは載せない（ASP規約・ステマ規制対策。CTAはブログ誘導のみ）
- 1枚目はフック（cover）、最後はブログ誘導（cta）。資産公開記事は stat / breakdown 型が使える
- 投稿文の末尾に投資の免責ひとことを入れる
- 実行には Google Chrome（puppeteer-core が起動）と Google Fonts への接続が必要
