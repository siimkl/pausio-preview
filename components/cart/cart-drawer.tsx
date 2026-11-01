"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/providers/cart-provider";
import { ProductVisual } from "@/components/product-visual";
import { Button } from "@/components/ui/button";
import { formatCurrency, getProduct, SHIPPING_CENTS } from "@/lib/products";
import { getLocalizedProductCopy, localeFromPath, localize } from "@/lib/i18n";

export function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeItem, subtotal, hydrated } = useCart();
  const locale = localeFromPath(usePathname());
  const home = locale === "en" ? "" : `/${locale}`;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-overlay" />
        <Dialog.Content className="drawer-content" aria-describedby="cart-description">
          <div className="drawer-header">
            <div>
              <Dialog.Title>{localize(locale, "Your Pausio.eu cart", "Dein Pausio.eu-Warenkorb", "Votre panier Pausio.eu")}</Dialog.Title>
              <Dialog.Description id="cart-description">{localize(locale, "Review your selected products", "Prüfe deine ausgewählten Produkte", "Vérifiez les produits sélectionnés")}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={localize(locale, "Close cart", "Warenkorb schließen", "Fermer le panier")}><X size={20} /></Button>
            </Dialog.Close>
          </div>

          <div className="cart-lines">
            {!hydrated ? (
              <p className="muted">{localize(locale, "Loading cart…", "Warenkorb wird geladen…", "Chargement du panier…")}</p>
            ) : lines.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={34} strokeWidth={1.5} />
                <h2>{localize(locale, "Nothing locked in yet.", "Noch nichts eingeschlossen.", "Rien n’est encore verrouillé.")}</h2>
                <p>{localize(locale, "Choose a box—or just the timer lock—and future-you can take it from there.", "Wähle eine Box oder nur das Zeitschloss – den Rest kann dein späteres Ich klären.", "Choisissez une boîte ou seulement le cadenas, puis laissez votre futur vous gérer la suite.")}</p>
                <Button asChild onClick={closeCart}><Link href={`${home}/#shop`}>{localize(locale, "Browse Pausio.eu", "Pausio.eu entdecken", "Découvrir Pausio.eu")}</Link></Button>
              </div>
            ) : (
              lines.map((line) => {
                const product = getProduct(line.productId);
                if (!product) return null;
                const copy = getLocalizedProductCopy(locale, product.id) ?? product;
                return (
                  <article className="cart-line" key={line.productId}>
                    <ProductVisual size={product.size} />
                    <div className="cart-line-copy">
                      <div>
                        <h3>{copy.catalogueName}</h3>
                        <p>{formatCurrency(product.priceCents, locale)} {localize(locale, "each", "pro Stück", "l’unité")}</p>
                      </div>
                      <div className="cart-line-bottom">
                        <div className="quantity-control" aria-label={localize(locale, `Quantity for ${product.catalogueName}`, `Menge für ${copy.catalogueName}`, `Quantité pour ${copy.catalogueName}`)}>
                          <button onClick={() => setQuantity(product.id, line.quantity - 1)} aria-label={localize(locale, "Decrease quantity", "Menge verringern", "Diminuer la quantité")}><Minus size={14} /></button>
                          <span aria-live="polite">{line.quantity}</span>
                          <button onClick={() => setQuantity(product.id, line.quantity + 1)} aria-label={localize(locale, "Increase quantity", "Menge erhöhen", "Augmenter la quantité")}><Plus size={14} /></button>
                        </div>
                        <strong>{formatCurrency(product.priceCents * line.quantity, locale)}</strong>
                        <button className="remove-button" onClick={() => removeItem(product.id)} aria-label={localize(locale, `Remove ${product.catalogueName}`, `${copy.catalogueName} entfernen`, `Retirer ${copy.catalogueName}`)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {lines.length > 0 && (
            <div className="cart-summary">
              <div><span>{localize(locale, "Subtotal", "Zwischensumme", "Sous-total")}</span><strong>{formatCurrency(subtotal, locale)}</strong></div>
              <div><span>{localize(locale, "Parcel-locker delivery · 3–4 days", "Lieferung zum Paketautomaten · 3–4 Tage", "Livraison en consigne à colis · 3–4 jours")}</span><span>{formatCurrency(SHIPPING_CENTS, locale)}</span></div>
              <p>{localize(locale, "Your chosen local parcel locker in the EU, UK, Switzerland, or Norway · flat rate per order.", "Zum lokalen Paketautomaten deiner Wahl in der EU, UK, Schweiz oder Norwegen · Pauschalpreis pro Bestellung.", "Vers la consigne à colis locale de votre choix dans l’UE, au Royaume-Uni, en Suisse ou en Norvège · tarif fixe par commande.")}</p>
              <Button asChild size="lg" onClick={closeCart}><Link href={`${home}/checkout`}>{localize(locale, "Continue to checkout", "Weiter zur Kasse", "Passer au paiement")}</Link></Button>
              <Button asChild variant="ghost" onClick={closeCart}><Link href={`${home}/#shop`}>{localize(locale, "Continue shopping", "Weiter einkaufen", "Continuer les achats")}</Link></Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
