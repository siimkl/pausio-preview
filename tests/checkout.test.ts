import { describe, expect, it } from "vitest";
import { checkoutCountrySchema, checkoutDeliveryDetailsSchema, waitlistSchema } from "@/lib/checkout";
import { DELIVERY_COUNTRIES } from "@/lib/products";

describe("checkout and waitlist validation", () => {
  it("offers EU members plus the UK, Switzerland, and Norway", () => {
    expect(DELIVERY_COUNTRIES).toHaveLength(30);
    expect(checkoutCountrySchema.safeParse({ country: "Estonia" }).success).toBe(true);
    expect(checkoutCountrySchema.safeParse({ country: "United Kingdom" }).success).toBe(true);
    expect(checkoutCountrySchema.safeParse({ country: "Switzerland" }).success).toBe(true);
    expect(checkoutCountrySchema.safeParse({ country: "Norway" }).success).toBe(true);
  });

  it("requires valid email and explicit waitlist opt-in", () => {
    expect(waitlistSchema.safeParse({ email: "person@example.com", consent: true, country: "Estonia", preferredProduct: "box-m", website: "" }).success).toBe(true);
    expect(waitlistSchema.safeParse({ email: "bad", consent: true }).success).toBe(false);
    expect(waitlistSchema.safeParse({ email: "person@example.com", consent: false }).success).toBe(false);
  });

  it("requires a phone number, delivery address, and payment-method choice", () => {
    expect(checkoutDeliveryDetailsSchema.safeParse({ phone: "+372 5555 1234", deliveryAddress: "Viru väljak 4, 10111 Tallinn, Estonia", paymentMethod: "card" }).success).toBe(true);
    expect(checkoutDeliveryDetailsSchema.safeParse({ phone: "123", deliveryAddress: "", paymentMethod: "" }).success).toBe(false);
    expect(checkoutDeliveryDetailsSchema.safeParse({ phone: "+372 5555 1234", deliveryAddress: "Tallinn", paymentMethod: "cash" }).success).toBe(false);
  });
});
