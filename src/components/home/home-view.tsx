"use client";

/**
 * HOME — exact mandilax section order:
 * 1 Hero → 2 Features card → 3 Ambassadrices → 4 Nouvelle collection →
 * 5 Shop by look → 6 Shop by type → 7 Offre du jour → 8 Blog →
 * 9 Bijoux personnalisés → 10 Visitez-nous → (11 Footer is global)
 */
import { HeroSection } from "./hero-section";
import { AmbassadorsSection } from "./ambassadors-section";
import { NewCollectionSection } from "./new-collection-section";
import { ShopByLookSection } from "./shop-by-look-section";
import { ShopByTypeSection } from "./shop-by-type-section";
import { DealBannerSection } from "./deal-banner-section";
import { BlogSection } from "./blog-section";
import { CustomSection } from "./custom-section";
import { VisitSection } from "./visit-section";
import { bestSellers } from "@/data/products";

/** JSON-LD Product entries for featured items (priceCurrency: XOF). */
function ProductJsonLd() {
  const items = bestSellers()
    .slice(0, 3)
    .map((p) => ({
      "@type": "Product",
      name: p.name,
      image: p.images[0],
      description: p.short.fr,
      brand: { "@type": "Brand", name: "ORAYA Maison" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        reviewCount: p.reviews,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "XOF",
        price: p.priceXof,
        availability: "https://schema.org/InStock",
      },
    }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": items }) }}
    />
  );
}

export default function HomeView() {
  return (
    <>
      <ProductJsonLd />
      <HeroSection />
      <AmbassadorsSection />
      <NewCollectionSection />
      <ShopByLookSection />
      <ShopByTypeSection />
      <DealBannerSection />
      <BlogSection />
      <CustomSection />
      <VisitSection />
    </>
  );
}
