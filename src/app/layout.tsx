import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// TODO: à confirmer — domaine de production ORAYA
const siteUrl = "https://orayamaison.ci";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ORAYA Maison – Bijoux en ligne à Abidjan, Côte d'Ivoire",
  description:
    "ORAYA Maison, votre boutique de bijoux en ligne à Abidjan : colliers, bagues, bracelets, boucles d'oreilles, parures et bijoux personnalisés. Livraison 24–48h à Abidjan et partout en Côte d'Ivoire. Paiement Wave, Orange Money, MTN MoMo, Moov Money, carte bancaire ou à la livraison.",
  keywords: [
    "bijoux Abidjan",
    "bijouterie en ligne Côte d'Ivoire",
    "colliers or",
    "bagues",
    "bracelets",
    "boucles d'oreilles",
    "bijoux personnalisés",
    "ORAYA Maison",
    "plaqué or",
    "argent 925",
  ],
  authors: [{ name: "ORAYA Maison" }],
  creator: "ORAYA Maison",
  icons: { icon: "/logo-oraya.svg" },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      en: "/?lang=en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "ORAYA Maison – Bijoux en ligne à Abidjan",
    description:
      "Des bijoux qui racontent votre éclat. Livraison 24–48h à Abidjan, paiement mobile money, bijoux personnalisés.",
    url: siteUrl,
    siteName: "ORAYA Maison",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/images/brand/blog-packaging.png",
        width: 1024,
        height: 1024,
        alt: "Écrin cadeau ORAYA Maison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORAYA Maison – Bijoux en ligne à Abidjan",
    description:
      "Des bijoux qui racontent votre éclat. Livraison 24–48h à Abidjan.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: "ORAYA Maison",
  description:
    "Boutique de bijoux en ligne à Abidjan : colliers, bagues, bracelets, boucles d'oreilles, parures, montres et bijoux personnalisés.",
  url: siteUrl,
  logo: `${siteUrl}/logo-oraya.svg`,
  image: `${siteUrl}/images/brand/blog-packaging.png`,
  priceRange: "5 000 – 150 000 FCFA",
  currenciesAccepted: "XOF",
  paymentAccepted:
    "Wave, Orange Money, MTN MoMo, Moov Money, Visa, Mastercard, Cash on Delivery",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  areaServed: ["Abidjan", "Côte d'Ivoire"],
  openingHours: "Mo-Sa 09:00-19:00",
  sameAs: [
    "https://instagram.com/oraya.maison",
    "https://tiktok.com/@oraya.maison",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${figtree.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
