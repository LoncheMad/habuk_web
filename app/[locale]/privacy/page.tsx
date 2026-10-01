"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

function useWebViewAndLocale() {
  const [isWebView, setIsWebView] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "al";

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("wv") === "1") {
      setIsWebView(true);
      return;
    }
    const ua = navigator.userAgent;
    const androidWV = /Android/.test(ua) && /Version\/\d+\.\d+.*Chrome\/\d+/.test(ua);
    const iosWV = /iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua) && /AppleWebKit/.test(ua);
    setIsWebView(androidWV || iosWV);
  }, []);

  return { isWebView, locale };
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const tc = useTranslations("common");
  const { isWebView, locale } = useWebViewAndLocale();

  return (
    <main style={{ minHeight: "100vh", background: "#fff4ea", color: "#1f1a17", fontFamily: "var(--nunito-sans), system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #eadfd5", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 860, margin: "0 auto" }}>
        <a href={`/${locale}`}>
          <Image src="/brand/lockup-horizontal-duo.svg" alt="HaBuk" width={440} height={70} style={{ height: 22, width: "auto" }} />
        </a>
        {!isWebView && (
          <a
            href={`/${locale}`}
            style={{ fontSize: 13, color: "#5c524b", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1f1a17")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#5c524b")}
          >
            {tc("back")}
          </a>
        )}
      </header>

      {/* Content */}
      <article style={{ maxWidth: 700, margin: "0 auto", padding: "72px 24px 96px" }}>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.02em" }}>
          {t("headline")}
        </h1>
        <p style={{ fontSize: 14, color: "#5c524b", marginBottom: 52 }}>{t("lastUpdated")}</p>

        <div style={{ fontSize: 16, lineHeight: 1.7, color: "#5c524b" }}>
          <style>{`
            .privacy-body p { margin-bottom: 16px; }
            .privacy-body ul { padding-left: 20px; margin-bottom: 16px; }
            .privacy-body li { margin-bottom: 6px; }
            .privacy-body strong { color: #1f1a17; font-weight: 600; }
            .privacy-body h2 { font-size: 20px; font-weight: 800; color: #1f1a17; margin-top: 40px; margin-bottom: 12px; }
          `}</style>
          <div className="privacy-body">
            <p>This Privacy Policy explains how HaBuk (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you use any of our apps: HaBuk (customer), HaBuk Staff, HaBuk Manager, or HaBuk Delivery (collectively, the &quot;Apps&quot;).</p>

            <h2>1. Information We Collect</h2>
            <p>We collect information in the following ways:</p>
            <ul>
              <li><strong>Account information:</strong> Name, email address, and phone number when you register.</li>
              <li><strong>Order data:</strong> Items ordered, quantities, prices, timestamps, and delivery addresses.</li>
              <li><strong>Location data:</strong> Approximate or precise location when using delivery features, only with your permission.</li>
              <li><strong>Device information:</strong> Device model, operating system version, and app version for diagnostics and crash reporting.</li>
              <li><strong>Usage data:</strong> Screens visited, features used, and interactions within the app to help us improve performance.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Process and fulfil orders placed through the app.</li>
              <li>Send order status notifications and receipts.</li>
              <li>Enable delivery tracking between customers, restaurants, and drivers.</li>
              <li>Provide restaurant managers with aggregated analytics about their business.</li>
              <li>Debug crashes and improve app stability.</li>
              <li>Respond to support requests.</li>
            </ul>
            <p>We do not use your data for advertising or sell it to third parties.</p>

            <h2>3. How We Share Your Information</h2>
            <p>We do not sell or rent your personal information. We may share data with:</p>
            <ul>
              <li><strong>Restaurants:</strong> Your name, order details, and delivery address are shared with the restaurant and delivery driver fulfilling your order.</li>
              <li><strong>Service providers:</strong> We use third-party services for cloud hosting, push notifications, and crash analytics. These providers are contractually bound to protect your data.</li>
              <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect the rights and safety of our users.</li>
            </ul>

            <h2>4. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. Order history is retained for up to 3 years for accounting and dispute resolution purposes. You may request deletion of your account and associated personal data at any time by contacting us.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Withdraw consent for location access at any time through your device settings.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:habukapp@gmail.com" style={{ color: "#f4501f", textDecoration: "none" }}>habukapp@gmail.com</a>.</p>

            <h2>6. Security</h2>
            <p>All data is encrypted in transit using TLS. We apply industry-standard security practices to protect data stored on our servers. While no system is completely secure, we take reasonable steps to protect your information against unauthorised access or disclosure.</p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>The HaBuk apps are not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. Continued use of the Apps after changes constitutes acceptance of the updated policy.</p>

            <h2>9. Contact</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:habukapp@gmail.com" style={{ color: "#f4501f", textDecoration: "none" }}>habukapp@gmail.com</a></li>
              <li><strong>Phone:</strong> +389 70 972 983</li>
            </ul>
          </div>
        </div>
      </article>

      <footer style={{ borderTop: "1px solid #eadfd5", padding: "24px", textAlign: "center", fontSize: 12, color: "#5c524b", maxWidth: 860, margin: "0 auto" }}>
        © {new Date().getFullYear()} HaBuk. All rights reserved. ·{" "}
        <a href={`/${locale}/about`} style={{ color: "#5c524b", textDecoration: "none" }}>About</a> ·{" "}
        <a href={`/${locale}/support`} style={{ color: "#5c524b", textDecoration: "none" }}>Support</a>
      </footer>
    </main>
  );
}
