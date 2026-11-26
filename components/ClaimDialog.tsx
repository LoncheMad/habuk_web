"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";

const ClaimContext = createContext<() => void>(() => {});

/** Opens the page's claim dialog. */
export const useClaim = () => useContext(ClaimContext);

/**
 * One contact dialog per page, opened from anywhere inside it with `useClaim()` or `<ClaimButton>`.
 * `source` tells us in the inbox which page the message came from.
 */
export function ClaimProvider({ source, children }: { source: string; children: ReactNode }) {
  const t = useTranslations("promo");
  const dialog = useRef<HTMLDialogElement>(null);
  // a new key on every close, so a sent form does not greet the next opening with its thank-you
  const [visit, setVisit] = useState(0);
  const open = () => {
    dialog.current?.showModal();
    dialog.current?.querySelector("input")?.focus();
  };

  return (
    <ClaimContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="claim-title"
        onClose={() => setVisit((v) => v + 1)}
        // a click on the backdrop lands on the dialog element itself
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
        className="sheet m-auto w-[calc(100%-24px)] max-w-[560px] rounded-card bg-white p-0 text-ink"
      >
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 id="claim-title" className="text-left text-[26px] font-black leading-[1.1] sm:text-[30px]">{t("cta")}</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={t("close")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-crumb transition-colors hover:bg-line"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>
          <ContactForm key={visit} source={source} />
        </div>
      </dialog>
    </ClaimContext.Provider>
  );
}

/** A button that opens the claim dialog; style it with className like any button. */
export function ClaimButton({ className, style, children }: { className?: string; style?: React.CSSProperties; children: ReactNode }) {
  const open = useClaim();
  return (
    <button type="button" onClick={open} className={className} style={style}>
      {children}
    </button>
  );
}
