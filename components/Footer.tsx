"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 md:py-16"
      style={{
        background: "#01191a",
        borderTop: "1px solid #ffffff10",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Image
              src="/icon.png"
              alt="HaBuk"
              width={100}
              height={36}
              className="h-8 w-auto object-contain opacity-90"
            />
            <p className="text-sm" style={{ color: "#fffeee50" }}>
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: t("links.apps"), href: "#ecosystem" },
              { label: t("links.features"), href: "#client" },
              { label: t("links.contact"), href: "#contact" },
              { label: "About", href: "/about" },
              { label: "Support", href: "/support" },
              { label: "Privacy", href: "/privacy" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:opacity-100"
                style={{ color: "#fffeee60" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Store badges */}
          <div className="flex gap-3">
            <a
              href="https://apps.apple.com/us/app/habuk/id6737127503"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
              style={{
                background: "#ffffff10",
                border: "1px solid #ffffff15",
                color: "#fffeee80",
              }}
            >
              <svg width="14" height="17" viewBox="0 0 814 1000" fill="currentColor">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.1 172.5 46.1 42.8 0 109.6-49 189.2-49 30.7 0 110.7 2.9 167.4 57.9zm-78.2-217.6c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
              </svg>
              {t("appStore")}
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.habuk.app&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
              style={{
                background: "#ffffff10",
                border: "1px solid #ffffff15",
                color: "#fffeee80",
              }}
            >
              <svg width="14" height="15" viewBox="0 0 24 24">
                <path d="M3.18 23.76A2 2 0 0 1 2 22V2A2 2 0 0 1 3.18.24L13.9 12 3.18 23.76z" fill="#ea4335" />
                <path d="M17.6 16.27L5.13 23.36l-.05.03a2 2 0 0 0 1.83-.07l13.6-7.77-2.91-3.28z" fill="#fbbc04" />
                <path d="M21.62 10.3l-3.11-1.78L15.4 12l3.11 3.5 3.11-1.78a2 2 0 0 0 0-3.42z" fill="#4285f4" />
                <path d="M5.08.61 17.6 7.73l-2.2 2.48-10.32-9.6z" fill="#34a853" />
              </svg>
              {t("googlePlay")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid #ffffff10" }}
        >
          <p style={{ fontSize: 12, color: "#fffeee40" }}>
            © {year} HaBuk. {t("rights")}
          </p>
          <p style={{ fontSize: 12, color: "#fffeee30" }}>
            habuk.space
          </p>
        </div>
      </div>
    </footer>
  );
}
