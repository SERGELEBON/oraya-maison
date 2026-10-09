"use client";

/**
 * Cart view (#/panier) — cart lines with qty steppers, free-shipping
 * progress bar and order summary. Prices are stored in XOF (CartItem).
 */
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Price } from "@/components/shared/price";
import { Separator } from "@/components/ui/separator";
import { cartCount, cartSubtotalXof, useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useI18n } from "@/lib/i18n";
import { useRouter } from "@/lib/router";
import { site } from "@/lib/site-config";
import type { CartItem } from "@/lib/types";

/* Local fallbacks (no i18n key yet) */
const QTY_LABELS = {
  decrease: { fr: "Réduire la quantité", en: "Decrease quantity" },
  increase: { fr: "Augmenter la quantité", en: "Increase quantity" },
} as const;

/* -------------------------------- Qty stepper ------------------------------- */

function QtyStepper({
  qty,
  onDec,
  onInc,
  decLabel,
  incLabel,
}: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
  decLabel: string;
  incLabel: string;
}) {
  return (
    <div className="inline-flex items-center rounded-[4px] border border-hairline bg-white">
      <button
        type="button"
        onClick={onDec}
        aria-label={decLabel}
        className="flex h-8 w-8 items-center justify-center rounded-l-[4px] text-ink transition-colors hover:bg-band"
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <span className="w-9 text-center text-[14px] font-semibold text-ink" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={incLabel}
        className="flex h-8 w-8 items-center justify-center rounded-r-[4px] text-ink transition-colors hover:bg-band"
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/* --------------------------------- Cart line -------------------------------- */

interface CartLineProps {
  item: CartItem;
  optionsLabel: string;
  removeTitle: string;
  decLabel: string;
  incLabel: string;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onOpen: (slug: string) => void;
}

function CartLine({
  item,
  optionsLabel,
  removeTitle,
  decLabel,
  incLabel,
  onSetQty,
  onRemove,
  onOpen,
}: CartLineProps) {
  const optionsText =
    item.options && Object.keys(item.options).length > 0
      ? Object.entries(item.options)
          .map(([k, v]) => `${k} : ${v}`)
          .join(" · ")
      : null;

  return (
    <li className="flex gap-4 rounded-[8px] border border-hairline bg-white p-4">
      <button
        type="button"
        onClick={() => onOpen(item.slug)}
        aria-label={item.name}
        className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[6px]"
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </button>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onOpen(item.slug)}
              className="text-left text-[15px] font-semibold leading-snug text-ink transition-colors hover:text-emerald"
            >
              {item.name}
            </button>
            {optionsText && (
              <p className="mt-1 text-[12px] text-body">
                {optionsLabel} : {optionsText}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.key)}
            aria-label={removeTitle}
            className="shrink-0 rounded-[4px] p-1 text-body/60 transition-colors hover:bg-band hover:text-sale"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <QtyStepper
            qty={item.qty}
            onDec={() => onSetQty(item.key, item.qty - 1)}
            onInc={() => onSetQty(item.key, item.qty + 1)}
            decLabel={decLabel}
            incLabel={incLabel}
          />
          <Price xof={item.unitPriceXof * item.qty} className="text-[15px] font-semibold text-ink" />
        </div>
      </div>
    </li>
  );
}

/* ----------------------------------- View ----------------------------------- */

export default function CartView() {
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const { navigate } = useRouter();
  const { items, setQty, remove } = useCart();

  const count = cartCount(items);
  const subtotal = cartSubtotalXof(items);
  const threshold = site.freeShippingThresholdXof;
  const remaining = threshold - subtotal;
  const progress = Math.min(100, (subtotal / threshold) * 100);

  /* ------------------------------- Empty cart ------------------------------ */
  if (items.length === 0) {
    return (
      <div className="container-x flex flex-col items-center py-20 text-center md:py-28">
        <ShoppingBag size={48} className="text-gold" aria-hidden="true" />
        <h1 className="mt-6 font-serif text-[30px] font-semibold text-ink md:text-[40px]">
          {t("cart.empty")}
        </h1>
        <p className="mt-3 max-w-[420px] text-[15px] text-body">{t("cart.emptyText")}</p>
        <button
          type="button"
          onClick={() => navigate("/boutique")}
          className="label-caps mt-8 inline-flex h-[50px] items-center justify-center rounded-[4px] bg-emerald px-10 text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
        >
          {t("cart.emptyCta")}
        </button>
      </div>
    );
  }

  return (
    <div className="container-x py-8 md:py-12">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-[30px] font-semibold text-ink md:text-[40px]">
          {t("cart.title")}
        </h1>
        <span className="rounded-full bg-band px-3 py-1 text-[12px] font-semibold text-body">
          {count} {count === 1 ? t("cart.item") : t("cart.items")}
        </span>
      </div>

      <div className="mt-6 grid items-start gap-8 md:mt-8 lg:grid-cols-[1fr_360px]">
        {/* Left — free-shipping progress + cart lines */}
        <div>
          {remaining > 0 ? (
            <div className="rounded-[8px] border border-hairline bg-ivory p-4">
              <p className="text-[13px] font-medium text-body">
                {t("cart.freeShippingProgress", { amount: format(remaining) })}
              </p>
              <div
                className="mt-2.5 h-2 rounded-full bg-band"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="h-full rounded-full bg-gold transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="flex items-center gap-2 rounded-[8px] border border-emerald/30 bg-emerald/5 p-4 text-[13px] font-semibold text-emerald">
              <Check size={16} aria-hidden="true" />
              {t("cart.freeShippingReached")}
            </p>
          )}

          <ul className="custom-scroll mt-4 max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <CartLine
                key={item.key}
                item={item}
                optionsLabel={t("cart.options")}
                removeTitle={t("cart.removeTitle")}
                decLabel={QTY_LABELS.decrease[lang]}
                incLabel={QTY_LABELS.increase[lang]}
                onSetQty={setQty}
                onRemove={remove}
                onOpen={(slug) => navigate(`/produit/${slug}`)}
              />
            ))}
          </ul>
        </div>

        {/* Right — order summary */}
        <aside className="rounded-[8px] border border-hairline bg-white p-6">
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-body">{t("cart.subtotal")}</span>
            <Price xof={subtotal} className="font-semibold text-ink" />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-body">{t("cart.shipping")}</span>
            <span className="text-right text-[13px] text-body">{t("cart.shippingCalc")}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-ink">{t("cart.total")}</span>
            <Price xof={subtotal} className="text-[20px] font-bold text-ink" />
          </div>

          <button
            type="button"
            onClick={() => navigate("/commande")}
            className="label-caps mt-6 h-[50px] w-full rounded-[4px] bg-emerald text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
          >
            {t("cart.checkout")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/boutique")}
            className="mt-3 w-full text-[13px] font-semibold text-emerald underline-offset-4 transition-colors hover:underline"
          >
            {t("cart.continue")}
          </button>
        </aside>
      </div>
    </div>
  );
}
