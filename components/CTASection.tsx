"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

// Replace with your Formspree form ID after signing up at formspree.io
const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const inputStyle = {
  background: "#ffffff10",
  border: "1px solid #ffffff18",
  borderRadius: 12,
  color: "#fffeee",
  padding: "12px 16px",
  width: "100%",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const ContactItem = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-4 group"
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105"
      style={{ background: "#f4002420", color: "#f40024" }}
    >
      {icon}
    </div>
    <div>
      <p style={{ fontSize: 11, color: "#fffeee60", marginBottom: 2 }}>{label}</p>
      <p
        style={{ fontSize: 14, color: "#fffeee", fontWeight: 500 }}
        className="group-hover:text-red transition-colors"
      >
        {value}
      </p>
    </div>
  </a>
);

export default function CTASection() {
  const t = useTranslations("cta");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", restaurant: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", restaurant: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      className="relative py-24 md:py-32 grain overflow-hidden"
      style={{ background: "#01191a" }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #f4002410 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — form */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "#f40024" }}
            >
              {t("badge")}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-black leading-[1.08] mb-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fffeee",
              }}
            >
              {t("headline")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-10"
              style={{ color: "#fffeee70" }}
            >
              {t("subtext")}
            </motion.p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl text-center"
                style={{ background: "#f4002415", border: "1px solid #f4002430" }}
              >
                <p className="font-semibold" style={{ color: "#fffeee" }}>
                  {t("form.success")}
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={stagger}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("form.name")}
                    required
                    style={inputStyle}
                  />
                  <input
                    name="restaurant"
                    value={form.restaurant}
                    onChange={handleChange}
                    placeholder={t("form.restaurant")}
                    required
                    style={inputStyle}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("form.email")}
                    required
                    style={inputStyle}
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("form.message")}
                    rows={4}
                    required
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </motion.div>

                {status === "error" && (
                  <p style={{ color: "#f40024", fontSize: 13 }}>{t("form.error")}</p>
                )}

                <motion.div variants={fadeUp}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                    style={{ background: "#f40024", color: "#fffeee" }}
                  >
                    {status === "sending" ? t("form.sending") : t("form.submit")}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          {/* Right — contact info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-8 lg:pt-24"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold tracking-wide uppercase"
              style={{ color: "#fffeee40" }}
            >
              {t("orContact")}
            </motion.p>

            <motion.div variants={stagger} className="flex flex-col gap-6">
              <motion.div variants={fadeUp}>
                <ContactItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                  label={t("emailLabel")}
                  value="habukapp@gmail.com"
                  href="mailto:habukapp@gmail.com"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <ContactItem
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.29 6.29l1.94-1.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                  label={t("phoneLabel")}
                  value="+389 70 972 983"
                  href="tel:+38970972983"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-2">
              <p
                className="text-sm font-semibold tracking-wide uppercase mb-4"
                style={{ color: "#fffeee40" }}
              >
                {t("bookDemo")}
              </p>
              <a
                href="mailto:habukapp@gmail.com?subject=Demo%20Request&body=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20of%20HaBuk."
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "#ffffff10",
                  border: "1px solid #ffffff20",
                  color: "#fffeee",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {t("bookDemo")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
