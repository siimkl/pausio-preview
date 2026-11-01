# TimerLockBox.eu pre-launch demand experiment

A production-oriented Next.js application for testing purchase intent for TimerLockBox.eu: one external electronic timer padlock and three compatible box bundles. Visitors can browse products, use a persistent cart, review an indicative EU total, and explicitly confirm that they would buy at that price. The application never creates an order or accepts payment details.

## Architecture

- **Next.js App Router + TypeScript:** server-rendered storefront and product metadata, client-side cart/checkout interactions, route handlers for controlled writes.
- **Tailwind CSS + local component styles:** mobile-first visual system with Radix/shadcn-style accessible primitives and Lucide icons.
- **Central product catalogue:** product IDs, cents-based prices, included components, delivery fee, and EU-country list live in `lib/products.ts`.
- **Browser-local journey state:** cart in `localStorage`; checkout country and one-time purchase-intent confirmation in `sessionStorage`.
- **Supabase:** service-role-only server writes, Supabase Auth for admins, PostgreSQL/RLS migration for consented analytics and waitlist records.
- **Consent-aware measurement:** one tracking module dispatches to the internal event endpoint, GA4, Meta Pixel, and Microsoft Clarity only for the allowed categories. No `purchase` event is emitted.
- **Durable abuse protection:** Upstash Redis rate limits public production write endpoints using a one-way hash of the request address. Raw IPs are not analytics data.
- **Real-data-only admin:** allowlisted authenticated admins can filter funnel/product data, enter manual advertising spend, and download protected CSV exports.

## Local development

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The example environment enables demo mode. Demo mode validates the waitlist form but returns an explicit “not stored” result; the dashboard shows a configuration gate rather than invented data.

Useful commands:

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm start
```

Install the Playwright browser once on a new machine with `npx playwright install chromium`. `npm run test:e2e` creates a production build first, then runs against `next start`.

## Production environment variables

Copy `.env.example` into the Vercel project and configure:

| Variable | Required | Purpose |
|---|---:|---|
| `NEXT_PUBLIC_DEMO_MODE=false` | Yes | Enables genuine persistence; never leave production in demo mode. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical production origin, for example `https://lockbox.example`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL. Safe to expose. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase publishable/anon key. Safe to expose with RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only writes and reports. Never expose with `NEXT_PUBLIC_`. |
| `ADMIN_EMAILS` | Yes | Comma-separated, lower/upper-case-insensitive admin allowlist. |
| `UPSTASH_REDIS_REST_URL` | Yes | Durable serverless rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Server-only Upstash credential. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID, loaded after analytics consent. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta Pixel ID, loaded after marketing consent. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity project ID, loaded after analytics consent. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Real operator contact shown in footer and privacy draft. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Real Instagram URL; blank values are hidden. |
| `NEXT_PUBLIC_FACEBOOK_URL` | Optional | Real Facebook URL; blank values are hidden. |

External analytics IDs are intentionally optional. An unconfigured provider remains inactive without affecting the storefront.

## Supabase setup

1. Create a Supabase project in an appropriate production region.
2. Run `supabase/migrations/202610300001_lockbox_mvp.sql` in the Supabase SQL editor or with the Supabase CLI.
3. Confirm RLS is enabled and neither `anon` nor `authenticated` has direct table access. Public writes go through validated Next.js routes; authorized admin reads use the service role on the server.
4. In Authentication, disable public sign-up and create administrator users manually.
5. Add those exact email addresses to `ADMIN_EMAILS`.
6. Configure the URL, anon key, and service role in Vercel. Do not place the service role in a local file committed to Git.

The migration creates:

- `analytics_events` with unique event IDs and funnel/reporting indexes.
- `waitlist_signups` with case-insensitive unique email addresses and explicit consent timestamps.

Production mode does not silently fall back if Supabase or Upstash is unavailable. Storefront browsing remains available, but persistence endpoints return clear configuration errors.

## Admin access and exports

Visit `/admin` and sign in with a manually created Supabase Auth user whose email is in `ADMIN_EMAILS`. Authentication cookies are managed server-side. The dashboard supports date, country, product, campaign, and UTM-source filters; it distinguishes raw event counts from unique consenting sessions.

Advertising spend defaults to €100 and is manually entered in the browser. There is no Meta Ads spend API connection. CSV export links for events, funnel aggregates, and waitlist records re-check server-side admin authorization.

## Analytics configuration

1. Create the GA4 web stream, Meta Pixel, and Clarity project in their respective services.
2. Add only the public IDs to the matching `NEXT_PUBLIC_*` variables.
3. Deploy and verify each provider with its official debug/diagnostic tools after granting the relevant consent category.
4. Verify rejection before launch: GA4/Clarity must not load without analytics consent; Meta Pixel must not load without marketing consent.
5. Complete provider names, cookie lifetimes, retention settings, international-transfer details, and operator details in the draft policy pages with legal counsel.

The application tracks `page_view`, `view_item_list`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `checkout_step_view`, `delivery_country_selected`, `checkout_review`, `purchase_intent`, and `waitlist_signup`, plus scroll/engagement helpers. It never sends email addresses to analytics and never fires `purchase`.

## Vercel deployment

1. Import the repository into Vercel and set the Root Directory to `Sim33_LOCKBOX`.
2. Use the detected Next.js framework preset and `npm run build` command.
3. Add all production environment variables before the first production build.
4. Deploy, then check `/`, each product route, `/checkout`, `/launch`, policy routes, and the authenticated `/admin` route.
5. Test a real waitlist insert and consented event in a non-production Supabase project before enabling ads.
6. Confirm the canonical URL, `robots.txt`, `sitemap.xml`, social preview image, analytics consent behavior, and CSV permissions on the deployed origin.

No deployment has been performed from this workspace, and no external Supabase, GA4, Meta, Clarity, Upstash, or email-provider integration has been verified here.

## Pre-launch checklist

- Replace concept visuals and unverified technical copy only after a supplier product is selected.
- Obtain legal review of Privacy, Cookie, and Terms drafts.
- Add the actual operator identity and contact details.
- Confirm timer/battery/emergency-opening facts, EU shipping scope, VAT treatment, and delivery fee.
- Configure provider-side Clarity masking and verify form fields remain excluded.
- Run the full automated suite and a deployed-device smoke test.
