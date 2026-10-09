"use client";

/**
 * Product detail view — #/produit/:slug
 * Gallery with cursor-tracking hover zoom, variant pills, custom fields
 * (prénom / photo / gravure), guarantees, WhatsApp ordering, related carousel.
 */
import { useRef, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Gift,
  RefreshCw,
  ShieldCheck,
  Truck,
  ZoomIn,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { useRouter } from "@/lib/router";
import { useCart } from "@/lib/cart";
import { getProduct, relatedProducts } from "@/data/products";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Price } from "@/components/shared/price";
import { StarRating } from "@/components/shared/star-rating";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { GoldDivider } from "@/components/shared/section-header";
import { StarSpark } from "@/components/shared/logo";
import { WhatsAppIcon } from "@/components/shared/social-icons";

/* ------------------------------ module constants ----------------------------- */

/** 5 gold feature icons (order matches i18n product.featureIcons). */
const FEATURE_ICONS = [BadgeCheck, ShieldCheck, RefreshCw, Truck, Gift];
/** Guarantees 2×2 grid icons (order matches i18n product.guarantees). */
const GUARANTEE_ICONS = [Truck, RefreshCw, ShieldCheck, Clock];
/** Engraving font choices for "prénom" customization. */
const FONT_KEYS = ["script", "serif", "sans"] as const;
type FontKey = (typeof FONT_KEYS)[number];
type FinishKey = "gold" | "silver";

interface PillOption {
  value: string;
  label: string;
}

/* --------------------------------- sub views -------------------------------- */

/** Not found — centered message + back-to-shop button. */
function ProductNotFound() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  return (
    <div className="container-x flex flex-col items-center py-24 text-center md:py-32">
      <StarSpark size={30} className="text-gold" />
      <p className="mt-5 font-serif text-[24px] font-semibold text-ink md:text-[28px]">
        {t("product.notFound")}
      </p>
      <button
        type="button"
        onClick={() => navigate("/boutique")}
        className="mt-7 h-12 rounded-[4px] bg-emerald px-8 text-[13.5px] font-bold tracking-[0.1em] text-ivory uppercase transition-colors hover:bg-emerald-dark"
      >
        {t("product.backToShop")}
      </button>
    </div>
  );
}

/** Variant pill group — label + rounded pills (selected = emerald). */
function PillRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="label-caps text-[11px] font-semibold text-ink">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "h-11 rounded-full px-[18px] text-[13px] transition-colors",
                selected
                  ? "border-2 border-emerald bg-emerald/5 font-semibold text-emerald"
                  : "border border-hairline text-body hover:border-emerald/50 hover:text-ink"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Main image with cursor-tracking hover zoom + 72px thumbnail switcher. */
