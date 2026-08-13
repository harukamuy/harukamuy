---
title: "資産5,831万円の年率リスクを計算したら11.4%。分散が効いていたのは、思っていたところではなかった"
date: "2026-08-11"
category: "sidefire"
excerpt: "先日、日本株117銘柄だけのリスクを測りました。では資産全体だと、いくつになるのか。単純に足すと15.0%のはずが、実際に測ると11.4%。差の3.6ポイントが分散の効果でした。さらに「どれとどれが一緒に動いているか」を調べたところ、効いていたのは日本の高配当株でした。その1,315万円をまるごとS&P500に替えると11.4%が13.8%になります。逆に、S&P500を大きく持つわたしにはオルカンの上乗せが効いていませんでした。都合の悪い数字も出たので、そこも含めて書きます。"
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
      それが気になって、ぜんぶ測ったの。揺れ方は、日本株だけのときより小さかった。
    </div>
  </div>
</div>

</div>

先日、[わたしが持っている日本株117銘柄のリスクを計算](/blog/portfolio-risk-117-stocks)したら<strong>年率15.0%</strong>だった。1銘柄ずつだと平均27.1%あるのに、まとめると15.0%まで下がる。分散が効いているのがはっきり見えて、けっこううれしかった。

でも、あれは<strong>117銘柄ぶん、1,315万円だけ</strong>の数字だ。わたしの資産はそれだけではない。インデックス、債券、ビットコイン、現金もある。（前回の15.0%が、この記事では16.2%になっている理由は、次の表の下に書いた）

<strong>全部あわせたら、いくつになるんだろう。</strong>

気になったので、[クロちゃん](/blog/video-producer-ai-daily-use)（わたしはClaudeをこう呼んでいる）にまとめて計算してもらった。<strong>都合の悪い数字も出た</strong>ので、そこも含めて書いておく。

---

## 1. まず、単純に足してみる

いま持っているものを全部並べる。日本株117銘柄は、あとで日経平均やTOPIXとも比べるので、<strong>この記事では「MY高配当株」と呼ぶ</strong>。

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
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">MY高配当株</div>
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
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">直近1年の日次データ（205日ぶん）から計算。外国の資産は為替をかけて円ベースにしています。金額は2026年7月末時点。この表のリスクは1日ごとで測っていますが、3章で使う「相関」だけは過去5年を1か月ごとで測っています（理由は3章で書きます）</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:8px;">※MY高配当株は前回の記事では15.0%でしたが、ここでは16.2%です。日米の市場が両方開いていた日にそろえて計算しているためです</div>
</div>

表のいちばん下が<strong>15.0%</strong>だ。これは<strong>それぞれのリスクに、持っている割合をかけて足しただけ</strong>の数字になる。S&P500単体と同じ15.0%になっているが、これは偶然だ。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:12px;">🔢 15.0%の出し方</div>
  <div style="font-size:13px;color:#5a4a3a;line-height:1.9;">
    15.0%（S&P500）× 59.0% ＋ 16.2%（MY高配当株）× 22.6% ＋ 8.6%（BND）× 5.5% ＋ …<br />
    こうやって全部を足すと、<strong>15.0%</strong>になる。
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">これは「持っているもの全部が、いつも同じタイミングで上がったり下がったりする」と仮定した場合の数字です</div>
</div>

つまり<strong>15.0%は、全部が足並みをそろえて動いたときの数字</strong>だ。

でも実際には、そんなことは起きていない。<strong>ある日はこっちが下がって、あっちが上がっている</strong>。それを計算に入れると、どうなるのか。

---

## 2. 打ち消し合いを入れると、11.4%になった

実際の値動きを計算に入れるには、<strong>足し算ではなく、毎日の動きそのものを合成する</strong>。やっていることは、こうだ。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">🔢 11.4%の出し方</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#3a5030;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">・</span><span><strong>その日、資産全体がいくら動いたかを出す</strong>。たとえばS&P500が−1.0%、MY高配当株が+0.5%だった日なら、保有比率をかけて合成する</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;">・</span><span><strong>それを205日ぶん並べて、ばらつきの大きさを測る</strong></span></div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">片方が下がって片方が上がった日は、ここで打ち消し合っています。1章の足し算にはなかった部分です</div>
</div>

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

11.4%というのは、<strong>1年でだいたいこれくらい上下する</strong>という幅のことだ。5,831万円の11.4%（端数まで入れると11.44%）なので、金額にすると667万円になる。1年後の目安は、こうなる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 1年後の資産の目安（配当を除く）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>ふつうの1年（約68%の確率）</span><span style="text-align:right;white-space:nowrap;">±667万円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>荒れた1年（約95%の確率）</span><span style="text-align:right;white-space:nowrap;">±1,334万円</span>
    </div>
  </div>
