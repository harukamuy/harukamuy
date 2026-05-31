// ═══════════════════════════════════════════════════════════════════
// 証券会社の保有銘柄CSV（Shift-JIS）を読み込んで構造化する共通モジュール
//   - セクション（株式／投資信託）ごとに保有明細を抽出
//   - 配当計算・資産集計の両方からこの結果を使う
// ※ このファイルは「読み取り」だけ。数字の判断はしない。
// ═══════════════════════════════════════════════════════════════════

import { readFileSync } from "node:fs";

/**
 * @typedef {Object} Holding
 * @property {string} code   銘柄コード（投信は空文字）
 * @property {string} name   銘柄名
 * @property {number} shares 保有株数（投信は保有口数）
 * @property {number} value  評価額（円）
 * @property {"stock"|"fund"} kind 株式 or 投資信託
 * @property {string} account 口座区分（特定／NISA成長枠 など）
 */

/**
 * 保有CSVをパースする
 * @param {string} path CSVファイルのパス
 * @returns {{ holdings: Holding[], sectionTotals: {name:string, value:number}[] }}
 */
export function parseHoldingsCsv(path) {
  const buf = readFileSync(path);
  const text = new TextDecoder("shift-jis").decode(buf);
  const lines = text.split(/\r?\n/);

  /** @type {Holding[]} */
  const holdings = [];
  const sectionTotals = [];

  let currentSection = ""; // 例: 株式（特定預り）
  let currentKind = null; // "stock" | "fund"
  let expectTotal = false; // 「評価額合計」ヘッダーの次の行が合計値

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // ── 合計値ヘッダー行の直後を拾う（先に判定する）──
    if (line.startsWith("評価額合計")) {
      expectTotal = true;
      continue;
    }

    // ── セクション見出し（「○○合計」）でセクション名を判定 ──
    if (line.endsWith("合計") && !line.startsWith('"')) {
      currentSection = line.replace(/合計$/, "");
      currentKind = currentSection.startsWith("株式")
        ? "stock"
        : currentSection.startsWith("投資信託")
        ? "fund"
        : null;
      continue;
    }
    if (expectTotal) {
      expectTotal = false;
      const total = Number(line.split(",")[0]);
      if (Number.isFinite(total)) {
        sectionTotals.push({ name: currentSection, value: total });
      }
      continue;
    }

    // ── 明細行（"コード", または "ファンド名", で始まる） ──
    if (line.startsWith('"') && currentKind) {
      const cols = parseCsvLine(line);
      if (currentKind === "stock") {
        // コード,名称,保有株数,売却注文中,取得単価,現在値,取得金額,評価額,評価損益
        const [code, name, shares, , , , cost, value] = cols;
        if (code && name) {
          holdings.push({
            code: code.trim(),
            name: name.trim(),
            shares: toNum(shares),
            cost: toNum(cost),
            value: toNum(value),
            kind: "stock",
            account: currentSection,
          });
        }
      } else {
        // ファンド名,保有数量,信用建区分,取得単価,基準価額,取得金額,評価額,評価損益,...
        const [name, shares, , , , cost, value] = cols;
        if (name) {
          holdings.push({
            code: "",
            name: name.trim(),
            shares: toNum(shares),
            cost: toNum(cost),
            value: toNum(value),
            kind: "fund",
            account: currentSection,
          });
        }
      }
    }
  }

  return { holdings, sectionTotals };
}

// 数量に「株」などの単位が混ざるので除去して数値化
function toNum(s) {
  if (s == null) return 0;
  const n = Number(String(s).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

// ダブルクオート対応の簡易CSV行パーサ
function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQ = !inQ;
    } else if (ch === "," && !inQ) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((c) => c.trim());
}
