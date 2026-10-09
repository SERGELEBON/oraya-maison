"use client";

/**
 * ORAYA Maison — single-page application shell.
 * The whole shop lives on "/" and switches views through the hash router
 * (boutique, produit, personnaliser, panier, commande, infos, contact).
 * Language & currency live in persisted zustand stores (no providers needed).
 */
import { RouterProvider, useRouter } from "@/lib/router";
import { TopBar } from "@/components/layout/top-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import HomeView from "@/components/home/home-view";
import BoutiqueView from "@/components/views/boutique-view";
import ProductView from "@/components/views/product-view";
import PersonnaliserView from "@/components/views/personnaliser-view";
import CartView from "@/components/views/cart-view";
import CheckoutView from "@/components/views/checkout-view";
import InfoView from "@/components/views/info-view";
import ContactView from "@/components/views/contact-view";
import NotFoundView from "@/components/views/not-found-view";

function ViewSwitch() {
  const { route } = useRouter();
  const [root] = route.segments;

  switch (root) {
    case undefined:
      return <HomeView />;
    case "boutique":
      return <BoutiqueView />;
    case "produit":
      return <ProductView slug={route.segments[1]} />;
    case "personnaliser":
      return <PersonnaliserView />;
    case "panier":
      return <CartView />;
    case "commande":
      return <CheckoutView />;
    case "contact":
      return <ContactView />;
    case "infos":
      return <InfoView slug={route.segments[1]} />;
    default:
      return <NotFoundView />;
  }
}

export default function Page() {
  return (
    <RouterProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <TopBar />
        <SiteHeader />
        <main id="contenu" className="flex-1">
          <ViewSwitch />
        </main>
        <SiteFooter />
        <WhatsAppFab />
      </div>
    </RouterProvider>
  );
}
