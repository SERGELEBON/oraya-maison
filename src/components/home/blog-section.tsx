"use client";

/**
 * Blog — 4 joined cards (photo + white uppercase title band + underlined link).
 */
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { SectionHeader } from "@/components/shared/section-header";

const BLOG_IMAGES = [
  "/images/brand/blog-care.png",
  "/images/brand/blog-packaging.png",
  "/images/brand/blog-gift.png",
  "/images/brand/blog-style.png",
];

export function BlogSection() {
  const { t, tx } = useI18n();
  const navigate = useNavigate();
  const cards = tx<Array<{ title: string; text: string; slug: string }>>("blog.cards");

  return (
    <section className="py-14 md:py-20" aria-labelledby="blog-title">
      <div className="container-x">
        <SectionHeader eyebrowKey="blog.eyebrow" titleKey="blog.title" />

        <div className="mt-10 grid grid-cols-1 gap-[1px] overflow-hidden rounded-[8px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <button
              key={card.slug + i}
              type="button"
              onClick={() => navigate(`/infos/${card.slug}`)}
              className="group flex flex-col bg-white text-left"
            >
              <div className="aspect-[4/3] overflow-hidden bg-ivory">
                <img
                  src={BLOG_IMAGES[i % BLOG_IMAGES.length]}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <h3 className="text-[17px] leading-snug font-semibold tracking-wide text-ink uppercase md:text-[20px] lg:text-[22px]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-body">{card.text}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald underline underline-offset-4">
                  {t("blog.readMore")}
                  <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
