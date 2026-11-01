import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const redirectUrl = new URL("/admin", request.url);
  const client = await createServerSupabaseClient();
  if (!client || !email || !password) { redirectUrl.searchParams.set("error", "configuration"); return NextResponse.redirect(redirectUrl, 303); }
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) redirectUrl.searchParams.set("error", "credentials");
  return NextResponse.redirect(redirectUrl, 303);
}
