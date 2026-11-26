"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, stagger, useAnimate, useInView, useReducedMotion } from "framer-motion";
import { FOUNDERS, FOUNDER_PLACES } from "./founders";

const places = Array.from({ length: FOUNDER_PLACES }, (_, i) => FOUNDERS[i] as (typeof FOUNDERS)[number] | undefined);
const seat = "grid h-10 w-10 place-items-center rounded-full bg-white font-display text-[13px] font-extrabold md:h-14 md:w-14 md:text-[15px]";

/** Seconds between two waves: never regular, so it reads as alive, not as a loop. */
const pause = () => 3.5 + Math.random() * 5;

/**
 * The ten founding places overlapping, first on top: the restaurants' logos, then the next free
 * place lit and standing on its own, then the empty ones. When the stack scrolls into view they
 * come in as a wave: each one springs up out of nothing, overshoots and settles, a beat after the
 * one before it. After that a smaller wave runs through the stack every few seconds while it is on screen.
 *
 * Motion owns each place's entrance and the waves; the lift under the pointer is plain CSS on the
 * element inside it, so the two never fight over the same transform.
 */
export default function LogoStack() {
  const [scope, animate] = useAnimate<HTMLUListElement>();
  const entered = useInView(scope, { once: true, amount: 0.8 });
  const inView = useInView(scope, { amount: 0.8 });
  const reduced = useReducedMotion();
  const [landed, setLanded] = useState(false);
  const hovered = useRef(false);

  useEffect(() => {
    if (!landed || !inView || reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    const wave = () => {
      if (!hovered.current) {
        animate(
          "li",
          { y: [0, -12, 0], scale: [1, 1.12, 1] },
          { duration: 0.55, ease: "easeInOut", delay: stagger(0.07) },
        );
      }
      timer = setTimeout(wave, pause() * 1000);
    };
    timer = setTimeout(wave, pause() * 1000);
    return () => clearTimeout(timer);
  }, [landed, inView, reduced, animate]);

  return (
    <MotionConfig reducedMotion="user">
      <ul
        ref={scope}
        className="flex shrink-0 pl-3.5 md:pl-3"
        onPointerEnter={() => { hovered.current = true; }}
        onPointerLeave={() => { hovered.current = false; }}
      >
        {places.map((founder, i) => {
          // the next free place stands on its own: a gap on both sides instead of the overlap
          const apart = i === FOUNDERS.length || i === FOUNDERS.length + 1;
          return (
            <motion.li
              key={i}
              className={`relative z-[var(--z)] shrink-0 hover:z-20 ${apart ? "ml-1.5 md:ml-2.5" : "-ml-3.5 md:-ml-3"}`}
              style={{ ["--z" as string]: FOUNDER_PLACES - i }}
              initial={{ scale: 0, y: 22 }}
              animate={entered ? { scale: 1, y: 0 } : undefined}
              transition={{ type: "spring", stiffness: 380, damping: 13, mass: 0.9, delay: 0.15 + i * 0.07 }}
              onAnimationComplete={i === FOUNDER_PLACES - 1 ? () => setLanded(true) : undefined}
            >
              <span className="block transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-110">
                {founder ? (
                  <img
                    src={founder.logo}
                    alt={founder.name}
                    title={founder.name}
                    width={192}
                    height={192}
                    className={`${seat} object-cover`}
                    style={{ boxShadow: "0 0 0 3px #fff" }}
                  />
                ) : i === FOUNDERS.length ? (
                  <span className={`${seat} text-white`} style={{ background: "var(--slice-client)", boxShadow: "0 0 0 3px #fff" }}>
                    {i + 1}
                  </span>
                ) : (
                  <span className={`${seat} border-2 border-dashed border-line text-ink-soft/50`}>{i + 1}</span>
                )}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </MotionConfig>
  );
}
