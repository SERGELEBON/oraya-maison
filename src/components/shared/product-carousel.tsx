"use client";

/**
 * Embla carousel of product cards with grey dots (mandilax motif).
 * Used by "Nouvelle collection" on the home page and "Vous aimerez aussi" on product pages.
 */
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { CarouselDots } from "./carousel-dots";

export function ProductCarousel({
  products,
  className,
  eager = false,
}: {
  products: Product[];
  className?: string;
  eager?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
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

  if (products.length === 0) return null;

  return (
    <div className={className}>
      <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Carousel produits">
        <div className="-mx-2 flex">
          {products.map((p, i) => (
            <div key={p.slug} className="w-[58%] shrink-0 px-2 sm:w-1/3 lg:w-1/5">
              <ProductCard product={p} eager={eager && i < 2} />
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
    </div>
  );
}
