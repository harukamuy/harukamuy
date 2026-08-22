---
title: "高配当株は何銘柄あれば足りる? 自分の117銘柄でリスクを計算したら、答えは「数」ではなかった"
date: "2026-08-09"
category: "sidefire"
excerpt: "毎月の記録に使っているCSVをAIに渡して「わたしの日本株のリスクは測れますか」と聞いたら、「これでは測れません」と返ってきました。株価の履歴を足して計算したら、117銘柄・1,315万円の年率リスクは15.0%。日経平均の約半分でした。さらに「何銘柄あれば足りるのか」を実際の保有株で銘柄数ごとに500回ずつ試したところ、分散の意味は思っていたものと違いました。都合の悪い数字も含めて全部書きます。"
coverImage: "/images/20260807_3.webp"
coverImagePosition: "center"
tags: ["高配当株", "日本株", "市場の話"]
---

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      117めいがらも もってて、どれくらい あぶないの？🐾
    </div>
  </div>
</div>

<div class="turn mio">
  <div class="avatar mio-av" style="background:transparent;border:none;">
    <img src="/images/mio-fullbody.webp" alt="あずき" style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">あずき</div>
    <div class="bubble">
      それがね、ちゃんと測ったことがなかったの。だから測ってみた。
    </div>
  </div>
</div>

</div>

毎月の資産記録をつくるとき、証券口座からダウンロードしたCSVを使っている。ふと思いついて、そのCSVを[クロちゃん](/blog/video-producer-ai-daily-use)（わたしはClaudeをこう呼んでいる）に渡して聞いてみた。

<strong>「このCSVで、わたしの日本株のリスクは測れますか」</strong>

返ってきた答えは「<strong>これでは測れません</strong>」だった。

理由を聞いて、なるほどと思った。CSVに入っているのは「今いくらか」という<strong>その日のスナップショット</strong>だけで、値動きの歴史がない。体重計にたとえると、今日の数字だけでは「体重の変動が激しい人かどうか」はわからない、という話だった。

そこで株価の履歴を足して、クロちゃんに計算してもらった。<strong>都合の悪い数字も出た</strong>ので、そこも含めて書いておく。

---

## 1. 結果は15.0%だった

計算したのは<strong>年率リスク</strong>という数字だ。1年でどれくらい上下に振れるか、を表す。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 わたしの日本株ポートフォリオ</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>銘柄数</span><span style="text-align:right;white-space:nowrap;">117銘柄</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>評価額</span><span style="text-align:right;white-space:nowrap;">1,315万円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>年率リスク</span><span style="text-align:right;white-space:nowrap;">15.0%</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">直近242営業日（約1年）の日次データから計算。配当は含まず、値動きだけを見ています。計算に使う日数を変えると、数字も少し変わります。117のうち2つは、業種まるごとを買うETF（東証REIT指数・東証銀行業株価指数）です</div>
</div>

この15.0%が何を意味するかというと、1年後の評価額の目安はこうなる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 1年後の評価額の目安（配当を除く）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:340px;display:grid;grid-template-columns:0.8fr 0.6fr 1.2fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:13px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">確率</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">振れ幅</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">評価額</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">約68%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:center;white-space:nowrap;">±15%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">1,118〜1,512万円</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">約95%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:center;white-space:nowrap;">±30%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">920〜1,710万円</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
</div>

ざっくり言うと、<strong>ふつうの1年なら±200万円くらい、荒れた年なら±400万円くらい動く</strong>ということだ。

数字にすると、けっこう大きい。

---

## 2. 1銘柄ずつは、もっと荒かった

おもしろかったのは、この15.0%の中身だ。

<strong>1銘柄ずつのリスクを、いまの保有金額の重みで平均すると27.1%</strong>だった。それが117銘柄をまとめると15.0%になる。<strong>12.1ポイントぶん、分散で消えている</strong>。

銘柄ごとの荒さの差も、思った以上に大きかった。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 117銘柄の荒さの分布</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>いちばん穏やかな銘柄</span><span style="text-align:right;white-space:nowrap;">6.0%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>真ん中の銘柄</span><span style="text-align:right;white-space:nowrap;">23.7%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>いちばん荒い銘柄</span><span style="text-align:right;white-space:nowrap;">62.0%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>リスク30%超の銘柄</span><span style="text-align:right;white-space:nowrap;">33銘柄（金額の35.4%）</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">銘柄名は伏せています。いちばん荒い銘柄といちばん穏やかな銘柄で、10倍以上の開きがありました</div>
</div>

