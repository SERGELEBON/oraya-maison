"use client";

/**
 * Hero (emerald, ~620px) — full-bleed campaign slideshow covering the entire
 * emerald section as a semi-transparent backdrop (chains clearly visible);
 * centered H1 + subtitle + gold CTA, slide indicator dots, and the white
 * features card overlapping the hero bottom (mandilax motif).
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, HeartHandshake, MessageCircle, RefreshCw, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { StarSpark } from "@/components/shared/logo";
import type { LucideIcon } from "lucide-react";

const FEATURE_ICONS: LucideIcon[] = [Award, HeartHandshake, MessageCircle, RefreshCw, Truck];

/** Campaign muses — gold chains front and center. Each slide gets its own
 * object-position so the neck & chains land inside the visible band. */
const HERO_SLIDES = [
  { src: "/images/brand/hero-model.png", position: "50% 68%" },
  { src: "/images/brand/hero-chain-2.png", position: "50% 82%" },
  { src: "/images/brand/hero-chain-3.png", position: "50% 50%" },
] as const;
const SLIDE_INTERVAL_MS = 6000;
/** Backdrop opacity — high enough for the chains to read, low enough for text. */
const BACKDROP_OPACITY = 0.65;

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

/** Auto-playing, crossfading full-bleed slideshow behind the hero copy. */
function HeroBackdrop({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <AnimatePresence>
        <motion.img
          key={index}
          src={HERO_SLIDES[index].src}
          alt=""
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 56, scale: 1.05 }}
          animate={reduceMotion ? { opacity: BACKDROP_OPACITY } : { opacity: BACKDROP_OPACITY, x: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: HERO_SLIDES[index].position }}
        />
      </AnimatePresence>
      {/* Light emerald veil for text contrast — chains stay visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald/25 via-transparent to-emerald/40" />
      {/* Soft radial scrim behind the centered copy for guaranteed legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_42%,rgba(10,20,17,0.32),transparent_70%)]" />
    </div>
  );
}

/** Gold pill-dot indicators; active slide gets an elongated gold pill. */
function SlideDots({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="mt-9 flex items-center justify-center gap-2.5" aria-label={t("hero.slideshow")}>
      {HERO_SLIDES.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${t("hero.slide")} ${i + 1}`}
          aria-current={i === index}
          onClick={() => onSelect(i)}
          className={
            i === index
              ? "h-[5px] w-8 cursor-pointer rounded-full bg-gold transition-all duration-500"
              : "h-[5px] w-[5px] cursor-pointer rounded-full bg-ivory/50 transition-all duration-500 hover:bg-ivory/80"
          }
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  // Autoplay — reset the timer whenever the user picks a slide manually.
  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slide]);

  return (
    <section className="relative overflow-hidden bg-emerald" aria-label="Hero">
      <HeroBackdrop index={slide} />
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
              <h1 className="font-serif text-[32px] leading-[1.06] font-semibold text-ivory drop-shadow-[0_2px_14px_rgba(13,14,17,0.45)] md:text-[44px] lg:text-[54px]">
                {t("hero.title")}
              </h1>
              <p className="mt-4 font-serif text-[20px] text-ivory drop-shadow-[0_1px_10px_rgba(13,14,17,0.4)] md:text-[26px] lg:text-[32px]">
                {t("hero.subtitle")}
              </p>
              <button
                type="button"
                onClick={() => navigate("/boutique")}
                className="mt-7 inline-flex h-[52px] items-center justify-center rounded-[6px] bg-gold px-8 text-[18px] font-semibold text-white shadow-[0_10px_28px_rgba(212,181,106,0.45)] transition-all hover:bg-gold-dark md:h-[60px] md:px-10 md:text-[24px]"
              >
                {t("hero.cta")}
              </button>
              <SlideDots index={slide} onSelect={setSlide} />
            </motion.div>
          </div>
        </div>
      </div>

      <FeaturesCard />
    </section>
  );
}
