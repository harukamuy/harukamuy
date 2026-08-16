"use client";

import { useEffect, useMemo, useState } from "react";

// ライフプラン・シミュレーター。
// すべて「いまの物価」に直した実質値で計算・表示する。
//   実質利回り = (1+名目利回り) ÷ (1+インフレ) − 1
//   取り崩した年（収支がマイナスの年）は、利益に約20%の税金がかかるとして
//   名目利回りを2割引きにしてから実質化する（簡略化）。
// 年金は「いまの価値の月額」を入力し、物価スライドで実質一定として扱う。
// 教育費は文科省「令和5年度子供の学習費調査」と大学の標準額・平均額をデフォルトにした。

const GREEN = "#5a8a50";
const GREEN_DARK = "#4a6640";
const TERRA = "#d98a4a";
const TERRA_DARK = "#c0704a";
const INK = "#3a5030";

// ── 教育費（万円/年・いまの物価） ──
// 幼小中高: 文科省「令和5年度子供の学習費調査」の学習費総額（学校外活動費込み）
// 大学: 国公立=入学金+授業料の4年総額243万を年割り、私立=文系408万・理系551万(4年総額)を年割り
// 院: 国立修士2年（入学金+授業料）約135万を年割り
const STAGE = {
  幼公: 18.5, 幼私: 34.7,
  小公: 36.7, 小私: 174.2,
  中公: 54.2, 中私: 156.0,
  高公: 59.7, 高私: 117.9,
} as const;

const COURSES = [
  { label: "オール公立", 幼: STAGE.幼公, 小: STAGE.小公, 中: STAGE.中公, 高: STAGE.高公 },
  { label: "高校だけ私立", 幼: STAGE.幼公, 小: STAGE.小公, 中: STAGE.中公, 高: STAGE.高私 },
  { label: "中学から私立", 幼: STAGE.幼公, 小: STAGE.小公, 中: STAGE.中私, 高: STAGE.高私 },
  { label: "オール私立", 幼: STAGE.幼私, 小: STAGE.小私, 中: STAGE.中私, 高: STAGE.高私 },
] as const;

const UNIV = [
  { label: "進学しない", annual: 0 },
  { label: "国公立（4年）", annual: 61 },
  { label: "私立文系（4年）", annual: 102 },
  { label: "私立理系（4年）", annual: 138 },
] as const;
const GRAD_ANNUAL = 68; // 大学院（修士2年・国立相当）の年額

type Child = { age: number; course: number; univ: number; grad: boolean };

type Inputs = {
  age: number;        // いまの年齢
  asset: number;      // いまの資産(万円) 現預金＋投資の合計
  cash: number;       // うち現預金(万円)。利回り0なのでインフレに負ける
  reserve: number;    // 生活防衛資金(万円・いまの価値)。ここは取り崩さず、割りそうなら投資から補充する
  invest: number;     // 年間の投資額(万円)。現預金から投資へ移す
  investUntil: number; // 何歳まで投資を続けるか
  raisePct: number;   // 昇給率(名目・年%)
  income: number;     // 世帯の手取り年収(万円) 退職まで
  retire: number;     // 退職年齢（収入が止まる）
  sideMonthly: number;   // 退職後のゆるい収入(月・万円)
  sideUntil: number;     // ゆるい収入を何歳まで
  livingNow: number;     // 現役の生活費(月・万円) 教育費は含めない
  livingAfter: number;   // 退職後の生活費(月・万円)
  travel: number;        // 旅行・特別支出(年・万円) 生涯つづく
  pensionStart: number;  // 年金の開始年齢
  pensionMonthly: number; // 年金(月・万円・いまの価値)
  lumpAge: number;       // iDeCo・退職金の受取年齢
  lumpAmount: number;    // iDeCo・退職金(万円・いまの価値)
  yieldPct: number;      // 想定利回り(名目・%)
  inflPct: number;       // インフレ(%)
  endAge: number;        // 何歳まで見るか
  children: Child[];
};

const AZUKI: Inputs = {
  age: 34, asset: 5831, cash: 300, reserve: 300, invest: 160, investUntil: 40, raisePct: 2,
  income: 440, retire: 40,
  sideMonthly: 0, sideUntil: 65, livingNow: 15, livingAfter: 12.5, travel: 100,
  pensionStart: 65, pensionMonthly: 7, lumpAge: 60, lumpAmount: 769,
  yieldPct: 5, inflPct: 2, endAge: 95, children: [],
};

