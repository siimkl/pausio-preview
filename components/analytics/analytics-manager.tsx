"use client";

import { useEffect, useRef } from "react";
import { canTrack, captureAttribution, readConsent, trackEvent, type ConsentState } from "@/lib/analytics";

function loadScript(id: string, src: string, onLoad?: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
}

function configureAnalytics(consent: ConsentState | null) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (consent?.analytics && gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", gaId, { send_page_view: false, allow_google_signals: false });
    loadScript("lockbox-ga", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
  }
  if (consent?.analytics && clarityId) {
    window.clarity = window.clarity || ((...args: unknown[]) => {
      (window.clarity as unknown as { q?: unknown[] }).q = (window.clarity as unknown as { q?: unknown[] }).q || [];
      (window.clarity as unknown as { q: unknown[] }).q.push(args);
    });
    loadScript("lockbox-clarity", `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`);
  }
  if (consent?.marketing && metaId) {
    window.fbq = window.fbq || ((...args: unknown[]) => {
      (window.fbq as unknown as { queue?: unknown[] }).queue = (window.fbq as unknown as { queue?: unknown[] }).queue || [];
      (window.fbq as unknown as { queue: unknown[] }).queue.push(args);
    });
    window.fbq("init", metaId);
    loadScript("lockbox-meta", "https://connect.facebook.net/en_US/fbevents.js");
    if (!document.documentElement.dataset.metaPageView) {
      window.fbq("track", "PageView");
      document.documentElement.dataset.metaPageView = "true";
    }
  }
}

export function AnalyticsManager() {
  const pageStarted = useRef(0);
  useEffect(() => {
    pageStarted.current = Date.now();
    const apply = () => {
      const consent = readConsent();
      configureAnalytics(consent);
      if (consent?.analytics || consent?.marketing) {
        captureAttribution();
      }
      if (consent?.analytics) {
        void trackEvent("page_view", { page_path: window.location.pathname, page_title: document.title }, { idempotencyKey: `page:${window.location.href}` });
      }
    };
    const onConsent = () => apply();
    apply();
    window.addEventListener("lockbox:consent", onConsent);

    const depthMarks = new Set<number>();
    const onScroll = () => {
      if (!canTrack("analytics")) return;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const depth = available > 0 ? Math.round((window.scrollY / available) * 100) : 100;
      [25, 50, 75, 90].forEach((mark) => {
        if (depth >= mark && !depthMarks.has(mark)) {
          depthMarks.add(mark);
          void trackEvent("scroll_depth", { percent: mark }, { idempotencyKey: `scroll:${window.location.pathname}:${mark}` });
        }
      });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && canTrack("analytics")) {
        const seconds = Math.round((Date.now() - pageStarted.current) / 1000);
        if (seconds >= 5) void trackEvent("page_engagement", { seconds, page_path: window.location.pathname }, { idempotencyKey: `engagement:${window.location.pathname}` });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("lockbox:consent", onConsent);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return null;
}
