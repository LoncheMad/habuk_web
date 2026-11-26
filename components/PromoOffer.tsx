"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";
import FoundingSpots from "./FoundingSpots";
import { PHONE, PHONE_DISPLAY } from "./brand";
import { PROMO_PATH } from "./founders";

/** The ten places and the way in: the lit place and the button both open the contact form in a dialog. */
export default function PromoOffer() {
  const t = useTranslations("promo");
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => dialog.current?.showModal();

  return (
    <>
      <div className="rise mt-8 w-full rounded-card bg-white px-5 py-8 sm:px-8 md:mt-10 md:py-10" style={{ ["--i" as string]: 2 }}>
        <FoundingSpots onClaim={open} />
      </div>

      <button
        type="button"
        onClick={open}
        className="rise mt-8 inline-flex h-12 items-center rounded-full px-8 text-[16px] font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: "var(--slice-client)", ["--i" as string]: 16 }}
      >
        {t("cta")}
      </button>
      <p className="rise mt-4 text-[15px] text-ink-soft" style={{ ["--i" as string]: 17 }}>
        {t("call")}{" "}
        <a href={`tel:${PHONE}`} className="font-bold text-ink hover:text-flame">{PHONE_DISPLAY}</a>
      </p>

      <dialog
        ref={dialog}
        aria-labelledby="claim-title"
        // a click on the backdrop lands on the dialog element itself
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
        className="sheet m-auto w-[calc(100%-24px)] max-w-[560px] rounded-card bg-white p-0 text-ink backdrop:bg-ink/50"
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
          <ContactForm source={PROMO_PATH.slice(1)} />
        </div>
      </dialog>
    </>
  );
}
