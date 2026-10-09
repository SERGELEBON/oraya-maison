"use client";

/**
 * Hero (emerald, ~620px) — H1 + subtitle + gold CTA on the left,
 * campaign muse on the right — with the white features card overlapping
 * the hero bottom (mandilax motif).
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
    <section className="relative bg-emerald" aria-label="Hero">
      {/* Decorative gold sparkles */}
      <StarSpark size={18} className="absolute top-16 left-[6%] hidden text-gold/70 lg:block" />
      <StarSpark size={12} className="absolute bottom-40 left-[42%] hidden text-gold/50 lg:block" />

      <div className="container-x">
        <div className="grid items-center gap-6 pt-10 pb-24 md:pt-16 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            <p className="label-caps mb-4 flex items-center justify-center gap-2 text-[12px] font-semibold text-gold md:text-[13px] lg:justify-start">
              <StarSpark size={11} />
              ORAYA MAISON — ABIDJAN
            </p>
            <h1 className="font-serif text-[32px] leading-[1.06] font-semibold text-ivory md:text-[42px] lg:text-[50px]">
              {t("hero.title")}
            </h1>
            <p className="mt-4 font-serif text-[20px] text-ivory/85 md:text-[26px] lg:text-[32px]">
              {t("hero.subtitle")}
            </p>
            <button
              type="button"
              onClick={() => navigate("/boutique")}
              className="mt-7 inline-flex h-[52px] items-center justify-center rounded-[6px] bg-gold px-8 text-[18px] font-semibold text-white shadow-[0_10px_28px_rgba(212,181,106,0.4)] transition-all hover:bg-gold-dark md:mt-9 md:h-[60px] md:px-10 md:text-[24px]"
            >
              {t("hero.cta")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="order-1 mx-auto h-[300px] w-full max-w-[420px] overflow-hidden rounded-[12px] md:h-[380px] lg:order-2 lg:h-[460px] lg:max-w-none"
          >
            <img
              src="/images/brand/hero-model.png"
              alt={t("hero.alt")}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        </div>
      </div>

      <FeaturesCard />
    </section>
  );
}
