---
title: "資産5,831万円の年率リスクを計算したら11.4%。分散が効いていたのは、思っていたところではなかった"
date: "2026-08-11"
category: "sidefire"
excerpt: "先日、日本株117銘柄のリスクを測ったら15.0%でした。では資産全体だといくつになるのか。単純に足すと15.0%のはずが、実際に測ると11.4%。差の3.6ポイントが分散の効果でした。さらに「どれとどれが一緒に動いているか」を調べたところ、効いていたのは日本の高配当株で、効いていなかったのはオルカンでした。都合の悪い数字も出たので、そこも含めて書きます。"
coverImage: "/images/20260809_3.webp"
coverImagePosition: "center"
tags: ["ポートフォリオ", "高配当株", "インデックス投資"]
---

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      このまえ にほんかぶを はかったよね。ぜんぶだと どうなるの？🐾
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
      それが気になって、ぜんぶ測ってみたの。下がったよ。
    </div>
  </div>
</div>

</div>

先日、[日本株117銘柄のリスクを計算](/blog/portfolio-risk-117-stocks)したら<strong>年率15.0%</strong>だった。1銘柄ずつだと平均27.1%あるのに、まとめると15.0%まで下がる。分散が効いているのがはっきり見えて、けっこううれしかった。

でも、あれは<strong>日本株1,315万円だけ</strong>の数字だ。わたしの資産はそれだけではない。インデックス、債券、ビットコイン、現金もある。

<strong>全部あわせたら、いくつになるんだろう。</strong>

気になったので、[クロちゃん](/blog/video-producer-ai-daily-use)（わたしはClaudeをこう呼んでいる）にまとめて計算してもらった。<strong>都合の悪い数字も出た</strong>ので、そこも含めて書いておく。

---

## 0. 先に、測り方の話をひとつだけ

本題に入る前に、断っておきたいことがある。この記事には<strong>2種類の数字</strong>が出てくる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📏 2つの数字と、測り方</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:400px;display:grid;grid-template-columns:1fr 1fr 1.4fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">何を知りたいか</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">使うデータ</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">理由</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;"><strong>リスク</strong><br />どれくらい揺れるか</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">直近1年<br />1日ごと</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">知りたいのは「<strong>いま</strong>どれくらい動くか」だから</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;"><strong>相関</strong><br />一緒に動くか</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">過去5年<br />1か月ごと</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">日本とアメリカには<strong>時差</strong>があるので、短く区切ると正しく測れないから</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
</div>

なぜ相関だけ長い期間を使うのか。<strong>時差</strong>があるからだ。

日本の朝の相場は、<strong>前の晩のアメリカを受けて動いている</strong>。「昨日ニューヨークが下げたから、今朝の日本株も安い」というのは、よくあることだ。

ということは、<strong>同じ日付どうしで比べると、この関係が見えなくなる</strong>。日本の「今日」と、アメリカの「今日」は、実際には別のタイミングの出来事だからだ。

実際に、区切る長さを変えて測ってみたら、はっきり出た。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 長く区切るほど、本当の関係に近づく（S&P500との相関）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:360px;display:grid;grid-template-columns:1.2fr 0.8fr 0.8fr 0.9fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">1日<br />ごと</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">1週間<br />ごと</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">1か月ごと<br />（5年）</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">日本の高配当株</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:center;">0.09</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:center;">0.30</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:center;">0.39</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">オルカン</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:center;">0.96</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:center;">0.96</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:center;">0.97</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
</div>

日本の高配当株は<strong>0.09 → 0.30 → 0.39</strong>と上がっていく。区切りを長くするほど、時差のズレが中に吸収されるからだ。一方<strong>オルカンは0.96のまま動かない</strong>。アメリカと同じ時間帯で動いているので、そもそもズレがない。

<strong>低いほうの0.09を採って「分散できています」と書くのは、さすがにずるい</strong>と思った。なので相関は、いちばん落ち着いた<strong>1か月ごと・5年ぶん</strong>の数字を使う。

