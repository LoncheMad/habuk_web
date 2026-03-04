"use client";

import { useTranslations } from "next-intl";

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        background: "#01191a",
        overflow: "hidden",
        padding: "14px 0",
        borderTop: "1px solid #ffffff08",
        borderBottom: "1px solid #ffffff08",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} 32s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                color: "#fffeee",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0 22px",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "#f40024",
                fontSize: 7,
                lineHeight: 1,
              }}
            >
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