</div>

±667万円。前回、MY高配当株だけを測ったとき（15.0%）は±200万円だったので、<strong>金額としては大きくなった</strong>。持っている総額が増えれば当然だ。

でも<strong>割合としては下がっている</strong>。ここが今回いちばん知りたかったところだった。

では、<strong>どれとどれが打ち消し合っていた</strong>のか。

---

## 3. 効いていたのは、MY高配当株だった

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

リスクは直近1年を1日ごとで測ったけれど、<strong>相関だけは過去5年を1か月ごと</strong>で測っている。なぜ相関だけ長い期間を使うのか。<strong>時差</strong>があるからだ。

日本の朝の相場は、<strong>前の晩のアメリカを受けて動いている</strong>。「昨日ニューヨークが下げたから、今朝の日本株も安い」というのは、よくあることだ。

ということは、<strong>同じ日付どうしで比べると、この関係が見えなくなる</strong>。日本の「今日」と、アメリカの「今日」は、実際には別のタイミングの出来事だからだ。

実際に、区切る長さを変えて測ったら、はっきり出た。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 長く区切るほど、本当の関係に近づく（S&P500との相関）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:360px;display:grid;grid-template-columns:1.2fr 0.8fr 0.8fr 0.9fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">1日<br />ごと</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">1週間<br />ごと</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:center;">1か月ごと<br />（5年）</div>
    <div style="background:#fff6ea;padding:9px 8px;color:#a85f3c;font-weight:700;">MY高配当株</div>
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

MY高配当株は<strong>0.09 → 0.30 → 0.39</strong>と上がっていく。区切りを長くするほど、時差のズレが中に吸収されるからだ。一方<strong>オルカンは0.96 → 0.96 → 0.97とほとんど動かない</strong>。アメリカと同じ時間帯で動いているので、そもそもズレがない。

<strong>低いほうの0.09を採って「分散できています」と書くのは、さすがにずるい</strong>と思った。なので相関は、いちばん落ち着いた<strong>1か月ごと・5年ぶん</strong>の数字を使う。

わたしの資産で測った結果が、これだ。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 どれとどれが、一緒に動いているか</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:420px;display:grid;grid-template-columns:1.2fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12px;line-height:1.5;">
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">MY<br />高配当</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">S&P<br />500</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">オル<br />カン</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">新興<br />国</div>
    <div style="background:#e6efe0;padding:8px 6px;font-weight:700;color:#4a6640;text-align:center;">BND</div>
    <div style="background:#fff6ea;padding:8px 6px;color:#a85f3c;font-weight:700;">MY高配当株</div>
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
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">過去5年を1か月ごとに区切って計算（60個ぶん）。ビットコインは表から省きました（S&P500とは0.44、MY高配当株とは−0.02）</div>
</div>

いちばん上の行を見てほしい。<strong>MY高配当株は、どれと比べても0.34〜0.48</strong>にとどまっている。S&P500とは0.39、BNDとは0.34しかない。

MY高配当株が入らない組み合わせは、6組のうち<strong>5組が0.61以上</strong>だ。<strong>その5組より、はっきり低い</strong>。

思い当たることがあった。[7月の月次レポート](/blog/monthly-report-2026-07)で「日本の高配当株が伸びて、インデックスのマイナスを打ち消した」と書いた。あのときは<strong>今月はたまたまそうなった</strong>くらいに思っていた。

でも数字で見ると、たまたまではなかった。MY高配当株は、[配当を受け取るために持っている](/blog/dividend-goal-progress)つもりだったけれど、<strong>資産全体を揺れにくくする役目も、同時に果たしていた</strong>ことになる。

### 日経平均やTOPIXと比べると、もっとはっきりする

「日本株だから、アメリカと離れているのは当たり前では」。そう言われそうな気がしたので、日本の指数とも比べた。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 S&P500との相関</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>MY高配当株</span><span style="text-align:right;white-space:nowrap;">0.39</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>日経平均</span><span style="text-align:right;white-space:nowrap;">0.64</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>TOPIX</span><span style="text-align:right;white-space:nowrap;">0.59</span>
    </div>
  </div>
</div>

<strong>日経平均が0.64、TOPIXが0.59</strong>。それに対してMY高配当株は<strong>0.39</strong>だった。

つまり<strong>「日本株だから」だけではなく「MY高配当株が、指数よりさらにアメリカから離れている」</strong>ということになる。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      にっけいよりも、アメリカと はなれてるんだ🐾
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
      そうなの。日経より離れてるとは思ってなかった。
    </div>
  </div>
