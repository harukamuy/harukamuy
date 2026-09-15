---
title: "S&P500の中身を測ったら＋15.4ポイント。でも稼いでいたのは7社で、残りの440社は高配当ETFと同じだった"
date: "2026-09-15"
coverImage: "/images/20260915_1.png"
category: "investment"
series: "measure-etfs"
seriesOrder: 4
excerpt: "ETFの中身を測るシリーズの最終回はS&P500。わたしが2018年から持っている、いちばん大きな持ち物です。高配当という縛りを外したら、中身はどう見えるのか。504社のうち448社を測ったら、ROIC−WACCは＋15.4ポイント。HDV・SCHD・VYMの＋6〜9ポイントをはるかに超えていました。でも、上位7社を外すと＋6.3ポイントで、高配当3本と同じ水準。資本コストを割っている会社も23.0%で、VYMと同じでした。S&P500の稼ぐ力は、7社が作っていました。9月21日に入る3社も測っています。"
tags: ["ETF", "米国株", "インデックス投資"]
---

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      よんほんめは、あずきが もってるやつ?🐾
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
      そう。8年持っているS&P500。高配当の縛りを外すと、中身がどう見えるかを測るの。
    </div>
  </div>
</div>

</div>

ETFの中身を測るシリーズの4本目、最終回。1本目は[HDV](/blog/hdv-roic-wacc-inside)、2本目は[SCHD](/blog/schd-roic-wacc-inside)、3本目は[VYM](/blog/vym-roic-wacc-inside)。3本とも米国の高配当ETFで、わたしは1本も持っていない。今回の**S&P500**は違う。[2018年に投資を始めたときに選んだ](/blog/orukan-vs-sp500-real)、わたしのいちばん大きな持ち物だ。積立は2024年にオルカン（全世界の株の投資信託）へ切り替えたので、いまは持っているだけ。それでも8月末の[インデックス投信3,934万円](/blog/monthly-report-2026-08)の大半は、これだ。

S&P500そのものは会社のリスト（指数）なので、測ったのは、それに連動するETFのIVV（iシェアーズ・コアS&P500）の中身。**504社**を持ち、純資産は8,226億ドル（9月14日時点）、経費率は0.03%。前の3本と同じく、1社ずつROIC（投じたお金で年に何%稼ぐか）を出し、WACC（株主と債権者が求める見返り、資本コスト）を引く。

結論から言うと、**プラス15.4ポイント**。HDVの＋8.3、SCHDの＋9.3、VYMの＋6.5をはるかに超えていた。高配当の縛りを外すと、稼ぐ力はここまで上がる。

でも、それで終わる話ではなかった。上位の7社（株が2種類ある会社があるので、銘柄では8つ）を外して残りの440社だけで測ると、**プラス6.3ポイント**。高配当3本と同じ水準に落ちる。資本コストを割っている会社も23.0%あって、VYMの22.6%と同じだった。S&P500の稼ぐ力は、7社が作っていた。順番に見ていく。

---

## 1. 測り方は同じ。測れないのは銀行と保険の8.9%

測り方はシリーズで統一している。詳しくは[HDVの記事の1章](/blog/hdv-roic-wacc-inside)に書いたので、今回の値だけ。

<div class="data-card" style="background:#fafaf7;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">📐 ETFの中身の測り方（シリーズ共通）</div>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:#3a5030;line-height:1.8;">
    <div class="keep-grid" style="display:grid;grid-template-columns:90px 1fr;gap:8px;">
      <span style="font-weight:700;">構成銘柄</span><span>iSharesが公表しているIVVの保有一覧（2026年8月20日時点）から、504社と組み入れ比率を取る。HDV・SCHDと同じ日付</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:90px 1fr;gap:8px;">
      <span style="font-weight:700;">ROIC</span><span>1社ずつ、営業利益×（1−実効税率）÷投下資本を<strong>直近3年の平均</strong>で。単年は一時要因でひっくり返るから</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:90px 1fr;gap:8px;">
      <span style="font-weight:700;">WACC</span><span>S&P500は市場そのものなので、市場との連動度（β）は<strong>1.00</strong>。米10年国債4.74%、市場の上乗せ5.5%で組んで<strong>9.6%</strong>。ROICがこれを超えるかどうかの境目を、この記事では「線」と呼ぶ。HDV 6.7%、SCHD 7.6%、VYM 8.1%より高く、4本でいちばん高い線になる</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:90px 1fr;gap:8px;">
      <span style="font-weight:700;">測れないもの</span><span>銀行・保険はROICという物差しが合わないので除く。今回は<strong>56社・8.9%</strong>。JPモルガン（1.4%）、バークシャー・ハサウェイ（1.4%）、バンク・オブ・アメリカ、ゴールドマン・サックスなど。残りの<strong>448社・90.9%</strong>で測る</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">決算数値はYahoo Financeの財務データ（各社の直近3期・おおむね2023〜2025年度）、構成銘柄はiSharesの公表データ、国債利回りは2026年8月21日の米10年債。ROIC・WACCの出し方には流儀があり、ここでの計算は簡便法です。ビザやマスターカードのように、金融に分類されていても投下資本が取れる会社は測っています</div>
