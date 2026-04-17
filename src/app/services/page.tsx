import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { serviceBlocks } from "@/lib/offerings";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack custom software: web, mobile, UX, architecture, DevOps, QA, SaaS, APIs, staffing, and delivery leadership.",
};

export default function ServicesPage() {
  return (
    <>
      <section
        className="border-b border-border/50 bg-surface/80 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/65"
        aria-labelledby="services-page-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 id="services-page-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Services
            </h1>
            <p className="mt-6 text-lg text-muted">
              End-to-end capabilities from discovery through deploy—pick a lane below or combine teams as your roadmap
              grows.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <nav className="mb-12 flex flex-wrap gap-2 border-b border-border pb-4" aria-label="On this page">
            {serviceBlocks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-transparent bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="space-y-20">
          {serviceBlocks.map((block, i) => (
            <Reveal key={block.id} delay={i * 0.05}>
              <section id={block.id} className="scroll-mt-24" aria-labelledby={`${block.id}-title`}>
                <h2 id={`${block.id}-title`} className="text-2xl font-bold text-foreground sm:text-3xl">
                  {block.title}
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-muted">{block.intro}</p>

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Benefits</h3>
                    <ul className="mt-4 space-y-3">
                      {block.benefits.map((b) => (
                        <li key={b} className="flex gap-3 text-foreground/90">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500"
                            aria-hidden
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Technologies</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {block.technologies.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-foreground/90 shadow-sm transition hover:border-primary/30"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/industries"
              className="font-semibold text-primary underline-offset-4 transition hover:underline"
            >
              Industries we serve
            </Link>
            <span className="text-muted" aria-hidden>
              ·
            </span>
            <Link
              href="/technologies"
              className="font-semibold text-primary underline-offset-4 transition hover:underline"
            >
              Technology domains
            </Link>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-xl active:scale-[0.98]"
          >
            Start Your Project
          </Link>
        </Reveal>
      </div>

      <CTASection
        title="Not sure where to start?"
        description={`Tell us about your product—we’ll recommend the right stack and timeline for ${SITE_NAME} clients.`}
        buttonLabel="Book a Free Consultation"
        buttonHref="/contact"
        id="services-cta"
      />
    </>
  );
}
