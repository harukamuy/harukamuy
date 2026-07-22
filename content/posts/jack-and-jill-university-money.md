---
title: "ジャックとジルの話とは?「大学に行くのは収入のため」を複利で考えてみた"
date: "2026-07-21"
category: "investment"
excerpt: "投資の複利の力を伝える有名な「ジャックとジル」のたとえ話。先に始めて8年でやめたジルと、出遅れて38年続けたジャック、勝つのはどっち?この話を自分の数字で試せるシミュレーターを自作しました。さらに「大学に行くのは収入を上げるため」というよくある議論を、大学に行かず学費410万円を18歳で投資に回したジルと、大卒22歳から65歳まで積み立てるジャックの対決で検証。勝敗の分かれ目は、意外な利回りでした。"
coverImage: "/images/20260720_3.webp"
coverImagePosition: "center"
tags: ["インデックス投資", "初心者向け"]
---

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      ジャックと ジルって、だれ？ おともだち？🐾
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
      投資の世界の有名なたとえ話の主人公だよ。今日はこのふたりと一緒に、早く始めるとどれくらい差がつくのか、計算してみるね。
    </div>
  </div>
</div>

</div>

投資の本やSNSで、ときどき出てくる<strong>「ジャックとジル」</strong>という話がある。複利の力、とくに「早く始めることの価値」を伝える古典的なたとえ話だ。

今日はまず、この話をちゃんと解説する。そして、この話を<strong>自分の数字で遊べるシミュレーター</strong>をブログ内に自作したので、それも紹介したい。

さらに後半では、この複利の考え方を使って、よく議論になるテーマを考えてみる。<strong>「大学に行くのは収入を上げるため」。それって、数字の上では本当なんだろうか?</strong>

---

## 1. ジャックとジルの話とは

設定はシンプルだ。同い年のふたりが、同じ年40万円ずつ積立投資をする。ちがうのは「いつ始めて、いつやめるか」だけ。なお、この話は紹介する本や人によって金額がまちまちなので(元の米国版は「年2,000ドル」が定番)、この記事では年40万円に置き換えて計算する。年齢の設定は定番のまま。金額を変えても、勝敗の構造は変わらない。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">👧👦 ふたりの設定（年40万円ずつ・65歳時点で比較）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;min-width:60px;">ジル</span><span>19〜26歳の<strong>8年間だけ</strong>積み立てて、あとは65歳までほったらかし。元本320万円</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;min-width:60px;">ジャック</span><span>27歳から出遅れてスタート。そのかわり64歳まで<strong>38年間</strong>積み立て続ける。元本1,520万円</span></div>
  </div>
</div>

元本はジャックのほうが<strong>約5倍</strong>多い。ふつうに考えたらジャックの圧勝に見える。ところが、結果はこうなる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 65歳時点の資産（概算）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:13px;line-height:1.6;min-width:420px;">
    <div style="background:#e6efe0;padding:10px 12px;font-weight:700;color:#4a6640;">年利回り</div>
    <div style="background:#e6efe0;padding:10px 12px;font-weight:700;color:#c0704a;text-align:center;">ジル<br /><span style="font-size:11px;font-weight:400;color:#7a5c44;">元本320万円</span></div>
    <div style="background:#e6efe0;padding:10px 12px;font-weight:700;color:#4a6640;text-align:center;">ジャック<br /><span style="font-size:11px;font-weight:400;color:#5a8a50;">元本1,520万円</span></div>
    <div style="background:#fbfdfa;padding:10px 12px;font-weight:700;color:#3a5030;">7%</div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;">約5,700万円</div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;"><strong>約7,400万円 🏆</strong></div>
    <div style="background:#fbfdfa;padding:10px 12px;font-weight:700;color:#3a5030;">10%</div>
    <div style="background:#fff6ea;padding:10px 12px;color:#a85f3c;text-align:center;"><strong>約1.9億円 🏆</strong></div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;">約1.8億円</div>
  </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">毎年はじめに積立・年1回複利・税金や手数料は考慮しない概算。勝敗が入れ替わる分岐点は<strong>利回り約8.8%</strong></div>
</div>

利回り10%なら、<strong>元本が5分の1しかないジルが勝つ</strong>。8年分の積立が、39年という長い時間をかけて雪だるまになるからだ。これがこの話の有名なオチで、「早く始めることは、たくさん入金することに匹敵する」という複利の教訓としてよく引用される。

