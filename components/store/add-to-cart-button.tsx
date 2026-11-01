"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import type { ProductId } from "@/lib/products";

export function AddToCartButton({ productId, quantity = 1, label = "Add to cart", className }: { productId: ProductId; quantity?: number; label?: string; className?: string }) {
  const { addItem } = useCart();
  return <Button className={className} onClick={() => addItem(productId, quantity)}><ShoppingBag size={17} />{label}</Button>;
}
