"use client";

import { useTranslations } from "next-intl";
import { Subpage, Hero, LegalBody, type LegalSection } from "@/components/Subpage";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  return (
    <Subpage page="privacy">
      <article className="mx-auto max-w-[760px] pb-12 md:pb-20">
        <Hero title={t("headline")} meta={t("lastUpdated")} />
        <div className="px-5 md:px-6">
          <LegalBody intro={t("intro")} sections={t.raw("sections") as LegalSection[]} />
        </div>
      </article>
    </Subpage>
  );
}
