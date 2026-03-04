"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function useIsWebView() {
  const [isWebView, setIsWebView] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const android = /wv/.test(ua) || /WebView/.test(ua);
    const ios = /iPhone|iPad|iPod/.test(ua) && /AppleWebKit/.test(ua) && !/Safari/.test(ua);
    setIsWebView(android || ios);
  }, []);
  return isWebView;
}

const FAQS = [
  {
    q: "How do I get HaBuk for my restaurant?",
    a: "Reach out to us via email or phone. We'll set up a demo, onboard your restaurant, and get your account configured. The process typically takes 1–2 business days.",
  },
  {
    q: "Which devices does HaBuk Staff work on?",
    a: "HaBuk Staff is available on Android phones and tablets. For the best experience we recommend a tablet (10\" or larger). It's available exclusively via the Play Store for business accounts.",
  },
  {
    q: "Is HaBuk available for delivery only, or also for dine-in?",
    a: "Both. HaBuk supports dine-in table ordering (via QR codes), takeaway, and delivery — all from the same platform.",
  },
  {
    q: "How does the table QR code work?",
    a: "Each table gets a unique QR code that encodes your enterprise, branch, and table ID. When a guest scans it, the HaBuk app opens directly to your menu with their table pre-selected.",
  },
  {
    q: "Can I add my own menu and branding?",
    a: "Yes. HaBuk Staff lets you configure your full menu, categories, products, pricing, and photos. Branding (colors, logo) is set at the enterprise level.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted in transit and at rest. We don't share your business or customer data with third parties. See our Privacy Policy for full details.",
  },
  {
    q: "What if the HaBuk app crashes or has a bug?",
    a: "Email us at habukapp@gmail.com with a description of what happened and your device model. We typically respond within one business day.",
  },
];

export default function SupportPage() {
  const isWebView = useIsWebView();
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
        {!isWebView && (
          <a
            href="/al"
            style={{ fontSize: 13, color: "#ffffff40", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fffeee80")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff40")}
          >
            ← Back
          </a>
        )}
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 64px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
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
          Support
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
          How can we<br />
          <span style={{ color: "#f40024" }}>help you?</span>
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.75, color: "#fffeee80", maxWidth: 520 }}>
          For anything related to HaBuk, HaBuk Staff, HaBuk Manager, or HaBuk Delivery —
          reach us directly or browse the questions below.
        </p>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* Contact cards */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
          Contact Us
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {/* Email */}
          <a
            href="mailto:habukapp@gmail.com"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: "24px",
              borderRadius: 16,
              background: "#ffffff06",
              border: "1px solid #ffffff0e",
              textDecoration: "none",
              color: "#fffeee",
              transition: "background 0.18s, border-color 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffffff0a";
              e.currentTarget.style.borderColor = "#ffffff18";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff06";
              e.currentTarget.style.borderColor = "#ffffff0e";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#f4002418",
                border: "1px solid #f4002430",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#f40024",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff50", marginBottom: 4 }}>Email</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>habukapp@gmail.com</div>
              <div style={{ fontSize: 12, color: "#ffffff50", marginTop: 4 }}>We reply within 1 business day</div>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+38970972983"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: "24px",
              borderRadius: 16,
              background: "#ffffff06",
              border: "1px solid #ffffff0e",
              textDecoration: "none",
              color: "#fffeee",
              transition: "background 0.18s, border-color 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffffff0a";
              e.currentTarget.style.borderColor = "#ffffff18";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff06";
              e.currentTarget.style.borderColor = "#ffffff0e";
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#f4002418",
                border: "1px solid #f4002430",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#f40024",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff50", marginBottom: 4 }}>Phone</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>+389 70 972 983</div>
              <div style={{ fontSize: 12, color: "#ffffff50", marginTop: 4 }}>Mon – Fri, 9:00 – 18:00</div>
            </div>
          </a>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* FAQ */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px 80px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                padding: "22px 24px",
                borderRadius: 14,
                background: "#ffffff05",
                border: "1px solid #ffffff0a",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, lineHeight: 1.4 }}>
                {faq.q}
              </div>
              <p style={{ fontSize: 14, color: "#fffeee70", lineHeight: 1.7, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
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
        <a href="/about" style={{ color: "#ffffff40", textDecoration: "none" }}>About</a> ·{" "}
        <a href="/privacy" style={{ color: "#ffffff40", textDecoration: "none" }}>Privacy</a>
      </footer>
    </main>
  );
}
