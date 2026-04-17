"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cardHover } from "@/lib/motion/variants";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={false}
      whileHover={reduce ? undefined : cardHover}
      className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-md backdrop-blur-sm transition-[box-shadow,border-color] duration-200 ease-in-out hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 dark:bg-surface/90"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/15 to-transparent opacity-40 blur-2xl transition duration-200 ease-in-out group-hover:opacity-80" />
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 text-primary shadow-inner transition duration-200 ease-in-out group-hover:opacity-90 group-hover:shadow-lg"
        aria-hidden
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground transition duration-200 ease-in-out group-hover:text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <span
        className="mt-4 inline-flex items-center text-xs font-semibold text-primary opacity-0 transition duration-200 ease-in-out group-hover:opacity-100"
        aria-hidden
      >
        Learn more
        <svg className="ml-1 h-3.5 w-3.5 transition duration-200 ease-in-out group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </motion.article>
  );
}
