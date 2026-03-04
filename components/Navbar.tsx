"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const LOCALES = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "al", flag: "🇦🇱", label: "AL" },
  { code: "mk", flag: "🇲🇰", label: "MK" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLocale =
    LOCALES.find((l) => pathname.startsWith(`/${l.code}`)) ?? LOCALES[0];

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: string) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = code;
    router.push("/" + segments.join("/"));
    setLangOpen(false);
  };

  const navLinks = [
    { label: t("apps"), href: "#ecosystem" },
    { label: t("features"), href: "#client" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <>
      {/* Floating pill wrapper */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        style={{
          position: "fixed",
          top: 14,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0 16px",
          pointerEvents: "none",
        }}
      >
        {/* The pill */}
        <nav
          style={{
            maxWidth: 820,
            margin: "0 auto",
            height: 52,
            borderRadius: 999,
            background: "rgba(1, 25, 26, 0.78)",
            backdropFilter: "blur(20px) saturate(1.6)",
            WebkitBackdropFilter: "blur(20px) saturate(1.6)",
            border: "1px solid rgba(255, 254, 238, 0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(255,254,238,0.04) inset",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px 0 16px",
            pointerEvents: "auto",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <Image
              src="/icon.png"
              alt="HaBuk"
              width={88}
              height={32}
              style={{ height: 30, width: "auto", objectFit: "contain", borderRadius: 8 }}
              priority
            />
          </a>

          {/* Desktop links — centered */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: 2 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: "rgba(255,254,238,0.65)",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: 999,
                  textDecoration: "none",
                  transition: "color 0.18s, background 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fffeee";
                  e.currentTarget.style.background = "rgba(255,254,238,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,254,238,0.65)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center" style={{ gap: 6 }}>
            {/* Language switcher */}
            <div style={{ position: "relative" }} ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 10px",
                  borderRadius: 999,
                  background: langOpen ? "rgba(255,254,238,0.1)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,254,238,0.65)",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) =>
                  !langOpen && (e.currentTarget.style.background = "rgba(255,254,238,0.07)")
                }
                onMouseLeave={(e) =>
                  !langOpen && (e.currentTarget.style.background = "transparent")
                }
              >
                <span style={{ fontSize: 14 }}>{currentLocale.flag}</span>
                <span>{currentLocale.label}</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  style={{
                    transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <path
                    d="M2 3.5l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      borderRadius: 14,
                      overflow: "hidden",
                      background: "rgba(1, 25, 26, 0.95)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,254,238,0.12)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                      minWidth: 110,
                    }}
                  >
                    {LOCALES.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => switchLocale(locale.code)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "10px 14px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: locale.code === currentLocale.code ? 600 : 400,
                          color:
                            locale.code === currentLocale.code
                              ? "#f40024"
                              : "rgba(255,254,238,0.75)",
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(255,254,238,0.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <span>{locale.flag}</span>
                        <span>{locale.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 999,
                background: "#f40024",
                color: "#fffeee",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.18s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {t("getStarted")}
            </a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center" style={{ gap: 4 }}>
            <div style={{ position: "relative" }} ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "5px 8px",
                  borderRadius: 999,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,254,238,0.65)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 14 }}>{currentLocale.flag}</span>
                <span>{currentLocale.label}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      borderRadius: 14,
                      overflow: "hidden",
                      background: "rgba(1, 25, 26, 0.95)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,254,238,0.12)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                      minWidth: 110,
                      zIndex: 60,
                    }}
                  >
                    {LOCALES.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => switchLocale(locale.code)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "10px 14px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: locale.code === currentLocale.code ? 600 : 400,
                          color:
                            locale.code === currentLocale.code
                              ? "#f40024"
                              : "rgba(255,254,238,0.75)",
                          textAlign: "left",
                        }}
                      >
                        <span>{locale.flag}</span>
                        <span>{locale.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: menuOpen ? "rgba(255,254,238,0.12)" : "rgba(255,254,238,0.07)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fffeee",
                transition: "background 0.18s",
              }}
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                  <path d="M0 1h15M0 6h15M0 11h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu — floating card below the pill */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              style={{
                maxWidth: 820,
                margin: "8px auto 0",
                borderRadius: 20,
                background: "rgba(1, 25, 26, 0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,254,238,0.1)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                padding: "8px",
                pointerEvents: "auto",
              }}
            >
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 12,
                    color: "rgba(255,254,238,0.75)",
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.15s, color 0.15s",
                    borderBottom:
                      i < navLinks.length - 1
                        ? "1px solid rgba(255,254,238,0.06)"
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,254,238,0.06)";
                    e.currentTarget.style.color = "#fffeee";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,254,238,0.75)";
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div style={{ padding: "8px 8px 4px" }}>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "#f40024",
                    color: "#fffeee",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  {t("getStarted")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
