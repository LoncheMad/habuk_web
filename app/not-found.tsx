"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff4ea",
        color: "#1f1a17",
        fontFamily: "var(--nunito-sans), system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <a href="/al" style={{ marginBottom: "2.5rem" }}>
        <Image
          src="/brand/lockup-horizontal-duo.svg"
          alt="HaBuk"
          width={440}
          height={70}
          style={{ height: 26, width: "auto" }}
        />
      </a>

      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "#f4501f",
          marginBottom: 16,
          opacity: 0.15,
          userSelect: "none",
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: 12,
          marginTop: -8,
        }}
      >
        Page not found.
      </h1>

      <p style={{ fontSize: 15, color: "#5c524b", marginBottom: 36, maxWidth: 320, lineHeight: 1.7 }}>
        This link doesn&apos;t exist or has moved. Head back to HaBuk.
      </p>

      <a
        href="/al"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "11px 24px",
          borderRadius: 999,
          background: "#f4501f",
          color: "#1f1a17",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
          transition: "opacity 0.18s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        ← Back to HaBuk
      </a>
    </main>
  );
}
