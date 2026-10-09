"use client";

/**
 * "Nouvelle collection" — carousel of 5 new products + dots + outline button.
 */
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { newArrivals } from "@/data/products";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductCarousel } from "@/components/shared/product-carousel";

export function NewCollectionSection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const products = newArrivals();

  return (
    <section className="py-14 md:py-20" aria-labelledby="collection-title">
      <div className="container-x">
        <SectionHeader eyebrowKey="collection.eyebrow" titleKey="collection.title" />

        <ProductCarousel products={products} className="mt-10" eager />

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/boutique?tag=nouveautes")}
            className="label-caps h-[52px] rounded-[6px] border-2 border-emerald bg-white px-6 text-[15px] font-semibold text-emerald transition-colors hover:bg-emerald hover:text-ivory md:h-[58px] md:px-10 md:text-[18px]"
          >
            {t("collection.viewTrends")}
          </button>
        </div>
      </div>
    </section>
  );
}
