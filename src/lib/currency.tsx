"use client";

/**
 * Currency — prices are stored in XOF and converted for display.
 * XOF: "45 000 FCFA" · EUR: "€69" · USD: "$75". Persisted in localStorage.
 */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCallback } from "react";
import { currencies } from "./site-config";
import type { CurrencyCode } from "./types";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  length: 0,
  clear: () => undefined,
  key: () => null,
};

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "XOF",
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "oraya-currency",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : memoryStorage
      ),
    }
  )
);

function formatXof(value: number): string {
  const rounded = Math.round(value);
  const grouped = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${rounded < 0 ? "-" : ""}${grouped} FCFA`;
}

/** Format an XOF amount in the active currency. */
export function useCurrency() {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  const format = useCallback(
    (xof: number): string => {
      const conf = currencies.find((c) => c.code === currency) ?? currencies[0];
      const value = xof / conf.rate;
      if (conf.code === "XOF") return formatXof(value);
      const grouped = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return `${conf.symbol}${grouped}`;
    },
    [currency]
  );

  return { currency, setCurrency, format };
}
