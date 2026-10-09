"use client";

/**
 * "Bijoux personnalisés" — ivory block (~1200×320): custom visuals left,
 * title + text + steps + emerald WhatsApp quote CTA right.
 */
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site-config";
import { SectionHeader } from "@/components/shared/section-header";

export function CustomSection() {
  const { t, tx } = useI18n();
  const steps = tx<Array<{ title: string; text: string }>>("customSection.steps");

  return (
    <section className="bg-ivory py-14 md:py-20" aria-labelledby="custom-title">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Visuals — custom name & photo pendants */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="aspect-square overflow-hidden rounded-[12px] shadow-[0_24px_60px_-20px_rgba(13,14,17,0.35)]">
              <img
                src="/images/brand/custom-prenom.png"
                alt={t("customTypes.prenom")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-10 hidden h-[190px] w-[190px] overflow-hidden rounded-[12px] border-[6px] border-ivory shadow-xl sm:block md:h-[220px] md:w-[220px]">
              <img
                src="/images/brand/custom-photo.png"
                alt={t("customTypes.photo")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionHeader
              eyebrowKey="customSection.eyebrow"
              titleKey="customSection.title"
              align="left"
              className="items-start"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-body md:text-[16px]">
              {t("customSection.text")}
            </p>

            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-1">
                  <span className="label-caps flex h-8 w-8 items-center justify-center rounded-full bg-gold text-[13px] font-bold text-ink">
                    {i + 1}
                  </span>
                  <span className="mt-1 text-[15px] font-semibold text-ink">{step.title}</span>
                  <span className="text-[12.5px] leading-snug text-body">{step.text}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappLink(t("whatsapp.quoteMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps inline-flex h-[50px] items-center justify-center rounded-[6px] bg-emerald px-8 text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark md:h-[56px] md:text-[15px]"
              >
                {t("customSection.cta")}
              </a>
              <p className="inline-flex items-center gap-1.5 text-[13px] text-body">
                <Check size={15} className="text-emerald" aria-hidden="true" />
                48 – 72h
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
