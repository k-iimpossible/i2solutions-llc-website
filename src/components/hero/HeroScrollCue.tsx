"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ease, heroDelay, ms } from "@/lib/motion/variants";

type HeroScrollCueProps = {
  href: string;
  label?: string;
  /** Default aligns start on large screens for left-column heroes; use center for full-width hero backgrounds */
  align?: "center" | "start";
};

export function HeroScrollCue({ href, label = "Explore", align = "start" }: HeroScrollCueProps) {
  const reduce = useReducedMotion();
  const alignClass = align === "center" ? "items-center" : "items-center lg:items-start";

  return (
    <motion.div
      className={`mt-14 flex flex-col gap-2 ${alignClass}`}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : heroDelay.cta + 0.15, duration: ms.scroll, ease: ease.out }}
    >
      <Link
        href={href}
        className={`group flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ease-in-out ${
          align === "center"
            ? "items-center text-slate-400 hover:text-cyan-300"
            : "items-center text-muted hover:text-primary lg:items-start"
        }`}
      >
        <span>{label}</span>
        <motion.span
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-foreground/80 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40"
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 6, 0],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          aria-hidden
        >
          <svg
            className="h-5 w-5 transition duration-200 ease-in-out group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.span>
      </Link>
    </motion.div>
  );
}
