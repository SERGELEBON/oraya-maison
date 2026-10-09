"use client";

/**
 * Checkout view (#/commande) — contact details, delivery zone (Abidjan
 * communes / interior / international) and payment method on the left,
 * sticky order summary on the right. Orders are confirmed through WhatsApp;
 * placing an order shows a success screen with the generated reference
 * (ORAYA-XXXX) and keeps the pre-built WhatsApp link alive.
 */
import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Banknote, CreditCard, ShoppingBag, Smartphone, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { StarSpark } from "@/components/shared/logo";
import { Price } from "@/components/shared/price";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cartSubtotalXof, useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useI18n } from "@/lib/i18n";
import { useRouter } from "@/lib/router";
import { deliveryZones, paymentMethods, site, whatsappLink } from "@/lib/site-config";
import type { DeliveryZone, PaymentId, ZoneId } from "@/lib/site-config";
import type { CartItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/* ------------------------------ Local strings ----------------------------- */

/** Local fallback (no i18n key yet): free-shipping note on the Abidjan card. */
const FREE_FROM_NOTE = {
  fr: "Livraison offerte dès {amount}",
  en: "Free delivery from {amount}",
} as const;

const ZONE_LABEL_KEYS: Record<ZoneId, string> = {
  abidjan: "checkout.zoneAbidjan",
  interieur: "checkout.zoneInterior",
  international: "checkout.zoneInternational",
};

const PAYMENT_ICONS: Record<PaymentId, LucideIcon> = {
  wave: Smartphone,
  orange: Smartphone,
  mtn: Smartphone,
  moov: Smartphone,
  card: CreditCard,
  cod: Banknote,
};

/** Only these payment methods display a hint line when selected. */
const PAYMENT_HINT_KEYS: Partial<Record<PaymentId, string>> = {
  cod: "checkout.payHintCod",
  wave: "checkout.payHintWave",
  orange: "checkout.payHintOm",
  card: "checkout.payHintCard",
};

/* ------------------------------ Small pieces ------------------------------ */

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 font-serif text-[22px] font-semibold text-ink">
      <StarSpark className="text-gold" size={14} />
      {children}
    </h2>
  );
}

interface ZoneCardProps {
  zone: DeliveryZone;
  label: string;
  eta: string;
  freeFromNote: string | null;
  selected: boolean;
  onSelect: (id: ZoneId) => void;
}

function ZoneCard({ zone, label, eta, freeFromNote, selected, onSelect }: ZoneCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(zone.id)}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-3 rounded-[8px] border-2 p-4 text-left transition-colors",
        selected ? "border-emerald bg-emerald/5" : "border-hairline bg-white hover:border-emerald/40"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-emerald" : "border-hairline"
        )}
      >
        {selected && <span className="h-[8px] w-[8px] rounded-full bg-emerald" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-ink">{label}</span>
        <span className="mt-1 flex items-center gap-1.5 text-[12px] text-body">
          <Truck size={13} aria-hidden="true" className="text-gold" />
          {eta}
        </span>
        <span className="mt-1.5 block">
          <Price xof={zone.feeXof} className="text-[13px] font-semibold text-ink" />
          {freeFromNote && (
            <span className="ml-2 text-[11px] font-medium text-emerald">{freeFromNote}</span>
          )}
        </span>
      </span>
    </button>
  );
}

interface PaymentOptionProps {
  id: PaymentId;
  label: string;
  icon: LucideIcon;
  selected: boolean;
  disabled: boolean;
  onSelect: (id: PaymentId) => void;
}

function PaymentOption({ id, label, icon: Icon, selected, disabled, onSelect }: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex min-h-[58px] items-center gap-2.5 rounded-[8px] border-2 p-3.5 text-left transition-colors",
        disabled && "cursor-not-allowed opacity-40",
        selected && !disabled ? "border-emerald bg-emerald/5" : "border-hairline bg-white",
        !disabled && !selected && "hover:border-emerald/40"
      )}
    >
      <Icon
        size={18}
        aria-hidden="true"
        className={cn("shrink-0", selected ? "text-emerald" : "text-body")}
      />
      <span className="text-[13px] font-semibold leading-snug text-ink">{label}</span>
    </button>
  );
}

function SummaryItem({ item }: { item: CartItem }) {
  return (
    <li className="flex items-center gap-3">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="h-12 w-12 shrink-0 rounded-[4px] object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
        <p className="text-[12px] text-body">×{item.qty}</p>
      </div>
      <Price xof={item.unitPriceXof * item.qty} className="text-[13px] font-semibold text-ink" />
    </li>
  );
}

/* ---------------------------- WhatsApp message ---------------------------- */

interface OrderMessageInput {
  t: (key: string, vars?: Record<string, string | number>) => string;
  format: (xof: number) => string;
  items: CartItem[];
  ref?: string;
  name: string;
  phone: string;
  zoneLabel: string;
  commune: string;
  paymentLabel: string;
  total: number;
}

