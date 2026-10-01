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
    // Primary: app should append ?wv=1 to all WebView links
    if (new URLSearchParams(window.location.search).get("wv") === "1") {
      setIsWebView(true);
      return;
    }
    // Fallback UA detection
    const ua = navigator.userAgent;
    const androidWV = /Android/.test(ua) && /Version\/\d+\.\d+.*Chrome\/\d+/.test(ua);
    const iosWV = /iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua) && /AppleWebKit/.test(ua);
    setIsWebView(androidWV || iosWV);
  }, []);

  return { isWebView, locale };
}

const APPS = [
  {
    name: "HaBuk",
    tag: "Customer App",
    icon: "/brand/icon-client.svg",
    desc: "The app your guests use to browse menus, place orders, and track delivery, all branded to your restaurant.",
  },
  {
    name: "HaBuk Staff",
    tag: "POS & Config",
    icon: "/brand/icon-staff.svg",
    desc: "The tablet-first POS and configuration tool your team uses on the floor: orders, tables, and product management.",
  },
  {
    name: "HaBuk Manager",
    tag: "Analytics & ERP",
    icon: "/brand/icon-manager.svg",
    desc: "Revenue dashboards, product analytics, and operational insights, so you always know what's working.",
  },
  {
    name: "HaBuk Delivery",
    tag: "Driver App",
    icon: "/brand/icon-delivery.svg",
    desc: "The driver-facing app for accepting, routing, and completing deliveries, in real time and GPS-tracked.",
  },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const tc = useTranslations("common");
  const { isWebView, locale } = useWebViewAndLocale();

  return (
    <main style={{ minHeight: "100vh", background: "#fff4ea", color: "#1f1a17", fontFamily: "var(--nunito-sans), system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #eadfd5", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 860, margin: "0 auto" }}>
        <a href={`/${locale}`}>
          <Image src="/brand/lockup-horizontal-duo.svg" alt="HaBuk" width={440} height={70} style={{ height: 22, width: "auto" }} />
        </a>
        {!isWebView && (
          <a
            href={`/${locale}`}
            style={{ fontSize: 13, color: "#5c524b", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1f1a17")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#5c524b")}
          >
            {tc("back")}
          </a>
        )}
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 64px" }}>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
          {t("headline1")}{" "}{t("headline2")}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: "#5c524b", maxWidth: 560 }}>{t("description")}</p>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#eadfd5" }} />
      </div>

      {/* Mission */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1f1a17", marginBottom: 16 }}>{t("missionTitle")}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5c524b" }}>{t("missionText")}</p>
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1f1a17", marginBottom: 16 }}>{t("locationTitle")}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5c524b" }}>{t("locationText")}</p>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#eadfd5" }} />
      </div>

      {/* Apps */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1f1a17", marginBottom: 32 }}>{t("ecosystemTitle")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {APPS.map((app) => (
            <div key={app.name} style={{ padding: "24px", borderRadius: 28, background: "#ffffff", border: "none" }}>
              <Image src={app.icon} alt="" width={240} height={240} style={{ width: 44, height: 44, marginBottom: 16 }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "#5c524b", marginBottom: 4 }}>{app.tag}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{app.name}</div>
              <p style={{ fontSize: 13, color: "#5c524b", lineHeight: 1.65 }}>{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "#eadfd5" }} />
      </div>

      {/* Contact */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px 80px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1f1a17", marginBottom: 24 }}>{t("contactTitle")}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="mailto:habukapp@gmail.com" style={{ display: "inline-flex", alignItems: "center", padding: "10px 20px", borderRadius: 999, background: "#ffffff", border: "none", color: "#1f1a17", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "background 0.18s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#eadfd5")} onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}>
            habukapp@gmail.com
          </a>
          <a href="tel:+38970972983" style={{ display: "inline-flex", alignItems: "center", padding: "10px 20px", borderRadius: 999, background: "#ffffff", border: "none", color: "#1f1a17", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "background 0.18s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#eadfd5")} onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}>
            +389 70 972 983
          </a>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #eadfd5", padding: "24px", textAlign: "center", fontSize: 12, color: "#5c524b", maxWidth: 860, margin: "0 auto" }}>
        © {new Date().getFullYear()} HaBuk. All rights reserved. ·{" "}
        <a href={`/${locale}/privacy`} style={{ color: "#5c524b", textDecoration: "none" }}>Privacy</a> ·{" "}
        <a href={`/${locale}/support`} style={{ color: "#5c524b", textDecoration: "none" }}>Support</a>
      </footer>
    </main>
  );
}
