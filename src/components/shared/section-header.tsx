"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { StarSpark } from "./logo";

/** Section title block — optional gold eyebrow, serif title (32 → 50px), optional subtitle. */
export function SectionHeader({
  titleKey,
  eyebrowKey,
  subtitleKey,
  className,
  align = "center",
  light = false,
}: {
  titleKey: string;
  eyebrowKey?: string;
  subtitleKey?: string;
  className?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const { t } = useI18n();
  const centered = align === "center";
  return (
    <div className={cn(centered ? "text-center" : "text-left", className)}>
      {eyebrowKey && (
        <p
          className={cn(
            "label-caps mb-3 flex items-center gap-2 text-[13px] font-semibold",
            centered && "justify-center",
            light ? "text-gold" : "text-gold-dark"
          )}
        >
          <StarSpark size={10} className="text-gold" />
          {t(eyebrowKey)}
          <StarSpark size={10} className="text-gold" />
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-[32px] leading-[1.08] font-semibold md:text-[44px] lg:text-[50px]",
          light ? "text-ivory" : "text-ink"
        )}
      >
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p className={cn("mt-3 text-[16px] md:text-[20px]", light ? "text-ivory/80" : "text-body")}>
          {t(subtitleKey)}
        </p>
      )}
    </div>
  );
}

/** Thin gold divider with a small ✦ star — used before related items. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-2", className)} aria-hidden="true">
      <span className="h-[2px] w-16 bg-gold md:w-24" />
      <StarSpark size={12} className="text-gold" />
      <span className="h-[2px] w-16 bg-gold md:w-24" />
    </div>
  );
}
