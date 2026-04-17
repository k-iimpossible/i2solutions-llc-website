"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, ms } from "@/lib/motion/variants";

export type ProcessStep = { step: string; title: string; body: string };

type ProcessSignatureProps = {
  steps: ProcessStep[];
  headingId: string;
};

/** Horizontal timeline “signature” section — focal connector + depth. */
export function ProcessSignature({ steps, headingId }: ProcessSignatureProps) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-950/90 via-slate-950/95 to-slate-950 dark:from-slate-950 dark:via-slate-950 dark:to-black"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(124, 58, 237, 0.35), transparent 55%), radial-gradient(ellipse 60% 45% at 100% 100%, rgba(6, 182, 212, 0.2), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_40px_80px_-20px_rgba(0,0,0,0.55)] sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden />

        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-violet-300/90">How we ship</p>
        <h2
          id={headingId}
          className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
        >
          Four steps. Zero guesswork.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-300 sm:text-lg">
          A clear rhythm—so you always know what happens next.
        </p>

        <div className="relative mt-14 lg:mt-16">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-white/35 to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid list-none gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: ms.scroll, delay: i * 0.1, ease: ease.out }}
                className="relative flex flex-col lg:items-center lg:text-center"
              >
                <div className="flex items-start gap-4 lg:flex-col lg:gap-5">
                  <div className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-lg font-bold text-white shadow-lg shadow-violet-500/40 ring-4 ring-white/10">
                    {item.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-[1.75rem] top-14 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-white/30 to-white/5 lg:hidden"
                      aria-hidden
                    />
                  )}
                  <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 ease-in-out hover:border-violet-400/35 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-500/10">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
