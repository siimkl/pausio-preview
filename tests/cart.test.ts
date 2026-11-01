import { describe, expect, it } from "vitest";
import { addCartItem, removeCartItem, setCartItemQuantity } from "@/lib/cart";

describe("cart quantity operations", () => {
  it("adds products and combines repeated additions", () => {
    const once = addCartItem([], "box-s", 1);
    expect(addCartItem(once, "box-s", 2)).toEqual([{ productId: "box-s", quantity: 3 }]);
  });

  it("clamps quantities and removes zero quantities", () => {
    const cart = [{ productId: "box-l" as const, quantity: 1 }];
    expect(setCartItemQuantity(cart, "box-l", 99)[0].quantity).toBe(10);
    expect(setCartItemQuantity(cart, "box-l", 0)).toEqual([]);
    expect(removeCartItem(cart, "box-l")).toEqual([]);
  });
});
