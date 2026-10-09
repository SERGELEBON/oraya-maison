"use client";

import { cn } from "@/lib/utils";

/** Grey carousel dots (mandilax motif) — active dot stretches into a pill. */
export function CarouselDots({
  count,
  active,
  onSelect,
  className,
  tone = "light",
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (count <= 1) return null;
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} role="tablist">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Dot ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "h-[7px] rounded-full transition-all duration-300",
            i === active
              ? tone === "dark"
                ? "w-7 bg-gold"
                : "w-7 bg-emerald"
              : tone === "dark"
                ? "w-[7px] bg-white/40 hover:bg-white/70"
                : "w-[7px] bg-[#CFC9BA] hover:bg-[#B7B0A0]"
          )}
        />
      ))}
    </div>
  );
}
