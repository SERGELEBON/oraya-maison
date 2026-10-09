"use client";

/**
 * ORAYA Maison logo — ivory ring with a gold 4-point star on top,
 * "ORAYA" in wide-spaced serif capitals, "MAISON" in small spaced gold sans.
 * layout: "stacked" (brand lockup) · "horizontal" (header) · markOnly (favicon/bullet)
 * variant: "light" (on emerald) · "dark" (on white)
 */
import { cn } from "@/lib/utils";

const STAR_PATH =
  "M60 19 C61.2 29.5 64.5 32.8 75 34 C64.5 35.2 61.2 38.5 60 49 C58.8 38.5 55.5 35.2 45 34 C55.5 32.8 58.8 29.5 60 19 Z";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const SANS = "var(--font-figtree), Figtree, sans-serif";

export interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  layout?: "stacked" | "horizontal";
  markOnly?: boolean;
  onClick?: () => void;
}

export function Logo({
  variant = "light",
  className,
  layout = "stacked",
  markOnly = false,
  onClick,
}: LogoProps) {
  const light = variant === "light";
  const ringColor = light ? "#F2EFE7" : "#215E52";
  const nameColor = light ? "#F2EFE7" : "#0D0E11";
  const gold = "#D4B56A";

  if (markOnly) {
    return (
      <svg viewBox="18 4 84 84" className={cn("h-full w-auto", className)} role="img" aria-label="ORAYA" onClick={onClick}>
        <circle cx="60" cy="62" r="32" fill="none" stroke={ringColor} strokeWidth="4.5" />
        <path d={STAR_PATH} fill={gold} />
      </svg>
    );
  }

  if (layout === "horizontal") {
    return (
      <svg viewBox="0 0 350 104" className={cn("h-full w-auto", className)} role="img" aria-label="ORAYA Maison" onClick={onClick}>
        <circle cx="52" cy="56" r="32" fill="none" stroke={ringColor} strokeWidth="4.5" />
        <path d={STAR_PATH} fill={gold} transform="translate(-8,-8)" />
        <text x="110" y="64" fill={nameColor} fontSize="44" fontWeight={600} letterSpacing="0.24em" style={{ fontFamily: SERIF }}>
          ORAYA
        </text>
        <text x="113" y="96" fill={gold} fontSize="15" fontWeight={500} letterSpacing="0.5em" style={{ fontFamily: SANS }}>
          MAISON
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 176" className={cn("h-full w-auto", className)} role="img" aria-label="ORAYA Maison" onClick={onClick}>
      <text x="64" y="132" textAnchor="middle" fill={nameColor} fontSize="35" fontWeight={600} letterSpacing="0.26em" style={{ fontFamily: SERIF }}>
        ORAYA
      </text>
      <text x="63.5" y="162" textAnchor="middle" fill={gold} fontSize="12.5" fontWeight={500} letterSpacing="0.52em" style={{ fontFamily: SANS }}>
        MAISON
      </text>
      <circle cx="60" cy="62" r="32" fill="none" stroke={ringColor} strokeWidth="4.5" />
      <path d={STAR_PATH} fill={gold} />
    </svg>
  );
}

/** Small gold sparkle used as bullet / separator (from the logo star). */
export function StarSpark({ className, size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="30 4 60 48"
      width={size}
      height={size * 0.8}
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}
