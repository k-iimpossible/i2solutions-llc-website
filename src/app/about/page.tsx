import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${SITE_NAME}—our mission, values, and the small team behind your next launch.`,
};

const values = [
  {
    title: "Clarity over noise",
    body: "We explain trade-offs in plain language—so decisions feel obvious, not risky.",
  },
  {
    title: "Ownership",
    body: "We treat your roadmap like our own: proactive communication and no surprise handoffs.",
  },
  {
    title: "Craft",
    body: "Clean code and thoughtful UX aren’t extras—they’re how products stay fast as they grow.",
  },
];

const team = [
  { name: "Alex Rivera", role: "Founder & Product Engineering" },
  { name: "Jordan Kim", role: "Design Lead" },
  { name: "Sam Okonkwo", role: "Mobile & APIs" },
];

export default function AboutPage() {
  return (
    <>
      <section
        className="border-b border-border/50 bg-surface/80 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/65"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 id="about-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About us
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              We&apos;re a small, senior team that loves turning fuzzy ideas into products people actually use. No bloated
              agency layers—just people who code, design, and care about your outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="mission-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 id="mission-heading" className="text-2xl font-bold text-foreground">
                Our mission
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Help startups and small businesses ship reliable software without burning runway. We believe great products
                come from tight feedback loops, honest scoping, and respect for your users&apos; time.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">The team</h2>
              <ul className="mt-6 space-y-4">
                {team.map((person) => (
                  <li
                    key={person.name}
                    className="flex items-baseline justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold text-foreground">{person.name}</span>
                    <span className="text-sm text-muted">{person.role}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                We collaborate with specialist partners for security reviews, ML, and niche native work when projects need
                it—always with your timeline in mind.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="border-y border-border/40 bg-surface/70 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/55"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="values-heading" className="text-center text-3xl font-bold text-foreground">
              Values
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/25">
                  <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to work with us?"
        description="We take a limited number of projects each quarter so every build gets the attention it deserves."
        buttonLabel="Book a Free Consultation"
        buttonHref="/contact"
        id="about-cta"
      />
    </>
  );
}
