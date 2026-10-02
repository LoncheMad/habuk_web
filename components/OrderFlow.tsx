"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AppIcon, type AppId } from "./brand";
import Buki, { type BukiMood } from "./Buki";

// The film follows one dine-in order from the table to the till; each beat owns a stretch of it (seconds)
const CHAPTERS: { key: "client" | "staff" | "print" | "manager"; app: AppId; from: number; to: number }[] = [
  { key: "client", app: "client", from: 0, to: 10.6 },
  { key: "staff", app: "staff", from: 10.6, to: 12.9 },
  { key: "print", app: "staff", from: 12.9, to: 21.3 },
  { key: "manager", app: "manager", from: 21.3, to: 32.8 },
];

// Buki is the guest at table 4: his mood follows what is happening to his order
const MOODS: { mood: BukiMood; then?: BukiMood }[] = [
  { mood: "scan" },
  { mood: "notify" },
  { mood: "hungry" },
  { mood: "eat", then: "thumbs-up" },
];

export default function OrderFlow() {
  const t = useTranslations("flow");
  const video = useRef<HTMLVideoElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // play only while the film is on screen
    const io = new IntersectionObserver(([e]) => {
      if (r) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    // chapter progress follows the film's own clock
    let raf = 0;
    const tick = () => {
      const now = v.currentTime;
      CHAPTERS.forEach((c, i) => {
        const bar = bars.current[i];
        if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, (now - c.from) / (c.to - c.from)))})`;
      });
      const idx = CHAPTERS.findIndex((c) => now >= c.from && now < c.to);
      if (idx >= 0) setActive((a) => (a === idx ? a : idx));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const jump = (i: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = CHAPTERS[i].from + 0.01;
    v.play().catch(() => {});
    setActive(i);
  };

  return (
    <section id="apps" className="px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex items-end justify-between gap-6 px-3 md:px-0">
          <div className="max-w-[640px]">
            <h2 className="text-[40px] font-black leading-[1.05] md:text-[56px]">{t("title")}</h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft md:text-[20px]">{t("lede")}</p>
          </div>
          {/* Buki reacts to each chapter of the film; crumb background only, per the brand rules */}
          <Buki {...MOODS[active]} width={150} className="-mb-4 hidden shrink-0 md:block" label={t(`steps.${CHAPTERS[active].key}.title`)} />
        </div>

        <div className="mt-10 overflow-hidden rounded-card bg-white md:mt-12">
          <video
            ref={video}
            src="/video/one-order.mp4"
            poster="/video/one-order.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t("title")}
            className="block aspect-video w-full bg-crumb object-cover"
          />
          {/* chapters: one per app, lit by the film's clock; tap to jump */}
          <ol className="grid grid-cols-2 gap-1 p-2 md:grid-cols-4">
            {CHAPTERS.map((c, i) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? "step" : undefined}
                  className={`relative flex w-full items-center gap-3 overflow-hidden rounded-panel px-3 py-3 text-left transition-colors md:px-4 md:py-4 ${
                    active === i ? "bg-crumb" : "hover:bg-crumb/60"
                  }`}
                >
                  <AppIcon app={c.app} size={40} />
                  <span className="min-w-0">
                    <span className="block font-display text-[13px] font-extrabold text-ink-soft">{i + 1}</span>
                    <span className={`block text-[15px] font-bold leading-tight md:text-[16px] ${active === i ? "text-ink" : "text-ink-soft"}`}>
                      {t(`steps.${c.key}.title`)}
                    </span>
                  </span>
                  <span
                    ref={(el) => { bars.current[i] = el; }}
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-flame"
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-6 px-3 text-[15px] text-ink-soft md:px-0">{t("standalone")}</p>
      </div>
    </section>
  );
}
