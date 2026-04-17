"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cardHover } from "@/lib/motion/variants";

export type TestimonialData = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  imageUrl: string;
  /** Short context, e.g. engagement type */
  projectLabel?: string;
};

function StarRating({ value, id }: { value: number; id: string }) {
  const clamped = Math.min(5, Math.max(0, value));
  const filled = Math.round(clamped);

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${clamped} out of 5 stars`} id={id}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < filled ? "text-amber-400" : "text-muted/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-sm font-semibold tabular-nums text-foreground/90">{clamped.toFixed(1)}</span>
    </div>
  );
}

export function TestimonialCard(props: TestimonialData & { featured?: boolean; className?: string }) {
  const { quote, name, role, company, rating, imageUrl, projectLabel, featured = false, className = "" } = props;
  const reduce = useReducedMotion();
  const ratingId = `rating-${name.replace(/\s/g, "-")}`;

  return (
    <motion.article
      initial={false}
      whileHover={reduce ? undefined : cardHover}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/95 p-0 shadow-lg shadow-black/[0.04] backdrop-blur-md transition-[box-shadow,border-color] duration-200 ease-in-out hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10 dark:bg-surface/90 dark:shadow-black/30 ${featured ? "ring-1 ring-violet-500/15 lg:flex-row" : ""} ${className}`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-500/10 blur-3xl transition-opacity duration-200 ease-in-out group-hover:opacity-100 dark:from-violet-500/25" />

      <div
        className={`relative border-b border-border/50 bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.04] dark:to-transparent ${featured ? "lg:w-[280px] lg:shrink-0 lg:border-b-0 lg:border-r" : ""} px-6 pb-5 pt-6`}
      >
        <div className={`flex items-start justify-between gap-4 ${featured ? "lg:flex-col lg:items-center lg:text-center" : ""}`}>
          <div className="relative">
            <div
              className={`relative overflow-hidden rounded-full ring-2 ring-violet-400/50 ring-offset-2 ring-offset-background dark:ring-violet-500/55 dark:ring-offset-slate-950 ${featured ? "h-20 w-20" : "h-14 w-14"}`}
            >
              <Image
                src={imageUrl}
                alt={`Portrait of ${name}`}
                width={featured ? 80 : 56}
                height={featured ? 80 : 56}
                className="h-full w-full object-cover"
                sizes={featured ? "80px" : "56px"}
              />
            </div>
            <span
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-2 ring-surface dark:ring-slate-900"
              title="Verified client"
              aria-hidden
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <StarRating value={rating} id={ratingId} />
        </div>

        <div className={`mt-4 ${featured ? "lg:mt-6" : ""}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Client review</p>
          {projectLabel && (
            <p className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary/20">
              {projectLabel}
            </p>
          )}
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col px-6 pb-6 pt-5 ${featured ? "lg:justify-center lg:py-8" : ""}`}>
        <blockquote className="relative">
          <span
            className="absolute -left-1 -top-2 font-serif text-5xl leading-none text-primary/20 dark:text-violet-400/30"
            aria-hidden
          >
            &ldquo;
          </span>
          <p
            className={`relative z-[1] pl-4 leading-relaxed text-foreground/95 ${featured ? "text-lg sm:text-xl" : "text-[15px]"}`}
          >
            {quote}
          </p>
        </blockquote>

        <div className={`mt-6 flex flex-1 flex-col justify-end border-t border-border/40 pt-5 ${featured ? "lg:mt-8 lg:border-t-0 lg:pt-0" : ""}`}>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted">
            {role} · {company}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
