"use client";

/**
 * Contact — #/contact. WhatsApp-first contact form + info cards (showroom,
 * WhatsApp, e-mail, socials) + Google Maps embed.
 */
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site-config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TikTokIcon, WhatsAppIcon } from "@/components/shared/social-icons";

/** Local bilingual string (no matching i18n key). */
const FORM_ERROR = {
  fr: "Merci de renseigner votre nom et votre message.",
  en: "Please fill in your name and your message.",
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

/** Right-column info card — gold icon, title and body. */
function ContactCard({ icon, title, children }: ContactCardProps) {
  return (
    <div className="rounded-[10px] border border-hairline bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-band text-gold-dark">
          {icon}
        </span>
        <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      </div>
      <div className="mt-3 text-[14.5px] leading-relaxed text-body">{children}</div>
    </div>
  );
}

/** Circular social link button (opens in a new tab). */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-emerald hover:bg-emerald hover:text-ivory"
    >
      {children}
    </a>
  );
}

export default function ContactView() {
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error(FORM_ERROR[lang]);
      return;
    }
    window.open(
      whatsappLink(`Bonjour ORAYA Maison, je suis ${name.trim()}. ${message.trim()}`),
      "_blank"
    );
    toast.success(t("contact.sendToast"));
  };

  return (
    <div className="py-10 md:py-14">
      <div className="container-x">
        {/* Header */}
        <header className="text-center">
          <h1 className="font-serif text-[30px] leading-[1.12] font-semibold text-ink md:text-[44px]">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-body">
            {t("contact.subtitle")}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Contact form */}
          <form onSubmit={onSubmit} noValidate className="h-fit rounded-[10px] border border-hairline bg-white p-6">
            <h2 className="font-serif text-[24px] font-semibold text-ink">{t("contact.form")}</h2>
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-[13.5px] font-medium text-ink">
                  {t("contact.name")}
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  autoComplete="name"
                  className="h-11 rounded-[6px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-[13.5px] font-medium text-ink">
                  {t("contact.message")}
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  className="min-h-[120px] rounded-[6px]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-emerald text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark sm:w-auto sm:px-8"
            >
              <WhatsAppIcon size={18} />
              {t("contact.send")}
            </button>
          </form>

          {/* Info cards */}
          <div className="grid content-start gap-4">
            <ContactCard
              icon={<MapPin size={18} aria-hidden="true" />}
              title={t("contact.showroom")}
            >
              <p>{t("footer.address")}</p>
              <p className="mt-2">
                <span className="font-medium text-ink">{t("footer.weekdays")}</span>
                <br />
                {t("footer.weekend")}
              </p>
            </ContactCard>

            <ContactCard
              icon={<WhatsAppIcon size={18} />}
              title={t("contact.callUs")}
            >
              <p className="font-medium text-ink">{site.whatsappDisplay}</p>
              <a
                href={whatsappLink(t("whatsapp.orderMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-[6px] bg-whatsapp px-5 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon size={16} />
                {t("contact.whatsappCta")}
              </a>
            </ContactCard>

            <ContactCard icon={<Mail size={18} aria-hidden="true" />} title={t("contact.writeUs")}>
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-ink underline decoration-gold underline-offset-4 transition-colors hover:text-emerald"
              >
                {site.email}
              </a>
            </ContactCard>

            <ContactCard
              icon={<Instagram size={18} aria-hidden="true" />}
              title={t("contact.followUs")}
            >
              <div className="flex items-center gap-3">
                <SocialLink href={site.instagram} label="Instagram">
                  <Instagram size={17} aria-hidden="true" />
                </SocialLink>
                <SocialLink href={site.tiktok} label="TikTok">
                  <TikTokIcon size={17} />
                </SocialLink>
                <SocialLink href={site.facebook} label="Facebook">
                  <Facebook size={17} aria-hidden="true" />
                </SocialLink>
                <SocialLink href={whatsappLink(t("whatsapp.orderMessage"))} label="WhatsApp">
                  <WhatsAppIcon size={17} />
                </SocialLink>
              </div>
            </ContactCard>
          </div>
        </div>

        {/* Map */}
        <iframe
          title={t("contact.mapTitle")}
          src={site.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-10 h-[300px] w-full rounded-[10px] border border-hairline"
        />
      </div>
    </div>
  );
}
