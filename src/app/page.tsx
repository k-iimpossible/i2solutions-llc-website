import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSignature } from "@/components/landing/ProcessSignature";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import type { TestimonialData } from "@/components/TestimonialCard";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, accessible SPAs and SSR apps with modern frameworks—built for scale and SEO.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform apps with native-quality UX—offline support, push, and app store readiness.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Application Development",
    description:
      "Business apps and internal tools—workflows, roles, and integrations that match how you operate.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "Research-backed flows, design systems, and polished interfaces that convert.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Technology Architecture",
    description:
      "Cloud, data, and integration blueprints—trade-offs your team can explain to stakeholders.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "DevOps & Cloud",
    description:
      "CI/CD, infrastructure as code, and observability—so releases stay predictable as you scale.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "SaaS & API Development",
    description:
      "Multi-tenant products, billing-aware flows, and stable APIs partners and apps can rely on.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "MVP Development",
    description:
      "Scope tight, ship fast—user stories, milestones, and a launch plan you can pitch.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const caseStudies = [
  {
    title: "FinStack — B2B payments dashboard",
    problem: "Manual reconciliation slowed month-end close and frustrated finance teams.",
    solution: "Real-time sync, role-based workflows, and audit-friendly exports.",
    tech: ["Next.js", "PostgreSQL", "Stripe"],
    result: "Closed books 40% faster in the first quarter after launch.",
  },
  {
    title: "PulseCare — patient engagement app",
    problem: "Low adherence to care plans; support load was unsustainable.",
    solution: "Mobile app with reminders, secure messaging, and analytics for clinics.",
    tech: ["React Native", "Node.js", "FHIR APIs"],
    result: "3× engagement; support tickets down 35%.",
  },
  {
    title: "ShelfIQ — inventory for retail",
    problem: "Stockouts and overstocks from disconnected spreadsheets.",
    solution: "Unified inventory UI with forecasting hooks and POS integrations.",
    tech: ["TypeScript", "Next.js", "Redis"],
    result: "12% waste reduction pilot across 8 stores.",
  },
];

const processSteps = [
  { step: "1", title: "Discovery", body: "Goals, users, constraints—we align on outcomes before pixels or code." },
  { step: "2", title: "Planning", body: "Roadmap, milestones, and a technical approach you can share with stakeholders." },
  { step: "3", title: "Development", body: "Iterative builds, reviews, and QA—transparent progress every week." },
  { step: "4", title: "Launch", body: "Hardening, handoff, and analytics so you can measure what matters." },
];

const trustItems = ["Vercel", "React", "TypeScript", "PostgreSQL", "AWS", "Figma"];

const testimonials: TestimonialData[] = [
  {
    quote:
      "They cut through ambiguity fast. We went from rough concept to a polished MVP in weeks—not months. Communication was crisp and weekly demos kept us aligned.",
    name: "Sarah Chen",
    role: "VP Product",
    company: "Brightline Analytics",
    rating: 5,
    imageUrl: "https://i.pravatar.cc/128?img=5",
    projectLabel: "MVP & launch",
  },
  {
    quote:
      "Engineering quality was consistently high. Our stakeholders finally stopped worrying about tech debt—and the velocity stayed predictable through release.",
    name: "Marcus Webb",
    role: "CTO",
    company: "Northwind Retail",
    rating: 4.9,
    imageUrl: "https://i.pravatar.cc/128?img=12",
    projectLabel: "Platform rebuild",
  },
  {
    quote:
      "ShelfIQ was the first vendor that felt like an extension of our team. Design decisions were backed by data, and handoff to our engineers was painless.",
    name: "Elena Vasquez",
    role: "Founder & CEO",
    company: "ShelfIQ",
    rating: 5,
    imageUrl: "https://i.pravatar.cc/128?img=9",
    projectLabel: "Inventory product",
  },
  {
    quote:
      "The payments dashboard shipped on time for a board-critical deadline. Observability and exports were exactly what our finance team asked for.",
    name: "James Okoro",
    role: "Head of Engineering",
    company: "FinStack",
    rating: 4.8,
    imageUrl: "https://i.pravatar.cc/128?img=15",
    projectLabel: "B2B dashboard",
  },
  {
    quote:
      "Patient engagement jumped after launch—reminders and secure messaging reduced support load dramatically. Clinical staff adoption was faster than we modeled.",
    name: "Priya Nair",
    role: "Product Lead",
    company: "PulseCare",
    rating: 5,
    imageUrl: "https://i.pravatar.cc/128?img=16",
    projectLabel: "Mobile app",
  },
  {
    quote:
      "We needed a design system that scales across squads. Documentation and Figma hygiene were investor-grade—our Series A deck looked sharper because of it.",
    name: "David Park",
    role: "COO",
    company: "Lumen Labs",
    rating: 4.9,
    imageUrl: "https://i.pravatar.cc/128?img=33",
    projectLabel: "Design system",
  },
];

