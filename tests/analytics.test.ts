import { beforeEach, describe, expect, it, vi } from "vitest";
import { canTrack, readConsent, saveConsent, trackEvent } from "@/lib/analytics";

describe("consent-aware analytics", () => {
  beforeEach(() => { vi.restoreAllMocks(); vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true })))); });

  it("stores explicit category choices", () => {
    saveConsent(true, false);
    expect(readConsent()).toMatchObject({ necessary: true, analytics: true, marketing: false });
    expect(canTrack("analytics")).toBe(true);
    expect(canTrack("marketing")).toBe(false);
  });

  it("does not emit optional events after rejection", async () => {
    saveConsent(false, false);
    const result = await trackEvent("add_to_cart", { product_id: "box-s" });
    expect(result).toMatchObject({ tracked: false, reason: "no-consent" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("deduplicates important events within the session", async () => {
    saveConsent(true, false);
    const first = await trackEvent("purchase_intent", { cart_value_cents: 6900 }, { idempotencyKey: "intent:test" });
    const second = await trackEvent("purchase_intent", { cart_value_cents: 6900 }, { idempotencyKey: "intent:test" });
    expect(first.tracked).toBe(true);
    expect(second).toMatchObject({ tracked: false, reason: "duplicate" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
