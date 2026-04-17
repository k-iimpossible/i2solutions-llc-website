/**
 * Service, industry, and technology offerings—inspired by breadth of capability
 * categories common to full-stack agencies (not visual/theme copy).
 */

export type ServiceBlock = {
  id: string;
  title: string;
  intro: string;
  benefits: string[];
  technologies: string[];
};

export const serviceBlocks: ServiceBlock[] = [
  {
    id: "web",
    title: "Web Development",
    intro:
      "Marketing sites, customer portals, and complex web apps—fast, accessible, and built to evolve with your product.",
    benefits: [
      "SSR/SSG and edge-ready architectures when performance and SEO matter",
      "Design systems and component libraries your team can extend",
      "Analytics, observability, and release safety from first production deploy",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    intro:
      "Native-feeling iOS and Android experiences—offline, push, deep links, and store-ready pipelines.",
    benefits: [
      "Cross-platform or targeted native modules where it counts",
      "Secure auth, API integration, and app hardening patterns",
      "CI/CD for TestFlight, Play Console, and staged rollouts",
    ],
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "REST", "GraphQL"],
  },
  {
    id: "applications",
    title: "Application Development",
    intro:
      "Line-of-business apps, internal tools, and customer-facing products beyond a simple marketing site.",
    benefits: [
      "Domain modeling and workflows that match how your org actually works",
      "Role-based access, audit trails, and integration with existing systems",
      "Roadmaps that balance shipping now with a maintainable core",
    ],
    technologies: [".NET", "Node.js", "Python", "SQL", "Message queues", "REST APIs"],
  },
  {
    id: "design",
    title: "UX / UI Design",
    intro:
      "Research, information architecture, and interfaces that reduce friction and support your brand.",
    benefits: [
      "Discovery workshops and UX flows aligned to measurable outcomes",
      "High-fidelity UI and design systems engineers can implement reliably",
      "Accessibility-minded patterns (WCAG-oriented) baked into deliverables",
    ],
    technologies: ["Figma", "Design tokens", "Prototyping", "Usability testing"],
  },
  {
    id: "architecture",
    title: "Technology Architecture",
    intro:
      "Clear technical direction before you commit—cloud, data, integrations, and scaling paths.",
    benefits: [
      "Reference architectures and ADRs your team can defend to stakeholders",
      "Trade-off analysis: build vs. buy, monolith vs. services, data ownership",
      "Security and compliance considerations framed for your industry",
    ],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Event-driven design", "Data modeling"],
  },
  {
    id: "staffing",
    title: "Software & IT Staffing",
    intro:
      "Embed senior engineers, leads, or squads to accelerate delivery without long hiring cycles.",
    benefits: [
      "Ramp that matches your sprint cadence and code review culture",
      "Knowledge transfer so you are not locked in when the engagement ends",
      "Flexible models: augment your team or own a workstream end-to-end",
    ],
    technologies: ["Team augmentation", "Sprint planning", "Code review", "Mentoring"],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    intro:
      "Pipelines, infrastructure as code, and operational practices that make releases boring—in a good way.",
    benefits: [
      "CI/CD, environments, and secrets handled consistently",
      "Monitoring, alerting, and runbooks that shorten incident time",
      "Cost-aware cloud layouts with room to scale",
    ],
    technologies: ["Docker", "GitHub Actions", "Terraform", "Kubernetes", "Prometheus", "Grafana"],
  },
  {
    id: "qa",
    title: "Quality Assurance & Testing",
    intro:
      "Test strategy beyond manual clicks—automation, regression safety, and release confidence.",
    benefits: [
      "Test plans tied to risk: smoke, regression, API, and E2E where it pays off",
      "Automation that fits your stack and team skills",
      "Bug triage and traceability so fixes land in the right order",
    ],
    technologies: ["Playwright", "Cypress", "Jest", "k6", "TestRail", "CI test gates"],
  },
  {
    id: "mvp",
    title: "MVP Development",
    intro:
      "Tight scope, fast learning loops, and a demo stakeholders and users can actually use.",
    benefits: [
      "Backlog prioritization tied to hypotheses and metrics",
      "Weekly demos and transparent milestones",
      "A path to scale so v2 is not a full rewrite",
    ],
    technologies: ["Lean discovery", "Analytics", "Feature flags", "Cloud-native defaults"],
  },
  {
    id: "saas",
    title: "SaaS Development",
    intro:
      "Multi-tenant products: billing, onboarding, roles, and the operational glue SaaS teams need.",
    benefits: [
      "Subscription lifecycle, metering, and plan changes without chaos",
      "Tenant isolation and data boundaries by design",
      "Admin tooling and support workflows that scale with customers",
    ],
    technologies: ["Stripe", "Auth", "Multi-tenancy", "PostgreSQL", "Background jobs"],
  },
  {
    id: "api",
    title: "API Development",
    intro:
      "Stable, versioned APIs for partners, mobile apps, and internal systems—with docs teams can trust.",
    benefits: [
      "Consistent error models, pagination, and auth patterns",
      "OpenAPI specs and developer portals where needed",
      "Performance and rate-limiting tuned to real usage",
    ],
    technologies: ["REST", "GraphQL", "gRPC", "OpenAPI", "API gateways", "Webhooks"],
  },
  {
    id: "project-management",
    title: "Project Management",
    intro:
      "Clear ownership, communication rhythms, and delivery reporting—so engineering stays focused.",
    benefits: [
      "Milestones and RAID visibility stakeholders can read at a glance",
      "Scope change handled without surprise budget or timeline shocks",
      "Bridge between business, design, and engineering in one thread",
    ],
    technologies: ["Agile / Scrum", "Kanban", "Jira", "Linear", "Weekly status", "Risk tracking"],
  },
];

