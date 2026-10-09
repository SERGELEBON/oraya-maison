"use client";

/**
 * "Shop by type" — 3×2 grid of category tiles with 40px uppercase emerald names
 * + emerald "VOIR TOUT ›" button.
 */
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { CATEGORY_TILES } from "@/data/products";
import { SectionHeader } from "@/components/shared/section-header";

export function ShopByTypeSection() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="py-14 md:py-20" aria-labelledby="type-title">
      <div className="container-x">
        <SectionHeader titleKey="type.title" />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {CATEGORY_TILES.map((tile) => (
            <button
              key={tile.slug}
              type="button"
              onClick={() => navigate(`/boutique?cat=${tile.slug}`)}
              className="group text-center"
              aria-label={t(`categories.${tile.slug}`)}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-ivory">
                <img
                  src={tile.image}
                  alt={t(`categories.${tile.slug}`)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-3 font-serif text-[22px] font-semibold tracking-[1px] text-emerald uppercase md:text-[32px] lg:text-[40px]">
                {t(`categories.${tile.slug}`)}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/boutique")}
            className="label-caps inline-flex h-[44px] items-center justify-center gap-1 rounded-[4px] bg-emerald px-10 text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
          >
            {t("type.cta")}
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
