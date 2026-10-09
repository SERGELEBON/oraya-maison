/**
 * ORAYA Maison — business configuration
 * -------------------------------------
 * All business data lives here (single source of truth).
 * Fields marked "TODO: à confirmer" are placeholders awaiting brand confirmation.
 * Hide-empty-fields rule: only reference confirmed/placeholder values that are intentionally displayed.
 */
import type { CurrencyCode } from "./types";

export const site = {
  name: "ORAYA Maison",
  tagline: { fr: "Des bijoux qui racontent votre éclat", en: "Jewelry that tells your shine" },

  // --- Contact (TODO: à confirmer) ----------------------------------------
  whatsappNumber: "22507000000", // TODO: à confirmer — format international, sans "+"
  whatsappDisplay: "+225 XX XX XX XX XX", // TODO: à confirmer
  email: "contact@orayamaison.ci", // TODO: à confirmer
  instagram: "https://www.instagram.com/oraya.maison", // TODO: à confirmer
  tiktok: "https://www.tiktok.com/@oraya.maison", // TODO: à confirmer
  facebook: "https://www.facebook.com/oraya.maison", // TODO: à confirmer

  // --- Shipping ------------------------------------------------------------
  freeShippingThresholdXof: 50000, // free delivery in Abidjan from this amount
  abidjanCommunes: [
    "Cocody",
    "Plateau",
    "Marcory",
    "Yopougon",
    "Abobo",
    "Treichville",
    "Koumassi",
    "Port-Bouët",
    "Bingerville",
    "Adjamé",
    "Attécoubé",
    "Songon",
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Abidjan%2C%20C%C3%B4te%20d%27Ivoire&t=&z=12&ie=UTF8&iwloc=&output=embed",
};

// --- Currencies ------------------------------------------------------------
// Prices are stored in XOF and converted with these rates.
// XOF is pegged to EUR: 1 EUR = 655.957 XOF. USD indicative rate: 1 USD ≈ 600 XOF.
export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  /** XOF per 1 unit of this currency */
  rate: number;
  position: "prefix" | "suffix";
}

export const currencies: CurrencyConfig[] = [
  { code: "XOF", symbol: "FCFA", flag: "🇨🇮", rate: 1, position: "suffix" },
  { code: "EUR", symbol: "€", flag: "🇪🇺", rate: 655.957, position: "prefix" },
  { code: "USD", symbol: "$", flag: "🇺🇸", rate: 600, position: "prefix" },
];

// --- Delivery zones ---------------------------------------------------------
export type ZoneId = "abidjan" | "interieur" | "international";

export interface DeliveryZone {
  id: ZoneId;
  feeXof: number;
  /** free shipping threshold inside this zone (null = never free) */
  freeFromXof: number | null;
  eta: { fr: string; en: string };
}

export const deliveryZones: DeliveryZone[] = [
  { id: "abidjan", feeXof: 1000, freeFromXof: site.freeShippingThresholdXof, eta: { fr: "24 – 48h", en: "24 – 48h" } },
  { id: "interieur", feeXof: 2500, freeFromXof: null, eta: { fr: "2 – 5 jours", en: "2 – 5 days" } },
  { id: "international", feeXof: 15000, freeFromXof: null, eta: { fr: "5 – 10 jours", en: "5 – 10 days" } },
];

// --- Payment methods ---------------------------------------------------------
export type PaymentId = "wave" | "orange" | "mtn" | "moov" | "card" | "cod";

export const paymentMethods: PaymentId[] = ["wave", "orange", "mtn", "moov", "card", "cod"];

// --- WhatsApp helpers ---------------------------------------------------------
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
