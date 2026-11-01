import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/store/product-detail";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() { return PRODUCTS.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.catalogueName, description: `${product.shortDescription} Delivery within 3–4 days to your chosen local parcel locker in the EU, UK, Switzerland, or Norway for €10 per order.`, alternates: { canonical: `/products/${product.slug}`, languages: { en: `/products/${product.slug}`, de: `/de/products/${product.slug}`, fr: `/fr/products/${product.slug}`, sv: `/sv/products/${product.slug}`, no: `/no/products/${product.slug}`, da: `/da/products/${product.slug}`, fi: `/fi/products/${product.slug}`, nl: `/nl/products/${product.slug}`, it: `/it/products/${product.slug}`, es: `/es/products/${product.slug}`, pl: `/pl/products/${product.slug}`, cs: `/cs/products/${product.slug}` } }, openGraph: { title: `${product.catalogueName} · Pausio.eu`, description: product.shortDescription, url: `/products/${product.slug}` } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
