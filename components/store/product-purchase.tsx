"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import type { ProductId } from "@/lib/products";
import { clampQuantity } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";

export function ProductPurchase({ productId, locale = "en" }: { productId: ProductId; locale?: Locale }) {
  const [quantity, setQuantity] = useState(1);
  return <div className="product-purchase"><div className="field"><span className="field-label">{localize(locale, "Quantity", "Menge", "Quantité")}</span><div className="quantity-control quantity-control--large"><button onClick={() => setQuantity((value) => clampQuantity(value - 1))} aria-label={localize(locale, "Decrease quantity", "Menge verringern", "Diminuer la quantité")}><Minus size={16} /></button><span aria-live="polite">{quantity}</span><button onClick={() => setQuantity((value) => clampQuantity(value + 1))} aria-label={localize(locale, "Increase quantity", "Menge erhöhen", "Augmenter la quantité")}><Plus size={16} /></button></div></div><AddToCartButton productId={productId} quantity={quantity} label={localize(locale, "Add to cart", "In den Warenkorb", "Ajouter au panier")} /></div>;
}