ただ、わたしはこの話の<strong>もうひとつの顔</strong>も大事だと思っている。表のとおり、利回り7%ならジャックが勝つ。つまりこの勝負、じつは<strong>利回りしだいで結果が入れ替わる</strong>。「早さ」も「継続」も、どちらか一方が絶対の正解ではない。そして言うまでもなく、いちばん強いのは<strong>ジルのように早く始めて、ジャックのように長く続ける</strong>ことだ。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      はやく はじめた こが、まけることも あるんだね🐾
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
      そうなの。だから「早く始めて、やめない」が最強なんだよ。どっちかじゃなくて、両方。
    </div>
  </div>
</div>

</div>

---

## 2. 自分の数字で遊べるシミュレーターを作った

この話、条件を変えるとどうなるんだろう?と気になって、<strong>ブログ内にシミュレーターを自作してみた</strong>。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:20px 22px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:10px;">🧮 ジャックとジルの投資シミュレーター（あずき製・無料）</div>
  <div style="font-size:13px;color:#3a5030;line-height:1.9;margin-bottom:12px;">
    ふたりの「最初の一括投資額」「年間積立額」「開始・終了年齢」と利回りを自由に変えて、資産推移のグラフと「勝敗が入れ替わる利回り」を確認できます。一括だけ・積立だけ・両方の組み合わせもOK。古典の設定や、このあと登場する「大学に行かないジル vs 大卒のジャック」もワンタップのプリセットで入っていて、<strong>利回りのスライダーを動かすと勝敗とグラフがリアルタイムで入れ替わる</strong>のが見どころです。
  </div>
  <a href="/tools/jack-and-jill" style="display:inline-block;background:#4a6640;color:#fff;font-weight:700;font-size:13px;padding:10px 18px;border-radius:999px;">シミュレーターで遊んでみる(無料) →</a>
</div>

自分の年齢と積立額を入れてみると、「いま始めた自分」と「10年後に始めた自分」の差も計算できる。ぜひ遊んでみてほしい。

---

## 3. 本題。「大学に行くのは収入のため」は本当か

さて、ここからが今日の本題だ。

進路の話でよく聞く意見に、<strong>「大学に行くのは、将来の収入を上げるため」</strong>というものがある。実際、データの上でも学歴によって生涯賃金には差がある。でも、複利を知ってしまったわたしたちは、こう考えたくなる。<strong>「その学費、もし18歳で投資に回したら、どっちが大きくなるの?」</strong>

まず、材料になる数字を並べてみる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">🎓 大学4年間の学費の目安（2026年時点・授業料等のみ）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;">
      <span>国立大学</span><span>約243万円</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;background:#e8f0e4;padding:6px 4px;border-radius:8px;font-weight:700;">
      <span>私立文系（今回の計算で使う数字）</span><span>約410万円</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;">
      <span>私立理系</span><span>約550万円</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">入学金・授業料・施設費等の概算。下宿するなら生活費が別途かかる。医学部など6年制はこの数倍になる</div>
</div>

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">💼 大卒と高卒の生涯賃金の差（60歳まで・額面）</div>
  <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#3a5030;">
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;">
      <span>男性（高卒 約2.1億 → 大卒 約2.6億）</span><span>差 <strong>約5,000万円</strong></span>
    </div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;">
      <span>女性（高卒 約1.5億 → 大卒 約2.1億）</span><span>差 <strong>約6,000万円</strong></span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">労働政策研究・研修機構「ユースフル労働統計2024」より。正社員で60歳まで働いた場合の推計（退職金含まず）</div>
</div>

生涯賃金の差は、ざっくり<strong>5,000万〜6,000万円</strong>。学費410万円と比べると、「そりゃ大学に行ったほうが得でしょ」と思える差だ。でも、410万円には複利という魔法をかける時間が47年もある。

---

## 4. 対決。大学に行かないジル vs 大卒のジャック

ここからは、記事前半のふたりに「進路」を演じてもらう。設定はこうだ。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">⚔️ 進路のちがう、ふたりの投資プラン</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#3a5030;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;min-width:60px;">ジル</span><span><strong>大学に行かない。</strong>学費になるはずだった410万円を18歳で一括投資し、働きながら28歳まで年40万円を積立。29歳からは追加せず、65歳まで持ち続ける。<strong>元本850万円</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#5a8a50;font-weight:700;flex-shrink:0;min-width:60px;">ジャック</span><span><strong>大学に行く。</strong>410万円は学費に使う。大卒で就職した22歳から65歳まで、ずっと年40万円を積立。<strong>元本1,760万円</strong></span></div>
  </div>
</div>

