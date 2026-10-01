"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LOCALES = [
  { code: "en", label: "EN", name: "English" },
  { code: "al", label: "AL", name: "Shqip" },
  { code: "mk", label: "MK", name: "Македонски" },
];

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

/** Two lines that fold into an X. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[14px] w-[20px]" aria-hidden>
      <motion.span
        className="absolute left-0 h-[2px] w-full rounded-full bg-ink"
        initial={false}
        animate={open ? { top: 6, rotate: 45 } : { top: 2, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 h-[2px] w-full rounded-full bg-ink"
        initial={false}
        animate={open ? { top: 6, rotate: -45 } : { top: 10, rotate: 0 }}
        transition={spring}
      />
    </span>
  );
}

function LanguageMenu({ current, onPick }: { current: (typeof LOCALES)[number]; onPick: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.name}`}
        className="flex h-9 items-center gap-1 rounded-full px-3 text-[14px] font-bold text-ink-soft transition-colors hover:bg-crumb hover:text-ink"
      >
        {current.label}
        <motion.svg width="10" height="10" viewBox="0 0 10 10" animate={{ rotate: open ? 180 : 0 }} transition={spring} aria-hidden>
          <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-[calc(100%+10px)] min-w-[160px] origin-top-right rounded-panel bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(31,26,23,0.25)]"
          >
            {LOCALES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.code === current.code}
                  lang={l.code === "al" ? "sq" : l.code}
                  onClick={() => {
                    setOpen(false);
                    onPick(l.code);
                  }}
                  className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[15px] transition-colors hover:bg-crumb ${
                    l.code === current.code ? "font-bold text-ink" : "text-ink-soft"
                  }`}
                >
                  {l.name}
                  <span className="text-[12px] font-bold text-ink-soft/60">{l.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const current = LOCALES.find((l) => pathname.startsWith(`/${l.code}`)) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  const switchLocale = (code: string) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = code;
    router.push("/" + segments.join("/"));
  };

  const links = [
    { label: t("apps"), href: "#apps" },
    { label: t("features"), href: "#client" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
        <motion.nav
          layout
          transition={spring}
          className="pointer-events-auto w-full bg-white shadow-[0_10px_30px_-12px_rgba(31,26,23,0.18)] md:w-auto"
          style={{ borderRadius: 28 }}
        >
          <motion.div layout="position" className="flex h-14 items-center justify-between gap-2 pl-5 pr-2 md:gap-6">
            <a href="#" aria-label="HaBuk" className="flex h-6 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/lockup-horizontal-duo.svg"
                alt=""
                width={440}
                height={70}
                className="h-[21px] w-auto"
              />
            </a>

            <motion.ul layout="position" className="hidden items-center md:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block rounded-full px-4 py-2 text-[15px] font-semibold text-ink-soft transition-colors hover:bg-crumb hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.div layout="position" className="flex items-center gap-1">
              <div className="hidden md:block">
                <LanguageMenu current={current} onPick={switchLocale} />
              </div>
              <a
                href="#contact"
                className="hidden h-10 items-center rounded-full px-5 text-[15px] font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.97] md:inline-flex"
                style={{ background: "var(--slice-client)" }}
              >
                {t("getStarted")}
              </a>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-crumb md:hidden"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Menu"
              >
                <MenuIcon open={open} />
              </button>
            </motion.div>
          </motion.div>

          {/* Mobile: the pill grows into the menu */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="mobile-menu"
                key="menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={spring}
                className="overflow-hidden md:hidden"
              >
                <motion.ul
                  className="px-3 pt-2"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                >
                  {links.map((l) => (
                    <motion.li
                      key={l.href}
                      variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-panel px-3 py-3 font-display text-[24px] font-extrabold hover:bg-crumb"
                      >
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-4">
                  <div className="flex gap-1" role="group" aria-label="Language">
                    {LOCALES.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => switchLocale(l.code)}
                        aria-pressed={l.code === current.code}
                        title={l.name}
                        className={`h-9 rounded-full px-3 text-[14px] font-bold transition-colors ${
                          l.code === current.code ? "bg-crumb text-ink" : "text-ink-soft"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center rounded-full px-5 text-[15px] font-bold text-white"
                    style={{ background: "var(--slice-client)" }}
                  >
                    {t("getStarted")}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </MotionConfig>
  );
}
