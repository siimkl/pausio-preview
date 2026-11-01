import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/checkout";
import { enforceRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const rate = await enforceRateLimit(request, "waitlist", 5);
  if (!rate.success) return NextResponse.json({ error: rate.configurationError ? "Production rate limiting is not configured." : "Too many attempts. Please try again later." }, { status: rate.configurationError ? 503 : 429 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true, demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false" });
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "false") return NextResponse.json({ ok: true, demo: true });
  if (!hasSupabaseAdminConfig()) return NextResponse.json({ error: "Waitlist persistence is not configured." }, { status: 503 });
  const client = createSupabaseAdminClient();
  const { error } = await client!.from("waitlist_signups").insert({
    email: parsed.data.email.toLowerCase(),
    country: parsed.data.country || null,
    preferred_product: parsed.data.preferredProduct || null,
    marketing_consent: true,
    consent_timestamp: new Date().toISOString(),
  });
  if (error?.code === "23505") return NextResponse.json({ ok: true, duplicate: true });
  if (error) return NextResponse.json({ error: "We could not save your signup right now." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
