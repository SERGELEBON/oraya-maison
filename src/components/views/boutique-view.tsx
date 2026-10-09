"use client";

/**
 * Boutique — catalogue view with URL-driven filters.
 *
 * URL state (hash query):  cat (category slug) · mat (material slug) ·
 *                          tag (nouveautes | best-sellers | homme) · promo=1.
 * Local state:             price bucket · sort · page (12 products / page).
 *
 * Desktop: sticky 240px filter sidebar — Mobile: “Filtres” button → Sheet.
 * Category / material selections go through navigate() (URL state), price
 * bucket and sort stay local. Pagination resets on URL change via a
 * requestAnimationFrame pattern (no setState inside effects).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useRouter } from "@/lib/router";
import { CATEGORY_LIST, MATERIAL_LIST, products } from "@/data/products";
import type { CategorySlug, MaterialSlug, Product } from "@/lib/types";
import { ProductCard } from "@/components/shared/product-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Constants & pure helpers                                            */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 12;

type PriceBucket = "any" | "p1" | "p2" | "p3" | "p4";
type SortKey = "new" | "price-asc" | "price-desc" | "popular";

const SORT_KEYS: SortKey[] = ["new", "price-asc", "price-desc", "popular"];
const PRICE_BUCKETS: PriceBucket[] = ["any", "p1", "p2", "p3", "p4"];
const TAGS = ["nouveautes", "best-sellers", "homme"] as const;

const BUCKET_KEYS: Record<PriceBucket, string> = {
  any: "shop.priceAny",
  p1: "shop.price1",
  p2: "shop.price2",
  p3: "shop.price3",
  p4: "shop.price4",
};

/** Strings with no i18n key (a11y labels only). */
const BREADCRUMB_LABEL: Record<"fr" | "en", string> = {
  fr: "Fil d'Ariane",
  en: "Breadcrumb",
};
const SHEET_DESC: Record<"fr" | "en", string> = {
  fr: "Filtrer les bijoux par catégorie, matière et prix.",
  en: "Filter the jewelry by category, material and price.",
};
const PAGINATION_LABEL: Record<"fr" | "en", string> = {
  fr: "Pagination de la boutique",
  en: "Shop pagination",
};

function isCategory(v: string | undefined): v is CategorySlug {
  return !!v && (CATEGORY_LIST as string[]).includes(v);
}
function isMaterial(v: string | undefined): v is MaterialSlug {
  return !!v && (MATERIAL_LIST as string[]).includes(v);
}
function isTag(v: string | undefined): v is (typeof TAGS)[number] {
  return !!v && (TAGS as readonly string[]).includes(v);
}

/** Price bucket bounds in XOF: <10k · 10–25k · 25–50k · >50k. */
function inBucket(price: number, bucket: PriceBucket): boolean {
  switch (bucket) {
    case "p1":
      return price < 10_000;
    case "p2":
      return price >= 10_000 && price < 25_000;
    case "p3":
      return price >= 25_000 && price < 50_000;
    case "p4":
      return price >= 50_000;
    default:
      return true;
  }
}

/** Builds a /boutique URL with a stable param order (cat, mat, tag, promo). */
function shopUrl(params: {
  cat?: CategorySlug;
  mat?: MaterialSlug;
  tag?: string;
  promo?: boolean;
}): string {
  const q = new URLSearchParams();
  if (params.cat) q.set("cat", params.cat);
  if (params.mat) q.set("mat", params.mat);
  if (params.tag) q.set("tag", params.tag);
  if (params.promo) q.set("promo", "1");
  const qs = q.toString();
  return qs ? `/boutique?${qs}` : "/boutique";
}

function sortList(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "price-asc":
      copy.sort((a, b) => a.priceXof - b.priceXof);
      break;
    case "price-desc":
      copy.sort((a, b) => b.priceXof - a.priceXof);
      break;
    case "popular":
      copy.sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      /* Nouveautés: new arrivals first, then best rated. */
      copy.sort(
        (a, b) =>
          Number(b.isNew ?? false) - Number(a.isNew ?? false) || b.rating - a.rating
      );
  }
  return copy;
}