function ProductGallery({ product, zoomHint }: { product: Product; zoomHint: string }) {
  const [active, setActive] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  /** Direct DOM writes (allowed in handlers) — avoids a re-render per mousemove. */
  const setOrigin = (target: HTMLDivElement, clientX: number, clientY: number) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = target.getBoundingClientRect();
    const x = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    const y = Math.min(Math.max(((clientY - rect.top) / rect.height) * 100, 0), 100);
    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (!canHover()) return;
    const img = imgRef.current;
    if (!img) return;
    setOrigin(e.currentTarget, e.clientX, e.clientY);
    img.style.transform = "scale(1.5)";
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    setOrigin(e.currentTarget, e.clientX, e.clientY);
  };

  const handleLeave = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = "scale(1)";
  };

  return (
    <div>
      <div
        className="aspect-square cursor-zoom-in overflow-hidden rounded-[8px] bg-ivory"
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img
          ref={imgRef}
          src={product.images[active]}
          alt={product.name}
          loading="eager"
          className="h-full w-full object-cover transition-transform duration-200"
        />
      </div>
      <p className="mt-2 hidden items-center justify-center gap-1.5 text-[11px] text-body lg:flex">
        <ZoomIn size={12} aria-hidden="true" />
        {zoomHint}
      </p>
      {product.images.length > 1 && (
        <div className="mt-3 flex gap-2.5">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-pressed={i === active}
              aria-label={`${product.name} — ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[6px] transition-colors",
                i === active
                  ? "border-2 border-emerald"
                  : "border border-hairline hover:border-emerald/50"
              )}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ main detail view ----------------------------- */

function ProductDetail({ product }: { product: Product }) {
  const { lang, t, tx } = useI18n();
  const { format } = useCurrency();
  const add = useCart((s) => s.add);

  const variants = product.variants;
  // Lazy init is safe: ProductDetail is remounted per product via `key={slug}`.
  const [size, setSize] = useState<string>(() => variants?.sizes?.[0] ?? "");
  const [length, setLength] = useState<string>(() => variants?.lengths?.[0] ?? "");
  const [color, setColor] = useState<string>(() => variants?.colors?.[0] ?? "");
  const [customName, setCustomName] = useState("");
  const [customFont, setCustomFont] = useState<FontKey>("script");
  const [finish, setFinish] = useState<FinishKey>("gold");
  const [engraving, setEngraving] = useState("");

  const featureLabels = tx<Array<{ title: string }>>("product.featureIcons");
  const guarantees = tx<Array<{ title: string; text: string }>>("product.guarantees");

  const fontOptions: PillOption[] = FONT_KEYS.map((f) => ({
    value: f,
    label: t(`product.customFields.fonts.${f}`),
  }));
  const finishOptions: PillOption[] = [
    { value: "gold", label: t("product.customFields.finishGold") },
    { value: "silver", label: t("product.customFields.finishSilver") },
  ];

  const handleAddToCart = () => {
    const options: Record<string, string> = {};
    if (variants?.sizes && size) options[t("product.size")] = size;
    if (variants?.lengths && length) options[t("product.length")] = length;
    if (variants?.colors && color) options[t("product.color")] = t(`colorNames.${color}`);
    if (product.custom) {
      if (product.custom === "prenom" && customName.trim()) {
        options[t("product.customFields.name")] = customName.trim();
        options[t("product.customFields.font")] = t(`product.customFields.fonts.${customFont}`);
      }
      if (product.custom === "grave" && engraving.trim()) {
        options[t("product.customFields.engraving")] = engraving.trim();
      }
      options[t("product.customFields.finish")] = t(
        finish === "gold" ? "product.customFields.finishGold" : "product.customFields.finishSilver"
      );
    }
    const hasOptions = Object.keys(options).length > 0;
    add({
      key: hasOptions ? `${product.slug}|${JSON.stringify(options)}` : product.slug,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      unitPriceXof: product.priceXof,
      qty: 1,
      options: hasOptions ? options : undefined,
    });
    toast.success(product.name, { description: t("nav.addedToCart") });
  };

  return (
    <div className="container-x pt-6 pb-16 md:pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-[13px]">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-body">
          <li>
            <a href="#/" className="transition-colors hover:text-emerald">
              {t("common.home")}
            </a>
          </li>
          <li aria-hidden="true" className="text-body/50">
            /
          </li>
          <li>
            <a href="#/boutique" className="transition-colors hover:text-emerald">
              {t("nav.shop")}
            </a>
          </li>
          <li aria-hidden="true" className="text-body/50">
            /
          </li>
          <li>
            <a
              href={`#/boutique?cat=${product.category}`}
              className="transition-colors hover:text-emerald"
            >
              {t(`categories.${product.category}`)}
            </a>
          </li>
          <li aria-hidden="true" className="text-body/50">
            /
          </li>
          <li className="font-medium text-ink" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Gallery + details */}
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} zoomHint={t("product.zoomHint")} />

        <div>
          {/* Badges */}
          {(product.isNew || product.isBestseller || product.compareAtXof) && (
            <div className="flex flex-wrap items-center gap-2">
              {product.isNew && (
                <span className="label-caps rounded-[3px] bg-gold px-2.5 py-1 text-[10.5px] font-bold text-ink">
                  {t("badge.new")}
                </span>
              )}
              {product.isBestseller && (
                <span className="label-caps rounded-[3px] bg-emerald px-2.5 py-1 text-[10.5px] font-bold text-ivory">
                  {t("badge.bestseller")}
                </span>
              )}
              {product.compareAtXof && (
                <span className="label-caps rounded-[3px] bg-sale px-2.5 py-1 text-[10.5px] font-bold text-white">
                  {t("badge.promo")}
                </span>
              )}
            </div>
          )}

          <h1 className="mt-3 font-serif text-[26px] leading-tight font-semibold text-ink md:text-[30px]">
            {product.name}
          </h1>

          <div className="mt-2.5 flex items-center gap-2.5">
            <StarRating rating={product.rating} size={16} />
            <span className="text-[13px] text-body">
              {t("product.reviews", { count: product.reviews })}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Price
              xof={product.priceXof}
              className={cn(
                "text-[26px] font-bold md:text-[30px]",
                product.compareAtXof ? "text-sale" : "text-ink"
              )}
            />
            {product.compareAtXof && (
              <Price xof={product.compareAtXof} strike className="text-[16px] text-body" />
            )}
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-body">{product.short[lang]}</p>

          {/* 5 feature icons */}
          <div className="mt-5 grid grid-cols-5 gap-3 border-y border-hairline py-4">
            {featureLabels.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? BadgeCheck;
              return (
                <div key={f.title} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={22} className="text-gold-dark" aria-hidden="true" />
                  <span className="text-[10.5px] leading-tight text-body">{f.title}</span>
                </div>
              );
            })}
          </div>

          {/* Variants + custom fields + material */}
          <div className="mt-6 space-y-4">
            {variants?.sizes && (
              <PillRow
                label={t("product.size")}
                options={variants.sizes.map((s) => ({ value: s, label: s }))}
                value={size}
                onChange={setSize}
              />
            )}
            {variants?.lengths && (
              <PillRow
                label={t("product.length")}
                options={variants.lengths.map((l) => ({ value: l, label: l }))}
                value={length}
                onChange={setLength}
              />
            )}
            {variants?.colors && (
              <PillRow
                label={t("product.color")}
                options={variants.colors.map((c) => ({ value: c, label: t(`colorNames.${c}`) }))}
                value={color}
                onChange={setColor}
              />
            )}

            {product.custom === "prenom" && (
              <div className="space-y-4 rounded-[8px] border border-hairline bg-ivory/60 p-4">
                <div>
                  <label
                    htmlFor="oraya-custom-name"
                    className="label-caps text-[11px] font-semibold text-ink"
                  >
                    {t("product.customFields.name")}
                  </label>
                  <input
                    id="oraya-custom-name"
                    type="text"
                    value={customName}
                    maxLength={20}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={t("product.customFields.namePlaceholder")}
                    className="mt-2 h-11 w-full rounded-[4px] border border-hairline bg-white px-3.5 text-[14px] text-ink transition-colors placeholder:text-body/50 focus:border-emerald"
                  />
                </div>
                <PillRow
                  label={t("product.customFields.font")}
                  options={fontOptions}
                  value={customFont}
                  onChange={(v) => setCustomFont(v as FontKey)}
                />
                <PillRow
                  label={t("product.customFields.finish")}
                  options={finishOptions}
                  value={finish}
                  onChange={(v) => setFinish(v as FinishKey)}
                />
              </div>
            )}

            {product.custom === "photo" && (
              <div className="space-y-4 rounded-[8px] border border-hairline bg-ivory/60 p-4">
                <PillRow
                  label={t("product.customFields.finish")}
                  options={finishOptions}
                  value={finish}
                  onChange={(v) => setFinish(v as FinishKey)}
                />
                <div className="flex items-start gap-3">
                  <WhatsAppIcon size={22} className="mt-[1px] shrink-0 text-whatsapp" />
                  <p className="text-[13px] leading-relaxed text-body">
                    {t("product.customFields.photoHint")}
                  </p>
                </div>
              </div>
            )}

            {product.custom === "grave" && (
              <div className="space-y-4 rounded-[8px] border border-hairline bg-ivory/60 p-4">
                <div>
                  <label
                    htmlFor="oraya-engraving"
                    className="label-caps text-[11px] font-semibold text-ink"
                  >
                    {t("product.customFields.engraving")}
                  </label>
                  <input
                    id="oraya-engraving"
                    type="text"
                    value={engraving}
                    maxLength={30}
                    onChange={(e) => setEngraving(e.target.value)}
                    placeholder={t("product.customFields.engravingPlaceholder")}
                    className="mt-2 h-11 w-full rounded-[4px] border border-hairline bg-white px-3.5 text-[14px] text-ink transition-colors placeholder:text-body/50 focus:border-emerald"
                  />
                </div>
                <PillRow
                  label={t("product.customFields.finish")}
                  options={finishOptions}
                  value={finish}
                  onChange={(v) => setFinish(v as FinishKey)}
                />
              </div>
            )}

            <p className="text-[13px] text-body">
              <span className="font-semibold text-ink">{t("product.materialLabel")} : </span>
              {product.materials.map((m) => t(`materials.${m}`)).join(" · ")}
            </p>
          </div>

          {/* CTA row */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[4px] bg-emerald text-[13.5px] font-bold tracking-[0.12em] text-ivory uppercase transition-colors hover:bg-emerald-dark"
            >
              {t("product.addToCart")}
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <a
              href={whatsappLink(
                t("whatsapp.productMessage", {
                  name: product.name,
                  price: format(product.priceXof),
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[52px] items-center justify-center gap-2.5 rounded-[4px] border border-emerald px-6 text-[13.5px] font-bold whitespace-nowrap text-emerald transition-colors hover:bg-emerald/5"
            >
              <WhatsAppIcon size={20} className="text-whatsapp" />
              {t("product.orderWhatsapp")}
            </a>
          </div>

          {/* Guarantees 2×2 */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 rounded-[8px] bg-band/60 p-4">
            {guarantees.map((g, i) => {
              const Icon = GUARANTEE_ICONS[i] ?? ShieldCheck;
              return (
                <div key={g.title} className="flex items-start gap-3">
                  <Icon size={20} className="mt-[1px] shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{g.title}</p>
                    <p className="mt-0.5 text-[12px] leading-snug text-body">{g.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Long description + detail bullets */}
      <div className="mt-14 max-w-3xl">
        <h2 className="font-serif text-[24px] font-semibold text-ink md:text-[30px]">
          {t("product.detailsTitle")}
        </h2>
        {product.description[lang]
          .split(/\n+/)
          .filter(Boolean)
          .map((para, i) => (
            <p key={i} className="mt-4 text-[15px] leading-relaxed text-body">
              {para}
            </p>
          ))}
        <ul className="mt-6 space-y-2.5">
          {product.details[lang].map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-body">
              <StarSpark size={9} className="mt-[7px] shrink-0 text-gold" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Packaging */}
      <div className="mt-10 flex flex-col items-center gap-5 rounded-[10px] bg-ivory p-6 sm:flex-row sm:gap-6">
        <img
          src="/images/brand/blog-packaging.png"
          alt={t("product.packaging")}
          loading="lazy"
          className="h-24 w-24 shrink-0 rounded-[8px] object-cover"
        />
        <div className="flex items-center gap-4">
          <Gift size={28} className="shrink-0 text-gold" aria-hidden="true" />
          <div>
            <h4 className="font-serif text-[20px] font-semibold text-ink">
              {t("product.packaging")}
            </h4>
            <p className="mt-1 text-[14px] leading-relaxed text-body">
              {t("product.packagingText")}
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <GoldDivider className="my-12" />
      <h2 className="text-center font-serif text-[28px] font-semibold text-ink md:text-[36px]">
        {t("product.youMayLike")}
      </h2>
      <ProductCarousel products={relatedProducts(product)} className="mt-8" />
    </div>
  );
}

/* ---------------------------------- export ---------------------------------- */

export default function ProductView({ slug }: { slug?: string }) {
  const product = getProduct(slug);
  if (!product) return <ProductNotFound />;
  // `key` remounts the detail on product change → all selections reset cleanly.
  return <ProductDetail key={product.slug} product={product} />;
}
