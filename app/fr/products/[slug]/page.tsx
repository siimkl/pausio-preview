import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/store/product-detail";
import { getLocalizedProductCopy } from "@/lib/i18n";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() { return PRODUCTS.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const copy = getLocalizedProductCopy("fr", product.id) ?? product;
  return { title: copy.catalogueName, description: `${copy.shortDescription} Livraison sous 3–4 jours à la consigne à colis locale de votre choix dans l’UE, au Royaume-Uni, en Suisse ou en Norvège pour 10 € par commande.`, alternates: { canonical: `/fr/products/${product.slug}`, languages: { en: `/products/${product.slug}`, de: `/de/products/${product.slug}`, fr: `/fr/products/${product.slug}`, sv: `/sv/products/${product.slug}`, no: `/no/products/${product.slug}`, da: `/da/products/${product.slug}`, fi: `/fi/products/${product.slug}`, nl: `/nl/products/${product.slug}`, it: `/it/products/${product.slug}`, es: `/es/products/${product.slug}`, pl: `/pl/products/${product.slug}`, cs: `/cs/products/${product.slug}` } } };
}

export default async function FrenchProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale="fr" />;
}
