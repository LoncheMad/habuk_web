import { useTranslations } from "next-intl";
import { AppIcon, Phone, StoreLinks, type AppId } from "./brand";

const SCREENS: Record<AppId, [front: string, back: string]> = {
  client: ["/images/habuk-menu.webp", "/images/habuk-home.webp"],
  staff: ["/images/staff-orders.webp", "/images/staff-products.webp"],
  manager: ["/images/manager-revenue.webp", "/images/manager-product-analytics.webp"],
  delivery: ["/images/delivery-orders.webp", "/images/delivery-active.webp"],
};

const MESSAGES: Record<AppId, string> = {
  client: "clientApp",
  staff: "staffApp",
  manager: "managerApp",
  delivery: "deliveryApp",
};

export default function AppShowcase({ app, flip = false }: { app: AppId; flip?: boolean }) {
  const t = useTranslations(MESSAGES[app]);
  const names = useTranslations("ecosystem.apps");
  const hero = useTranslations("hero");
  const features = t.raw("features") as string[];
  const labels = Object.values(t.raw("screenshots") as Record<string, string>);
  const [front, back] = SCREENS[app];

  return (
    <section id={app} className="px-3 py-10 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={`px-3 md:px-0 ${flip ? "md:order-2" : ""}`}>
          <div className="flex items-center gap-4">
            <AppIcon app={app} size={56} />
            <div>
              <p className="font-display text-[20px] font-bold leading-tight">{names(`${app}.name`)}</p>
              <p className="text-[15px] text-ink-soft">{t("badge")}</p>
            </div>
          </div>

          <h2 className="mt-8 max-w-[16ch] text-[36px] font-black leading-[1.08] md:text-[48px]">
            {t("headline")}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[18px] leading-[1.6] text-ink-soft">{t("subtext")}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-[16px] leading-[1.5]">
                <svg width="18" height="18" viewBox="0 0 18 18" className="mt-[3px] shrink-0 text-flame" aria-hidden>
                  <path d="M4 9.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {app === "client" && (
            <div className="mt-10">
              <StoreLinks appStore={hero("appStore")} playStore={hero("playStore")} />
            </div>
          )}
        </div>

        {/* Two real screens, straight, rising out of the app's own slice of the gradient */}
        <div
          className={`relative h-[440px] overflow-hidden rounded-card md:h-[600px] ${flip ? "md:order-1" : ""}`}
          style={{ background: `var(--slice-${app})` }}
        >
          <Phone
            src={back}
            alt={labels[1] ?? ""}
            width={250}
            className="absolute left-[8%] top-12 md:left-[12%] md:top-16"
          />
          <Phone
            src={front}
            alt={labels[0] ?? ""}
            width={270}
            className="absolute right-[8%] top-28 md:right-[12%] md:top-36"
          />
        </div>
      </div>
    </section>
  );
}
