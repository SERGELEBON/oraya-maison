/**
 * ORAYA Maison — product catalog.
 * Prices stored in XOF (FCFA). Bilingual FR/EN copy.
 *
 * IMAGE NOTE: photos under /images/products/ are placeholders sourced for the
 * demo build — replace with professional ORAYA product photography before launch.
 */
import type { Product, CategorySlug, MaterialSlug } from "@/lib/types";

export const CATEGORY_LIST: CategorySlug[] = [
  "colliers",
  "bagues",
  "pendentifs",
  "bracelets",
  "boucles-oreilles",
  "parures",
  "montres",
];

export const MATERIAL_LIST: MaterialSlug[] = [
  "or-veritable",
  "plaque-or",
  "argent-925",
  "acier-inoxydable",
];

const img = (slug: string, n = 1) => `/images/products/${slug}${n > 1 ? `-${n}` : ""}.jpg`;

export const products: Product[] = [
  /* ---------------------------------- COLLIERS ---------------------------------- */
  {
    slug: "collier-luna",
    name: "Collier Luna",
    category: "colliers",
    materials: ["plaque-or"],
    priceXof: 24500,
    images: [img("collier-luna"), img("collier-luna", 2)],
    rating: 4.8,
    reviews: 126,
    isNew: true,
    short: {
      fr: "Chaîne fine dorée à l'or fin 18 carats, éclat discret du matin au soir.",
      en: "Fine 18k gold-plated chain, a discreet shine from morning to night.",
    },
    description: {
      fr: "Le Collier Luna est né pour être porté sans jamais le quitter : sa chaîne ultra-fine en plaqué or 18 carats épouse le cou et capte la lumière à chaque mouvement. Anti-ternissement, il résiste à l'eau et au climat tropical.",
      en: "The Luna necklace is made to be worn without ever taking it off: its ultra-fine 18k gold-plated chain hugs the neck and catches the light with every movement. Anti-tarnish, it resists water and tropical climates.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats sur laiton premium",
        "Design : chaîne forçat 1,2 mm, fermoir mousqueton renforcé",
        "Finition : poli miroir, garantie anti-ternissement 1 an",
      ],
      en: [
        "Material: 18k gold plated on premium brass",
        "Design: 1.2 mm cable chain, reinforced lobster clasp",
        "Finish: mirror polish, 1-year anti-tarnish warranty",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"], colors: ["or", "argent"] },
  },
  {
    slug: "collier-reine",
    name: "Collier Reine",
    category: "colliers",
    materials: ["or-veritable"],
    priceXof: 89000,
    images: [img("collier-reine"), img("collier-reine", 2)],
    rating: 4.9,
    reviews: 214,
    isBestseller: true,
    short: {
      fr: "Pièce maîtresse en or véritable 18 carats, poinçonnée et certifiée.",
      en: "A statement piece in certified 18k solid gold, hallmarked.",
    },
    description: {
      fr: "Le Collier Reine assume son rang : or véritable 18 carats, maillons sculptés et ce poids si particulier de l'or massif sur la peau. Livré avec son certificat de pureté dans l'écrin signature ORAYA.",
      en: "The Reine necklace owns its rank: genuine 18k gold, sculpted links and that unmistakable weight of solid gold on the skin. Delivered with its purity certificate in the signature ORAYA case.",
    },
    details: {
      fr: [
        "Matière : or jaune 18 carats (750‰), poinçon officiel",
        "Design : maillons serti zircone, fermoir de sécurité",
        "Finition : poli haute brillance, certificat de pureté inclus",
      ],
      en: [
        "Material: 18k yellow gold (750‰), official hallmark",
        "Design: zircon-set links, safety clasp",
        "Finish: high-polish, purity certificate included",
      ],
    },
    variants: { lengths: ["42 cm", "45 cm", "50 cm"] },
  },
  {
    slug: "collier-etoile-doree",
    name: "Collier Étoile Dorée",
    category: "colliers",
    materials: ["argent-925"],
    priceXof: 15000,
    images: [img("collier-etoile-doree"), img("collier-etoile-doree", 2)],
    rating: 4.6,
    reviews: 89,
    short: {
      fr: "Argent 925 rhodié, éclat scintillant — le bijou porte-bonheur.",
      en: "Rhodium-plated 925 silver, sparkling shine — the lucky charm.",
    },
    description: {
      fr: "Une chaîne d'argent 925 rhodié qui brille d'un éclat froid et lumineux : le Collier Étoile Dorée est parfait en superposition avec vos chaînes dorées.",
      en: "A rhodium-plated 925 silver chain shining with a cool, luminous glow: the Étoile Dorée necklace is perfect for layering with your gold chains.",
    },
    details: {
      fr: [
        "Matière : argent 925 rhodié anti-ternissement",
        "Design : chaîne gourmette fine",
        "Finition : rhodiage miroir, écrin ORAYA inclus",
      ],
      en: [
        "Material: anti-tarnish rhodium-plated 925 silver",
        "Design: fine curb chain",
        "Finish: mirror rhodium plating, ORAYA case included",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"] },
  },
  {
    slug: "collier-aurore",
    name: "Collier Aurore",
    category: "colliers",
    materials: ["plaque-or"],
    priceXof: 32000,
    compareAtXof: 39500,
    images: [img("collier-aurore"), img("collier-aurore", 2)],
    rating: 4.7,
    reviews: 74,
    short: {
      fr: "Maille serpente dorée — l'éclat de l'aube autour du cou.",
      en: "Gold snake chain — dawn's glow around your neck.",
    },
    description: {
      fr: "Le Collier Aurore joue la carte de la luminosité : sa maille serpente épouse les mouvements et capte chaque rayon. Une pièce spectaculaire qui reste légère.",
      en: "The Aurore necklace plays the luminosity card: its snake chain follows your movements and catches every ray. A spectacular piece that stays light.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats, 3 microns",
        "Design : maille serpente 3 mm",
        "Finition : poli miroir, chaînette de réglage 5 cm",
      ],
      en: [
        "Material: 18k gold plated, 3 microns",
        "Design: 3 mm snake chain",
        "Finish: mirror polish, 5 cm adjuster chain",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"], colors: ["or", "or-rose"] },
  },
  {
    slug: "collier-sika",
    name: "Collier Sika",
    category: "colliers",
    materials: ["acier-inoxydable"],
    priceXof: 9900,
    images: [img("collier-sika")],
    rating: 4.5,
    reviews: 58,
    short: {
      fr: "Acier inoxydable doré, indestructible et waterproof — le quotidien sans compromis.",
      en: "Gold stainless steel, unbreakable and waterproof — everyday, no compromise.",
    },
    description: {
      fr: "Sika veut dire richesse en akan : ce collier en acier inoxydable doré ne craint ni la douche, ni la mer, ni le sport. L'allié des journées bien remplies.",
      en: "Sika means wealth in Akan: this gold stainless steel necklace fears neither the shower, the sea, nor the gym. The ally of busy days.",
    },
    details: {
      fr: [
        "Matière : acier inoxydable 316L, dorure PVD",
        "Design : mailles plates 4 mm",
        "Finition : waterproof, hypoallergénique",
      ],
      en: [
        "Material: 316L stainless steel, PVD gold coating",
        "Design: 4 mm flat links",
        "Finish: waterproof, hypoallergenic",
      ],
    },
    variants: { lengths: ["45 cm", "50 cm", "60 cm"] },
  },

  /* ---------------------------------- BAGUES ----------------------------------- */
  {
    slug: "bague-nova",
    name: "Bague Nova",
    category: "bagues",
    materials: ["plaque-or"],
    priceXof: 12500,
    images: [img("bague-nova")],
    rating: 4.8,
    reviews: 167,
    isBestseller: true,
    short: {
      fr: "Anneau fin serti de zircones — la favorite des clientes ORAYA.",
      en: "Slim ring set with zircons — the ORAYA customer favourite.",
    },
    description: {
      fr: "La Bague Nova doit son nom à cette explosion d'éclat discret : un anneau fin en plaqué or aux reflets lumineux. Elle se superpose à l'infini ou se porte seule, en signature.",
      en: "The Nova ring owes its name to that burst of discreet sparkle: a slim gold-plated band with luminous reflections. Stack it endlessly or wear it alone as a signature.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats",
        "Design : anneau 1,8 mm, profil arrondi",
        "Finition : poli miroir, confort optimal",
      ],
      en: [
        "Material: 18k gold plated",
        "Design: 1.8 mm band, rounded profile",
        "Finish: mirror polish, optimal comfort",
      ],
    },
    variants: { sizes: ["48", "50", "52", "54", "56", "58", "60"], colors: ["or", "argent"] },
  },
  {
    slug: "bague-perle",
    name: "Bague Perle",
    category: "bagues",
    materials: ["argent-925"],
    priceXof: 18000,
    images: [img("bague-perle")],
    rating: 4.7,
    reviews: 63,
    isNew: true,
    short: {
      fr: "Perle d'eau douce sur argent 925 — douceur nacrée du bout des doigts.",
      en: "Freshwater pearl on 925 silver — pearly softness at your fingertips.",
    },
    description: {
      fr: "Une perle d'eau douce choisie à la main, montée sur un anneau d'argent 925 : la Bague Perle apporte une note d'élégance classique à chaque geste.",
      en: "A hand-picked freshwater pearl mounted on a 925 silver band: the Perle ring brings a note of classic elegance to every gesture.",
    },
    details: {
      fr: [
        "Matière : argent 925, perle d'eau douce 7–8 mm",
        "Design : anneau torsadé fin",
        "Finition : rhodiage brillant",
      ],
      en: [
        "Material: 925 silver, 7–8 mm freshwater pearl",
        "Design: slim twisted band",
        "Finish: bright rhodium plating",
      ],
    },
    variants: { sizes: ["48", "50", "52", "54", "56", "58"] },
  },
  {
    slug: "bague-soleil",
    name: "Bague Soleil",
    category: "bagues",
    materials: ["or-veritable"],
    priceXof: 75000,
    images: [img("bague-soleil")],
    rating: 4.9,
    reviews: 41,
    short: {
      fr: "Or massif 18 carats, motif rayons de soleil — une bague-héritage.",
      en: "18k solid gold, sunray motif — an heirloom ring.",
    },
    description: {
      fr: "La Bague Soleil se transmettra : or massif 18 carats, motif rayons ciselés et ce halo chaud qui réchauffe le regard. Une pièce d'exception livrée avec son certificat.",
      en: "The Soleil ring will be passed down: 18k solid gold, chiselled sunray motif and that warm halo that lights up the eye. An exceptional piece delivered with its certificate.",
    },
    details: {
      fr: [
        "Matière : or jaune 18 carats (750‰)",
        "Design : rayons de soleil ciselés, 12 mm",
        "Finition : poli satiné double texture",
      ],
      en: [
        "Material: 18k yellow gold (750‰)",
        "Design: chiselled sunrays, 12 mm",
        "Finish: dual-texture satin polish",
      ],
    },
    variants: { sizes: ["50", "52", "54", "56", "58"] },
  },
  {
    slug: "bague-twist",
    name: "Bague Twist",
    category: "bagues",
    materials: ["acier-inoxydable"],
    priceXof: 7500,
    images: [img("bague-twist"), img("bague-twist", 2)],
    rating: 4.5,
    reviews: 97,
    short: {
      fr: "Torsade acier doré, waterproof — l'audace au quotidien.",
      en: "Gold steel twist, waterproof — everyday boldness.",
    },
    description: {
      fr: "Sa torsade graphique en acier inoxydable doré ne quitte plus votre main : waterproof et anti-rayures, la Bague Twist survit à tout, même à vos journées les plus folles.",
      en: "Its graphic twist of gold stainless steel will never leave your hand: waterproof and scratch-resistant, the Twist ring survives everything — even your wildest days.",
    },
    details: {
      fr: [
        "Matière : acier inoxydable 316L doré PVD",
        "Design : torsade 4 mm, profil arrondi",
        "Finition : waterproof, anti-rayures",
      ],
      en: [
        "Material: PVD gold-plated 316L stainless steel",
        "Design: 4 mm twist, rounded profile",
        "Finish: waterproof, scratch-resistant",
      ],
    },
    variants: { sizes: ["48", "50", "52", "54", "56", "58", "60"] },
  },
  {
    slug: "bague-amara",
    name: "Bague Amara",
    category: "bagues",
    materials: ["plaque-or"],
    priceXof: 21000,
    compareAtXof: 26000,
    images: [img("bague-amara")],
    rating: 4.6,
    reviews: 52,
    short: {
      fr: "Bague cocktail zircone émeraude — l'éclat audacieux à prix doux.",
      en: "Emerald-zircon cocktail ring — bold sparkle, gentle price.",
    },
    description: {
      fr: "Amara, « grâce » : une zircone taille émeraude sertie d'un halo doré, sur plaqué or 18 carats. La bague qui transforme une simple tenue en grand soir.",
      en: "Amara, meaning grace: an emerald-cut zircon set in a golden halo on 18k gold plating. The ring that turns a simple outfit into a grand evening.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats, zircone taille émeraude",
        "Design : halo de zircons, 10 mm",
        "Finition : poli miroir, galerie ajourée",
      ],
      en: [
        "Material: 18k gold plated, emerald-cut zircon",
        "Design: zircon halo, 10 mm",
        "Finish: mirror polish, open gallery",
      ],
    },
    variants: { sizes: ["50", "52", "54", "56", "58"] },
  },

  /* --------------------------------- PENDENTIFS -------------------------------- */
  {
    slug: "pendantif-luna",
    name: "Pendentif Luna",
    category: "pendentifs",
    materials: ["plaque-or"],
    priceXof: 16500,
    images: [img("pendantif-luna"), img("pendantif-luna", 2)],
    rating: 4.8,
    reviews: 143,
    isBestseller: true,
    short: {
      fr: "Pendentif doré sur chaîne fine — le talisman nocturne.",
      en: "Gold pendant on a fine chain — the nighttime talisman.",
    },
    description: {
      fr: "Le Pendentif Luna célèbre la nuit ivoirienne : un pendentif doré sculpté suspendu à une chaîne forçat. À porter seul ou superposé avec le Collier Luna pour un ciel entier autour du cou.",
      en: "The Luna pendant celebrates the Ivorian night: a sculpted gold pendant suspended from a cable chain. Wear it alone or layered with the Luna necklace for a whole sky around your neck.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats",
        "Design : pendentif 12 mm, chaîne forçat 1 mm",
        "Finition : poli miroir anti-ternissement",
      ],
      en: [
        "Material: 18k gold plated",
        "Design: 12 mm pendant, 1 mm cable chain",
        "Finish: anti-tarnish mirror polish",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"], colors: ["or", "argent"] },
  },
  {
    slug: "pendantif-etoile",
    name: "Pendentif Étoile",
    category: "pendentifs",
    materials: ["argent-925"],
    priceXof: 12000,
    images: [img("pendantif-etoile"), img("pendantif-etoile", 2)],
    rating: 4.7,
    reviews: 71,
    short: {
      fr: "Étoile à quatre branches en argent 925 — l'esprit ORAYA en pendant.",
      en: "Four-point star in 925 silver — the ORAYA spirit as a pendant.",
    },
    description: {
      fr: "Notre étoile signature, celle de votre écrin ORAYA, en pendentif d'argent 925 rhodié : quatre branches polies qui captent la lumière comme des reflets d'eau.",
      en: "Our signature star — the one on your ORAYA case — as a rhodium-plated 925 silver pendant: four polished branches catching light like reflections on water.",
    },
    details: {
      fr: [
        "Matière : argent 925 rhodié",
        "Design : étoile 4 branches 11 mm, chaîne vénitienne",
        "Finition : rhodiage miroir",
      ],
      en: [
        "Material: rhodium-plated 925 silver",
        "Design: 11 mm four-point star, venetian chain",
        "Finish: mirror rhodium plating",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"] },
  },
  {
    slug: "pendantif-coeur-ivoire",
    name: "Pendentif Cœur d'Ivoire",
    category: "pendentifs",
    materials: ["or-veritable"],
    priceXof: 58000,
    images: [img("pendantif-coeur-ivoire")],
    rating: 5,
    reviews: 29,
    isNew: true,
    short: {
      fr: "Cœur gravé en or véritable — la déclaration qui traverse les années.",
      en: "Engraved heart in solid gold — the declaration that lasts years.",
    },
    description: {
      fr: "Un cœur d'or véritable 18 carats que notre atelier grave à la main de vos initiales ou d'une date : le Pendentif Cœur d'Ivoire devient, à jamais, votre bijou d'histoire.",
      en: "An 18k solid gold heart that our workshop hand-engraves with your initials or a date: the Cœur d'Ivoire pendant becomes, forever, your story jewel.",
    },
    details: {
      fr: [
        "Matière : or jaune 18 carats (750‰)",
        "Design : cœur 14 mm, gravure offerte",
        "Finition : poli miroir, dos gravable",
      ],
      en: [
        "Material: 18k yellow gold (750‰)",
        "Design: 14 mm heart, free engraving",
        "Finish: mirror polish, engravable back",
      ],
    },
    variants: { lengths: ["42 cm", "45 cm", "50 cm"] },
  },
  {
    slug: "pendantif-perle",
    name: "Pendentif Perle",
    category: "pendentifs",
    materials: ["plaque-or"],
    priceXof: 14500,
    images: [img("pendantif-perle"), img("pendantif-perle", 2)],
    rating: 4.6,
    reviews: 66,
    short: {
      fr: "Perle nacrée sur chaîne dorée — chaque pièce est unique.",
      en: "Nacre pearl on a gold chain — every piece is one of a kind.",
    },
    description: {
      fr: "Aucune perle ne se ressemble : suspendue à une chaîne dorée fine, la vôtre aura ses propres courbes et reflets. Un bijou unique pour une porteuse unique.",
      en: "No two pearls are alike: hung on a fine gold chain, yours will have its own curves and reflections. A unique jewel for a unique wearer.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats, perle d'eau douce",
        "Design : chaîne 1,2 mm, bague de réglage",
        "Finition : perle naturelle, certificat inclus",
      ],
      en: [
        "Material: 18k gold plated, freshwater pearl",
        "Design: 1.2 mm chain, adjuster ring",
        "Finish: natural pearl, certificate included",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"] },
  },

  /* --------------------------------- BRACELETS --------------------------------- */
  {
    slug: "bracelet-nova",
    name: "Bracelet Nova",
    category: "bracelets",
    materials: ["plaque-or"],
    priceXof: 13500,
    images: [img("bracelet-nova"), img("bracelet-nova", 2)],
    rating: 4.8,
    reviews: 158,
    isBestseller: true,
    short: {
      fr: "Chaîne fine dorée — le poignet illuminé.",
      en: "Fine gold chain — a lit-up wrist.",
    },
    description: {
      fr: "Le Bracelet Nova habille le poignet d'une chaîne dorée ultra-fine : assez discret pour le bureau, assez lumineux pour les soirées. Il se superpose à merveille avec le Bracelet Perles.",
      en: "The Nova bracelet dresses the wrist in an ultra-fine gold chain: discreet enough for the office, luminous enough for evenings. It layers beautifully with the Perles bracelet.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats",
        "Design : chaîne 1,5 mm, chaînette de réglage 3 cm",
        "Finition : poli miroir",
      ],
      en: [
        "Material: 18k gold plated",
        "Design: 1.5 mm chain, 3 cm adjuster",
        "Finish: mirror polish",
      ],
    },
    variants: { colors: ["or", "argent"] },
  },
  {
    slug: "bracelet-jonc-or",
    name: "Jonc Or",
    category: "bracelets",
    materials: ["or-veritable"],
    priceXof: 65000,
    images: [img("bracelet-jonc-or")],
    rating: 4.9,
    reviews: 38,
    short: {
      fr: "Jonc plein en or 18 carats — le classique absolu.",
      en: "Solid 18k gold bangle — the absolute classic.",
    },
    description: {
      fr: "Le Jonc Or est la première pièce d'investissement : or plein 18 carats, profil doux, charnière précise. Il se porte seul en signature ou en accumulation avec vos bracelets fins.",
      en: "The Jonc Or is the first investment piece: solid 18k gold, soft profile, precise hinge. Wear it alone as a signature or stacked with your fine bracelets.",
    },
    details: {
      fr: [
        "Matière : or jaune 18 carats (750‰)",
        "Design : jonc plein 3 mm, charnière box",
        "Finition : poli haute brillance, poinçon",
      ],
      en: [
        "Material: 18k yellow gold (750‰)",
        "Design: solid 3 mm bangle, box hinge",
        "Finish: high polish, hallmarked",
      ],
    },
    variants: { sizes: ["S", "M", "L"] },
  },
  {
    slug: "bracelet-chaine-acier",
    name: "Bracelet Chaîne Acier",
    category: "bracelets",
    materials: ["acier-inoxydable"],
    priceXof: 8900,
    images: [img("bracelet-chaine-acier"), img("bracelet-chaine-acier", 2)],
    rating: 4.5,
    reviews: 84,
    short: {
      fr: "Chaîne acier doré — indestructible, waterproof, sans compromis.",
      en: "Gold steel chain bracelet — unbreakable, waterproof, no compromise.",
    },
    description: {
      fr: "Une chaîne en acier inoxydable doré qui traverse tout : sport, mer, douche. Le Bracelet Chaîne Acier est le compagnon des poignets qui ne s'ennuient jamais.",
      en: "A gold stainless steel chain bracelet that goes through everything: gym, sea, shower. The Chaîne Acier bracelet is the companion for wrists that never rest.",
    },
    details: {
      fr: [
        "Matière : acier inoxydable 316L doré PVD",
        "Design : mailles 5 mm, fermoir mousqueton double",
        "Finition : waterproof, anti-rayures",
      ],
      en: [
        "Material: PVD gold-plated 316L stainless steel",
        "Design: 5 mm links, double lobster clasp",
        "Finish: waterproof, scratch-resistant",
      ],
    },
    variants: { sizes: ["S", "M", "L"] },
  },
  {
    slug: "bracelet-perles",
    name: "Bracelet Perles",
    category: "bracelets",
    materials: ["argent-925"],
    priceXof: 17500,
    images: [img("bracelet-perles")],
    rating: 4.7,
    reviews: 59,
    isNew: true,
    short: {
      fr: "Perles nacrées et argent 925 — la douceur en écho au poignet.",
      en: "Nacre pearls and 925 silver — softness echoing at the wrist.",
    },
    description: {
      fr: "Des perles nacrées enfilées sur fil d'argent 925, séparées de petits anneaux polis : le Bracelet Perles capture la lumière douce des matins d'Abidjan.",
      en: "Nacre pearls threaded on 925 silver wire, separated by small polished rings: the Perles bracelet captures the soft morning light of Abidjan.",
    },
    details: {
      fr: [
        "Matière : argent 925, perles nacrées 6 mm",
        "Design : fils torsadés, extensible 1,5 cm",
        "Finition : rhodiage brillant",
      ],
      en: [
        "Material: 925 silver, 6 mm nacre pearls",
        "Design: twisted wires, 1.5 cm stretch",
        "Finish: bright rhodium plating",
      ],
    },
  },

  /* ----------------------------- BOUCLES D'OREILLES ----------------------------- */
  {
    slug: "boucles-aurore",
    name: "Boucles d'oreilles Aurore",
    category: "boucles-oreilles",
    materials: ["plaque-or"],
    priceXof: 11500,
    compareAtXof: 14500,
    images: [img("boucles-aurore"), img("boucles-aurore", 2)],
    rating: 4.8,
    reviews: 189,
    isBestseller: true,
    short: {
      fr: "Créoles fines dorées — best-seller ORAYA, promotion en cours.",
      en: "Slim gold hoops — ORAYA best-seller, now on sale.",
    },
    description: {
      fr: "Nos Boucles Aurore illuminent chaque visage : créoles fines en plaqué or, légères comme une promesse. La paire la plus vendue d'ORAYA — et la promo du moment.",
      en: "Our Aurore earrings light up every face: slim gold-plated hoops, light as a promise. ORAYA's best-selling pair — and currently on sale.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats",
        "Design : créoles 20 mm",
        "Finition : poli miroir, tiges hypoallergéniques",
      ],
      en: [
        "Material: 18k gold plated",
        "Design: 20 mm hoops",
        "Finish: mirror polish, hypoallergenic posts",
      ],
    },
    variants: { colors: ["or", "argent"] },
  },
  {
    slug: "boucles-perle",
    name: "Boucles Perle",
    category: "boucles-oreilles",
    materials: ["argent-925"],
    priceXof: 15500,
    images: [img("boucles-perle")],
    rating: 4.7,
    reviews: 77,
    short: {
      fr: "Puces perle d'eau douce sur argent 925 — l'élégance minimale.",
      en: "Freshwater pearl studs on 925 silver — minimal elegance.",
    },
    description: {
      fr: "Deux perles d'eau douce montées sur argent 925 rhodié : les Boucles Perle sont ce geste simple qui suffit — col relevé, regard lumineux.",
      en: "Two freshwater pearls mounted on rhodium-plated 925 silver: the Perle earrings are that one simple gesture that's enough — updo hair, luminous eyes.",
    },
    details: {
      fr: [
        "Matière : argent 925 rhodié, perles 8 mm",
        "Design : puces à papillons renforcés",
        "Finition : rhodiage miroir",
      ],
      en: [
        "Material: rhodium-plated 925 silver, 8 mm pearls",
        "Design: studs with reinforced butterflies",
        "Finish: mirror rhodium plating",
      ],
    },
  },
  {
    slug: "boucles-creoles",
    name: "Créoles Dorées",
    category: "boucles-oreilles",
    materials: ["plaque-or"],
    priceXof: 19000,
    images: [img("boucles-creoles"), img("boucles-creoles", 2)],
    rating: 4.6,
    reviews: 92,
    short: {
      fr: "Créoles XL texturées — l'audace maîtrisée.",
      en: "Textured XL hoops — mastered boldness.",
    },
    description: {
      fr: "Des créoles généreuses au plaqué or 18 carats et à la texture qui capte la lumière au moindre mouvement : les Créoles Dorées signent les grands soirs.",
      en: "Generous hoops in 18k gold plating with a texture that catches light with every move: the Créoles Dorées sign off grand evenings.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats, 3 microns",
        "Design : créoles 35 mm",
        "Finition : poli miroir, fermoir clic",
      ],
      en: [
        "Material: 18k gold plated, 3 microns",
        "Design: 35 mm hoops",
        "Finish: mirror polish, click clasp",
      ],
    },
    variants: { colors: ["or", "or-rose"] },
  },
  {
    slug: "boucles-goutte",
    name: "Boucles Goutte d'Or",
    category: "boucles-oreilles",
    materials: ["or-veritable"],
    priceXof: 95000,
    images: [img("boucles-goutte")],
    rating: 4.9,
    reviews: 24,
    isNew: true,
    short: {
      fr: "Pendantes or 18 carats — la goutte qui fait l'océan.",
      en: "18k gold drops — the drop that makes the ocean.",
    },
    description: {
      fr: "Une goutte d'or véritable 18 carats : les Boucles Goutte d'Or sont notre pièce de haute joaillerie la plus convoitée — produite en très petite série.",
      en: "A drop of genuine 18k gold: the Goutte d'Or earrings are our most coveted fine-jewelry piece — produced in a very small series.",
    },
    details: {
      fr: [
        "Matière : or jaune 18 carats (750‰)",
        "Design : goutte 22 mm, articulation mobile",
        "Finition : poli miroir, série limitée numérotée",
      ],
      en: [
        "Material: 18k yellow gold (750‰)",
        "Design: 22 mm drop, mobile articulation",
        "Finish: mirror polish, numbered limited series",
      ],
    },
  },

  /* ---------------------------------- PARURES ---------------------------------- */
  {
    slug: "parure-eclat",
    name: "Parure Éclat",
    category: "parures",
    materials: ["plaque-or"],
    priceXof: 45000,
    compareAtXof: 52000,
    images: [img("parure-eclat"), img("parure-eclat", 2)],
    rating: 4.8,
    reviews: 57,
    isBestseller: true,
    short: {
      fr: "Collier + boucles assorties — le duo des grandes occasions.",
      en: "Matching necklace + earrings — the big-occasion duo.",
    },
    description: {
      fr: "La Parure Éclat réunit notre collier et ses boucles jumelles en plaqué or 18 carats : cérémonies, mariages, anniversaires — il n'y a plus qu'à briller.",
      en: "The Éclat set brings together our necklace and its twin earrings in 18k gold plating: ceremonies, weddings, birthdays — all that's left is to shine.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats",
        "Design : collier 45 cm + boucles 18 mm assorties",
        "Finition : poli miroir, écrin duo ORAYA",
      ],
      en: [
        "Material: 18k gold plated",
        "Design: 45 cm necklace + matching 18 mm earrings",
        "Finish: mirror polish, ORAYA duo case",
      ],
    },
    variants: { colors: ["or", "argent"] },
  },
  {
    slug: "parure-royale",
    name: "Parure Royale",
    category: "parures",
    materials: ["or-veritable"],
    priceXof: 145000,
    images: [img("parure-royale")],
    rating: 5,
    reviews: 18,
    short: {
      fr: "Collier et boucles en or véritable — le trésor de cérémonie.",
      en: "Necklace and earrings in solid gold — the ceremony treasure.",
    },
    description: {
      fr: "Un ensemble d'or véritable 18 carats — collier ras-de-cou et boucles pendantes — livré dans son coffret ORAYA prestige. La parure des jours qui comptent.",
      en: "A genuine 18k gold set — choker necklace and drop earrings — delivered in the ORAYA prestige case. The set for the days that matter.",
    },
    details: {
      fr: [
        "Matière : or jaune 18 carats (750‰)",
        "Design : collier 40 cm, boucles 30 mm",
        "Finition : poli haute brillance, coffret prestige",
      ],
      en: [
        "Material: 18k yellow gold (750‰)",
        "Design: 40 cm necklace, 30 mm earrings",
        "Finish: high polish, prestige case",
      ],
    },
  },

  /* ---------------------------------- MONTRES ---------------------------------- */
  {
    slug: "montre-elegance",
    name: "Montre Élégance",
    category: "montres",
    materials: ["acier-inoxydable"],
    priceXof: 29000,
    images: [img("montre-elegance"), img("montre-elegance", 2)],
    rating: 4.6,
    reviews: 46,
    short: {
      fr: "Boîtier acier, cadran nacre — la ponctualité en beauté.",
      en: "Steel case, nacre dial — punctuality in beauty.",
    },
    description: {
      fr: "La Montre Élégance joue la carte du minimalisme : boîtier acier, cadran lumineux et bracelet fin. Un garde-temps qui traverse les modes.",
      en: "The Élégance watch plays the minimalism card: steel case, luminous dial and slim strap. A timepiece that outlives trends.",
    },
    details: {
      fr: [
        "Matière : acier inoxydable, verre minéral renforcé",
        "Design : boîtier 30 mm, bracelet fin",
        "Finition : mouvement quartz japonais, 3 ATM",
      ],
      en: [
        "Material: stainless steel, reinforced mineral glass",
        "Design: 30 mm case, slim strap",
        "Finish: Japanese quartz movement, 3 ATM",
      ],
    },
    variants: { colors: ["or", "argent"] },
  },
  {
    slug: "montre-prestige",
    name: "Montre Prestige Dorée",
    category: "montres",
    materials: ["plaque-or"],
    priceXof: 39000,
    images: [img("montre-prestige"), img("montre-prestige", 2)],
    rating: 4.7,
    reviews: 33,
    isNew: true,
    short: {
      fr: "Montre dorée bracelet maillons — l'accessoire statut.",
      en: "Gold link-strap watch — the status accessory.",
    },
    description: {
      fr: "La Montre Prestige assume son nom : dorure 18 carats sur boîtier et bracelet maillons, cadran champagne. Elle se remarque, poliment.",
      en: "The Prestige watch owns its name: 18k gilding on the case and link bracelet, champagne dial. It gets noticed — politely.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats sur acier",
        "Design : boîtier 32 mm, bracelet maillons",
        "Finition : quartz japonais, 3 ATM",
      ],
      en: [
        "Material: 18k gold plated on steel",
        "Design: 32 mm case, link bracelet",
        "Finish: Japanese quartz, 3 ATM",
      ],
    },
    variants: { colors: ["or", "argent"] },
  },

  /* ------------------------------ BIJOUX PERSONNALISÉS -------------------------- */
  {
    slug: "pendantif-prenom",
    name: "Pendentif Prénom",
    category: "pendentifs",
    materials: ["plaque-or"],
    priceXof: 19500,
    images: [img("pendantif-prenom"), img("pendantif-prenom", 2)],
    rating: 4.9,
    reviews: 210,
    isBestseller: true,
    custom: "prenom",
    short: {
      fr: "Votre prénom en lettres dorées, façonné à la main.",
      en: "Your name in golden letters, handcrafted.",
    },
    description: {
      fr: "Choisissez le prénom, la police et la finition : notre atelier façonne chaque lettre à la main avant de la suspendre à une fine chaîne dorée. Le cadeau qui fait pleurer de joie.",
      en: "Choose the name, font and finish: our workshop handcrafts every letter before hanging it on a fine gold chain. The gift that brings tears of joy.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats ou argent 925",
        "Design : lettres script 12–20 mm, chaîne au choix",
        "Finition : fabrication à la main, 48–72h",
      ],
      en: [
        "Material: 18k gold plated or 925 silver",
        "Design: 12–20 mm script letters, chain of choice",
        "Finish: handmade, 48–72h",
      ],
    },
    variants: { lengths: ["40 cm", "45 cm", "50 cm"], colors: ["or", "argent"] },
  },
  {
    slug: "pendantif-photo",
    name: "Pendentif Photo",
    category: "pendentifs",
    materials: ["plaque-or"],
    priceXof: 22000,
    images: [img("pendantif-photo")],
    rating: 4.9,
    reviews: 96,
    custom: "photo",
    short: {
      fr: "Votre photo préférée, gardée près du cœur.",
      en: "Your favourite photo, kept close to the heart.",
    },
    description: {
      fr: "Un médaillon doré qui s'ouvre sur votre photo souvenir : maman, enfant, amour ou souvenir. Envoyez-nous la photo sur WhatsApp après votre commande, notre atelier se charge du reste.",
      en: "A gold locket that opens onto your keepsake photo: mum, child, love or memory. Send us the photo on WhatsApp after ordering — our workshop takes care of the rest.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats, verre protecteur",
        "Design : médaillon ovale 20 × 25 mm, dos gravable",
        "Finition : impression haute définition offerte",
      ],
      en: [
        "Material: 18k gold plated, protective glass",
        "Design: 20 × 25 mm oval locket, engravable back",
        "Finish: free high-definition print",
      ],
    },
    variants: { lengths: ["45 cm", "50 cm"], colors: ["or", "argent"] },
  },
  {
    slug: "bracelet-grave",
    name: "Bracelet Gravé",
    category: "bracelets",
    materials: ["plaque-or"],
    priceXof: 16500,
    images: [img("bracelet-grave"), img("bracelet-grave", 2)],
    rating: 4.8,
    reviews: 121,
    custom: "grave",
    short: {
      fr: "Une date, un mot, une promesse — gravés pour toujours.",
      en: "A date, a word, a promise — engraved forever.",
    },
    description: {
      fr: "Sur ce bracelet plaqué or, notre atelier grave à la main votre message : une date d'anniversaire, un prénom, « à toi toujours ». Un bijou qui dit ce que vous n'osez pas.",
      en: "On this gold-plated bracelet, our workshop hand-engraves your message: a birthday date, a name, \"forever yours\". A jewel that says what you dare not.",
    },
    details: {
      fr: [
        "Matière : plaqué or 18 carats, plaque gravable",
        "Design : plaque 30 × 6 mm, chaîne 1,5 mm",
        "Finition : gravure main, 20 caractères offerts",
      ],
      en: [
        "Material: 18k gold plated, engravable plate",
        "Design: 30 × 6 mm plate, 1.5 mm chain",
        "Finish: hand engraving, 20 characters included",
      ],
    },
    variants: { colors: ["or", "argent"] },
  },

  /* ----------------------------------- HOMME ----------------------------------- */
  {
    slug: "chaine-homme-cobra",
    name: "Chaîne Homme Cobra",
    category: "colliers",
    materials: ["acier-inoxydable"],
    priceXof: 27500,
    images: [img("chaine-homme-cobra"), img("chaine-homme-cobra", 2)],
    rating: 4.7,
    reviews: 88,
    isBestseller: true,
    forMen: true,
    short: {
      fr: "Chaîne cobra acier doré 6 mm — le style qui ne s'excuse pas.",
      en: "6 mm gold cobra steel chain — unapologetic style.",
    },
    description: {
      fr: "La Chaîne Cobra est notre best-seller homme : maille cobra 6 mm en acier inoxydable doré, waterproof et indestructible. Elle se porte seule ou avec le Bracelet Homme Onyx.",
      en: "The Cobra chain is our men's best-seller: 6 mm cobra link in gold stainless steel, waterproof and unbreakable. Wear it alone or with the Onyx men's bracelet.",
    },
    details: {
      fr: [
        "Matière : acier inoxydable 316L doré PVD",
        "Design : maille cobra 6 mm, fermoir renforcé",
        "Finition : waterproof, anti-rayures",
      ],
      en: [
        "Material: PVD gold-plated 316L stainless steel",
        "Design: 6 mm cobra link, reinforced clasp",
        "Finish: waterproof, scratch-resistant",
      ],
    },
    variants: { lengths: ["50 cm", "55 cm", "60 cm"] },
  },
  {
    slug: "bracelet-homme-onyx",
    name: "Bracelet Homme Onyx",
    category: "bracelets",
    materials: ["acier-inoxydable"],
    priceXof: 15900,
    images: [img("bracelet-homme-onyx"), img("bracelet-homme-onyx", 2)],
    rating: 4.6,
    reviews: 54,
    forMen: true,
    short: {
      fr: "Perles onyx noires et acier doré — le poignet affirmé.",
      en: "Black onyx beads and gold steel — an assertive wrist.",
    },
    description: {
      fr: "Perles d'onyx noir 8 mm et intercalaires en acier doré : le Bracelet Homme Onyx équilibre force et raffinement. Élastique haute résistance, taille ajustable.",
      en: "8 mm black onyx beads with gold steel spacers: the Onyx men's bracelet balances strength and refinement. High-strength elastic, adjustable size.",
    },
    details: {
      fr: [
        "Matière : onyx naturel 8 mm, acier doré PVD",
        "Design : élastique haute résistance",
        "Finition : perles polies main",
      ],
      en: [
        "Material: 8 mm natural onyx, PVD gold steel",
        "Design: high-strength elastic",
        "Finish: hand-polished beads",
      ],
    },
    variants: { sizes: ["S", "M", "L"] },
  },
];

