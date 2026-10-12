"use client";

/**
 * Footer (emerald) — 3 columns with gold titles: NOTRE BOUTIQUE (address, call/WhatsApp,
 * hours) · SERVICE CLIENT · INFORMATIONS, plus socials, payment logo band and copyright bar.
 */
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useNavigate } from "@/lib/router";
import { site, whatsappLink } from "@/lib/site-config";
import { Facebook, Instagram } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/shared/social-icons";
import { StarSpark } from "@/components/shared/logo";

const PAYMENT_METHODS: { name: string; src?: string; bg?: string }[] = [
  { name: "Wave", src: "/images/payments/wave.png" },
  { name: "Orange Money", bg: "#FF7900" },
  { name: "MTN MoMo", src: "/images/payments/mtn-momo.png" },
  { name: "Moov Money", src: "/images/payments/moov-money.png" },
  { name: "Visa", src: "/images/payments/visa.png" },
  { name: "Mastercard", src: "/images/payments/mastercard.png" },
];

function FooterLink({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return (
    <li>
      <button
        type="button"
        onClick={() => navigate(to)}
        className="text-left text-[15px] text-ivory/80 transition-colors hover:text-gold"
      >
        {label}
      </button>
    </li>
  );
}

export function SiteFooter() {
  const { t } = useI18n();

  const title = "label-caps mb-4 flex items-center gap-2 text-[18px] font-semibold text-gold md:text-[22px]";

  return (
    <footer className="mt-auto">
      <div className="bg-emerald">
        <div className="container-x grid gap-10 py-12 md:grid-cols-3 md:py-16">
          {/* Notre boutique */}
          <div>
            <h3 className={title}>
              <StarSpark size={12} />
              {t("footer.shopTitle")}
            </h3>
            <ul className="grid gap-3 text-[15px] text-ivory/80">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block text-[13px] text-ivory/60">{t("footer.callWhatsapp")}</span>
                  <a
                    href={whatsappLink(t("whatsapp.orderMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ivory transition-colors hover:text-gold"
                  >
                    {site.whatsappDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block text-[13px] text-ivory/60">{t("footer.hours")}</span>
                  {t("footer.weekdays")}
                  <br />
                  {t("footer.weekend")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Service client */}
          <div>
            <h3 className={title}>
              <StarSpark size={12} />
              {t("footer.serviceTitle")}
            </h3>
            <ul className="grid gap-2.5">
              <FooterLink to="/infos/a-propos" label={t("footer.service.about")} />
              <FooterLink to="/infos/livraison-paiement" label={t("footer.service.shipping")} />
              <FooterLink to="/infos/livraison-paiement" label={t("footer.service.payments")} />
              <FooterLink to="/infos/cgv" label={t("footer.service.terms")} />
              <FooterLink to="/infos/confidentialite" label={t("footer.service.privacy")} />
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className={title}>
              <StarSpark size={12} />
              {t("footer.infoTitle")}
            </h3>
            <ul className="grid gap-2.5">
              <FooterLink to="/infos/entretien" label={t("footer.info.care")} />
              <FooterLink to="/infos/guide-tailles" label={t("footer.info.sizeGuide")} />
              <FooterLink to="/infos/types-bijoux" label={t("footer.info.types")} />
              <FooterLink to="/contact" label={t("contact.title")} />
            </ul>

            <p className="label-caps mt-8 mb-3 text-[13px] font-semibold text-gold">
              {t("footer.followUs")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <TikTokIcon size={16} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a
                href={whatsappLink(t("whatsapp.orderMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <WhatsAppIcon size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment logos band */}
      <div className="border-t border-ivory/10 bg-white">
        <div className="container-x flex flex-col items-center justify-center gap-3 py-5 md:flex-row md:gap-6">
          <span className="label-caps text-[11px] font-semibold tracking-[0.18em] text-body/70">
            {t("footer.payments")}
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-2.5" aria-label={t("footer.payments")}>
            {PAYMENT_METHODS.map((m) => (
              <li
                key={m.name}
                title={m.name}
                className="flex h-9 w-[58px] items-center justify-center overflow-hidden rounded-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5 md:h-10 md:w-16"
                style={m.bg ? { backgroundColor: m.bg } : undefined}
              >
                {m.src ? (
                  <img
                    src={m.src}
                    alt={m.name}
                    width={64}
                    height={40}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="px-1 text-center text-[9px] font-extrabold leading-[1.05] tracking-tight text-white md:text-[10px]">
                    {m.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-emerald-deeper">
        <div className="container-x py-4 text-center text-[13px] text-ivory/70">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
