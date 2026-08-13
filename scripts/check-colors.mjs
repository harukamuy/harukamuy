// ═══════════════════════════════════════════════════════════════════
// グラフの色が「色覚特性のある方でも見分けられるか」を検証する
//   実行: node scripts/check-colors.mjs "#5e7252" "#8aaa7a" ...
//   引数なしなら /sidefire のドーナツ配色を検証
//
// 通常視・P型（1型）・D型（2型）それぞれで OKLab ΔE を出し、
// 全ペアの最小値を見る。目安: ΔE 10未満は要注意、5未満は区別できない。
// ═══════════════════════════════════════════════════════════════════

const hex2rgb = (h) => {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};
const srgb2lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

// Viénot 1999 の近似行列（線形RGB空間で適用）
const SIM = {
  P型: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
  D型: [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]],
};
const apply = (m, v) => m.map((row) => row.reduce((s, k, i) => s + k * v[i], 0));

// 線形RGB → OKLab
function lin2oklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

// ΔE は OKLab のユークリッド距離 ×100（0〜100程度のスケールに揃える）
function deltaE(hexA, hexB, mode) {
  let a = hex2rgb(hexA).map(srgb2lin);
  let b = hex2rgb(hexB).map(srgb2lin);
  if (mode) {
    a = apply(SIM[mode], a);
    b = apply(SIM[mode], b);
  }
  const [l1, a1, b1] = lin2oklab(a);
  const [l2, a2, b2] = lin2oklab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2) * 100;
}

const DEFAULT = [
  ["インデックス", "#5e7252"],
  ["高配当株（日本）", "#8aaa7a"],
  ["BND（米国債券）", "#6d8fa6"],
  ["ビットコイン", "#c4674a"],
  ["現金", "#d5c3a8"],
];

const args = process.argv.slice(2);
const colors = args.length
  ? args.map((h, i) => [`色${i + 1}`, h])
  : DEFAULT;

console.log("\n全ペアの OKLab ΔE（通常視 / P型 / D型）\n");
let worst = { d: Infinity };
for (let i = 0; i < colors.length; i++) {
  for (let j = i + 1; j < colors.length; j++) {
    const [n1, c1] = colors[i];
    const [n2, c2] = colors[j];
    const normal = deltaE(c1, c2, null);
    const p = deltaE(c1, c2, "P型");
    const d = deltaE(c1, c2, "D型");
    const min = Math.min(normal, p, d);
    const mark = min < 5 ? "  ✗ 区別できない" : min < 10 ? "  △ 要注意" : "";
    console.log(
      `  ${n1} × ${n2}`.padEnd(34) +
        `${normal.toFixed(1).padStart(5)} / ${p.toFixed(1).padStart(5)} / ${d.toFixed(1).padStart(5)}${mark}`
    );
    if (min < worst.d) worst = { d: min, pair: `${n1} × ${n2}` };
  }
}
console.log(`\n  最小ΔE: ${worst.d.toFixed(1)}（${worst.pair}）`);
console.log(worst.d < 10 ? "  → 色だけに頼らず、必ず文字でも情報を出すこと\n" : "  → 十分に区別できる配色\n");
