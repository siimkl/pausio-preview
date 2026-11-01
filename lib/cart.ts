import type { CartLine, ProductId } from "@/lib/products";
import { clampQuantity } from "@/lib/utils";

export function addCartItem(lines: readonly CartLine[], productId: ProductId, quantity = 1): CartLine[] {
  const amount = clampQuantity(quantity);
  const existing = lines.find((line) => line.productId === productId);
  if (!existing) return [...lines, { productId, quantity: amount }];
  return lines.map((line) => line.productId === productId ? { ...line, quantity: clampQuantity(line.quantity + amount) } : line);
}

export function setCartItemQuantity(lines: readonly CartLine[], productId: ProductId, quantity: number): CartLine[] {
  if (quantity < 1) return removeCartItem(lines, productId);
  return lines.map((line) => line.productId === productId ? { ...line, quantity: clampQuantity(quantity) } : line);
}

export function removeCartItem(lines: readonly CartLine[], productId: ProductId): CartLine[] {
  return lines.filter((line) => line.productId !== productId);
}
