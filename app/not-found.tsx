"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#01191a",
        color: "#fffeee",
        fontFamily: "var(--poppins), system-ui, sans-serif",
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
          src="/icon.png"
          alt="HaBuk"
          width={100}
          height={36}
          style={{ height: 32, width: "auto", objectFit: "contain" }}
        />
      </a>

      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "#f40024",
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

      <p style={{ fontSize: 15, color: "#fffeee60", marginBottom: 36, maxWidth: 320, lineHeight: 1.7 }}>
        This link doesn&apos;t exist or has moved. Head back to HaBuk.
      </p>

      <a
        href="/al"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "11px 24px",
          borderRadius: 999,
          background: "#f40024",
          color: "#fffeee",
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
