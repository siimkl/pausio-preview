"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";

export function EditCartButton({ label = "Edit cart" }: { label?: string }) {
  const { openCart } = useCart();
  return <Button type="button" variant="ghost" size="sm" onClick={openCart}>{label}</Button>;
}
