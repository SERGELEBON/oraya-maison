"use client";

/** Formatted price in the active currency (XOF default). */
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function Price({
  xof,
  className,
  strike = false,
}: {
  xof: number;
  className?: string;
  strike?: boolean;
}) {
  const { format } = useCurrency();
  return (
    <span className={cn(strike && "line-through opacity-60", className)}>
      {format(xof)}
    </span>
  );
}
