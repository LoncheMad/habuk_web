"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type NodeId = "client" | "staff" | "delivery" | "manager";

// Structural data only — no text
const NODES = [
  { id: "client"   as NodeId, x: 350, y: 80,  accent: true  },
  { id: "staff"    as NodeId, x: 90,  y: 270, accent: false },
  { id: "delivery" as NodeId, x: 610, y: 270, accent: false },
  { id: "manager"  as NodeId, x: 350, y: 450, accent: false },
];

const CONNECTIONS = [
  { id: "cs", from: "client"   as NodeId, to: "staff"    as NodeId, x1: 350, y1: 80,  x2: 90,  y2: 270, bidir: true,  dur: "2.4s", begin: "0s"   },
  { id: "cd", from: "client"   as NodeId, to: "delivery" as NodeId, x1: 350, y1: 80,  x2: 610, y2: 270, bidir: true,  dur: "2.8s", begin: "0.7s" },
  { id: "sd", from: "staff"    as NodeId, to: "delivery" as NodeId, x1: 90,  y1: 270, x2: 610, y2: 270, bidir: false, dur: "3s",   begin: "1.3s" },
  { id: "sm", from: "staff"    as NodeId, to: "manager"  as NodeId, x1: 90,  y1: 270, x2: 350, y2: 450, bidir: false, dur: "2.2s", begin: "0.3s" },
  { id: "dm", from: "delivery" as NodeId, to: "manager"  as NodeId, x1: 610, y1: 270, x2: 350, y2: 450, bidir: false, dur: "2.6s", begin: "1.8s" },
];

const NODE_CONNECTIONS: Record<NodeId, string[]> = {
  client:   ["cs", "cd"],
  staff:    ["cs", "sd", "sm"],
  delivery: ["cd", "sd", "dm"],
  manager:  ["sm", "dm"],
};

// Mobile flow order — structural only
const MOBILE_NODE_IDS: { id: NodeId; accent: boolean; bidir: boolean; last: boolean }[] = [
  { id: "client",   accent: true,  bidir: true,  last: false },
  { id: "staff",    accent: false, bidir: false, last: false },
  { id: "delivery", accent: false, bidir: false, last: false },
  { id: "manager",  accent: false, bidir: false, last: true  },
];

