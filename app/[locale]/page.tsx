import { setRequestLocale } from "next-intl/server";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Devices from "../../components/Devices";
import AppShowcase from "../../components/AppShowcase";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";
import { FoundingSpotsBand } from "../../components/FoundingSpots";
import { PROMO_PATH } from "../../components/founders";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "al" }, { locale: "mk" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FoundingSpotsBand href={`/${locale}${PROMO_PATH}/`} />
        <Devices />
        <AppShowcase app="client" />
        <AppShowcase app="manager" flip />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
