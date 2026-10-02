import { setRequestLocale } from "next-intl/server";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import OrderFlow from "../../components/OrderFlow";
import Devices from "../../components/Devices";
import AppShowcase from "../../components/AppShowcase";
import CTASection from "../../components/CTASection";
import Footer from "../../components/Footer";

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
        <OrderFlow />
        <Devices />
        <AppShowcase app="client" />
        <AppShowcase app="manager" flip />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