<strong>リスク30%を超える銘柄が33もあって、金額でいうと全体の35%</strong>を占めている。それでも合計すると15.0%に収まる。1つが下がっているとき、別のどれかが上がっているからだ。

「分散が大事」というのは何度も聞いてきたし、[7月は実際にそれで資産が増えた](/blog/monthly-report-2026-07)。でも<strong>自分の数字で12.1ポイントという形になったのは初めて</strong>だった。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      あらい かぶが 33こも あるのに、まとまると おだやかなんだ🐾
    </div>
  </div>
</div>

<div class="turn mio">
  <div class="avatar mio-av" style="background:transparent;border:none;">
    <img src="/images/mio-fullbody.webp" alt="あずき" style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">あずき</div>
    <div class="bubble">
      そうなの。バラバラのタイミングで動くから、打ち消し合ってくれるんだって。
    </div>
  </div>
</div>

</div>

---

## 3. 銘柄数を変えて、500回ずつ試した

ここが今回いちばん知りたかったところだ。<strong>117も持つ必要はあったのか</strong>。

自分の117銘柄から、ランダムに何銘柄かを選んでリスクを計算する、というのを<strong>500回ずつくり返して</strong>もらった。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 銘柄数を変えたときのリスク（500回の平均）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>1銘柄だけ（単純平均）</span><span style="text-align:right;white-space:nowrap;">25.8%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>5銘柄</span><span style="text-align:right;white-space:nowrap;">16.6%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>10銘柄</span><span style="text-align:right;white-space:nowrap;">14.9%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>30銘柄</span><span style="text-align:right;white-space:nowrap;">13.5%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>117銘柄</span><span style="text-align:right;white-space:nowrap;">13.2%</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">保有比率を均等にそろえた場合の数字です。実際のわたしの比率だと15.0%になります（この差については、あとで書きます）。1銘柄の25.8%が2章の27.1%とずれるのは、2章が金額の重みつき、こちらが重みなしの平均だからです</div>
</div>

1銘柄から10銘柄でリスクが<strong>10.9ポイント</strong>下がるのに、10銘柄から117銘柄では<strong>1.7ポイント</strong>しか下がらない。

これを見て、最初は「<strong>じゃあ10銘柄でよかったのでは</strong>」と思った。117も持っている意味がないように見える。

でも、この表には<strong>書かれていないこと</strong>があった。

---

## 4. 10銘柄は「運次第」だった

同じ10銘柄でも、どの10銘柄を引くかで結果はまったく違う。500回のなかで<strong>いちばん良かった場合といちばん悪かった場合</strong>を出してみたら、話がひっくり返った。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 同じ銘柄数でも、引き次第でこれだけ変わる</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:400px;display:grid;grid-template-columns:0.8fr 0.9fr 0.9fr 0.9fr 0.7fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">銘柄数</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">当たり</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">真ん中</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">はずれ</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">幅（pt）</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">3銘柄</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">8.4%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">17.8%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">29.9%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">21.5</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">10銘柄</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">10.6%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">14.6%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">21.4%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">10.8</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">30銘柄</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">11.2%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">13.6%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">16.3%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">5.1</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">50銘柄</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">11.7%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">13.4%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">15.1%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">3.4</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;">117銘柄</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">13.2%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">13.2%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">13.2%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">0.0</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">117銘柄は全部持つので選びようがなく、幅はゼロになります。「真ん中」は500回のちょうど中央の値で、3章の表（500回の平均）とは少しずれます。「当たり」「はずれ」は500回のなかでの最良・最悪なので、試す回数を増やせば幅はもう少し広がります</div>
</div>

10銘柄だと、当たりを引けば10.6%。<strong>はずれを引くと21.4%</strong>。同じ「10銘柄に分散しています」でも、中身しだいで<strong>2倍以上</strong>違う。3銘柄はもっと極端で、当たれば8.4%だが、はずれれば29.9%になる。少なく持つほど、当たりもはずれも極端になる。

円にすると、もっとはっきりする。1,315万円を同じ金額で分けて持ったとして、10銘柄なら1年の振れ幅が<strong>当たりで±139万円、はずれで±281万円</strong>。<strong>引き次第で142万円変わる</strong>。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:12px;">🎯 わかったこと</div>
  <div style="font-size:13px;color:#5a4a3a;line-height:1.9;">
    銘柄を増やすほど下がるのは<strong>リスクの平均</strong>ではなく、<strong>当たりはずれの幅</strong>のほうだった。10銘柄なら10.8ポイントあった幅が、30銘柄で5.1ポイント、50銘柄で3.4ポイントまで縮む。<br />
    増やすことで買っているのは、低いリスクではなく<strong>「運に左右されない」という状態</strong>だ。
  </div>
