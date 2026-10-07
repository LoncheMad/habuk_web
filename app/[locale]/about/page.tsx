"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Subpage, Section, Divider, Hero, H2 } from "@/components/Subpage";

type App = { name: string; tag: string; desc: string };
const ICONS: Record<string, string> = {
  HaBuk: "/brand/icon-client.svg",
  "HaBuk Staff": "/brand/icon-staff.svg",
  "HaBuk Manager": "/brand/icon-manager.svg",
};

export default function AboutPage() {
  const t = useTranslations("about");
  const apps = t.raw("apps") as App[];
  const pill = "inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-ink no-underline transition-colors hover:bg-line";

  return (
    <Subpage page="about">
      <Hero title={<>{t("headline1")} {t("headline2")}</>} text={t("description")} />
      <Divider />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <H2>{t("missionTitle")}</H2>
            <p className="text-[16px] leading-[1.75] text-ink-soft">{t("missionText")}</p>
          </div>
          <div>
            <H2>{t("locationTitle")}</H2>
            <p className="text-[16px] leading-[1.75] text-ink-soft">{t("locationText")}</p>
          </div>
        </div>
      </Section>
      <Divider />

      <Section>
        <H2>{t("ecosystemTitle")}</H2>
        <div className="grid gap-3 sm:grid-cols-3 md:gap-4">
          {apps.map((app) => (
            <div key={app.name} className="rounded-[28px] bg-white p-5 md:p-6">
              <Image src={ICONS[app.name] ?? ICONS.HaBuk} alt="" width={240} height={240} className="mb-4 h-11 w-11" />
              <div className="mb-1 text-[11px] font-semibold text-ink-soft">{app.tag}</div>
              <div className="mb-2 text-[15px] font-bold">{app.name}</div>
              <p className="text-[13px] leading-[1.65] text-ink-soft">{app.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      <Divider />

      <Section className="pb-12 md:pb-20">
        <H2>{t("contactTitle")}</H2>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:habukapp@gmail.com" className={pill}>habukapp@gmail.com</a>
          <a href="tel:+38970972983" className={pill}>+389 70 972 983</a>
        </div>
      </Section>
    </Subpage>
  );
}
