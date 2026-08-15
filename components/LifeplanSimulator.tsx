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
  asset: number;      // いまの資産(万円)
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
  age: 34, asset: 5831, income: 440, retire: 40,
  sideMonthly: 0, sideUntil: 65, livingNow: 15, livingAfter: 12.5, travel: 100,
  pensionStart: 65, pensionMonthly: 7, lumpAge: 60, lumpAmount: 769,
  yieldPct: 5, inflPct: 2, endAge: 95, children: [],
};

const PRESETS: { label: string; note: string; inputs: Inputs }[] = [
  {
    label: "あずき（記事の設定）",
    note: "34歳・独身。40歳でリタイアして旅行年100万円。年金はマクロ経済スライドの目減りを見て月7万円（いまの価値）、60歳にiDeCo769万円（いまの価値）",
    inputs: AZUKI,
  },
  {
    label: "子ども2人の世帯",
    note: "35歳夫婦・子5歳と2歳。世帯手取り650万円で65歳まで働き、子はオール公立から国公立大学へ。年金は夫婦で月18万円（いまの価値）",
    inputs: {
      age: 35, asset: 1000, income: 650, retire: 65,
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
    note: "50歳・資産3,000万円。60歳まで働いて、退職金1,000万円と65歳からの年金月13万円で暮らせるか",
    inputs: {
      age: 50, asset: 3000, income: 420, retire: 60,
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

type SimResult = {
  traj: number[];          // 各年齢末の資産（実質・万円）
  depleteAge: number | null;
  final: number;
  peak: number;
  eduTotal: number;
};

function simulate(inp: Inputs): SimResult {
  const rNom = inp.yieldPct / 100;
  const infl = inp.inflPct / 100;
  const rFull = (1 + rNom) / (1 + infl) - 1;          // 実質（積み上げ期）
  const rTaxed = (1 + rNom * 0.8) / (1 + infl) - 1;   // 実質（取り崩した年）
  let a = inp.asset;
  const traj: number[] = [];
  let depleteAge: number | null = null;
  let peak = a;
  let eduTotal = 0;
  for (let age = inp.age; age <= inp.endAge; age++) {
    const years = age - inp.age;
    const edu = inp.children.reduce((s, c) => s + eduCostAt(c, years), 0);
    eduTotal += edu;
    const income =
      (age < inp.retire ? inp.income : 0) +
      (age >= inp.retire && age < inp.sideUntil ? inp.sideMonthly * 12 : 0) +
      (age >= inp.pensionStart ? inp.pensionMonthly * 12 : 0);
    const living = (age < inp.retire ? inp.livingNow : inp.livingAfter) * 12;
    const net = income - living - inp.travel - edu;
    a = a * (1 + (net < 0 ? rTaxed : rFull)) + net;
    if (age === inp.lumpAge) a += inp.lumpAmount;
    if (a < 0 && depleteAge === null) depleteAge = age;
    if (a > peak) peak = a;
    traj.push(a);
  }
  return { traj, depleteAge, final: a, peak, eduTotal };
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

  // ---- SVG chart ----
  const chart = useMemo(() => {
    if (!result) return null;
    const W = 720, H = 300, padL = 66, padR = 16, padT = 18, padB = 34;
    const vals = result.traj.map((v) => Math.max(0, v));
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
  }, [result, inp.age, inp.retire, inp.pensionStart, inp.endAge]);

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
          <NumberField label="いまの資産" value={inp.asset} min={0} max={1000000} suffix="万円" onChange={(v) => set({ asset: v })} />
          <NumberField label="手取り年収（世帯）" value={inp.income} min={0} max={100000} suffix="万円" onChange={(v) => set({ income: v })} />
          <NumberField label="生活費（現役・月）" value={inp.livingNow} min={0} max={1000} step={0.5} suffix="万円" onChange={(v) => set({ livingNow: v })} />
        </div>
        <div style={{ fontSize: 11, color: GREEN, marginTop: 8 }}>生活費に教育費は入れないでください（下の子どもの欄から自動で計算します）</div>
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
          <NumberField label="退職後の生活費（月）" value={inp.livingAfter} min={0} max={1000} step={0.5} suffix="万円" onChange={(v) => set({ livingAfter: v })} />
          <NumberField label="退職後のゆるい収入（月）" value={inp.sideMonthly} min={0} max={100} step={0.5} suffix="万円" onChange={(v) => set({ sideMonthly: v })} />
          <NumberField label="ゆるい収入は何歳まで" value={inp.sideUntil} min={18} max={90} suffix="歳" onChange={(v) => set({ sideUntil: v })} />
          <NumberField label="旅行・特別支出（年）" value={inp.travel} min={0} max={10000} suffix="万円" onChange={(v) => set({ travel: v })} />
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
          年金・iDeCoとも<strong>いまの価値</strong>で入力してください。年金は物価スライドで実質が保たれる前提です。マクロ経済スライドの目減りを見込むなら、月額を1〜3割ほど下げて入れるのがおすすめです（<a href="/blog/lifeplan-one-line-95" style={{ color: GREEN_DARK }}>記事ではそうしています</a>）。
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
              <div style={{ flex: "1 1 200px", background: "#fff", border: `2px solid ${result.depleteAge ? TERRA : GREEN}`, borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: result.depleteAge ? TERRA_DARK : GREEN_DARK }}>
                  {result.depleteAge ? "資産が尽きる年齢" : `${inp.endAge}歳時点の資産（いまの物価）`}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: result.depleteAge ? TERRA_DARK : GREEN_DARK, margin: "6px 0 2px" }}>
                  {result.depleteAge ? `${result.depleteAge}歳` : fmtMan(result.final)}
                </div>
                <div style={{ fontSize: 12, color: INK }}>
                  {result.depleteAge ? "この条件では最後まで持ちません" : "最後まで持ちます"}
                </div>
              </div>
              <div style={{ flex: "1 1 200px", background: "#fff", border: "2px solid #c8d8c0", borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: GREEN_DARK }}>資産のピーク（いまの物価）</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: INK, margin: "6px 0 2px" }}>{fmtMan(result.peak)}</div>
                <div style={{ fontSize: 12, color: INK }}>いちばん増えたときの金額</div>
              </div>
              {result.eduTotal > 0 && (
                <div style={{ flex: "1 1 200px", background: "#fff", border: "2px solid #c8d8c0", borderRadius: 16, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: GREEN_DARK }}>教育費の合計</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: INK, margin: "6px 0 2px" }}>{fmtMan(result.eduTotal)}</div>
                  <div style={{ fontSize: 12, color: INK }}>この先かかるぶん（いまの物価）</div>
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
          </>
        )
      )}

      <div style={{ marginTop: 12, fontSize: 11, color: GREEN, lineHeight: 1.8 }}>
        ※ すべて「いまの物価」に直した実質値で計算・表示しています（実質利回り＝名目÷インフレ）。取り崩した年は利益に約20%の税金がかかるとして利回りを2割引きにしています。運用は毎年一定と置いた計算なので、<strong>取り崩し初期に暴落が来ると結果はこれより悪くなります</strong>。社会保険料・住宅ローン・児童手当などは入っていません。あくまで「考えるための道具」です。
      </div>
    </div>
  );
}
