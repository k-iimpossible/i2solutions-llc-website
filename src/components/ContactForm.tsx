"use client";

import { useState, useId, FormEvent, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buttonMotion, ease, ms } from "@/lib/motion/variants";

type ContactFormProps = {
  /** Tighter layout for footer or sidebars */
  compact?: boolean;
};

export function ContactForm({ compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();
  const fieldId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, details }),
      });
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
      return;
    }

    const json = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };
    if (!res.ok) {
      setStatus("error");
      setErrorMessage(
        typeof json.error === "string" && json.error
          ? json.error
          : "Something went wrong. Please try again in a few minutes.",
      );
      return;
    }

    setStatus("sent");
    formRef.current?.reset();
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground shadow-sm outline-none ring-primary/0 transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15";

  const nameId = `${fieldId}-name`;
  const emailId = `${fieldId}-email`;
  const detailsId = `${fieldId}-details`;

  return (
    <motion.form
      ref={formRef}
      className={compact ? "mt-4 space-y-4" : "mt-8 space-y-6"}
      onSubmit={handleSubmit}
      noValidate
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ms.scroll, ease: ease.out }}
    >
      <div>
        <label htmlFor={nameId} className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input id={nameId} name="name" type="text" autoComplete="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input id={emailId} name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor={detailsId} className="block text-sm font-medium text-foreground">
          Project details
        </label>
        <textarea
          id={detailsId}
          name="details"
          rows={compact ? 4 : 6}
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
          Thanks—we received your message and will reply within two business days.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        {...(reduce ? {} : buttonMotion)}
        className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-[box-shadow,filter] duration-200 ease-in-out enabled:hover:shadow-xl enabled:hover:filter enabled:disabled:cursor-not-allowed enabled:disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : compact ? "Send message" : "Start Your Project"}
      </motion.button>
    </motion.form>
  );
}
