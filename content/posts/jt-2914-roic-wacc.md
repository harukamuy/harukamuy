---
title: "JTは価値を生んでいるか。測ったらROIC10.1%。でも1年前に測っていたら、逆の記事を書くところだった"
date: "2026-08-22"
category: "sidefire"
excerpt: "保有している日本株を、ROIC−WACCという物差しで1社ずつ測るシリーズを始めます。1社目はJT。「タバコってどうなのかな」と迷いながら買った会社です。決算短信から数字を拾って測ったら、ROICは10.1%。資本コストを4.7ポイント上回っていて、日本の平均どころか米国の平均に近い水準でした。ところが同じ計算を1年前の数字でやると、答えが逆になります。原因はカナダの訴訟。単年の数字で判断してはいけない理由が、そのまま出ました。"
coverImage: "/images/20260822_2.png"
coverImagePosition: "center"
series: "measure-holdings"
seriesOrder: 1
tags: ["高配当株", "日本株", "配当投資"]
---

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      もってるかぶ、ぜんぶはかるの？🐾
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
      ぜんぶは無理だけど、まずは大きいところから。1社目はJTにした。
    </div>
  </div>
</div>

</div>

[前の記事](/blog/roic-wacc-growth-investment-guidance)で、ROIC−WACCという物差しを覚えた。会社が集めたお金の<strong>仕入れ値（WACC）</strong>と、そのお金で稼いだ<strong>売値（ROIC）</strong>。差がプラスなら価値を生んでいて、マイナスなら、黒字でも集めたお金の期待に届いていない。

日本の主要企業の平均は<strong>マイナス0.04ポイント</strong>。10年かけて改善しても、まだ資本コストを超えられていなかった。

覚えた物差しは、自分の持ち物に当ててこそ意味がある。ということで、保有している日本株を1社ずつ測るシリーズを始める。

1社目はJT（日本たばこ産業・2914）。[自分で選んで買った銘柄](/blog/high-dividend-portfolio)のひとつで、「タバコってどうなのかな」と迷いながら買った会社だ。喫煙者は年々減っていて、縮小していく産業かもしれないという不安は、当時の記事にそのまま書いてある。

その迷いに、今回は数字で向き合ってみる。

## 1. JTは何で稼ぐ会社か。1分で

測る前に、中身をひとことで。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">🚬 JT（2914）のいま</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#3a5030;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">稼ぎ頭</span><span>たばこ。それも<strong>海外が主戦場</strong>。2007年に英ギャラハーを約2.2兆円で買収して以来、世界で売る会社になった</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">売上収益</span><span>3兆4,677億円（2025年12月期・前年比+13.4%）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">医薬事業</span><span>手放す方向が決まり、決算では<strong>非継続事業</strong>に分けられた。たばこへの一本化が進む</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#5a8a50;font-weight:700;min-width:86px;">のれん</span><span><strong>2兆9,231億円</strong>。買収を重ねてきた歴史が、そのまま帳簿に積んである</span>
    </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">決算の数字はJT「2025年12月期 決算短信」（2026年2月12日公表）より。以下この記事の決算数値はすべて同じ出所です。ギャラハーの買収額は当時の報道によります</div>
</div>

のれんというのは、会社を買収したときに払った「実際の資産より高く払ったぶん」のこと。あとで効いてくるので、2.9兆円という数字だけ覚えておいてほしい。

## 2. まずROIC。売値のほうを測る

ROICは、集めたお金で税引き後にどれだけ稼いだか。分子は営業利益から税金を引いたもの、分母は<strong>有利子負債＋資本</strong>で、会社に入っているお金の合計だ。

決算短信から数字を拾って、順番に計算する。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">🧮 JTのROIC（2025年12月期）</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">営業利益</span><span>8,670億円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">実効税率</span><span>32.3%（法人所得税 2,387億円 ÷ 税引前利益 7,398億円）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">税引き後の稼ぎ</span><span>8,670億円 ×（1 − 0.323）= <strong>5,870億円</strong></span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">有利子負債</span><span>1兆6,787億円（社債・借入金の流動＋非流動）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">資本</span><span>4兆1,154億円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">投下資本</span><span>1兆6,787億 ＋ 4兆1,154億 = <strong>5兆7,941億円</strong></span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;background:#fdf0e2;padding:8px 6px;border-radius:8px;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">ROIC</span><span>5,870億 ÷ 5兆7,941億 = <strong>10.1%</strong></span>
    </div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">営業利益は継続事業（たばこ・加工食品。医薬を除く）のもの。ROICの計算方法には流儀がいくつかあり、ここでは調達サイド（有利子負債＋資本）で投下資本を取っています。丸めた表示値で計算しているため、端数は最大0.1ポイントずれます</div>
