"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { MotionLink } from "@/components/motion/MotionLink";
import { buttonMotion, buttonMotionSubtle, ease, heroDelay, ms } from "@/lib/motion/variants";

const GRADIENT_TEXT =
  "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-300";

const HEADLINE = "From idea to launch.";
const HEADLINE_WORDS = ["From", "idea", "to", "launch."];
const GRADIENT_FROM_WORD = 3;

const PHRASES = [
  {
    key: "clean",
    label: "Clean code",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    key: "fast",
    label: "Fast delivery",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: "results",
    label: "Measurable results",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
] as const;

const TS_SNIPPET = `type ShipOpts = {
  quality: "high";
  timelineWeeks: 6;
};

export const launch = async () => {
  await ship({ ...opts, tested: true });
};`;

const MILESTONES = ["Discovery", "Build", "Launch"] as const;

const METRICS = [
  { label: "Cycle time", value: 40, suffix: "% faster", decimals: 0 },
  { label: "Engagement", value: 3, suffix: "×", decimals: 0 },
  { label: "Operational waste", value: 12, suffix: "% reduction", decimals: 0 },
] as const;

const PANEL_INTERVAL_MS = 4000;
const PARTICLE_COUNT = 26;

type HeroSectionProps = {
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  scrollCueHref?: string;
};

const defaults = {
  description:
    "We ship production-grade web and mobile products—clear scope, tight feedback loops, and outcomes you can measure.",
  primaryCta: { label: "Start Your Project", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "#case-studies" },
  scrollCueHref: "#trust",
};

function useMediaMinMd() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fn = () => setOk(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return ok;
}

function FloatingParticles({ reduced }: { reduced: boolean }) {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 23) % 100}%`,
      size: 2 + (i % 4),
      duration: 18 + (i % 12),
      delay: (i % 8) * 0.4,
      driftX: (i % 5) - 2,
      driftY: ((i + 2) % 5) - 2,
    }));
  }, []);

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-violet-500/15 dark:bg-cyan-400/10"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-violet-400/25 to-cyan-400/15 blur-[0.5px] dark:from-violet-500/20 dark:to-fuchsia-500/10"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.driftX * 28, 0],
            y: [0, p.driftY * 22, 0],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function useTyping(text: string, active: boolean, paused: boolean, reduced: boolean) {
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    if (reduced) {
      setOut(text);
      return;
    }
    if (paused) {
      return;
    }
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [active, paused, text, reduced]);

  return out;
}

function AnimatedMetric({
  value,
  suffix,
  decimals,
  active,
  reduced,
}: {
  value: number;
  suffix: string;
  decimals: number;
  active: boolean;
  reduced: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplay(0);
      return;
    }
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.25,
      ease: ease.out,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [active, value, reduced]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <span className="font-semibold tabular-nums text-foreground">
      {formatted}
      {suffix}
    </span>
  );
}

function HeroCyclingPanel({
  index,
  paused,
  onHover,
  onSelect,
  reduced,
}: {
  index: number;
  paused: boolean;
  onHover: (v: boolean) => void;
  onSelect: (i: number) => void;
  reduced: boolean;
}) {
  const typed = useTyping(TS_SNIPPET, index === 0, paused, reduced);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (index !== 1) {
      setProgress(0);
      return;
    }
    if (reduced) {
      setProgress(100);
      return;
    }
    setProgress(0);
    const controls = animate(0, 100, {
      duration: 2.6,
      ease: ease.out,
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    return () => controls.stop();
  }, [index, reduced]);

  const transition = reduced ? { duration: 0 } : { duration: 0.45, ease: ease.out };

  return (
    <motion.div
      className="relative min-h-[320px] rounded-3xl border border-white/20 bg-white/40 p-6 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45 dark:shadow-[0_28px_90px_-28px_rgba(0,0,0,0.65)] sm:min-h-[360px] sm:p-8"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Spotlight</span>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[0.65rem] font-medium text-emerald-700 dark:text-emerald-300">
          {paused ? "Paused" : "Live"}
        </span>
      </div>

      <div className="relative min-h-[220px] sm:min-h-[240px]">
        <AnimatePresence mode="wait">
          {index === 0 && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
              className="absolute inset-0 flex flex-col"
            >
              <p className="mb-2 text-sm font-medium text-foreground">TypeScript</p>
              <pre className="overflow-x-auto rounded-2xl border border-border/60 bg-slate-950/90 p-4 text-left text-[0.7rem] leading-relaxed text-slate-100 shadow-inner sm:text-xs">
                <code>
                  {typed}
                  <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-cyan-400 align-middle" />
                </code>
              </pre>
            </motion.div>
          )}

          {index === 1 && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
              className="absolute inset-0 flex flex-col"
            >
              <p className="text-sm font-medium text-foreground">Typical MVP timeline</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">6 weeks</p>
              <p className="mt-2 text-sm text-muted">From kickoff to production-ready handoff.</p>
              <div className="mt-8">
                <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/90">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    initial={{ width: reduced ? "100%" : "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: reduced ? 0 : 0.1, ease: "linear" }}
                  />
                </div>
                <div className="mt-4 flex justify-between gap-2 text-[0.65rem] font-medium uppercase tracking-wider text-muted sm:text-xs">
                  {MILESTONES.map((m, i) => (
                    <span
                      key={m}
                      className={progress >= ((i + 1) / MILESTONES.length) * 100 ? "text-primary" : ""}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {index === 2 && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
              className="absolute inset-0 flex flex-col gap-4"
            >
              <p className="text-sm font-medium text-foreground">Client outcomes</p>
              <ul className="flex flex-col gap-4">
                {METRICS.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-baseline justify-between gap-4 rounded-2xl border border-border/50 bg-background/50 px-4 py-3 dark:bg-slate-900/40"
                  >
                    <span className="text-sm text-muted">{m.label}</span>
                    <AnimatedMetric
                      value={m.value}
                      suffix={m.suffix}
                      decimals={m.decimals}
                      active={index === 2}
                      reduced={reduced}
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show panel ${i + 1}`}
            aria-current={i === index ? "step" : undefined}
            onClick={() => onSelect(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function HeroSection({
  description = defaults.description,
  primaryCta = defaults.primaryCta,
  secondaryCta = defaults.secondaryCta,
  scrollCueHref = defaults.scrollCueHref,
}: HeroSectionProps = {}) {
  const reduce = useReducedMotion();
  const reduced = !!reduce;
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlightOn, setSpotlightOn] = useState(false);
  const [panelPaused, setPanelPaused] = useState(false);
  const [panelIndex, setPanelIndex] = useState(0);
  const isDesktop = useMediaMinMd();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 52, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 52, damping: 28 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothX}% ${smoothY}%, rgba(124,58,237,0.14) 0%, rgba(34,211,238,0.06) 40%, transparent 65%)`;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced || !isDesktop) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    }
    function onEnter() {
      setSpotlightOn(true);
    }
    function onLeave() {
      setSpotlightOn(false);
      mouseX.set(0.5);
      mouseY.set(0.4);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, reduced, isDesktop]);

  useEffect(() => {
    if (panelPaused) return;
    const id = window.setInterval(() => {
      setPanelIndex((i) => (i + 1) % 3);
    }, PANEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [panelPaused]);

  const phraseDelays = reduced ? [0, 0, 0] : [0.35, 0.7, 1.05];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[min(92vh,920px)] flex-col justify-center overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-violet-500/[0.04] dark:to-violet-500/[0.07]"
      aria-labelledby="hero-heading"
    >
      <div
        className="hero-grid-bg pointer-events-none absolute inset-0 z-[1] opacity-[0.3] dark:opacity-[0.15]"
        aria-hidden
      />

      <FloatingParticles reduced={reduced} />

      {isDesktop && !reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
          style={{ background: spotlight, opacity: spotlightOn ? 1 : 0 }}
          aria-hidden
        />
      )}

      <div className="relative z-[2] mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
          {/* Left column */}
          <div className="text-center md:text-left">
            <h1
              id="hero-heading"
              className="text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
            >
              <span className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1 md:justify-start">
                {HEADLINE_WORDS.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: ms.heroWord,
                      delay: reduced ? 0 : i * 0.07,
                      ease: ease.out,
                    }}
                    className={`inline-block ${i >= GRADIENT_FROM_WORD ? GRADIENT_TEXT : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <ul className="mt-8 flex flex-col gap-3 sm:gap-3.5 md:items-start">
              {PHRASES.map((p, i) => (
                <motion.li
                  key={p.key}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: ms.scroll,
                    delay: phraseDelays[i],
                    ease: ease.out,
                  }}
                  className="flex w-full items-center justify-center gap-3 md:justify-start"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-surface/80 text-primary shadow-sm dark:bg-slate-900/60">
                    {p.icon}
                  </span>
                  <span className="flex items-center gap-2 text-base font-semibold text-foreground sm:text-lg">
                    {panelIndex === i ? (
                      <span className="relative flex h-2 w-2">
                        {!reduced && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/70 opacity-75" />
                        )}
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500 dark:bg-fuchsia-400" />
                      </span>
                    ) : (
                      <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/35" aria-hidden />
                    )}
                    {p.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ms.scroll, delay: reduced ? 0 : heroDelay.subhead + 0.45, ease: ease.out }}
              className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ms.scroll, delay: reduced ? 0 : heroDelay.cta + 0.45, ease: ease.out }}
              className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-start md:justify-start"
            >
              <MotionLink
                href={primaryCta.href}
                {...(reduced ? {} : buttonMotion)}
                className="group relative inline-flex min-h-[48px] w-full min-w-[220px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-bold text-white shadow-[0_12px_40px_-8px_rgba(124,58,237,0.5)] ring-2 ring-violet-400/25 transition-[filter,box-shadow] duration-200 hover:brightness-110 sm:w-auto"
              >
                <span className="relative flex items-center gap-2">
                  {primaryCta.label}
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </MotionLink>
              <MotionLink
                href={secondaryCta.href}
                {...(reduced ? {} : buttonMotionSubtle)}
                className="inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-full border border-foreground/15 bg-white/30 px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm backdrop-blur-md transition-[border-color,background-color] hover:border-primary/35 hover:bg-white/50 dark:border-white/12 dark:bg-slate-950/40 dark:hover:bg-slate-950/60 sm:w-auto"
              >
                {secondaryCta.label}
              </MotionLink>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.55, duration: ms.scroll }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/70 px-4 py-2 text-sm font-medium text-foreground/90 shadow-sm backdrop-blur-sm dark:bg-slate-900/50 md:justify-start"
            >
              <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.415L8 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              40+ startups shipped
            </motion.p>

            <motion.div
              className="mt-10 flex justify-center md:justify-start"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.65, duration: ms.scroll }}
            >
              <Link
                href={scrollCueHref}
                className="group flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary md:items-start"
              >
                <span>Explore</span>
                <motion.span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-foreground/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/50"
                  animate={
                    reduced
                      ? undefined
                      : {
                          y: [0, 6, 0],
                        }
                  }
                  transition={
                    reduced
                      ? undefined
                      : {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  aria-hidden
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Right column — cycling panel */}
          <div className="md:min-h-0">
            <HeroCyclingPanel
              index={panelIndex}
              paused={panelPaused}
              onHover={setPanelPaused}
              onSelect={(i) => setPanelIndex(i)}
              reduced={reduced}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
