"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion/variants";

const easeLoop = ease.inOut;

export function AgencyBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#f2f4f8] dark:bg-[#05070d]" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-[#eef1f6] to-slate-200/35 dark:from-[#080c16] dark:via-[#06080f] dark:to-[#0c1220]" />

      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 30% 20%, rgba(79, 70, 229, 0.07) 0%, transparent 50%), radial-gradient(ellipse 90% 70% at 80% 90%, rgba(59, 130, 246, 0.045) 0%, transparent 45%)",
        }}
        animate={reduce ? undefined : { x: ["-2%", "2%", "-2%"], y: ["-1%", "1.5%", "-1%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: easeLoop }}
      />

      <motion.div
        className="absolute -right-[18%] -top-[12%] h-[min(72vw,560px)] w-[min(72vw,560px)] will-change-transform rounded-full bg-indigo-600/[0.09] blur-[clamp(64px,12vw,120px)] dark:bg-indigo-500/[0.11]"
        animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: easeLoop }}
      />
      <motion.div
        className="absolute -bottom-[14%] -left-[14%] h-[min(68vw,520px)] w-[min(68vw,520px)] will-change-transform rounded-full bg-violet-600/[0.07] blur-[clamp(60px,11vw,112px)] dark:bg-violet-500/[0.09]"
        animate={reduce ? undefined : { x: [0, -22, 0], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: easeLoop }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[12%] h-[min(48vw,380px)] w-[min(48vw,380px)] will-change-transform rounded-full bg-blue-600/[0.06] blur-[clamp(52px,9vw,96px)] dark:bg-blue-500/[0.075]"
        animate={reduce ? undefined : { x: [0, 18, 0], y: [0, 24, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: easeLoop }}
      />

      <div className="agency-bg-dots absolute inset-0" />
      <div className="agency-bg-noise absolute inset-0" />
    </div>
  );
}
