import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — HaBuk",
  description:
    "Get help with HaBuk, HaBuk Staff, HaBuk Manager, or HaBuk Delivery. Contact our support team or browse common questions.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
