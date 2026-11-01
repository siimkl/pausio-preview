import { PRODUCTS, type ProductId } from "@/lib/products";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export type AnalyticsEventRow = {
  id: string; event_id: string; created_at: string; session_id: string; event_name: string;
  product_id: ProductId | null; cart_value_cents: number | null; country: string | null;
  campaign: string | null; utm_source: string | null; utm_medium: string | null; utm_content: string | null;
  event_data: Record<string, unknown> | null;
};

export type AdminFilters = { from: string; to: string; country: string; product: string; campaign: string; source: string };
export const FUNNEL_STEPS = [
  { key: "page_view", label: "Visit" }, { key: "view_item", label: "Product view" },
  { key: "add_to_cart", label: "Cart" }, { key: "begin_checkout", label: "Checkout" },
  { key: "checkout_review", label: "Final price" }, { key: "purchase_intent", label: "Purchase intent" },
] as const;

function eventHasProduct(event: AnalyticsEventRow, product: string) {
  if (!product) return true;
  if (event.product_id === product) return true;
  const items = event.event_data?.items;
  return Array.isArray(items) && items.some((item) => item && typeof item === "object" && (item as { item_id?: string }).item_id === product);
}

export async function fetchAdminDataset(filters: AdminFilters) {
  const client = createSupabaseAdminClient();
  if (!client) throw new Error("Supabase service credentials are not configured.");
  let query = client.from("analytics_events").select("*").gte("created_at", `${filters.from}T00:00:00.000Z`).lte("created_at", `${filters.to}T23:59:59.999Z`).order("created_at", { ascending: false }).limit(10_000);
  if (filters.country) query = query.eq("country", filters.country);
  if (filters.campaign) query = query.eq("campaign", filters.campaign);
  if (filters.source) query = query.eq("utm_source", filters.source);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  const events = (data as AnalyticsEventRow[]).filter((event) => eventHasProduct(event, filters.product));

  let waitlistQuery = client.from("waitlist_signups").select("id,created_at,email,country,preferred_product,marketing_consent,consent_timestamp").gte("created_at", `${filters.from}T00:00:00.000Z`).lte("created_at", `${filters.to}T23:59:59.999Z`).order("created_at", { ascending: false }).limit(10_000);
  if (filters.country) waitlistQuery = waitlistQuery.eq("country", filters.country);
  if (filters.product) waitlistQuery = waitlistQuery.eq("preferred_product", filters.product);
  const waitlistResult = await waitlistQuery;
  if (waitlistResult.error) throw new Error(waitlistResult.error.message);
  return { events, waitlist: waitlistResult.data || [] };
}

export function aggregateAdminData(events: AnalyticsEventRow[], waitlistCount: number) {
  const count = (name: string) => events.filter((event) => event.event_name === name).length;
  const sessions = new Set(events.map((event) => event.session_id)).size;
  const funnel = FUNNEL_STEPS.map((step, index) => {
    const matching = events.filter((event) => event.event_name === step.key);
    const unique = new Set(matching.map((event) => event.session_id)).size;
    const previousStep = index ? FUNNEL_STEPS[index - 1] : null;
    const previous = previousStep ? new Set(events.filter((event) => event.event_name === previousStep.key).map((event) => event.session_id)).size : unique;
    const stepRate = previous ? (unique / previous) * 100 : 0;
    return { ...step, events: matching.length, sessions: unique, conversion: stepRate, dropoff: Math.max(0, 100 - stepRate) };
  });
  const productPerformance = PRODUCTS.map((product) => {
    const relevant = events.filter((event) => eventHasProduct(event, product.id));
    const views = relevant.filter((event) => event.event_name === "view_item").length;
    const addToCarts = relevant.filter((event) => event.event_name === "add_to_cart").length;
    const checkouts = relevant.filter((event) => event.event_name === "begin_checkout").length;
    const intents = relevant.filter((event) => event.event_name === "purchase_intent").length;
    return { id: product.id, name: product.catalogueName, views, addToCarts, checkouts, intents, conversion: views ? (intents / views) * 100 : 0 };
  });
  return {
    sessions,
    metrics: { productLists: count("view_item_list"), productViews: count("view_item"), addToCarts: count("add_to_cart"), checkouts: count("begin_checkout"), reviews: count("checkout_review"), intents: count("purchase_intent"), waitlist: waitlistCount },
    funnel,
    productPerformance,
    overallConversion: sessions ? (count("purchase_intent") / sessions) * 100 : 0,
  };
}
