"use client";

/**
 * "Offre du jour" — full-width dark banner with gold CTA.
 */
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { StarSpark } from "@/components/shared/logo";

export function DealBannerSection() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-emerald-deeper" aria-labelledby="deal-title">
      <img
        src="/images/brand/promo-earrings.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-deeper/90 via-emerald-deeper/60 to-emerald-deeper/90" aria-hidden="true" />

      <div className="container-x relative flex flex-col items-center gap-5 py-14 text-center md:py-20">
        <p className="label-caps flex items-center gap-2 text-[12px] font-semibold text-gold md:text-[13px]">
          <StarSpark size={11} />
          {t("deal.endsSoon")}
          <StarSpark size={11} />
        </p>
        <h2
          id="deal-title"
          className="max-w-3xl font-serif text-[34px] leading-[1.05] font-semibold tracking-wide text-white uppercase md:text-[48px]"
        >
          {t("deal.title")}
        </h2>
        <p className="max-w-xl text-[15px] text-white/85 md:text-[18px]">{t("deal.subtitle")}</p>
        <button
          type="button"
          onClick={() => navigate("/boutique?cat=boucles-oreilles&promo=1")}
          className="mt-2 inline-flex h-[52px] items-center justify-center rounded-[6px] bg-gold px-10 text-[20px] font-semibold text-white shadow-[0_10px_30px_rgba(212,181,106,0.45)] transition-colors hover:bg-gold-dark md:h-[60px] md:text-[26px]"
        >
          {t("deal.cta")}
        </button>
      </div>
    </section>
  );
}