</div>

測れた割合は91%で、VYMの79%より広い。S&P500は金融が12.2%あるが、そのほとんどが銀行と保険で、この物差しの外にある。この記事の数字は、**S&P500の9割について言えること**だと思って読んでほしい。

---

## 2. S&P500の選び方にも、「稼ぐ力」の条件はない

高配当3本の選び方は、それぞれ違った。HDVは「堀」（資本コストを超え続ける見込み）で絞り、SCHDは財務の4つの指標で点数をつけ、VYMは配当利回り順に上位半分をそのまま持つ。ではS&P500は、500社をどう選んでいるのか。

<div class="data-card" style="background:#fafaf7;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">🔍 S&P500が500社を選ぶ条件（主なもの）</div>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:#3a5030;line-height:1.8;">
    <div class="keep-grid" style="display:grid;grid-template-columns:24px 1fr;gap:8px;">
      <span>①</span><span>時価総額（株価×株数。会社の値段）が大きいこと。大きい順に500社の入れ物</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:24px 1fr;gap:8px;">
      <span>②</span><span>上場から12か月以上たっていて、株がよく売り買いされていること</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:24px 1fr;gap:8px;">
      <span>③</span><span><strong>直近の四半期が黒字で、直近4四半期の合計も黒字</strong>であること（正式な会計基準で）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:24px 1fr;gap:8px;">
      <span>④</span><span>組み入れ比率は<strong>時価総額</strong>で。入れ替えは指数を作る会社の委員会が随時決める</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">S&Pダウ・ジョーンズ・インデックスの採用基準の要点。<a href="/blog/spacex-sp500-rejected-index-rules">スペースXの記事</a>で書いた、2026年6月に「変えない」と決まった現行ルール。配当の条件はない</div>
</div>

黒字の条件はある。でも「黒字かどうか」と「資本コストを超えて稼いでいるか」は別の話で、**ROICの条件はない**。配当の条件もない。つまりS&P500は、大きくて、黒字で、よく取引される会社を、大きい順にそのまま持つ入れ物だ。

ちょうど、[9月21日に3社が入れ替わる](/blog/sp500-rebalance-trade-desk-bloom)。入る3社と出る3社を、同じ物差しで測っておく。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">🔁 9月21日に入る3社・出る3社のROIC（3年平均）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:340px;display:grid;grid-template-columns:0.6fr 1.6fr 0.8fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.7;">
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;">会社</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">入る</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;">ブルーム・エナジー（燃料電池）</div><div style="background:#ffffff;padding:9px 8px;color:#a85f3c;text-align:right;">−1.4%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">入る</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">イルミナ（遺伝子解析）</div><div style="background:#fbfdfa;padding:9px 8px;color:#a85f3c;text-align:right;">5.8%</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">入る</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;">エバーピュア（データ保存）</div><div style="background:#ffffff;padding:9px 8px;color:#a85f3c;text-align:right;">5.4%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">出る</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">トレードデスク（ネット広告）</div><div style="background:#fbfdfa;padding:9px 8px;color:#4a6640;text-align:right;">11.3%</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">出る</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;">ビルダーズ・ファーストソース（住宅建材）</div><div style="background:#ffffff;padding:9px 8px;color:#4a6640;text-align:right;">14.6%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">出る</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">モルソン・クアーズ（ビール）</div><div style="background:#fbfdfa;padding:9px 8px;color:#a85f3c;text-align:right;">7.3%</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">資本コストの線は9.6%。入る3社は3社とも線の下、出る3社のうち2社は線の上。入れ替えの中身は<a href="/blog/sp500-rebalance-trade-desk-bloom">9月6日の記事</a>に</div>
</div>

