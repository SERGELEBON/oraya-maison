/** Shared domain types for ORAYA Maison */

export type Lang = "fr" | "en";
export type CurrencyCode = "XOF" | "EUR" | "USD";

export type CategorySlug =
  | "bagues"
  | "colliers"
  | "pendentifs"
  | "bracelets"
  | "boucles-oreilles"
  | "parures"
  | "montres";

export type MaterialSlug = "acier-inoxydable" | "plaque-or" | "argent-925" | "or-veritable";

export type CustomType = "prenom" | "photo" | "grave";

export type ColorSlug = "or" | "argent" | "or-rose";

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface ProductVariants {
  /** ring sizes, e.g. "48" … "60" */
  sizes?: string[];
  colors?: ColorSlug[];
  /** chain lengths, e.g. "40 cm", "45 cm" */
  lengths?: string[];
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  materials: MaterialSlug[];
  /** stored in XOF (FCFA) — converted for display */
  priceXof: number;
  /** original price (shows a strike-through + sale color when present) */
  compareAtXof?: number;
  images: string[];
  rating: number; // 0 – 5
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  forMen?: boolean;
  /** present on customizable products */
  custom?: CustomType;
  short: LocalizedText;
  description: LocalizedText;
  /** "Matière / Design / Finition" bullet lines */
  details: { fr: string[]; en: string[] };
  variants?: ProductVariants;
}

export interface CartItem {
  /** unique key = slug + serialized options */
  key: string;
  slug: string;
  name: string;
  image: string;
  unitPriceXof: number;
  qty: number;
  /** human-readable chosen options, e.g. { "Taille": "52", "Couleur": "Or" } */
  options?: Record<string, string>;
}