</div>

<strong>ROICは10.1%</strong>。日本の主要企業の平均が6.37%なので、それを大きく上回る。

ここで1章の「のれん2.9兆円」が効いてくる。投下資本5兆7,941億円のうち、<strong>のれんが50.4%を占める</strong>。つまりこの10.1%は、買収に高値を払ったぶんも全部背負ったうえでの数字だ。のれんを外して本業の資産だけで測れば、もっと高く出る。ここは正直、すごいと思った。

## 3. 次にWACC。仕入れ値のほうを測る

WACCは、株主と銀行が期待している利回りの加重平均。前の記事では日本平均の6.41%を使ったけれど、今回はJT自身の数字で組んでみる。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">🧮 JTのWACC（試算）</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">国債の利回り</span><span>2.85%（10年・財務省 2026年8月20日）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">JTのβ</span><span>0.55（TOPIXに対する連動度。日次5年・1,221本で計算）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">株主の期待</span><span>2.85% + 0.55 × 5.5% = <strong>5.88%</strong>（市場全体の上乗せを5.5%として）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">銀行・債券の期待</span><span>税引き後で約1.7%（調達金利を2.5%と置いた）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">重みづけ</span><span>時価総額 約12.4兆円（2026年8月21日終値・88%）: 有利子負債 1兆6,787億円（12%）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;background:#fdf0e2;padding:8px 6px;border-radius:8px;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">WACC</span><span>5.88% × 88% + 1.7% × 12% = <strong>約5.4%</strong></span>
    </div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">WACCは前提の置き方で動きます。市場全体の上乗せ（リスクプレミアム）を5〜6.5%で振っても5.2〜5.6%の範囲でした。調達金利の2.5%は円建てと外貨建て社債のまざり具合からの目安で、負債の重みが12%しかないので結果への影響は小さいです</div>
</div>

<strong>JTのWACCは約5.4%</strong>。日本平均の6.41%より低い。βが0.55、つまり<strong>市場が揺れてもJTはその半分くらいしか揺れない</strong>ので、株主の期待がそのぶん低くなる。たばこは景気で売れ行きが変わりにくい、という性質がここに出ている。

## 4. 差は＋4.7ポイント。日本平均のはるか上だった

数字がそろったので、並べてみる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#4a6640;margin-bottom:14px;">⚖️ ROIC − WACC で並べる</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:430px;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:1px;background:#c8d8c0;border:1px solid #c8d8c0;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;"></div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">ROIC</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">WACC</div>
    <div style="background:#e6efe0;padding:9px 8px;font-weight:700;color:#4a6640;text-align:right;">差</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;">JT（2025年）</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;">10.1%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;">5.4%</div>
    <div style="background:#e8f0e4;padding:9px 8px;color:#3a5030;font-weight:700;text-align:right;">＋4.7pt</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;">日本の主要企業の平均</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">6.37%</div>
    <div style="background:#fff;padding:9px 8px;color:#3a5030;text-align:right;">6.41%</div>
    <div style="background:#fff;padding:9px 8px;color:#a85f3c;text-align:right;font-weight:700;">−0.04pt</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;">米国の主要企業の平均</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">12.5%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">7.3%</div>
    <div style="background:#fbfdfa;padding:9px 8px;color:#3a5030;text-align:right;">＋5.3pt</div>
  </div>
  </div>
  <div style="font-size:11px;color:#5a8a50;margin-top:12px;border-top:1px dashed #c8d8c0;padding-top:10px;">日米の平均は経産省「成長投資ガイダンス データ集」（2020〜2024年平均・マッキンゼー委託調査）。JTだけ2025年単年・自前のWACCなので、厳密には同じ土俵ではありません。JTに日本平均のWACC 6.41%を当てても＋3.7ポイントです</div>