</div>

これは自分でも意外だった。ずっと「たくさん持てば安全になる」と思っていた。

### 答えは30〜50だった

10銘柄の<strong>142万円差</strong>は、30銘柄で<strong>67万円差</strong>、50銘柄では<strong>45万円差</strong>まで縮む。

正直に言えば、<strong>117は必要なかったかもしれない</strong>。でも<strong>10では少なかった</strong>。「何銘柄あれば足りるか」の答えは、平均リスクが下がりきる数（10）ではなく、<strong>はずれを引いても耐えられる数（30〜50）</strong>のほうだった。

なお、インデックスを1本買う人は、この幅を<strong>はじめからゼロで持っている</strong>。わたしは117銘柄を集めて、同じ状態をあとから買ったことになる。

---

## 5. 30〜50で足りたのは、母集団のおかげ

ここまでの数字には、<strong>大きな前提</strong>がある。

今回わたしが計算したのは「<strong>わたしの117銘柄のなかから選んだ場合</strong>」であって、市場から適当に選んだ場合ではない。

そしてその117銘柄の大半は、わたしが自力で見つけたものではない。<strong>[リベシティ](https://site.libecity.com/)で紹介されていた銘柄</strong>から選んでいる。<strong>業種のバランスを自分で計算して組んだわけではない</strong>。すでに散らばっているものを、わたしが並べただけだ。

金額でいうと、[6月にポートフォリオを公開したとき](/blog/portfolio-full-disclosure-5806)に数えて<strong>75%がリベシティで学んで選んだ分</strong>だった（その後も紹介された銘柄を買い足しているので、いまはもう少し高いはずだ）。

<strong>つまり母集団の時点で、すでに散らばっている</strong>。だから30銘柄でも数字が悪くならない。ここを抜きにして「30銘柄あれば十分」と読まれると困る。同じ業種の30銘柄を選べば、結果はまったく違うはずだ。

<strong>数が効くのは、選ぶ元が広がっているときだけ</strong>だ。たまたま良い数字が出たのではなく、選ぶところで人の手が入っている。しかもわたしの場合、その元は日本のなかだけだ。そこは書いておきたい。

---

## 6. もうひとつ前提がある。比率が適当だった

比率についても、はっきりした差が出た。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">📉 比率の付け方で1.8ポイント損していた</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#5a4a3a;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>いまの実際の比率</span><span style="text-align:right;white-space:nowrap;">15.0%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>同じ117銘柄を均等に持ったら</span><span style="text-align:right;white-space:nowrap;">13.2%</span>
    </div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">同じ銘柄・同じ期間で、比率だけを変えて計算した結果です</div>
</div>

わたしの買い方は<strong>かなり適当</strong>だ。そのときの株価と手持ちの現金で、買える株数を買っている。比率を計算して調整したことはない。

その結果、<strong>均等に持っていた場合より1.8ポイントぶんリスクが高くなっていた</strong>。金額でいうと、1年の振れ幅が24万円ぶん大きいということになる。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      おおすぎる かぶを うっちゃえば いいんじゃないの？🐾
    </div>
  </div>
</div>

<div class="turn mio">
  <div class="avatar mio-av" style="background:transparent;border:none;">
    <img src="/images/mio-fullbody.webp" alt="あずき" style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">あずき</div>
    <div class="bubble">
      売ると税金がかかるし、そのぶん配当も減っちゃうの。だから少ないほうを買い足すんだ。
    </div>
  </div>
</div>

</div>

これを機に、少しずつ直していきたい。ただし[売らない方針](/blog/high-dividend-exit-strategy)は変えないので、やり方は<strong>比率の小さい銘柄を買い足していく</strong>形だけだ。しかも高配当株は、<strong>割安だと判断できたとき</strong>しか買えない。値段が下がっただけでは割安とはかぎらず、利回り・業績・配当を続けられそうかを合わせて見ることになる。<strong>何年もかかるかもしれないけれど、それでかまわない</strong>と思っている。

---

## 7. ほかと比べてみる

15.0%が高いのか低いのか、感覚がわからなかったので、ほかの指数やETFと並べてみた。

公表されているファンドのリスクは、3年だったり5年だったりと<strong>期間も方法もバラバラ</strong>で、そのまま並べても比べたことにならない。なので全部そろえて、クロちゃんに計算し直してもらった。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 直近1年の年率リスク（円で持った場合）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>日経平均</span><span style="text-align:right;white-space:nowrap;">28.6%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>日経高配当株50 ETF</span><span style="text-align:right;white-space:nowrap;">19.1%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>MSCI日本高配当 ETF</span><span style="text-align:right;white-space:nowrap;">18.7%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>全世界株（円換算）</span><span style="text-align:right;white-space:nowrap;">15.5%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>わたしの日本株117銘柄</span><span style="text-align:right;white-space:nowrap;">15.0%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>S&P500（円換算）</span><span style="text-align:right;white-space:nowrap;">14.9%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>米国総合債券BND（円換算）</span><span style="text-align:right;white-space:nowrap;">8.6%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>（参考）ドル円そのもの</span><span style="text-align:right;white-space:nowrap;">7.7%</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">すべて直近1年の日次データから同じ方法で計算。外国の資産は為替をかけて円ベースにしています</div>
</div>

意外だったのが<strong>日経平均の28.6%</strong>だ。この1年はAI関連株の乱高下があって、1日で1,000円以上動く日も何度かあった。日経は値がさ株の影響が大きいので、荒くなりやすい。

そして<strong>この1年に限れば、既製の高配当株ETFより自分のほうが低かった</strong>。19.1%と18.7%に対して15.0%。同じ日本の高配当株なのに<strong>4ポイント前後の差</strong>がある。銘柄数ではなく、中身の散らばりが効いているのだと思う。

<strong>自分ではもっとリスクを取っているつもりでいた</strong>。個別株をこれだけ持っているのだから、インデックスよりずっと荒いものだろう、と勝手に思っていた。

それが全世界株（15.5%）ともS&P500（14.9%）ともほとんど変わらない。<strong>揺れ幅だけなら、思っていたほど荒くなかった</strong>とわかって、けっこうテンションが上がった。

### ただし、同じ土俵ではなかった

まず、これは<strong>勝ったという話ではない</strong>。わたしの数字は「いま持っている117銘柄」で1年を遡って計算したもので、途中で買い足した銘柄も最初から持っていた扱いになっている。ETFのほうは入れ替えも含めて、実際にその1年を通り抜けた数字だ。<strong>条件は対等ではない</strong>。

もうひとつが<strong>為替</strong>だ。いちばんはっきり出ているのがBNDで、ドルで見れば3.7%しか動かない、とても穏やかな資産だ。でも円で持つと<strong>8.6%</strong>になる。乗っているのはドル円の振れ（7.7%）だ。値動きは単純な足し引きにならないので、8.6から3.7を引いても7.7にはならない。[円で暮らしている以上、外貨の資産には為替が乗る](/blog/which-currency-to-hold)。

そしてこれは、上の表の全世界株とS&P500にも同じように乗っている。<strong>為替を除くと、全世界株は14.2%、S&P500は13.0%</strong>だった。わたしの日本株には為替がかからないので、15.0%のまま。つまり<strong>為替を外して並べると、この2本より荒いのはわたしのほうだ</strong>。

「円で持ったときの揺れはほぼ同じ」と「株そのものの揺れはこの2本より上」は、どちらも本当だ。円で暮らしている自分にとって効くのは前者だけれど、<strong>後者を伏せておくのはずるい</strong>と思ったので書いておく。

---

## 8. この数字の限界

最後に、この計算で言えないことも書いておく。

<div class="data-card" style="background:#fafaf7;border:1.5px dashed #ddd8d0;border-radius:16px;padding:20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a7268;margin-bottom:12px;">⚠️ 気をつけていること</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a544c;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>暴落時には通用しない</strong>。相場全体が落ちるときは銘柄がそろって下がるので、分散の効果が弱まる</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>手間は数字に入っていない</strong>。インデックスなら毎月1本を積み立てるだけで、銘柄の入れ替えも自動だ。わたしは117銘柄ぶんの減配や比率のずれを自分で追っている。<strong>同じ揺れ幅を、手間で買っている</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>増える側は測っていない</strong>。配当も税金も入っておらず、揺れ幅が同じでも増え方まで同じという意味ではない</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>直近1年ぶんしか見ていない</strong>。穏やかな年に測れば低く、荒れた年に測れば高く出る</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>68%・95%という確率は、値動きがきれいに散らばる前提での目安</strong>。実際の株価は、その前提より極端に動く</span></div>
  </div>
</div>

とくに1つ目が大事だと思っている。<strong>ふだんは打ち消し合ってくれる銘柄たちも、[本当の暴落では一緒に落ちる](/blog/sidefire-market-crash-doubt)</strong>。今回の15.0%は「ふつうの1年」の話でしかない。

それでも、<strong>自分の資産がどれくらい動くのかを数字にできた</strong>のは、すごく良かったと思っている。

±200万円という数字は、見た瞬間は大きく感じた。でも[取り崩さない設計にしている](/blog/four-percent-rule-japan-doubt)ので、動いても売らなくていい。<strong>どれくらい動くかがわかっていれば、実際に動いたときに慌てなくて済む</strong>。それがいちばんの収穫だった。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      はかったら、こわくなくなったの？🐾
    </div>
  </div>
</div>

<div class="turn mio">
  <div class="avatar mio-av" style="background:transparent;border:none;">
    <img src="/images/mio-fullbody.webp" alt="あずき" style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">あずき</div>
    <div class="bubble">
      こわさは変わらないけど、どれくらい動くかがわかると落ち着くの。
    </div>
  </div>
</div>

</div>

---

:::cta
title: SBI証券 — 1株から買えるから、117銘柄に散らせた
description: わたしの日本株117銘柄は、SBI証券の単元未満株（S株）で少しずつ買い足してきたものです。1株から買えて、買付手数料もかからない。「何銘柄あれば足りるか」を自分で試しながら調整できるのは、この仕組みのおかげです。
button: SBI証券の公式サイトを見る →
url: https://h.accesstrade.net/sp/cc?rk=0100piab00orlw
:::

---

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>日本株117銘柄・1,315万円の<strong>年率リスクは15.0%</strong>。1年で±200万円くらい、荒れれば±400万円くらい動く計算</li>
<li>1銘柄ずつのリスクを保有金額の重みで平均すると27.1%。リスク30%超が33銘柄・金額の35%もあるのに、<strong>まとめると15.0%。12.1ポイントが分散で消えている</strong></li>
<li>平均リスクは<strong>10銘柄でほぼ下がりきる</strong>。ただしそれは平均の話で、<strong>10銘柄は引き次第で10.6%〜21.4%と2倍以上違う</strong>。増やして買っているのは低いリスクではなく<strong>「運に左右されない状態」</strong>だった</li>
<li>幅を円にすると、10銘柄は引き次第で142万円、30銘柄で67万円、50銘柄で45万円の差。<strong>117は必要なかったかもしれないが、10では少なかった</strong>。答えは<strong>はずれを引いても耐えられる数（30〜50）</strong>のほうだった</li>
<li>ただしこれは<strong>母集団の大半が、業種の散らばった状態で紹介されていた銘柄だから</strong>成り立つ数字（6月に数えた時点で金額の75%）。<strong>数が効くのは、選ぶ元が広がっているときだけ</strong></li>
<li>比率は<strong>均等に持っていたほうが1.8ポイント低かった</strong>（年24万円ぶん余計に振れている）。売らない方針は変えず、<strong>比率の小さい銘柄を、価格が見合ったときに買い足す</strong>形で少しずつ直していく</li>
<li>比較すると日経平均28.6%、日本の高配当株ETF18〜19%台に対して<strong>自分は15.0%</strong>。全世界株（円換算）15.5%とほぼ同じ。ただし<strong>わたしの数字はいま持っている117銘柄で1年を遡ったもので、ETFとは条件が対等ではない</strong>。そのうえ<strong>為替を除くと全世界株14.2%・S&P500 13.0%で、外国株より荒いのは自分</strong>だった</li>
<li>ただし<strong>直近1年の数字でしかなく、暴落時は銘柄がそろって落ちる</strong>ので分散は効きにくくなる。配当も税金も手間も、この数字には入っていない</li>
</ul>
</div>

## 関連記事

- [資産5,831万円の年率リスクを計算したら11.4%。分散が効いていたのは、思っていたところではなかった](/blog/total-portfolio-risk-correlation)
- [インデックスが45万円減ったのに、資産は22万円増えた月【2026年7月】](/blog/monthly-report-2026-07)
- [「暴落が来たら詰む」は本当か。3つの下落経験と、リーマン級の想定で答える【サイドFIREの疑問②】](/blog/sidefire-market-crash-doubt)
- [高配当株の出口戦略。わたしは「売らない」を基本にしている](/blog/high-dividend-exit-strategy)
- [「ドルも危ないのでは?」への答え。ユーロ・スイスフラン、持つならどの通貨がいい?](/blog/which-currency-to-hold)

---

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の見解・体験のシェアです。特定の銘柄・金融商品への投資を推奨・勧誘するものではありません。掲載しているリスクの数値は、直近1年の日次データをもとにClaude（クロちゃん）に計算してもらった目安で、正確性を保証するものではなく、期間や計算方法を変えれば結果は変わります。将来の値動きを予測するものでもありません。とくに相場全体が急落する局面では、ここで示した分散の効果は弱まります。投資は価格が変動し、元本を割り込む可能性があります。必ずご自身の判断と責任で行ってください。
</div>
