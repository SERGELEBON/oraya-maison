"use client";

/**
 * "Visitez-nous / Livraison partout à Abidjan" — dark emerald-tinted showroom
 * photo block with gold 40px title, delivery zones and Google Maps embed.
 */
import { Clock, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site-config";
import { StarSpark } from "@/components/shared/logo";

export function VisitSection() {
  const { t, tx } = useI18n();
  const zones = tx<string[]>("visit.zones");

  return (
    <section className="relative overflow-hidden bg-emerald-dark" aria-labelledby="visit-title">
      <img
        src="/images/brand/showroom.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deeper/85 to-emerald-deeper/70" aria-hidden="true" />

      <div className="container-x relative py-14 md:py-20">
        <p className="label-caps mb-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-gold md:text-[13px]">
          <StarSpark size={11} />
          {t("visit.eyebrow")}
        </p>
        <h2
          id="visit-title"
          className="text-center font-serif text-[32px] font-semibold text-gold md:text-[40px]"
        >
          {t("visit.title")}
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Showroom card */}
          <div className="rounded-[10px] border border-ivory/15 bg-emerald/40 p-6 backdrop-blur-sm md:p-8">
            <h3 className="font-serif text-[24px] font-semibold text-ivory">{t("contact.showroom")}</h3>
            <ul className="mt-5 grid gap-4 text-[15px] text-ivory/85">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                {t("footer.address")}
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block text-[12px] text-ivory/60">{t("footer.callWhatsapp")}</span>
                  <a
                    href={whatsappLink(t("whatsapp.orderMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ivory underline-offset-4 hover:text-gold hover:underline"
                  >
                    {site.whatsappDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block text-[12px] text-ivory/60">{t("footer.hours")}</span>
                  {t("footer.weekdays")}
                  <br />
                  {t("footer.weekend")}
                </span>
              </li>
            </ul>
          </div>

          {/* Delivery card */}
          <div className="rounded-[10px] border border-ivory/15 bg-emerald/40 p-6 backdrop-blur-sm md:p-8">
            <h3 className="font-serif text-[24px] font-semibold text-ivory">
              {t("visit.deliveryTitle")}
            </h3>
            <p className="mt-3 text-[14px] text-ivory/75">{t("visit.deliveryText")}</p>
            <p className="label-caps mt-5 mb-3 text-[11px] font-semibold text-gold">
              {t("visit.zonesTitle")}
            </p>
            <ul className="grid gap-2.5">
              {zones.map((zone) => (
                <li key={zone} className="flex items-center gap-2.5 text-[14.5px] text-ivory/85">
                  <StarSpark size={10} className="shrink-0 text-gold" />
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="mt-6 overflow-hidden rounded-[10px] border border-ivory/15">
          <iframe
            title={t("visit.mapTitle")}
            src={site.mapEmbedUrl}
            className="h-[280px] w-full md:h-[340px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
