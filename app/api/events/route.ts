import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase/server";

const eventNames = ["page_view", "view_item_list", "select_item", "view_item", "add_to_cart", "remove_from_cart", "view_cart", "begin_checkout", "checkout_step_view", "delivery_country_selected", "checkout_review", "purchase_intent", "waitlist_signup", "scroll_depth", "page_engagement"] as const;
const eventSchema = z.object({
  event_id: z.string().uuid(),
  session_id: z.string().uuid(),
  event_name: z.enum(eventNames),
  product_id: z.enum(["timer-lock", "box-s", "box-m", "box-l"]).optional(),
  cart_value_cents: z.number().int().min(0).max(100_000).optional(),
  country: z.string().max(80).optional(),
  utm_campaign: z.string().max(160).optional(),
  utm_source: z.string().max(160).optional(),
  utm_medium: z.string().max(160).optional(),
  utm_content: z.string().max(160).optional(),
  utm_term: z.string().max(160).optional(),
}).passthrough();

export async function POST(request: Request) {
  const rate = await enforceRateLimit(request, "events", 120);
  if (!rate.success) return NextResponse.json({ error: rate.configurationError ? "Event storage is not configured for production." : "Rate limit exceeded." }, { status: rate.configurationError ? 503 : 429 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid event." }, { status: 400 }); }
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "false") return NextResponse.json({ ok: true, demo: true });
  if (!hasSupabaseAdminConfig()) return NextResponse.json({ error: "Analytics persistence is not configured." }, { status: 503 });
  const data = parsed.data;
  const reserved = new Set(["event_id", "session_id", "event_name", "product_id", "cart_value_cents", "country", "utm_campaign", "utm_source", "utm_medium", "utm_content"]);
  const eventData = Object.fromEntries(Object.entries(data).filter(([key]) => !reserved.has(key)));
  const client = createSupabaseAdminClient();
  const { error } = await client!.from("analytics_events").insert({ event_id: data.event_id, session_id: data.session_id, event_name: data.event_name, product_id: data.product_id || null, cart_value_cents: data.cart_value_cents ?? null, country: data.country || null, campaign: data.utm_campaign || null, utm_source: data.utm_source || null, utm_medium: data.utm_medium || null, utm_content: data.utm_content || null, event_data: eventData });
  if (error?.code === "23505") return NextResponse.json({ ok: true, duplicate: true });
  if (error) return NextResponse.json({ error: "Event could not be stored." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
