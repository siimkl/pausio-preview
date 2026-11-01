import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = { title: "Checkout", description: "Review your Pausio.eu cart, delivery estimate, and availability.", robots: { index: false, follow: false } };

export default function CheckoutPage() { return <div className="container checkout-page"><CheckoutFlow /></div>; }
