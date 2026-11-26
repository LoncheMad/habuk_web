"use client";

import { useTranslations } from "next-intl";
import { EMAIL, PHONE, PHONE_DISPLAY } from "./brand";
import Buki from "./Buki";
import ContactForm from "./ContactForm";
import { useFoundingCount } from "./FoundingSpots";

export default function CTASection() {
  const t = useTranslations("cta");
  const promo = useTranslations("promo");
  const { count } = useFoundingCount();
  return (
    <section className="px-3 pb-20 pt-56 md:px-6 md:pb-28 md:pt-72">
      {/* the anchor is the card, not the section, so "contact" lands on the form and not on the space Buki stands in */}
      <div
        id="contact"
        className="relative mx-auto grid max-w-[1240px] gap-10 rounded-card bg-white p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr] md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-10 md:p-16"
      >
        {/* Buki stands on the card's top edge, on the crumb, and says the line in his bubble */}
        <Buki
          mood="talk"
          hide={["typing 1", "typing 2", "typing 3"]}
          className="pointer-events-none absolute bottom-[calc(100%-14px)] right-2 w-[280px] md:right-10 md:w-[400px]"
          style={{ width: undefined, height: "auto", aspectRatio: "600 / 500" }}
          label={t("buki")}
        >
          <p
            className="absolute flex items-center justify-center text-center font-display font-extrabold leading-[1.15] text-ink"
            style={{ left: "57.5%", top: "23%", width: "35%", height: "27%", fontSize: "clamp(13px, 1.25vw, 18px)" }}
          >
            {t("buki")}
          </p>
        </Buki>
        <div className="md:col-start-1 md:row-start-1">
          <h2 className="max-w-[14ch] text-[36px] font-black leading-[1.08] md:text-[48px]">{t("headline")}</h2>
          <p className="mt-4 max-w-[34ch] text-[17px] leading-[1.5] text-ink-soft">
            <strong className="font-bold text-ink">{promo("title")}</strong> {count}.
          </p>
        </div>

        <div className="md:col-start-2 md:row-span-2 md:row-start-1">
          <ContactForm source="home" />
        </div>

        <div className="md:col-start-1 md:row-start-2">
          <dl className="space-y-5">
            <div>
              <dt className="text-[14px] text-ink-soft">{t("emailLabel")}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="text-[18px] font-bold hover:text-ember">{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[14px] text-ink-soft">{t("phoneLabel")}</dt>
              <dd>
                <a href={`tel:${PHONE}`} className="text-[18px] font-bold hover:text-ember">{PHONE_DISPLAY}</a>
              </dd>
            </div>
          </dl>

        </div>
      </div>
    </section>
  );
}
