"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { EMAIL, PHONE, PHONE_DISPLAY, Scores } from "./brand";

// Replace with your Formspree form ID after signing up at formspree.io
const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

const DEMO_MAILTO = `mailto:${EMAIL}?subject=Demo%20Request&body=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20of%20HaBuk.`;

const field =
  "block w-full rounded-panel bg-crumb px-4 py-3 text-[16px] text-ink placeholder:text-ink-soft/60 outline-none focus:ring-2 focus:ring-flame";

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

  const input = (name: keyof typeof form, type = "text") => (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-semibold">{t(`form.${name}`)}</span>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        required={name !== "restaurant"}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "organization"}
        className={field}
      />
    </label>
  );

  return (
    <section id="contact" className="px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 rounded-card bg-white p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:p-16">
        <div>
          <h2 className="max-w-[14ch] text-[36px] font-black leading-[1.08] md:text-[48px]">{t("headline")}</h2>
          <p className="mt-4 max-w-[40ch] text-[18px] leading-[1.6] text-ink-soft">{t("subtext")}</p>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-[14px] text-ink-soft">{t("emailLabel")}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="text-[18px] font-bold hover:text-flame">{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[14px] text-ink-soft">{t("phoneLabel")}</dt>
              <dd>
                <a href={`tel:${PHONE}`} className="text-[18px] font-bold hover:text-flame">{PHONE_DISPLAY}</a>
              </dd>
            </div>
          </dl>

          <a
            href={DEMO_MAILTO}
            className="mt-10 inline-flex h-11 items-center rounded-full bg-crumb px-5 text-[15px] font-bold hover:bg-line transition-colors"
          >
            {t("bookDemo")}
          </a>
        </div>

        {status === "success" ? (
          <div className="grid place-items-center rounded-panel bg-crumb p-10 text-center" role="status">
            <p className="font-display text-[22px] font-bold">{t("form.success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {input("name")}
              {input("restaurant")}
            </div>
            {input("email", "email")}
            <label className="block">
              <span className="mb-1.5 block text-[14px] font-semibold">{t("form.message")}</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`${field} resize-none`}
              />
            </label>

            {status === "error" && (
              <p className="text-[15px] font-semibold text-brand-red" role="alert">
                {t("form.error")}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex h-12 items-center justify-center gap-3 self-start rounded-full px-8 text-[16px] font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80"
              style={{ background: "var(--slice-client)" }}
            >
              {status === "sending" && <Scores className="animate-pulse" />}
              {status === "sending" ? t("form.sending") : t("form.submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
