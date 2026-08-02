<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# アフィリエイト（記事を追加・編集するときは必ず読む）

## 新しい記事を追加したら、毎回この3つを検討する

1. **証券・会計・ふるさと納税など、記事テーマに合うサービスの `:::cta`**（下のコード表から選ぶ）
2. **記事テーマに合う書籍の `:::product`** … 選定ルールと使える本の一覧は `BOOKS.md` を見る。**合う本がなければ入れない**
3. **アクセスが集まりそうなトレンド記事なら、定番記事への「📌 あわせて読みたい」内部リンク**

合うものが無ければ広告は入れなくてよい。無理に入れる方が損。

## 置き場所（重要）

広告ブロックは **記事末尾ではなく、まとめ（`<div class="summary-box">` または `## まとめ` 見出し）の直前** に置く。関連記事より後ろに置かない。
→ 末尾に置いていた時期はPV約2,300に対しクリック2回だった。読者はそこまで到達しない。

1記事に置く広告ブロックは **合計2個まで**（例: 証券CTA 1 + 書籍カード 1）。

## ASPコード

| 広告主 | url に書く値 |
|---|---|
| SBI証券（汎用・ゼロ革命） | `https://h.accesstrade.net/sp/cc?rk=0100piab00orlw` |
| SBI証券（NISA記事用・NISA LPへ直送） | `https://h.accesstrade.net/sp/cc?rk=0100pesr00orlw` |
| マネックス証券 | `https://h.accesstrade.net/sp/cc?rk=0100pe7300orlw` |
| ふるなび | `https://h.accesstrade.net/sp/cc?rk=0100ob7n00orlw` |
| freee会計 | `https://px.a8.net/svt/ejp?a8mat=4B1V21+1MXXO2+3SPO+9FDI8Y` |

- Amazon・楽天のIDは環境変数（`NEXT_PUBLIC_AMAZON_TAG` / `NEXT_PUBLIC_RAKUTEN_AFF_ID`）。記事には書かない
- 新しいASPを追加したら `components/AffiliateClickTracker.tsx` の `MERCHANT_PATTERNS` にも追記する（GA4で広告主別に集計するため）
- PR表記（「※本記事にはアフィリエイト広告〜」）は全記事に自動で出るので、記事側には書かない
- ふるなびは商品個別リンク禁止（画像・価格・付随紹介文すべて不可）。トップへの全体リンクだけ使う

## やらないこと

- 自分のサイトのアフィリエイトリンクを自分でクリック・購入しない（規約違反・成果没収）。自分で使うなら各ASPのセルフバックから
- Amazonの商品画像を公式ツール以外で持ってこない

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
