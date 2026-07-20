"use client";

import { useEffect, useMemo, useState } from "react";

// ジャックとジルの積立投資シミュレーター。
// 前提: 毎年はじめに積立、年1回複利、税金・手数料は考慮しない。
// 各年の積立額は (1+r)^(評価年齢 - 積立年齢) で評価年齢まで成長する。

type Person = {
  initial: number; // 最初にまとめて投資する額(万円)。開始年齢のはじめに投資
  amount: number; // 年間積立額(万円)
  start: number; // 積立開始年齢
  end: number; // 積立終了年齢(この年齢まで積み立てる)
};

const GREEN = "#5a8a50";
const GREEN_DARK = "#4a6640";
const TERRA = "#d98a4a";
const TERRA_DARK = "#c0704a";
const INK = "#3a5030";

const PRESETS: {
  label: string;
  note: string;
  jill: Person;
  jack: Person;
  yieldPct: number;
  evalAge: number;
}[] = [
  {
    label: "古典のジャックとジル",
    note: "ジルは8年だけ、ジャックは38年。それでも高利回りならジルが勝つ有名な設定",
    jill: { initial: 0, amount: 40, start: 19, end: 26 },
    jack: { initial: 0, amount: 40, start: 27, end: 64 },
    yieldPct: 7,
    evalAge: 65,
  },
  {
    label: "大学に行かないジル vs 大卒のジャック",
    note: "ジル=学費ぶん410万円を18歳で一括投資し、働きながら28歳まで年40万円を積立。ジャック=学費は大学に使い、大卒の22歳から65歳まで年40万円を積立",
    jill: { initial: 410, amount: 40, start: 18, end: 28 },
    jack: { initial: 0, amount: 40, start: 22, end: 65 },
    yieldPct: 5,
    evalAge: 65,
  },
  {
    label: "毎月3万円、いま始める vs 10年後",
    note: "年36万円の積立を、25歳から始めるか35歳から始めるか",
    jill: { initial: 0, amount: 36, start: 25, end: 64 },
    jack: { initial: 0, amount: 36, start: 35, end: 64 },
    yieldPct: 5,
    evalAge: 65,
  },
];

function futureValue(p: Person, r: number, evalAge: number): number {
  let total = 0;
  if (evalAge >= p.start) total += p.initial * Math.pow(1 + r, evalAge - p.start);
  for (let a = p.start; a <= Math.min(p.end, evalAge); a++) {
    total += p.amount * Math.pow(1 + r, evalAge - a);
  }
  return total;
}

function trajectory(p: Person, r: number, fromAge: number, toAge: number): number[] {
  const values: number[] = [];
  for (let t = fromAge; t <= toAge; t++) {
    let v = 0;
    if (t >= p.start) v += p.initial * Math.pow(1 + r, t - p.start);
    for (let a = p.start; a <= Math.min(p.end, t); a++) {
      v += p.amount * Math.pow(1 + r, t - a);
    }
    values.push(v);
  }
  return values;
}

function principal(p: Person): number {
  return p.initial + p.amount * Math.max(0, p.end - p.start + 1);
}

function breakevenYield(jill: Person, jack: Person, evalAge: number): number | null {
  const f = (r: number) => futureValue(jill, r, evalAge) - futureValue(jack, r, evalAge);
  let lo = 0.0001;
  let hi = 0.2;
  const flo = f(lo);
  const fhi = f(hi);
  if (flo === 0) return lo;
  if (fhi === 0) return hi;
  if (flo * fhi > 0) return null; // 0〜20%の範囲で逆転しない
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

function fmtMan(x: number): string {
  if (!isFinite(x)) return "-";
  if (x >= 10000) return `${(x / 10000).toFixed(2)}億円`;
  return `${Math.round(x).toLocaleString()}万円`;
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  // 表示用の文字列は別に持つ。全部消したとき「0」が勝手に残らないようにするため。
  // 空欄のあいだは計算上0として扱い、フォーカスが外れたら値を表示に戻す。
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
          type="number"
          value={text}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) => {
            const raw = e.target.value;
            setText(raw);
            if (raw === "") {
              onChange(0);
              return;
            }
            const v = Number(raw);
            if (Number.isFinite(v)) onChange(v);
          }}
          onBlur={() => {
            if (text === "") setText(String(value));
          }}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1.5px solid #c8d8c0",
            borderRadius: 10,
            fontSize: 15,
            color: INK,
            background: "#fff",
            fontWeight: 700,
          }}
        />
        <span style={{ fontSize: 12, color: GREEN, fontWeight: 700, flexShrink: 0 }}>{suffix}</span>
      </span>
    </label>
  );
}