</div>

</div>

### 置き換えて計算したら、2.4ポイントだった

では、どれくらい効いていたのか。試しに<strong>MY高配当株1,315万円を、まるごとS&P500に置き換えて</strong>計算し直してもらった。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 MY高配当株をS&P500に置き換えたら</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>いまの配分</span><span style="text-align:right;white-space:nowrap;">11.4%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>1,315万円をS&P500に置き換え</span><span style="text-align:right;white-space:nowrap;">13.8%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
      <span>差</span><span style="text-align:right;white-space:nowrap;">2.4ポイント</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">ほかの資産と現金はそのまま。本文の11.4%と同じ期間・同じ方法で計算しています。2.4ポイントは置き換えたときの差、3.6ポイントは単純な足し算との差なので、3.6から2.4を引いても意味のある数字にはなりません。なお、揺れを下げるだけなら、現金を増やしても下がります（8章）</div>
</div>

<strong>2.4ポイント</strong>。この1,315万円が、それだけ全体の揺れを下げていたことになる。

2章では、分散で3.6ポイント消えていると書いた。置き換えたあとの配分で、1章と2章の計算をやり直してみる。単純に足したほうは15.0%から14.7%に下がり、打ち消し合いを入れたほうは13.8%。<strong>分散で消えるぶんは、3.6ポイントから0.9ポイントに縮む</strong>。<strong>資産の22.6%しかない部分が、分散の大半を引き受けていた</strong>ことになる。

ただ、<strong>なぜ日経平均よりアメリカから離れているのか</strong>。その理由は、このあとの都合の悪い数字のほうから出てきた。

---

## 4. 都合の悪い数字①：S&P500を持っているところに、オルカンを足しても同じだった

ここからが正直に書いておきたい部分だ。

表のなかで、<strong>いちばん高い相関が0.97</strong>だった。<strong>オルカンとS&P500</strong>の組み合わせだ。

1.00がぴったり同じ動きなので、0.97は<strong>ほとんど同じもの</strong>ということになる。

理由ははっきりしている。[以前の記事でも書いた](/blog/which-currency-to-hold)けれど、<strong>オルカンの中身の6割超はアメリカの会社</strong>だ。世界中に分散していると言っても、いちばん大きい部分がアメリカなので、S&P500とほぼ同じ動きになる。

つまり<strong>わたしが持っているオルカン193万円は、分散という点ではほとんど働いていない</strong>。S&P500を193万円ぶん多く持っているのと、ほぼ変わらない。

なおこれは<strong>S&P500を大きく持っているわたしの話</strong>で、オルカン1本で持っている人には当てはまらない。それに、ここで言っているのは<strong>2つの商品が似た値動きをする</strong>という話だ。オルカンやS&P500の中身が分散されていない、という意味ではない。オルカンは約3,000銘柄、S&P500は500社に分かれていて、どこか1社が倒れても全体はほとんど動かない。

---

## 5. 都合の悪い数字②：債券なのに、株とかなり一緒に動いていた

もうひとつ。<strong>米国債券BNDと、S&P500の相関が0.64</strong>だった。

債券は本来、株が下がったときに支えてくれる存在として持っている。だから相関は低いほどありがたい。それが<strong>0.64</strong>ということは、株が下がった月は、こちらも一緒に下がっていることが多いという意味になる。0（まったく無関係）と1.00（ぴったり同じ）のあいだで言えば、<strong>かなり1.00寄り</strong>の位置だ。

原因は<strong>為替</strong>だ。

BNDはドル建ての商品なので、円で見ると<strong>「債券の値動き」と「ドル円の値動き」が両方乗る</strong>。そしてS&P500にも同じドル円が乗っている。<strong>共通の要素が入っているぶん、一緒に動いてしまう</strong>。

数字で見ると、はっきりする。<strong>BNDはドルで見れば年率6.2%しか動かない</strong>、とても穏やかな資産だ。それが<strong>円で持つと8.6%</strong>になる。ドル円そのものが10.6%も動くからだ（債券と為替は逆方向に動くことが多いので、足し算にはならない）。円で持ったとたん、値動きの主役は債券ではなく為替のほうに移る。

<strong>為替ヘッジありの商品を選べば、この部分は消える</strong>。ただしそのぶん手数料がかかるので、わたしはドルのまま持つことを選んでいる。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:12px;">💱 いま気づいたこと</div>
  <div style="font-size:13px;color:#5a4a3a;line-height:1.9;">
    わたしの資産の<strong>70.6%がドル建て</strong>（S&P500・オルカン・新興国株・BND）だ。ということは、<strong>ドル円が動くと、その7割が同じ方向にまとめて動く</strong>。<br />
    銘柄も国も分けているつもりだったけれど、<strong>通貨という一本の軸では、かなり集中している</strong>ことになる。
  </div>
