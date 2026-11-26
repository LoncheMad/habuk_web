"use client";

import { useTranslations } from "next-intl";
import { ClaimButton, useClaim } from "./ClaimDialog";
import FoundingSpots from "./FoundingSpots";
import { PHONE, PHONE_DISPLAY } from "./brand";

/** The ten places and the way in: the lit place and the button both open the page's claim dialog. */
export default function PromoOffer() {
  const t = useTranslations("promo");
  const open = useClaim();

  return (
    <>
      <div className="rise mt-6 w-full rounded-card bg-white px-5 py-6 sm:px-8 sm:py-8 md:mt-10 md:py-10" style={{ ["--i" as string]: 2 }}>
        <FoundingSpots onClaim={open} />
      </div>

      <ClaimButton
        className="rise mt-6 inline-flex h-12 items-center rounded-full px-8 text-[16px] font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: "var(--slice-cta)", ["--i" as string]: 3 }}
      >
        {t("cta")}
      </ClaimButton>
      <p className="rise mt-4 text-[15px] text-ink-soft" style={{ ["--i" as string]: 4 }}>
        {t("call")}{" "}
        <a href={`tel:${PHONE}`} className="font-bold text-ink hover:text-ember">{PHONE_DISPLAY}</a>
      </p>
    </>
  );
}
