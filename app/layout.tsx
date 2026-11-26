import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";

// Brand type: Nunito for display (the logo is Nunito Black), Nunito Sans for reading.
// Both cover Albanian (latin-ext) and Macedonian (cyrillic).
const nunito = Nunito({
  variable: "--nunito",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--nunito-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HaBuk | The Complete Restaurant Ecosystem",
  description:
    "HaBuk powers your entire restaurant operation: guest ordering, staff, kitchen and bar printing, and analytics. One ecosystem, three apps.",
  openGraph: {
    title: "HaBuk | The Complete Restaurant Ecosystem",
    description:
      "The app your customers love, the tools your team needs.",
    siteName: "HaBuk",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${nunitoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
