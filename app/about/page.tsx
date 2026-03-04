"use client";

import Image from "next/image";

const APPS = [
  {
    name: "HaBuk",
    tag: "Customer App",
    color: "#f40024",
    desc: "The app your guests use to browse menus, place orders, and track delivery — all branded to your restaurant.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    name: "HaBuk Staff",
    tag: "POS & Config",
    color: "#f48800",
    desc: "The tablet-first POS and configuration tool your team uses on the floor — orders, tables, and product management.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    name: "HaBuk Manager",
    tag: "Analytics & ERP",
    color: "#0aaf6e",
    desc: "Revenue dashboards, product analytics, and operational insights — so you always know what's working.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    name: "HaBuk Delivery",
    tag: "Driver App",
    color: "#0a7aff",
    desc: "The driver-facing app for accepting, routing, and completing deliveries — real-time, GPS-tracked.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#01191a",
        color: "#fffeee",
        fontFamily: "var(--poppins), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #ffffff0e",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        <a href="/al">
          <Image src="/icon.png" alt="HaBuk" width={90} height={32} style={{ height: 30, width: "auto", objectFit: "contain" }} />
        </a>
        <a
          href="/al"
          style={{ fontSize: 13, color: "#ffffff40", textDecoration: "none", transition: "color 0.18s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fffeee80")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff40")}
        >
          ← Back
        </a>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 64px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 12px",
            borderRadius: 999,
            background: "#f4002415",
            border: "1px solid #f4002430",
            color: "#f40024",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          About HaBuk
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          Built for the restaurants<br />
          <span style={{ color: "#f40024" }}>that never stop.</span>
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.75, color: "#fffeee80", maxWidth: 560 }}>
          HaBuk is a complete restaurant technology ecosystem developed in North Macedonia.
          We build the software that connects every layer of your operation — from the moment
          a guest opens the app to the moment the order lands on the table.
        </p>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* Mission */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Our Mission
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#fffeee80" }}>
              Restaurants deserve software that works as hard as they do. We build tools that are
              fast, reliable, and actually used — by staff, managers, and customers alike.
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Where We Are
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#fffeee80" }}>
              Based in North Macedonia, serving restaurants across the region.
              Our team builds, maintains, and supports every product in the ecosystem.
            </p>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* The four apps */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>
          The Ecosystem
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {APPS.map((app) => (
            <div
              key={app.name}
              style={{
                padding: "24px",
                borderRadius: 16,
                background: "#ffffff06",
                border: "1px solid #ffffff0e",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${app.color}18`,
                  border: `1px solid ${app.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: app.color,
                  marginBottom: 16,
                }}
              >
                {app.icon}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: app.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                {app.tag}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{app.name}</div>
              <p style={{ fontSize: 13, color: "#fffeee60", lineHeight: 1.65 }}>{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* Contact */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px 80px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
          Get In Touch
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a
            href="mailto:habukapp@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 18px",
              borderRadius: 10,
              background: "#ffffff08",
              border: "1px solid #ffffff14",
              color: "#fffeee",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff12")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff08")}
          >
            habukapp@gmail.com
          </a>
          <a
            href="tel:+38970972983"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 18px",
              borderRadius: 10,
              background: "#ffffff08",
              border: "1px solid #ffffff14",
              color: "#fffeee",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff12")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff08")}
          >
            +389 70 972 983
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #ffffff0e",
          padding: "24px",
          textAlign: "center",
          fontSize: 12,
          color: "#ffffff30",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        © {new Date().getFullYear()} HaBuk. All rights reserved. ·{" "}
        <a href="/privacy" style={{ color: "#ffffff40", textDecoration: "none" }}>Privacy</a> ·{" "}
        <a href="/support" style={{ color: "#ffffff40", textDecoration: "none" }}>Support</a>
      </footer>
    </main>
  );
}
