"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardHover } from "@/lib/motion/variants";

type CaseStudyCardProps = {
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  result: string;
  /** Wider card with UI mock strip — one focal proof per section */
  featured?: boolean;
  className?: string;
};

function CaseStudyMockStrip() {
  return (
    <div
      className="relative h-36 overflow-hidden rounded-t-2xl border-b border-border/50 bg-gradient-to-br from-slate-100/90 via-white to-violet-50/80 dark:from-slate-900 dark:via-slate-950 dark:to-violet-950/40"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      <div className="absolute left-4 right-4 top-4 flex gap-2">
        <div className="h-2 w-20 rounded-full bg-violet-500/40" />
        <div className="h-2 w-10 rounded-full bg-muted/40" />
      </div>
      <div className="absolute bottom-3 left-4 right-4 flex gap-3">
        <div className="h-16 flex-1 rounded-xl border border-violet-500/20 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <div className="m-2 h-1.5 w-1/3 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="mx-2 mt-3 h-6 rounded-lg bg-gradient-to-r from-violet-500/30 to-cyan-500/20" />
        </div>
        <div className="h-16 w-24 rounded-xl border border-cyan-500/25 bg-cyan-500/10 dark:bg-cyan-500/15" />
      </div>
    </div>
  );
}

export function CaseStudyCard({
  title,
  problem,
  solution,
  tech,
  result,
  featured = false,
  className = "",
}: CaseStudyCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={false}
      whileHover={reduce ? undefined : cardHover}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface/95 shadow-md backdrop-blur-sm transition-[box-shadow,border-color] duration-200 ease-in-out hover:border-primary/35 hover:shadow-xl hover:shadow-violet-500/10 dark:bg-surface/90 ${featured ? "ring-1 ring-violet-500/10" : "p-6"} ${className}`}
    >
      {featured && <CaseStudyMockStrip />}
      <div className={`relative ${featured ? "p-6 pt-5 sm:p-8" : ""}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 transition duration-200 ease-in-out group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl transition duration-200 ease-in-out group-hover:bg-violet-500/15" />

      <h3 className={`relative font-semibold text-foreground transition group-hover:text-primary ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}>{title}</h3>
      <dl className="relative mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-medium text-muted">Problem</dt>
          <dd className="mt-1 text-foreground/90">{problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-muted">Solution</dt>
          <dd className="mt-1 text-foreground/90">{solution}</dd>
        </div>
        <div>
          <dt className="font-medium text-muted">Tech stack</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-xs font-medium text-foreground/90 transition group-hover:border-primary/25"
              >
                {t}
              </span>
            ))}
          </dd>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 dark:bg-emerald-500/10">
          <dt className="font-medium text-emerald-600 dark:text-emerald-400">Result</dt>
          <dd className={`mt-1 font-semibold text-foreground ${featured ? "text-base sm:text-lg" : ""}`}>{result}</dd>
        </div>
      </dl>
      </div>
    </motion.article>
  );
}
