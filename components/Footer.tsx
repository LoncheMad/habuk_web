"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { StoreLinks } from "./brand";

export default function Footer() {
  const t = useTranslations("footer");
  const about = useTranslations("about");
  const support = useTranslations("support");
  const privacy = useTranslations("privacy");
  const terms = useTranslations("terms");
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "al";

  const links = [
    { label: t("links.apps"), href: "#devices" },
    { label: t("links.features"), href: "#client" },
    { label: t("links.contact"), href: "#contact" },
    { label: about("badge"), href: `/${locale}/about` },
    { label: support("badge"), href: `/${locale}/support` },
    { label: privacy("badge"), href: `/${locale}/privacy` },
    { label: terms("badge"), href: `/${locale}/terms` },
  ];

  return (
    <footer className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="mx-auto max-w-[1240px] rounded-card bg-ink px-6 py-12 text-white sm:px-10 md:px-16 md:py-16">
        <div className="grid justify-items-center gap-10 text-center md:grid-cols-[1fr_auto] md:items-end md:justify-items-stretch md:gap-12 md:text-left [&>div:last-child]:justify-center">
          <div>
            <img
              src="/brand/lockup-stacked-white.svg"
              alt="HaBuk"
              width={300}
              height={225}
              className="mx-auto h-auto w-[120px] md:mx-0"
            />
            <p className="mt-6 text-[16px] text-white/60">{t("tagline")}</p>
          </div>
          <StoreLinks tone="onColor" appStore={t("appStore")} playStore={t("googlePlay")} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 pt-8 text-center md:flex-row md:justify-between md:text-left" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-white/70 hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-white/50">
            © {year} HaBuk. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
