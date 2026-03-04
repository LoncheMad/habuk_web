import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "al" }, { locale: "mk" }];
}
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Marquee from "../../components/Marquee";
import Ecosystem from "../../components/Ecosystem";
import SystemFlow from "../../components/SystemFlow";
import AppShowcase from "../../components/AppShowcase";
import Billboard from "../../components/Billboard";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <section id="ecosystem">
        <Ecosystem />
      </section>
      <SystemFlow />
      <section id="client">
        <AppShowcase appKey="clientApp" variant="dark" phonePosition="right" />
      </section>
      <section id="staff">
        <AppShowcase appKey="staffApp" variant="cream" phonePosition="left" />
      </section>
      <Billboard />
      <section id="manager">
        <AppShowcase appKey="managerApp" variant="dark" phonePosition="right" />
      </section>
      <section id="delivery">
        <AppShowcase appKey="deliveryApp" variant="cream" phonePosition="left" />
      </section>
      <section id="contact">
        <CTASection />
      </section>
      <Footer />
    </main>
  );
}
