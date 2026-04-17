"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionLink } from "@/components/motion/MotionLink";
import { buttonMotion, ease, ms } from "@/lib/motion/variants";

type CTASectionProps = {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  id?: string;
};

export function CTASection({ title, description, buttonLabel, buttonHref, id = "cta" }: CTASectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-violet-700 via-fuchsia-700 to-indigo-800 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby={`${id}-heading`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.06%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: ms.scroll, ease: ease.out }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 id={`${id}-heading`} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-4 text-lg text-white/90">{description}</p>}
        <div className="mt-8">
          <MotionLink
            href={buttonHref}
            {...(reduce ? {} : buttonMotion)}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-violet-800 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_12px_40px_-8px_rgba(0,0,0,0.35),0_0_48px_-12px_rgba(255,255,255,0.45)] ring-4 ring-white/35 transition-[box-shadow,background-color,filter] duration-200 ease-in-out hover:bg-slate-50 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_16px_48px_-8px_rgba(0,0,0,0.4),0_0_56px_-8px_rgba(255,255,255,0.55)]"
          >
            {buttonLabel}
            <svg className="ml-2 h-5 w-5 transition duration-200 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </MotionLink>
        </div>
      </motion.div>
    </section>
  );
}
