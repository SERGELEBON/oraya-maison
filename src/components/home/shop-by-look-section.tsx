"use client";

/**
 * "Shop by look" — two large photos: Simple & Élégant / Brillant & Audacieux,
 * each with an emerald "ACHETER ›" button.
 */
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { SectionHeader } from "@/components/shared/section-header";

const LOOKS = [
  { key: "elegant", tag: "elegantTag", image: "/images/brand/look-elegant.png", href: "/boutique?cat=colliers" },
  { key: "bold", tag: "boldTag", image: "/images/brand/look-bold.png", href: "/boutique?cat=parures" },
] as const;

export function ShopByLookSection() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="py-14 md:py-20" aria-labelledby="look-title">
      <div className="container-x">
        <SectionHeader titleKey="look.title" />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {LOOKS.map((look, i) => (
            <motion.article
              key={look.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-[10px]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-ivory md:aspect-[3/2]">
                <img
                  src={look.image}
                  alt={t(`look.${look.key}`)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent px-4 pt-16 pb-6 text-center">
                <div>
                  <h3 className="font-serif text-[26px] font-semibold text-white md:text-[32px]">
                    {t(`look.${look.key}`)}
                  </h3>
                  <p className="text-[13px] tracking-wide text-white/85 md:text-[15px]">
                    {t(`look.${look.tag}`)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(look.href)}
                  className="label-caps inline-flex h-[46px] items-center justify-center gap-1 rounded-[4px] bg-emerald px-8 text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark md:h-[52px] md:text-[15px]"
                >
                  {t("look.cta")}
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