</div>

<strong>＋4.7ポイント</strong>。日本平均（−0.04ポイント）のはるか上で、米国平均（＋5.3ポイント）に迫る。

金額にすると、投下資本5兆7,941億円 × 4.7% ＝ <strong>約2,700億円</strong>。株主と銀行の期待をまるごと差し引いたうえで、1年でこれだけの価値を上乗せしたことになる。

縮小していく産業かもしれない、と迷いながら買った会社が、価値を生む力では<strong>日本平均どころか、米国平均に迫る水準</strong>だった。

## 5. ところが、1年前に測ると答えが逆になる

ここで終わればきれいな記事だけれど、この計算にはつづきがある。

同じ計算を、<strong>1年前の決算（2024年12月期）</strong>でやってみる。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">🔁 同じ計算を、2024年12月期で</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a4a3a;">
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">営業利益</span><span>3,142億円（2025年の8,670億円の4割以下）</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">税引き後の稼ぎ</span><span>3,142億円 ×（1 − 0.225）= 2,435億円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">投下資本</span><span>1兆7,268億 ＋ 3兆8,487億 = 5兆5,755億円</span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;background:#fdf0e2;padding:8px 6px;border-radius:8px;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">ROIC</span><span>2,435億 ÷ 5兆5,755億 = <strong>4.4%</strong></span>
    </div>
    <div class="keep-grid" style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;background:#fdecec;padding:8px 6px;border-radius:8px;">
      <span style="color:#c0704a;font-weight:700;min-width:120px;">ROIC − WACC</span><span>4.4% − 5.4% = <strong>マイナス1.0ポイント</strong></span>
    </div>
  </div>
</div>

<strong>マイナス1.0ポイント。資本コスト割れだ。</strong>

もしわたしが1年前にこのシリーズを始めていたら、「JTは集めたお金の期待に届いていない会社」という記事を書くところだった。同じ会社なのに、測る年で答えが逆になる。

### 原因は、カナダの訴訟だった

2024年の営業利益が沈んだ主な理由は、カナダ子会社の喫煙訴訟に関する引当金だ。2025年3月に包括和解が裁判所に承認され、決算短信にもその経緯が明記されている。引当金（流動）の残高は<strong>1,959億円から328億円へ</strong>と大きく減った。和解が進み、支払いの段階に入った形だ。

つまり2024年のROIC 4.4%は、<strong>数十年分の訴訟の決着が1年に凝縮された数字</strong>で、たばこ事業の稼ぐ力そのものではない。逆に2025年の10.1%には、その反動も少し乗っている。

だから、2年で均してみる。

<div class="data-card" style="background:#f0f5ee;border:1.5px solid #c8d8c0;border-radius:16px;padding:20px;margin:24px 0;font-size:13px;color:#3a5030;line-height:1.9;">
  <strong style="color:#4a6640;">📐 2年平均でみると</strong><br />
  税引き後の稼ぎ（5,870億＋2,435億）÷ 投下資本（5兆7,941億＋5兆5,755億）= <strong>ROIC 7.3%</strong>。WACC 5.4%との差は<strong>＋1.9ポイント</strong>。訴訟の重い年を丸ごと入れても、プラスは守られていました
</div>

経産省が日米欧の比較を<strong>5年平均</strong>でやっていた理由が、ここでわかった。単年のROICは、訴訟・減損・税金の一時要因で簡単にひっくり返る。<strong>1年の数字で会社を判断してはいけない</strong>。自分で測ってみて、いちばん覚えておきたい教訓はこれだった。

## 6. 配当は、どこから出ていたのか

