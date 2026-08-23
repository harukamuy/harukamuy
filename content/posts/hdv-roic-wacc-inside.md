---
title: "HDVは、資本コストを超える会社を先に選ぶETFだった。中身を測ったら＋8.3ポイント。でも5番目のファイザーは割れていた"
date: "2026-08-23"
category: "investment"
excerpt: "好きなのに買えていない米国高配当ETF、HDV。その中身75社をROIC−WACCで測ってみました。加重平均のROICは15.1%、資本コストを8.3ポイント上回っていて、日本の主要企業の平均（−0.04ポイント）とは別世界でした。調べてわかったのは、HDVの銘柄の選び方そのものが「資本コストを超える見込みの会社」を先にふるいにかける設計だったこと。ただし中身の15%は直近3年の実績では資本コストを割っていて、その筆頭が組み入れ5位のファイザーでした。ETFの中身を測るシリーズの1本目です。"
coverImage: "/images/20260823_2.png"
coverImagePosition: "center"
series: "measure-etfs"
seriesOrder: 1
tags: ["ETF", "米国株", "高配当株"]
---

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      もってないのに、はかるの？🐾
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
      持ってないからこそ、中身を知りたいの。好きなのに買えていないETFだから。
    </div>
  </div>
</div>

</div>

[JTを測った記事](/blog/jt-2914-roic-wacc)を書いたあと、ふと思った。ROIC−WACCという物差しは、ETFにも当てられるのだろうか。

ETFそのものには当てられない。ETFは会社の詰め合わせで、営業利益も投下資本も持っていないからだ。でも<strong>中に入っている会社1社1社には、ROICもWACCもある</strong>。組み入れ比率で加重平均すれば、「このカゴの中身は、全体として資本コストを超えているのか」は出せる。

1本目はHDV。[好きなのに買えていない](/blog/hdv-vs-japan-dividend-15years)米国の高配当ETFだ。利回りが下がって、円安も重なって、いまも買えていない。持っていないからこそ、中身を一度ちゃんと見ておきたかった。

測ってみたら、HDVの中身は日本の平均とは別世界だった。そして、HDVという商品の<strong>選び方そのもの</strong>に、この物差しが組み込まれていた。

## 1. この記事の測り方

ETFの中身を測るシリーズは3本の予定で、測り方は毎回同じにする。先に書いておく。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">📐 ETFの中身の測り方（このシリーズ共通）</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">構成銘柄</span><span>運用会社が公表している保有一覧（HDVはiShares・2026年8月20日時点）から、銘柄と組み入れ比率を取る</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">ROIC</span><span>1社ずつ、営業利益×（1−実効税率）÷投下資本。<strong>直近3年の平均</strong>で見る。JTで学んだとおり、単年は一時要因で簡単にひっくり返るから</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">WACC</span><span>ETF自体の値動きから実測した市場との連動度（β）、米10年国債の利回り4.74%、市場の上乗せ5.5%で組む。個別ではなくカゴ全体でひとつ</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">加重平均</span><span>組み入れ比率で加重。ただし極端な会社が平均を押し上げるので、<strong>中央値（組み入れ比率で重みづけ）も必ず添える</strong></span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">測れないもの</span><span>銀行・保険はROICという物差しが合わないので除く（HDVでは8社・4.0%）。そして<strong>ROICが高い＝買い時ではない</strong>。稼ぐ力の話であって、値段の話ではない</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">決算数値はYahoo Financeの財務データ（各社の直近3期・おおむね2023〜2025年度）、構成銘柄はiSharesの公表CSV、国債利回りは2026年8月21日の米10年債。ROIC・WACCの出し方には流儀があり、ここでの計算は簡便法です</div>
</div>

## 2. HDVの選び方は、最初から「資本コストを超える会社」だった

測る前に、HDVがどうやって75社を選んでいるのかを調べた。

