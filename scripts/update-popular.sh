#!/bin/bash
# 人気ランキング（data/popular-posts.json）をGA4から取り直し、
# 順位が変わったときだけ、そのファイル1つをコミットしてプッシュする。
#
# 使い方: bash scripts/update-popular.sh
# 朝のルーティン（daily-access-alert）から毎日呼ばれる。
#
# 決めごと:
#   - PVの数字だけ変わって順位が同じ日は、元に戻して何もしない（毎朝デプロイしないため）
#   - git add . はしない。コミットするのはこのファイルだけ（他セッションの作業と同居するため）
#   - プッシュに失敗しても force はしない。コミットは残るので次のプッシュで出る
set -u
cd "$(dirname "$0")/.."
f=data/popular-posts.json

before=$(grep '"slug"' "$f")
node scripts/popular-posts.js || { echo "❌ GA4の取得に失敗（上のエラーを確認）"; exit 1; }
after=$(grep '"slug"' "$f")

if [ "$before" = "$after" ]; then
  git checkout -- "$f"
  echo "順位に変化なし → 本番は更新しない"
  exit 0
fi

git commit -q -m "人気ランキング更新($(date +%Y-%m-%d))" -- "$f" || { echo "❌ コミット失敗"; exit 1; }
if git push -q origin main; then
  echo "✅ 順位が変わったのでプッシュした（3〜4分後に本番反映）"
else
  echo "⚠ プッシュ失敗。コミットは残っている。次に誰かがプッシュしたときに一緒に出る"
  exit 1
fi
