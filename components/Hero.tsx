"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      style={{
        background: "#01191a",
        height: "100svh",
        minHeight: 600,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-right red glow */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #f4002420 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />

      {/* Main content — fills the full height, accounts for navbar */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full h-full"
        style={{ paddingTop: 82 }} /* floating navbar: 14px top + 52px height + breathing room */
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[55%_45%] h-full"
          style={{ alignItems: "center" }}
        >
          {/* ── LEFT: content ── */}
          <div className="flex flex-col justify-center py-8 lg:py-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{ marginBottom: "1.25rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: "#f4002418",
                  border: "1px solid #f4002440",
                  color: "#f40024",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#f40024",
                    display: "inline-block",
                  }}
                />
                {t("badge")}
              </span>
            </motion.div>

            {/* Headline — 3 clean lines, not 6 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              style={{
                fontSize: "clamp(2.6rem, 5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#fffeee",
                marginBottom: "1.25rem",
              }}
            >
              {t("headline1")}
              <br />
              {t("headline2")}
              <br />
              <span style={{ color: "#f40024", fontStyle: "italic" }}>
                {t("headline3")}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                color: "#fffeee80",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: 380,
                marginBottom: "1.75rem",
              }}
            >
              {t("subtext")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: "1.75rem",
              }}
            >
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  borderRadius: 12,
                  background: "#f40024",
                  color: "#fffeee",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t("cta")}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2 6.5h9M7 2.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#ecosystem"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "13px 26px",
                  borderRadius: 12,
                  color: "#fffeee70",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  border: "1px solid #ffffff18",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ffffff0d")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {t("ctaSecondary")}
              </a>
            </motion.div>

            {/* Store badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.42 }}
              style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
            >
              <a
                href="https://apps.apple.com/us/app/habuk/id6737127503"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 18px",
                  borderRadius: 10,
                  background: "#ffffff10",
                  border: "1px solid #ffffff18",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ffffff18")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#ffffff10")
                }
              >
                <svg width="14" height="17" viewBox="0 0 814 1000" fill="#fffeee">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.1 172.5 46.1 42.8 0 109.6-49 189.2-49 30.7 0 110.7 2.9 167.4 57.9zm-78.2-217.6c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                </svg>
                <div>
                  <div style={{ color: "#fffeee60", fontSize: 9, lineHeight: 1, marginBottom: 2 }}>
                    {t("downloadOn")}
                  </div>
                  <div style={{ color: "#fffeee", fontSize: 12, fontWeight: 600, lineHeight: 1 }}>
                    {t("appStore")}
                  </div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.habuk.app&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 18px",
                  borderRadius: 10,
                  background: "#ffffff10",
                  border: "1px solid #ffffff18",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ffffff18")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#ffffff10")
                }
              >
                <svg width="14" height="16" viewBox="0 0 24 24">
                  <path d="M3.18 23.76A2 2 0 0 1 2 22V2A2 2 0 0 1 3.18.24L13.9 12 3.18 23.76z" fill="#ea4335" />
                  <path d="M17.6 16.27L5.13 23.36l-.05.03a2 2 0 0 0 1.83-.07l13.6-7.77-2.91-3.28z" fill="#fbbc04" />
                  <path d="M21.62 10.3l-3.11-1.78L15.4 12l3.11 3.5 3.11-1.78a2 2 0 0 0 0-3.42z" fill="#4285f4" />
                  <path d="M5.08.61 17.6 7.73l-2.2 2.48-10.32-9.6z" fill="#34a853" />
                </svg>
                <div>
                  <div style={{ color: "#fffeee60", fontSize: 9, lineHeight: 1, marginBottom: 2 }}>
                    {t("getItOn")}
                  </div>
                  <div style={{ color: "#fffeee", fontSize: 12, fontWeight: 600, lineHeight: 1 }}>
                    {t("playStore")}
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: 2 phones ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.16,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className="hidden lg:block"
            style={{ position: "relative", height: "100%", minHeight: 520 }}
          >
            {/* Back phone — tilted left */}
            <div
              style={{
                position: "absolute",
                left: "8%",
                top: "50%",
                transform: "translateY(-52%) rotate(-8deg)",
                opacity: 0.5,
                zIndex: 1,
              }}
            >
              <PhoneMockup label="HaBuk Staff — orders at a glance" screenshotSrc="/images/staff-orders.webp" />
            </div>

            {/* Front phone — tilted right */}
            <div
              style={{
                position: "absolute",
                right: "4%",
                top: "50%",
                transform: "translateY(-48%) rotate(6deg)",
                zIndex: 2,
                filter: "drop-shadow(0 24px 48px #00000060)",
              }}
            >
              <PhoneMockup label="HaBuk — browse & order" screenshotSrc="/images/habuk-home.webp" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll nudge — inside the section, guaranteed visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          color: "#fffeee30",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 4.5l4.5 4.5 4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
