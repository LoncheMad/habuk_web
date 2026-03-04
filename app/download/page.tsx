"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Suspense } from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/habuk/id6737127503";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.habuk.app&hl=en";

function DownloadRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) {
      window.location.replace(APP_STORE_URL);
    } else if (/Android/.test(ua)) {
      window.location.replace(PLAY_STORE_URL);
    }
    // Desktop: stay on page, show both options
  }, []);

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
      <Image
        src="/icon.png"
        alt="HaBuk"
        width={130}
        height={50}
        style={{ objectFit: "contain", marginBottom: "2.5rem" }}
      />

      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fffeee", marginBottom: 10, textAlign: "center" }}>
        Download HaBuk
      </h1>
      <p style={{ fontSize: 14, color: "#fffeee60", marginBottom: 32, textAlign: "center" }}>
        Available on iPhone and Android
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 280 }}>
        <a
          href={APP_STORE_URL}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "14px 24px", borderRadius: 12,
            background: "#ffffff12", border: "1px solid #ffffff20",
            color: "#fffeee", fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}
        >
          <svg width="16" height="19" viewBox="0 0 814 1000" fill="#fffeee">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.1 172.5 46.1 42.8 0 109.6-49 189.2-49 30.7 0 110.7 2.9 167.4 57.9zm-78.2-217.6c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
          App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "14px 24px", borderRadius: 12,
            background: "#ffffff12", border: "1px solid #ffffff20",
            color: "#fffeee", fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M3.18 23.76A2 2 0 0 1 2 22V2A2 2 0 0 1 3.18.24L13.9 12 3.18 23.76z" fill="#ea4335" />
            <path d="M17.6 16.27L5.13 23.36l-.05.03a2 2 0 0 0 1.83-.07l13.6-7.77-2.91-3.28z" fill="#fbbc04" />
            <path d="M21.62 10.3l-3.11-1.78L15.4 12l3.11 3.5 3.11-1.78a2 2 0 0 0 0-3.42z" fill="#4285f4" />
            <path d="M5.08.61 17.6 7.73l-2.2 2.48-10.32-9.6z" fill="#34a853" />
          </svg>
          Google Play
        </a>
      </div>

      <a
        href="/al"
        style={{ marginTop: 32, fontSize: 13, color: "#ffffff30", textDecoration: "none" }}
      >
        ← Back to HaBuk
      </a>
    </main>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={null}>
      <DownloadRedirect />
    </Suspense>
  );
}
