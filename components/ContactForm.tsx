"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Scores } from "./brand";
import Buki from "./Buki";

// Formspree form "HaBuk website contact"
const FORMSPREE_ID = "mjywzerr";

const field =
  "block w-full rounded-panel bg-crumb px-4 py-3 text-[16px] text-ink placeholder:text-ink-soft/60 outline-none focus:ring-2 focus:ring-flame";

/** The contact form: who, which restaurant, and the number to call back. `source` tells us in the inbox which page the message came from. */
export default function ContactForm({ source }: { source: string }) {
  const t = useTranslations("cta.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", restaurant: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", restaurant: "", phone: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const input = (name: keyof typeof form, type: string, autoComplete: string) => (
    <label className="block text-left">
      <span className="mb-1.5 block text-[14px] font-semibold">{t(name)}</span>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        required
        autoComplete={autoComplete}
        className={field}
      />
    </label>
  );

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-panel bg-crumb p-10 text-center" role="status">
        <Buki mood="thumbs-up" width={150} />
        <p className="font-display text-[22px] font-bold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {input("name", "text", "name")}
      {input("restaurant", "text", "organization")}
      {input("phone", "tel", "tel")}

      {status === "error" && (
        <div className="flex items-center gap-3 rounded-panel bg-crumb p-3 pr-5" role="alert">
          <Buki mood="oops" width={64} />
          <p className="text-[15px] font-semibold text-brand-red">{t("error")}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex h-12 items-center justify-center gap-3 self-start rounded-full px-8 text-[16px] font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80"
        style={{ background: "var(--slice-client)" }}
      >
        {status === "sending" && <Scores className="animate-pulse" />}
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
