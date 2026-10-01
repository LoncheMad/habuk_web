import { useTranslations } from "next-intl";
import { AppIcon, type AppId } from "./brand";

// The real path of one order, in order, so here the numbers mean something.
const STEPS: AppId[] = ["client", "staff", "delivery", "manager"];

export default function OrderFlow() {
  const t = useTranslations("flow");
  const apps = useTranslations("ecosystem.apps");

  return (
    <section id="apps" className="px-3 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[640px] px-3 md:px-0">
          <h2 className="text-[40px] font-black leading-[1.05] md:text-[56px]">{t("title")}</h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft md:text-[20px]">{t("lede")}</p>
        </div>

        <ol className="mt-12 grid gap-2 rounded-card bg-white p-2 md:mt-16 md:grid-cols-4 md:gap-0 md:p-3">
          {STEPS.map((app, i) => (
            <li key={app} className="relative flex flex-col rounded-panel p-6 md:p-7">
              <div className="flex items-center justify-between">
                <AppIcon app={app} size={56} />
                <span
                  className="font-display text-[44px] font-black leading-none text-line"
                  aria-hidden
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-8 text-[22px] font-bold leading-[1.25]">{t(`steps.${app}.title`)}</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-ink-soft">{t(`steps.${app}.text`)}</p>
              <a
                href={`#${app}`}
                className="mt-auto pt-6 text-[15px] font-bold text-flame hover:underline underline-offset-4"
              >
                {apps(`${app}.name`)}
              </a>
            </li>
          ))}
        </ol>

        <p className="mt-6 px-3 text-[15px] text-ink-soft md:px-0">{t("standalone")}</p>
      </div>
    </section>
  );
}