const PRESETS: { label: string; note: string; inputs: Inputs }[] = [
  {
    label: "あずき（記事の設定）",
    note: "34歳・独身。40歳でリタイアして旅行年100万円。年金は目減りを見て月7万円（いまの価値）、60歳にiDeCo769万円、生活防衛資金300万円は現預金のまま。記事と同じ前提です。ただし記事は「いまの物価」で書いているので、このツール（そのときの金額）とは見え方が違います。iDeCoの掛金（月5,000円）だけ入れる欄がないので、記事より少しだけ多めに出ます",
    inputs: AZUKI,
  },
  {
    label: "子ども2人の世帯",
    note: "35歳夫婦・子5歳と2歳。世帯手取り650万円で65歳まで働き、子はオール公立から国公立大学へ。年金は夫婦で月18万円（いまの価値）。ねんきん定期便の見込み額そのままで、将来の目減りは見ていません",
    inputs: {
      age: 35, asset: 1000, cash: 300, reserve: 300, invest: 260, investUntil: 65, raisePct: 1.5,
      income: 650, retire: 65,
      sideMonthly: 0, sideUntil: 65, livingNow: 28, livingAfter: 24, travel: 30,
      pensionStart: 65, pensionMonthly: 18, lumpAge: 65, lumpAmount: 1000,
      yieldPct: 5, inflPct: 2, endAge: 95,
      children: [
        { age: 5, course: 0, univ: 1, grad: false },
        { age: 2, course: 0, univ: 1, grad: false },
      ],
    },
  },
  {
    label: "50歳からの老後チェック",
    note: "50歳・資産3,000万円。60歳まで働いて、退職金1,000万円と65歳からの年金月13万円（見込み額そのまま。目減りは見ていません）で暮らせるか",
    inputs: {
      age: 50, asset: 3000, cash: 400, reserve: 400, invest: 160, investUntil: 60, raisePct: 0.5,
      income: 420, retire: 60,
      sideMonthly: 5, sideUntil: 65, livingNow: 20, livingAfter: 18, travel: 20,
      pensionStart: 65, pensionMonthly: 13, lumpAge: 60, lumpAmount: 1000,
      yieldPct: 5, inflPct: 2, endAge: 95, children: [],
    },
  },
];

function eduCostAt(c: Child, yearsAhead: number): number {
  const a = c.age + yearsAhead;
  const course = COURSES[c.course];
  if (a >= 3 && a <= 5) return course.幼;
  if (a >= 6 && a <= 11) return course.小;
  if (a >= 12 && a <= 14) return course.中;
  if (a >= 15 && a <= 17) return course.高;
  if (a >= 18 && a <= 21) return UNIV[c.univ].annual;
  if (c.grad && (a === 22 || a === 23)) return GRAD_ANNUAL;
  return 0;
}

type Row = {
  age: number; income: number; living: number; edu: number; travel: number;
  net: number; invested: number; cash: number; asset: number;
  factor: number;    // その年のお金の流れ（収入・支出）を名目に直す指数
  factorEnd: number; // 年末の残高（投資・現預金）を名目に直す指数。1年ぶん先
};

type SimResult = {
  rows: Row[];
  depleteAge: number | null;
  final: number;
  peak: number;
  eduTotal: number;
};

