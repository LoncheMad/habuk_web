/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import { FOUNDERS, FOUNDER_PLACES } from "./founders";
import LogoStack from "./LogoStack";

const taken = FOUNDERS.length;
const left = Math.max(0, FOUNDER_PLACES - taken);
const places = Array.from({ length: FOUNDER_PLACES }, (_, i) => FOUNDERS[i] as (typeof FOUNDERS)[number] | undefined);

/** The count as a sentence: "4 of 10 places taken". */
export function useFoundingCount() {
  const t = useTranslations("promo.spots");
  return { count: t("count", { taken, total: FOUNDER_PLACES }), left: t("left", { left }) };
}

/**
 * The founding offer as ten round places: the taken ones are the restaurants' logos,
 * the next one is lit and calls `onClaim`, the rest are empty outlines.
 * One row from sm up, two rows of five on phones.
 */
export default function FoundingSpots({ onClaim }: { onClaim: () => void }) {
  const t = useTranslations("promo.spots");
  const { count, left: leftLine } = useFoundingCount();
  const seat = "grid aspect-square w-full place-items-center rounded-full font-display text-[15px] font-extrabold sm:w-14";

  return (
    <div>
      <ol className="mx-auto grid max-w-[340px] grid-cols-5 gap-2.5 sm:flex sm:max-w-none sm:justify-center sm:gap-3">
        {places.map((founder, i) => {
          if (founder) {
            return (
              <li key={i} className="pop sm:w-14" style={{ ["--i" as string]: i }}>
                <img
                  src={founder.logo}
                  alt={founder.name}
                  title={founder.name}
                  width={192}
                  height={192}
                  className="aspect-square w-full rounded-full bg-white object-cover"
                  style={{ boxShadow: "0 0 0 2px var(--color-flame)" }}
                />
              </li>
            );
          }
          if (i === taken) {
            return (
              <li key={i} className="pop" style={{ ["--i" as string]: i }}>
                <button
                  type="button"
                  onClick={onClaim}
                  aria-label={t("yours")}
                  title={t("yours")}
                  className={`${seat} beacon text-white transition-transform hover:scale-[1.06] active:scale-[0.96]`}
                  style={{ background: "var(--slice-client)" }}
                >
                  {i + 1}
                </button>
              </li>
            );
          }
          return (
            <li key={i} className={`${seat} pop border-2 border-dashed border-line text-ink-soft/50`} style={{ ["--i" as string]: i }} aria-label={`${i + 1}: ${t("free")}`}>
              {i + 1}
            </li>
          );
        })}
      </ol>

      <p className="rise mt-6 font-display text-[24px] font-black leading-[1.15] md:text-[28px]" style={{ ["--i" as string]: 13 }}>{count}</p>
      <p className="rise mt-1.5 text-[15px] text-ink-soft" style={{ ["--i" as string]: 14 }}>{FOUNDERS.map((f) => f.name).join(" · ")}</p>
      <p className="rise mt-1.5 text-[15px] font-semibold text-flame" style={{ ["--i" as string]: 15 }}>{leftLine}</p>
    </div>
  );
}

/** The same offer in one band, for pages that only point at it: the ten places stacked, the count and a link. */
export function FoundingSpotsBand({ href }: { href: string }) {
  const t = useTranslations("promo");
  const { count, left: leftLine } = useFoundingCount();

  return (
    <section className="px-3 pt-3 md:px-6 md:pt-6">
      <a
        href={href}
        className="group mx-auto flex max-w-[1240px] flex-col items-center gap-5 rounded-card bg-white p-6 text-center sm:px-10 md:flex-row md:gap-10 md:py-7 md:text-left"
      >
        <p className="font-display text-[20px] font-extrabold leading-[1.2] md:max-w-[22ch] md:shrink-0 md:text-[22px]">{t("title")}</p>
        <div className="flex min-w-0 flex-col items-center gap-3 md:flex-1">
          <LogoStack />
          <p className="text-[15px] font-semibold leading-[1.35] text-ink-soft">
            {count} <span className="block text-flame sm:inline">{leftLine}</span>
          </p>
        </div>
        <span
          className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full px-7 text-[16px] font-bold text-white transition-transform group-hover:scale-[1.03] group-active:scale-[0.98] md:w-auto"
          style={{ background: "var(--slice-client)" }}
        >
          {t("see")}
        </span>
      </a>
    </section>
  );
}
