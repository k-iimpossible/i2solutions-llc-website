import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

/** Intrinsic size of `public/image/logo1.png` / `logo2.png` (same dimensions) */
const LOGO_WIDTH = 1400;
const LOGO_HEIGHT = 160;

type LogoProps = {
  className?: string;
  /**
   * When true, logo height matches the main navbar row (`h-16` / 4rem).
   * Leave false in the footer and other contexts so the mark stays proportional.
   */
  matchHeaderHeight?: boolean;
};

export function Logo({ className = "", matchHeaderHeight = false }: LogoProps) {
  const imageClass = matchHeaderHeight
    ? "h-10 w-auto max-h-14 object-contain"
    : "h-10 w-auto sm:h-10 object-contain";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-opacity duration-200 ease-in-out hover:opacity-90 ${
        matchHeaderHeight ? "h-16 shrink-0" : ""
      } ${className}`}
      aria-label={`${SITE_NAME} home`}
    >
      <span className="relative inline-flex shrink-0 overflow-hidden">
        <Image
          src="/image/logo2.png"
          alt=""
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className={`${imageClass} relative z-0 block dark:hidden`}
          unoptimized
          priority
        />
        <Image
          src="/image/logo1.png"
          alt=""
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className={`${imageClass} relative z-0 hidden dark:block`}
          unoptimized
          priority
        />
        <span className="logo-shine-overlay" aria-hidden />
      </span>
    </Link>
  );
}
