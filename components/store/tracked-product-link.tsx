"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

export function TrackedProductLink({ product, children, className, locale = "en" }: { product: Product; children: React.ReactNode; className?: string; locale?: Locale }) {
  return <Link className={className} href={`${locale === "en" ? "" : `/${locale}`}/products/${product.slug}`} onClick={() => void trackEvent("select_item", { product_id: product.id, items: [{ item_id: product.id, item_name: product.catalogueName, price: product.priceCents / 100, quantity: 1 }] })}>{children}</Link>;
}
