import { describe, expect, it } from "vitest";
import { PRODUCTS, SHIPPING_CENTS, cartSubtotal, cartTotal, formatCurrency } from "@/lib/products";

describe("product catalogue and pricing", () => {
  it("contains exactly the four stable products with prices in cents", () => {
    expect(PRODUCTS.map(({ id, priceCents }) => [id, priceCents])).toEqual([
      ["timer-lock", 3900], ["box-s", 5900], ["box-m", 7900], ["box-l", 9900],
    ]);
    expect(PRODUCTS.filter((product) => product.bundle).every((product) => product.included.some((item) => item.includes("timer padlock")))).toBe(true);
  });

  it("calculates subtotals, one shipping fee, and empty carts", () => {
    const cart = [{ productId: "timer-lock" as const, quantity: 2 }, { productId: "box-m" as const, quantity: 1 }];
    expect(cartSubtotal(cart)).toBe(15_700);
    expect(cartTotal(cart)).toBe(15_700 + SHIPPING_CENTS);
    expect(cartSubtotal([])).toBe(0);
    expect(cartTotal([])).toBe(0);
  });

  it("formats whole-euro customer prices", () => {
    expect(formatCurrency(3900)).toMatch(/€39/);
    expect(formatCurrency(4900)).toMatch(/€49/);
  });
});