出ていく3社は、株価が下がって時価総額が小さくなった会社だ（トレードデスクは1年で株価が8割減った）。小さくなれば出ていき、大きくなれば入ってくる。**S&P500が見ているのは大きさで、稼ぐ力ではない**。この表が、その実例だ。

---

## 3. 測ったら＋15.4ポイント。3本をはるかに超えた

448社を1社ずつ測って、組み入れ比率で加重した。比率で並べたときの真ん中の会社の値（中央値）も添える。4本を並べる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">⚖️ 4本の中身を、日米平均と並べる</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:380px;display:grid;grid-template-columns:1.6fr 0.8fr 0.8fr 0.8fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.7;">
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">WACC</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">差</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;"><strong>S&P500（加重平均）</strong></div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;"><strong>25.0%</strong></div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">9.6%</div><div style="background:#ffffff;padding:9px 8px;color:#a85f3c;text-align:right;"><strong>＋15.4pt</strong></div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">S&P500（中央値）</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">17.3%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">9.6%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋7.7pt</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">SCHD（加重平均）</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">16.8%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">7.6%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">＋9.3pt</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">HDV（加重平均）</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">15.1%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">6.7%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋8.3pt</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">VYM（加重平均）</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">14.6%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">8.1%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">＋6.5pt</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">米国の主要企業の平均</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">12.5%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">7.3%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋5.3pt</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">日本の主要企業の平均</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">6.37%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">6.41%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">−0.04pt</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">日米の平均は経産省「成長投資ガイダンス データ集」（2020〜2024年平均）。4本は直近3期の平均で、WACCはそれぞれのβから。期間と方法が違うので、目安として並べています。差は丸める前の値で計算しているので、表の引き算とは0.1ポイントずれることがあります</div>
</div>

加重平均は**ROIC 25.0%**。WACCの9.6%を引くと、差は**15.4ポイント**。資本コストの線が4本でいちばん高いのに、差がいちばん大きい。高配当3本が＋6〜9で並んでいたところに、1本だけ飛び抜けた数字が来た。

ただ、加重平均25.0%と中央値17.3%の開きが大きい。3本ではいちばん開いたHDVでも4ポイントだったのが、ここでは8ポイント近い。加重平均は、大きく持っている会社の値に引っ張られる。開きが大きいということは、**大きく持っている会社ほど、飛び抜けて稼いでいる**ということだ。5章で、そこを分けてみる。

上位10社を並べておく。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">🏢 S&P500の上位10社と、そのROIC（3年平均）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:320px;display:grid;grid-template-columns:1.8fr 0.7fr 0.7fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.7;">
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;">銘柄</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">比率</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">エヌビディア</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">8.0%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">68.7%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">アップル</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">6.9%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">59.6%</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">マイクロソフト</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">5.4%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">26.9%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">アマゾン</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">3.9%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">13.6%</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">アルファベット（グーグル）A株</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">3.0%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">25.1%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">ブロードコム</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">2.6%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">13.1%</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">アルファベット C株</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">2.4%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">25.1%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">メタ（フェイスブック）</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">1.8%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">24.0%</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">マイクロン・テクノロジー</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">1.7%</div><div style="background:#ffffff;padding:9px 8px;color:#a85f3c;text-align:right;">2.9%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">イーライリリー</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">1.5%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">30.3%</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">比率はiShares公表の2026年8月20日時点。上位10社で37.3%。アルファベットは議決権の違う2種類の株が別々に入っている。WACC 9.6%を下回るのは、マイクロンだけ</div>
</div>

上位10社で37.3%。HDVの52.1%ほど濃くはないが、VYMの26.1%よりずっと濃い。そしてエヌビディアが68.7%、アップルが59.6%。3本では見なかった数字だ。高配当ETFの上位に並んでいたのは、エクソンモービル10.0%、ブロードコム13.1%、ジョンソン・エンド・ジョンソン17.4%。同じ「上位10社」でも、稼ぐ力の桁が違う。

---

## 4. 割れているのは23.0%。VYMと同じ

3年平均のROICがWACCの9.6%に届かないのは**195社**。組み入れ比率で20.9%、測れた分に対して**23.0%**。VYMの22.6%とほぼ同じで、HDVの14.7%、SCHDの7.6%より多い。

