import { NextResponse } from "next/server";
import { aggregateAdminData, fetchAdminDataset, type AdminFilters } from "@/lib/admin-data";
import { getAdminUser } from "@/lib/supabase/server";

function csvCell(value: unknown) {
  const text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "No data\r\n";
  const headers = Object.keys(rows[0]);
  return [headers.map(csvCell).join(","), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))].join("\r\n");
}
function defaultDate(daysAgo = 0) { const date = new Date(); date.setUTCDate(date.getUTCDate() - daysAgo); return date.toISOString().slice(0, 10); }

export async function GET(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const auth = await getAdminUser();
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { type } = await params;
  if (!(["events", "funnel", "waitlist"] as string[]).includes(type)) return NextResponse.json({ error: "Unknown export" }, { status: 404 });
  const url = new URL(request.url);
  const filters: AdminFilters = { from: url.searchParams.get("from") || defaultDate(29), to: url.searchParams.get("to") || defaultDate(), country: url.searchParams.get("country") || "", product: url.searchParams.get("product") || "", campaign: url.searchParams.get("campaign") || "", source: url.searchParams.get("source") || "" };
  const dataset = await fetchAdminDataset(filters);
  let rows: Record<string, unknown>[];
  if (type === "events") rows = dataset.events as unknown as Record<string, unknown>[];
  else if (type === "waitlist") rows = dataset.waitlist as Record<string, unknown>[];
  else rows = aggregateAdminData(dataset.events, dataset.waitlist.length).funnel.map((step) => ({ stage: step.label, event_count: step.events, unique_sessions: step.sessions, step_conversion_percent: step.conversion.toFixed(2), dropoff_percent: step.dropoff.toFixed(2) }));
  return new NextResponse(`\uFEFF${toCsv(rows)}`, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="lockbox-${type}-${filters.from}-to-${filters.to}.csv"`, "cache-control": "private, no-store" } });
}
