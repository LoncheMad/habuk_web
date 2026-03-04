"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const APP_KEYS = ["client", "staff", "manager", "delivery"] as const;
const APP_HREFS: Record<string, string> = {
  client: "#client",
  staff: "#staff",
  manager: "#manager",
  delivery: "#delivery",
};

export default function Ecosystem() {
  const t = useTranslations("ecosystem");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{ background: "#fffeee" }} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header — editorial split */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-4"
          style={{ gap: "1rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "#01191a",
            }}
          >
            {t("headline1")}
            <br />
            <span style={{ color: "#f40024" }}>{t("headline2")}</span>
          </h2>

          <p
            style={{
              color: "#01191a80",
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: 260,
              flexShrink: 0,
            }}
          >
            {t("subtext")}
          </p>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: "#01191a18", margin: "2.5rem 0 0" }} />

        {/* App rows — editorial menu style */}
        <div>
          {APP_KEYS.map((key, index) => {
            const name = t(`apps.${key}.name`);
            const tagline = t(`apps.${key}.tagline`);
            const number = t(`apps.${key}.number`);
            const isHovered = hovered === key;

            return (
              <motion.a
                key={key}
                href={APP_HREFS[key]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.6rem 1rem",
                  borderBottom: "1px solid #01191a12",
                  textDecoration: "none",
                  cursor: "pointer",
                  background: isHovered ? "#01191a" : "transparent",
                  transition: "background 0.22s ease, padding 0.22s ease",
                  borderRadius: isHovered ? 12 : 0,
                  marginBottom: isHovered ? 2 : 0,
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: isHovered ? "#f40024" : "#f40024",
                    width: 32,
                    flexShrink: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {number}
                </span>

                {/* App name */}
                <span
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2.6rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                    color: isHovered ? "#fffeee" : "#01191a",
                    flex: 1,
                    transition: "color 0.22s",
                    lineHeight: 1,
                  }}
                >
                  {name}
                </span>

                {/* Type badge */}
                <span
                  className="hidden md:block"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: isHovered ? "#ffffff50" : "#01191a40",
                    flexShrink: 0,
                    transition: "color 0.22s",
                  }}
                >
                  {t(`apps.${key}.type`)}
                </span>

                {/* Tagline */}
                <span
                  className="hidden lg:block"
                  style={{
                    fontSize: 13,
                    color: isHovered ? "#fffeee70" : "#01191a60",
                    maxWidth: 200,
                    flexShrink: 0,
                    textAlign: "right",
                    lineHeight: 1.4,
                    transition: "color 0.22s",
                  }}
                >
                  {tagline}
                </span>

                {/* Arrow */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.22s",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="#f40024"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