社数で数えると、もっと多い。448社のうち195社、**44%が線の下**だ。比率だと23%で済むのは、割れている会社が小さいから。ここにも「大きい会社ほど稼いでいる」が出ている。

<div class="data-card" style="background:#fff5e8;border:1.5px solid #d4957e;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#a85f3c;margin-bottom:12px;">📉 資本コストを割っている会社（S&P500全体の20.9%）の中身（左の数字は組み入れ比率）</div>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:#5a4030;line-height:1.8;">
    <div class="keep-grid" style="display:grid;grid-template-columns:110px 1fr;gap:8px;">
      <span style="font-weight:700;">IT 6.0%</span><span><strong>マイクロン（比率1.7%・ROIC 2.9%）</strong>、AMD（1.2%・2.7%）、<strong>インテル（0.7%・−0.8%）</strong>、マーベル、クラウドストライク（0.3%・−2.8%）など23社。半導体は好況と不況の波が大きく、3年のうちに不況の年が入ると平均が沈む。マイクロンの直近1年は13.2%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:110px 1fr;gap:8px;">
      <span style="font-weight:700;">資本財 2.6%</span><span>RTX（0.4%・5.2%）、GEベルノバ、<strong>ボーイング（0.3%・−9.6%）</strong>など24社。ボーイングは直近1年も−7.8%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:110px 1fr;gap:8px;">
      <span style="font-weight:700;">ヘルスケア 2.4%</span><span>サーモフィッシャー（0.4%・8.4%）、アボット（0.3%・9.5%）など26社。線に少し届かない会社が多い</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:110px 1fr;gap:8px;">
      <span style="font-weight:700;">公益・不動産 3.5%</span><span>公益は31社中<strong>29社</strong>、不動産は30社中<strong>27社</strong>が線の下。ほぼ全員。料金規制と、借金で建物を持つ商売の宿命</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:110px 1fr;gap:8px;">
      <span style="font-weight:700;">その他 6.4%</span><span>テスラ（1.5%・7.0%）、シェブロン（0.6%・7.2%）、ベライゾン、AT&T、ディズニー、セールスフォースなど</span>
    </div>
  </div>
  <div style="font-size:11px;color:#9a7a60;margin-top:12px;border-top:1px dashed #d4957e;padding-top:10px;">S&P500は資本コストの線が9.6%と高いので、線の高さも割れを増やしている。VYMと同じ8.1%で切ると割れは18.8%、HDVと同じ6.7%なら14.5%（いずれも測れた分に対して）。線をそろえるとVYMより少なく、HDVと同じくらい</div>
</div>

顔ぶれが、高配当3本とは違う。3本の割れは公益とエネルギーが主役だった。S&P500の割れの主役は**IT**で、マイクロン、AMD、インテルの半導体3社だけで3.5%ある。マイクロンは、[JTで学んだ](/blog/jt-2914-roic-wacc)「単年で判断しない」が逆向きに効いている会社で、単年で見れば線の上にいる。

テスラも線の下にいる。時価総額は上位10社のすぐ下なのに、ROICは7.0%。稼ぐ力より先に値段が大きくなった会社も、この入れ物には入る。

---

## 5. 7社を外したら、高配当ETFと同じだった

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      7しゃだけで、そんなに ちがうの?🐾
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
      違うの。だから7社を外して、残りだけで測ってみるね。
    </div>
  </div>
</div>

</div>

3章の「加重平均と中央値の開き」を、ここで分ける。S&P500の顔として名前が挙がる7社、エヌビディア・アップル・マイクロソフト・アマゾン・アルファベット・メタ・テスラ（「マグニフィセント・セブン」と呼ばれる。アルファベットは株が2種類あるので銘柄では8つ）を外して、残りの440社だけで測った。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">✂️ S&P500を「7社」と「残り440社」に分ける</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:380px;display:grid;grid-template-columns:1.4fr 0.8fr 0.7fr 0.7fr 0.7fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.7;">
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">比率</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">差</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">割れ</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;"><strong>7社</strong></div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">33.0%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;"><strong>41.0%</strong></div><div style="background:#ffffff;padding:9px 8px;color:#a85f3c;text-align:right;">＋31.4pt</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">4.5%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;"><strong>残り440社</strong></div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">58.0%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;"><strong>15.9%</strong></div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋6.3pt</div><div style="background:#fbfdfa;padding:9px 8px;color:#a85f3c;text-align:right;"><strong>33.5%</strong></div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">S&P500全体</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">90.9%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">25.0%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">＋15.4pt</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">23.0%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">（参考）VYM</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;"></div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">14.6%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋6.5pt</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">22.6%</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">比率はS&P500全体に対する値（測れた分）。ROICは組み入れ比率で加重した3年平均、差はWACC 9.6%との差、割れはそれぞれのなかで9.6%を下回る比率。7社のうち割れているのはテスラだけ。VYMの割れはVYMの線8.1%に対する値</div>
</div>

