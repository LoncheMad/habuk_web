"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PhoneMockup from "./PhoneMockup";

type AppKey = "clientApp" | "staffApp" | "managerApp" | "deliveryApp";

const SECTION_NUMBERS: Record<AppKey, string> = {
  clientApp: "01",
  staffApp: "02",
  managerApp: "03",
  deliveryApp: "04",
};

const PHONE_ROTATIONS: Record<AppKey, number> = {
  clientApp: 6,
  staffApp: -7,
  managerApp: 5,
  deliveryApp: -6,
};

// Drop screenshots into /public/images/ with these exact filenames
// Drop screenshots into /public/images/ with these exact filenames
const SCREENSHOT_SRCS: Record<AppKey, { main?: string; back?: string }> = {
  clientApp:   { main: "/images/habuk-home.webp",              back: "/images/habuk-menu.webp"             },
  staffApp:    { main: "/images/staff-orders.webp",            back: "/images/staff-products.webp"         },
  managerApp:  { main: "/images/manager-revenue.webp",         back: "/images/manager-product-analytics.webp" },
  deliveryApp: { main: "/images/delivery-orders.webp",         back: "/images/delivery-active.webp"        },
};

interface AppShowcaseProps {
  appKey: AppKey;
  variant: "dark" | "cream";
  phonePosition: "left" | "right";
}

export default function AppShowcase({
  appKey,
  variant,
  phonePosition,
}: AppShowcaseProps) {
  const t = useTranslations(appKey);
  const isDark = variant === "dark";

  const badge = t("badge");
  const headline = t("headline");
  const subtext = t("subtext");
  const features = t.raw("features") as string[];
  const screenshots = t.raw("screenshots") as Record<string, string>;
  const screenshotLabels = Object.values(screenshots);
  const srcs = SCREENSHOT_SRCS[appKey];
  const sectionNumber = SECTION_NUMBERS[appKey];
  const phoneRotation = PHONE_ROTATIONS[appKey];

  const bg = isDark ? "#01191a" : "#fffeee";
  const textMain = isDark ? "#fffeee" : "#01191a";
  const textMuted = isDark ? "#fffeee60" : "#01191a60";
  const dividerColor = isDark ? "#ffffff10" : "#01191a10";

  const ContentBlock = (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="flex flex-col justify-center"
    >
      {/* Badge */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#f40024",
          marginBottom: "1.25rem",
          display: "block",
        }}
      >
        {badge}
      </span>

      {/* Headline */}
      <h2
        style={{
          fontSize: "clamp(2rem, 4.2vw, 3.6rem)",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: textMain,
          marginBottom: "1.25rem",
        }}
      >
        {headline}
      </h2>

      {/* Subtext */}
      <p
        style={{
          color: textMuted,
          fontSize: 15,
          lineHeight: 1.75,
          maxWidth: 400,
          marginBottom: "2.5rem",
        }}
      >
        {subtext}
      </p>

      {/* Feature list — em-dash editorial style */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: `1px solid ${dividerColor}`,
        }}
      >
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.05 * i,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              padding: "0.9rem 0",
              borderBottom: `1px solid ${dividerColor}`,
            }}
          >
            <span
              style={{
                color: "#f40024",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.5,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              —
            </span>
            <span
              style={{ color: textMuted, fontSize: 14, lineHeight: 1.65 }}
            >
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  const PhoneBlock = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="relative flex items-center justify-center"
      style={{ minHeight: 520 }}
    >
      {/* Background phone */}
      {screenshotLabels[1] && (
        <div
          style={{
            position: "absolute",
            transform: `rotate(${phoneRotation * -1.4}deg) translateX(${phonePosition === "right" ? "-70px" : "70px"}) translateY(20px)`,
            opacity: 0.45,
            zIndex: 1,
          }}
        >
          <PhoneMockup
            label={screenshotLabels[1]}
            screenshotSrc={srcs.back}
            dark={isDark}
            className="scale-90"
          />
        </div>
      )}

      {/* Main phone — angled */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          transform: `rotate(${phoneRotation}deg)`,
          filter: `drop-shadow(0 32px 64px ${isDark ? "#00000080" : "#01191a30"})`,
        }}
      >
        <PhoneMockup label={screenshotLabels[0]} screenshotSrc={srcs.main} dark={isDark} />
      </div>

      {/* App name watermark */}
      {screenshotLabels.length > 2 && (
        <div
          style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
          }}
        >
          {screenshotLabels.slice(2).map((label, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                padding: "4px 10px",
                borderRadius: 99,
                background: isDark ? "#ffffff0d" : "#01191a0d",
                color: isDark ? "#fffeee50" : "#01191a50",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: bg }}
    >
      {/* Section number watermark */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          top: "50%",
          [phonePosition === "right" ? "right" : "left"]: "-2%",
          transform: "translateY(-50%)",
          fontSize: "clamp(8rem, 22vw, 22rem)",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: isDark ? "#ffffff05" : "#01191a05",
          userSelect: "none",
        }}
      >
        {sectionNumber}
      </div>

      {/* Top divider accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: isDark
            ? "linear-gradient(90deg, transparent, #ffffff08, transparent)"
            : "linear-gradient(90deg, transparent, #01191a08, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center`}
        >
          {phonePosition === "right" ? (
            <>
              {ContentBlock}
              {PhoneBlock}
            </>
          ) : (
            <>
              {PhoneBlock}
              {ContentBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
