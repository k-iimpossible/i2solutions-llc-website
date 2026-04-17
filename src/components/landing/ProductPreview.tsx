"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, heroDelay, ms } from "@/lib/motion/variants";

/** Decorative UI mock for “visual proof” — implies product depth without screenshots. */
export function ProductPreview() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ms.scroll, delay: reduce ? 0 : heroDelay.preview, ease: ease.out }}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
    >
      <div className="relative rounded-2xl border border-white/40 bg-white/50 p-1 shadow-[0_32px_64px_-12px_rgba(124,58,237,0.35),0_0_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.65),0_0_80px_-20px_rgba(167,139,250,0.35)]">
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-100/90 to-slate-50/80 px-3 py-2.5 dark:from-slate-800/90 dark:to-slate-900/80">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </span>
          <div className="mx-auto h-2 w-32 max-w-[40%] rounded-full bg-slate-200/90 dark:bg-slate-700/80" />
        </div>
        <div className="mt-2 grid grid-cols-12 gap-2 rounded-xl bg-gradient-to-br from-white/90 to-slate-50/80 p-3 dark:from-slate-900/90 dark:to-slate-950/80">
          <aside className="col-span-4 space-y-2 rounded-lg border border-slate-200/80 bg-white/70 p-2 dark:border-white/10 dark:bg-slate-900/50">
            <div className="h-2 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-2 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 space-y-1.5">
              {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
                <div
                  key={i}
                  className="h-6 rounded-md bg-gradient-to-r from-violet-500/15 to-cyan-500/10 dark:from-violet-500/25 dark:to-cyan-500/15"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
          </aside>
          <div className="col-span-8 space-y-2">
            <div className="flex items-end justify-between gap-2">
              <div>
                <div className="h-2 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mt-2 h-8 w-36 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-90 shadow-lg shadow-violet-500/25" />
              </div>
              <div className="h-14 w-24 rounded-lg border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/20" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-900/40"
                >
                  <div className="mx-2 mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="mx-2 mt-2 h-10 rounded-lg bg-gradient-to-t from-violet-500/20 to-transparent dark:from-violet-500/30" />
                </div>
              ))}
            </div>
            <div className="h-10 rounded-xl border border-dashed border-slate-200/90 bg-slate-50/80 dark:border-white/10 dark:bg-slate-900/30" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124, 58, 237, 0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(6, 182, 212, 0.2), transparent 55%)",
          }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
