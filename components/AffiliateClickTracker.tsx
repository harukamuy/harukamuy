"use client";

import { useEffect } from "react";

// アフィリエイトリンクのクリックを GA4 にイベント送信する。
// 記事本文は dangerouslySetInnerHTML で描画されるため、個々のリンクに
// onClick を付けられない。document 全体のクリックを拾って判定する。

const MERCHANT_PATTERNS: Array<{ test: (href: string) => boolean; merchant: string }> = [
  { test: (h) => h.includes("a8.net") && h.includes("1MXXO2"), merchant: "freee" },
  { test: (h) => h.includes("a8.net") && h.includes("DNS2GI"), merchant: "ahamo" },
  { test: (h) => h.includes("a8.net"), merchant: "a8-other" },
  { test: (h) => h.includes("accesstrade.net") && h.includes("0100piab"), merchant: "sbi-zero" },
  { test: (h) => h.includes("accesstrade.net") && h.includes("0100pesr"), merchant: "sbi-nisa" },
  { test: (h) => h.includes("accesstrade.net") && h.includes("0100pe73"), merchant: "monex" },
  { test: (h) => h.includes("accesstrade.net") && h.includes("0100ob7n"), merchant: "furunavi" },
  { test: (h) => h.includes("accesstrade.net"), merchant: "accesstrade-other" },
  { test: (h) => h.includes("amazon.co.jp"), merchant: "amazon" },
  { test: (h) => h.includes("hb.afl.rakuten.co.jp"), merchant: "rakuten" },
];

function detectMerchant(href: string): string | null {
  for (const { test, merchant } of MERCHANT_PATTERNS) {
    if (test(href)) return merchant;
  }
  return null;
}

export default function AffiliateClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.href;
      if (!href) return;

      const merchant = detectMerchant(href);
      if (!merchant) return;

      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag !== "function") return;

      gtag("event", "affiliate_click", {
        merchant,
        link_url: href.slice(0, 100),
        page_path: window.location.pathname,
      });
    };

    // capture: true で target="_blank" 以外の遷移でも先に拾う
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
