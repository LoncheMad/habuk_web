"use client";

import { useEffect, useRef } from "react";

/** Buki's moods, one Lottie loop each (menu-staff/docs/design/mascot). */
export type BukiMood =
  | "idle" | "hello" | "scan" | "hungry" | "yay" | "eat" | "empty" | "search" | "sleep"
  | "oops" | "sad-wave" | "lost" | "perks" | "loading" | "notify" | "point" | "thumbs-up"
  | "talk" | "think" | "bite";

// frame sizes: most are 380 × 500; the bubbles need room on the right; bite is a head-only peek
const FRAME: Partial<Record<BukiMood, [w: number, h: number]>> = { talk: [600, 500], think: [600, 500], bite: [529, 632] };
// where the figure's centre sits in each frame, so a follow-up mood lines up with the first one
const FIGURE_X: Partial<Record<BukiMood, number>> = { bite: 294 };
const fw = (m: BukiMood) => FRAME[m]?.[0] ?? 380;
const fx = (m: BukiMood) => FIGURE_X[m] ?? 190;

type Anim = {
  play(): void; pause(): void; destroy(): void;
  goToAndStop(f: number, isFrame?: boolean): void;
  addEventListener(name: string, cb: (e: { currentTime: number }) => void): void;
};

const cache = new Map<string, Promise<{ op: number; layers: { nm?: string }[] }>>();
const load = (mood: BukiMood) => {
  if (!cache.has(mood)) cache.set(mood, fetch(`/mascot/buki-${mood}.json`).then((r) => r.json()));
  return cache.get(mood)!;
};

/**
 * Buki, the HaBuk mascot: he is the guest. Brand rule: guest moments and marketing only, always on
 * crumb (his head disappears on white; his hat is the gradient mark, so never on a warm colour).
 *
 * `mood` can change at any time; the new loop crossfades in. `then` plays `mood` for `loops` loops
 * and settles into `then`. Plays only while on screen and holds a still for reduced motion.
 */
export default function Buki({
  mood,
  then,
  loops = 1,
  once = false,
  delay = 0,
  hide = [],
  width = 200,
  className = "",
  label,
  style,
  onFrame,
  children,
}: {
  mood: BukiMood;
  then?: BukiMood;
  loops?: number;
  /** Play the mood a single time and hold its last frame. */
  once?: boolean;
  /** Seconds before the first mood starts (it holds its first frame until then). */
  delay?: number;
  /** Layer names to drop, e.g. talk's typing dots when a line sits in the bubble. */
  hide?: string[];
  width?: number;
  className?: string;
  /** Only when Buki carries meaning; otherwise he is decoration and hidden from screen readers. */
  label?: string;
  /** Called with the frame number while the first mood plays, e.g. to sync the page to a bite. */
  onFrame?: (frame: number) => void;
  /** Overrides the size, e.g. when it scales with a CSS variable. */
  style?: React.CSSProperties;
  /** Laid over the frame, e.g. the line inside talk's speech bubble. */
  children?: React.ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const ratio = (FRAME[mood]?.[1] ?? 500) / fw(mood);
  const frameCb = useRef(onFrame);
  frameCb.current = onFrame;
  const hideKey = hide.join("|");

  useEffect(() => {
    const host = box.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let current: Anim | null = null;
    let visible = false;
    let started = delay <= 0;
    const timers: number[] = [];
    const drop = new Set(hideKey ? hideKey.split("|") : []);

    const mount = async (m: BukiMood, onLoop?: () => void, first = false) => {
      const [{ default: lottie }, data] = await Promise.all([
        import("lottie-web/build/player/lottie_light"),
        load(m),
      ]);
      if (cancelled) return;
      const layer = document.createElement("div");
      // the box is sized for the first mood; a later mood is placed so its figure lands on the same spot
      const w = (fw(m) / fw(mood)) * 100, left = ((fx(mood) - fx(m)) / fw(mood)) * 100;
      layer.style.cssText = `position:absolute;top:0;bottom:0;left:${left}%;width:${w}%;opacity:0;transition:opacity .22s ease`;
      host.appendChild(layer);
      const animationData = drop.size ? { ...data, layers: data.layers.filter((l) => !drop.has(l.nm ?? "")) } : data;
      const anim = lottie.loadAnimation({
        container: layer,
        renderer: "svg",
        // a mood that hands over after one pass plays once and holds its last frame
        loop: !(onLoop && loops === 1) && !(first && once && !then),
        autoplay: false,
        animationData: structuredClone(animationData),
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      }) as unknown as Anim;
      if (onLoop) anim.addEventListener(loops === 1 ? "complete" : "loopComplete", onLoop);
      if (first) anim.addEventListener("enterFrame", (e) => frameCb.current?.(e.currentTime));
      // crossfade: the new loop fades in over the old one, then the old one goes
      const prev = current;
      const prevLayer = host.firstElementChild !== layer ? host.firstElementChild : null;
      current = anim;
      requestAnimationFrame(() => (layer.style.opacity = "1"));
      if (prev) timers.push(window.setTimeout(() => { prev.destroy(); prevLayer?.remove(); }, 260));
      if (reduced) {
        anim.goToAndStop(first && once ? data.op - 1 : 20, true);
        if (first) frameCb.current?.(Infinity); // reduced motion: skip straight to the end state
      }
      else if (visible && started) anim.play();
      else anim.goToAndStop(0, true);
    };

    let done = 0;
    mount(mood, then ? () => { if (++done >= loops && !cancelled) mount(then); } : undefined, true);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (reduced || !current) return;
      if (visible && started) current.play();
      else current.pause();
    }, { threshold: 0.2 });
    io.observe(host);
    if (!started) timers.push(window.setTimeout(() => { started = true; if (visible && !reduced) current?.play(); }, delay * 1000));

    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach(clearTimeout);
      current?.destroy();
      host.replaceChildren();
    };
  }, [mood, then, loops, once, delay, hideKey]);

  return (
    <div
      className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative "}${className}`}
      style={{ width, height: width * ratio, ...style }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div ref={box} className="absolute inset-0" />
      {children}
    </div>
  );
}
