"use client";

/**
 * I18n — flat-key dictionaries loaded from /i18n/fr.json and /i18n/en.json.
 * Default language: FR. Choice persisted in localStorage (zustand persist,
 * rehydrates after mount → no hydration mismatch).
 */
import fr from "../../i18n/fr.json";
import en from "../../i18n/en.json";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCallback } from "react";
import type { Lang } from "./types";

const dictionaries: Record<Lang, unknown> = { fr, en };

function dig(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match
  );
}

interface I18nState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  length: 0,
  clear: () => undefined,
  key: () => null,
};

const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      lang: "fr",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "oraya-lang",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : memoryStorage
      ),
    }
  )
);

/** Translate a flat/nested key to a string (falls back to FR, then to the key). */
export function useI18n() {
  const lang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const raw = dig(dictionaries[lang], key) ?? dig(dictionaries.fr, key);
      if (typeof raw === "string") return interpolate(raw, vars);
      if (typeof raw === "number") return String(raw);
      return key;
    },
    [lang]
  );

  const tx = useCallback(
    <T,>(key: string): T => ((dig(dictionaries[lang], key) ?? dig(dictionaries.fr, key)) as T),
    [lang]
  );

  return { lang, setLang, t, tx };
}
