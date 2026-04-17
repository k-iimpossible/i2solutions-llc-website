"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Ship faster.", "Scale smarter.", "Build bold."];

export function RotatingHighlight() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return <span className="text-primary">{WORDS[0]}</span>;
  }

  return (
    <span className="relative inline-flex min-h-[1.25em] items-center text-primary">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text font-semibold text-transparent dark:from-violet-400 dark:to-cyan-400"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
