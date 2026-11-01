import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const client = await createServerSupabaseClient();
  await client?.auth.signOut();
  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