高配当株として持っている以上、ここがいちばん知りたいところだ。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a5c44;margin-bottom:14px;">💰 JTの配当（1株あたり）</div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <div class="keep-grid" style="min-width:430px;display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:1px;background:#f0dcc8;border:1px solid #f0dcc8;border-radius:10px;overflow:hidden;font-size:12.5px;line-height:1.6;">
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;"></div>
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;text-align:right;">2024年</div>
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;text-align:right;">2025年</div>
    <div style="background:#f7ede0;padding:9px 8px;font-weight:700;color:#7a5c44;text-align:right;">2026年（予想）</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;">年間配当</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">194円</div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;"><strong>234円</strong></div>
    <div style="background:#fff;padding:9px 8px;color:#5a4a3a;text-align:right;">242円</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;">配当性向</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#a85f3c;text-align:right;font-weight:700;">192.2%</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">81.4%</div>
    <div style="background:#fffdfa;padding:9px 8px;color:#5a4a3a;text-align:right;">75.4%</div>
  </div>
  </div>
  <div style="font-size:11px;color:#9a8574;margin-top:12px;border-top:1px dashed #f0dcc8;padding-top:10px;">決算短信の「配当の状況」より。2025年の期末配当は、訴訟の和解などの一時影響を除いた利益（4,886億円）に配当性向85%を当てて決めた、と会社自身が説明しています</div>
</div>

見てほしいのは2024年の<strong>配当性向192.2%</strong>。その年の純利益は1,792億円しかないのに、3,445億円を配った。<strong>稼ぎの2倍近い配当</strong>だ。

ふつうなら、これは危険信号として教科書に載る数字だと思う。でも5章を通ったあとだと、読み方が変わる。沈んだのは訴訟の一時要因で、たばこ事業のお金を生む力は崩れていなかった。実際、その沈んだ年でも<strong>営業キャッシュ・フローは5,141億円</strong>入ってきている。会社は一時要因として扱って配当を守り、翌年には234円へ、<strong>+20.6%の増配</strong>までした。

<strong>ROIC−WACCがプラスの会社の配当は、価値を生んだ中から出ている</strong>。逆にこれが恒常的にマイナスの会社の高配当は、稼ぎが株主の期待に届かないまま配りつづけている。---

## 7. で、わたしはどうするか

測ってわかったことを、自分の持ち方に引きつけて整理する。

<div class="data-card" style="background:#fafaf7;border:1.5px dashed #ddd8d0;border-radius:16px;padding:20px;margin:24px 0;">
  <div style="font-size:13px;font-weight:700;color:#7a7268;margin-bottom:12px;">📋 測ってわかったこと</div>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:#5a544c;">
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>JTの本業は<strong>のれん2.9兆円を背負ってROIC 10.1%</strong>。価値を生む力は米国平均に迫る</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>ただし<strong>単年の数字は当てにならない</strong>。2024年だけ見れば資本コスト割れ。2年で均して＋1.9ポイント</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>配当は<strong>価値を生んだ中から出ている</strong>。訴訟の年の配当性向192%も、一時要因とわかれば読み方が変わる</span></div>
    <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:#a89880;font-weight:700;flex-shrink:0;">・</span><span>この物差しが答えていないのは<strong>将来</strong>。ROICは過去の成績</span></div>
  </div>
</div>

わたしは[売らない主義](/blog/high-dividend-exit-strategy)なので、この結果で何かを売り買いすることはない。動かすのは、<strong>次に買い足す先を考えるときの順番</strong>だけだ。そこにROIC−WACCという列がひとつ増えた。

そして最後の1行が、たぶんいちばん大事だ。この物差しは<strong>過去を測るもの</strong>で、「縮小していく産業かもしれない」という買ったときの迷いには、直接は答えていない。値上げでどこまで持つのか、加熱式やその先で何を育てられるのか。それは決算の別の場所と、これからの決算で確かめていくしかない。

物差しは万能ではない。でも、迷いながら持っているのと、<strong>測って持っているのとでは、ぜんぜん違う</strong>。

<div class="conv-wrap">

<div class="turn dog">
  <div class="avatar dog-av" style="background:transparent;border:none;">
    <img src="/images/gomamochi-sit.webp" alt="ごまもち" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:50%;" />
  </div>
  <div class="bubble-wrap">
    <div class="speaker-label">🐾 ごまもち</div>
    <div class="bubble">
      はかったら、あんしんした？🐾
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
      安心というより、持ってる理由を自分の言葉で言えるようになった感じかな。
    </div>
  </div>
</div>

</div>

ウォーレン・バフェットが1993年、学生に「投資のリスクをどう測るのか」と聞かれて、こう答えている。

