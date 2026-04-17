"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, ms } from "@/lib/motion/variants";

type HeroHeadlineProps = {
  text: string;
  /** Words from this index (0-based) use the gradient accent */
  gradientFromIndex?: number;
  id?: string;
  /** Line up with hero column alignment */
  align?: "center" | "left";
};

export function HeroHeadline({ text, gradientFromIndex = 3, id = "hero-heading", align = "center" }: HeroHeadlineProps) {
  const reduce = useReducedMotion();
  const words = text.trim().split(/\s+/);

  const alignClass = align === "left" ? "text-center lg:text-left" : "text-center";

  if (reduce) {
    return (
      <h1
        id={id}
        className={`text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl xl:leading-[1.02] ${alignClass}`}
      >
        {text}
      </h1>
    );
  }

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ms.heroWord, ease: ease.out },
    },
  };

  const flexJustify = align === "left" ? "justify-center lg:justify-start" : "justify-center";

  return (
    <h1
      id={id}
      className={`text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl xl:leading-[1.02] ${alignClass}`}
    >
      <motion.span
        className={`inline-flex flex-wrap gap-x-2 gap-y-1.5 sm:gap-x-2.5 ${flexJustify}`}
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {words.map((word, i) => {
          const isAccent = i >= gradientFromIndex;
          return (
            <motion.span key={`${word}-${i}`} variants={child} className={`inline-block ${isAccent ? heroGradientText : ""}`}>
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </h1>
  );
}

const heroGradientText =
  "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-300";
