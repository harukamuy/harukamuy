// ═══════════════════════════════════════════════════════════════════
// 「今日下がっている銘柄」から、バランスを考えた買い増し候補を出す。
//   実行: node scripts/sidefire-today.mjs
//
// 月次のブリーフ(§10)は月末どうしの比較なので、その日の下げは分からない。
// こちらは現在値をYahooから取り、当日の下落だけを見る。
// 判定の条件と優先度スコアは sidefire-brief.mjs と同じにしてある。
//
// 保有銘柄の中からしか選ばない（新規銘柄は増やさない方針のため）。
// ═══════════════════════════════════════════════════════════════════

import { readFileSync } from "node:fs";
import { parseHoldingsCsv } from "./sidefire-parse-csv.mjs";

const RULE={yieldMin:3.5,yieldMax:6.0,maxWeight:3.0,maxSector:10.0,minNoCut:5,targetDefensive:35};
const DEF=new Set(["食料品","医薬品","電気・ガス業","情報・通信業","陸運業","小売業","サービス業","水産・農林業"]);
const J=(p)=>JSON.parse(readFileSync(p,"utf8"));
const {map:SEC}=J("data/sidefire/sectors.json"), master=J("data/sidefire/dividend-master.json");
const pol=J("data/sidefire/dividend-policy.json"), hist=J("data/sidefire/dividend-history.json").data;

const pos={};
for(const h of parseHoldingsCsv("data/sidefire/input/holdings.csv").holdings){
  if(h.kind!=="stock"||!h.code) continue;
  const p=(pos[h.code]??={name:h.name,shares:0,value:0});
  p.shares+=h.shares; p.value+=h.value;
}
const codes=Object.keys(pos);
for(const c of codes){ pos[c].s33=SEC[c]?.s33; pos[c].def=DEF.has(pos[c].s33); }

async function quote(c){
  try{
    const r=await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${c}.T?range=5d&interval=1d`,{headers:{"User-Agent":"Mozilla/5.0"}});
    const m=(await r.json())?.chart?.result?.[0]?.meta;
    if(!m?.regularMarketPrice) return null;
    return {px:m.regularMarketPrice, prev:m.chartPreviousClose??m.previousClose, time:m.regularMarketTime};
  }catch{return null;}
}
process.stdout.write("現在値を取得中… ");
const q={};
for(let i=0;i<codes.length;i+=10){
  const b=codes.slice(i,i+10); const g=await Promise.all(b.map(quote));
  b.forEach((c,j)=>{ if(g[j]) q[c]=g[j]; }); process.stdout.write(".");
}
console.log(` 完了（${Object.keys(q).length}/${codes.length}）`);
const t=Object.values(q)[0]?.time;
console.log("基準時刻:", t? new Date(t*1000).toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}) : "不明");

// 現在値で時価総額・利回り・比率を引き直す
let total=0;
for(const c of codes){ const Q=q[c]; pos[c].now = Q? Q.px*pos[c].shares : pos[c].value; total+=pos[c].now; }
const bySec={}; let defV=0;
for(const c of codes){ bySec[pos[c].s33]=(bySec[pos[c].s33]||0)+pos[c].now; if(pos[c].def) defV+=pos[c].now; }
const secPct=(s)=>(bySec[s]/total)*100, defPct=(defV/total)*100;

function score(c){
  const p=pos[c],h=hist[c],w=[];let pt=0;
  if(h){ if(h.noCut>=15){pt+=3;w.push(`非減配${h.noCut}年${h.capped?"以上":""} +3`);}
    else if(h.noCut>=10){pt+=2;w.push(`非減配${h.noCut}年 +2`);}
    else if(h.noCut>=5){pt+=1;w.push(`非減配${h.noCut}年 +1`);}
    if(h.covidDrop===0){pt+=3;w.push("コロナ減配なし +3");}
    else if(h.covidDrop>30){pt-=2;w.push(`コロナ${h.covidDrop}%減 −2`);} }
  if(p.def&&defPct<RULE.targetDefensive){pt+=2;w.push("ディフェンシブ +2");}
  const sp=secPct(p.s33);
  if(sp<5){pt+=2;w.push(`${p.s33}に余裕 +2`);} else if(sp<8){pt+=1;w.push(`${p.s33}に余裕 +1`);}
  const y=(master.perShare[c]/(q[c]?.px??1))*100;
  if(y>=4){pt+=1;w.push(`利回り${y.toFixed(1)}% +1`);}
  return {pt,why:w.join(" / ")};
}

const rows=[];
for(const c of codes){
  const Q=q[c]; if(!Q||!master.perShare[c]) continue;
  const y=(master.perShare[c]/Q.px)*100, wt=(pos[c].now/total)*100;
  const chg=Q.prev? (Q.px/Q.prev-1)*100 : null;
  const rej=[];
  if(pol.watch?.[c]) rej.push("減配リスク");
  if(y<RULE.yieldMin) rej.push(`利回り${y.toFixed(1)}%`);
  if(y>RULE.yieldMax) rej.push(`利回り高すぎ${y.toFixed(1)}%`);
  if(!hist[c]||hist[c].noCut<RULE.minNoCut) rej.push(`非減配${hist[c]?.noCut??"?"}年`);
  if(wt>RULE.maxWeight) rej.push(`比率${wt.toFixed(1)}%`);
  if(secPct(pos[c].s33)>RULE.maxSector) rej.push(`${pos[c].s33}${secPct(pos[c].s33).toFixed(1)}%`);
  rows.push({c,name:pos[c].name,s33:pos[c].s33,y,wt,chg,ok:!rej.length,rej,...score(c),def:pos[c].def,h:hist[c]});
}
const down=rows.filter(r=>r.ok&&r.chg<0).sort((a,b)=>b.pt-a.pt||a.chg-b.chg);
console.log(`\n本日下落: ${rows.filter(r=>r.chg<0).length}/${rows.length}銘柄　うち条件を満たすもの: ${down.length}件`);
console.log(`ディフェンシブ比率 ${defPct.toFixed(1)}%（目標${RULE.targetDefensive}%）\n`);
console.log("点 コード 銘柄            業種          本日   利回り 非減配 コロナ 比率");
for(const r of down.slice(0,20))
  console.log(`${String(r.pt).padStart(2)} ${r.c} ${r.name.padEnd(14)} ${r.s33.padEnd(12)} ${r.chg.toFixed(1).padStart(5)}% ${r.y.toFixed(1).padStart(5)}% ${String(r.h.noCut).padStart(4)}年 ${(r.h.covidDrop===0?"○":"−"+r.h.covidDrop+"%").padStart(6)} ${r.wt.toFixed(1).padStart(4)}%`);
console.log("\n--- 内訳 ---");
for(const r of down.slice(0,8)) console.log(`  ${r.name}（${r.pt}点）: ${r.why}`);
