import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { technologyDomains } from "@/lib/offerings";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "Technology domains we work in—AI, cloud, security, data, IoT, integrations, and modern product engineering.",
};

export default function TechnologiesPage() {
  return (
    <>
      <section
        className="border-b border-border/50 bg-surface/80 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/65"
        aria-labelledby="technologies-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 id="technologies-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Technologies
            </h1>
            <p className="mt-6 text-lg text-muted">
              Domain expertise across emerging platforms and enterprise systems—applied with pragmatic trade-offs, not
              buzzwords.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <nav className="mb-12 flex flex-wrap gap-2 border-b border-border pb-4" aria-label="On this page">
            {technologyDomains.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="rounded-full border border-transparent bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
              >
                {t.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="space-y-16">
          {technologyDomains.map((domain, i) => (
            <Reveal key={domain.id} delay={i * 0.04}>
              <section id={domain.id} className="scroll-mt-24" aria-labelledby={`${domain.id}-title`}>
                <h2 id={`${domain.id}-title`} className="text-2xl font-bold text-foreground sm:text-3xl">
                  {domain.title}
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-muted">{domain.summary}</p>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">Where we focus</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {domain.focus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-foreground/90 shadow-sm transition hover:border-primary/30"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/industries"
            className="text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
          >
            Explore industries
          </Link>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/services"
            className="text-sm font-semibold text-primary underline-offset-4 transition hover:underline"
          >
            View services
          </Link>
        </Reveal>
      </div>

      <CTASection
        title="Need a technical sounding board?"
        description={`Share your constraints—we’ll recommend a realistic path for ${SITE_NAME} to build or integrate.`}
        buttonLabel="Book a Free Consultation"
        buttonHref="/contact"
        id="technologies-cta"
      />
    </>
  );
}
