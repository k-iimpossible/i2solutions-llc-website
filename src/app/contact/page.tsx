import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start your project with ${SITE_NAME}—tell us about your goals, or book a call via Calendly.`,
};

export default function ContactPage() {
  return (
    <>
      <section
        className="border-b border-border/50 bg-surface/80 py-16 backdrop-blur-2xl backdrop-saturate-150 sm:py-20 dark:bg-surface/65"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 id="contact-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Contact
            </h1>
            <p className="mt-6 text-lg text-muted">
              Share a bit about your project—we&apos;ll reply within two business days.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Start Your Project</h2>
              <p className="mt-2 text-muted">
                Tell us about goals, timeline, and budget range—even a rough one helps us respond with something useful.
              </p>

              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Schedule a call</h2>
              <p className="mt-2 text-muted">
                Prefer to talk? Embed Calendly below—replace the placeholder with your scheduling link.
              </p>
              <div
                className="mt-6 flex min-h-[420px] items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background p-8 text-center transition-colors"
                role="region"
                aria-label="Calendly embed placeholder"
              >
                <div>
                  <p className="text-sm font-medium text-muted">Calendly embed</p>
                  <p className="mx-auto mt-2 max-w-xs text-xs text-muted">
                    Paste your Calendly inline embed snippet here, e.g.{" "}
                    <code className="rounded border border-border bg-surface px-1 py-0.5 text-[11px] text-foreground">
                      &lt;div className=&quot;calendly-inline-widget&quot; ... /&gt;
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
