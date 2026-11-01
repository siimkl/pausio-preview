"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cartSubtotal, type CartLine, type ProductId } from "@/lib/products";
import { clampQuantity } from "@/lib/utils";
import { cartItems, trackEvent } from "@/lib/analytics";
import { addCartItem, removeCartItem, setCartItemQuantity } from "@/lib/cart";

const CART_KEY = "lockbox-cart-v1";

type CartContextValue = {
  lines: CartLine[];
  hydrated: boolean;
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: ProductId, quantity?: number) => void;
  removeItem: (productId: ProductId) => void;
  setQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function parseCart(raw: string | null): CartLine[] {
  try {
    const value = JSON.parse(raw || "[]") as unknown;
    if (!Array.isArray(value)) return [];
    return value.flatMap((line) => {
      if (!line || typeof line !== "object") return [];
      const candidate = line as Partial<CartLine>;
      const validIds: ProductId[] = ["timer-lock", "box-s", "box-m", "box-l"];
      return candidate.productId && validIds.includes(candidate.productId)
        ? [{ productId: candidate.productId, quantity: clampQuantity(Number(candidate.quantity)) }]
        : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const stored = parseCart(window.localStorage.getItem(CART_KEY));
    queueMicrotask(() => {
      setLines(stored);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const addItem = useCallback((productId: ProductId, quantity = 1) => {
    const amount = clampQuantity(quantity);
    setLines((current) => addCartItem(current, productId, amount));
    void trackEvent("add_to_cart", { product_id: productId, items: cartItems([{ productId, quantity: amount }]) });
    setOpen(true);
  }, []);

  const removeItem = useCallback((productId: ProductId) => {
    setLines((current) => {
      const removed = current.find((line) => line.productId === productId);
      if (removed) void trackEvent("remove_from_cart", { product_id: productId, items: cartItems([removed]) });
      return removeCartItem(current, productId);
    });
  }, []);

  const setQuantity = useCallback((productId: ProductId, quantity: number) => {
    if (quantity < 1) return removeItem(productId);
    setLines((current) => setCartItemQuantity(current, productId, quantity));
  }, [removeItem]);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => {
    setOpen(true);
    void trackEvent("view_cart", { cart_value_cents: cartSubtotal(lines), items: cartItems(lines) });
  }, [lines]);
  const closeCart = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      lines,
      hydrated,
      isOpen,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: cartSubtotal(lines),
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [lines, hydrated, isOpen, addItem, removeItem, setQuantity, clearCart, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