export default function SystemFlow() {
  const t = useTranslations("systemFlow");
  const legend = t.raw("legend") as { from: string; to: string; desc: string }[];
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isConnActive = (connId: string) =>
    !hovered || NODE_CONNECTIONS[hovered].includes(connId);

  return (
    <section style={{ background: "#01191a", padding: "88px 0 80px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{
            display: "block", marginBottom: "0.9rem",
            color: "#f40024", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
          }}>
            {t("badge")}
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900,
            lineHeight: 0.95, letterSpacing: "-0.025em",
            color: "#fffeee", marginBottom: "1rem",
          }}>
            {t("headline")}
          </h2>
          <p style={{
            color: "#fffeee60", fontSize: 15, lineHeight: 1.75,
            maxWidth: 460, margin: "0 auto",
          }}>
            {t("subtext")}
            {!isMobile && ` ${t("hoverHint")}`}
          </p>
        </motion.div>

        {/* ── DESKTOP DIAGRAM ── */}
        {!isMobile && <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{ position: "relative", width: "100%", paddingBottom: "71.4%" }}
        >
          <svg
            viewBox="0 0 700 500"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            preserveAspectRatio="xMidYMid meet"
          >
            {CONNECTIONS.map(({ id, x1, y1, x2, y2 }) => (
              <path key={id} id={`p-${id}`} d={`M${x1},${y1} L${x2},${y2}`} fill="none" stroke="none" />
            ))}

            {CONNECTIONS.map(({ id, x1, y1, x2, y2 }) => (
              <line
                key={`line-${id}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isConnActive(id) ? "#ffffff22" : "#ffffff06"}
                strokeWidth={isConnActive(id) ? 1.5 : 1}
                strokeDasharray="5 4"
                style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
              />
            ))}

            {CONNECTIONS.map(({ id, dur, begin }) => (
              <circle key={`dot-fwd-${id}`} r="4" fill="#f40024" opacity={isConnActive(id) ? 0.95 : 0.15}>
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite" calcMode="linear">
                  <mpath href={`#p-${id}`} />
                </animateMotion>
              </circle>
            ))}

            {CONNECTIONS.filter(c => c.bidir).map(({ id, dur, begin }) => {
              const offsetBegin = parseFloat(begin) + parseFloat(dur) * 0.5;
              return (
                <circle key={`dot-rev-${id}`} r="3" fill="#fffeee" opacity={isConnActive(id) ? 0.6 : 0.1}>
                  <animateMotion
                    dur={dur}
                    begin={`${offsetBegin}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyTimes="0;1"
                    keyPoints="1;0"
                  >
                    <mpath href={`#p-${id}`} />
                  </animateMotion>
                </circle>
              );
            })}

            {CONNECTIONS.map(({ id, x1, y1, x2, y2 }) => {
              const label = t(`connections.${id}`);
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const labelW = label.length * 5.6 + 16;
              return (
                <g key={`lbl-${id}`} style={{ opacity: isConnActive(id) ? 1 : 0.15, transition: "opacity 0.25s" }}>
                  <rect x={mx - labelW / 2} y={my - 9} width={labelW} height={18} rx={9} fill="#01191a" />
                  <rect x={mx - labelW / 2} y={my - 9} width={labelW} height={18} rx={9} fill="none" stroke="#ffffff12" strokeWidth={1} />
                  <text x={mx} y={my + 4} textAnchor="middle"
                    fill="#fffeee70" fontSize="9" letterSpacing="0.04em"
                    fontFamily="var(--poppins), system-ui, sans-serif" fontWeight="600">
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>

          {NODES.map(({ id, x, y, accent }) => {
            const label = t(`nodes.${id}.label`);
            const sub = t(`nodes.${id}.sub`);
            const active = !hovered || hovered === id;
            return (
              <div
                key={id}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: `${(x / 700) * 100}%`,
                  top: `${(y / 500) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: `${(148 / 700) * 100}%`,
                  minWidth: 100,
                  maxWidth: 160,
                  padding: "11px 13px",
                  borderRadius: 14,
                  background: hovered === id
                    ? (accent ? "#f40024" : "#162e30")
                    : (active ? (accent ? "#f4002420" : "#0d2020") : "#0a1a1a"),
                  border: `1.5px solid ${hovered === id
                    ? (accent ? "#f40024" : "#ffffff30")
                    : (active ? (accent ? "#f4002445" : "#ffffff15") : "#ffffff08")}`,
                  boxShadow: hovered === id
                    ? `0 8px 28px ${accent ? "#f4002455" : "#00000070"}`
                    : "0 2px 12px rgba(0,0,0,0.3)",
                  cursor: "default",
                  transition: "all 0.25s ease",
                  zIndex: 2,
                  userSelect: "none",
                }}
              >
                <div style={{
                  fontSize: 12, fontWeight: 700, lineHeight: 1.2, marginBottom: 3,
                  color: hovered === id ? "#fffeee" : (accent ? "#f40024" : "#fffeee"),
                  transition: "color 0.2s",
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 9.5, fontWeight: 500,
                  color: hovered === id ? "#ffffffaa" : "#ffffff45",
                  transition: "color 0.2s",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {sub}
                </div>
              </div>
            );
          })}
        </motion.div>}

        {/* ── MOBILE FLOW ── */}
        {isMobile && <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
        >
          {MOBILE_NODE_IDS.map((node, i) => (
            <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              {/* Card */}
              <div style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 16,
                background: node.accent ? "#f4002415" : "#0d2020",
                border: `1.5px solid ${node.accent ? "#f4002450" : "#ffffff12"}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: node.accent ? "#f40024" : "#ffffff25",
                  boxShadow: node.accent ? "0 0 12px #f4002470" : "none",
                }} />
                <div>
                  <div style={{
                    fontSize: 15, fontWeight: 700, lineHeight: 1.15, marginBottom: 3,
                    color: node.accent ? "#f40024" : "#fffeee",
                  }}>
                    {t(`nodes.${node.id}.label`)}
                  </div>
                  <div style={{
                    fontSize: 10.5, fontWeight: 500, color: "#ffffff40",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    {t(`nodes.${node.id}.sub`)}
                  </div>
                </div>
              </div>

              {/* Connector — no label, just animated line */}
              {!node.last && (
                <svg width="24" height="40" viewBox="0 0 24 40" style={{ overflow: "visible", display: "block", margin: "2px 0" }}>
                  <path id={`mp-${i}`} d="M12,0 L12,40" fill="none" stroke="none" />
                  <line x1="12" y1="0" x2="12" y2="40" stroke="#ffffff18" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle r="3.5" fill="#f40024">
                    <animateMotion dur="1.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" calcMode="linear">
                      <mpath href={`#mp-${i}`} />
                    </animateMotion>
                    <animate attributeName="opacity"
                      values="0;0.9;0.9;0" keyTimes="0;0.08;0.88;1"
                      dur="1.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  {node.bidir && (
                    <circle r="2.5" fill="#fffeee">
                      <animateMotion
                        dur="1.8s" begin={`${i * 0.4 + 0.9}s`}
                        repeatCount="indefinite" calcMode="linear"
                        keyTimes="0;1" keyPoints="1;0"
                      >
                        <mpath href={`#mp-${i}`} />
                      </animateMotion>
                      <animate attributeName="opacity"
                        values="0;0.5;0.5;0" keyTimes="0;0.08;0.88;1"
                        dur="1.8s" begin={`${i * 0.4 + 0.9}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                </svg>
              )}
            </div>
          ))}
        </motion.div>}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            marginTop: "3rem",
            background: "#ffffff08",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #ffffff08",
          }}
        >
          {legend.map(({ from, to, desc }, i) => (
            <div key={i} style={{ padding: "20px 22px", background: "#01191a" }}>
              <div style={{
                fontSize: 11, fontWeight: 700, marginBottom: 8,
                color: "#f40024", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {from} → {to}
              </div>
              <p style={{ fontSize: 12.5, color: "#ffffff55", lineHeight: 1.65, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Modular note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            color: "#ffffff30", fontSize: 13, textAlign: "center",
            marginTop: "2rem", lineHeight: 1.7,
          }}
        >
          {t("modularNote")}
        </motion.p>

      </div>
    </section>
  );
}
