import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — HaBuk",
  description:
    "HaBuk is a complete restaurant ecosystem built in North Macedonia — four apps, one platform, for operators who want everything working together.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
