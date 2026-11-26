"use client";

import { useState } from "react";
import Buki from "./Buki";

/** The frame of buki-bite where his mouth shuts on the card's corner. */
const CONTACT = 63;

/**
 * The hero's bite card. It starts whole, with Buki peeking over its top edge near the corner, hands
 * on the edge, looking at you. He glances at the corner, bites it (the bite is cut into the card on
 * the frame his mouth shuts), grabs the bitten rim, chews, and looks back at you.
 */
export default function BiteCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [bitten, setBitten] = useState(false);

  return (
    <div className="relative" style={{ ["--bite-r" as string]: "clamp(96px, 15vw, 190px)" }}>
      <div className={`bite-card ${bitten ? "bitten" : ""} relative overflow-hidden rounded-card ${className}`} style={style}>
        {children}
      </div>
      <Buki
        mood="bite"
        once
        delay={0.3}
        label="Buki"
        onFrame={(f) => { if (f >= CONTACT && !bitten) setBitten(true); }}
        className="pointer-events-none absolute"
        style={{
          // 529 × 632 frame mapped onto the bite circle (r = 294 frame px): left = card right − 1.6r,
          // top = card top − 0.85r, so his mouth lands on the bite and his hands on the edge and the rim
          width: "calc(var(--bite-r) * 1.8)",
          height: "calc(var(--bite-r) * 2.15)",
          top: "calc(var(--bite-r) * -0.85)",
          right: "calc(var(--bite-r) * -0.2)",
        }}
      />
    </div>
  );
}
