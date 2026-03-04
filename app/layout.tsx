import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HaBuk — The Complete Restaurant Ecosystem",
  description:
    "HaBuk powers your entire restaurant operation — ordering, staff management, analytics, and delivery. One ecosystem, four powerful apps.",
  openGraph: {
    title: "HaBuk — The Complete Restaurant Ecosystem",
    description:
      "The app your customers love, the tools your team needs.",
    siteName: "HaBuk",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
