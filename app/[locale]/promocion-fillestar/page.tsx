/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import PromoOffer from "@/components/PromoOffer";
import { PROMO_PATH } from "@/components/founders";

const BASE_URL = "https://habuk.space";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "promo" });
  const url = (l: string) => `${BASE_URL}/${l}${PROMO_PATH}`;
  return {
    title: t("seoTitle"),
    description: t("lede"),
    alternates: {
      canonical: url(locale),
      languages: { en: url("en"), sq: url("al"), mk: url("mk"), "x-default": url("al") },
    },
    openGraph: { title: t("seoTitle"), description: t("lede"), url: url(locale) },
  };
}

/** One screen: the offer, the ten places, one button that opens the form. The site itself is one tap away on the logo. */
export default function PromoPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("promo");
  const common = useTranslations("common");

  return (
    <main className="flex min-h-screen flex-col px-5">
      <header className="mx-auto flex w-full max-w-[720px] items-center justify-between py-5">
        <a href={`/${locale}/`} aria-label="HaBuk">
          <img src="/brand/lockup-horizontal-duo.svg" alt="" width={440} height={70} className="h-[22px] w-auto" />
        </a>
        <a href={`/${locale}/`} className="text-[14px] font-semibold text-ink-soft transition-colors hover:text-ink">
          {common("back")}
        </a>
      </header>

      <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col items-center justify-center pb-16 pt-6 text-center">
        <h1 className="rise max-w-[14ch] text-[clamp(34px,8vw,60px)] font-black leading-[1.04]" style={{ letterSpacing: "-0.025em" }}>
          {t("title")}
        </h1>
        <p className="rise mt-4 max-w-[40ch] text-[17px] leading-[1.6] text-ink-soft md:text-[19px]" style={{ ["--i" as string]: 1 }}>{t("lede")}</p>

        <PromoOffer />
      </div>
    </main>
  );
}
