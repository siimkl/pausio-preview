"use client";

import { ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { LanguageMenu } from "@/components/header/language-menu";
import { MobileMenu } from "@/components/header/mobile-menu";
import { usePathname } from "next/navigation";
import { localeFromPath, localize } from "@/lib/i18n";

export function Header() {
  const { itemCount, openCart, hydrated } = useCart();
  const locale = localeFromPath(usePathname());
  const home = locale === "en" ? "" : `/${locale}`;
  return (
    <header className="site-header">
      <div className="shipping-strip">
        <div className="container shipping-strip-inner"><Truck size={14} aria-hidden="true" /><strong>{localize(locale, "EU, UK, Switzerland & Norway", "EU, UK, Schweiz & Norwegen", "UE, Royaume-Uni, Suisse et Norvège")}</strong><span>{localize(locale, "3–4 days to your chosen local parcel locker", "In 3–4 Tagen zum Paketautomaten deiner Wahl", "Sous 3–4 jours vers la consigne à colis locale de votre choix")}</span><span>{localize(locale, "€10 per order", "10 € pro Bestellung", "10 € par commande")}</span></div>
      </div>
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href={`${home}/#shop`}>Shop</Link><Link href={`${home}/#how-it-works`}>{localize(locale, "How it works", "So funktioniert’s", "Comment ça marche")}</Link><Link href={`${home}/#why-lockbox`}>{localize(locale, "Why a timer lockbox?", "Warum eine Timerbox?", "Pourquoi une boîte à minuterie ?")}</Link><Link href={`${home}/#faq`}>FAQ</Link>
        </nav>
        <div className="header-actions">
          <span className="desktop-language"><LanguageMenu /></span>
          <span className="mobile-language"><LanguageMenu compact /></span>
          <Button variant="ghost" size="icon" onClick={openCart} aria-label={localize(locale, `Open cart with ${hydrated ? itemCount : 0} items`, `Warenkorb mit ${hydrated ? itemCount : 0} Artikeln öffnen`, `Ouvrir le panier avec ${hydrated ? itemCount : 0} articles`)}>
            <ShoppingBag size={20} />{hydrated && itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Button>
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