function buildOrderMessage(input: OrderMessageInput): string {
  const { t, format, items, ref, name, phone, zoneLabel, commune, paymentLabel, total } = input;
  const lines: string[] = [t("whatsapp.orderIntro"), ""];
  for (const item of items) {
    let line = `• ${item.name} ×${item.qty} — ${format(item.unitPriceXof * item.qty)}`;
    if (item.options && Object.keys(item.options).length > 0) {
      const options = Object.entries(item.options)
        .map(([k, v]) => `${k} : ${v}`)
        .join(", ");
      line += ` (${options})`;
    }
    lines.push(line);
  }
  if (ref) lines.push(t("whatsapp.orderRef", { ref }));
  lines.push(t("whatsapp.orderCustomer", { name }));
  lines.push(t("whatsapp.orderPhone", { phone }));
  lines.push(
    t("whatsapp.orderZone", { zone: commune ? `${zoneLabel} — ${commune}` : zoneLabel })
  );
  lines.push(t("whatsapp.orderPayment", { payment: paymentLabel }));
  lines.push(t("whatsapp.orderTotal", { total: format(total) }));
  return lines.join("\n");
}

/* ----------------------------------- View ----------------------------------- */

export default function CheckoutView() {
  const { t, lang } = useI18n();
  const { format } = useCurrency();
  const { navigate } = useRouter();
  const { items, clear } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zone, setZone] = useState<ZoneId>("abidjan");
  const [commune, setCommune] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<PaymentId>("wave");
  const [placed, setPlaced] = useState<{ ref: string; whatsappUrl: string } | null>(null);

  const subtotal = cartSubtotalXof(items);
  const activeZone = deliveryZones.find((z) => z.id === zone) ?? deliveryZones[0];
  const freeShipping = activeZone.freeFromXof !== null && subtotal >= activeZone.freeFromXof;
  const feeXof = freeShipping ? 0 : activeZone.feeXof;
  const total = subtotal + feeXof;

  const zoneLabel = t(ZONE_LABEL_KEYS[zone]);
  const paymentLabel = t(`checkout.payments.${payment}`);
  const effectiveCommune = zone === "abidjan" ? commune : "";
  const paymentHintKey = PAYMENT_HINT_KEYS[payment];

  const handleZoneChange = (id: ZoneId) => {
    setZone(id);
    // Cash on delivery is only available inside Abidjan.
    if (id !== "abidjan" && payment === "cod") {
      setPayment("wave");
    }
  };

  const buildMessage = (ref?: string) =>
    buildOrderMessage({
      t,
      format,
      items,
      ref,
      name,
      phone,
      zoneLabel,
      commune: effectiveCommune,
      paymentLabel,
      total,
    });

  const handlePlaceOrder = () => {
    if (!name.trim() || !phone.trim() || (zone === "abidjan" && !commune)) {
      toast.error(t("checkout.required"));
      return;
    }
    const ref = `ORAYA-${Math.floor(1000 + Math.random() * 9000)}`;
    const whatsappUrl = whatsappLink(buildMessage(ref));
    setPlaced({ ref, whatsappUrl });
    clear();
  };

  /* --------------------------------- Success -------------------------------- */
  if (placed) {
    return (
      <div className="container-x py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-[560px] text-center"
        >
          <span className="mx-auto flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gold/15">
            <StarSpark className="text-gold" size={56} />
          </span>
          <h1 className="mt-7 font-serif text-[36px] font-semibold text-ink">
            {t("checkout.success")}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-body">
            {t("checkout.successText", { ref: placed.ref })}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-band px-5 py-2 text-[13px] font-semibold text-ink">
            {t("checkout.orderRefLabel")} · {placed.ref}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={placed.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[6px] bg-gold px-8 text-[14px] font-semibold text-white transition-colors hover:bg-gold-dark"
            >
              <WhatsAppIcon size={18} />
              {t("checkout.successWhatsapp")}
            </a>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="label-caps inline-flex h-[50px] items-center justify-center rounded-[4px] border-2 border-emerald bg-white px-8 text-[13px] font-semibold text-emerald transition-colors hover:bg-emerald hover:text-ivory"
            >
              {t("checkout.backHome")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ------------------------------- Empty cart ------------------------------- */
  if (items.length === 0) {
    return (
      <div className="container-x py-12 md:py-16">
        <h1 className="text-center font-serif text-[30px] font-semibold text-ink md:text-[40px]">
          {t("checkout.title")}
        </h1>
        <div className="mt-10 flex flex-col items-center text-center">
          <ShoppingBag size={48} className="text-gold" aria-hidden="true" />
          <p className="mt-5 text-[16px] font-semibold text-ink">{t("cart.empty")}</p>
          <p className="mt-2 max-w-[420px] text-[14px] text-body">{t("cart.emptyText")}</p>
          <button
            type="button"
            onClick={() => navigate("/boutique")}
            className="label-caps mt-8 inline-flex h-[50px] items-center justify-center rounded-[4px] bg-emerald px-10 text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
          >
            {t("cart.emptyCta")}
          </button>
        </div>
      </div>
    );
  }

  /* ----------------------------------- Form ---------------------------------- */
  return (
    <div className="container-x py-8 md:py-12">
      <h1 className="font-serif text-[30px] font-semibold text-ink md:text-[40px]">
        {t("checkout.title")}
      </h1>

      <div className="mt-6 grid items-start gap-8 md:mt-8 lg:grid-cols-[1fr_380px]">
        {/* Left — form */}
        <div className="space-y-10">
          <section>
            <SectionTitle>{t("checkout.contact")}</SectionTitle>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="co-name">
                  {t("checkout.fullName")} <span className="text-sale">*</span>
                </Label>
                <Input
                  id="co-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("checkout.fullNamePlaceholder")}
                  autoComplete="name"
                  className="h-11 rounded-[4px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-phone">
                  {t("checkout.phone")} <span className="text-sale">*</span>
                </Label>
                <Input
                  id="co-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("checkout.phonePlaceholder")}
                  autoComplete="tel"
                  className="h-11 rounded-[4px]"
                />
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>{t("checkout.zone")}</SectionTitle>
            <div className="mt-5 grid gap-3">
              {deliveryZones.map((z) => (
                <ZoneCard
                  key={z.id}
                  zone={z}
                  label={t(ZONE_LABEL_KEYS[z.id])}
                  eta={z.eta[lang]}
                  freeFromNote={
                    z.freeFromXof !== null
                      ? FREE_FROM_NOTE[lang].replace("{amount}", format(z.freeFromXof))
                      : null
                  }
                  selected={zone === z.id}
                  onSelect={handleZoneChange}
                />
              ))}
            </div>

            <div className="mt-4 grid gap-4">
              {zone === "abidjan" && (
                <div className="space-y-2">
                  <Label htmlFor="co-commune">
                    {t("checkout.commune")} <span className="text-sale">*</span>
                  </Label>
                  <Select value={commune} onValueChange={setCommune}>
                    <SelectTrigger id="co-commune" className="h-11 w-full rounded-[4px]">
                      <SelectValue placeholder={t("checkout.communePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {site.abidjanCommunes.map((communeName) => (
                        <SelectItem key={communeName} value={communeName}>
                          {communeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="co-neighborhood">{t("checkout.neighborhood")}</Label>
                <Input
                  id="co-neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder={t("checkout.neighborhoodPlaceholder")}
                  className="h-11 rounded-[4px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-notes">{t("checkout.notes")}</Label>
                <Textarea
                  id="co-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("checkout.notesPlaceholder")}
                  className="rounded-[4px]"
                />
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>{t("checkout.payment")}</SectionTitle>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {paymentMethods.map((id) => (
                <PaymentOption
                  key={id}
                  id={id}
                  label={t(`checkout.payments.${id}`)}
                  icon={PAYMENT_ICONS[id]}
                  selected={payment === id}
                  disabled={id === "cod" && zone !== "abidjan"}
                  onSelect={setPayment}
                />
              ))}
            </div>
            {paymentHintKey && <p className="mt-3 text-[12px] text-body">{t(paymentHintKey)}</p>}
          </section>
        </div>

        {/* Right — sticky order summary */}
        <aside className="rounded-[8px] border border-hairline bg-white p-6 lg:sticky lg:top-24">
          <SectionTitle>{t("checkout.summary")}</SectionTitle>

          <ul className="custom-scroll mt-4 max-h-[264px] space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <SummaryItem key={item.key} item={item} />
            ))}
          </ul>

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-[14px]">
            <span className="text-body">{t("cart.subtotal")}</span>
            <Price xof={subtotal} className="font-semibold text-ink" />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[14px]">
            <span className="text-body">{t("cart.shipping")}</span>
            {freeShipping ? (
              <span className="text-[13px] font-semibold text-emerald">
                {t("cart.freeShipping")}
              </span>
            ) : (
              <Price xof={feeXof} className="text-[13px] font-semibold text-ink" />
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-ink">{t("cart.total")}</span>
            <Price xof={total} className="text-[20px] font-bold text-ink" />
          </div>

          <a
            href={whatsappLink(buildMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-[6px] bg-gold text-[14px] font-semibold text-white transition-colors hover:bg-gold-dark"
          >
            <WhatsAppIcon size={18} />
            {t("checkout.whatsappOrder")}
          </a>
          <p className="mt-2 text-center text-[12px] text-body">{t("checkout.whatsappHint")}</p>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="label-caps mt-4 h-[52px] w-full rounded-[4px] bg-emerald text-[14px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
          >
            {t("checkout.placeOrder")}
          </button>
        </aside>
      </div>
    </div>
  );
}
