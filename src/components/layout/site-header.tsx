"use client";

/**
 * Site header (emerald, sticky) — logo, nav with "Boutique" mega-menu and
 * "Personnaliser" dropdown, cart with mini-cart + gold count badge, account sheet,
 * mobile burger menu.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, ShoppingBag, User, X } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useRouter } from "@/lib/router";
import { cartCount, cartSubtotalXof, useCart } from "@/lib/cart";
import { useMounted } from "@/hooks/use-mounted";
import { Logo } from "@/components/shared/logo";
import { Price } from "@/components/shared/price";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const TYPE_CATS = [
  "colliers",
  "bagues",
  "pendentifs",
  "bracelets",
  "boucles-oreilles",
  "parures",
  "montres",
] as const;
const MATERIALS = ["or-veritable", "plaque-or", "argent-925", "acier-inoxydable"] as const;
const CUSTOM_TYPES = ["prenom", "photo", "grave"] as const;

/* ---------------------------------- Mega menu ---------------------------------- */

function MegaMenuLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <a
      href={`#${href}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate();
      }}
      className="block py-[7px] text-left text-[15px] text-body transition-colors hover:text-emerald"
    >
      {label}
    </a>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useI18n();
  const navigate = useRouter().navigate;

  const go = (href: string) => {
    navigate(href);
    onNavigate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute top-full right-0 left-0 z-40 border-t border-hairline bg-white shadow-[0_24px_48px_-12px_rgba(13,14,17,0.18)]"
    >
      <div className="container-x grid grid-cols-2 gap-x-8 gap-y-6 py-8 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_250px_250px]">
        <div>
          <h3 className="label-caps mb-3 text-[12px] font-semibold text-ink">{t("mega.byType")}</h3>
          {TYPE_CATS.map((c) => (
            <MegaMenuLink key={c} href={`/boutique?cat=${c}`} label={t(`categories.${c}`)} onNavigate={() => go(`/boutique?cat=${c}`)} />
          ))}
        </div>
        <div>
          <h3 className="label-caps mb-3 text-[12px] font-semibold text-ink">{t("mega.byMaterial")}</h3>
          {MATERIALS.map((m) => (
            <MegaMenuLink key={m} href={`/boutique?mat=${m}`} label={t(`materials.${m}`)} onNavigate={() => go(`/boutique?mat=${m}`)} />
          ))}
          <div className="mt-4 border-t border-hairline pt-3">
            <MegaMenuLink href="/boutique?tag=homme" label={t("mega.men")} onNavigate={() => go("/boutique?tag=homme")} />
          </div>
        </div>
        <div>
          <h3 className="label-caps mb-3 text-[12px] font-semibold text-ink">{t("mega.collections")}</h3>
          <MegaMenuLink href="/boutique?tag=nouveautes" label={t("nav.new")} onNavigate={() => go("/boutique?tag=nouveautes")} />
          <MegaMenuLink href="/boutique?tag=best-sellers" label={t("nav.bestsellers")} onNavigate={() => go("/boutique?tag=best-sellers")} />
          <MegaMenuLink href="/personnaliser" label={t("mega.customJewelry")} onNavigate={() => go("/personnaliser")} />
          <button
            type="button"
            onClick={() => go("/boutique")}
            className="label-caps mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald hover:text-emerald-dark"
          >
            {t("mega.viewAllShop")} <ChevronRight size={13} aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => go("/personnaliser")}
          className="group hidden overflow-hidden rounded-[6px] text-left lg:block"
        >
          <div className="aspect-[4/3] overflow-hidden bg-ivory">
            <img
              src="/images/brand/custom-prenom.png"
              alt={t("mega.promoCustomTitle")}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p className="mt-2 font-serif text-[17px] font-semibold text-ink">{t("mega.promoCustomTitle")}</p>
          <p className="text-[12px] text-body">{t("mega.promoCustomText")}</p>
        </button>

        <button
          type="button"
          onClick={() => go("/boutique?tag=nouveautes")}
          className="group hidden overflow-hidden rounded-[6px] text-left lg:block"
        >
          <div className="aspect-[4/3] overflow-hidden bg-ivory">
            <img
              src="/images/brand/look-bold.png"
              alt={t("mega.promoLookTitle")}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p className="mt-2 font-serif text-[17px] font-semibold text-ink">{t("mega.promoLookTitle")}</p>
          <p className="text-[12px] text-body">{t("mega.promoLookText")}</p>
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------------------------- Mini cart ---------------------------------- */

function MiniCart({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useI18n();
  const navigate = useRouter().navigate;
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const count = cartCount(items);
  const subtotal = cartSubtotalXof(items);

  const go = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        aria-label={t("nav.cart")}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-colors hover:bg-white/10"
      >
        <ShoppingBag size={22} aria-hidden="true" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
            {count}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[340px] rounded-[8px] p-0">
        <div className="border-b border-hairline px-4 py-3">
          <p className="label-caps text-[13px] font-semibold text-ink">
            {t("nav.cart")} {count > 0 && `(${count})`}
          </p>
        </div>

        {count === 0 ? (
          <p className="px-4 py-8 text-center text-[14px] text-body">{t("nav.emptyCart")}</p>
        ) : (
          <>
            <ul className="custom-scroll max-h-[320px] divide-y divide-hairline overflow-y-auto">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-[4px] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
                    {item.options && (
                      <p className="truncate text-[11px] text-body">
                        {Object.entries(item.options)
                          .map(([k, v]) => `${k} : ${v}`)
                          .join(" · ")}
                      </p>
                    )}
                    <div className="mt-1 flex items-center gap-2 text-[12px]">
                      <span className="text-body">×{item.qty}</span>
                      <Price xof={item.unitPriceXof * item.qty} className="font-semibold text-emerald" />
                      <button
                        type="button"
                        onClick={() => remove(item.key)}
                        aria-label={`${t("common.remove")} ${item.name}`}
                        className="ml-auto text-body/60 transition-colors hover:text-sale"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-hairline px-4 py-3">
              <div className="flex items-center justify-between text-[14px] font-semibold text-ink">
                <span>{t("cart.subtotal")}</span>
                <Price xof={subtotal} />
              </div>
              <div className="mt-3 grid gap-2">
                <button
                  type="button"
                  onClick={() => go("/panier")}
                  className="label-caps h-10 rounded-[4px] bg-emerald text-[12px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
                >
                  {t("nav.viewCart")}
                </button>
                <button
                  type="button"
                  onClick={() => go("/commande")}
                  className="label-caps h-10 rounded-[4px] border-2 border-emerald bg-white text-[12px] font-semibold text-emerald transition-colors hover:bg-emerald hover:text-ivory"
                >
                  {t("nav.checkout")}
                </button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* --------------------------------- Account sheet -------------------------------- */

function AccountSheet() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t("nav.account")}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-colors hover:bg-white/10"
      >
        <User size={21} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[360px] sm:w-[400px]" aria-describedby={undefined}>
        <SheetHeader className="border-b border-hairline">
          <SheetTitle className="font-serif text-[24px] font-semibold text-ink">
            {t("nav.loginTitle")}
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 px-4 pb-6">
          <p className="text-[14px] text-body">{t("nav.loginIntro")}</p>
          <div className="grid gap-2">
            <label htmlFor="oraya-email" className="text-[13px] font-semibold text-ink">
              {t("nav.email")}
            </label>
            <Input id="oraya-email" type="email" placeholder="aya@exemple.ci" autoComplete="email" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="oraya-password" className="text-[13px] font-semibold text-ink">
              {t("nav.password")}
            </label>
            <Input id="oraya-password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button
            type="button"
            onClick={() => toast.info(t("nav.accountSoon"))}
            className="label-caps h-11 rounded-[4px] bg-emerald text-[13px] font-medium text-ivory transition-colors hover:bg-emerald-dark"
          >
            {t("nav.signIn")}
          </button>
          <p className="text-center text-[13px] text-body">
            {t("nav.noAccount")}{" "}
            <button
              type="button"
              onClick={() => toast.info(t("nav.accountSoon"))}
              className="font-semibold text-emerald underline underline-offset-4"
            >
              {t("nav.createAccount")}
            </button>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* --------------------------------- Mobile menu --------------------------------- */

function MobileNavBtn({ label, onNavigate }: { label: string; onNavigate: () => void }) {
  return (
    <button
      type="button"
      onClick={onNavigate}
      className="w-full border-b border-hairline py-3 text-left font-serif text-[20px] font-semibold text-ink"
    >
      {label}
    </button>
  );
}

function MobileMenu() {
  const { t } = useI18n();
  const navigate = useRouter().navigate;
  const [open, setOpen] = useState(false);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t("nav.openMenu")}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-colors hover:bg-white/10 lg:hidden"
      >
        <Menu size={22} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] overflow-y-auto p-0 sm:w-[360px]" aria-describedby={undefined}>
        <SheetHeader className="border-b border-hairline bg-emerald px-5 py-4">
          <SheetTitle asChild>
            <div className="flex justify-center">
              <Logo layout="horizontal" className="h-12" />
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="px-5 pb-8" aria-label="Menu mobile">
          <div className="py-2">
            <MobileNavBtn label={t("nav.shop")} onNavigate={() => go("/boutique")} />
            <div className="grid grid-cols-2 gap-x-4 py-3">
              {TYPE_CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => go(`/boutique?cat=${c}`)}
                  className="py-1.5 text-left text-[14px] text-body hover:text-emerald"
                >
                  {t(`categories.${c}`)}
                </button>
              ))}
            </div>
            <MobileNavBtn label={t("nav.new")} onNavigate={() => go("/boutique?tag=nouveautes")} />
            <MobileNavBtn label={t("nav.bestsellers")} onNavigate={() => go("/boutique?tag=best-sellers")} />
            <MobileNavBtn label={t("nav.realGold")} onNavigate={() => go("/boutique?mat=or-veritable")} />
            <MobileNavBtn label={t("nav.customize")} onNavigate={() => go("/personnaliser")} />
            <div className="grid gap-1 py-3">
              {CUSTOM_TYPES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => go(`/personnaliser?type=${c}`)}
                  className="py-1.5 text-left text-[14px] text-body hover:text-emerald"
                >
                  {t(`customTypes.${c}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 grid gap-1 border-t border-hairline pt-4">
            <button
              type="button"
              onClick={() => go("/infos/a-propos")}
              className="py-1.5 text-left text-[14px] text-body hover:text-emerald"
            >
              {t("footer.service.about")}
            </button>
            <button
              type="button"
              onClick={() => go("/infos/livraison-paiement")}
              className="py-1.5 text-left text-[14px] text-body hover:text-emerald"
            >
              {t("footer.service.shipping")}
            </button>
            <button
              type="button"
              onClick={() => go("/infos/guide-tailles")}
              className="py-1.5 text-left text-[14px] text-body hover:text-emerald"
            >
              {t("footer.info.sizeGuide")}
            </button>
            <button
              type="button"
              onClick={() => go("/contact")}
              className="py-1.5 text-left text-[14px] text-body hover:text-emerald"
            >
              {t("contact.title")}
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/* ----------------------------------- Header ----------------------------------- */

export function SiteHeader() {
  const { t } = useI18n();
  const { route, navigate } = useRouter();
  const items = useCart((s) => s.items);
  const mounted = useMounted();
  const count = mounted ? cartCount(items) : 0;
  const [shopOpen, setShopOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const currentHref = `#${route.full}`;
  const isActive = (href: string) => currentHref === href;

  const navLinkClass = (active: boolean) =>
    cn(
      "relative flex items-center gap-1 py-2 text-[15px] font-medium text-ivory transition-colors hover:text-gold md:text-[17px]",
      active && "text-gold"
    );

  return (
    <header
      className="sticky top-0 z-40 bg-emerald shadow-[0_2px_12px_rgba(13,14,17,0.12)]"
      onMouseLeave={() => {
        setShopOpen(false);
        setCustomOpen(false);
      }}
    >
      <div className="container-x relative flex h-[64px] items-center justify-between gap-3 md:h-[76px]">
        <div className="flex items-center gap-1">
          <MobileMenu />
          <a href="#/" aria-label="ORAYA Maison" className="flex items-center">
            <Logo layout="horizontal" variant="light" className="h-[34px] md:h-[46px]" />
          </a>
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          <div className="relative">
            <button
              type="button"
              className={navLinkClass(isActive("#/boutique") || (route.segments[0] === "boutique" && !route.query.tag && !route.query.mat && !route.query.cat))}
              onMouseEnter={() => {
                setShopOpen(true);
                setCustomOpen(false);
              }}
              aria-expanded={shopOpen}
              onClick={() => navigate("/boutique")}
            >
              {t("nav.shop")}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn("transition-transform duration-200", shopOpen && "rotate-180")}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-0.5 left-0 h-[2px] bg-gold transition-all duration-200",
                  shopOpen ? "w-full" : "w-0"
                )}
              />
            </button>
          </div>

          <a
            href="#/boutique?tag=nouveautes"
            className={navLinkClass(isActive("#/boutique?tag=nouveautes"))}
            onMouseEnter={() => setShopOpen(false)}
          >
            {t("nav.new")}
          </a>
          <a
            href="#/boutique?tag=best-sellers"
            className={navLinkClass(isActive("#/boutique?tag=best-sellers"))}
            onMouseEnter={() => setShopOpen(false)}
          >
            {t("nav.bestsellers")}
          </a>
          <a
            href="#/boutique?mat=or-veritable"
            className={navLinkClass(isActive("#/boutique?mat=or-veritable"))}
            onMouseEnter={() => setShopOpen(false)}
          >
            {t("nav.realGold")}
          </a>

          <div className="relative" onMouseEnter={() => { setCustomOpen(true); setShopOpen(false); }}>
            <button
              type="button"
              className={navLinkClass(isActive("#/personnaliser"))}
              aria-expanded={customOpen}
              onClick={() => navigate("/personnaliser")}
            >
              {t("nav.customize")}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn("transition-transform duration-200", customOpen && "rotate-180")}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-0.5 left-0 h-[2px] bg-gold transition-all duration-200",
                  customOpen ? "w-full" : "w-0"
                )}
              />
            </button>
            <AnimatePresence>
              {customOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 z-50 mt-3 w-[230px] -translate-x-1/2 rounded-[6px] border border-hairline bg-white py-2 shadow-[0_18px_36px_-10px_rgba(13,14,17,0.2)]"
                >
                  {CUSTOM_TYPES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => navigate(`/personnaliser?type=${c}`)}
                      className="block w-full px-4 py-2.5 text-left text-[14px] text-body transition-colors hover:bg-band hover:text-emerald"
                    >
                      {t(`customTypes.${c}`)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-0.5">
          <div className="hidden md:block">
            <AccountSheet />
          </div>
          <MiniCart open={cartOpen} onOpenChange={setCartOpen} />
        </div>
      </div>

      {/* Mega menu panel */}
      <AnimatePresence>
        {shopOpen && <MegaMenu onNavigate={() => setShopOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
