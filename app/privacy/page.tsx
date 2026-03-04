"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function useIsWebView() {
  const [isWebView, setIsWebView] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const android = /wv/.test(ua) || /WebView/.test(ua);
    const ios = /iPhone|iPad|iPod/.test(ua) && /AppleWebKit/.test(ua) && !/Safari/.test(ua);
    setIsWebView(android || ios);
  }, []);
  return isWebView;
}

const LAST_UPDATED = "March 2025";

export default function PrivacyPage() {
  const isWebView = useIsWebView();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#01191a",
        color: "#fffeee",
        fontFamily: "var(--poppins), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #ffffff0e",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        <a href="/al">
          <Image src="/icon.png" alt="HaBuk" width={90} height={32} style={{ height: 30, width: "auto", objectFit: "contain" }} />
        </a>
        {!isWebView && (
          <a
            href="/al"
            style={{ fontSize: 13, color: "#ffffff40", textDecoration: "none", transition: "color 0.18s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fffeee80")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff40")}
          >
            ← Back
          </a>
        )}
      </header>

      {/* Content */}
      <article
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "72px 24px 96px",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 12px",
            borderRadius: 999,
            background: "#f4002415",
            border: "1px solid #f4002430",
            color: "#f40024",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Privacy Policy
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}
        >
          Your privacy matters.
        </h1>
        <p style={{ fontSize: 14, color: "#ffffff40", marginBottom: 52 }}>
          Last updated: {LAST_UPDATED}
        </p>

        <Prose>
          <p>
            This Privacy Policy explains how HaBuk (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your
            information when you use any of our apps — HaBuk (customer), HaBuk Staff, HaBuk Manager,
            or HaBuk Delivery (collectively, the &quot;Apps&quot;).
          </p>

          <H2>1. Information We Collect</H2>
          <p>We collect information in the following ways:</p>
          <ul>
            <li><strong>Account information</strong> — name, email address, and phone number when you register.</li>
            <li><strong>Order data</strong> — items ordered, quantities, prices, timestamps, and delivery addresses.</li>
            <li><strong>Location data</strong> — approximate or precise location when using delivery features, only with your permission.</li>
            <li><strong>Device information</strong> — device model, operating system version, and app version for diagnostics and crash reporting.</li>
            <li><strong>Usage data</strong> — screens visited, features used, and interactions within the app to help us improve performance.</li>
          </ul>

          <H2>2. How We Use Your Information</H2>
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

          <H2>3. How We Share Your Information</H2>
          <p>
            We do not sell or rent your personal information. We may share data with:
          </p>
          <ul>
            <li>
              <strong>Restaurants</strong> — your name, order details, and delivery address are shared with the restaurant
              and delivery driver fulfilling your order.
            </li>
            <li>
              <strong>Service providers</strong> — we use third-party services for cloud hosting, push notifications,
              and crash analytics. These providers are contractually bound to protect your data.
            </li>
            <li>
              <strong>Legal requirements</strong> — we may disclose information if required by law or to protect the rights
              and safety of our users.
            </li>
          </ul>

          <H2>4. Data Retention</H2>
          <p>
            We retain your account data for as long as your account is active. Order history is retained for up to
            3 years for accounting and dispute resolution purposes. You may request deletion of your account
            and associated personal data at any time by contacting us.
          </p>

          <H2>5. Your Rights</H2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Withdraw consent for location access at any time through your device settings.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:habukapp@gmail.com" style={{ color: "#f40024", textDecoration: "none" }}>
              habukapp@gmail.com
            </a>.
          </p>

          <H2>6. Security</H2>
          <p>
            All data is encrypted in transit using TLS. We apply industry-standard security practices to protect
            data stored on our servers. While no system is completely secure, we take reasonable steps to
            protect your information against unauthorised access or disclosure.
          </p>

          <H2>7. Children&apos;s Privacy</H2>
          <p>
            The HaBuk apps are not directed to children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has provided us with personal data,
            please contact us and we will delete it promptly.
          </p>

          <H2>8. Changes to This Policy</H2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &quot;Last updated&quot; date at the top of this page. Continued use of the Apps after changes
            constitutes acceptance of the updated policy.
          </p>

          <H2>9. Contact</H2>
          <p>
            If you have questions about this Privacy Policy or how we handle your data, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:habukapp@gmail.com" style={{ color: "#f40024", textDecoration: "none" }}>
                habukapp@gmail.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> +389 70 972 983
            </li>
          </ul>
        </Prose>
      </article>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #ffffff0e",
          padding: "24px",
          textAlign: "center",
          fontSize: 12,
          color: "#ffffff30",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        © {new Date().getFullYear()} HaBuk. All rights reserved. ·{" "}
        <a href="/about" style={{ color: "#ffffff40", textDecoration: "none" }}>About</a> ·{" "}
        <a href="/support" style={{ color: "#ffffff40", textDecoration: "none" }}>Support</a>
      </footer>
    </main>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 17,
        fontWeight: 700,
        color: "#fffeee",
        marginTop: 40,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 15,
        lineHeight: 1.78,
        color: "#fffeee80",
      }}
    >
      <style>{`
        .prose-habuk p { margin-bottom: 16px; }
        .prose-habuk ul { padding-left: 20px; margin-bottom: 16px; }
        .prose-habuk li { margin-bottom: 6px; }
        .prose-habuk strong { color: #fffeee; font-weight: 600; }
      `}</style>
      <div className="prose-habuk">{children}</div>
    </div>
  );
}
