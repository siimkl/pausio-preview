import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = { title: "Checkout", description: "Warenkorb, Lieferkosten und Verfügbarkeit bei Pausio.eu prüfen.", robots: { index: false, follow: false } };

export default function GermanCheckoutPage() {
  return <div className="container checkout-page"><CheckoutFlow locale="de" /></div>;
}
