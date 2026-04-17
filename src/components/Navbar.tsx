"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { MotionLink } from "@/components/motion/MotionLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonMotion } from "@/lib/motion/variants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/technologies", label: "Technologies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
        scrolled
          ? "border-border/50 bg-surface/90 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.14)] backdrop-blur-xl backdrop-saturate-150 dark:bg-surface/80 dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
          : "border-transparent bg-surface/55 backdrop-blur-md backdrop-saturate-150 dark:bg-surface/45"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-medium transition-colors duration-200 ease-in-out ${
                  active ? "text-primary" : "text-muted hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-opacity duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <MotionLink
            href="/contact"
            {...buttonMotion}
            className="hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/35 ring-2 ring-violet-400/25 transition-[box-shadow,filter] duration-200 ease-in-out hover:brightness-110 hover:shadow-xl sm:inline-flex"
          >
            Get Started
          </MotionLink>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted transition-colors duration-200 ease-in-out hover:bg-muted/10 hover:text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border/50 bg-surface/95 px-4 py-4 backdrop-blur-xl md:hidden dark:bg-surface/90"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 ease-in-out ${
                  pathname === href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/10"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <MotionLink
              href="/contact"
              {...buttonMotion}
              className="mt-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-center text-sm font-semibold text-white transition-[filter] duration-200 ease-in-out hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              Get Started
            </MotionLink>
          </nav>
        </div>
      )}
    </header>
  );
}
