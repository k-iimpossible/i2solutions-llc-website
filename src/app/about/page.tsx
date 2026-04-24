import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_NAME } from "@/lib/site";

const LEGAL_NAME = "I2 Solutions LLC";
const COMPANY_ADDRESS = "5620 Geer Ave, Los Angeles, CA 90016";

export const metadata: Metadata = {
  title: "About",
  description: `${LEGAL_NAME}—our mission, values, and how we partner with you to ship reliable software.`,
};

const values = [
  {
    title: "Clarity over noise",
    body: "We explain trade-offs in plain language so decisions feel obvious, not risky—no jargon walls or vague timelines.",
  },
  {
    title: "Ownership",
    body: "We treat your roadmap like our own: proactive updates, clear accountability, and no surprise handoffs mid-flight.",
  },
  {
    title: "Craft",
    body: "Clean architecture and thoughtful UX are not extras—they are how products stay fast, secure, and maintainable as they grow.",
  },
];
//commit
const howWeWork = [
  {
    title: "Discover & align",
    body: "We start with goals, constraints, and users. Short workshops and a shared backlog so scope matches reality before a single sprint.",
  },
  {
    title: "Design & build in loops",
    body: "We ship in small increments with visible progress—reviews, demos, and tight feedback so the product evolves with your business.",
  },
  {
    title: "Launch & stabilize",
    body: "We plan releases, monitoring, and handoff documentation. After go-live we stay close until metrics and support feel steady.",
  },
  {
    title: "Improve continuously",
    body: "Roadmaps change. We help prioritize what moves the needle next—performance, features, or integrations—without rebuilding from scratch every year.",
  },
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
            <p className="text-sm font-medium uppercase tracking-wider text-primary">{LEGAL_NAME}</p>
            <h1 id="about-heading" className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About us
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {SITE_NAME} is the public face of {LEGAL_NAME}—a senior-led practice focused on turning unclear requirements into
              software people trust. We keep teams small, communication direct, and every engagement anchored in measurable
              outcomes for your users and your business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="mission-heading">
        <Reveal>
          <h2 id="mission-heading" className="text-2xl font-bold text-foreground sm:text-3xl">
            Our mission
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Our mission is to help organizations ship reliable digital products without wasting time or budget on process for
            its own sake. We believe the best work happens when technical excellence meets honest scoping—so your team can
            move fast today and still own the codebase tomorrow.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Based in Los Angeles, we partner with startups and established teams who need a steady engineering and product
            partner—not a revolving door of contractors. Whether you are launching something new or modernizing what you
            already run, we are here to make the path from idea to production clear and sustainable.
          </p>
        </Reveal>
      </section>

      <section
        className="border-y border-border/40 bg-surface/70 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/55"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="values-heading" className="text-center text-3xl font-bold text-foreground">
              Our values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
              These principles guide how we estimate, communicate, and deliver—so you always know what you are getting and why.
            </p>
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="how-heading">
        <Reveal>
          <h2 id="how-heading" className="text-center text-3xl font-bold text-foreground">
            How do we work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            No black box. You get a transparent rhythm from first call to post-launch—built around your priorities and pace.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {howWeWork.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface/80 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <address className="mx-auto mt-14 max-w-xl rounded-2xl border border-border/80 bg-surface/60 p-6 text-center not-italic backdrop-blur-sm">
            <p className="text-sm font-semibold text-foreground">{LEGAL_NAME}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{COMPANY_ADDRESS}</p>
          </address>
        </Reveal>
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
