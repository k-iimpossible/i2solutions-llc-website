"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TestimonialData } from "@/components/TestimonialCard";
import { TestimonialCard } from "@/components/TestimonialCard";

const AUTO_MS = 3000;

/** Smooth, slightly organic motion for 3D shell */
const flowSpring = (reduce: boolean) =>
  reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 72, damping: 28, mass: 0.85 };

/** Crossfade between testimonial content */
const contentSpring = (reduce: boolean) =>
  reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 140, damping: 32, mass: 0.65 };

type TestimonialsCarouselProps = {
  testimonials: TestimonialData[];
  label?: string;
};

export function TestimonialsCarousel({
  testimonials,
  label = "Client testimonials",
}: TestimonialsCarouselProps) {
  const reduce = useReducedMotion();
  const id = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const len = testimonials.length;
  const prevIdx = (index - 1 + len) % len;
  const nextIdx = (index + 1) % len;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len],
  );

  useEffect(() => {
    if (paused || len <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [paused, len]);

  const touchStartX = useRef<number | null>(null);

  const spring3d = flowSpring(!!reduce);
  const springContent = contentSpring(!!reduce);

  if (len === 0) return null;

  return (
    <div
      ref={regionRef}
      tabIndex={0}
      className="relative mx-auto mt-14 max-w-7xl px-2 outline-none sm:mt-16 sm:px-4"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null) return;
        const end = e.changedTouches[0]?.clientX;
        if (end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 56) return;
        go(delta < 0 ? 1 : -1);
      }}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/15 opacity-80 blur-sm dark:opacity-100" aria-hidden />

      <p id={`${id}-hint`} className="sr-only">
        Testimonials carousel. Auto-advances; pauses on hover. Use arrow keys when focused.
      </p>

      {/* Workflow strip — linear cycle + shimmer (feels like a running pipeline) */}
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-6 md:pt-8">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/50 dark:bg-slate-800/90">
          <motion.div
            key={index}
            className="h-full origin-left rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_14px_rgba(124,58,237,0.4)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
          />
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-[28%] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              aria-hidden
              animate={{ x: ["-40%", "420%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      </div>

        {/* 3D cover-flow — md+ */}
        <div
          className="relative hidden overflow-visible px-2 py-8 sm:px-4 sm:py-10 md:block md:px-5"
          style={{
            perspective: reduce ? "2000px" : "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="mx-auto flex min-h-[260px] max-w-7xl items-center justify-center gap-0.5 [transform-style:preserve-3d] sm:gap-1 lg:gap-2"
            aria-live="polite"
          >
            {len > 1 && (
              <motion.button
                type="button"
                aria-label={`Previous: ${testimonials[prevIdx]!.name}`}
                onClick={() => go(-1)}
                className="relative z-[2] w-[31%] min-w-0 shrink-0 cursor-pointer border-0 bg-transparent p-0 text-left [transform-style:preserve-3d]"
                style={{ transformOrigin: "right center" }}
                initial={false}
                animate={
                  reduce
                    ? { rotateY: 0, scale: 0.94, x: 0, z: 0, opacity: 0.88 }
                    : {
                        rotateY: 48,
                        scale: 0.82,
                        x: 12,
                        z: -120,
                        opacity: 0.88,
                        transformPerspective: 1200,
                      }
                }
                transition={spring3d}
                whileHover={reduce ? undefined : { scale: 0.86, opacity: 0.95 }}
                whileTap={reduce ? undefined : { scale: 0.8 }}
              >
                <div className="max-h-[260px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 dark:ring-white/10">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={prevIdx}
                      initial={reduce ? false : { opacity: 0, filter: "blur(8px)", scale: 0.96 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, filter: "blur(6px)", scale: 0.96 }}
                      transition={springContent}
                    >
                      <TestimonialCard
                        {...testimonials[prevIdx]!}
                        featured={false}
                        className="border-0 bg-surface/95 shadow-none dark:bg-slate-900/95 [&_blockquote_p]:line-clamp-3 [&_.mt-6]:mt-3 [&_.mt-6]:border-t-0 [&_.mt-6]:pt-2 [&_.pb-6]:pb-4 [&_.pt-5]:pt-3"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.button>
            )}

            <motion.div
              className={
                len === 1
                  ? "relative z-[12] mx-auto w-full max-w-3xl shrink-0 [transform-style:preserve-3d]"
                  : "relative z-[12] w-[38%] min-w-[min(100%,320px)] max-w-2xl shrink-0 [transform-style:preserve-3d]"
              }
              initial={reduce ? false : { opacity: 0.94, scale: 0.97 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1, rotateY: 0, z: 0 }
                  : {
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      z: 80,
                      transformPerspective: 1200,
                    }
              }
              transition={spring3d}
            >
              <div className="max-h-[260px] overflow-hidden rounded-2xl shadow-[0_40px_80px_-32px_rgba(124,58,237,0.45)] ring-1 ring-violet-500/30 dark:shadow-[0_40px_80px_-32px_rgba(0,0,0,0.65)] dark:ring-violet-500/25">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, y: -10, filter: "blur(8px)" }}
                    transition={springContent}
                  >
                    <TestimonialCard
                      {...testimonials[index]!}
                      featured={false}
                      className="border-0 bg-surface/98 shadow-none dark:bg-slate-950/95 [&_blockquote_p]:line-clamp-3 [&_.mt-6]:mt-3 [&_.mt-6]:border-t-0 [&_.mt-6]:pt-2 [&_.pb-6]:pb-4 [&_.pt-5]:pt-3"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {len > 1 && (
              <motion.button
                type="button"
                aria-label={`Next: ${testimonials[nextIdx]!.name}`}
                onClick={() => go(1)}
                className="relative z-[2] w-[31%] min-w-0 shrink-0 cursor-pointer border-0 bg-transparent p-0 text-left [transform-style:preserve-3d]"
                style={{ transformOrigin: "left center" }}
                initial={false}
                animate={
                  reduce
                    ? { rotateY: 0, scale: 0.94, x: 0, z: 0, opacity: 0.88 }
                    : {
                        rotateY: -48,
                        scale: 0.82,
                        x: -12,
                        z: -120,
                        opacity: 0.88,
                        transformPerspective: 1200,
                      }
                }
                transition={spring3d}
                whileHover={reduce ? undefined : { scale: 0.86, opacity: 0.95 }}
                whileTap={reduce ? undefined : { scale: 0.8 }}
              >
                <div className="max-h-[260px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 dark:ring-white/10">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={nextIdx}
                      initial={reduce ? false : { opacity: 0, filter: "blur(8px)", scale: 0.96 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, filter: "blur(6px)", scale: 0.96 }}
                      transition={springContent}
                    >
                      <TestimonialCard
                        {...testimonials[nextIdx]!}
                        featured={false}
                        className="border-0 bg-surface/95 shadow-none dark:bg-slate-900/95 [&_blockquote_p]:line-clamp-3 [&_.mt-6]:mt-3 [&_.mt-6]:border-t-0 [&_.mt-6]:pt-2 [&_.pb-6]:pb-4 [&_.pt-5]:pt-3"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.button>
            )}
          </div>
        </div>

        {/* Single column — mobile */}
        <div className="px-4 py-8 md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={springContent}
            >
              <TestimonialCard
                {...testimonials[index]!}
                featured={false}
                className="border-0 bg-transparent shadow-none dark:bg-transparent"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <button
            type="button"
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-primary/40 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 dark:bg-slate-900/80"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
          >
            <svg className="h-5 w-5 transition group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="flex flex-1 flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label="Testimonial slides"
            aria-describedby={`${id}-hint`}
          >
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`${t.name} at ${t.company}, slide ${i + 1} of ${len}`}
                aria-current={i === index ? true : undefined}
                className={`relative h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  i === index ? "w-10 bg-gradient-to-r from-violet-500 to-cyan-500" : "w-2 bg-muted-foreground/25 hover:bg-muted-foreground/45"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-[background-color,border-color,transform] hover:border-primary/40 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 dark:bg-slate-900/80"
            aria-label="Next testimonial"
            onClick={() => go(1)}
          >
            <svg className="h-5 w-5 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
  );
}
