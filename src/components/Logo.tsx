import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-0.5 font-bold tracking-tight transition-opacity duration-200 ease-in-out hover:opacity-90 ${className}`}
      aria-label={`${SITE_NAME} home`}
    >
      <span className="logo-shimmer bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-2xl text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
        I2
      </span>
      <span className="text-xl text-foreground">Solutions</span>
    </Link>
  );
}
