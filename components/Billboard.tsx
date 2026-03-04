"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Billboard() {
  const t = useTranslations("billboard");
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#f40024",
        padding: "clamp(5rem, 10vw, 9rem) 1.5rem",
        textAlign: "center",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #c40020 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          }}
          style={{
            fontSize: "clamp(2.8rem, 7vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#01191a",
            marginBottom: "2.5rem",
          }}
        >
          {t("headline1")}
          <br />
          <span style={{ color: "#fffeee" }}>{t("headline2")}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              borderRadius: 12,
              background: "#01191a",
              color: "#fffeee",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("cta")}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M2.5 7.5h10M8.5 3.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
