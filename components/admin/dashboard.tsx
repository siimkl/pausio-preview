"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminFilters } from "@/lib/admin-data";

type DashboardData = ReturnType<typeof import("@/lib/admin-data").aggregateAdminData>;

function formatRate(value: number) { return `${value.toFixed(1)}%`; }
function cost(spend: number, count: number) { return count ? `€${(spend / count).toFixed(2)}` : "—"; }

export function AdminDashboard({ data, filters }: { data: DashboardData; filters: AdminFilters }) {
  const [spend, setSpend] = useState(100);
  const query = useMemo(() => new URLSearchParams(Object.entries(filters).filter(([, value]) => value)).toString(), [filters]);
  const metrics = [
    ["Tracked sessions", data.sessions], ["Product-list views", data.metrics.productLists], ["Product views", data.metrics.productViews],
    ["Add to cart", data.metrics.addToCarts], ["Checkout starts", data.metrics.checkouts], ["Final price reviews", data.metrics.reviews],
    ["Purchase intent", data.metrics.intents], ["Waitlist signups", data.metrics.waitlist],
  ] as const;
  return <>
    <div className="admin-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value.toLocaleString()}</strong></article>)}</div>
    <section className="admin-panel card"><div className="admin-panel-head"><div><p className="eyebrow">Conversion funnel</p><h2>Consenting visitors through intent</h2></div><span><Info size={15} /> Counts only consented, stored events.</span></div><div className="funnel-layout"><div className="funnel-chart" aria-label="Funnel chart"><ResponsiveContainer width="100%" height={310}><BarChart data={data.funnel} margin={{ left: -20, right: 10 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6e7e2" /><XAxis dataKey="label" tick={{ fontSize: 11 }} interval={0} /><YAxis allowDecimals={false} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="sessions" fill="#315a49" radius={[7, 7, 0, 0]} /></BarChart></ResponsiveContainer></div><div className="funnel-table"><div className="table-row table-head"><span>Stage</span><span>Events</span><span>Sessions</span><span>Step conv.</span><span>Drop-off</span></div>{data.funnel.map((step) => <div className="table-row" key={step.key}><strong>{step.label}</strong><span>{step.events}</span><span>{step.sessions}</span><span>{formatRate(step.conversion)}</span><span>{formatRate(step.dropoff)}</span></div>)}<p>Overall tracked session → intent: <strong>{formatRate(data.overallConversion)}</strong></p></div></div></section>

    <div className="admin-two-col"><section className="admin-panel card"><div className="admin-panel-head"><div><p className="eyebrow">Product performance</p><h2>What visitors choose</h2></div></div><div className="product-performance"><div className="table-row table-head"><span>Product</span><span>Views</span><span>Adds</span><span>Checkout</span><span>Intent</span><span>Conv.</span></div>{data.productPerformance.map((product) => <div className="table-row" key={product.id}><strong>{product.name}</strong><span>{product.views}</span><span>{product.addToCarts}</span><span>{product.checkouts}</span><span>{product.intents}</span><span>{formatRate(product.conversion)}</span></div>)}</div></section>
    <section className="admin-panel card economics-panel"><div className="admin-panel-head"><div><p className="eyebrow">Experiment economics</p><h2>Manual ad spend</h2></div></div><div className="field"><label htmlFor="spend">Advertising spend (€)</label><input className="input" id="spend" type="number" min="0" step="1" value={spend} onChange={(event) => setSpend(Math.max(0, Number(event.target.value)))} /></div><p className="manual-label">Manually entered · no Meta Ads API connection</p><dl><div><dt>Cost / tracked visit</dt><dd>{cost(spend, data.funnel[0]?.sessions || 0)}</dd></div><div><dt>Cost / add to cart</dt><dd>{cost(spend, data.metrics.addToCarts)}</dd></div><div><dt>Cost / checkout</dt><dd>{cost(spend, data.metrics.checkouts)}</dd></div><div><dt>Cost / purchase intent</dt><dd>{cost(spend, data.metrics.intents)}</dd></div><div><dt>Cost / waitlist signup</dt><dd>{cost(spend, data.metrics.waitlist)}</dd></div></dl></section></div>

    <section className="admin-panel card export-panel"><div><p className="eyebrow">Protected export</p><h2>Download genuine stored data</h2><p>CSV files use the active date and traffic filters. Waitlist exports contain personal data—handle them accordingly.</p></div><div>{["events", "funnel", "waitlist"].map((type) => <Button asChild variant="secondary" key={type}><a href={`/api/admin/export/${type}?${query}`}><Download size={16} /> {type[0].toUpperCase() + type.slice(1)} CSV</a></Button>)}</div></section>
  </>;
}
