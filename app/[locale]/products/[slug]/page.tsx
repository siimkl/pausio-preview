import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/store/product-detail";
import { getLocalizedProductCopy, DYNAMIC_LOCALES, type DynamicLocale } from "@/lib/i18n";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return DYNAMIC_LOCALES.flatMap((locale) => PRODUCTS.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!DYNAMIC_LOCALES.includes(locale as DynamicLocale)) return {};
  const product = getProduct(slug);
  if (!product) return {};
  const copy = getLocalizedProductCopy(locale as DynamicLocale, product.id) ?? product;
  return { title: copy.catalogueName, description: copy.shortDescription, alternates: { canonical: `/${locale}/products/${product.slug}`, languages: { en: `/products/${product.slug}`, de: `/de/products/${product.slug}`, fr: `/fr/products/${product.slug}`, sv: `/sv/products/${product.slug}`, no: `/no/products/${product.slug}`, da: `/da/products/${product.slug}`, fi: `/fi/products/${product.slug}`, nl: `/nl/products/${product.slug}`, it: `/it/products/${product.slug}`, es: `/es/products/${product.slug}`, pl: `/pl/products/${product.slug}`, cs: `/cs/products/${product.slug}` } } };
}

export default async function NordicProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!DYNAMIC_LOCALES.includes(locale as DynamicLocale)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale={locale as DynamicLocale} />;
}