<div class="data-card" style="background:#fafaf7;border:1.5px dashed #ddd8d0;border-radius:16px;padding:20px;margin:24px 0;">
  <div style="font-size:13px;color:#5a544c;line-height:1.9;">
    なお5年に遡るときは、<strong>いまの117銘柄・いまの比率を過去に当てはめて</strong>計算している。当時はまだ買っていない銘柄もあるので、「もし5年前からこの組み合わせを持っていたら」という数字になる。実際の保有記録ではない。
  </div>
</div>

---

## 1. まず、単純に足してみる

いま持っているものを全部並べる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 資産ごとの金額と、年率リスク</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:400px;display:grid;grid-template-columns:1.3fr 0.8fr 0.6fr 0.8fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">資産</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">金額</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">比率</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">リスク</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">S&P500（iDeCo含む）</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">3,439万円</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">59.0%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">15.0%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">日本の高配当株</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">1,315万円</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">22.6%</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;text-align:right;white-space:nowrap;">16.2%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">米国債券（BND）</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">323万円</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">5.5%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">8.6%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">現金</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">300万円</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">5.1%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">0%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">オルカン</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">193万円</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">3.3%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">15.3%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">新興国株</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">162万円</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">2.8%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">25.5%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">ビットコイン</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">99万円</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">1.7%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;white-space:nowrap;">47.7%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;">合計（単純に足すと）</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">5,831万円</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">100%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;white-space:nowrap;">15.0%</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">直近1年の日次データ（205日ぶん）から計算。外国の資産は為替をかけて円ベースにしています。金額は2026年7月末時点</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:8px;">※日本の高配当株が前回の15.0%ではなく16.2%なのは、使った日数が違うためです。前回は東京市場の242日を使えましたが、今回はアメリカの市場や為替と日付をそろえる必要があり、両方が開いていた205日で計算しています</div>
</div>

表のいちばん下が<strong>15.0%</strong>だ。これは<strong>それぞれのリスクに、金額の大きさをかけて足しただけ</strong>の数字になる。S&P500のリスクとたまたま同じ数字になっているけれど、別のものだ。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:12px;">🔢 15.0%の出し方</div>
  <div style="font-size:13px;color:#5a4a3a;line-height:1.9;">
    15.0%（S&P500）× 59.0% ＋ 16.2%（日本株）× 22.6% ＋ 8.6%（BND）× 5.5% ＋ …<br />
    こうやって全部を足すと、<strong>15.0%</strong>になる。
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">これは「持っているもの全部が、いつも同じタイミングで上がったり下がったりする」と仮定した場合の数字です</div>
</div>

つまり<strong>15.0%は、全部が足並みをそろえて動いたときの数字</strong>だ。

でも実際には、そんなことは起きていない。<strong>ある日はこっちが下がって、あっちが上がっている</strong>。それを計算に入れると、どうなるのか。

---

## 2. 打ち消し合いを入れると、11.4%になった

実際の値動きを計算に入れるには、<strong>足し算ではなく、毎日の動きそのものを合成する</strong>必要がある。手順はこうだ。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">🔢 11.4%の出し方</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#3a5030;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">①</span><span><strong>その日、資産全体がいくら動いたかを出す</strong>。たとえばS&P500が−1.0%、日本の高配当株が+0.5%だった日なら、保有比率をかけて合成する</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">②</span><span>それを<strong>1年ぶん（205日）並べる</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">③</span><span>その<strong>振れ幅を測って、年あたりに直す</strong></span></div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">①の時点で、片方が下がって片方が上がった日は打ち消し合っています。1章の足し算にはなかった部分です</div>
</div>

上の例でいうと、S&P500が−1.0%でも日本株が+0.5%なので、<strong>資産全体としては−1.0%より小さく済んでいる</strong>。こういう日が積み重なる。

その結果が、これだった。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 足し算と、実際に測った数字</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>① 単純に足すと（1章）</span><span style="text-align:right;white-space:nowrap;">15.0%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>② 打ち消し合いを入れると</span><span style="text-align:right;white-space:nowrap;">11.4%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>差（分散で消えたぶん）</span><span style="text-align:right;white-space:nowrap;">3.6ポイント</span>
    </div>
  </div>
