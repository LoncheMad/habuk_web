/* eslint-disable @next/next/no-img-element */

export const APP_STORE_URL = "https://apps.apple.com/us/app/habuk/id6737127503";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.habuk.app&hl=en";
export const EMAIL = "habukapp@gmail.com";
export const PHONE = "+38970972983";
export const PHONE_DISPLAY = "+389 70 972 983";

export type AppId = "client" | "staff" | "manager" | "delivery";

export function AppIcon({ app, size = 48 }: { app: AppId; size?: number }) {
  return (
    <img
      src={`/brand/icon-${app}.svg`}
      alt=""
      width={240}
      height={240}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  );
}

/**
 * A phone with a real screenshot in it. Set straight; the brand never tilts.
 * The Dynamic Island is the smaller iPhone 18 one: about a quarter of the screen
 * wide, centred on the status-bar clock (7.4% of the screen width down).
 */
export function Phone({
  src,
  alt,
  width = 280,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`bg-ink shadow-[0_30px_60px_-20px_rgba(31,26,23,0.45)] ${className}`}
      style={{ width, padding: width * 0.035, borderRadius: width * 0.16 }}
    >
      <div className="relative overflow-hidden" style={{ borderRadius: width * 0.13 }}>
        <img
          src={src}
          alt={alt}
          width={1260}
          height={2736}
          loading={priority ? "eager" : "lazy"}
          className="block w-full h-auto"
        />
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
          style={{ top: "3.42%", width: "25%", height: "3.5%" }}
        />
      </div>
    </div>
  );
}

/** The three scores, off the logo. Used as a loading state, never next to the mark. */
export function Scores({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      width="32"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d="M8 36 C10 22 14 12 22 4" />
      <path d="M24 36 C26 22 30 12 38 4" />
      <path d="M40 36 C42 22 46 12 54 4" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg width="14" height="17" viewBox="0 0 814 1000" fill="currentColor" aria-hidden>
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.1 172.5 46.1 42.8 0 109.6-49 189.2-49 30.7 0 110.7 2.9 167.4 57.9zm-78.2-217.6c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="14" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.18 23.76A2 2 0 0 1 2 22V2A2 2 0 0 1 3.18.24L13.9 12 3.18 23.76z" />
      <path d="M17.6 16.27L5.13 23.36l-.05.03a2 2 0 0 0 1.83-.07l13.6-7.77-2.91-3.28z" />
      <path d="M21.62 10.3l-3.11-1.78L15.4 12l3.11 3.5 3.11-1.78a2 2 0 0 0 0-3.42z" />
      <path d="M5.08.61 17.6 7.73l-2.2 2.48-10.32-9.6z" />
    </svg>
  );
}

/** App Store and Google Play as two pills. `tone` follows the surface they sit on. */
export function StoreLinks({
  tone = "light",
  appStore = "App Store",
  playStore = "Google Play",
}: {
  tone?: "light" | "onColor";
  appStore?: string;
  playStore?: string;
}) {
  const cls =
    tone === "onColor"
      ? "bg-white/15 text-white hover:bg-white/25"
      : "bg-white text-ink hover:bg-line";
  const base =
    "inline-flex items-center gap-2 h-11 px-5 rounded-full text-[15px] font-semibold transition-colors";
  return (
    <div className="flex flex-wrap gap-2">
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${cls}`}>
        <AppleGlyph />
        {appStore}
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${cls}`}>
        <PlayGlyph />
        {playStore}
      </a>
    </div>
  );
}