/** 1 … (current ±1) … N — collapses long ranges with ellipses. */
function pageWindow(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Filter UI atoms (module level — never inside a component)           */
/* ------------------------------------------------------------------ */

function FilterLink({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group flex items-center gap-2 py-[5px] text-left text-[14px] leading-snug transition-colors",
        active ? "font-medium text-emerald" : "text-body hover:text-emerald"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-[5px] shrink-0 rounded-full transition-colors",
          active ? "bg-gold" : "bg-hairline group-hover:bg-gold/70"
        )}
      />
      {label}
    </button>
  );
}

function PriceOption({
  active,
  label,
  onSelect,
}: {
  active: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2.5 py-[5px] text-left text-[14px] leading-snug transition-colors",
        active ? "font-medium text-emerald" : "text-body hover:text-emerald"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-[15px] shrink-0 items-center justify-center rounded-full border transition-colors",
          active ? "border-emerald" : "border-hairline"
        )}
      >
        {active && <span className="size-[7px] rounded-full bg-gold" />}
      </span>
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Filter panel — shared by desktop sidebar and mobile Sheet           */
/* ------------------------------------------------------------------ */

function FilterPanel({
  cat,
  mat,
  tag,
  promo,
  priceBucket,
  onPrice,
  onClear,
  onAfterNavigate,
}: {
  cat: CategorySlug | undefined;
  mat: MaterialSlug | undefined;
  tag: string | undefined;
  promo: boolean;
  priceBucket: PriceBucket;
  onPrice: (bucket: PriceBucket) => void;
  onClear: () => void;
  onAfterNavigate?: () => void;
}) {
  const { t } = useI18n();
  const navigate = useRouter().navigate;

  const go = (url: string) => {
    navigate(url);
    onAfterNavigate?.();
  };

  return (
    <div className="space-y-8">
      {/* Catégorie — picking one drops the tag (mutually exclusive). */}
      <div>
        <h3 className="label-caps mb-3 text-[12px] font-semibold text-ink">
          {t("shop.category")}
        </h3>
        <FilterLink
          active={!cat && !tag}
          label={t("categories.all")}
          onClick={() => go(shopUrl({ mat, promo }))}
        />
        {CATEGORY_LIST.map((c) => (
          <FilterLink
            key={c}
            active={cat === c}
            label={t(`categories.${c}`)}
            onClick={() => go(shopUrl({ cat: c, mat, promo }))}
          />
        ))}
      </div>

      {/* Matière — single-select, toggleable. */}
      <div>
        <h3 className="label-caps mb-3 text-[12px] font-semibold text-ink">
          {t("shop.material")}
        </h3>
        {MATERIAL_LIST.map((m) => (
          <FilterLink
            key={m}
            active={mat === m}
            label={t(`materials.${m}`)}
            onClick={() =>
              go(shopUrl({ cat, mat: mat === m ? undefined : m, tag, promo }))
            }
          />
        ))}
      </div>

      {/* Prix — local radio (never in the URL). */}
      <div>
        <h3 className="label-caps mb-3 text-[12px] font-semibold text-ink">
          {t("shop.price")}
        </h3>
        <div role="radiogroup" aria-label={t("shop.price")}>
          {PRICE_BUCKETS.map((b) => (
            <PriceOption
              key={b}
              active={priceBucket === b}
              label={t(BUCKET_KEYS[b])}
              onSelect={() => onPrice(b)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="label-caps w-full rounded-[4px] border border-hairline px-4 py-2.5 text-[11px] font-semibold text-body transition-colors hover:border-emerald hover:text-emerald"
      >
        {t("shop.clear")}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

export default function BoutiqueView() {
  const { t, lang } = useI18n();
  const { route, navigate } = useRouter();

  /* ---- URL state (validated) -------------------------------------- */
  const q = route.query;
  const cat = isCategory(q.cat) ? q.cat : undefined;
  const mat = isMaterial(q.mat) ? q.mat : undefined;
  const tag = isTag(q.tag) ? q.tag : undefined;
  const promo = q.promo === "1";

  /* ---- Local state ------------------------------------------------- */
  const [priceBucket, setPriceBucket] = useState<PriceBucket>("any");
  const [sort, setSort] = useState<SortKey>("new");
  const [page, setPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);

  /* Reset pagination when the URL changes from outside the view
     (header links, back button). rAF pattern — never a sync setState
     inside the effect body. */
  const lastRouteRef = useRef(route.full);
  useEffect(() => {
    if (lastRouteRef.current === route.full) return;
    lastRouteRef.current = route.full;
    requestAnimationFrame(() => setPage(1));
  }, [route.full]);

  /* ---- Derived data ------------------------------------------------ */
  const filtered = useMemo(() => {
    let list: Product[] = products;
    if (cat) list = list.filter((p) => p.category === cat);
    if (mat) list = list.filter((p) => p.materials.includes(mat));
    if (tag === "nouveautes") list = list.filter((p) => p.isNew);
    else if (tag === "best-sellers") list = list.filter((p) => p.isBestseller);
    else if (tag === "homme") list = list.filter((p) => p.forMen);
    if (promo) list = list.filter((p) => p.compareAtXof !== undefined);
    if (priceBucket !== "any") list = list.filter((p) => inBucket(p.priceXof, priceBucket));
    return list;
  }, [cat, mat, tag, promo, priceBucket]);

  const sorted = useMemo(() => sortList(filtered, sort), [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => sorted.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    [sorted, current]
  );

  /* ---- Labels (title = filter priority: tag > mat > promo > cat) --- */
  const filterLabel =
    tag === "nouveautes"
      ? t("shop.newTitle")
      : tag === "best-sellers"
        ? t("shop.bestsellersTitle")
        : tag === "homme"
          ? t("shop.menTitle")
          : mat
            ? t(`materials.${mat}`)
            : promo
              ? t("shop.promoTitle")
              : cat
                ? t(`categories.${cat}`)
                : undefined;
  const title = filterLabel ?? t("shop.allProductsTitle");

  /* ---- Handlers ---------------------------------------------------- */
  const resultsRef = useRef<HTMLDivElement>(null);

  const goToPage = (next: number) => {
    if (next < 1 || next > totalPages || next === current) return;
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrice = (bucket: PriceBucket) => {
    setPriceBucket(bucket);
    setPage(1);
  };

  const handleSort = (value: string) => {
    setSort((SORT_KEYS as string[]).includes(value) ? (value as SortKey) : "new");
    setPage(1);
  };

  const handleClear = () => {
    setPriceBucket("any");
    setPage(1);
    setSheetOpen(false);
    navigate("/boutique");
  };

  const closeSheet = () => setSheetOpen(false);

  /* ---- Render ------------------------------------------------------ */
  return (
    <div className="container-x pb-16 md:pb-24">
      {/* Breadcrumb */}
      <nav
        aria-label={BREADCRUMB_LABEL[lang]}
        className="flex items-center gap-1.5 border-b border-hairline pt-6 pb-4 text-[13px] md:pt-8"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-body transition-colors hover:text-emerald"
        >
          {t("shop.breadcrumbHome")}
        </button>
        <ChevronRight size={12} className="shrink-0 text-body/50" aria-hidden="true" />
        {filterLabel ? (
          <>
            <button
              type="button"
              onClick={() => navigate("/boutique")}
              className="text-body transition-colors hover:text-emerald"
            >
              {t("shop.title")}
            </button>
            <ChevronRight size={12} className="shrink-0 text-body/50" aria-hidden="true" />
            <span aria-current="page" className="font-medium text-ink">
              {filterLabel}
            </span>
          </>
        ) : (
          <span aria-current="page" className="font-medium text-ink">
            {t("shop.title")}
          </span>
        )}
      </nav>

      {/* Title + results count */}
      <header className="pt-8 pb-8 md:pt-10 md:pb-10">
        <h1 className="font-serif text-[30px] leading-[1.05] font-semibold text-emerald md:text-[40px]">
          {title}
        </h1>
        <p className="mt-2.5 text-[14px] text-body">
          {t("shop.results", { count: sorted.length })}
        </p>
      </header>

      <div className="flex items-start gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-28">
            <FilterPanel
              cat={cat}
              mat={mat}
              tag={tag}
              promo={promo}
              priceBucket={priceBucket}
              onPrice={handlePrice}
              onClear={handleClear}
            />
          </div>
        </aside>

        {/* Results */}
        <section className="min-w-0 flex-1" aria-label={title}>
          {/* Toolbar: mobile filters + sort */}
          <div
            ref={resultsRef}
            className="flex flex-wrap items-center justify-between gap-3 scroll-mt-24 pb-6"
          >
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-[4px] border border-hairline bg-white px-4 text-[13px] font-medium text-ink transition-colors hover:border-emerald hover:text-emerald lg:hidden"
                >
                  <SlidersHorizontal size={15} className="text-emerald" aria-hidden="true" />
                  {t("shop.filters")}
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] max-w-[85vw] overflow-y-auto sm:max-w-[300px]"
                aria-describedby={undefined}
              >
                <SheetHeader className="px-6 pt-7 pb-5">
                  <SheetTitle className="font-serif text-[22px] font-semibold text-ink">
                    {t("shop.filters")}
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    {SHEET_DESC[lang]}
                  </SheetDescription>
                </SheetHeader>
                <div className="px-6 pb-8">
                  <FilterPanel
                    cat={cat}
                    mat={mat}
                    tag={tag}
                    promo={promo}
                    priceBucket={priceBucket}
                    onPrice={handlePrice}
                    onClear={handleClear}
                    onAfterNavigate={closeSheet}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2.5">
              <span className="hidden text-[13px] text-body md:inline">
                {t("shop.sort")}
              </span>
              <Select value={sort} onValueChange={handleSort}>
                <SelectTrigger
                  size="sm"
                  aria-label={t("shop.sort")}
                  className="h-9 w-[170px] rounded-[4px] border-hairline bg-white text-[13px] text-ink shadow-none md:w-[190px]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[6px] border-hairline">
                  <SelectItem value="new">{t("shop.sortNew")}</SelectItem>
                  <SelectItem value="price-asc">{t("shop.sortPriceAsc")}</SelectItem>
                  <SelectItem value="price-desc">{t("shop.sortPriceDesc")}</SelectItem>
                  <SelectItem value="popular">{t("shop.sortPopular")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {pageItems.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center gap-5 py-16 text-center md:py-24">
              <p className="max-w-sm text-[15px] leading-relaxed text-body">
                {t("shop.empty")}
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="label-caps rounded-[4px] border border-emerald px-6 py-3 text-[12px] font-semibold text-emerald transition-colors hover:bg-emerald hover:text-ivory"
              >
                {t("shop.emptyCta")}
              </button>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {pageItems.map((p, i) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    compact
                    eager={current === 1 && i < 4}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label={PAGINATION_LABEL[lang]}
                  className="mt-12 flex flex-col items-center gap-3.5"
                >
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    <button
                      type="button"
                      disabled={current === 1}
                      onClick={() => goToPage(current - 1)}
                      className="inline-flex h-9 items-center gap-1 rounded-[4px] border border-hairline px-3 text-[13px] font-medium text-body transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40"
                    >
                      <ChevronLeft size={15} aria-hidden="true" />
                      <span className="hidden sm:inline">{t("shop.prev")}</span>
                    </button>
                    {pageWindow(current, totalPages).map((p, idx) =>
                      p === "…" ? (
                        <span
                          key={`gap-${idx}`}
                          aria-hidden="true"
                          className="px-1 text-[13px] text-body/60"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          type="button"
                          onClick={() => goToPage(p)}
                          aria-current={p === current ? "page" : undefined}
                          className={cn(
                            "flex h-9 min-w-9 items-center justify-center rounded-[4px] border px-2 text-[13px] font-medium transition-colors",
                            p === current
                              ? "border-emerald bg-emerald text-ivory"
                              : "border-hairline text-body hover:border-emerald hover:text-emerald"
                          )}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      type="button"
                      disabled={current === totalPages}
                      onClick={() => goToPage(current + 1)}
                      className="inline-flex h-9 items-center gap-1 rounded-[4px] border border-hairline px-3 text-[13px] font-medium text-body transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40"
                    >
                      <span className="hidden sm:inline">{t("shop.next")}</span>
                      <ChevronRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-[13px] text-body">
                    {t("shop.page", { page: current, total: totalPages })}
                  </p>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
