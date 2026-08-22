#!/bin/bash
# 記事の機械チェック（article-review スキルの「① 機械チェック」で使う）
#
# 使い方:
#   bash scripts/check-article.sh <slug>
#   例: bash scripts/check-article.sh defensive-stocks-walmart-drop
#
# 前提: npm run dev が localhost:3000 で動いていること
#
# 見るもの（ソースとレンダリング結果の両方）:
#   ソース側   … 禁則（全角ダッシュ・？。）、keep-grid 漏れ、「正直」の回数、
#               内部リンク先の実在、div の開閉
#   描画側     … 未変換の **、<strong> の入れ子、</strong> の重複、
#               非日本語の混入、まとめの項目数と字数、本文字数と読了時間
#
# なぜ描画側も見るか:
#   太字の崩れは ** を数えても検出できない。ペアがずれると全部消費され、
#   リテラルの ** はゼロなのに <strong> が入れ子になる（2026-08-21 に実際に起きた）。
#   ソースのパターン検索だけで判定すると、壊れていないものまで直してしまう。

set -u
# 日本語の正規表現（全角の括弧クラス）が C ロケールだとバイト単位で壊れるので固定する
export LC_ALL=en_US.UTF-8
slug="$1"
repo="$(cd "$(dirname "$0")/.." && pwd)"
f="$repo/content/posts/$slug.md"
[ -f "$f" ] || { echo "❌ $f がない"; exit 1; }

echo "■ ソース: $slug.md"
ng=0

# 禁則: 全角ダッシュは使わない。？。や行頭の句読点も見る
kin=$(grep -nE "——|？。|\?。|^[、。]" "$f")
if [ -n "$kin" ]; then echo "  禁則         ← 要修正"; echo "$kin" | sed 's/^/      /'; ng=$((ng+1)); else echo "  禁則         0"; fi

# 表の keep-grid 漏れ（スマホで縦積みになる）
kg=$(grep -n 'grid-template-columns' "$f" | grep -v 'keep-grid')
if [ -n "$kg" ]; then echo "  keep-grid漏れ ← 要修正"; echo "$kg" | cut -c1-80 | sed 's/^/      /'; ng=$((ng+1)); else echo "  keep-grid漏れ 0"; fi

# 「正直」は本文1回まで
sh=$(grep -o "正直" "$f" | wc -l | tr -d ' ')
echo "  「正直」      ${sh}回$( [ "$sh" -gt 1 ] && echo ' ← 1回まで')"
[ "$sh" -gt 1 ] && ng=$((ng+1))

# 内部リンクの実在
while read -r s; do
  [ -z "$s" ] && continue
  if [ ! -f "$repo/content/posts/$s.md" ]; then echo "  リンク切れ    ❌ /blog/$s"; ng=$((ng+1)); fi
done < <(grep -oE '\(/blog/[a-z0-9-]+\)' "$f" | tr -d '()' | sed 's|/blog/||' | sort -u)
echo "  内部リンク    $(grep -oE '\(/blog/[a-z0-9-]+\)' "$f" | sort -u | wc -l | tr -d ' ')本（上に❌がなければ全部実在）"

echo "■ 描画: http://localhost:3000/blog/$slug"
tmp="$(mktemp)"
sleep 1
curl -s "http://localhost:3000/blog/$slug" > "$tmp"

python3 - "$tmp" <<'PY'
import re,statistics,sys
h=open(sys.argv[1],encoding='utf-8').read()
m=re.search(r'<article.*?</article>',h,re.S)
if not m:
    print('  記事が取れない（dev サーバーは動いている?）'); raise SystemExit(1)
b=m.group(); t=re.sub(r'<[^>]+>','',b)
ng=0
checks=[('未変換**',len(re.findall(r'\*\*',h))),
        ('strong入れ子',len(re.findall(r'<strong>[^<]{0,80}<strong>',h))),
        ('閉じ重複',len(re.findall(r'</strong>[^<]{0,80}</strong>',h))),
        ('全角ダッシュ',t.count('——')),
        ('非日本語',len(re.findall(r'[Ѐ-ӿ가-힯฀-๿]+',t)))]
for name,n in checks:
    print(f'  {name:12} {n}' + (' ← 要修正' if n else ''))
    ng += n
od,cd = b.count('<div'), b.count('</div>')
print(f'  div開閉      {od} / {cd}' + (' ← 要修正' if od!=cd else ''))
ng += (od!=cd)
sm = re.findall(r'summary-list.*?</ul>',b,re.S)
if sm:
    smt = re.sub(r'<[^>]+>','',sm[0])
    items = re.findall(r'<li>(.*?)</li>',sm[0],re.S)
    ls = [len(re.sub(r'\s+','',re.sub(r'<[^>]+>','',i))) for i in items]
    flag = '' if 300 <= len(smt) <= 400 and 5 <= len(items) <= 7 else ' ← 目安300〜400字・5〜7項目'
    print(f'  まとめ       {len(items)}項目 {len(smt)}字／1項目平均{round(statistics.mean(ls))}字{flag}')
rt = re.search(r'約\d+分', t)
print(f'  本文         {len(t)}字' + (f' / {rt.group()}' if rt else ''))
print('  →', 'すべてOK' if ng==0 else f'{ng}件 要修正')
PY
rm -f "$tmp"
[ "$ng" -gt 0 ] && echo "  → ソース側 ${ng}件 要修正"
exit 0
