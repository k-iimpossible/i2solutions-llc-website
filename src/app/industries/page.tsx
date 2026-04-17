import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { industries } from "@/lib/offerings";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Where we deliver—enterprise, public sector, education, healthcare, finance, eCommerce, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <section
        className="border-b border-border/50 bg-surface/80 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/65"
        aria-labelledby="industries-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 id="industries-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Industries
            </h1>
            <p className="mt-6 text-lg text-muted">
              We adapt delivery to your regulatory context, user expectations, and integration landscape—without losing
              velocity.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 0.03}>
              <article
                className="flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-6 shadow-sm backdrop-blur-sm transition hover:border-primary/35 hover:shadow-md dark:bg-surface/50"
                aria-labelledby={`ind-${ind.id}-title`}
              >
                <h2 id={`ind-${ind.id}-title`} className="text-lg font-bold text-foreground">
                  {ind.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{ind.summary}</p>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Typical focus</h3>
                <ul className="mt-2 space-y-1.5">
                  {ind.examples.map((ex) => (
                    <li key={ex} className="flex gap-2 text-sm text-foreground/90">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500"
                        aria-hidden
                      />
                      {ex}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/technologies"
            className="text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
          >
            Explore technology domains
          </Link>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/services"
            className="text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
          >
            View all services
          </Link>
        </Reveal>
      </div>

      <CTASection
        title="Tell us about your sector"
        description={`We’ll map the right stack, compliance posture, and rollout plan for ${SITE_NAME} engagements.`}
        buttonLabel="Book a Free Consultation"
        buttonHref="/contact"
        id="industries-cta"
      />
    </>
  );
}