積み立てた元本は、ジャックのほうが<strong>2倍以上</strong>多い。65歳時点で勝つのは、どちらか。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📊 65歳時点の資産（概算）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:13px;line-height:1.6;min-width:420px;">
    <div style="background:#e6efe0;padding:10px 12px;font-weight:700;color:#4a6640;">年利回り</div>
    <div style="background:#e6efe0;padding:10px 12px;font-weight:700;color:#c0704a;text-align:center;">ジル<br /><span style="font-size:11px;font-weight:400;color:#7a5c44;">元本850万円</span></div>
    <div style="background:#e6efe0;padding:10px 12px;font-weight:700;color:#4a6640;text-align:center;">ジャック<br /><span style="font-size:11px;font-weight:400;color:#5a8a50;">元本1,760万円</span></div>
    <div style="background:#fbfdfa;padding:10px 12px;font-weight:700;color:#3a5030;">3%</div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;">約3,200万円</div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;"><strong>約3,600万円 🏆</strong></div>
    <div style="background:#fbfdfa;padding:10px 12px;font-weight:700;color:#3a5030;">5%</div>
    <div style="background:#fff6ea;padding:10px 12px;color:#a85f3c;text-align:center;"><strong>約7,500万円 🏆</strong></div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;">約6,000万円</div>
    <div style="background:#fbfdfa;padding:10px 12px;font-weight:700;color:#3a5030;">7%</div>
    <div style="background:#fff6ea;padding:10px 12px;color:#a85f3c;text-align:center;"><strong>約1.8億円 🏆</strong></div>
    <div style="background:#fbfdfa;padding:10px 12px;color:#3a5030;text-align:center;">約1.1億円</div>
  </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">毎年はじめに投資・年1回複利・税金や手数料は考慮しない概算。勝敗が入れ替わる分岐点は<strong>利回り約3.7%</strong>。<a href="/tools/jack-and-jill" style="color:#4a6640;">シミュレーター</a>のプリセット「大学に行かないジル vs 大卒のジャック」で再現できます</div>
</div>

<strong>※ただし、この表は「投資のレース」だけの比較。ジャックには、大卒の生涯賃金差(約5,000万〜6,000万円)という"別ポケット"があることを忘れずに読んでほしい。</strong>

利回りが<strong>年3.7%を超えると、ジルが勝つ</strong>。世界株の長期平均に近い5%なら約1,500万円差、7%なら<strong>7,000万円以上の差</strong>をつけて、元本半分以下のジルの勝ちだ。18歳の410万円と、20代の積立。「早いお金」の威力は、それほど大きい。

ただし、これで「大学はムダ」と結論づけるのは、雑すぎる。さっき注記したとおり、ジャックの給与口座には<strong>大卒の賃金差(約5,000万〜6,000万円)がまるごと上乗せされていく</strong>。5%のときの差(約1,500万円)はもちろん、7%の差ですら、賃金差の一部を積立に上乗せすれば<strong>十分にひっくり返せる範囲</strong>だ。投資のレースだけならジルが強い。でも人生の収支は、投資だけでは決まらない。

そしてもうひとつ。この思考実験そのものにも、大事な注意書きがある。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">⚠ この比較の「うのみにできない」ところ</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">①</span><span><strong>生涯賃金の差は「平均」の話</strong>。個人がどちら側になるかは、学歴より本人しだいの部分が大きい</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">②</span><span><strong>47年間、売らずに持ち続けるのは相当むずかしい</strong>。暴落も、使いたくなる誘惑も何度も来る。絵に描いた複利どおりにはいかない</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">③</span><span><strong>国立(約243万円)や奨学金なら、前提の数字がまるごと変わる</strong>。「大学=410万円」は選択肢のひとつにすぎない</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#c0704a;font-weight:700;flex-shrink:0;">④</span><span><strong>18歳のジルが「学費分を全額投資+年40万円の積立」をやり切る前提も、現実にはかなりハードルが高い</strong>。それができる10代は、そう多くない</span></div>
  </div>
</div>

---

## 5. あずきの考え。この計算が本当に教えてくれること

じゃあ、この思考実験は無意味だったのか。わたしはそうは思わない。この計算が本当に教えてくれるのは、「大学か投資か」の答えではなくて、<strong>18歳のお金と時間には、すごく価値がある</strong>という事実だと思う。

元本半分以下のジルが勝ててしまうのは、ジルがすごいからではなく、<strong>18歳からの47年という時間</strong>があるからだ。そしてその時間は、大学に行く人にも行かない人にも、平等に流れている。だから本当の分かれ道は「進学するかどうか」ではない。

