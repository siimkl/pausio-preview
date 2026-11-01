"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/lib/products";

export function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    void trackEvent("view_item", { product_id: product.id, items: [{ item_id: product.id, item_name: product.catalogueName, price: product.priceCents / 100, quantity: 1 }] }, { idempotencyKey: `view:${product.id}` });
  }, [product]);
  return null;
}
