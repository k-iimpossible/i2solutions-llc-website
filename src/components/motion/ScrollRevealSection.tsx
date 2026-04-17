"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { sectionReveal } from "@/lib/motion/variants";

type ScrollRevealSectionProps = Omit<HTMLMotionProps<"section">, "children"> & {
  children: ReactNode;
};

export function ScrollRevealSection({ children, className, ...rest }: ScrollRevealSectionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: "-72px" }}
      variants={sectionReveal}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
