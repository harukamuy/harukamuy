# harukamuy

ごまもち（ボストンテリア）と澪のサイドFIREブログ — [harukamuy.com](https://harukamuy.com)

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router, Static Export)
- **スタイリング**: Tailwind CSS v4
- **ホスティング**: Cloudflare Pages
- **コンテンツ**: Markdown (`content/posts/`)

## 記事の追加方法

`content/posts/` に `.md` ファイルを追加するだけです。

```markdown
---
title: "記事タイトル"
date: "2024-04-01"
category: "gomazochi"  # または "sidefire"
excerpt: "記事の概要"
---

本文をここに書きます。
```

## ローカル開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```