export type IndustryItem = {
  id: string;
  title: string;
  summary: string;
  examples: string[];
};

export const industries: IndustryItem[] = [
  {
    id: "enterprise",
    title: "Enterprise",
    summary:
      "Large programs with compliance, integration, and stakeholder alignment—without slowing experimentation.",
    examples: ["Legacy integration", "SSO & directory", "Audit-friendly workflows", "Multi-team roadmaps"],
  },
  {
    id: "government",
    title: "Government & public sector",
    summary:
      "Accessible, secure systems with clear procurement-friendly documentation and long-term maintainability.",
    examples: ["WCAG-oriented UX", "Security review support", "Transparent milestones", "Vendor handoff"],
  },
  {
    id: "education",
    title: "Education",
    summary:
      "Portals and tools for learners, faculty, and admins—where clarity and reliability matter most.",
    examples: ["Role-based portals", "Content workflows", "Analytics for adoption", "Mobile-friendly UX"],
  },
  {
    id: "smb",
    title: "Small business",
    summary:
      "High-impact builds that respect budget: focused scope, fast time-to-value, and room to grow.",
    examples: ["MVP launches", "Automation of manual ops", "Integrations with everyday tools"],
  },
  {
    id: "marketing",
    title: "Marketing & agencies",
    summary:
      "Performance sites, campaign tooling, and handoff-friendly components your creative team can extend.",
    examples: ["Headless CMS patterns", "Landing systems", "A/B-friendly layouts", "Speed & Core Web Vitals"],
  },
  {
    id: "finance",
    title: "Finance & fintech",
    summary:
      "Dashboards, payments-adjacent flows, and data handling with an eye on correctness and observability.",
    examples: ["Reporting pipelines", "Role-based finance UIs", "Integration with processors & banks", "Audit trails"],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    summary:
      "Patient and clinician experiences with privacy-minded defaults and integration-friendly APIs.",
    examples: ["Patient engagement", "EHR-friendly integrations", "Secure messaging patterns", "Compliance-aware design"],
  },
  {
    id: "agriculture",
    title: "Agriculture",
    summary:
      "Field-ready workflows, offline-tolerant mobile patterns, and data from devices to dashboards.",
    examples: ["Operations dashboards", "Mobile for distributed teams", "IoT-friendly ingestion", "Maps & logistics UI"],
  },
  {
    id: "ecommerce",
    title: "eCommerce & retail",
    summary:
      "Storefronts, inventory, and operations tooling that keep merchandising and engineering in sync.",
    examples: ["Checkout & catalog", "OMS integrations", "Performance at peak traffic", "Personalization hooks"],
  },
];

