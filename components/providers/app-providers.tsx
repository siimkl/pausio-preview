"use client";

import { CartProvider } from "@/components/providers/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { AnalyticsManager } from "@/components/analytics/analytics-manager";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AnalyticsManager />
      {children}
      <CartDrawer />
      <CookieConsent />
    </CartProvider>
  );
}