function simulate(inp: Inputs): SimResult {
  const rNom = inp.yieldPct / 100;
  const infl = inp.inflPct / 100;
  const rFull = (1 + rNom) / (1 + infl) - 1;          // 投資の実質利回り
  const rCash = 1 / (1 + infl) - 1;                    // 現預金は名目0%＝インフレぶん目減り
  const rSell = (1 + rNom * 0.8) / (1 + infl) - 1;     // 取り崩した年は税ぶん割り引く
  let cash = Math.min(inp.cash, inp.asset);
  let inv = Math.max(0, inp.asset - cash);
  const rows: Row[] = [];
  let depleteAge: number | null = null;
  let peak = inp.asset;
  let eduTotal = 0;
  for (let age = inp.age; age <= inp.endAge; age++) {
    const years = age - inp.age;
    const edu = inp.children.reduce((s, c) => s + eduCostAt(c, years), 0);
    eduTotal += edu;
    // 昇給は名目。実質に直すため物価で割る
    const raise = Math.pow((1 + inp.raisePct / 100) / (1 + infl), years);
    const salary = age < inp.retire ? inp.income * raise : 0;
    const side = age >= inp.retire && age < inp.sideUntil ? inp.sideMonthly * 12 : 0;
    const pension = age >= inp.pensionStart ? inp.pensionMonthly * 12 : 0;
    const income = salary + side + pension;
    const living = (age < inp.retire ? inp.livingNow : inp.livingAfter) * 12;
    const net = income - living - inp.travel - edu;
    const invAmt = age <= inp.investUntil ? inp.invest : 0;

    // 運用（取り崩す年は税ぶん割り引く）
    inv = inv * (1 + (net < 0 ? rSell : rFull));
    cash = cash * (1 + rCash);
    // 収支と積立を反映
    cash += net - invAmt;
    inv += invAmt;
    if (age === inp.lumpAge) inv += inp.lumpAmount;   // 受け取ったお金は運用に回す前提
    // 生活防衛資金を割りそうなら、投資を取り崩して現預金に戻す
    // （現預金は使わず、取り崩しは投資から）
    if (cash < inp.reserve) {
      const need = inp.reserve - cash;
      const take = Math.min(need, Math.max(0, inv));
      inv -= take;
      cash += take;
    }
    // 投資も尽きたら、最後は現預金を使うしかない
    if (cash < 0) { inv += cash; cash = 0; }

    const asset = cash + inv;
    if (asset < 0 && depleteAge === null) depleteAge = age;
    if (asset > peak) peak = asset;
    // お金の流れは「その年」の物価（1行目は入力どおり）、残高は「年末」の物価で名目に戻す
    rows.push({
      age, income, living, edu, travel: inp.travel, net,
      invested: Math.max(0, inv), cash, asset,
      factor: Math.pow(1 + infl, years), factorEnd: Math.pow(1 + infl, years + 1),
    });
  }
  return { rows, depleteAge, final: rows[rows.length - 1].asset, peak, eduTotal };
}

function fmtMan(x: number): string {
  if (!isFinite(x)) return "-";
  const v = Math.round(x);
  if (Math.abs(v) >= 10000) return `${(v / 10000).toFixed(2)}億円`;
  return `${v.toLocaleString()}万円`;
}

