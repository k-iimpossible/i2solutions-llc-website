"use client";

import { useState, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buttonMotion, ease, ms } from "@/lib/motion/variants";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const reduce = useReducedMotion();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground shadow-sm outline-none ring-primary/0 transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15";

  return (
    <motion.form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
      noValidate
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ms.scroll, ease: ease.out }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-foreground">
          Project details
        </label>
        <textarea
          id="details"
          name="details"
          rows={6}
          required
          placeholder="What are you building? Who is it for?"
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "sent" && (
        <p
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
          role="status"
        >
          Thanks—your message is recorded for this demo. Connect a backend to send real email.
        </p>
      )}

      <motion.button
        type="submit"
        {...(reduce ? {} : buttonMotion)}
        className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-[box-shadow,filter] duration-200 ease-in-out hover:shadow-xl sm:w-auto"
      >
        Start Your Project
      </motion.button>
    </motion.form>
  );
}
