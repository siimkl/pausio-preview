import { z } from "zod";
import { DELIVERY_COUNTRIES } from "@/lib/products";

export const checkoutCountrySchema = z.object({
  country: z.enum(DELIVERY_COUNTRIES, { error: "Choose a delivery country." }),
});

export const PAYMENT_METHODS = ["card", "bank-transfer", "paypal"] as const;

export const checkoutDeliveryDetailsSchema = z.object({
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(24, "Enter a valid phone number.").regex(/^\+?[0-9\s().-]+$/, "Enter a valid phone number."),
  deliveryAddress: z.string().trim().min(8, "Enter a complete delivery address.").max(200, "Enter a complete delivery address."),
  paymentMethod: z.enum(PAYMENT_METHODS, { error: "Choose a payment method." }),
});

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type CheckoutDeliveryDetails = z.infer<typeof checkoutDeliveryDetailsSchema>;

export const waitlistSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254),
  country: z.enum(DELIVERY_COUNTRIES).optional().or(z.literal("")),
  preferredProduct: z.enum(["timer-lock", "box-s", "box-m", "box-l"]).optional().or(z.literal("")),
  consent: z.literal(true, { error: "Please agree to receive the stock update email." }),
  website: z.string().max(0).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
