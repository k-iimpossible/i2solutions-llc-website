import type { Transition, Variants } from "framer-motion";

/** Entrances: ease-out. Hover/UI: ease-in-out. No bounce. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
};

export const ms = {
  hover: 0.175,
  ui: 0.25,
  scroll: 0.5,
  /** Hero headline word reveal */
  heroWord: 0.45,
} as const;

export const transition = {
  hover: { duration: ms.hover, ease: ease.inOut } satisfies Transition,
  ui: { duration: ms.ui, ease: ease.inOut } satisfies Transition,
  scroll: { duration: ms.scroll, ease: ease.out } satisfies Transition,
};

/** Primary buttons / icon links — pair with hover:brightness-* in className if needed */
export const buttonMotion = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: transition.hover,
};

/** Ghost / secondary buttons — brightness optional */
export const buttonMotionSubtle = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: transition.hover,
};

/** Scroll-triggered section */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ms.scroll, ease: ease.out },
  },
};

/** Staggered children (100ms) */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ms.scroll, ease: ease.out },
  },
};

/** Card hover lift (-6px) + shadow via class */
export const cardHover = {
  y: -6,
  transition: transition.hover,
};

/** Hero load sequence delays (seconds) */
export const heroDelay = {
  subhead: 0.1,
  cta: 0.2,
  preview: 0.18,
} as const;