/* ---------------------------------- Helpers ---------------------------------- */

export function getProduct(slug: string | undefined): Product | undefined {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function newArrivals(): Product[] {
  const news = products.filter((p) => p.isNew);
  return news.length >= 5 ? news : [...news, ...bestSellers()].slice(0, 5);
}

export function bestSellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function onSale(): Product[] {
  return products.filter((p) => p.compareAtXof);
}

export function customProducts(): Product[] {
  return products.filter((p) => p.custom);
}

export function forMen(): Product[] {
  return products.filter((p) => p.forMen);
}

export function relatedProducts(product: Product, count = 8): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  );
  const fill = bestSellers().filter(
    (p) => p.slug !== product.slug && !sameCategory.some((s) => s.slug === p.slug)
  );
  return [...sameCategory, ...fill].slice(0, count);
}

/** Category tile image for the "Shop by type" grid (uses a flagship product photo). */
export const CATEGORY_TILES: Array<{ slug: CategorySlug; image: string }> = [
  { slug: "colliers", image: img("collier-luna") },
  { slug: "bagues", image: img("bague-nova") },
  { slug: "bracelets", image: img("bracelet-nova") },
  { slug: "boucles-oreilles", image: img("boucles-aurore") },
  { slug: "montres", image: img("montre-elegance") },
  { slug: "parures", image: img("parure-eclat") },
];
