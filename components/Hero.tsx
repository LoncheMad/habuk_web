import { useTranslations } from "next-intl";
import { Phone, StoreLinks } from "./brand";
import LoopVideo from "./LoopVideo";
import BiteCard from "./BiteCard";
import LogoStack from "./LogoStack";
import { useFoundingCount } from "./FoundingSpots";
import { ClaimButton } from "./ClaimDialog";

/**
 * The bite card: a gradient card with its top-right corner bitten off (see .bite-card).
 * The brand allows one per screen, on the thing that matters most: here, the hero.
 * Buki takes the bite: see BiteCard.
 */
export default function Hero() {
  const t = useTranslations("hero");
  const promo = useTranslations("promo");
  const { count, left } = useFoundingCount();

  return (
    <section className="overflow-x-clip px-3 pt-[calc(clamp(96px,15vw,190px)*0.85+16px)] md:px-6 md:pt-[calc(clamp(96px,15vw,190px)*0.85+8px)]">
      <div className="mx-auto max-w-[1240px]">
      <BiteCard className="text-white" style={{ background: "var(--slice-hero)" }}>
        <div className="relative grid md:min-h-[640px] md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center px-6 pb-10 pt-28 sm:px-10 md:py-20 md:pl-16 md:pr-0">
            <h1
              className="font-black leading-[0.86]"
              style={{ fontSize: "clamp(76px, 13vw, 184px)", letterSpacing: "-0.035em" }}
            >
              {t("title")}
            </h1>
            <p className="mt-6 max-w-[30ch] text-[19px] font-bold leading-[1.45] md:mt-8 md:text-[22px]">
              {t("lede")}
            </p>

            {/* The reason to act now: the founding offer, who is already in, and the way in */}
            <div className="mt-9 text-center md:mt-12 md:text-left">
              <p className="mx-auto max-w-[22ch] font-display text-[24px] font-black leading-[1.15] md:mx-0 md:text-[30px]">{promo("title")}</p>
              <div className="mt-5 flex justify-center md:justify-start">
                <LogoStack tone="onColor" />
              </div>
              <p className="mt-3 text-[19px] font-bold leading-[1.35]">
                {count}. {left}
              </p>
              <ClaimButton className="mt-7 inline-flex h-12 items-center rounded-full bg-white px-7 text-[16px] font-bold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]">
                {promo("cta")}
              </ClaimButton>
            </div>
            {/* For guests, not owners: set apart on a darker well, which also carries its small text */}
            <div className="mt-10 self-center rounded-panel bg-ink/35 p-4 text-center md:mt-14 md:self-start md:text-left [&>div]:justify-center md:[&>div]:justify-start">
              <p className="mb-3 text-[15px] font-semibold">{t("guests")}</p>
              <StoreLinks tone="onColor" appStore={t("appStore")} playStore={t("playStore")} />
            </div>
          </div>

          {/* The client app rising out of the card's bottom edge */}
          <div className="relative flex h-[340px] justify-center overflow-hidden md:h-auto">
            <Phone
              alt="HaBuk app menu"
              width={300}
              className="absolute top-6 md:top-auto md:bottom-[-150px]"
              screen={<LoopVideo src="/video/client-menu.mp4" poster="/video/client-menu.jpg" label="HaBuk app menu" />}
            />
          </div>
        </div>
      </BiteCard>
      </div>
    </section>
  );
}
