"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/habuk/id6737127503";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.habuk.app&hl=en";

function detectPlatform(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

function TableRedirect() {
  const searchParams = useSearchParams();
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | null>(null);

  const enterpriseId = searchParams.get("enterprise_id");
  const branchId = searchParams.get("branch_id");
  const tableId = searchParams.get("table_id");

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    if (p === "ios") {
      // Try universal link (app intercepts) — if not installed, show download button
      // On iOS, universal links are handled by the OS before this JS runs
      // This page is the fallback: just redirect to App Store
      setTimeout(() => {
        window.location.href = APP_STORE_URL;
      }, 1500);
    } else if (p === "android") {
      // Try intent URL first, fall back to Play Store
      const params = new URLSearchParams();
      if (enterpriseId) params.set("enterprise_id", enterpriseId);
      if (branchId) params.set("branch_id", branchId);
      if (tableId) params.set("table_id", tableId);

      const intentUrl = `intent://habuk.space/table?${params.toString()}#Intent;scheme=https;package=com.habuk.app;end`;

      const timeout = setTimeout(() => {
        window.location.href = PLAY_STORE_URL;
      }, 2000);

      window.location.href = intentUrl;

      window.addEventListener("blur", () => clearTimeout(timeout), { once: true });
    }
    // Desktop: do nothing, show the page
  }, [enterpriseId, branchId, tableId]);

  if (platform === null) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#01191a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "var(--poppins), system-ui, sans-serif",
      }}
    >
      {/* Logo */}
      <Image
        src="/icon.png"
        alt="HaBuk"
        width={130}
        height={50}
        className="mb-10"
        style={{ objectFit: "contain" }}
      />

      {platform === "desktop" ? (
        <div
          className="text-center max-w-sm"
          style={{ color: "#fffeee" }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#f4002420",
              border: "1.5px solid #f4002440",
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f40024" strokeWidth="1.8" strokeLinecap="round">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            Open this on your phone
          </h1>
          <p style={{ fontSize: 14, color: "#fffeee70", lineHeight: 1.7, marginBottom: 32 }}>
            This link is designed for mobile. Scan the QR code with your phone to open HaBuk.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "12px 24px",
                borderRadius: 12,
                background: "#ffffff12",
                border: "1px solid #ffffff20",
                color: "#fffeee",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "12px 24px",
                borderRadius: 12,
                background: "#ffffff12",
                border: "1px solid #ffffff20",
                color: "#fffeee",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Google Play
            </a>
          </div>

          <a
            href="/al"
            style={{
              display: "inline-block",
              marginTop: 28,
              fontSize: 13,
              color: "#fffeee40",
              textDecoration: "none",
            }}
          >
            ← Back to HaBuk
          </a>
        </div>
      ) : (
        <div className="text-center" style={{ color: "#fffeee" }}>
          {/* Spinner */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "3px solid #ffffff15",
              borderTopColor: "#f40024",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1.5rem",
            }}
          />

          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Opening HaBuk...
          </h1>
          <p style={{ fontSize: 14, color: "#fffeee60", marginBottom: 32 }}>
            {platform === "ios"
              ? "Redirecting you to the App Store..."
              : "Opening the app..."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {platform === "ios" && (
              <a
                href={APP_STORE_URL}
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: "#f40024",
                  color: "#fffeee",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Download on App Store
              </a>
            )}
            {platform === "android" && (
              <a
                href={PLAY_STORE_URL}
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: 12,
                  background: "#f40024",
                  color: "#fffeee",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Get it on Google Play
              </a>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

export default function TablePage() {
  return (
    <Suspense fallback={null}>
      <TableRedirect />
    </Suspense>
  );
}
