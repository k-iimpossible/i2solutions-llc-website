import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE_NAME } from "@/lib/site";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/technologies", label: "Technologies" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t border-border/50 bg-surface/85 backdrop-blur-2xl backdrop-saturate-150 transition-colors dark:bg-surface/75"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              We build scalable web and mobile products for startups and growing teams—from discovery to launch.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">{title}</h2>
              <ul className="mt-4 space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href + label}>
                    <Link
                      href={href}
                      className="text-sm text-muted transition-colors duration-200 ease-in-out hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted">Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
