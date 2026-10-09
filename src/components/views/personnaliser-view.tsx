"use client";

/**
 * Personnaliser — custom jewelry landing (#/personnaliser[?type=prenom|photo|grave]).
 * Emerald hero → 3 custom-type cards → product grid → how-it-works steps + quote CTA.
 * When ?type= is valid, the matching card is highlighted and the grid is filtered.
 */
import { useI18n } from "@/lib/i18n";
import { useRouter } from "@/lib/router";
import { customProducts } from "@/data/products";
import { whatsappLink } from "@/lib/site-config";
import type { CustomType, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Price } from "@/components/shared/price";
import { ProductCard } from "@/components/shared/product-card";
import { StarSpark } from "@/components/shared/logo";

/** The three custom jewelry types, in display order. */
const CUSTOM_TYPES: CustomType[] = ["prenom", "photo", "grave"];

function isCustomType(value: string | undefined): value is CustomType {
  return value === "prenom" || value === "photo" || value === "grave";
}

/** One custom-type card — photo, copy, price and a CTA to the product page. */
function TypeCard({
  type,
  product,
  active,
}: {
  type: CustomType;
  product: Product;
  active: boolean;
}) {
  const { t } = useI18n();
  const navigate = useRouter().navigate;
  const title = t(`personnaliser.items.${type}.title`);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[10px] border bg-white p-4 pb-5 transition-shadow hover:shadow-[0_18px_44px_-20px_rgba(13,14,17,0.28)] md:p-5",
        active ? "border-2 border-gold" : "border-hairline"
      )}
    >
      {active && (
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-[13px] leading-none text-white shadow-sm"
        >
          ✦
        </span>
      )}
      <button
        type="button"
        onClick={() => navigate(`/produit/${product.slug}`)}
        aria-label={title}
        className="block aspect-square w-full overflow-hidden rounded-[10px] bg-ivory/60"
      >
        <img
          src={product.images[0]}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </button>
      <h3 className="mt-4 font-serif text-[24px] leading-snug font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-body">
        {t(`personnaliser.items.${type}.text`)}
      </p>
      <Price xof={product.priceXof} className="mt-3 text-[15px] font-semibold text-ink" />
      <button
        type="button"
        onClick={() => navigate(`/produit/${product.slug}`)}
        className="label-caps mt-4 h-11 rounded-[4px] bg-emerald text-[13px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
      >
        {t("personnaliser.cta")}
      </button>
    </article>
  );
}

export default function PersonnaliserView() {
  const { t, tx } = useI18n();
  const { route } = useRouter();
  const all = customProducts();

  const activeType = isCustomType(route.query.type) ? route.query.type : null;
  const products = activeType ? all.filter((p) => p.custom === activeType) : all;
  const steps = tx<Array<{ title: string; text: string }>>("personnaliser.steps") ?? [];

  return (
    <>
      {/* Hero band */}
      <section className="bg-emerald py-14 md:py-16" aria-labelledby="personnaliser-title">
        <div className="container-x text-center">
          <p className="label-caps mb-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-gold">
            <StarSpark size={10} className="text-gold" />
            {t("personnaliser.eyebrow")}
            <StarSpark size={10} className="text-gold" />
          </p>
          <h1
            id="personnaliser-title"
            className="font-serif text-[36px] leading-[1.08] font-semibold text-ivory md:text-[44px] lg:text-[50px]"
          >
            {t("personnaliser.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] text-ivory/80 md:text-[20px]">
            {t("personnaliser.subtitle")}
          </p>
        </div>
      </section>

      {/* Type cards + custom products grid */}
      <section className="py-12 md:py-16" aria-label={t("personnaliser.title")}>
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {CUSTOM_TYPES.map((type) => {
              const product = all.find((p) => p.custom === type);
              if (!product) return null;
              return (
                <TypeCard
                  key={type}
                  type={type}
                  product={product}
                  active={type === activeType}
                />
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works + quote CTA */}
      <section className="bg-ivory py-12 md:py-16" aria-labelledby="personnaliser-how">
        <div className="container-x">
          <h2
            id="personnaliser-how"
            className="text-center font-serif text-[28px] leading-snug font-semibold text-ink md:text-[36px]"
          >
            {t("personnaliser.howTitle")}
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col items-center gap-1.5 text-center">
                <span className="label-caps flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[14px] font-bold text-ink">
                  {i + 1}
                </span>
                <span className="mt-1 text-[16px] font-semibold text-ink">{step.title}</span>
                <span className="text-[13px] leading-snug text-body">{step.text}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex justify-center">
            <a
              href={whatsappLink(t("whatsapp.quoteMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps inline-flex h-[50px] items-center justify-center rounded-[6px] bg-gold px-8 text-[14px] font-medium text-white transition-colors hover:bg-gold-dark md:h-[54px] md:text-[15px]"
            >
              {t("personnaliser.quote")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
