"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Phone } from "./brand";

// Rendered from brag-output/staff-order (a frame-by-frame composition of the HaBuk Staff order flow)
const CLIPS = {
  terminal: { src: "/video/staff-order-terminal.mp4", poster: "/video/staff-order-terminal.jpg" },
  tablet: { src: "/video/staff-order-tablet.mp4", poster: "/video/staff-order-tablet.jpg" },
  phone: { src: "/video/staff-order-phone.mp4", poster: "/video/staff-order-phone.jpg" },
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A silent product loop. Holds on the poster frame for people who prefer reduced motion. */
function Loop({
  clip,
  offset = 0,
  label,
}: {
  clip: keyof typeof CLIPS;
  offset?: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReducedMotion()) return;
    v.currentTime = offset;
    v.play().catch(() => {});
  }, [offset]);

  return (
    <video
      ref={ref}
      src={CLIPS[clip].src}
      poster={CLIPS[clip].poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="block h-full w-full object-cover"
    />
  );
}

/** Counter all-in-one: a 16:9 touchscreen on a neck and a weighted base. */
function Terminal({ label }: { label: string }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full rounded-[22px] bg-ink p-[1.6%] shadow-[0_40px_80px_-30px_rgba(31,26,23,0.55)]">
        <div className="aspect-video overflow-hidden rounded-[12px] bg-white">
          <Loop clip="terminal" label={label} />
        </div>
        <div className="flex h-[18px] items-center justify-center">
          <span className="h-[5px] w-[5px] rounded-full bg-ink-soft" />
        </div>
      </div>
      <div className="h-[46px] w-[13%] bg-gradient-to-b from-[#2b2420] to-ink" style={{ clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" }} />
      <div className="h-[14px] w-[38%] rounded-t-[10px] rounded-b-[4px] bg-ink shadow-[0_18px_30px_-12px_rgba(31,26,23,0.5)]" />
    </div>
  );
}

/** Landscape tablet with its own 16:10 render. */
function Tablet({ label }: { label: string }) {
  return (
    <div className="w-full rounded-[26px] bg-ink p-[2.6%] shadow-[0_40px_70px_-28px_rgba(31,26,23,0.6)]">
      <div className="aspect-[16/10] overflow-hidden rounded-[16px] bg-white">
        <Loop clip="tablet" offset={3.5} label={label} />
      </div>
    </div>
  );
}

export default function Devices() {
  const t = useTranslations("devices");
  const staff = useTranslations("staffApp");
  const labels = Object.values(staff.raw("screenshots") as Record<string, string>);

  return (
    <section id="devices" className="px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[640px] px-3 md:px-0">
          <h2 className="text-[40px] font-black leading-[1.05] md:text-[56px]">{t("title")}</h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft md:text-[20px]">{t("lede")}</p>
        </div>

        {/* One stage, three devices on a shared floor line */}
        <div className="relative mt-12 overflow-hidden rounded-card bg-white px-4 pb-6 pt-14 md:mt-16 md:px-12 md:pt-20">
          <div className="relative mx-auto flex max-w-[1060px] items-end justify-center">
            <figure className="relative z-0 w-[78%] md:w-[64%]">
              <Terminal label={labels[0] ?? t("terminal")} />
              <figcaption className="py-5 text-center text-[15px] font-semibold text-ink-soft">{t("terminal")}</figcaption>
            </figure>

            <figure className="relative z-10 -ml-[16%] mb-[52px] hidden w-[34%] sm:block">
              <Tablet label={labels[0] ?? t("tablet")} />
              <figcaption className="py-5 text-center text-[15px] font-semibold text-ink-soft">{t("tablet")}</figcaption>
            </figure>

            <figure className="relative z-20 -ml-[6%] w-[30%] sm:w-[15%]">
              <Phone
                alt={labels[0] ?? t("phone")}
                width={170}
                className="!w-full"
                screen={<Loop clip="phone" offset={6.5} label={labels[0] ?? t("phone")} />}
              />
              <figcaption className="py-5 text-center text-[15px] font-semibold text-ink-soft">{t("phone")}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