function PersonCard({
  name,
  color,
  colorDark,
  person,
  onChange,
}: {
  name: string;
  color: string;
  colorDark: string;
  person: Person;
  onChange: (p: Person) => void;
}) {
  return (
    <div
      style={{
        flex: "1 1 240px",
        background: "#fff",
        border: `2px solid ${color}`,
        borderRadius: 16,
        padding: "16px 16px 18px",
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 700, color: colorDark, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: color,
          }}
        />
        {name}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <NumberField
          label="最初に一括で投資"
          value={person.initial}
          min={0}
          max={100000}
          step={1}
          suffix="万円"
          onChange={(v) => onChange({ ...person, initial: v })}
        />
        <NumberField
          label="年間積立額(0でもOK)"
          value={person.amount}
          min={0}
          max={10000}
          step={1}
          suffix="万円"
          onChange={(v) => onChange({ ...person, amount: v })}
        />
        <NumberField
          label="積立を始める年齢"
          value={person.start}
          min={0}
          max={100}
          suffix="歳"
          onChange={(v) => onChange({ ...person, start: v })}
        />
        <NumberField
          label="積立をやめる年齢"
          value={person.end}
          min={0}
          max={100}
          suffix="歳"
          onChange={(v) => onChange({ ...person, end: v })}
        />
      </div>
    </div>
  );
}