</div>

### ここで、3章の答えが出た

MY高配当株が効いていたのは、まず<strong>ドル円が乗っていない資産だから</strong>だ。

ただしそれだけなら、同じ円建ての日経平均も0.39に近いはずだ。実際は0.64だった。日経平均は値がさのハイテク株の影響が大きく、アメリカと一緒に動きやすい。一方、MY高配当株は国内で商売をしている中小型の会社が多い。

<strong>円で持っていることに、内需の中小型が多いことが重なって0.39になっている</strong>。

<strong>わたしの資産で「ドル円の影響を受けない」のは、MY高配当株1,315万円と現金300万円だけ</strong>。全体の27.7%にあたる。この2つが、7割あるドル建てを支える形になっている（ドル建て70.6%にも入らない1.7%はビットコインで、これも円だけで完結する資産ではない）。

ドル建てが7割という偏りは[通貨の記事](/blog/which-currency-to-hold)にも書いたとおり自覚しているけれど、増やす部分は世界の成長に預けたいので、いまの配分は変えない。

---

## 6. ビットコイン47.7%と、現金300万円

残りの2つについても書いておく。

<strong>ビットコインの年率リスクは47.7%</strong>だった。表のなかで断トツに荒い。S&P500の3倍以上だ。

それでも困っていないのは、<strong>保有額が99万円で、全体の1.7%しかない</strong>からだ。1.7%が半分になっても、全体では0.85%減るだけになる。<strong>荒いものは、小さく持てば効かない</strong>。

ちなみにビットコインは、<strong>MY高配当株との相関が−0.02</strong>とほぼゼロだった。記事のなかで、いちばん0に近い組み合わせだ。ただしS&P500とは0.44あるので、どれとも離れているわけではない。しかも荒すぎるので、<strong>増やす気にはならない</strong>。

逆に効いていたのが<strong>現金300万円</strong>だ。

現金はリスク0%なので、持っているだけで全体の数字を下げる。実際に計算すると、<strong>現金を除いたリスク資産だけなら12.1%、現金を入れると11.4%</strong>だった。<strong>0.7ポイント下げている</strong>ことになる。

[生活防衛資金として置いている300万円](/blog/emergency-fund-300)は、<strong>数字のうえでも、ちゃんと仕事をしていた</strong>。

---

## 7. わかったこと

計算してみて、いちばん変わったのは<strong>資産どうしの分散という言葉の意味</strong>だった。<strong>同じ動きのものを重ねて持つことではなく、別々に動くものを持つこと</strong>だった。

そのうえで意外だったのは、<strong>効いていたのがMY高配当株だった</strong>ことだ。配当のために買っていたものが、<strong>効率とは別のところでちゃんと仕事をしていた</strong>。しかも<strong>狙ってそうしたわけではない</strong>。[リベシティで紹介された銘柄](/blog/portfolio-risk-117-stocks)を組み合わせていったら、結果的にそうなっていた。

逆に、S&P500を大きく持っているわたしが足しても、分散が増えないものもあった。オルカンだ。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      あずきの ばあいは、ふやしても かわらなかったんだね🐾
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
      そう。卵を別のカゴに分けても、同じ棚に置いたら、棚ごと倒れたら一緒でしょ。
    </div>
  </div>
</div>

</div>

ちなみに、全部を計算しなくても使える見分け方がひとつある。<strong>いま持っているものに何かを足すとき、それが「いま多く持っているのと同じ通貨か」を先に見る</strong>。同じ通貨なら、たいてい一緒に動く。わたしがオルカンで気づいたのは、結局それだった。

---

## 8. この数字の限界

最後に、この数字からは言えないことも書いておく。