</div>

<strong>3.6ポイントぶんが、分散で消えている。</strong>持っているものが、同じタイミングでは動いていないからだ。

金額にすると、1年後の目安はこうなる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 1年後の資産の目安（配当を除く）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>ふつうの1年（約68%の確率）</span><span style="text-align:right;white-space:nowrap;">±667万円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>荒れた1年（約95%の確率）</span><span style="text-align:right;white-space:nowrap;">±1,335万円</span>
    </div>
  </div>
</div>

±667万円。日本株だけのときは±200万円だったので、<strong>金額としては大きくなった</strong>。持っている総額が増えれば当然だ。

でも<strong>割合としては下がっている</strong>。ここが今回いちばん知りたかったところだった。

では、<strong>どれとどれが打ち消し合っていた</strong>のか。

---

## 3. 効いていたのは、日本の高配当株だった

一緒に動くかどうかは、<strong>相関</strong>という数字で表す。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">📐 相関の読み方</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">1に近い</span><span>ぴったり一緒に動く。片方が下がると、もう片方も下がる</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">0に近い</span><span><strong>まったく関係なく動く</strong>。片方が下がっても、もう片方は知らんぷり</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">マイナス</span><span>逆に動く。片方が下がると、もう片方は上がる</span></div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">1章の15.0%は、この相関が全部「1」だと仮定した数字にあたります</div>
</div>

わたしの資産で測った結果が、これだ。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 どれとどれが、一緒に動いているか</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:420px;display:grid;grid-template-columns:1.2fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12px;line-height:1.5;">
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">日本<br />高配当</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">S&P<br />500</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">オル<br />カン</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">新興<br />国</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">BND</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;">日本の高配当株</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;text-align:center;">1.00</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;text-align:center;">0.39</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;text-align:center;">0.48</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;text-align:center;">0.43</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;text-align:center;">0.34</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;">S&P500</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.39</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">1.00</div>
    <div style="background:#fdf3f0;padding:8px 6px;color:#b0563a;font-weight:700;text-align:center;">0.97</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.64</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.64</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;">オルカン</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.48</div>
    <div style="background:#fdf3f0;padding:8px 6px;color:#b0563a;font-weight:700;text-align:center;">0.97</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">1.00</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.76</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.61</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;">新興国株</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.43</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.64</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.76</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">1.00</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.43</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;">米国債券BND</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.34</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.64</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.61</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">0.43</div>
    <div style="background:#fbfdfa;padding:8px 6px;color:#3a5030;text-align:center;">1.00</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">過去5年を1か月ごとに区切って計算（60個ぶん）。ビットコインは表から省きました（S&P500とは0.44、日本の高配当株とは−0.02）</div>
</div>

いちばん上の行を見てほしい。<strong>日本の高配当株は、どれと比べても0.34〜0.48</strong>にとどまっている。S&P500とは0.39、BNDとは0.34しかない。

日本の高配当株が入らない組み合わせは0.43〜0.97なので、<strong>ここだけ明らかに別の動きをしている</strong>。

### 日経平均やTOPIXと比べると、もっとはっきりする

「日本株だから、アメリカと離れているのは当たり前では」とも思ったので、日本の指数とも比べてみた。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 S&P500との相関</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>わたしの日本株117銘柄</span><span style="text-align:right;white-space:nowrap;">0.39</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>日経平均</span><span style="text-align:right;white-space:nowrap;">0.64</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>TOPIX</span><span style="text-align:right;white-space:nowrap;">0.59</span>
    </div>
  </div>
</div>

<strong>日経平均が0.64、TOPIXが0.59</strong>。それに対してわたしの117銘柄は<strong>0.39</strong>だった。

つまり<strong>「日本株だから」ではなく「わたしの選んだ日本株が、指数よりさらにアメリカから離れている」</strong>ということになる。日経平均は値がさのハイテク株の影響が大きく、アメリカと一緒に動きやすい。一方わたしの117銘柄は、国内で商売をしている中小型の会社が多い。その差が出たのだと思う。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      にっけいより はなれてるんだ🐾
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
      そうなの。狙ってたわけじゃないんだけどね。
    </div>
  </div>
