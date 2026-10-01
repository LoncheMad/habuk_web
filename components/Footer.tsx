"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { StoreLinks } from "./brand";

export default function Footer() {
  const t = useTranslations("footer");
  const about = useTranslations("about");
  const support = useTranslations("support");
  const privacy = useTranslations("privacy");
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "al";

  const links = [
    { label: t("links.apps"), href: "#apps" },
    { label: t("links.features"), href: "#client" },
    { label: t("links.contact"), href: "#contact" },
    { label: about("badge"), href: `/${locale}/about` },
    { label: support("badge"), href: `/${locale}/support` },
    { label: privacy("badge"), href: `/${locale}/privacy` },
  ];

  return (
    <footer className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="mx-auto max-w-[1240px] rounded-card bg-ink px-6 py-12 text-white sm:px-10 md:px-16 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <img
              src="/brand/lockup-stacked-white.svg"
              alt="HaBuk"
              width={300}
              height={225}
              className="h-auto w-[120px]"
            />
            <p className="mt-6 text-[16px] text-white/60">{t("tagline")}</p>
          </div>
          <StoreLinks tone="onColor" appStore={t("appStore")} playStore={t("googlePlay")} />
        </div>

        <div className="mt-12 flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
