"use client";

import { useTranslations } from "next-intl";
import { EMAIL, PHONE, PHONE_DISPLAY } from "./brand";
import Buki from "./Buki";
import ContactForm from "./ContactForm";

const DEMO_MAILTO = `mailto:${EMAIL}?subject=Demo%20Request&body=Hi%2C%20I%27d%20like%20to%20book%20a%20demo%20of%20HaBuk.`;

export default function CTASection() {
  const t = useTranslations("cta");
  return (
    <section id="contact" className="px-3 pb-20 pt-56 md:px-6 md:pb-28 md:pt-72">
      <div className="relative mx-auto grid max-w-[1240px] gap-10 rounded-card bg-white p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:p-16">
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
        <div>
          <h2 className="max-w-[14ch] text-[36px] font-black leading-[1.08] md:text-[48px]">{t("headline")}</h2>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-[14px] text-ink-soft">{t("emailLabel")}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="text-[18px] font-bold hover:text-flame">{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[14px] text-ink-soft">{t("phoneLabel")}</dt>
              <dd>
                <a href={`tel:${PHONE}`} className="text-[18px] font-bold hover:text-flame">{PHONE_DISPLAY}</a>
              </dd>
            </div>
          </dl>

          <a
            href={DEMO_MAILTO}
            className="mt-10 inline-flex h-11 items-center rounded-full bg-crumb px-5 text-[15px] font-bold hover:bg-line transition-colors"
          >
            {t("bookDemo")}
          </a>
        </div>

        <ContactForm source="home" />
      </div>
    </section>
  );
}
