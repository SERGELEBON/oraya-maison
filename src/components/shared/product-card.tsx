"use client";

/**
 * Product card — square image, title, price (sale color), emerald add-to-cart.
 * `compact` variant is used in the shop grid (14px bold title).
 */
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Price } from "./price";

export function ProductCard({
  product,
  compact = false,
  className,
  eager = false,
}: {
  product: Product;
  compact?: boolean;
  className?: string;
  eager?: boolean;
}) {
  const { t, tx } = useI18n();
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const href = `#/produit/${product.slug}`;

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      key: `${product.slug}`,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      unitPriceXof: product.priceXof,
    });
    toast.success(product.name, { description: t("nav.addedToCart") });
  };

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[6px] bg-white",
        className
      )}
    >
      <a
        href={href}
        className="relative block aspect-square overflow-hidden bg-ivory/60"
        aria-label={product.name}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {product.isNew && (
            <span className="label-caps rounded-[3px] bg-gold px-2 py-[3px] text-[10px] font-semibold text-ink">
              {t("badge.new")}
            </span>
          )}
          {product.isBestseller && (
            <span className="label-caps rounded-[3px] bg-emerald px-2 py-[3px] text-[10px] font-semibold text-ivory">
              {t("badge.bestseller")}
            </span>
          )}
          {product.compareAtXof && (
            <span className="label-caps rounded-[3px] bg-sale px-2 py-[3px] text-[10px] font-semibold text-white">
              {t("badge.promo")}
            </span>
          )}
        </div>
      </a>

      <div className="flex flex-1 flex-col px-2 pt-3 pb-2 text-center">
        <a
          href={href}
          className={cn(
            "font-semibold text-ink transition-colors hover:text-emerald",
            compact ? "text-[14px] leading-snug" : "text-[16px] leading-snug md:text-[18px]"
          )}
        >
          {product.name}
        </a>
        <div className="mt-1 flex items-baseline justify-center gap-2">
          <Price
            xof={product.priceXof}
            className={cn(
              "font-semibold",
              product.compareAtXof ? "text-sale" : "text-ink",
              compact ? "text-[14px]" : "text-[15px] md:text-[16px]"
            )}
          />
          {product.compareAtXof && (
            <Price
              xof={product.compareAtXof}
              strike
              className="text-[12px] font-medium text-body"
            />
          )}
        </div>

        <button
          type="button"
          onClick={onAdd}
          className={cn(
            "mt-3 inline-flex w-full items-center justify-center gap-1 rounded-[4px] bg-emerald uppercase tracking-[0.08em] text-ivory transition-colors hover:bg-emerald-dark",
            compact ? "h-9 text-[11px] font-medium" : "h-10 text-[12px] font-medium md:text-[13px]"
          )}
          aria-label={`${t("common.addToCartShort")} — ${product.name}`}
        >
          {compact ? t("common.addToCartShort") : t("product.addToCart")}
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

/** Small helper exported for grids that need the category label */
export function categoryLabelKey(slug: string): string {
  return `categories.${slug}`;
}
