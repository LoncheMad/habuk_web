"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { Phone } from "./brand";

// Rendered from brag-output/staff-order (a frame-by-frame composition of the HaBuk Staff order flow)
const CLIPS = {
  terminal: { src: "/video/staff-order-terminal.mp4", poster: "/video/staff-order-terminal.jpg" },
  tablet: { src: "/video/staff-order-tablet.mp4", poster: "/video/staff-order-tablet.jpg" },
  phone: { src: "/video/staff-order-phone.mp4", poster: "/video/staff-order-phone.jpg" },
};

/** In the terminal clip the order is confirmed ("Porosia u dërgua") at 6.6 s. */
const SENT_AT = 6.6;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A silent product loop. Holds on the poster frame for people who prefer reduced motion. */
function Loop({
  clip,
  offset = 0,
  label,
  videoRef,
}: {
  clip: keyof typeof CLIPS;
  offset?: number;
  label: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  const own = useRef<HTMLVideoElement>(null);
  const ref = videoRef ?? own;

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReducedMotion()) return;
    v.currentTime = offset;
    v.play().catch(() => {});
  }, [offset, ref]);

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
function Terminal({ label, videoRef }: { label: string; videoRef: RefObject<HTMLVideoElement | null> }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full rounded-[22px] bg-ink p-[1.6%] shadow-[0_40px_80px_-30px_rgba(31,26,23,0.55)]">
        <div className="aspect-video overflow-hidden rounded-[12px] bg-white">
          <Loop clip="terminal" label={label} videoRef={videoRef} />
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

/* ── The kitchen / bar split ─────────────────────────────────────────── */

const TICKETS = {
  kitchen: { head: "KUZHINA", lines: ["2× Margarita", "1× Sallatë Greke", "1× Spaghetti Carbonara"], color: "#fb6f1c" },
  bar: { head: "BAR", lines: ["1× Coca-Cola"], color: "#b8174c" },
} as const;

type Side = keyof typeof TICKETS;

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const span = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function Ticket({ side }: { side: Side }) {
  const tk = TICKETS[side];
  return (
    <div className="px-[9%] pb-[12%] pt-[14%] font-mono leading-[1.45] text-ink" style={{ fontSize: "calc(var(--pw) * 0.05)", whiteSpace: "nowrap" }}>
      {/* divs, not p: the global p { text-wrap } rule would undo nowrap */}
      <div className="text-center text-[1.25em] font-bold tracking-[0.08em]">{tk.head}</div>
      <div className="mt-[0.4em] text-center font-bold">Tavolina 4</div>
      <div className="text-center text-ink-soft">ValoniXh · 21:14</div>
      <div className="my-[0.5em] overflow-hidden text-ink-soft/60">- - - - - - - - - - - - - - - -</div>
      {tk.lines.map((l) => (
        <div key={l} className="font-bold">{l}</div>
      ))}
    </div>
  );
}

function Printer({ side, label, setRefs }: { side: Side; label: string; setRefs: (side: Side, el: { paper: HTMLDivElement | null; led: HTMLSpanElement | null }) => void }) {
  const paper = useRef<HTMLDivElement>(null);
  const led = useRef<HTMLSpanElement>(null);
  useEffect(() => setRefs(side, { paper: paper.current, led: led.current }), [setRefs, side]);

  return (
    <div className="flex flex-col items-center" style={{ width: "var(--pw)" }}>
      {/* paper comes out of the slot, header first */}
      <div className="relative w-full" style={{ height: "calc(var(--pw) * 1.02)" }}>
        <div
          ref={paper}
          className="absolute bottom-[-6px] left-1/2 w-[84%] -translate-x-1/2 overflow-hidden bg-white shadow-[0_6px_18px_-8px_rgba(31,26,23,0.45)]"
          style={{ height: 0, clipPath: "polygon(0 4px, 6% 0, 12% 4px, 18% 0, 24% 4px, 30% 0, 36% 4px, 42% 0, 48% 4px, 54% 0, 60% 4px, 66% 0, 72% 4px, 78% 0, 84% 4px, 90% 0, 96% 4px, 100% 0, 100% 100%, 0 100%)" }}
        >
          <Ticket side={side} />
        </div>
      </div>
      {/* the printer itself: lid, serrated tear bar over the slot, button and status light */}
      <div className="relative w-full rounded-[20px] bg-ink shadow-[0_22px_34px_-16px_rgba(31,26,23,0.55)]" style={{ height: "calc(var(--pw) * 0.6)" }}>
        <div className="absolute inset-x-0 top-0 h-[42%] rounded-t-[20px] bg-gradient-to-b from-[#3a302a] to-[#2b2420]" />
        <div className="absolute left-[8%] right-[8%] top-[8%] h-[5px] rounded-full bg-black/80" />
        <div
          className="absolute left-[9%] right-[9%] top-[13%] h-[6px] bg-[#5c524b]"
          style={{ clipPath: "polygon(0 0,100% 0,100% 40%,97% 100%,94% 40%,91% 100%,88% 40%,85% 100%,82% 40%,79% 100%,76% 40%,73% 100%,70% 40%,67% 100%,64% 40%,61% 100%,58% 40%,55% 100%,52% 40%,49% 100%,46% 40%,43% 100%,40% 40%,37% 100%,34% 40%,31% 100%,28% 40%,25% 100%,22% 40%,19% 100%,16% 40%,13% 100%,10% 40%,7% 100%,4% 40%,1% 100%,0 40%)" }}
        />
        <span className="absolute bottom-[20%] left-[10%] h-[14%] w-[16%] rounded-full bg-[#3a312c]" />
        <span ref={led} className="absolute bottom-[24%] right-[10%] h-[8px] w-[8px] rounded-full bg-[#3a312c]" />
      </div>
      <p className="py-4 text-center text-[15px] font-semibold text-ink-soft">{label}</p>
    </div>
  );
}

/** Two printers under the terminal, fed by one cable that splits in two. Timed off the terminal video. */
function Printers({ video, kitchen, bar }: { video: RefObject<HTMLVideoElement | null>; kitchen: string; bar: string }) {
  const box = useRef<HTMLDivElement>(null);
  const pathL = useRef<SVGPathElement>(null);
  const pathR = useRef<SVGPathElement>(null);
  const dotL = useRef<SVGCircleElement>(null);
  const dotR = useRef<SVGCircleElement>(null);
  const parts = useRef<Partial<Record<Side, { paper: HTMLDivElement | null; led: HTMLSpanElement | null }>>>({});
  const [w, setW] = useState(600);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // geometry, all in px of this box
  const pw = Math.min(190, w * 0.3);
  const paperH = pw * 1.02;
  const bodyH = pw * 0.6;
  const h = paperH + bodyH + 60; // room for the labels under the printers
  const cx = w / 2;
  const xL = w * 0.2 + pw / 2; // inner edge of the kitchen printer
  const xR = w * 0.8 - pw / 2;
  const y = paperH + bodyH * 0.6;
  const r = Math.min(40, (xR - xL) / 4);
  const dL = `M ${cx} 0 V ${y - r} Q ${cx} ${y} ${cx - r} ${y} H ${xL}`;
  const dR = `M ${cx} 0 V ${y - r} Q ${cx} ${y} ${cx + r} ${y} H ${xR}`;

  useEffect(() => {
    let raf = 0;
    const reduced = prefersReducedMotion();
    const frame = () => {
      const t = reduced ? 9 : (video.current?.currentTime ?? 0);
      // the order travels down the cable and splits
      const travel = easeInOut(span(t, SENT_AT + 0.05, SENT_AT + 0.75));
      const seen = span(t, SENT_AT, SENT_AT + 0.08) * (1 - span(t, SENT_AT + 0.75, SENT_AT + 0.85));
      ([["kitchen", pathL, dotL], ["bar", pathR, dotR]] as const).forEach(([side, path, dot]) => {
        const p = path.current, d = dot.current;
        if (!p || !d) return;
        const pt = p.getPointAtLength(p.getTotalLength() * travel);
        d.setAttribute("cx", String(pt.x));
        d.setAttribute("cy", String(pt.y));
        d.style.opacity = String(seen);
        // then the paper feeds out, header first
        const part = parts.current[side];
        if (!part?.paper) return;
        const start = SENT_AT + 0.8 + (side === "bar" ? 0.08 : 0);
        const len = side === "kitchen" ? 1.15 : 0.7;
        const full = part.paper.scrollHeight;
        const fed = span(t, start, start + len);
        const gone = easeInOut(span(t, 9.7, 10.2));
        part.paper.style.height = `${full * fed}px`;
        part.paper.style.opacity = String(1 - gone);
        part.paper.style.transform = `translateY(${-12 * gone}px)`; // x-centring stays on the translate property
        if (part.led) {
          const printing = t > start - 0.05 && t < start + len;
          part.led.style.background = printing ? "#22c55e" : "#3a312c";
          part.led.style.boxShadow = printing ? "0 0 8px #22c55e" : "none";
        }
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [video]);

  const setRefs = (side: Side, el: { paper: HTMLDivElement | null; led: HTMLSpanElement | null }) => {
    parts.current[side] = el;
  };

  return (
    <div ref={box} className="relative w-full rounded-panel bg-crumb" style={{ height: h, ["--pw" as string]: `${pw}px` }} aria-hidden>
      <svg className="absolute inset-0 overflow-visible" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <path ref={pathL} d={dL} fill="none" stroke="#e6d3c3" strokeWidth="4" strokeLinecap="round" />
        <path ref={pathR} d={dR} fill="none" stroke="#e6d3c3" strokeWidth="4" strokeLinecap="round" />
        <circle ref={dotL} r="7" fill={TICKETS.kitchen.color} style={{ opacity: 0, filter: `drop-shadow(0 0 6px ${TICKETS.kitchen.color})` }} />
        <circle ref={dotR} r="7" fill={TICKETS.bar.color} style={{ opacity: 0, filter: `drop-shadow(0 0 6px ${TICKETS.bar.color})` }} />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-between" style={{ paddingInline: `calc(${w * 0.2}px - var(--pw) / 2)` }}>
        <Printer side="kitchen" label={kitchen} setRefs={setRefs} />
        <Printer side="bar" label={bar} setRefs={setRefs} />
      </div>
    </div>
  );
}

export default function Devices() {
  const t = useTranslations("devices");
  const staff = useTranslations("staffApp");
  const labels = Object.values(staff.raw("screenshots") as Record<string, string>);
  const terminalVideo = useRef<HTMLVideoElement>(null);

  return (
    <section id="devices" className="px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[640px] px-3 md:px-0">
          <h2 className="text-[40px] font-black leading-[1.05] md:text-[56px]">{t("title")}</h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft md:text-[20px]">{t("lede")}</p>
        </div>

        {/* One stage, three devices on a shared floor line, and the counter's printers below */}
        <div className="relative mt-12 overflow-hidden rounded-card bg-white px-4 pb-6 pt-14 md:mt-16 md:px-12 md:pt-20">
          <div className="relative mx-auto flex max-w-[1060px] items-end justify-center">
            <figure className="relative z-0 w-[78%] md:w-[64%]">
              <Terminal label={labels[0] ?? t("terminal")} videoRef={terminalVideo} />
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

          {/* centred under the terminal: same width and offset as its figure */}
          <div className="mx-auto flex max-w-[1060px] justify-center">
            <div className="w-[78%] md:w-[64%]">
              <Printers video={terminalVideo} kitchen={t("kitchen")} bar={t("bar")} />
            </div>
            <div className="hidden w-[34%] -ml-[16%] sm:block" />
            <div className="w-[30%] -ml-[6%] sm:w-[15%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