7社だけで、S&P500の3分の1。その7社のROICは**41.0%**。残りの440社は**15.9%**。資本コストを引くと＋6.3ポイント。**VYMの＋6.5ポイントと同じ**だ。割れは33.5%で、VYMより多い。

つまり、S&P500の＋15.4ポイントは、7社が押し上げた数字だった。7社を除いた「ふつうの大企業440社」の稼ぐ力は、高配当ETFの中身と変わらない。

高配当3本に入っている会社と、入っていない会社でも分けてみた。

高配当3本のどれかに入っている会社は、S&P500の28.7%。そのROICは14.6%で、VYM全体の14.6%とぴったり同じ。割れは28.5%。どれにも入っていない側は**29.8%で、倍以上ある**。エヌビディアもアマゾンもメタも、配当が少ないか無配なので、高配当ETFには入れない。3本が持てないのは、稼ぐ力がいちばん高い側だった。

セクターで見ると、ITが比率37.1%で、そのROICが36.5%。VYMではITは比率15.6%、ROIC 16.6%だった。**S&P500の中身の4割近くが、稼ぐ力の桁が違う業種で埋まっている**。VYMで稼ぐ力が高かった一般消費財と生活必需品は、S&P500では合わせて14%しかなく、その2つよりITのほうがはるかに高い。高配当3本で見えていた「稼ぐ業種」の地図が、S&P500では書き換わる。

---

## 6. 4本を測り終えて、どう見えたか

同じ物差しで4本を測り終えた。並べる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:18px 16px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">📋 4本の答え</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:400px;display:grid;grid-template-columns:0.8fr 0.7fr 0.7fr 0.7fr 1.8fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.7;">
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">社数</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">差</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">割れ</div>
    <div style="background:#e3ecdd;padding:9px 8px;font-weight:700;color:#4a6640;">選び方</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">HDV</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">75</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">＋8.3</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">14.7%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;">「堀」で絞って利回り順</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">SCHD</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">99</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋9.3</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">7.6%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">10年連続配当と4つの指標の点数</div>
    <div style="background:#ffffff;padding:9px 8px;color:#3a5030;">VYM</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">604</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">＋6.5</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;text-align:right;">22.6%</div><div style="background:#ffffff;padding:9px 8px;color:#3a5030;">利回り上位半分をそのまま全部</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;"><strong>S&P500</strong></div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">504</div><div style="background:#fbfdfa;padding:9px 8px;color:#a85f3c;text-align:right;"><strong>＋15.4</strong></div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">23.0%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">大きくて黒字の会社を大きい順に。配当の条件なし</div>
  </div>
  </div>
  <div class="sp-only-note" style="font-size:11px;color:#5a8a50;margin-top:8px;">※表は横にスクロールできます</div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">差は加重平均ROIC−WACC（ポイント）、割れは各ETFの線を下回る比率（測れた分に対して）。WACCの線はHDV 6.7%、SCHD 7.6%、VYM 8.1%、S&P500 9.6%</div>
</div>

4本を測って、わたしのなかで残ったことを3つ。

<div class="data-card" style="background:#fafaf7;border:1.5px solid #c8d8c0;border-radius:12px;padding:18px 20px;margin:20px 0;">
<div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:12px;">💡 4本を測って残ったこと</div>
<div style="font-size:13px;color:#3a5030;line-height:1.9;">
<div style="margin-bottom:10px;"><strong>① 高配当という縛りの値段が、見えた。</strong>3本が持てないのは、エヌビディアやアマゾンのような、配当を払わずに稼ぐ側。S&P500の＋15.4と高配当3本の＋6〜9の差は、ほぼそこから来ている</div>
<div style="margin-bottom:10px;"><strong>② S&P500は、選んでいるのではなく、結果を映している。</strong>稼いだ会社の株が上がって大きくなり、大きくなった会社の重みが増える。時価総額で比率を決めるとは、そういうことだ</div>
<div><strong>③ 7社を外せば、どの入れ物も似ている。</strong>残り440社は＋6.3で、VYMと同じ。ふつうの大企業の稼ぐ力は、配当を払っていてもいなくても、資本コストを6ポイントほど超えたところに集まる</div>
</div>
</div>