<div class="data-card" style="background:#fff8f0;border:1.5px solid #f0dcc8;border-radius:16px;padding:22px 20px;margin:24px 0;text-align:center;">
<div style="font-size:16px;font-weight:700;color:#a85f3c;line-height:1.8;">リスクとは、自分が何をやっているのか<br>分かっていないことから生まれる</div>
<div style="font-size:12px;color:#7a5c44;margin-top:12px;">Risk comes from not knowing what you're doing.<br>ウォーレン・バフェット（<a href="https://quoteinvestigator.com/2018/03/18/risk/">1993年・コロンビア大学ビジネススクールでの発言</a>）</div>
</div>

買った理由なら、ずっと言えた。配当の実績と安定性。でも「この会社は集めたお金の期待を超えているのか」と聞かれたら、少し前までのわたしは答えられなかった。いまは、2年分の数字つきで答えられる。

このシリーズは、それを1社ずつ増やしていく。

## まとめ

<div class="summary-box">
<div class="summary-title">🐾 この記事のまとめ</div>
<ul class="summary-list">
<li>保有株をROIC−WACCで1社ずつ測るシリーズの1本目。JT（2914）を決算短信から測った</li>
<li><strong>ROICは10.1%、WACCは約5.4%で、差は＋4.7ポイント</strong>。日本平均（−0.04pt）のはるか上、米国平均（＋5.3pt）に迫る。のれん2.9兆円を背負ってこの数字</li>
<li>ところが<strong>2024年で測るとROIC 4.4%で資本コスト割れ</strong>。カナダ訴訟の決着が1年に凝縮された数字で、2年平均では＋1.9ポイント。<strong>単年で会社を判断してはいけない</strong></li>
<li>訴訟の年の<strong>配当性向192.2%</strong>は、一時要因とわかれば読み方が変わる。翌年は234円へ+20.6%の増配。配当は価値を生んだ中から出ていた</li>
<li>この物差しは過去の成績。<strong>たばこの縮小という将来の問いには答えない</strong>。そこは決算の別の場所で確かめていく</li>
</ul>
</div>

:::cta
title: SBI証券 — 決算短信は、誰でもタダで読める
description: この記事の数字は、JTが公表している決算短信から拾っただけです。特別な情報は1つもありません。保有銘柄の決算を確認して、配当金を受け取る。その口座としてわたしが8年使っているのがSBI証券です。
button: SBI証券の公式サイトを見る →
url: https://h.accesstrade.net/sp/cc?rk=0100pesr00orlw
:::

## 関連記事

- [日本企業は、10年かけてもまだ資本コストを超えられていなかった。経産省の新しい指針が使う「ROIC−WACC」とは?](/blog/roic-wacc-growth-investment-guidance)
- [わたしの高配当株。三菱商事・東京海上・JT・ホンダを選んだ理由](/blog/high-dividend-portfolio)
- [高配当株の出口戦略。わたしは「売らない」を基本にしている](/blog/high-dividend-exit-strategy)
- [高配当株は何銘柄あれば足りる? 自分の117銘柄でリスクを計算したら、答えは「数」ではなかった](/blog/portfolio-risk-117-stocks)

<div style="background:#f5f3f0;border:1.5px solid #ddd8d0;border-radius:14px;padding:20px 22px;font-size:12px;color:#888;line-height:1.9;margin:36px 0;">
<strong style="display:block;margin-bottom:6px;color:#666;">⚠ 免責事項</strong>
この記事はあずき個人の学習と保有記録であり、特定の銘柄・金融商品への投資を推奨・勧誘するものではありません。決算数値はJT「2025年12月期 決算短信」（2026年2月12日公表）、日米平均は経済産業省「成長投資ガイダンス データ集」（2026年7月21日公表・マッキンゼー委託調査ベース）、国債利回りは財務省公表値によります。ROIC・WACCの算出方法には複数の流儀があり、この記事の計算は簡便法です。とくにWACCは前提（β・リスクプレミアム・調達金利）の置き方で変わります。計算結果は過去の実績にもとづくもので、将来の業績・配当を保証しません。投資の最終判断はご自身の責任で行ってください。
</div>