</div>

</div>

[7月の月次レポート](/blog/monthly-report-2026-07)で「日本の高配当株が伸びて、インデックスのマイナスを打ち消した」と書いた。あのときは<strong>今月はたまたまそうなった</strong>くらいに思っていた。

でも数字で見ると、たまたまではなかった。日本の高配当株は、[配当を受け取るために持っている](/blog/dividend-goal-progress)つもりだったけれど、<strong>資産全体を揺れにくくする役目も、同時に果たしていた</strong>ことになる。

---

## 4. 都合の悪い数字①：オルカンとS&P500は、ほぼ同じものだった

ここからが正直に書いておきたい部分だ。

表のなかで、<strong>いちばん高い相関が0.97</strong>だった。<strong>オルカンとS&P500</strong>の組み合わせだ。

1.00がぴったり同じ動きなので、0.97は<strong>ほとんど同じもの</strong>ということになる。

理由ははっきりしている。[以前の記事でも書いた](/blog/which-currency-to-hold)けれど、<strong>オルカンの中身の6割超はアメリカの会社</strong>だ。世界中に分散していると言っても、いちばん大きい部分がアメリカなので、S&P500とほぼ同じ動きになる。

つまり<strong>わたしが持っているオルカン193万円は、分散という点ではほとんど働いていない</strong>。S&P500を193万円ぶん多く持っているのと、ほぼ変わらない。

これは知らなかったわけではない。ただ<strong>0.97という数字にしてみると、思っていた以上に同じ動きをしていた</strong>。

---

## 5. 都合の悪い数字②：債券なのに、株と6割ほど一緒に動いていた

もうひとつ。<strong>米国債券BNDと、S&P500の相関が0.64</strong>だった。

債券は本来、株が下がったときに支えてくれる存在として持っている。だから相関は低いほどありがたい。それが<strong>0.64ということは、6割ほどは株と一緒に動いている</strong>ことになる。

原因は<strong>為替</strong>だ。

BNDはドル建ての商品なので、円で見ると<strong>「債券の値動き」と「ドル円の値動き」が両方乗る</strong>。そしてS&P500にも同じドル円が乗っている。<strong>共通の要素が入っているぶん、一緒に動いてしまう</strong>。

数字で見ると、はっきりする。<strong>BNDはドルで見れば年率6.2%しか動かない</strong>、とても穏やかな資産だ。それが<strong>円で持つと8.6%</strong>になる。ドル円そのものが10.6%動いているので、そのぶんが乗っている。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:12px;">💱 いま気づいたこと</div>
  <div style="font-size:13px;color:#5a4a3a;line-height:1.9;">
    わたしの資産の<strong>70.6%がドル建て</strong>（S&P500・オルカン・新興国株・BND）だ。ということは、<strong>ドル円が動くと、その7割が同じ方向にまとめて動く</strong>。<br />
    銘柄も国も分けているつもりだったけれど、<strong>通貨という一本の軸では、かなり集中している</strong>ことになる。
  </div>
</div>

ここまで来て、3章の答えがつながった。<strong>日本の高配当株が効いていたのは、ドル円が乗っていない資産だから</strong>だ。現金300万円も同じで、円のまま置いてある。

<strong>わたしの資産で「ドル円の影響を受けない」のは、日本株1,315万円と現金300万円だけ</strong>。全体の27.7%にあたる。この2つが、残りの7割を支える形になっている。

これは前から自覚していて、[通貨の記事](/blog/which-currency-to-hold)にも書いた。それでも<strong>いまのドル中心でいい</strong>と思っているので、変えるつもりはない。ただ<strong>「分散できている」と思いすぎないようにしよう</strong>とは思った。

---

## 6. ビットコイン47.7%と、現金300万円

残りの2つについても書いておく。

<strong>ビットコインの年率リスクは47.7%</strong>だった。表のなかで断トツに荒い。S&P500の3倍以上だ。

