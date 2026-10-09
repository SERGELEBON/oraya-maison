"use client";

/**
 * Hash router — the whole shop lives on "/" (single user-visible route).
 * Internal navigation uses location.hash, e.g.:
 *   #/boutique?cat=colliers   #/produit/collier-luna   #/infos/entretien
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export interface Route {
  /** e.g. "/boutique" */
  path: string;
  /** e.g. ["boutique"] */
  segments: string[];
  /** query params as a plain object */
  query: Record<string, string>;
  full: string;
}

export interface RouterContextValue {
  route: Route;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "") || "/";
  const [pathname, search = ""] = raw.split("?");
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = cleanPath.split("/").filter(Boolean);
  const query: Record<string, string> = {};
  new URLSearchParams(search).forEach((value, key) => {
    query[key] = value;
  });
  return { path: cleanPath, segments, query, full: raw };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [hash, setHash] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
      const next = parseHash(window.location.hash).path;
      if (lastPathRef.current !== null && lastPathRef.current !== next) {
        window.scrollTo({ top: 0 });
      }
      lastPathRef.current = next;
    };
    window.addEventListener("hashchange", onHashChange);
    lastPathRef.current = parseHash(window.location.hash).path;
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const route = useMemo(() => parseHash(hash), [hash]);

  const navigate = useCallback((to: string) => {
    const next = to.startsWith("#") ? to : `#${to.startsWith("/") ? to : `/${to}`}`;
    if (window.location.hash === next) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = next;
  }, []);

  const value = useMemo(() => ({ route, navigate }), [route, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

/** Convenience hook used by links */
export function useNavigate() {
  return useRouter().navigate;
}
