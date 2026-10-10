"use client";

/**
 * Hero (emerald, ~620px) — full-bleed campaign image covering the entire
 * emerald section as a low-opacity backdrop; centered H1 + subtitle + gold CTA,
 * with the white features card overlapping the hero bottom (mandilax motif).
 */
import { motion } from "framer-motion";
import { Award, HeartHandshake, MessageCircle, RefreshCw, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { StarSpark } from "@/components/shared/logo";
import type { LucideIcon } from "lucide-react";

const FEATURE_ICONS: LucideIcon[] = [Award, HeartHandshake, MessageCircle, RefreshCw, Truck];

function FeaturesCard() {
  const { tx } = useI18n();
  const features = tx<Array<{ title: string; text: string }>>("features");

  return (
    <div className="relative z-10 -mt-14 md:-mt-20">
      <div className="container-x">
        <div className="overflow-x-auto rounded-[8px] border border-hairline bg-white px-4 py-5 shadow-[0_18px_50px_-12px_rgba(13,14,17,0.18)] md:py-6 no-scrollbar">
          <ul className="mx-auto flex min-w-[640px] items-start justify-between gap-4 md:min-w-0">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? Award;
              return (
                <li key={f.title} className="flex w-[19%] min-w-[118px] flex-col items-center gap-1.5 text-center">
                  <Icon size={30} strokeWidth={1.4} className="text-gold-dark" aria-hidden="true" />
                  <span className="text-[15px] leading-tight font-semibold text-ink md:text-[18px]">
                    {f.title}
                  </span>
                  <span className="hidden text-[12px] leading-tight text-body sm:block">{f.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-emerald" aria-label="Hero">
      {/* Full-bleed background image over the emerald color, reduced opacity */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.img
          src="/images/brand/hero-model.png"
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full w-full object-cover object-top"
        />
        {/* Soft emerald veil to keep the green dominant and text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/40 via-transparent to-emerald/60" />
      </div>

      {/* Decorative gold sparkles */}
      <StarSpark size={18} className="absolute top-16 left-[6%] z-10 hidden text-gold/70 lg:block" />
      <StarSpark size={12} className="absolute right-[8%] bottom-44 z-10 hidden text-gold/50 lg:block" />

      <div className="relative z-10">
        <div className="container-x">
          <div className="mx-auto flex min-h-[460px] max-w-3xl flex-col items-center justify-center pt-14 pb-24 text-center md:min-h-[540px] md:pt-16 md:pb-28 lg:min-h-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <p className="label-caps mb-4 flex items-center justify-center gap-2 text-[12px] font-semibold text-gold md:text-[13px]">
                <StarSpark size={11} />
                ORAYA MAISON — ABIDJAN
              </p>
              <h1 className="font-serif text-[32px] leading-[1.06] font-semibold text-ivory drop-shadow-[0_2px_12px_rgba(13,14,17,0.35)] md:text-[44px] lg:text-[54px]">
                {t("hero.title")}
              </h1>
              <p className="mt-4 font-serif text-[20px] text-ivory/90 drop-shadow-[0_1px_8px_rgba(13,14,17,0.3)] md:text-[26px] lg:text-[32px]">
                {t("hero.subtitle")}
              </p>
              <button
                type="button"
                onClick={() => navigate("/boutique")}
                className="mt-7 inline-flex h-[52px] items-center justify-center rounded-[6px] bg-gold px-8 text-[18px] font-semibold text-white shadow-[0_10px_28px_rgba(212,181,106,0.45)] transition-all hover:bg-gold-dark md:mt-9 md:h-[60px] md:px-10 md:text-[24px]"
              >
                {t("hero.cta")}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <FeaturesCard />
    </section>
  );
}