<div class="data-card" style="background:#fafaf7;border:1.5px dashed #ddd8d0;border-radius:16px;padding:20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a7268;margin-bottom:12px;">⚠️ 気をつけていること</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a544c;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>リスクは直近1年、相関は過去5年</strong>ぶんの数字でしかない。期間を変えれば結果も変わる</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span><strong>相関は固定ではない</strong>。とくに本当の暴落では、ふだん別々に動くものがそろって下がる</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>11.4%は<strong>1日ごとの動きを合成した数字</strong>。日米の時差があるぶん、打ち消し合いをやや多めに拾っている可能性がある</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>相関に使った5年ぶんの計算は、<strong>いまの銘柄と比率を過去に当てはめた</strong>もの。実際の保有記録ではない。日経平均やTOPIXは当時のままの指数なので、<strong>0.39と0.64・0.59は厳密には同じ土俵の数字ではない</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>揺れを下げるだけが目的なら、<strong>現金の比率を上げるほうが手間はかからない</strong>。MY高配当株は配当のために持っていたもので、リスクを下げる手段としてすすめているわけではない</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>この記事は<strong>揺れ幅しか測っていない</strong>。ふつう、揺れを下げれば期待できるリターンも下がる。11.4%が、オルカン1本の15.3%より優れている、という話ではない</span></div>
  </div>
</div>

2つ目がいちばん大事だと思っている。<strong>いま0.39の相関も、[本当の暴落が来れば1に近づく](/blog/sidefire-market-crash-doubt)</strong>。そのときは日本株もインデックスも一緒に落ちる。コロナのときは相場が約3割下がった。同じことがいま起きれば、5,831万円のうち約1,750万円が消える計算になる。<strong>±667万円は「ふつうの1年」の幅であって、暴落のときの幅ではない</strong>。

それでも、測ってよかった。<strong>自分の資産がどれくらい動くのか、そして何が効いていて何が効いていないのかが、はじめてはっきりした</strong>。

±667万円という数字は、見た瞬間はやっぱり大きい。でも[取り崩さない設計にしている](/blog/four-percent-rule-japan-doubt)ので、動いても売らなくていい。<strong>わかっていれば、動いた日も慌てずに済む</strong>。それがいちばんの収穫だった。

---

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>資産5,831万円のリスクを、<strong>単純に足すと15.0%</strong>。それが<strong>実際に測ると11.4%</strong>だった。差の<strong>3.6ポイントが分散で消えたぶん</strong>。1年後の目安は、ふつうの年で<strong>±667万円</strong>、荒れた年で±1,334万円</li>
<li>いちばん効いていたのは<strong>MY高配当株</strong>。S&P500との相関は0.39。この1,315万円をまるごとS&P500に置き換えると、揺れ幅は11.4%から13.8%に上がる。分散で消えるぶんも、3.6ポイントから0.9ポイントに縮む（単純に足したほうは15.0%から14.7%）。<strong>資産の22.6%しかない部分が、分散の大半を引き受けていた</strong></li>
<li>しかも<strong>日経平均0.64・TOPIX0.59よりも低い</strong>。「日本株だから」だけではなく<strong>「MY高配当株が、指数以上にアメリカから離れていた」</strong>。理由は<strong>ドル円が乗っていない円建て資産であること</strong>と、<strong>国内で商売をしている中小型が多いこと</strong>だった</li>
<li>日本とアメリカは市場が開く時間が違うので、<strong>同じ日付で比べると連動が見えない</strong>。MY高配当株とS&P500の連動ぐあいは、日ごと0.09 → 週ごと0.30 → <strong>月ごと5年で0.39</strong>と上がる。低いほうを採るのはずるいので、<strong>相関は月ごと5年の数字</strong>を使った</li>
<li>逆に<strong>オルカンはS&P500と相関0.97</strong>。中身の6割超がアメリカなので前から知ってはいたが、数字で確認できた。<strong>S&P500を大きく持っているわたしには、オルカンを足してもS&P500を増やすのとほぼ同じだった</strong></li>
<li><strong>資産の70.6%がドル建て</strong>。債券BNDまでS&P500と<strong>0.64</strong>になるのは為替のせいで、ドルで見れば年率6.2%しか動かない。ドル円の影響を受けないのは<strong>MY高配当株と現金だけで27.7%</strong>。この2つが、7割あるドル建てを支えていた</li>
<li><strong>荒いものは、小さく持てば効かない</strong>。ビットコインは年率47.7%と断トツに荒いが、全体の1.7%しかないので、半分になっても響かない。逆に<strong>現金300万円は、置いてあるだけで全体を0.7ポイント下げていた</strong></li>
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
この記事はあずき個人の見解・体験のシェアです。特定の銘柄・金融商品への投資を推奨・勧誘するものではありません。掲載しているリスクや相関の数値は、直近1年（相関は過去5年）のデータをもとにClaude（クロちゃん）に計算してもらった目安で、正確性を保証するものではなく、期間や計算方法を変えれば結果は変わります。将来の値動きを予測するものでもありません。とくに相場全体が急落する局面では、ここで示した分散の効果は弱まります。投資は価格が変動し、元本を割り込む可能性があります。必ずご自身の判断と責任で行ってください。
</div>