それでも困っていないのは、<strong>保有額が99万円で、全体の1.7%しかない</strong>からだ。1.7%が半分になっても、全体では0.85%減るだけになる。<strong>荒いものは、小さく持てば効かない</strong>。前回、117銘柄のなかでいちばん荒い銘柄が62%でも全体に響かなかったのと、同じ理屈だ。

ちなみにビットコインは、<strong>日本の高配当株との相関が−0.02</strong>とほぼゼロだった。分散という意味では、実はいちばん独立して動いている。ただし荒すぎるので、<strong>増やす気にはならない</strong>。

逆に効いていたのが<strong>現金300万円</strong>だ。

現金はリスク0%なので、持っているだけで全体の数字を下げる。実際に計算すると、<strong>現金を除いたリスク資産だけなら12.1%、現金を入れると11.4%</strong>だった。<strong>0.7ポイント下げている</strong>ことになる。

[生活防衛資金として置いている300万円](/blog/emergency-fund-300)は、<strong>数字のうえでも、ちゃんと仕事をしていた</strong>。

---

## 7. わかったこと

計算してみて、いちばん変わったのは<strong>分散という言葉の意味</strong>だった。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">🧭 今回わかったこと</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#3a5030;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">①</span><span>分散とは<strong>「たくさん持つ」ことではなく「別々に動くものを持つ」</strong>ことだった</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">②</span><span>効いていたのは<strong>日本の高配当株</strong>（S&P500との相関0.39）。日経平均0.64・TOPIX0.59より低く、<strong>指数以上にアメリカから離れていた</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">③</span><span><strong>オルカンはS&P500と相関0.97</strong>。中身の6割超がアメリカなので前から知ってはいたが、<strong>数字ではっきり確認できた</strong>。数を増やしても、中身が同じなら分散にはならない</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">④</span><span><strong>ドル建てが70.6%</strong>。銘柄や国は分けていても、通貨では集中している</span></div>
  </div>
</div>

とくに②が意外だった。

<strong>前の晩のアメリカが好調だと、翌朝の日本株も上がることが多い</strong>。だから、もっと連動しているものだと思っていた。実際に測ってみて0.39なら、たしかに関係はある。でも日経平均0.64・TOPIX0.59と比べると、はっきり低い。

日本の高配当株は、<strong>効率だけを考えればインデックス1本のほうがいい</strong>と言われることが多い。わたし自身も[そう書いてきた](/blog/high-dividend-vs-index)。それでも持っているのは、毎月お金が入ってくるほうが自分には続けやすいからだった。

でも今回、<strong>効率とは別のところで、ちゃんと仕事をしていた</strong>ことがわかった。しかも<strong>狙ってそうしたわけではない</strong>。[リベシティで紹介された銘柄](/blog/portfolio-risk-117-stocks)を組み合わせていったら、結果的にそうなっていた。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      たくさん もってても、おなじ うごきなら いみが ないんだね🐾
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
      そう。卵を別のカゴに分けても、同じ棚に置いてたら、棚ごと倒れたら一緒でしょ。
    </div>
  </div>
</div>

</div>

---

## 8. この数字の限界

最後に、この数字からは言えないことも書いておく。

<div class="data-card" style="background:#fafaf7;border:1.5px dashed #ddd8d0;border-radius:16px;padding:20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a7268;margin-bottom:12px;">⚠️ 気をつけていること</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a544c;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>直近1年ぶんの数字</strong>でしかない。期間を変えれば結果も変わる</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>相関は固定ではない</strong>。とくに本当の暴落では、ふだん別々に動くものが<strong>そろって下がる</strong>ことが知られている</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>投資信託は<strong>似た指数のETFで代用</strong>して計算している（オルカンは全世界株ETF、S&P500は指数そのもの）</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>68%・95%という確率は<strong>理論上の目安</strong>。実際の相場はもっと極端に動くことがある</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>相関に使った5年ぶんの計算は、<strong>いまの銘柄と比率を過去に当てはめた</strong>もの。実際の保有記録ではない</span></div>
  </div>
</div>

