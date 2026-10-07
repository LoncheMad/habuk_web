"use client";

import { useTranslations } from "next-intl";
import { Subpage, Section, Divider, Hero, H2, useWebView } from "@/components/Subpage";
import { StoreLinks } from "@/components/brand";

type Faq = { q: string; a: string };

export default function SupportPage() {
  const t = useTranslations("support");
  const tc = useTranslations("common");
  const tf = useTranslations("footer");
  const { isWebView } = useWebView();
  const faqs = t.raw("faq") as Faq[];

  const card = "flex items-start gap-4 rounded-[28px] bg-white p-5 text-ink no-underline md:p-6";
  const icon = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crumb text-flame";

  return (
    <Subpage page="support">
      <Hero title={<>{t("headline1")} {t("headline2")}</>} text={t("description")} />
      <Divider />

      <Section>
        <H2>{t("contactTitle")}</H2>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          <a href="mailto:habukapp@gmail.com" className={card}>
            <div className={icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div className="mb-1 text-[12px] font-semibold text-ink-soft">{t("emailLabel")}</div>
              <div className="text-[15px] font-semibold">habukapp@gmail.com</div>
              <div className="mt-1 text-[12px] text-ink-soft">{t("replyTime")}</div>
            </div>
          </a>
          <a href="tel:+38970972983" className={card}>
            <div className={icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div>
              <div className="mb-1 text-[12px] font-semibold text-ink-soft">{t("phoneLabel")}</div>
              <div className="text-[15px] font-semibold">+389 70 972 983</div>
              <div className="mt-1 text-[12px] text-ink-soft">{t("hours")}</div>
            </div>
          </a>
        </div>
      </Section>

      {!isWebView && (
        <>
          <Divider />
          <Section>
            <H2>{tc("download")}</H2>
            <StoreLinks tone="light" appStore={tf("appStore")} playStore={tf("googlePlay")} />
          </Section>
        </>
      )}

      <Divider />
      <Section className="pb-12 md:pb-20">
        <H2>{t("faqTitle")}</H2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-[28px] bg-white px-5 py-5 md:px-6">
              <div className="mb-2 text-[15px] font-semibold leading-[1.4] text-ink">{faq.q}</div>
              <p className="m-0 text-[14px] leading-[1.7] text-ink-soft">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </Subpage>
  );
}