HDVが連動するのはモーニングスターの配当フォーカス指数で、[ルール文書](https://assets.contentstack.io/v3/assets/bltabf2a7413d5a8f05/blt86e70b2ca968883c/5eab2817cc074c30f138137a/20200417_Morningstar_Dividend_Yield_Focus_Index_Final2.pdf)によると銘柄はこの順番でふるいにかけられる。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">🔍 HDVが75社を選ぶ順番</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:32px;">①</span><span><strong>他社がマネしにくい強み（モーニングスターのいう「堀」）がある会社だけ残す</strong>。堀の評価でnarrow以上</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:32px;">②</span><span><strong>財務が健全な会社だけ残す</strong>。倒産までの距離（Distance to Default）が、同じ地域・業種のなかで上位半分</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:32px;">③</span><span>残ったなかから<strong>配当利回りの高い順に75社</strong></span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:32px;">④</span><span>組み入れ比率は、<strong>その会社が払っている配当の総額</strong>で決める（時価総額ではない）</span>
    </div>
  </div>
</div>

そして①の「堀」がある会社とは何か。モーニングスターは[株式リサーチの方法論](https://www.morningstar.com/content/dam/marketing/shared/research/methodology/705988Morningstar_Equity_Research_Methodology.pdf)で、超過利益をこう定義している。

> 超過利益とは、<strong>投下資本利益率（ROIC）が、その会社の資本コスト（WACC）を上回ること</strong>（We define excess profits as returns on invested capital, or ROICs, above our estimate of a firm's cost of capital, or WACC）

この超過利益が少なくとも10年続くと見込めば「狭い堀（narrow）」、20年なら「広い堀（wide）」。堀とは、<strong>ROIC−WACCがプラスを続けられる見込み</strong>のことだった。

つまりHDVは、<strong>前の記事で覚えたROIC−WACCという物差しで、最初にふるいにかけているETF</strong>だった。高配当を選ぶ前に、資本コストを超える見込みの会社だけを残している。

高配当ETFというと「利回りの高い順に並べただけ」のものも多い。HDVはそこが違う。利回りは③、つまり最後の条件だ。

## 3. 測ったら、＋8.3ポイントだった

では実際の中身はどうか。75社を1社ずつ測って、組み入れ比率で加重した。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">⚖️ HDVの中身を、日本・米国の平均と並べる</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:470px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">WACC</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">差</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;">HDVの中身（加重平均）</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;">15.1%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;">6.7%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;">＋8.3pt</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">HDVの中身（中央値）</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">11.2%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">6.7%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">＋4.4pt</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">米国の主要企業の平均</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">12.5%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">7.3%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋5.3pt</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">日本の主要企業の平均</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">6.37%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">6.41%</div>
    <div style="background:#fff;padding:9px 8px;color:#a85f3c;text-align:right;font-weight:700;">−0.04pt</div>
  </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">日米の平均は経産省「成長投資ガイダンス データ集」（2020〜2024年平均）。HDVは直近3期の平均で、WACCは実測β0.46から。期間と方法が違うので、目安として並べています。差は丸める前の値で計算しているので、表の引き算とは0.1ポイントずれることがあります<span class="sp-only-note">（スマホでは横にスクロールできます）</span></div>
</div>

HDVの中身は、加重平均で<strong>ROIC 15.1%</strong>。WACCが6.7%なので、差は<strong>＋8.3ポイント</strong>。

日本の主要企業の平均がマイナス0.04ポイントだったことを思うと、同じ物差しで測っているのが不思議なくらい離れている。米国の主要企業の平均（＋5.3ポイント）と比べても高い。HDVが「堀」で先に絞っているぶんだと思う。

中央値は11.2%で、平均より4ポイント低い。これはROICが極端に高い会社（あとで出てくる）が平均を持ち上げているからで、<strong>真ん中の会社で見ても＋4.4ポイント</strong>。日本平均の上にいる。

組み入れの上位10社も並べておく。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">🏢 HDVの上位10社と、そのROIC（3年平均）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:440px;display:grid;grid-template-columns:1.6fr 0.8fr 0.8fr;gap:1px;background:#f0dcc8;border:1px solid #f0dcc8;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;">銘柄</div>
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;text-align:right;">比率</div>
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;text-align:right;">ROIC</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;">エクソンモービル</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">8.1%</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">10.0%</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;">アッヴィ</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">6.2%</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">16.1%</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;">シェブロン</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">6.2%</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">7.2%</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;">ベライゾン</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">5.6%</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">8.8%</div>
    <div style="background:#fdecec;padding:9px 8px;color:#a85f3c;font-weight:700;">ファイザー</div><div style="background:#fdecec;padding:9px 8px;color:#a85f3c;text-align:right;font-weight:700;">4.6%</div><div style="background:#fdecec;padding:9px 8px;color:#a85f3c;text-align:right;font-weight:700;">6.3%</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;">メルク</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">4.4%</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">15.1%</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;">ホーム・デポ</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">4.3%</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">28.1%</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;">P&amp;G</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">4.3%</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">18.7%</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;">フィリップ・モリス</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">4.3%</div><div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">28.8%</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;">コカ・コーラ</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">4.1%</div><div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">16.0%</div>
  </div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">比率はiShares公表の2026年8月20日時点。HDVのWACC 6.7%を下回るのは、この10社のなかではファイザーだけ<span class="sp-only-note">（スマホでは横にスクロールできます）</span></div>
</div>

## 4. でも、中身の15%は割れていた

ここまでだときれいすぎるので、割れている側も見る。

75社のうち、3年平均のROICがWACCの6.7%に届いていないのは<strong>21社、組み入れ比率で14.7%</strong>あった。中身はこうだ。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">📉 HDVのなかで、資本コストを割っている14.7%の中身</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:96px;">公益 6.6%</span><span>電力・ガス16社（サザン・デューク・WECなど）。ROICは4.5〜6.3%</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:96px;">ヘルスケア 6.4%</span><span><strong>ファイザー（4.6%・ROIC 6.3%）</strong>とメドトロニック（1.8%・6.6%）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:96px;">その他 1.7%</span><span>キンダー・モルガン、キューリグ・ドクターペッパーなど</span>
    </div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">ファイザーはこの3年、法人税が戻ってくる側（マイナス）だったので、実効税率は米国の法定税率21%で置いています。税金ゼロで計算すると7.9%で、WACCをわずかに上回ります。つまりファイザーの「割れ」は置き方で変わる際どい位置で、はっきり下にいる公益とは違います</div>
</div>

電力やガスは規制で料金が決まっていて、<strong>もうけが資本コスト並みに抑えられるのが制度の設計</strong>だ。ROICがWACCの少し下に張りつくのは、壊れているのではなく、そういう業種だということ。

引っかかったのはファイザーだ。<strong>組み入れ5位、4.6%</strong>。「資本コストを超える見込みの会社だけ残す」はずのHDVで、5番目の会社が直近3年ではWACCに届いていない。

理由は、物差しの向きが違うことだった。モーニングスターの「堀」は<strong>これから10年・20年の見込み</strong>で判断する。わたしが測ったのは<strong>直近3年の実績</strong>だ。ファイザーはコロナのワクチンと治療薬で膨らんだ利益が2023年以降しぼんで、投下資本は買収で増えたまま。過去3年で切り取ると沈んで見えるが、モーニングスターは「堀はまだある」と見ている、ということになる。

どちらが正しいかは、わからない。JTでは測る年で答えが変わった。ここでは、<strong>どっちを向いて測るかでも変わる</strong>。物差しの癖として覚えておきたい。

それでも、割れているのが約15%。日本の主要企業は<strong>投下資本の65%が価値を減らす事業に置かれていた</strong>。比べる土俵は違うけれど、この差は大きい。

## 5. HDVの中身で稼いでいたのは、たばこと家の修理だった

セクターごとに見ると、HDVの顔がもう少し見えてくる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">🧩 セクター別の比率と、加重平均ROIC</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:420px;display:grid;grid-template-columns:1.6fr 0.8fr 0.8fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;">セクター</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">比率</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">ヘルスケア</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">25.0%</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">11.6%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;">生活必需品</div><div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;text-align:right;">23.0%</div><div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;text-align:right;font-weight:700;">21.5%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">エネルギー</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">21.3%</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">9.2%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;">一般消費財</div><div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;text-align:right;">8.3%</div><div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;text-align:right;font-weight:700;">31.2%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">公益</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">7.3%</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">5.6%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">通信</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">5.6%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">8.8%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">金融</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">4.6%</div><div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">—</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">資本財</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">3.8%</div><div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">24.2%</div>
  </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">金融は10社・4.6%。うちブラックストーン・PNCなど8社（4.0%）はROICという物差しが合わないので除外し、セクターのROICは「—」にしています<span class="sp-only-note">（スマホでは横にスクロールできます）</span></div>
</div>

いちばんROICが高いのは一般消費財の31.2%で、中身はホーム・デポ（28.1%）・マクドナルド（26.6%）・スターバックス（45.6%）。次が生活必需品の21.5%で、ここは<strong>アルトリア（40.1%）とフィリップ・モリス（28.8%）</strong>、つまりたばこだ。

JTを測ったときにROIC 10.1%で「すごい」と書いたけれど、米国のたばこ会社は、その3倍も4倍もあった。たばこは設備も在庫も軽くて、値上げが効く。資本をあまり使わずに稼ぐ商売の典型なのだと、並べてみてわかった。

逆に、HDVで2番目に大きいエネルギー（21.3%）は、ROIC 9.2%と平均を下げている側にいる。エクソン10.0%・シェブロン7.2%で、石油は掘る設備にお金がかかる。<strong>HDVの顔はエクソンとシェブロンだけれど、中身で稼いでいるのは、たばこと家の修理だった</strong>。

## 6. で、買えていないHDVはどう見えたか

測って変わったことと、変わらなかったことを分けておく。

<div class="data-card" style="background:#fafaf7;border:1.5px dashed #ddd8d0;border-radius:16px;padding:20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a7268;margin-bottom:12px;">📋 測ってわかったこと</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a544c;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>HDVは<strong>選び方そのものにROIC＞WACCが組み込まれている</strong>ETF。高配当ETFのなかでも、この点は珍しいと思う</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>実測でも加重平均＋8.3ポイント、中央値＋4.4ポイント。<strong>日本平均とは別世界</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>ただし約15%は直近3年で割れている。公益は制度どおり、<strong>ファイザーは「未来の見込み」と「過去の実績」のずれ</strong></span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>ROICが高い会社の集まりは、<strong>たいていそのぶん高く買われている</strong></span></div>
  </div>
</div>

「好きなのに買えていない」理由は、利回りが下がったことと円安だった。その理由は、今回の物差しでは何も変わらない。<strong>中身が良いことと、いまの値段で買うことは別の話</strong>だ。

変わったのは、好きな理由に数字がついたこと。「財務が健全で配当が続く優良企業を集めたETF」という説明は前から知っていた。でもいまは、<strong>資本コストを超える見込みの会社を先に残して、そのなかから配当の多い順に選んでいる。実測でも15.1%稼いでいる</strong>、と言える。

2本目はSCHD。選び方がHDVとは違う高配当ETFだ。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      じゃあ、かうの？🐾
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
      それはまだ別の話。中身がいいのと、いま買うのは違うから。
    </div>
  </div>
</div>

</div>

チャーリー・マンガーが1994年、USCビジネススクールの講演でこう話している。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;text-align:center;">
<div style="font-size:16px;font-weight:700;color:#a85f3c;line-height:1.8;">長い目で見れば、株のリターンは<br>その会社が資本で稼ぐ利回りと、そう変わらない</div>
<div style="font-size:12px;color:#7a5c44;margin-top:12px;">Over the long term, it's hard for a stock to earn a much better return than the business which underlies it earns.<br>チャーリー・マンガー（<a href="https://jamesclear.com/great-speeches/a-lesson-on-elementary-worldly-wisdom-by-charlie-munger">1994年・USCビジネススクールでの講演「Elementary, Worldly Wisdom」</a>）</div>
</div>

同じ講演でマンガーは、こう続けている。資本に対して6%しか稼げない会社の株を、どんなに安く買ったとしても、40年持てばリターンは6%前後に落ち着く。<strong>安く買えた得は1回きりで、長く持つほど薄まり、残るのは会社の稼ぐ力だけになるからだ</strong>。

HDVの中身は、加重平均で15.1%。<strong>長く持つほど効いてくる数字</strong>ではある。好きな理由は、数字で裏が取れた。

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>ETFそのものにROIC−WACCは当てられないが、<strong>中身の会社を加重平均すれば測れる</strong>。HDVの75社を3年平均で測った</li>
<li>HDVの選び方は、モーニングスターの「堀」（＝<strong>ROICがWACCを上回る見込み</strong>）で先に絞り、そのあと配当利回り順。物差しが最初から組み込まれていた</li>
<li>実測は加重平均ROIC 15.1%・WACC 6.7%で<strong>＋8.3ポイント</strong>、中央値でも＋4.4ポイント。日本平均の−0.04ポイントとは別世界</li>
<li>ただし<strong>約15%は直近3年で資本コスト割れ</strong>。公益は制度どおり、<strong>5位のファイザー</strong>は「未来の見込み」と「過去の実績」のずれ</li>
<li>中身で稼いでいるのは、たばこ（アルトリア40.1%）と家の修理（ホーム・デポ28.1%）。2番目に大きいエネルギーは9.2%で平均を下げている側</li>
<li>この物差しは<strong>値段を見ていない</strong>。好きな理由ははっきりしたが、買えていない理由は変わらない</li>
</ul>
</div>

:::cta
title: SBI証券 — 米国ETFの中身は、誰でも無料で見られる
description: この記事の構成銘柄と比率は、運用会社が毎日公表しているものです。特別な情報は使っていません。HDVはSBI証券なら特定口座で買えます（毎月分配になったため、新NISAの対象外です）。わたしが8年使っているメイン口座です。
button: SBI証券の公式サイトを見る →
url: https://h.accesstrade.net/sp/cc?rk=0100pesr00orlw
:::

## 関連記事

- [JTは価値を生んでいるか。測ったらROIC10.1%。でも1年前に測っていたら、逆の記事を書くところだった](/blog/jt-2914-roic-wacc)
- [日本企業は、10年かけてもまだ資本コストを超えられていなかった。経産省の新しい指針が使う「ROIC−WACC」とは?](/blog/roic-wacc-growth-investment-guidance)
- [好きなのに買えていないHDV。15年ぶん答え合わせをしたら、勝ち負けの話ではなかった](/blog/hdv-vs-japan-dividend-15years)
- [高配当ETF「HDV」が毎月分配に。その理由を調べてみた](/blog/hdv-monthly-distribution-nisa)

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の学習記録であり、特定のETF・銘柄への投資を推奨・勧誘するものではありません。構成銘柄と比率はiShares公表データ（2026年8月20日時点）、各社の決算数値はYahoo Financeの財務データ（2023〜2025年度）、日米平均は経済産業省「成長投資ガイダンス データ集」、国債利回りは2026年8月21日の米10年債によります。ROIC・WACCの算出は簡便法で、前提（β・リスクプレミアム・負債コスト）の置き方で結果は変わります。金融セクターはROICの性質上、計算から除いています。過去の実績は将来の成果を保証しません。米国ETFは為替変動の影響を受けます。投資の最終判断はご自身の責任で行ってください。
</div>
