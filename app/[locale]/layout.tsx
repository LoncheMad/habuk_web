import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

const BASE_URL = "https://habuk.space";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  const title = t("title");
  const description = t("description");

  // hreflang alternates — tell Google about all locale versions
  const languages: Record<string, string> = {
    en: `${BASE_URL}/en`,
    sq: `${BASE_URL}/al`,   // Albanian ISO code is "sq"
    mk: `${BASE_URL}/mk`,
    "x-default": `${BASE_URL}/al`,
  };

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: "HaBuk",
      type: "website",
      locale: locale === "mk" ? "mk_MK" : locale === "al" ? "sq_AL" : "en_US",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "HaBuk — The Complete Restaurant Ecosystem",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
