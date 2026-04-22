"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleXShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  return (
    <div style={{
      marginTop: 44,
      paddingTop: 26,
      borderTop: "1px solid var(--beige)",
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
    }}>
      <span style={{ fontSize: 13, color: "var(--brown-3)", letterSpacing: "0.06em" }}>この記事をシェア</span>
      <button
        onClick={handleXShare}
        style={{
          padding: "7px 18px",
          borderRadius: 20,
          fontSize: 12,
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          border: "1.5px solid #1da1f2",
          background: "var(--white)",
          color: "#1da1f2",
          letterSpacing: "0.06em",
          transition: "all 0.2s",
        }}
      >
        𝕏 でシェア
      </button>
      <button
        onClick={handleCopy}
        style={{
          padding: "7px 18px",
          borderRadius: 20,
          fontSize: 12,
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          border: "1.5px solid var(--beige-2)",
          background: "var(--white)",
          color: "var(--brown-2)",
          letterSpacing: "0.06em",
          transition: "all 0.2s",
        }}
      >
        {copied ? "✓ コピーしました" : "📋 URLをコピー"}
      </button>
    </div>
  );
}
