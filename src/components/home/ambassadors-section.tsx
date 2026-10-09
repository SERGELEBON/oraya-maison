"use client";

/**
 * "Elles portent ORAYA" — grey band, 5-card ambassador carousel with round
 * jewel insets (5px white border) and grey dots.
 */
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { SectionHeader } from "@/components/shared/section-header";
import { CarouselDots } from "@/components/shared/carousel-dots";

const AMBASSADOR_IMAGES = [
  "/images/brand/ambassador-1.png",
  "/images/brand/ambassador-2.png",
  "/images/brand/ambassador-3.png",
  "/images/brand/ambassador-4.png",
  "/images/brand/ambassador-5.png",
];

const AMBASSADOR_JEWELS = [
  "/images/products/boucles-aurore.jpg",
  "/images/products/collier-reine.jpg",
  "/images/products/pendantif-luna.jpg",
  "/images/products/collier-etoile-doree.jpg",
  "/images/products/bracelet-nova.jpg",
];

export function AmbassadorsSection() {
  const { tx, t } = useI18n();
  const navigate = useNavigate();
  const list = tx<Array<{ name: string; wears: string }>>("ambassadors.list");

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(1);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };
    const raf = requestAnimationFrame(sync);
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  return (
    <section className="mt-2 bg-band py-14 md:py-16" aria-labelledby="ambassadrices-title">
      <div className="container-x">
        <SectionHeader eyebrowKey="ambassadors.eyebrow" titleKey="ambassadors.title" />

        <div ref={emblaRef} className="mt-10 overflow-hidden">
          <div className="-mx-3 flex">
            {list.map((amb, i) => (
              <div key={amb.name} className="w-[62%] shrink-0 px-3 sm:w-1/3 lg:w-1/5">
                <button
                  type="button"
                  onClick={() => navigate("/boutique")}
                  className="group block w-full text-left"
                  aria-label={`${amb.name} — ${amb.wears}`}
                >
                  <div className="relative">
                    <div className="aspect-[3/4] overflow-hidden rounded-[14px] bg-ivory">
                      <img
                        src={AMBASSADOR_IMAGES[i % AMBASSADOR_IMAGES.length]}
                        alt={`${amb.name} — ORAYA Maison`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    {/* Round jewel inset — 5px white border */}
                    <div className="absolute -bottom-6 left-4 h-[76px] w-[76px] overflow-hidden rounded-full border-[5px] border-white bg-white shadow-md md:h-[86px] md:w-[86px]">
                      <img
                        src={AMBASSADOR_JEWELS[i % AMBASSADOR_JEWELS.length]}
                        alt={amb.wears}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-10 font-serif text-[22px] leading-tight font-semibold text-ink md:text-[28px]">
                    {amb.name}
                  </p>
                  <p className="text-[13px] text-body">{amb.wears}</p>
                </button>
              </div>
            ))}
          </div>
        </div>

        <CarouselDots
          className="mt-6"
          count={snapCount}
          active={selected}
          onSelect={(i) => emblaApi?.scrollTo(i)}
        />
        <span className="sr-only">{t("ambassadors.eyebrow")}</span>
      </div>
    </section>
  );
}