S&P500の＋15.4ポイントは、良い会社を選んでいるからではなく、**7社が稼いで、その7社を大きく持つ形になっているから**だ。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      で、あずきは どうするの?🐾
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
      何もしない。持っているまま。中身の形が分かっただけ。
    </div>
  </div>
</div>

</div>

わたしはS&P500を売らない。積立を2024年に[オルカン](/blog/orukan-vs-sp500-real)へ切り替えた理由は、稼ぐ力とは別の話だ。オルカンの6割はアメリカの株なので、S&P500の7社はオルカンの中でも大きい。そして高配当は[日本株で119銘柄](/blog/portfolio-risk-117-stocks)を自分で組んでいる。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;text-align:center;">
<div style="font-size:16px;font-weight:700;color:#a85f3c;line-height:1.8;">目隠しをした猿が新聞の株式欄にダーツを投げて選んだ株でも、<br>専門家が念入りに選んだものと同じくらいの成績になる</div>
<div style="font-size:12px;color:#7a5c44;margin-top:12px;">A blindfolded monkey throwing darts at a newspaper's financial pages could select a portfolio that would do just as well as one carefully selected by the experts.<br>バートン・マルキール『ウォール街のランダム・ウォーカー』（原著1973年）</div>
</div>

プリンストン大学の経済学者マルキールが、50年以上前に書いた一節だ。専門家が選んでも、猿が選んでも、長い目で見れば市場の平均と変わらない。だから平均そのものを持てばいい。この本の3年後の1976年に、ボーグル（バンガードの創業者）が最初のインデックスファンドを作った。

4本を測ったあとで読み返すと、S&P500の重さを決めているのは、専門家でも猿でもなく、値段だ。**稼いだ会社が勝手に大きくなっていく仕組みを、そのまま持つ**。7社が稼げば7社が重くなり、次の7社が稼げば、重さが移る。「平均そのものを持てばいい」の平均とは、この形のことだと思う。

今回測ったのは、中身の会社に稼ぐ力があるかどうか、それだけだ。いまの値段で買って得かどうかは、この物差しでは分からない。それはS&P500だけでなく、HDVもSCHDもVYMも同じで、このシリーズでは一度も測っていない。

---

:::cta
title: SBI証券 — わたしのS&P500もオルカンも、この口座で
description: 2018年からのS&P500の投信も、2024年からのオルカンの積立も、日本の高配当株119銘柄も、SBI証券の口座です。この記事の構成銘柄と比率はiSharesが公表しているもので、特別な情報は使っていません。8年使っているメイン口座です。
button: SBI証券の公式サイトを見る →
url: https://h.accesstrade.net/sp/cc?rk=0100pesr00orlw
:::

---

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>S&P500（測れた448社・91%）は<strong>＋15.4ポイント</strong>（25.0%−9.6%）。HDV＋8.3、SCHD＋9.3、VYM＋6.5をはるかに超えた</li>
<li>選び方は大きさと黒字で、<strong>稼ぐ力の条件も配当の条件もない</strong>。9月21日に入る3社は3社とも資本コストの線の下</li>
<li>割れは<strong>23.0%でVYMと同じ</strong>。社数では44%。主役は公益ではなくIT（マイクロン・AMD・インテル）</li>
<li>7社（エヌビディアなど）が33%を占めてROIC41.0%。<strong>残り440社は＋6.3ポイントで、VYMと同じ</strong></li>
<li>高配当3本が持てないのは、配当を払わずに稼ぐ側。それが3本とS&P500の差の正体</li>
<li>S&P500は選んでいるのではなく、稼いだ結果を映している。わたしは持ったまま何もしない。値段は見ていない</li>
</ul>
</div>

## 関連記事