const [leadService, ...otherServices] = services;

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <ScrollRevealSection
        id="trust"
        className="landing-pull-up relative z-10 px-4 sm:px-6 lg:px-8"
        aria-labelledby="trust-heading"
      >
        <div className="landing-curve-top landing-glass mx-auto max-w-6xl border border-border/50 bg-gradient-to-b from-surface/95 to-surface/[0.88] py-16 shadow-[0_24px_64px_-24px_rgba(15,23,42,0.2)] backdrop-blur-2xl dark:from-surface/90 dark:to-surface/75 dark:shadow-[0_28px_80px_-28px_rgba(0,0,0,0.55)] sm:py-20">
          <div className="px-4 sm:px-8 lg:px-10">
            <StaggerGroup>
              <StaggerItem>
                <SectionHeader
                  id="trust-heading"
                  eyebrow="Ecosystem"
                  title="Built with tools teams trust"
                  description="Fast, observable, maintainable defaults as you scale."
                />
              </StaggerItem>
              <StaggerItem className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-8">
                {trustItems.map((name) => (
                  <span
                    key={name}
                    className="rounded-xl border border-border/50 bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground/75 shadow-sm backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow,color] duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/40 hover:bg-surface/90 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:bg-surface/40"
                  >
                    {name}
                  </span>
                ))}
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        className="relative overflow-hidden bg-gradient-to-b from-transparent via-violet-500/[0.04] to-transparent py-24 backdrop-blur-[1px] sm:py-32 dark:via-violet-500/[0.07]"
        aria-labelledby="services-heading"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup>
            <StaggerItem>
              <SectionHeader
                id="services-heading"
                align="left"
                eyebrow="What we do"
                title="Services"
                description="One focal engagement—then supporting capabilities that plug in as you grow."
              />
            </StaggerItem>
            <StaggerItem className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              <div className="lg:col-span-7">
                <ServiceCard
                  title={leadService.title}
                  description={leadService.description}
                  icon={leadService.icon}
                />
              </div>
              <div className="landing-glass relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl border border-border/50 bg-surface/50 p-4 shadow-inner backdrop-blur-md dark:bg-surface/35 lg:col-span-5">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" aria-hidden />
                <div className="w-full max-w-md scale-[0.92] lg:max-w-none lg:scale-100">
                  <ProductPreview />
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((s) => (
                <ServiceCard key={s.title} title={s.title} description={s.description} icon={s.icon} />
              ))}
            </StaggerItem>
            <StaggerItem className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm">
              <Link href="/industries" className="font-semibold text-primary underline-offset-4 transition hover:underline">
                Industries
              </Link>
              <span className="text-muted" aria-hidden>
                ·
              </span>
              <Link
                href="/technologies"
                className="font-semibold text-primary underline-offset-4 transition hover:underline"
              >
                Technologies
              </Link>
            </StaggerItem>
            <StaggerItem className="mt-8 text-center">
              <Link
                href="/services"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors duration-200 ease-in-out hover:text-primary/80"
              >
                <span className="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                  Explore all services
                </span>
                <span className="transition duration-200 ease-in-out group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        id="case-studies"
        className="mesh-bg border-y border-border/35 py-24 sm:py-32"
        aria-labelledby="case-studies-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup>
            <StaggerItem>
              <SectionHeader
                id="case-studies-heading"
                eyebrow="Proof"
                title="Case studies"
                description="One flagship build—then more outcomes in depth."
              />
            </StaggerItem>
          </StaggerGroup>
          <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-2">
            <StaggerItem className="lg:col-span-2">
              <CaseStudyCard {...caseStudies[0]} featured />
            </StaggerItem>
            <StaggerItem>
              <CaseStudyCard {...caseStudies[1]} />
            </StaggerItem>
            <StaggerItem>
              <CaseStudyCard {...caseStudies[2]} />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="py-24 sm:py-32" aria-labelledby="process-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ProcessSignature steps={processSteps} headingId="process-heading" />
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection
        className="border-t border-border/40 bg-gradient-to-b from-surface/80 to-background/90 py-24 backdrop-blur-xl sm:py-32 dark:from-surface/50 dark:to-background/80"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup>
            <StaggerItem>
              <SectionHeader
                id="testimonials-heading"
                eyebrow="Social proof"
                title="What clients say"
                description="Swipe or use the arrows—keyboard-friendly, auto-advances every few seconds."
              />
            </StaggerItem>
          </StaggerGroup>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </ScrollRevealSection>

      <CTASection
        title="Have an idea? Let's build it together."
        buttonLabel="Book a Free Consultation"
        buttonHref="/contact"
        id="final-cta"
      />
    </>
  );
}
