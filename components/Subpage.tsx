"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Shared frame for the legal and info pages (about, support, privacy, terms).
// Inside the app's web view (?wv=1, or a web view user agent) the app already
// shows a title bar, so the header, the back link and the store links are hidden
// and the top padding is tight. Links between these pages keep the ?wv=1 flag.

export function useWebView() {
  const [isWebView, setIsWebView] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "al";

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("wv") === "1") {
      setIsWebView(true);
      return;
    }
    const ua = navigator.userAgent;
    const androidWV = /Android/.test(ua) && /Version\/\d+\.\d+.*Chrome\/\d+/.test(ua);
    const iosWV = /iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua) && /AppleWebKit/.test(ua);
    setIsWebView(androidWV || iosWV);
  }, []);

  const href = (path: string) => `/${locale}${path}${isWebView ? "/?wv=1" : ""}`;
  return { isWebView, locale, href };
}

type Page = "about" | "support" | "privacy" | "terms";

export function Subpage({ page, children }: { page: Page; children: ReactNode }) {
  const { isWebView, locale, href } = useWebView();
  const tc = useTranslations("common");
  const labels = {
    about: useTranslations("about")("badge"),
    support: useTranslations("support")("badge"),
    privacy: useTranslations("privacy")("badge"),
    terms: useTranslations("terms")("badge"),
  };
  const others = (Object.keys(labels) as Page[]).filter((p) => p !== page);

  return (
    <main
      className={`subpage min-h-screen bg-crumb text-ink ${isWebView ? "subpage-wv" : ""}`}
      style={{ fontFamily: "var(--nunito-sans), system-ui, sans-serif" }}
    >
      {!isWebView && (
        <header className="mx-auto flex max-w-[860px] items-center justify-between border-b border-line px-5 py-4 md:px-6">
          <a href={`/${locale}`}>
            <Image src="/brand/lockup-horizontal-duo.svg" alt="HaBuk" width={440} height={70} style={{ height: 22, width: "auto" }} />
          </a>
          <a href={`/${locale}`} className="text-[13px] text-ink-soft transition-colors hover:text-ink">
            {tc("back")}
          </a>
        </header>
      )}

      {children}

      <footer className="mx-auto max-w-[860px] border-t border-line px-5 py-6 text-center text-[12px] text-ink-soft md:px-6">
        © {new Date().getFullYear()} HaBuk ·{" "}
        {others.map((p, i) => (
          <span key={p}>
            {i > 0 && " · "}
            <a href={href(`/${p}`)} className="text-ink-soft hover:text-ink">
              {labels[p]}
            </a>
          </span>
        ))}
      </footer>
    </main>
  );
}

// One block of content with the page's gutter. Tight on phones, generous on desktop.
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-[860px] px-5 py-7 md:px-6 md:py-12 ${className}`}>{children}</section>;
}

export function Divider() {
  return (
    <div className="mx-auto max-w-[860px] px-5 md:px-6">
      <div className="h-px bg-line" />
    </div>
  );
}

export function Hero({ title, text, meta }: { title: ReactNode; text?: ReactNode; meta?: ReactNode }) {
  return (
    <section className="subpage-hero mx-auto max-w-[860px] px-5 pb-7 pt-8 md:px-6 md:pb-14 md:pt-20">
      <h1 className="mb-3 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.15] tracking-[-0.02em] md:mb-5" style={{ fontFamily: "var(--nunito), system-ui, sans-serif", textWrap: "balance" }}>
        {title}
      </h1>
      {meta && <p className="mb-4 text-[14px] text-ink-soft">{meta}</p>}
      {text && <p className="max-w-[560px] text-[16px] leading-[1.7] text-ink-soft md:text-[17px]">{text}</p>}
    </section>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 text-[20px] font-extrabold text-ink md:text-[22px]" style={{ fontFamily: "var(--nunito), system-ui, sans-serif" }}>
      {children}
    </h2>
  );
}

// Sections of a legal text, from messages: [{ title, text?, items?, after? }]
export type LegalSection = { title: string; text?: string; items?: string[]; after?: string };

export function LegalBody({ intro, sections }: { intro: string; sections: LegalSection[] }) {
  return (
    <div className="text-[16px] leading-[1.7] text-ink-soft">
      <p className="mb-4">{intro}</p>
      {sections.map((s) => (
        <div key={s.title}>
          <h2 className="mb-3 mt-8 text-[19px] font-extrabold text-ink md:mt-10 md:text-[20px]" style={{ fontFamily: "var(--nunito), system-ui, sans-serif" }}>
            {s.title}
          </h2>
          {s.text && <p className="mb-4">{s.text}</p>}
          {s.items && (
            <ul className="mb-4 list-disc pl-5">
              {s.items.map((it) => (
                <li key={it} className="mb-1.5">
                  {it}
                </li>
              ))}
            </ul>
          )}
          {s.after && <p className="mb-4">{s.after}</p>}
        </div>
      ))}
    </div>
  );
}
