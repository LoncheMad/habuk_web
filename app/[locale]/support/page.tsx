"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

function useWebViewAndLocale() {
  const [isWebView, setIsWebView] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "al";

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("wv") === "1") {
      setIsWebView(true);
      return;
    }
    const ua = navigator.userAgent;
    const androidWV = /Android/.test(ua) && /Version\/\d+\.\d+.*Chrome\/\d+/.test(ua);
    const iosWV = /iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua) && /AppleWebKit/.test(ua);
    setIsWebView(androidWV || iosWV);
  }, []);

  return { isWebView, locale };
}

const APP_STORE_URL = "https://apps.apple.com/us/app/habuk/id6737127503";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.habuk.app&hl=en";

const FAQS = [
  { q: "How do I get HaBuk for my restaurant?", a: "Reach out to us via email or phone. We'll set up a demo, onboard your restaurant, and get your account configured. The process typically takes 1–2 business days." },
  { q: "Which devices does HaBuk Staff work on?", a: "HaBuk Staff is available on Android phones and tablets. For the best experience we recommend a tablet (10\" or larger). It's available exclusively via the Play Store for business accounts." },
  { q: "Is HaBuk available for delivery only, or also for dine-in?", a: "Both. HaBuk supports dine-in table ordering (via QR codes), takeaway, and delivery — all from the same platform." },
  { q: "How does the table QR code work?", a: "Each table gets a unique QR code that encodes your enterprise, branch, and table ID. When a guest scans it, the HaBuk app opens directly to your menu with their table pre-selected." },
  { q: "Can I add my own menu and branding?", a: "Yes. HaBuk Staff lets you configure your full menu, categories, products, pricing, and photos. Branding (colors, logo) is set at the enterprise level." },
  { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. We don't share your business or customer data with third parties. See our Privacy Policy for full details." },
  { q: "What if the HaBuk app crashes or has a bug?", a: "Email us at habukapp@gmail.com with a description of what happened and your device model. We typically respond within one business day." },
];

export default function SupportPage() {
  const t = useTranslations("support");
  const tc = useTranslations("common");
  const { isWebView, locale } = useWebViewAndLocale();

  return (
    <main style={{ minHeight: "100vh", background: "#01191a", color: "#fffeee", fontFamily: "var(--poppins), system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #ffffff0e", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 860, margin: "0 auto" }}>
        <a href={`/${locale}`}>
          <Image src="/icon.png" alt="HaBuk" width={90} height={32} style={{ height: 30, width: "auto", objectFit: "contain" }} />
        </a>
        {!isWebView && (
          <a
            href={`/${locale}`}
            style={{ fontSize: 13, color: "#ffffff40", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fffeee80")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff40")}
          >
            {tc("back")}
          </a>
        )}
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 64px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 999, background: "#f4002415", border: "1px solid #f4002430", color: "#f40024", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
          {t("badge")}
        </div>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
          {t("headline1")}<br />
          <span style={{ color: "#f40024" }}>{t("headline2")}</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: "#fffeee80", maxWidth: 520 }}>{t("description")}</p>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* Contact cards */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>{t("contactTitle")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          <a href="mailto:habukapp@gmail.com" style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "24px", borderRadius: 16, background: "#ffffff06", border: "1px solid #ffffff0e", textDecoration: "none", color: "#fffeee", transition: "background 0.18s, border-color 0.18s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff0a"; e.currentTarget.style.borderColor = "#ffffff18"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff06"; e.currentTarget.style.borderColor = "#ffffff0e"; }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f4002418", border: "1px solid #f4002430", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#f40024" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff50", marginBottom: 4 }}>{t("emailLabel")}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>habukapp@gmail.com</div>
              <div style={{ fontSize: 12, color: "#ffffff50", marginTop: 4 }}>{t("replyTime")}</div>
            </div>
          </a>

          <a href="tel:+38970972983" style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "24px", borderRadius: 16, background: "#ffffff06", border: "1px solid #ffffff0e", textDecoration: "none", color: "#fffeee", transition: "background 0.18s, border-color 0.18s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff0a"; e.currentTarget.style.borderColor = "#ffffff18"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff06"; e.currentTarget.style.borderColor = "#ffffff0e"; }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f4002418", border: "1px solid #f4002430", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#f40024" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff50", marginBottom: 4 }}>{t("phoneLabel")}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>+389 70 972 983</div>
              <div style={{ fontSize: 12, color: "#ffffff50", marginTop: 4 }}>{t("hours")}</div>
            </div>
          </a>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#ffffff0e" }} />
      </div>

      {/* Store links */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 0" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Download the app</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: "#ffffff08", border: "1px solid #ffffff14", color: "#fffeee", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "background 0.18s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff12")} onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff08")}>
            <svg width="14" height="17" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.1 172.5 46.1 42.8 0 109.6-49 189.2-49 30.7 0 110.7 2.9 167.4 57.9zm-78.2-217.6c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
            App Store
          </a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: "#ffffff08", border: "1px solid #ffffff14", color: "#fffeee", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "background 0.18s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff12")} onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff08")}>
            <svg width="14" height="15" viewBox="0 0 24 24"><path d="M3.18 23.76A2 2 0 0 1 2 22V2A2 2 0 0 1 3.18.24L13.9 12 3.18 23.76z" fill="#ea4335"/><path d="M17.6 16.27L5.13 23.36l-.05.03a2 2 0 0 0 1.83-.07l13.6-7.77-2.91-3.28z" fill="#fbbc04"/><path d="M21.62 10.3l-3.11-1.78L15.4 12l3.11 3.5 3.11-1.78a2 2 0 0 0 0-3.42z" fill="#4285f4"/><path d="M5.08.61 17.6 7.73l-2.2 2.48-10.32-9.6z" fill="#34a853"/></svg>
            Google Play
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#ffffff40", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>{t("faqTitle")}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ padding: "22px 24px", borderRadius: 14, background: "#ffffff05", border: "1px solid #ffffff0a" }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, lineHeight: 1.4 }}>{faq.q}</div>
              <p style={{ fontSize: 14, color: "#fffeee70", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #ffffff0e", padding: "24px", textAlign: "center", fontSize: 12, color: "#ffffff30", maxWidth: 860, margin: "0 auto" }}>
        © {new Date().getFullYear()} HaBuk. All rights reserved. ·{" "}
        <a href={`/${locale}/about`} style={{ color: "#ffffff40", textDecoration: "none" }}>About</a> ·{" "}
        <a href={`/${locale}/privacy`} style={{ color: "#ffffff40", textDecoration: "none" }}>Privacy</a>
      </footer>
    </main>
  );
}
