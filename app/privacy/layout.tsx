import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — HaBuk",
  description:
    "Learn how HaBuk collects, uses, and protects your personal data across all apps in the HaBuk ecosystem.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
