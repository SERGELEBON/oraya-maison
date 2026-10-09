"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** 5 gold stars — filled according to rating. */
export function StarRating({
  rating,
  className,
  size = 14,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-[2px]", className)}
      role="img"
      aria-label={`${rating}/5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={cn(
            i <= Math.round(rating) ? "fill-gold text-gold" : "fill-transparent text-[#D9D4C7]"
          )}
        />
      ))}
    </span>
  );
}