export default function JackJillCalculator() {
  const [jill, setJill] = useState<Person>(PRESETS[0].jill);
  const [jack, setJack] = useState<Person>(PRESETS[0].jack);
  const [yieldPct, setYieldPct] = useState<number>(PRESETS[0].yieldPct);
  const [evalAge, setEvalAge] = useState<number>(PRESETS[0].evalAge);
  const [activePreset, setActivePreset] = useState<number>(0);

  const r = yieldPct / 100;

  const invalid =
    jill.start > jill.end ||
    jack.start > jack.end ||
    evalAge < Math.max(jill.end, jack.end) ||
    yieldPct < 0;

  const result = useMemo(() => {
    if (invalid) return null;
    const fvJill = futureValue(jill, r, evalAge);
    const fvJack = futureValue(jack, r, evalAge);
    const fromAge = Math.min(jill.start, jack.start);
    const trajJill = trajectory(jill, r, fromAge, evalAge);
    const trajJack = trajectory(jack, r, fromAge, evalAge);
    const be = breakevenYield(jill, jack, evalAge);
    return { fvJill, fvJack, fromAge, trajJill, trajJack, be };
  }, [jill, jack, r, evalAge, invalid]);

  const applyPreset = (i: number) => {
    setJill(PRESETS[i].jill);
    setJack(PRESETS[i].jack);
    setYieldPct(PRESETS[i].yieldPct);
    setEvalAge(PRESETS[i].evalAge);
    setActivePreset(i);
  };

  // ---- SVG chart ----
  const chart = useMemo(() => {
    if (!result) return null;
    const W = 720;
    const H = 300;
    const padL = 62;
    const padR = 16;
    const padT = 16;
    const padB = 34;
    const { fromAge, trajJill, trajJack } = result;
    const maxV = Math.max(...trajJill, ...trajJack, 1);
    const ages = trajJill.length;
    const x = (i: number) => padL + ((W - padL - padR) * i) / Math.max(1, ages - 1);
    const y = (v: number) => H - padB - ((H - padT - padB) * v) / maxV;
    const line = (vals: number[]) => vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const yTicks = [0.25, 0.5, 0.75, 1].map((f) => ({ v: maxV * f, yy: y(maxV * f) }));
    const xTickEvery = ages > 40 ? 10 : 5;
    const xTicks: { age: number; xx: number }[] = [];
    for (let i = 0; i < ages; i++) {
      const age = fromAge + i;
      if (age % xTickEvery === 0 || i === ages - 1) xTicks.push({ age, xx: x(i) });
    }
    return { W, H, padB, line, trajJill, trajJack, yTicks, xTicks, y };
  }, [result]);

  return (
    <div
      style={{
        background: "#f0f5ee",
        border: "1.5px solid #c8d8c0",
        borderRadius: 16,
        padding: "20px 18px 22px",
      }}
    >
      {/* プリセット */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => applyPreset(i)}
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "8px 12px",
              borderRadius: 999,
              border: `1.5px solid ${activePreset === i ? GREEN_DARK : "#c8d8c0"}`,
              background: activePreset === i ? GREEN_DARK : "#fff",
              color: activePreset === i ? "#fff" : GREEN_DARK,
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12, color: GREEN, marginBottom: 14 }}>{PRESETS[activePreset].note}</div>

      {/* ふたりの入力 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <PersonCard name="ジル(先に始める)" color={TERRA} colorDark={TERRA_DARK} person={jill} onChange={(p) => setJill(p)} />
        <PersonCard name="ジャック(あとから始める)" color={GREEN} colorDark={GREEN_DARK} person={jack} onChange={(p) => setJack(p)} />
      </div>

      {/* 共通条件 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          background: "#fff",
          border: "1.5px solid #c8d8c0",
          borderRadius: 16,
          padding: "14px 16px",
          marginTop: 12,
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: GREEN_DARK, fontWeight: 700 }}>
          想定利回り(年率): <span style={{ fontSize: 18, color: INK }}>{yieldPct.toFixed(1)}%</span>
          <input
            type="range"
            min={0}
            max={12}
            step={0.1}
            value={yieldPct}
            onChange={(e) => setYieldPct(Number(e.target.value))}
            style={{ accentColor: GREEN_DARK }}
          />
        </label>
        <NumberField label="いくつの時点で比べる?" value={evalAge} min={1} max={100} suffix="歳" onChange={setEvalAge} />
      </div>

      {/* 結果 */}
      {invalid ? (
        <div style={{ marginTop: 14, fontSize: 13, color: TERRA_DARK, fontWeight: 700 }}>
          年齢の設定を確認してください(開始 ≦ 終了 ≦ 比べる年齢)。
        </div>
      ) : (
        result && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
              {[
                { name: "ジル", color: TERRA_DARK, border: TERRA, fv: result.fvJill, pr: principal(jill) },
                { name: "ジャック", color: GREEN_DARK, border: GREEN, fv: result.fvJack, pr: principal(jack) },
              ].map((row) => (
                <div
                  key={row.name}
                  style={{
                    flex: "1 1 220px",
                    background: "#fff",
                    border: `2px solid ${row.border}`,
                    borderRadius: 16,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.name}の{evalAge}歳時点</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: row.color, margin: "6px 0 2px" }}>{fmtMan(row.fv)}</div>
                  <div style={{ fontSize: 12, color: INK }}>
                    元本 {fmtMan(row.pr)}
                    {row.pr > 0 && <>(約{(row.fv / row.pr).toFixed(1)}倍)</>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10, fontSize: 13, color: INK, fontWeight: 700 }}>
              {result.fvJill === result.fvJack
                ? "ふたりはぴったり同じ!"
                : result.fvJill > result.fvJack
                  ? `この条件では、ジルが ${fmtMan(result.fvJill - result.fvJack)} 多い`
                  : `この条件では、ジャックが ${fmtMan(result.fvJack - result.fvJill)} 多い`}
              {result.be !== null && (
                <span style={{ fontWeight: 400, color: GREEN, marginLeft: 8 }}>
                  (利回り約{(result.be * 100).toFixed(1)}%で、ふたりの勝敗が入れ替わります)
                </span>
              )}
            </div>

            {/* グラフ */}
            {chart && (
              <div style={{ marginTop: 14, background: "#fff", border: "1.5px solid #c8d8c0", borderRadius: 16, padding: "12px 8px 6px" }}>
                <svg viewBox={`0 0 ${chart.W} ${chart.H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="ジルとジャックの資産推移の比較グラフ">
                  {chart.yTicks.map((t) => (
                    <g key={t.v}>
                      <line x1={62} y1={t.yy} x2={chart.W - 16} y2={t.yy} stroke="#e4ede0" strokeWidth={1} />
                      <text x={56} y={t.yy + 4} fontSize={11} fill={GREEN} textAnchor="end">
                        {fmtMan(t.v)}
                      </text>
                    </g>
                  ))}
                  {chart.xTicks.map((t) => (
                    <text key={t.age} x={t.xx} y={chart.H - 12} fontSize={11} fill={INK} textAnchor="middle">
                      {t.age}歳
                    </text>
                  ))}
                  <polyline points={chart.line(chart.trajJack)} fill="none" stroke={GREEN} strokeWidth={2.5} />
                  <polyline points={chart.line(chart.trajJill)} fill="none" stroke={TERRA} strokeWidth={2.5} />
                </svg>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", padding: "4px 0 6px", fontSize: 12, color: INK }}>
                  <span><span style={{ color: TERRA, fontWeight: 700 }}>―</span> ジル</span>
                  <span><span style={{ color: GREEN, fontWeight: 700 }}>―</span> ジャック</span>
                </div>
              </div>
            )}
          </>
        )
      )}

      <div style={{ marginTop: 12, fontSize: 11, color: GREEN, lineHeight: 1.8 }}>
        ※ 毎年はじめに積立・年1回複利で計算。税金・手数料・インフレは考慮していません。将来の運用成果を約束するものではなく、あくまで「考えるための道具」です。
      </div>
    </div>
  );
}
