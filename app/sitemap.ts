import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/privacy", "/cookies", "/terms"];
  const locales = ["de", "fr", "sv", "no", "da", "fi", "nl", "it", "es", "pl", "cs"];
  return [...staticPages.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" as const : "weekly" as const, priority: path ? .4 : 1 })), ...locales.map((locale) => ({ url: `${siteConfig.url}/${locale}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 })), ...PRODUCTS.flatMap((product) => ([{ url: `${siteConfig.url}/products/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 }, ...locales.map((locale) => ({ url: `${siteConfig.url}/${locale}/products/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 }))]))];
}
