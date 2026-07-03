# harukamuy.com 運用手順書

このブログの日常運用を1か所にまとめたメモです。迷ったらまずここを見る。
（技術的な変更を伴う作業は、無理せずClaudeに依頼してOK）

---

## 1. 新しい記事を公開する

### 手順
1. 画像を `public/images/` に置く（**PNG・JPGのままでOK**。WebP変換・SNS用画像はビルド時に全自動）
2. `content/posts/記事スラッグ.md` を作成（下のテンプレを使う）
3. `git add .` → `git commit` → `git push`
4. **3〜4分待つ**（自動デプロイ）
5. ブラウザで記事URLを開いて表示確認 → それからSNSに投稿

### フロントマターのテンプレ
```yaml
---
title: "記事タイトル"
date: "2026-07-01"
category: "sidefire"   # sidefire / investment / freelance / news / gomazochi のどれか
excerpt: "記事の要約。検索結果とSNSカードに出る大事な文章。"
coverImage: "/images/20260701_1.png"   # png/jpgのままでOK（自動変換される）
coverImagePosition: "center"
tags: ["サイドFIRE", "家計・資産管理"]
---
```

### 記事を修正（リライト）したとき
フロントマターに更新日を足す（Googleに「更新した」と伝わる）:
```yaml
updated: "2026-07-15"
```

---

## 2. タグのルール（表記ゆれ注意）

- **既存タグを使うのが基本**。全タグは https://harukamuy.com/tags で確認できる
- 似たタグを増やさない（例:「高配当」を作らず既存の「高配当株」を使う）
- **新しいタグを使い始めるときは、`lib/posts.ts` の `TAG_SLUGS` にURL用の英語名を1行追加する**（忘れると機械的なURLになる）。Claudeに「タグ○○を追加して」と頼めばOK
- 1記事にタグは2〜4個が目安

## 3. カテゴリを増やすとき（めったにない）

カテゴリ追加はコード修正が**4か所**必要（型定義・タブ2つ・表示名マップ3つ）。
自分で触らず **Claudeに「カテゴリ○○を追加して」と依頼**するのが安全。

## 4. 連載記事の作り方

連載の各記事のフロントマターに2行足すだけ（前後ナビ・目次・連載ページが自動生成）:
```yaml
series: "tokachi-plan"   # 連載ID
seriesOrder: 5           # 第何回か
```
**新しい連載を始めるとき**は `lib/posts.ts` の `SERIES_NAMES` に表示名を1行追加（Claudeに依頼でOK）。

---

## 5. 月次の資産データ更新（毎月月初）

1. `components/sidefireData.ts` の `SNAPSHOTS` 配列の末尾に、新しい月のデータを1件追加
   （index・highDiv・cash・btc・配当予測・利回り。前月分をコピーして数字を差し替えるのが楽）
2. 月次レポート記事（`monthly-report-YYYY-MM.md`）を書く
3. push すると、トップの資産カード・推移グラフ・サイドバーが**全ページ自動更新**

## 6. 人気記事ランキングの更新（月1回くらい）

```bash
cd ~/Documents/harukamuy-blog
node scripts/popular-posts.js
git add data/popular-posts.json
git commit -m "人気記事ランキング更新"
git push
```
GA4の直近28日の実データからトップの「よく読まれている記事」が更新される。

---

## 7. SNSでシェアするとき

- **push後3〜4分待ち、記事URLをブラウザで開いて確認してから**投稿する
- Xでカードに**画像が出なかったら**: ツイートを削除し、URL末尾に `?r=1` を付けて再投稿
  （Xは一度読んだカード情報を最大7日キャッシュするため。`?r=1` で別URL扱いになり再取得される）
- インスタ用のスライドは `scripts/instagram-slides.mjs` で生成できる（Claudeに依頼でOK）

## 8. AdSense まわり

- `public/ads.txt` は**設置済み**（pub-3731608068434256）
- 承認されたら: AdSense管理画面に表示される ads.txt の内容と一致しているか確認するだけ
- 広告コードの設置が必要になったら Claude に依頼

## 9. Search Console の見方（月1回チェックで十分）

- 見るのは**「登録済み（緑）」が伸び続けているか**だけ
- 「未登録」の大半は正常（タグページの統合・クロール待ち・過去URLの残骸）
- **`/blog/記事名` の形の本物の記事**が404や除外に入っていた時だけ要調査（Claudeに相談）

---

## 10. 仕組みの早見表（何が自動で何が手動か）

| 作業 | 自動/手動 |
|---|---|
| 画像のWebP変換・SNS用JPG生成 | ✅ 自動（ビルド時） |
| サイトマップ・RSS・構造化データ | ✅ 自動 |
| 記事の目次・読了時間・関連記事 | ✅ 自動 |
| デプロイ（push→公開） | ✅ 自動（3〜4分） |
| 月次資産データ（SNAPSHOTS） | ✋ 手動（月1） |
| 人気記事ランキング | ✋ 手動（月1、コマンド1回） |
| 新タグのURL登録・新カテゴリ | ✋ Claudeに依頼 |
| 記事の `updated:` 記入 | ✋ リライト時に手動 |

---

## 11. 免責事項のテンプレ（記事末尾に貼る）

記事の種類に応じて、末尾（関連記事の前）に対応する免責を貼る。**投資・税務系は必須**。

### A. 投資系（銘柄・商品・相場に触れる記事）
```html
<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の見解・体験のシェアです。特定の銘柄・金融商品への投資を推奨・勧誘するものではありません。掲載している数字は執筆時点の情報にもとづくもので、正確性を保証するものではなく、今後変動する可能性があります。投資は価格が変動し、元本を割り込む可能性があります。必ずご自身の判断と責任で行ってください。
</div>
```

### B. 税務・社会保険系（確定申告・国保・年金・控除などの記事）
```html
<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の体験と、執筆時点の制度にもとづく情報のシェアです。税制・社会保険制度は改正されることがあり、また個々の状況によって扱いが異なります。実際の申告・手続きにあたっては、税務署・自治体・税理士など専門家にご確認ください。
</div>
```

### C. 一般情報系（ごまもち日記・暮らし系は不要。制度に軽く触れる程度なら）
```html
<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事は執筆時点の情報にもとづく、あずき個人の体験・見解のシェアです。最新の情報は各公式サイトでご確認ください。
</div>
```

## 12. 記事公開前のセルフチェック（1分）

- [ ] tags を **2〜3個**付けたか（付け忘れると関連記事・タグページに出ない）
- [ ] 新しいタグを使ったら Claude に「TAG_SLUGS 登録して」と依頼したか
- [ ] 投資・税務系なら免責（上のA/B）を末尾に貼ったか
- [ ] 数字には「いつ時点か」を書いたか（例: 2026年6月末時点）
