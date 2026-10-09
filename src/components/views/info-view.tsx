"use client";

/**
 * Info pages — #/infos/:slug (9 editorial pages driven entirely by i18n content).
 * Extras: "a-propos" hero image · "guide-tailles" size chart + measuring guide ·
 * "livraison-paiement" payment badges band.
 */
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { GoldDivider } from "@/components/shared/section-header";
import { StarSpark } from "@/components/shared/logo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VALID_SLUGS = [
  "a-propos",
  "livraison-paiement",
  "cgv",
  "confidentialite",
  "entretien",
  "guide-tailles",
  "guide-cadeaux",
  "astuces-style",
  "types-bijoux",
] as const;

interface InfoSection {
  h: string;
  p: string[];
}

interface InfoContent {
  title: string;
  intro: string;
  sections?: InfoSection[];
}

/** Ring size chart — size / circumference (mm) / diameter (mm). */
const RING_SIZES: Array<{ size: string; circumference: string; diameter: string }> = [
  { size: "48", circumference: "48.4", diameter: "15.4" },
  { size: "50", circumference: "50.3", diameter: "16.0" },
  { size: "52", circumference: "52.2", diameter: "16.6" },
  { size: "54", circumference: "54.0", diameter: "17.2" },
  { size: "56", circumference: "55.9", diameter: "17.8" },
  { size: "58", circumference: "57.8", diameter: "18.4" },
  { size: "60", circumference: "59.7", diameter: "19.0" },
];

/** Payment badges band (same labels as the footer band). */
const PAYMENT_LABELS = ["WAVE", "ORANGE MONEY", "MTN MoMo", "MOOV MONEY", "VISA", "Mastercard"];

/** Local bilingual strings (no matching i18n key). */
const ARIA_BREADCRUMB = { fr: "Fil d'Ariane", en: "Breadcrumb" };

function PaymentBadges() {
  const { t } = useI18n();
  return (
    <div className="mt-10 rounded-[10px] border border-hairline bg-white px-5 py-6">
      <p className="label-caps text-center text-[11px] font-semibold text-body/70">
        {t("footer.payments")}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {PAYMENT_LABELS.map((label) => (
          <span
            key={label}
            className="rounded-[3px] border border-hairline px-3 py-1.5 text-[11px] font-bold tracking-wide text-ink/80"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** "guide-tailles" extras — correspondence table, measuring steps, tips, boutique CTA. */
function GuideSizeExtras() {
  const { t, tx } = useI18n();
  const navigate = useNavigate();
  const how = tx<string[]>("info.guide-tailles.how") ?? [];
  const tips = tx<string[]>("info.guide-tailles.tips") ?? [];

  return (
    <div className="mt-10">
      <h2 className="font-serif text-[24px] font-semibold text-ink md:text-[30px]">
        {t("info.guide-tailles.tableTitle")}
      </h2>
      <div className="mt-4 max-w-2xl overflow-hidden rounded-[10px] border border-hairline bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-band hover:bg-band">
              <TableHead className="h-11 px-4 font-semibold text-ink">
                {t("info.guide-tailles.table.size")}
              </TableHead>
              <TableHead className="h-11 px-4 font-semibold text-ink">
                {t("info.guide-tailles.table.circumference")}
              </TableHead>
              <TableHead className="h-11 px-4 font-semibold text-ink">
                {t("info.guide-tailles.table.diameter")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RING_SIZES.map((row) => (
              <TableRow key={row.size}>
                <TableCell className="px-4 py-3 font-semibold text-ink">{row.size}</TableCell>
                <TableCell className="px-4 py-3 text-body">{row.circumference}</TableCell>
                <TableCell className="px-4 py-3 text-body">{row.diameter}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mt-10 font-serif text-[24px] font-semibold text-ink md:text-[30px]">
        {t("info.guide-tailles.howTitle")}
      </h2>
      <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-6 text-[15.5px] leading-relaxed text-body marker:font-semibold marker:text-gold-dark">
        {how.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <h2 className="mt-10 font-serif text-[24px] font-semibold text-ink md:text-[30px]">
        {t("info.guide-tailles.tipsTitle")}
      </h2>
      <ul className="mt-4 max-w-3xl space-y-2.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15.5px] leading-relaxed text-body">
            <StarSpark size={11} className="mt-[6px] shrink-0 text-gold" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => navigate("/boutique?cat=bagues")}
        className="label-caps mt-8 h-11 rounded-[4px] bg-emerald px-8 text-[13px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
      >
        {t("categories.bagues")}
      </button>
    </div>
  );
}

export default function InfoView({ slug }: { slug?: string }) {
  const { t, tx, lang } = useI18n();
  const navigate = useNavigate();

  const isValid = !!slug && (VALID_SLUGS as readonly string[]).includes(slug);

  if (!isValid || !slug) {
    return (
      <div className="container-x flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="font-serif text-[36px] font-semibold text-ink">{t("notFound.title")}</h1>
        <p className="max-w-md text-body">{t("notFound.text")}</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="label-caps h-11 rounded-[4px] bg-emerald px-8 text-[13px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
        >
          {t("notFound.cta")}
        </button>
      </div>
    );
  }

  const content = tx<InfoContent>(`info.${slug}`);
  const sections = content?.sections ?? [];

  return (
    <article className="py-10 md:py-14">
      <div className="container-x">
        {/* Breadcrumb + header */}
        <nav
          aria-label={ARIA_BREADCRUMB[lang]}
          className="flex flex-wrap items-center gap-2 text-[13px] text-body"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="transition-colors hover:text-emerald hover:underline"
          >
            {t("common.home")}
          </button>
          <span aria-hidden="true" className="text-hairline">
            /
          </span>
          <span className="font-medium text-ink">{content?.title}</span>
        </nav>

        <h1 className="mt-4 font-serif text-[30px] leading-[1.12] font-semibold text-ink md:text-[44px]">
          {content?.title}
        </h1>
        {content?.intro && (
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-body">{content.intro}</p>
        )}

        {/* "a-propos" — atelier hero image above sections */}
        {slug === "a-propos" && (
          <div className="mt-8 aspect-[3/2] w-full overflow-hidden rounded-[10px]">
            <img
              src="/images/brand/about-atelier.png"
              alt={content?.title ?? ""}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* "guide-tailles" — table + how to measure + tips */}
        {slug === "guide-tailles" && <GuideSizeExtras />}

        {/* Editorial sections */}
        <div className="max-w-3xl">
          {sections.map((section) => (
            <section key={section.h} className="mt-10">
              <h2 className="font-serif text-[24px] font-semibold text-ink md:text-[30px]">
                {section.h}
              </h2>
              <div className="mt-3 space-y-3">
                {section.p.map((para, i) => (
                  <p key={i} className="text-[15.5px] leading-relaxed text-body">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* "livraison-paiement" — payment badges band */}
        {slug === "livraison-paiement" && <PaymentBadges />}

        <GoldDivider className="my-12" />

        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="label-caps inline-flex h-11 items-center gap-2 rounded-[4px] border border-emerald px-8 text-[13px] font-medium text-emerald transition-colors hover:bg-emerald hover:text-ivory"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t("common.back")}
          </button>
        </div>
      </div>
    </article>
  );
}
