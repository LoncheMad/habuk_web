/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import { FOUNDERS, FOUNDER_PLACES } from "./founders";

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
  const { count } = useFoundingCount();
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
                  style={{ background: "var(--slice-cta)" }}
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

      <p className="rise mt-5 font-display text-[22px] font-black leading-[1.15] md:text-[26px]" style={{ ["--i" as string]: 4 }}>{count}</p>
      <p className="rise mt-1.5 text-[15px] text-ink-soft" style={{ ["--i" as string]: 5 }}>{FOUNDERS.map((f) => f.name).join(" · ")}</p>
    </div>
  );
}