- 大学に行くなら、<strong>410万円と4年間を本気で使い倒す</strong>こと。出会い、学び、選択肢。収入だけでは測れない価値を、ちゃんと回収しにいく
- 行かないなら、<strong>浮いたお金と時間の計画を持つ</strong>こと。何もしなければ、410万円の複利も、賃金の差も、どちらも手に入らない

いちばん高くつくのは、大学に行くことでも行かないことでもなく、<strong>目的を持たないままどちらかを選ぶこと</strong>だと思う。

わたし自身は、大学で学んだことがいまの収入に直結しているかと聞かれると、はっきりとは答えられない。でも、あの時間がなければいまの仕事にも、[投資を始めた2018年](/blog/investment-start-2018)にも、たどり着いていなかった気はする。人生の投資は、リターンの出方が複利よりずっと読みにくい。

そして最後に、ジルの話に戻りたい。ジルの武器は、才能でも入金力でもなく<strong>「早さ」</strong>だった。これを読んでいるあなたが何歳でも、人生でいちばん若いのは今日だ。18歳の410万円ほどの爆発力はなくても、[わたしが26歳で始めた5万円](/blog/investment-start-2018)が[8年で5,800万円の一部になった](/blog/asset-growth-5years-real)ように、複利は始めた人の味方をしてくれる。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      おもいたったら、すぐ うごくのが いいんだね🐾
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
      そう。ジルにはなれなくても、今日始めれば「未来のジャック」にはなれるからね。
    </div>
  </div>
</div>

</div>

---

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>ジャックとジルの話とは、複利の力を伝えるたとえ話。8年しか積み立てないジル(元本320万)が、38年積み立てたジャック(元本1,520万)に高利回りだと勝ってしまう</li>
<li>ただし勝敗は利回りしだいで入れ替わる(この設定の分岐点は約8.8%)。最強は「早く始めて、長く続ける」の両取り</li>
<li>条件を自由に変えられる<a href="/tools/jack-and-jill">シミュレーター</a>をブログ内に自作した。自分の数字で試せる</li>
<li>「大学に行くのは収入のため」を検証: 大学に行かず学費410万円を18歳で一括+28歳まで年40万円積立のジル(元本850万)と、大卒22歳から65歳まで年40万円積立のジャック(元本1,760万)を比較。利回り3.7%を超えるとジルが勝ち、5%で約1,500万・7%で7,000万円以上の差がつく</li>
<li>ただしジャックには大卒の生涯賃金差(約5,000万〜6,000万)がまるごと残っている。投資のレースだけならジルが強いが、人生の収支は投資だけでは決まらない</li>
<li>ただし賃金差は平均の話で、47年持ち続ける難しさ・国立や奨学金の選択肢・大卒側の複利など、うのみにできない注意点も多い</li>
<li>この計算の本当の教訓は「18歳のお金と時間には、すごく価値がある」。いちばん高くつくのは、目的を持たないままどちらかを選ぶこと</li>
<li>何歳でも、人生でいちばん若いのは今日。複利は始めた人の味方をする</li>
</ul>
</div>

:::cta
title: SBI証券 — 複利の雪だるまは、口座がないと始まらない
description: ジルの武器は「早さ」でした。オルカン・S&P500の積立も、日本の高配当株も、SBI証券ひとつで始められます。金額は月100円からでも、雪だるまは転がり始めます。わたしが8年使っているメイン口座です。
button: SBI証券の公式サイトを見る →
url: https://h.accesstrade.net/sp/cc?rk=0100piab00orlw
:::

## 関連記事

- [投資を始めた2018年。5万円の成功体験が人生を変えた話](/blog/investment-start-2018)
- [資産1,300万円が、5年で4,886万円に。5年間を実数で振り返ってみた。](/blog/asset-growth-5years-real)
- [新NISA完全ガイド。34歳フリーランスのわたしが、1,800万円を10年で埋める道筋を全部書きます](/blog/new-nisa-complete-guide)
- [サイドFIREはいくら必要?34歳フリーランスが5,000万円で達成した金額の内訳](/blog/sidefire-asset-simulation)

---

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の見解・体験のシェアです。特定の銘柄・金融商品への投資を推奨・勧誘するものではありません。掲載している数字は執筆時点の情報にもとづく概算のシミュレーションで、正確性を保証するものではなく、将来の運用成果を約束するものでもありません。投資は価格が変動し、元本を割り込む可能性があります。進路・教育に関する記述は一般的な統計にもとづくもので、特定の選択を推奨するものではありません。必ずご自身の判断と責任で行ってください。
</div>
