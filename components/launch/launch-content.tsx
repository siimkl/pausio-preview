"use client";

import { ArrowLeft, Check, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WaitlistForm } from "@/components/launch/waitlist-form";
import { Button } from "@/components/ui/button";
import { getProduct, type CartLine, type ProductId } from "@/lib/products";

type Intent = { confirmationId: string; country: string; lines: CartLine[]; createdAt: string };

export function LaunchContent() {
  const [intent, setIntent] = useState<Intent | null>(null);
  useEffect(() => {
    const raw = window.sessionStorage.getItem("lockbox-purchase-intent-v1");
    if (!raw) return;
    try { const parsed = JSON.parse(raw) as Intent; queueMicrotask(() => setIntent(parsed)); } catch { /* show generic launch state */ }
  }, []);
  const preferredProduct = useMemo(() => intent ? [...intent.lines].sort((a, b) => b.quantity - a.quantity)[0]?.productId || "" : "", [intent]) as ProductId | "";
  return (
    <div className="launch-page">
      <div className="launch-hero"><div className="launch-icon"><LockKeyhole size={34} /></div><p className="eyebrow">Intent confirmed</p><h1 className="h1">Looks like future-you<br />needs a pausio.</h1><p>We&apos;re getting ready to launch. Thanks for checking out Pausio.eu.</p><div className="launch-facts"><span><Check size={16} /> No order has been placed</span><span><Check size={16} /> No payment has been collected</span><span><Check size={16} /> Products are not yet available</span></div>{intent && <p className="intent-reference">Intent reference: {intent.confirmationId.slice(0, 8).toUpperCase()} · This is not an order number.</p>}</div>
      <div className="launch-waitlist card"><div><p className="eyebrow">Completely optional</p><h2>Want to know when we launch?</h2><p>Leave an email if you want one launch update. Or don&apos;t—your purchase intent is already counted where consent allowed.</p></div><WaitlistForm defaultCountry={intent?.country || ""} preferredProduct={preferredProduct} /></div>
      {intent?.lines?.length ? <div className="intent-selection"><h2>Your preview selection</h2>{intent.lines.map((line) => <span key={line.productId}>{line.quantity} × {getProduct(line.productId)?.catalogueName}</span>)}</div> : <div className="direct-launch-note"><p>You arrived here without a checkout confirmation. You can still join the optional launch list, but no purchase intent was recorded.</p></div>}
      <Button asChild variant="ghost"><Link href="/"><ArrowLeft size={17} /> Back to Pausio.eu</Link></Button>
    </div>
  );
}