- [HDVもSCHDも、VYMの中にいた。604社の中身を測ったら、3本の違いは「どれだけ絞るか」だけだった](/blog/vym-roic-wacc-inside)
- [SCHDの中身を測ったら＋9.3ポイント、HDVより上だった。でも6割は同じ会社で、差をつけたのは「持っていない業種」だった](/blog/schd-roic-wacc-inside)
- [HDVは、資本コストを超える会社を先に選ぶETFだった。中身を測ったら＋8.3ポイント。でも5番目のファイザーは割れていた](/blog/hdv-roic-wacc-inside)
- [わたしのS&P500の中身が、9月21日に変わる。1年前に入った会社が、株価8割減で出ていく](/blog/sp500-rebalance-trade-desk-bloom)
- [オルカン vs S&P500。両方持っているわたしの結論「初心者ならオルカン」](/blog/orukan-vs-sp500-real)
- [JTは価値を生んでいるか。測ったらROIC10.1%。でも1年前に測っていたら、逆の記事を書くところだった](/blog/jt-2914-roic-wacc)

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0 16px;">
<strong style="display:block;margin-bottom:6px;color:#666;">📚 参考にした情報源</strong>
・構成銘柄と比率：iShares「IVV 保有銘柄」（2026年8月20日時点、504社）。純資産8,226億ドル（9月14日時点）・経費率0.03%・504社は<a href="https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf" target="_blank" rel="noopener noreferrer">iSharesのIVVのページ</a><br>
・各社のROIC：Yahoo Financeの財務データ（営業利益・税引前利益・法人税・投下資本・有利子負債の年次、直近3期）から<strong>わたしが計算</strong>。前の3本と同じ式。前の3本で取っていなかった141社ぶんは2026年9月15日に取得<br>
・WACC：β1.00（S&P500は市場そのもの）、米10年債4.738%（2026年8月21日）、市場の上乗せ5.5%、負債コスト税引前5%、負債の重み10.3%で9.59%。前の3本と同じ前提<br>
・S&P500の採用基準（上場12か月・直近四半期と4四半期合計の黒字・時価総額加重）：<a href="/blog/spacex-sp500-rejected-index-rules">スペースXの記事</a>でまとめたS&Pダウ・ジョーンズ・インデックスの現行ルール。9月21日の入れ替え6社は<a href="/blog/sp500-rebalance-trade-desk-bloom">9月6日の記事</a><br>
・日米の平均ROIC・WACC：経済産業省「成長投資ガイダンス データ集」（2020〜2024年平均）。HDV・SCHD・VYMの数字はそれぞれの記事から<br>
・7社（マグニフィセント・セブン）：エヌビディア、アップル、マイクロソフト、アマゾン、アルファベット（A株・C株）、メタ、テスラの8銘柄。高配当3本との重なりは各社の公表データ（VYMは7月31日、HDV・SCHDは8月20日時点）で突き合わせた<br>
・わたしの持ち物：<a href="/blog/monthly-report-2026-08">8月の月次レポート</a>（インデックス投信3,934万円）、<a href="/blog/orukan-vs-sp500-real">オルカンとS&P500の記事</a>（2018年から積立、2024年にオルカンへ）<br>
・マルキールの言葉：Burton G. Malkiel, "A Random Walk Down Wall Street" (W. W. Norton, 1973)。邦訳『ウォール街のランダム・ウォーカー』（日本経済新聞出版）。訳はわたし。最初のインデックスファンド（バンガード、1976年）については<a href="https://www.wealthtrack.com/malkiel-financial-thought-leader/" target="_blank" rel="noopener noreferrer">WealthTrackのマルキールのインタビュー</a>ほか
</div>

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:16px 0 36px;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の学習記録であり、特定のETF・投資信託・銘柄への投資を推奨・勧誘するものではありません。構成銘柄と比率はiShares公表データ（2026年8月20日時点）、各社の決算数値はYahoo Financeの財務データ（2023〜2025年度）、日米平均は経済産業省「成長投資ガイダンス データ集」、国債利回りは2026年8月21日の米10年債、純資産・経費率は2026年9月14日時点の公表値によります。ROIC・WACCの算出は簡便法で、前提（β・リスクプレミアム・負債コスト）の置き方で結果は変わります。銀行・保険はROICの性質上、計算から除いています。HDV・SCHD・VYMとの比較は取得日が異なり、各ETFの中身は入れ替えで変わります。過去の実績は将来の成果を保証しません。米国株・米国ETFは為替変動の影響を受けます。投資の最終判断はご自身の責任で行ってください。
</div>