2つ目がいちばん大事だと思っている。<strong>いま0.39の相関も、[本当の暴落が来れば1に近づく](/blog/sidefire-market-crash-doubt)</strong>。そのときは日本株もインデックスも一緒に落ちる。今回の11.4%は「ふつうの1年」の話でしかない。

それでも、測ってよかった。<strong>自分の資産がどれくらい動くのか、そして何が効いていて何が効いていないのかが、はじめてはっきりした</strong>。

±667万円という数字は、見た瞬間はやっぱり大きい。でも[取り崩さない設計にしている](/blog/four-percent-rule-japan-doubt)ので、動いても売らなくていい。<strong>わかっていれば、動いた日も慌てずに済む</strong>。それがいちばんの収穫だった。

---

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>資産5,831万円のリスクを、<strong>単純に足すと15.0%</strong>。それが<strong>実際に測ると11.4%</strong>だった。差の<strong>3.6ポイントが分散の効果</strong></li>
<li>1年後の目安は、ふつうの年で<strong>±667万円</strong>、荒れた年で±1,335万円</li>
<li>日本とアメリカは市場が開く時間が違うので、<strong>同じ日付で比べると連動が見えない</strong>。日本株とS&P500の連動ぐあいは、日ごと0.09 → 週ごと0.30 → <strong>月ごと5年で0.39</strong>と上がる。低いほうを採るのはずるいので、<strong>相関は月ごと5年の数字</strong>を使った</li>
<li>いちばん効いていたのは<strong>日本の高配当株</strong>。S&P500との相関は<strong>0.39</strong>で、ほかの組み合わせ（0.43〜0.97）より明らかに低い</li>
<li>しかも<strong>日経平均0.64・TOPIX0.59よりも低い</strong>。「日本株だから」ではなく<strong>「選んだ日本株が、指数以上にアメリカから離れていた」</strong>ということだった</li>
<li>逆に<strong>オルカンはS&P500と相関0.97</strong>でほぼ同じもの。中身の6割超がアメリカなので前から知ってはいたが、<strong>数字で確認できた</strong></li>
<li>債券BNDもS&P500と<strong>0.64</strong>。ドルで見れば年率6.2%しか動かないのに、<strong>円で持つと8.6%</strong>になる。ドル円そのものが10.6%動いているから</li>
<li><strong>資産の70.6%がドル建て</strong>。ドル円の影響を受けないのは<strong>日本株と現金だけで27.7%</strong>。この2つが残りの7割を支えていた</li>
<li>ビットコインは年率47.7%と断トツに荒いが、<strong>全体の1.7%しかない</strong>ので響かない。現金300万円は<strong>持っているだけで全体を0.7ポイント下げていた</strong></li>
<li>ただし<strong>本当の暴落では相関が1に近づく</strong>。今回の数字は「ふつうの1年」の話でしかない</li>
</ul>
</div>

## 関連記事

- [高配当株は何銘柄あれば足りる? 自分の117銘柄でリスクを計算したら、答えは「数」ではなかった](/blog/portfolio-risk-117-stocks)
- [インデックスが45万円減ったのに、資産は22万円増えた月【2026年7月】](/blog/monthly-report-2026-07)
- [「ドルも危ないのでは?」への答え。ユーロ・スイスフラン、持つならどの通貨がいい?](/blog/which-currency-to-hold)
- [「暴落が来たら詰む」は本当か。3つの下落経験と、リーマン級の想定で答える【サイドFIREの疑問②】](/blog/sidefire-market-crash-doubt)

---

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の見解・体験のシェアです。特定の銘柄・金融商品への投資を推奨・勧誘するものではありません。掲載しているリスクや相関の数値は、直近1年のデータをもとにClaude（クロちゃん）に計算してもらった目安で、正確性を保証するものではなく、期間や計算方法を変えれば結果は変わります。将来の値動きを予測するものでもありません。とくに相場全体が急落する局面では、ここで示した分散の効果は弱まります。投資は価格が変動し、元本を割り込む可能性があります。必ずご自身の判断と責任で行ってください。
</div>
