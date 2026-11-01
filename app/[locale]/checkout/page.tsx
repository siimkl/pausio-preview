import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";
import { DYNAMIC_LOCALES, type DynamicLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return DYNAMIC_LOCALES.map((locale) => ({ locale }));
}

export default async function NordicCheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!DYNAMIC_LOCALES.includes(locale as DynamicLocale)) notFound();
  return <div className="container checkout-page"><CheckoutFlow locale={locale as DynamicLocale} /></div>;
}
