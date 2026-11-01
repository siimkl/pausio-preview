"use client";

import { CURRENCY, getProduct, type CartLine } from "@/lib/products";

export const CONSENT_KEY = "lockbox-consent-v1";
const SESSION_KEY = "lockbox-analytics-session";
const ATTRIBUTION_KEY = "lockbox-attribution";
const SENT_KEY = "lockbox-sent-events";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type TrackingEventName =
  | "page_view"
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "checkout_step_view"
  | "delivery_country_selected"
  | "checkout_review"
  | "purchase_intent"
  | "waitlist_signup"
  | "scroll_depth"
  | "page_engagement";

type AnalyticsPayload = Record<string, unknown> & {
  product_id?: string;
  cart_value_cents?: number;
  country?: string;
  items?: { item_id: string; item_name: string; price: number; quantity: number }[];
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null") as ConsentState | null;
  } catch {
    return null;
  }
}

export function canTrack(category: "analytics" | "marketing", consent = readConsent()) {
  return Boolean(consent?.[category]);
}

export function saveConsent(analytics: boolean, marketing: boolean): ConsentState {
  const consent: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  if (!analytics) {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
  if (!analytics && !marketing) {
    window.sessionStorage.removeItem(ATTRIBUTION_KEY);
  }
  window.dispatchEvent(new CustomEvent("lockbox:consent", { detail: consent }));
  return consent;
}

export function captureAttribution() {
  if (typeof window === "undefined" || (!canTrack("analytics") && !canTrack("marketing"))) return {};
  const current = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  const attribution = Object.fromEntries(keys.map((key) => [key, current.get(key) || ""]).filter(([, value]) => value));
  const existing = window.sessionStorage.getItem(ATTRIBUTION_KEY);
  if (Object.keys(attribution).length && !existing) {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  }
  try {
    return JSON.parse(existing || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

export function getSessionId() {
  if (typeof window === "undefined" || !canTrack("analytics")) return null;
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function cartItems(lines: readonly CartLine[]) {
  return lines.flatMap((line) => {
    const product = getProduct(line.productId);
    return product
      ? [{ item_id: product.id, item_name: product.catalogueName, price: product.priceCents / 100, quantity: line.quantity }]
      : [];
  });
}

function hasSent(idempotencyKey: string) {
  try {
    const sent = JSON.parse(window.sessionStorage.getItem(SENT_KEY) || "[]") as string[];
    if (sent.includes(idempotencyKey)) return true;
    window.sessionStorage.setItem(SENT_KEY, JSON.stringify([...sent.slice(-99), idempotencyKey]));
  } catch {
    window.sessionStorage.setItem(SENT_KEY, JSON.stringify([idempotencyKey]));
  }
  return false;
}

export async function trackEvent(
  eventName: TrackingEventName,
  payload: AnalyticsPayload = {},
  options: { idempotencyKey?: string } = {},
) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") return { tracked: false as const, reason: "static-preview" };
  if (typeof window === "undefined" || (!canTrack("analytics") && !canTrack("marketing"))) return { tracked: false as const, reason: "no-consent" };
  if (options.idempotencyKey && hasSent(options.idempotencyKey)) {
    return { tracked: false as const, reason: "duplicate" };
  }

  const eventId = crypto.randomUUID();
  const analyticsAllowed = canTrack("analytics");
  const sessionId = getSessionId();
  const attribution = captureAttribution();
  const event = { event_id: eventId, session_id: sessionId, event_name: eventName, currency: CURRENCY, ...attribution, ...payload };

  if (analyticsAllowed) {
    window.gtag?.("event", eventName, {
      ...payload,
      value: typeof payload.cart_value_cents === "number" ? payload.cart_value_cents / 100 : undefined,
      currency: CURRENCY,
      event_id: eventId,
    });
    window.clarity?.("event", eventName);
  }
  if (canTrack("marketing")) {
    const metaName: Partial<Record<TrackingEventName, string>> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase_intent: "Lead",
      waitlist_signup: "Lead",
    };
    if (metaName[eventName]) window.fbq?.("track", metaName[eventName], { ...payload, currency: CURRENCY }, { eventID: eventId });
  }

  if (analyticsAllowed) {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(event),
        keepalive: true,
      });
    } catch {
      // Analytics failure must never interrupt the customer journey.
    }
  }
  return { tracked: true as const, eventId };
}
