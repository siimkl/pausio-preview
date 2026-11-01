import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = { title: "Checkout", description: "Vérifiez votre panier, la livraison et la disponibilité chez Pausio.eu.", robots: { index: false, follow: false } };

export default function FrenchCheckoutPage() {
  return <div className="container checkout-page"><CheckoutFlow locale="fr" /></div>;
}
