import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin/dashboard";
import { AdminLoginForm } from "@/components/admin/login-form";
import { Button } from "@/components/ui/button";
import { aggregateAdminData, fetchAdminDataset, type AdminFilters } from "@/lib/admin-data";
import { DELIVERY_COUNTRIES, PRODUCTS } from "@/lib/products";
import { getAdminUser, hasSupabaseAdminConfig } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Experiment admin", robots: { index: false, follow: false } };

function isoDate(date: Date) { return date.toISOString().slice(0, 10); }
function defaultFilters(): AdminFilters { const to = new Date(); const from = new Date(to); from.setUTCDate(from.getUTCDate() - 29); return { from: isoDate(from), to: isoDate(to), country: "", product: "", campaign: "", source: "" }; }

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!hasSupabaseAdminConfig()) return <div className="container admin-gate card"><p className="eyebrow">Configuration required</p><h1>Admin data is unavailable.</h1><p>Supabase URL, anon key, service-role key, and an <code>ADMIN_EMAILS</code> allowlist must be configured. No example metrics are being presented as real data.</p></div>;
  const auth = await getAdminUser();
  if (!auth.user) return <div className="container"><Suspense><AdminLoginForm /></Suspense></div>;
  const params = await searchParams; const defaults = defaultFilters(); const one = (key: string) => Array.isArray(params[key]) ? params[key][0] || "" : params[key] || "";
  const filters: AdminFilters = { from: one("from") || defaults.from, to: one("to") || defaults.to, country: one("country"), product: one("product"), campaign: one("campaign"), source: one("source") };
  let dataset; try { dataset = await fetchAdminDataset(filters); } catch (error) { return <div className="container admin-gate card"><h1>Dashboard query failed.</h1><p>{error instanceof Error ? error.message : "Unknown Supabase error"}</p></div>; }
  const data = aggregateAdminData(dataset.events, dataset.waitlist.length);
  const campaigns = [...new Set(dataset.events.map((event) => event.campaign).filter(Boolean))] as string[]; const sources = [...new Set(dataset.events.map((event) => event.utm_source).filter(Boolean))] as string[];
  return <div className="container admin-page"><div className="admin-title"><div><p className="eyebrow">Pausio.eu demand experiment</p><h1>Measured interest,<br />without make-believe.</h1><p>Real stored events only. Optional-consent rejection means measured sessions are a privacy-limited subset of all visitors.</p></div><form action="/api/admin/logout" method="post"><Button type="submit" variant="secondary">Sign out</Button></form></div>
    <form className="admin-filters card" method="get"><div className="field"><label htmlFor="from">From</label><input className="input" type="date" id="from" name="from" defaultValue={filters.from} /></div><div className="field"><label htmlFor="to">To</label><input className="input" type="date" id="to" name="to" defaultValue={filters.to} /></div><div className="field"><label htmlFor="filter-country">Country</label><select className="input" id="filter-country" name="country" defaultValue={filters.country}><option value="">All countries</option>{DELIVERY_COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select></div><div className="field"><label htmlFor="filter-product">Product</label><select className="input" id="filter-product" name="product" defaultValue={filters.product}><option value="">All products</option>{PRODUCTS.map((product) => <option value={product.id} key={product.id}>{product.catalogueName}</option>)}</select></div><div className="field"><label htmlFor="campaign">Campaign</label><select className="input" id="campaign" name="campaign" defaultValue={filters.campaign}><option value="">All campaigns</option>{campaigns.map((campaign) => <option key={campaign}>{campaign}</option>)}</select></div><div className="field"><label htmlFor="source">UTM source</label><select className="input" id="source" name="source" defaultValue={filters.source}><option value="">All sources</option>{sources.map((source) => <option key={source}>{source}</option>)}</select></div><Button type="submit">Apply filters</Button></form>
    <AdminDashboard data={data} filters={filters} />
  </div>;
}
