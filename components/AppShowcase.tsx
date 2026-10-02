import { useTranslations } from "next-intl";
import { AppIcon, Phone, StoreLinks, type AppId } from "./brand";
import LoopVideo from "./LoopVideo";

// Each app's moment in the order's journey, rendered from brag-output/one-order (screen mode + manager.html)
const LOOPS: Partial<Record<AppId, string>> = {
  client: "/video/client-order",
  manager: "/video/manager-live",
};

const MESSAGES: Partial<Record<AppId, string>> = {
  client: "clientApp",
  staff: "staffApp",
  manager: "managerApp",
};

export default function AppShowcase({ app, flip = false }: { app: AppId; flip?: boolean }) {
  const t = useTranslations(MESSAGES[app] ?? "clientApp");
  const names = useTranslations("ecosystem.apps");
  const hero = useTranslations("hero");
  const tags = t.raw("tags") as string[];
  const labels = Object.values(t.raw("screenshots") as Record<string, string>);
  const loop = LOOPS[app];

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
          <ul className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-white px-4 py-2 text-[15px] font-semibold">
                {tag}
              </li>
            ))}
          </ul>

          {app === "client" && (
            <div className="mt-10">
              <StoreLinks appStore={hero("appStore")} playStore={hero("playStore")} />
            </div>
          )}
        </div>

        {/* The app at work, rising out of its own slice of the gradient */}
        <div
          className={`relative h-[480px] overflow-hidden rounded-card md:h-[600px] ${flip ? "md:order-1" : ""}`}
          style={{ background: `var(--slice-${app})` }}
        >
          {loop && (
            <Phone
              alt={labels[0] ?? ""}
              width={300}
              className="absolute left-1/2 top-12 -translate-x-1/2 md:top-16"
              screen={<LoopVideo src={`${loop}.mp4`} poster={`${loop}.jpg`} label={labels[0] ?? ""} />}
            />
          )}
        </div>
      </div>
    </section>
  );
}
