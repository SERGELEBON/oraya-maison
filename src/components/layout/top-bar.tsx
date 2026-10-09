"use client";

/**
 * Top bar (white, 64px) — promo message left, currency + language selectors right.
 */
import { Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { currencies, type CurrencyConfig } from "@/lib/site-config";
import type { CurrencyCode, Lang } from "@/lib/types";
import { StarSpark } from "@/components/shared/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CurrencySelector() {
  const { t } = useI18n();
  const { currency, setCurrency } = useCurrency();
  const current = currencies.find((c) => c.code === currency) ?? currencies[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 items-center gap-1.5 rounded-[4px] px-2 text-[13px] font-medium text-ink outline-none transition-colors hover:bg-band"
        aria-label={t("topbar.currency")}
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.code === "XOF" ? "FCFA" : current.symbol + " " + current.code}</span>
        <ChevronDown size={13} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px] rounded-[6px]">
        {currencies.map((c: CurrencyConfig) => (
          <DropdownMenuItem
            key={c.code}
            onClick={() => setCurrency(c.code as CurrencyCode)}
            className="cursor-pointer gap-2 text-[13px]"
          >
            <span aria-hidden="true">{c.flag}</span>
            <span className="flex-1">
              {c.code === "XOF" ? "FCFA" : `${c.symbol} ${c.code}`}
            </span>
            {c.code === currency && <Check size={14} className="text-emerald" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageSelector() {
  const { lang, setLang, t } = useI18n();

  const options: Array<{ code: Lang; flag: string; label: string }> = [
    { code: "fr", flag: "🇫🇷", label: "Français" },
    { code: "en", flag: "🇬🇧", label: "English" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 items-center gap-1.5 rounded-[4px] px-2 text-[13px] font-medium text-ink outline-none transition-colors hover:bg-band"
        aria-label={t("topbar.language")}
      >
        <span aria-hidden="true">{lang === "fr" ? "🇫🇷" : "🇬🇧"}</span>
        <span className="hidden sm:inline">{lang === "fr" ? "Français" : "English"}</span>
        <ChevronDown size={13} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px] rounded-[6px]">
        {options.map((o) => (
          <DropdownMenuItem
            key={o.code}
            onClick={() => setLang(o.code)}
            className="cursor-pointer gap-2 text-[13px]"
          >
            <span aria-hidden="true">{o.flag}</span>
            <span className="flex-1">{o.label}</span>
            {o.code === lang && <Check size={14} className="text-emerald" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopBar() {
  const { t } = useI18n();
  return (
    <div className="border-b border-hairline bg-white">
      <div className="container-x flex h-12 items-center justify-between gap-2 md:h-16">
        <p className="flex min-w-0 items-center gap-2 text-[12px] font-semibold tracking-wide text-ink md:text-[13px]">
          <StarSpark size={11} className="spin-slow shrink-0 text-gold-dark" />
          <span className="truncate">{t("topbar.promo")}</span>
        </p>
        <div className="flex items-center gap-1 md:gap-2">
          <CurrencySelector />
          <span className="h-4 w-px bg-hairline" aria-hidden="true" />
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
