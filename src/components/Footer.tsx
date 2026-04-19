import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Logo } from "@/components/Logo";
import { OFFICE_ADDRESS, OFFICE_ADDRESS_MAP_QUERY, SITE_NAME } from "@/lib/site";

const officeMapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  OFFICE_ADDRESS_MAP_QUERY,
)}&hl=en&z=16&output=embed`;

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

        <div className="mt-12 border-t border-border pt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact us</h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-sm text-muted">
                Send a note—we typically reply within two business days. You can also use the full{" "}
                <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
                  Contact
                </Link>{" "}
                page for scheduling options.
              </p>
              <ContactForm compact />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-foreground">Office</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{OFFICE_ADDRESS}</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
                <iframe
                  title={`Map of ${OFFICE_ADDRESS}`}
                  src={officeMapEmbedSrc}
                  className="h-[260px] w-full border-0 sm:h-[300px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS_MAP_QUERY)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