function NumberField({
  label, value, min, max, step, suffix, onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number; suffix: string;
  onChange: (v: number) => void;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => {
    if (Number(text === "" ? 0 : text) !== value) setText(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: GREEN_DARK, fontWeight: 700 }}>
      {label}
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          type="number" value={text} min={min} max={max} step={step ?? 1}
          onChange={(e) => {
            const raw = e.target.value;
            setText(raw);
            if (raw === "") { onChange(0); return; }
            const v = Number(raw);
            if (Number.isFinite(v)) onChange(v);
          }}
          onBlur={() => { if (text === "") setText(String(value)); }}
          style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #c8d8c0", borderRadius: 10, fontSize: 15, color: INK, background: "#fff", fontWeight: 700 }}
        />
        <span style={{ fontSize: 12, color: GREEN, fontWeight: 700, flexShrink: 0 }}>{suffix}</span>
      </span>
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid #c8d8c0", borderRadius: 16, padding: "14px 16px", marginTop: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: GREEN_DARK, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%", padding: "8px 10px", border: "1.5px solid #c8d8c0", borderRadius: 10,
  fontSize: 13, color: INK, background: "#fff", fontWeight: 700,
};

export default function LifeplanSimulator() {
  const [inp, setInp] = useState<Inputs>(PRESETS[0].inputs);
  const [activePreset, setActivePreset] = useState<number>(0);
  const set = (patch: Partial<Inputs>) => { setInp((p) => ({ ...p, ...patch })); setActivePreset(-1); };

  const applyPreset = (i: number) => {
    setInp(JSON.parse(JSON.stringify(PRESETS[i].inputs)));
    setActivePreset(i);
  };

  const invalid =
    inp.retire < inp.age || inp.endAge <= inp.age || inp.endAge > 110 ||
    inp.yieldPct < 0 || inp.inflPct < 0;

  const result = useMemo(() => (invalid ? null : simulate(inp)), [inp, invalid]);

  // 表示は「そのとき動く金額（名目）」に統一する。実質値 × 物価指数。
  // ただし結果カードだけは「いまの物価だといくらか」も併記して、
  // 金額が大きく見えるだけの錯覚が起きないようにする。
  const view = useMemo(() => {
    if (!result) return null;
    const rows = result.rows.map((r) => ({
      age: r.age, factor: r.factor,
      // お金の流れはその年の物価
      income: r.income * r.factor, living: r.living * r.factor, edu: r.edu * r.factor,
      travel: r.travel * r.factor, net: r.net * r.factor,
      // 残高は年末の物価（現預金が名目で動かないぶん、ここで正しく据え置きになる）
      invested: r.invested * r.factorEnd, cash: r.cash * r.factorEnd, asset: r.asset * r.factorEnd,
    }));
    const peakIdx = rows.reduce((bi, r, i) => (r.asset > rows[bi].asset ? i : bi), 0);
    return {
      rows,
      eduTotal: result.rows.reduce((s, r) => s + r.edu * r.factor, 0),
      // 実質の併記はそのまま（いまの物価のまま）
      eduTotalReal: result.eduTotal,
      final: rows[rows.length - 1].asset,
      finalReal: result.rows[result.rows.length - 1].asset,
      peak: rows[peakIdx].asset,
      peakReal: result.rows[peakIdx].asset,
      peakAge: rows[peakIdx].age,
    };
  }, [result]);

  // ---- SVG chart ----
  const chart = useMemo(() => {
    if (!result || !view) return null;
    const W = 720, H = 300, padL = 66, padR = 16, padT = 18, padB = 34;
    const vals = view!.rows.map((r) => Math.max(0, r.asset));
    const maxV = Math.max(...vals, 1);
    const n = vals.length;
    const x = (i: number) => padL + ((W - padL - padR) * i) / Math.max(1, n - 1);
    const y = (v: number) => H - padB - ((H - padT - padB) * v) / maxV;
    const line = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const yTicks = [0.25, 0.5, 0.75, 1].map((f) => ({ v: maxV * f, yy: y(maxV * f) }));
    const xTicks: { age: number; xx: number }[] = [];
    for (let i = 0; i < n; i++) {
      const age = inp.age + i;
      if (age % 10 === 0 || i === n - 1 || i === 0) xTicks.push({ age, xx: x(i) });
    }
    const marks: { age: number; label: string }[] = [];
    if (inp.retire > inp.age && inp.retire <= inp.endAge) marks.push({ age: inp.retire, label: "退職" });
    if (inp.pensionStart > inp.age && inp.pensionStart <= inp.endAge) marks.push({ age: inp.pensionStart, label: "年金" });
    const vlines = marks.map((m) => ({ ...m, xx: x(m.age - inp.age) }));
    const deplete = result.depleteAge !== null
      ? { xx: x(result.depleteAge - inp.age), yy: y(0) } : null;
    return { W, H, line, yTicks, xTicks, vlines, deplete, y0: y(0) };
  }, [result, view, inp.age, inp.retire, inp.pensionStart, inp.endAge]);

  return (
    <div style={{ background: "#f0f5ee", border: "1.5px solid #c8d8c0", borderRadius: 16, padding: "20px 18px 22px" }}>
      {/* プリセット */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => applyPreset(i)}
            style={{
              fontSize: 12, fontWeight: 700, padding: "8px 12px", borderRadius: 999,
              border: `1.5px solid ${activePreset === i ? GREEN_DARK : "#c8d8c0"}`,
              background: activePreset === i ? GREEN_DARK : "#fff",
              color: activePreset === i ? "#fff" : GREEN_DARK, cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      {activePreset >= 0 && <div style={{ fontSize: 12, color: GREEN, marginBottom: 8 }}>{PRESETS[activePreset].note}</div>}

      {/* 世帯・資産 */}
      <Section title="👤 いまの状態（収入・生活費・年金は世帯の合計で。単身でも夫婦でも使えます）">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          <NumberField label="いまの年齢" value={inp.age} min={18} max={90} suffix="歳" onChange={(v) => set({ age: v })} />
          <NumberField label="いまの資産（合計）" value={inp.asset} min={0} max={1000000} suffix="万円" onChange={(v) => set({ asset: v })} />
          <NumberField label="うち現預金" value={inp.cash} min={0} max={1000000} suffix="万円" onChange={(v) => set({ cash: v })} />
          <NumberField label="生活防衛資金（取り崩さない額）" value={inp.reserve} min={0} max={1000000} suffix="万円" onChange={(v) => set({ reserve: v })} />
          <NumberField label="手取り年収（世帯）" value={inp.income} min={0} max={100000} suffix="万円" onChange={(v) => set({ income: v })} />
          <NumberField label="生活費（現役・月）" value={inp.livingNow} min={0} max={1000} step={0.5} suffix="万円" onChange={(v) => set({ livingNow: v })} />
        </div>
        <div style={{ fontSize: 11, color: GREEN, marginTop: 8, lineHeight: 1.8 }}>生活費に教育費は入れないでください（下の子どもの欄から自動で計算します）。<strong>現預金は利回り0%</strong>です。<strong>生活防衛資金はいまの価値で保ちます</strong>。この額を割りそうになると投資を取り崩して戻すので、<strong>取り崩しは投資のほうから</strong>進みます（表の現預金が名目で増えていくのは、同じ買い物ができる状態を保つためです）。</div>
      </Section>

      {/* 子ども */}
      <Section title="👶 子ども（教育費を自動計算）">
        {inp.children.length === 0 && <div style={{ fontSize: 12, color: GREEN }}>いまは子どもなしの設定です。</div>}
        {inp.children.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, alignItems: "end", padding: "10px 0", borderTop: i > 0 ? "1px dashed #c8d8c0" : "none" }}>
            <NumberField label={`${i + 1}人目のいまの年齢`} value={c.age} min={0} max={30} suffix="歳"
              onChange={(v) => set({ children: inp.children.map((cc, j) => (j === i ? { ...cc, age: v } : cc)) })} />
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: GREEN_DARK, fontWeight: 700 }}>
              小・中・高
              <select value={c.course} style={selectStyle}
                onChange={(e) => set({ children: inp.children.map((cc, j) => (j === i ? { ...cc, course: Number(e.target.value) } : cc)) })}>
                {COURSES.map((co, k) => <option key={co.label} value={k}>{co.label}</option>)}
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: GREEN_DARK, fontWeight: 700 }}>
              大学
              <select value={c.univ} style={selectStyle}
                onChange={(e) => set({ children: inp.children.map((cc, j) => (j === i ? { ...cc, univ: Number(e.target.value) } : cc)) })}>
                {UNIV.map((u, k) => <option key={u.label} value={k}>{u.label}</option>)}
              </select>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: GREEN_DARK, fontWeight: 700, paddingBottom: 8 }}>
              <input type="checkbox" checked={c.grad} style={{ accentColor: GREEN_DARK, width: 16, height: 16 }}
                onChange={(e) => set({ children: inp.children.map((cc, j) => (j === i ? { ...cc, grad: e.target.checked } : cc)) })} />
              大学院（修士2年）
            </label>
            <button
              onClick={() => set({ children: inp.children.filter((_, j) => j !== i) })}
              style={{ fontSize: 12, fontWeight: 700, padding: "8px 10px", borderRadius: 10, border: `1.5px solid ${TERRA}`, background: "#fff", color: TERRA_DARK, cursor: "pointer" }}
            >
              削除
            </button>
          </div>
        ))}
        {inp.children.length < 4 && (
          <button
            onClick={() => set({ children: [...inp.children, { age: 0, course: 0, univ: 1, grad: false }] })}
            style={{ marginTop: 8, fontSize: 12, fontWeight: 700, padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${GREEN_DARK}`, background: "#fff", color: GREEN_DARK, cursor: "pointer" }}
          >
            ＋ 子どもを追加
          </button>
        )}
        <div style={{ fontSize: 11, color: GREEN, marginTop: 8, lineHeight: 1.8 }}>
          幼稚園〜高校は文科省「令和5年度子供の学習費調査」の年額（塾など学校外活動費込み）、大学は国公立の標準額・私立の平均額（4年総額を年割り）を使っています。<strong>下宿の仕送りは入っていない</strong>ので、必要なら生活費側に足してください。
        </div>
      </Section>

      {/* 働き方 */}
      <Section title="💼 いつまで働くか">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          <NumberField label="退職する年齢" value={inp.retire} min={18} max={90} suffix="歳" onChange={(v) => set({ retire: v })} />
          <NumberField label="昇給率（名目・年）" value={inp.raisePct} min={-5} max={10} step={0.1} suffix="%" onChange={(v) => set({ raisePct: v })} />
          <NumberField label="退職後の生活費（月）" value={inp.livingAfter} min={0} max={1000} step={0.5} suffix="万円" onChange={(v) => set({ livingAfter: v })} />
          <NumberField label="退職後のゆるい収入（月）" value={inp.sideMonthly} min={0} max={100} step={0.5} suffix="万円" onChange={(v) => set({ sideMonthly: v })} />
          <NumberField label="ゆるい収入は何歳まで" value={inp.sideUntil} min={18} max={90} suffix="歳" onChange={(v) => set({ sideUntil: v })} />
          <NumberField label="旅行・特別支出（年）" value={inp.travel} min={0} max={10000} suffix="万円" onChange={(v) => set({ travel: v })} />
        </div>
      </Section>

      {/* 積立 */}
      <Section title="💰 毎年の積立">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          <NumberField label="年間の投資額" value={inp.invest} min={0} max={10000} suffix="万円" onChange={(v) => set({ invest: v })} />
          <NumberField label="何歳まで積み立てる" value={inp.investUntil} min={18} max={90} suffix="歳" onChange={(v) => set({ investUntil: v })} />
        </div>
        <div style={{ fontSize: 11, color: GREEN, marginTop: 8, lineHeight: 1.8 }}>
          現預金から投資へ移すお金です。<strong>余ったお金が自動で投資される計算ではありません</strong>。積立が収支を上回ると現預金が減り、足りなくなったら投資を取り崩します。
        </div>
      </Section>

      {/* 年金・iDeCo */}
      <Section title="🏛 年金・iDeCo・退職金">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          <NumberField label="年金の開始年齢" value={inp.pensionStart} min={60} max={75} suffix="歳" onChange={(v) => set({ pensionStart: v })} />
          <NumberField label="年金（世帯・月）" value={inp.pensionMonthly} min={0} max={100} step={0.5} suffix="万円" onChange={(v) => set({ pensionMonthly: v })} />
          <NumberField label="iDeCo・退職金の受取年齢" value={inp.lumpAge} min={50} max={80} suffix="歳" onChange={(v) => set({ lumpAge: v })} />
          <NumberField label="iDeCo・退職金の額" value={inp.lumpAmount} min={0} max={100000} suffix="万円" onChange={(v) => set({ lumpAmount: v })} />
        </div>
        <div style={{ fontSize: 11, color: GREEN, marginTop: 8, lineHeight: 1.8 }}>
          年金・iDeCoとも<strong>いまの価値</strong>で入力してください。年金は物価スライドで実質が保たれる前提です。<br />
          将来の目減り（マクロ経済スライド）を見込むなら、<strong>基礎年金の部分だけ</strong>を2割ほど下げてください。会社員期間の厚生年金（報酬比例）はほとんど削られないので、月額を丸ごと減らすと下げすぎになります。たとえば基礎6.5万円＋厚生2.5万円で月9万円の人なら、基礎だけ2割引いて<strong>月7.9万円</strong>です。<br />
          よく聞く「3割目減り」は現役世代の手取りと<strong>比べた比率</strong>の話で、このツールは物価ベースなので、そのまま当てはめると下げすぎになります（<a href="/blog/lifeplan-one-line-95" style={{ color: GREEN_DARK }}>記事はあえて厳しめに月7万円で置いています</a>）。
        </div>
      </Section>

      {/* 運用・表示 */}
      <Section title="📈 運用とインフレ">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: GREEN_DARK, fontWeight: 700 }}>
            想定利回り（名目・年率）: <span style={{ fontSize: 18, color: INK }}>{inp.yieldPct.toFixed(1)}%</span>
            <input type="range" min={0} max={10} step={0.1} value={inp.yieldPct}
              onChange={(e) => set({ yieldPct: Number(e.target.value) })} style={{ accentColor: GREEN_DARK }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: GREEN_DARK, fontWeight: 700 }}>
            インフレ（年率）: <span style={{ fontSize: 18, color: INK }}>{inp.inflPct.toFixed(1)}%</span>
            <input type="range" min={0} max={5} step={0.1} value={inp.inflPct}
              onChange={(e) => set({ inflPct: Number(e.target.value) })} style={{ accentColor: GREEN_DARK }} />
          </label>
          <NumberField label="何歳まで見るか" value={inp.endAge} min={60} max={105} suffix="歳" onChange={(v) => set({ endAge: v })} />
        </div>
        <div style={{ fontSize: 11, color: GREEN, marginTop: 8 }}>
          実質利回り（物価を引いたあと）: <strong>{(((1 + inp.yieldPct / 100) / (1 + inp.inflPct / 100) - 1) * 100).toFixed(1)}%</strong>
          {inp.raisePct !== 0 && (
            <> ／ 実質の昇給率: <strong>{(((1 + inp.raisePct / 100) / (1 + inp.inflPct / 100) - 1) * 100).toFixed(1)}%</strong>（昇給がインフレと同じなら実質0%）</>
          )}
        </div>
      </Section>

      {/* 結果 */}
      {invalid ? (
        <div style={{ marginTop: 14, fontSize: 13, color: TERRA_DARK, fontWeight: 700 }}>
          設定を確認してください（いまの年齢 ≦ 退職年齢、見る年齢はいまより先に）。
        </div>
      ) : (
        result && (
          <>
            <div style={{ marginTop: 16, fontSize: 12, color: GREEN, lineHeight: 1.8, background: "#fff", border: "1.5px solid #c8d8c0", borderRadius: 12, padding: "10px 14px" }}>
              💴 金額は<strong>そのとき実際に動く金額</strong>で出しています。物価が上がるぶん、支出も年{inp.inflPct}%ずつ増えていきます。ただし
              <strong>金額が大きく見えても、価値が増えたわけではありません</strong>。下の結果には「いまの物価だといくらか」も添えました。
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
              <div style={{ flex: "1 1 200px", background: "#fff", border: `2px solid ${result.depleteAge ? TERRA : GREEN}`, borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: result.depleteAge ? TERRA_DARK : GREEN_DARK }}>
                  {result.depleteAge ? "資産が尽きる年齢" : `${inp.endAge}歳時点の資産`}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: result.depleteAge ? TERRA_DARK : GREEN_DARK, margin: "6px 0 2px" }}>
                  {result.depleteAge ? `${result.depleteAge}歳` : fmtMan(view!.final)}
                </div>
                <div style={{ fontSize: 12, color: INK }}>
                  {result.depleteAge ? "この条件では最後まで持ちません" : <>いまの物価だと <strong>{fmtMan(view!.finalReal)}</strong></>}
                </div>
              </div>
              <div style={{ flex: "1 1 200px", background: "#fff", border: "2px solid #c8d8c0", borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: GREEN_DARK }}>資産のピーク（{view!.peakAge}歳）</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: INK, margin: "6px 0 2px" }}>{fmtMan(view!.peak)}</div>
                <div style={{ fontSize: 12, color: INK }}>いまの物価だと <strong>{fmtMan(view!.peakReal)}</strong></div>
              </div>
              {view!.eduTotal > 0 && (
                <div style={{ flex: "1 1 200px", background: "#fff", border: "2px solid #c8d8c0", borderRadius: 16, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: GREEN_DARK }}>教育費の合計</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: INK, margin: "6px 0 2px" }}>{fmtMan(view!.eduTotal)}</div>
                  <div style={{ fontSize: 12, color: INK }}>いまの物価だと <strong>{fmtMan(view!.eduTotalReal)}</strong></div>
                </div>
              )}
            </div>

            {/* グラフ */}
            {chart && (
              <div style={{ marginTop: 14, background: "#fff", border: "1.5px solid #c8d8c0", borderRadius: 16, padding: "12px 8px 6px" }}>
                <svg viewBox={`0 0 ${chart.W} ${chart.H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="資産推移のグラフ">
                  {chart.yTicks.map((t) => (
                    <g key={t.v}>
                      <line x1={66} y1={t.yy} x2={chart.W - 16} y2={t.yy} stroke="#e4ede0" strokeWidth={1} />
                      <text x={60} y={t.yy + 4} fontSize={11} fill={GREEN} textAnchor="end">{fmtMan(t.v)}</text>
                    </g>
                  ))}
                  <line x1={66} y1={chart.y0} x2={chart.W - 16} y2={chart.y0} stroke="#c8d8c0" strokeWidth={1.5} />
                  {chart.vlines.map((m) => (
                    <g key={m.label}>
                      <line x1={m.xx} y1={18} x2={m.xx} y2={chart.H - 34} stroke="#c8d8c0" strokeWidth={1} strokeDasharray="4 4" />
                      <text x={m.xx} y={14} fontSize={10} fill={GREEN} textAnchor="middle">{m.label}{m.age}歳</text>
                    </g>
                  ))}
                  {chart.xTicks.map((t) => (
                    <text key={t.age} x={t.xx} y={chart.H - 12} fontSize={11} fill={INK} textAnchor="middle">{t.age}歳</text>
                  ))}
                  <polyline points={chart.line} fill="none" stroke={GREEN} strokeWidth={2.5} />
                  {chart.deplete && (
                    <g>
                      <circle cx={chart.deplete.xx} cy={chart.deplete.yy} r={5} fill={TERRA_DARK} />
                      <text x={chart.deplete.xx} y={chart.deplete.yy - 10} fontSize={11} fill={TERRA_DARK} textAnchor="middle" fontWeight={700}>ここで尽きる</text>
                    </g>
                  )}
                </svg>
              </div>
            )}

            {/* 年ごとの明細 */}
            <details style={{ marginTop: 14, background: "#fff", border: "1.5px solid #c8d8c0", borderRadius: 16, padding: "12px 14px" }}>
              <summary style={{ cursor: "pointer", fontSize: 13, fontWeight: 700, color: GREEN_DARK }}>
                📋 年ごとの明細を見る（{view!.rows.length}年ぶん）
              </summary>
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginTop: 10 }}>
                <table style={{ borderCollapse: "collapse", fontSize: 12, minWidth: 620, width: "100%" }}>
                  <thead>
                    <tr>
                      {["年齢", "収入", "生活費", "教育費", "旅行", "収支", "投資", "現預金", "資産計"].map((h, i) => (
                        <th key={h} style={{
                          background: "#e6efe0", color: GREEN_DARK, fontWeight: 700,
                          padding: "7px 8px", textAlign: i === 0 ? "left" : "right",
                          position: "sticky", top: 0, whiteSpace: "nowrap",
                          borderBottom: "1.5px solid #c8d8c0",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {view!.rows.map((r) => {
                      const isEvent = r.age === inp.retire || r.age === inp.pensionStart || r.age === inp.lumpAge;
                      const gone = r.asset < 0;
                      return (
                        <tr key={r.age} style={{ background: gone ? "#fdecec" : isEvent ? "#f7ede0" : r.age % 2 ? "#fbfdfa" : "#fff" }}>
                          <td style={{ padding: "6px 8px", color: INK, fontWeight: isEvent ? 700 : 400, whiteSpace: "nowrap" }}>
                            {r.age}歳
                            {r.age === inp.retire && <span style={{ color: TERRA_DARK, fontSize: 10 }}> 退職</span>}
                            {r.age === inp.pensionStart && <span style={{ color: TERRA_DARK, fontSize: 10 }}> 年金</span>}
                            {r.age === inp.lumpAge && <span style={{ color: TERRA_DARK, fontSize: 10 }}> 受取</span>}
                          </td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: INK }}>{Math.round(r.income).toLocaleString()}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: INK }}>{Math.round(r.living).toLocaleString()}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: r.edu > 0 ? TERRA_DARK : "#bbb" }}>{r.edu > 0 ? Math.round(r.edu).toLocaleString() : "-"}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: r.travel > 0 ? INK : "#bbb" }}>{r.travel > 0 ? Math.round(r.travel).toLocaleString() : "-"}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", fontWeight: 700, color: r.net < 0 ? TERRA_DARK : GREEN_DARK }}>
                            {r.net >= 0 ? "+" : ""}{Math.round(r.net).toLocaleString()}
                          </td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: INK }}>{Math.round(r.invested).toLocaleString()}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: INK }}>{Math.round(r.cash).toLocaleString()}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", fontWeight: 700, color: gone ? TERRA_DARK : INK, background: gone ? "#fdecec" : "#fffdf5" }}>
                            {Math.round(r.asset).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: 11, color: GREEN, marginTop: 8, lineHeight: 1.8 }}>
                単位は万円。<strong>そのとき実際に動く金額</strong>で表示しています。いちばん上の行は<strong>今年</strong>で、入力した金額がそのまま入ります。そこから毎年{inp.inflPct}%ずつ増えていきます。<strong>収支</strong>は収入から生活費・教育費・旅行を引いたもので、ここから投資額を差し引いたぶんが現預金の増減になります。色のついた行は退職・年金開始・iDeCo受取の年です。
              </div>
            </details>
          </>
        )
      )}

      <div style={{ marginTop: 12, fontSize: 11, color: GREEN, lineHeight: 1.8 }}>
        ※ 金額は「そのとき実際に動く金額」で表示しています（内部ではいまの物価に直して計算し、表示のときに物価ぶんを戻しています）。取り崩した年は利益に約20%の税金がかかるとして利回りを2割引きにしています。現預金は利回り0%なので、物価が上がるぶん実質では目減りします。運用は毎年一定と置いた計算なので、<strong>取り崩し初期に暴落が来ると結果はこれより悪くなります</strong>。社会保険料・住宅ローン・児童手当などは入っていません。あくまで「考えるための道具」です。
      </div>
    </div>
  );
}
