import { useTranslations } from "next-intl";
import { Phone, StoreLinks } from "./brand";

/**
 * The bite card: a gradient card with its top-right corner bitten off (see .bite-card).
 * The brand allows one per screen, on the thing that matters most: here, the hero.
 */
export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="px-3 pt-[80px] md:px-6 md:pt-[88px]">
      <div
        className="bite-card relative mx-auto max-w-[1240px] overflow-hidden rounded-card text-white"
        style={{ background: "var(--slice-client)" }}
      >
        <div className="relative grid md:min-h-[640px] md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center px-6 pb-10 pt-28 sm:px-10 md:py-20 md:pl-16 md:pr-0">
            <h1
              className="font-black leading-[0.86]"
              style={{ fontSize: "clamp(76px, 13vw, 184px)", letterSpacing: "-0.035em" }}
            >
              {t("title")}
            </h1>
            <p className="mt-6 max-w-[30ch] text-[19px] leading-[1.45] text-white/90 md:mt-8 md:text-[22px]">
              {t("lede")}
            </p>
            <div className="mt-8 md:mt-10">
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[16px] font-bold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </a>
            </div>
            <div className="mt-12 md:mt-16">
              <p className="mb-3 text-[15px] font-semibold text-white/80">{t("guests")}</p>
              <StoreLinks tone="onColor" appStore={t("appStore")} playStore={t("playStore")} />
            </div>
          </div>

          {/* The client app rising out of the card's bottom edge */}
          <div className="relative flex h-[340px] justify-center overflow-hidden md:h-auto">
            <Phone
              src="/images/habuk-home.webp"
              alt="HaBuk app home screen"
              width={300}
              priority
              className="absolute top-6 md:top-auto md:bottom-[-150px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