export type TechnologyDomain = {
  id: string;
  title: string;
  summary: string;
  focus: string[];
};

export const technologyDomains: TechnologyDomain[] = [
  {
    id: "ai",
    title: "Artificial intelligence",
    summary:
      "Practical ML and AI features: from retrieval and classification to copilots—grounded in your data and constraints.",
    focus: ["RAG & knowledge bases", "Model integration", "Evaluation & guardrails", "Cost-aware inference"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    summary:
      "Secure-by-default apps: authn/z, secrets, dependency hygiene, and sensible threat modeling for web products.",
    focus: ["OAuth / SSO", "Secrets & key management", "Secure SDLC", "Incident-ready logging"],
  },
  {
    id: "rpa",
    title: "Robotic process automation",
    summary:
      "Automate repetitive workflows where APIs are missing—paired with human review when stakes are high.",
    focus: ["Workflow design", "Bot reliability", "Exception handling", "Integration bridges"],
  },
  {
    id: "blockchain",
    title: "Blockchain & DLT",
    summary:
      "When distributed ledgers matter: proofs-of-concept, integrations, and pragmatic trade-offs vs. traditional DBs.",
    focus: ["Wallet & key UX", "Smart contract boundaries", "Indexing & APIs", "Compliance considerations"],
  },
  {
    id: "xr",
    title: "Extended reality (AR / VR)",
    summary:
      "Immersive experiences for training, visualization, and product demos—scoped to platforms your users already have.",
    focus: ["WebXR / native", "3D performance", "Input & comfort", "Content pipelines"],
  },
  {
    id: "erp",
    title: "ERP",
    summary:
      "Connect your product to the systems that run the business: orders, inventory, finance, and master data.",
    focus: ["Integration patterns", "Idempotent sync", "Error recovery", "Mapping & reconciliation"],
  },
  {
    id: "crm",
    title: "CRM",
    summary:
      "Sales and support workflows that stay in sync: leads, opportunities, tickets, and customer history in one place.",
    focus: ["CRM APIs", "Webhooks", "Data hygiene", "Automation rules"],
  },
  {
    id: "cloud-storage",
    title: "Online storage & files",
    summary:
      "Uploads, virus scanning hooks, signed URLs, and lifecycle policies—without turning your app into a file server.",
    focus: ["S3-compatible patterns", "Multipart uploads", "Access control", "CDN delivery"],
  },
  {
    id: "big-data",
    title: "Big data",
    summary:
      "Pipelines and warehouses for analytics: batch and stream ingestion, modeling, and product-facing metrics.",
    focus: ["ETL / ELT", "Warehouses", "Streaming", "Data quality"],
  },
  {
    id: "bi",
    title: "Business intelligence",
    summary:
      "Dashboards people actually use: curated metrics, self-serve where appropriate, and definitions everyone agrees on.",
    focus: ["Semantic layers", "BI tools", "Embedded analytics", "Governance"],
  },
  {
    id: "iot",
    title: "Internet of Things (IoT)",
    summary:
      "Device telemetry to cloud: ingestion, time-series storage, alerting, and operational UIs.",
    focus: ["MQTT / HTTP", "Device provisioning", "Edge vs. cloud", "OTA considerations"],
  },
];
