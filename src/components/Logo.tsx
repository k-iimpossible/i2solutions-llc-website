import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

/** Intrinsic size of `public/image/i2_logo.png` (platform logo) */
const PLATFORM_LOGO_WIDTH = 799;
const PLATFORM_LOGO_HEIGHT = 104;

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
    ? "h-8 w-auto max-h-14 object-contain"
    : "h-8 w-auto sm:h-10 object-contain";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-opacity duration-200 ease-in-out hover:opacity-90 ${
        matchHeaderHeight ? "h-16 shrink-0" : ""
      } ${className}`}
      aria-label={`${SITE_NAME} home`}
    >
      <Image
        src="/image/i2_logo.png"
        alt=""
        width={PLATFORM_LOGO_WIDTH}
        height={PLATFORM_LOGO_HEIGHT}
        className={imageClass}
        unoptimized
        priority
      />
    </Link>
  );
}
