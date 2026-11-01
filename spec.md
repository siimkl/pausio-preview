# CODEX MASTER PROMPT — TimerLockBox.eu E-COMMERCE MVP

## 0. Your role and working instructions

You are a senior full-stack developer, UX/UI designer, and e-commerce conversion specialist.

Your task is to **design, implement, test, and prepare for deployment a complete, functional e-commerce MVP** for a new European direct-to-consumer brand called **TimerLockBox.eu**.

This is not a static website or a design prototype. Build a real application with working product selection, shopping cart, checkout simulation, analytics, database integration, and administrative reporting.

Work autonomously. Make reasonable implementation decisions without repeatedly requesting clarification.

**Do not stop after creating a plan or the first page. Implement the entire application.**

Use an iterative development approach:

1. Inspect the existing repository and environment.
2. Create a short implementation plan.
3. Implement the application in manageable stages.
4. Run and verify the application after each major stage.
5. Fix errors before proceeding.
6. Test the complete customer journey.
7. Prepare the project for deployment.
8. Summarise what works and which external credentials or configuration are still required.

If external services are not configured, implement working local demo functionality and clearly identify which production integrations remain inactive. Never fabricate successful integrations or real analytics data.

Prioritise simplicity, maintainability, responsive design, and a polished user experience over unnecessary technical complexity.

---

# 1. Business concept

## 1.1 Brand

**Brand name:** TimerLockBox.eu

**Primary slogan:**
"A box with more willpower than you."

**Secondary slogan:**
"Outsource your self-control."

TimerLockBox.eu sells a physical self-control product.

The system consists of:

- One universal electronic timer padlock.
- Three differently sized lockable boxes.
- Each box has physical fittings to accept the padlock.
- The timer is set directly on the padlock.
- The same padlock can be used with any box.

Customers place distracting or tempting items inside the box, close it, attach the timer padlock, and set how long they want the item to remain inaccessible.

Example objects:

- Smartphones.
- Candy and snacks.
- Alcohol bottles.
- Gaming controllers.
- Small electronic devices.
- Other nonessential personal items.

The fundamental idea is that users make a deliberate decision now and create a physical barrier against changing that decision impulsively later.

## 1.2 Business positioning

This is a fun, minimalist, premium-looking consumer product.

It is not:

- A medical device.
- An addiction treatment.
- A security safe.
- A complex smart-home device.
- A subscription service.

Avoid medical claims or guarantees about health, productivity, or behavioural outcomes.

**Brand personality:**

FUN. MINIMALIST. PREMIUM. SLIGHTLY IRONIC. ACTUALLY PRACTICAL.

Humorous marketing examples:

- "Future-you doesn't get a vote."
- "Put your distractions in jail."
- "Your 11 PM self cannot be trusted."
- "Phone goes in. Life happens."
- "You said two beers. We trust 6 PM you."
- "Lock your stuff. Get your life back."

The language should be witty but not childish, moralising, or patronising.

---

# 2. MVP objectives

The initial goal is **not to sell products immediately**.

The goal is to validate market demand before purchasing stock from Chinese suppliers.

We will run a small Meta Ads experiment with an initial budget of approximately €100.

Visitors must be able to experience the product catalogue and shopping journey up to the final purchase-intent confirmation.

The website must measure:

1. Advertising clicks that successfully result in website visits.
2. Landing-page engagement.
3. Product impressions and product detail views.
4. Shopping-cart additions.
5. Shopping-cart abandonment.
6. Checkout starts.
7. Checkout step progression.
8. Final price reviews.
9. Confirmed purchase intent.
10. Optional email waitlist registration.

The primary commercial metric is:

**Percentage of visitors who confirm that they would buy a selected product at its displayed final price.**

Secondary metrics include product preferences, checkout abandonment, traffic source, and cost per purchase-intent confirmation.

The application must distinguish expressed purchase intent from completed purchases.

**No real payments, purchases, orders, or payment credentials are collected in this MVP.**

---

# 3. Technology stack

Use the following stack unless there is a compelling technical reason to make a small adjustment.

| Layer | Technology |
|---|---|
| Application | Next.js, App Router |
| Language | TypeScript |
| Frontend | React |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Icons | Lucide React |
| Database | Supabase PostgreSQL |
| Hosting | Vercel |
| Analytics | Google Analytics 4 |
| Ads tracking | Meta Pixel |
| Behaviour analytics | Microsoft Clarity |
| Testing | Vitest and Playwright |
| Forms | React Hook Form + Zod, where useful |

Use stable, compatible package versions.

Avoid deprecated APIs, unnecessary dependencies, and over-engineering.

Use Next.js server components where appropriate and client components for interactive features.

Use environment variables for external integration credentials.

Never commit secrets or service-role keys to Git.

Create:

- `.env.example`
- `README.md`
- Supabase SQL migrations.
- Necessary configuration files.
- Test scripts.
- A clean and understandable project structure.

---

# 4. Design system

## 4.1 Visual direction

The interface should look like a premium European DTC consumer brand.

Design references:

- MUJI.
- IKEA.
- Nothing.
- Minimalist modern Shopify stores.
- Premium consumer electronics landing pages.

Avoid:

- Cheap dropshipping aesthetics.
- Excessive gradients.
- Flashing banners.
- Fake countdown timers.
- Fake scarcity indicators.
- Fake reviews or sales statistics.
- Excessive animation.

## 4.2 Colours

Suggested initial palette:

- Primary background: warm off-white `#F7F7F2`.
- Secondary background: light beige `#EFEDE6`.
- Primary text: near-black `#202421`.
- Muted text: `#71766F`.
- Accent: muted forest green `#315A49`.
- Cards: white.
- Borders: subtle light grey.

The exact palette can be refined if a more coherent visual result is possible.

## 4.3 Typography

Use a modern, legible sans-serif typeface such as Inter or Geist.

- Large, confident hero headlines.
- Clear product titles.
- Strong pricing hierarchy.
- Generous spacing.
- Consistent typography throughout.

## 4.4 Responsive design

Build mobile-first.

Breakpoints should cover:

- Small mobile phones.
- Large mobile phones.
- Tablets.
- Desktop.
- Wide desktop.

Assume most paid advertising traffic will arrive through mobile browsers.

Prioritise:

- Fast page loading.
- Clear product imagery.
- Large touch targets.
- Fast add-to-cart interaction.
- Easy checkout.
- Minimal scrolling between key decisions.
- No horizontal overflow.

---

# 5. Product catalogue

The MVP has exactly **four purchasable product types**.

| ID | Product | Price |
|---|---|---:|
| `timer-lock` | Electronic Timer Padlock | €39 |
| `box-s` | S BOX + Timer Padlock | €59 |
| `box-m` | M BOX + Timer Padlock | €79 |
| `box-l` | L BOX + Timer Padlock | €99 |

Prices are configurable and should not be hardcoded independently across components.

## 5.1 Electronic Timer Padlock — €39

A compact, standalone, electronic timer padlock.

Visual requirements:

- Conventional padlock shape.
- Metal shackle.
- Simple digital timer display.
- Two or three controls.
- Minimalist industrial design.
- Dark grey or charcoal finish.

The timer is operated directly on the lock.

Desired product capabilities:

- Adjustable timer.
- Straightforward operation.
- Rechargeable battery, preferably USB-C.
- Compatibility with all three boxes.

**Important:** Exact battery specifications, timer range, emergency-opening behaviour, and other technical characteristics are not yet confirmed.

Do not invent technical specifications or advertise unverified features as facts.

## 5.2 S BOX — €59 including lock

Small lockable box.

Intended for:

- Smartphone.
- Gaming controller.
- Candy.
- Small personal items.

Design:

- Rectangular.
- Foldable fabric construction.
- Grey-and-white horizontal stripes with grey piping and carry handles.
- Zippered lid with paired metal zipper pulls.
- The external timer-padlock shackle passes through both zipper-pull holes.

## 5.3 M BOX — €79 including lock

Medium-sized box.

Intended for:

- Multiple smartphones.
- Snacks.
- Alcohol bottles.
- Larger electronic accessories.

Same visual design language as S.

## 5.4 L BOX — €99 including lock

Large box.

Intended for:

- Multiple devices.
- Larger objects.
- Family use.
- Larger snack or household-item storage.

Same visual design language as S and M.

## 5.5 Critical product-design requirement

**The padlock must be a physically separate product attached externally to each box.**

All boxes must have a visible mechanical arrangement that allows the padlock shackle to pass through both paired zipper-pull holes.

Do not create images showing:

- An integrated electronic box lock.
- A lock merely placed next to a box.
- A padlock floating in front of the lid.
- Decorative locking hardware or zipper pulls that could not physically secure the box.

Product visuals must clearly show the correct operating principle.

Product imagery must be reasonably mechanically plausible and should match the selected striped foldable storage-box design and silver timer padlock.

Final measurements and specifications remain subject to confirmation, so mark generated product previews appropriately.

## 5.6 Product offering rules

- Every box bundle contains one timer padlock.
- A standalone timer padlock can also be purchased.
- No standalone box-only products in the MVP.
- No subscriptions.
- No bundles of multiple boxes.
- No replacement parts yet.
- Quantity selection must work.

All four product cards must be visible in the catalogue.

---

# 6. Image assets and product presentation

The website must look polished even before professional product photography is available.

Preferred implementation:

1. Use available local product assets if provided.
2. Otherwise create high-quality self-contained illustrative product visuals using SVG, CSS, or suitable local placeholder assets.
3. Keep imagery replaceable through a central product-data configuration.
4. Do not rely on hotlinked third-party product photographs.
5. Do not present conceptual images as confirmed final manufactured products.

The homepage should include a large hero composition displaying:

- One standalone timer padlock.
- S box.
- M box.
- L box.

The three boxes should look like members of the same product family.

Use believable proportions and consistent materials.

Product cards can include multiple images or a simple product image gallery if appropriate.

---

# 7. Global website structure

Build a complete website with these pages or routes:

- `/` — Homepage and storefront.
- `/products/[slug]` — Individual product details.
- `/checkout` — Simulated checkout.
- `/launch` — Purchase-intent confirmation and waitlist.
- `/privacy` — Privacy Policy draft.
- `/cookies` — Cookie Policy draft.
- `/terms` — Website terms and pre-launch disclaimer.
- `/admin` — Protected analytics dashboard.
- `/not-found` — Custom 404 page.

Use English throughout.

No multilingual routing is required.

---

# 8. Header and navigation

The desktop header contains:

**Left:**
- TimerLockBox.eu logo.

**Centre:**
- Shop.
- How it works.
- Why TimerLockBox.eu.
- FAQ.

**Right:**
- Translate button with globe icon.
- Shopping-cart icon with item count.

The header should be clean, compact, and optionally sticky.

On mobile:

- Logo.
- Translate button.
- Shopping-cart icon.
- Hamburger menu, if necessary.

Navigation links scroll smoothly to homepage sections when relevant.

## 8.1 Translation button

The website has only one native language: **English**.

Do not build a multilingual application or integrate a paid translation API.

Add a header button:

**Globe icon + Translate**

When clicked, open a clean dropdown or popover.

Title:

"Read this page in your language"

Explanation:

"Use your browser's built-in translation feature to translate this website."

Offer simple guidance for:

- Google Chrome.
- Microsoft Edge.
- Safari.

Where appropriate, explain that translation may be available through the browser menu or by right-clicking the page.

Add a secondary external link:

"Open Google Translate"

Link to the Google Translate website, opening in a new tab.

Do not claim that clicking the button can directly invoke the browser's native translation panel.

Do not inject an obsolete Google Translate website widget.

Do not attempt to translate the checkout DOM using unreliable browser hacks.

Make the popover accessible, keyboard-friendly, and visually polished.

---

# 9. Homepage sections

Create a coherent, conversion-oriented single-page storefront.

## Section A — Hero

Large headline:

**A box with more willpower than you.**

Supporting text:

"Phones. Snacks. Alcohol. Distractions. Lock them away, set the timer, and let future-you deal with it later."

Primary button:

**Shop TimerLockBox.eu**

Scrolls to products.

Secondary button:

**See how it works**

Scrolls to the explanation section.

Hero imagery:

- Elegant arrangement of all three boxes.
- One electronic timer padlock.
- Visible padlock attachment hardware.

Small supporting statements:

- One lock. Three sizes.
- No app required.
- Simple timer control.

Include a clearly visible but visually restrained **Pre-launch preview** disclosure near the hero or products.

Do not imply the products are currently in stock.

## Section B — Product catalogue

Heading:

**Choose your level of self-control.**

Subheading:

"One timer padlock. Three box sizes. Zero negotiations with future-you."

Display four product cards.

Each contains:

- Product image.
- Product name.
- Short description.
- Price.
- Product details link.
- Add to cart button.

Suggested card copy:

**Timer Padlock**
"Already have a box? Bring your own self-control."

**S BOX**
"Perfect for your phone and smaller temptations."

**M BOX**
"More room for the things you said you'd avoid."

**L BOX**
"When the whole household needs a time-out."

The S, M, and L cards must clearly indicate that the timer padlock is included.

Do not advertise stock availability or shipping dates as confirmed.

## Section C — How it works

Three visual steps.

**01 — Put it inside**

"Choose what you want to stop reaching for."

**02 — Set the timer**

"Attach the timer padlock and choose your lockout period."

**03 — Get on with your life**

"Your stuff stays put until the timer allows the lock to open."

Use simple diagrams or illustrations.

## Section D — Use cases

Create attractive visual cards for:

**Phone detox**
"Put your phone in jail."

**Better evenings**
"Your midnight scrolling habit has been cancelled."

**Snack control**
"Chocolate can wait."

**Alcohol moderation**
"Make the decision before the third beer."

**Study & focus**
"Less scrolling. More doing."

**Gaming breaks**
"Your controller has a bedtime."

These are examples of intended use, not guaranteed outcomes.

Avoid medical claims and do not target minors with alcohol-related messaging.

## Section E — Why TimerLockBox.eu?

Explain the concept through three short features.

**Physical boundaries**

"Not another notification you can ignore."

**One universal lock**

"Use the same timer padlock with different boxes."

**Simple by design**

"No app, account, or complicated setup."

Use concise copy and clean iconography.

## Section F — FAQ

Use accessible accordion components.

Include:

1. What is TimerLockBox.eu?
2. How does the timer work?
3. Can I use one lock with different boxes?
4. What happens if the battery runs out?
5. Can I open it in an emergency?
6. Do I need an app?
7. When will the products be available?
8. Will TimerLockBox.eu ship across the EU?
9. Can I buy the timer padlock separately?

Where technical information remains unconfirmed, explain that final product specifications are being established.

Include a practical safety notice:

"Do not lock away medication, emergency equipment, essential keys, or your only means of making an emergency call. TimerLockBox.eu is not a security safe or emergency-access device."

Never claim that users can reliably break or override the lock unless the final product has that documented capability.

## Section G — Footer

Include:

- TimerLockBox.eu.
- Short brand description.
- Shop.
- How it works.
- FAQ.
- Privacy.
- Cookies.
- Terms.
- Contact email placeholder from configuration.
- Instagram and Facebook links if configured.
- Copyright.

Do not invent contact addresses or social-media accounts.

---

# 10. Product detail pages

Each of the four products must have a proper product-detail page.

Include:

- Product images.
- Product name.
- Price.
- Short description.
- Intended uses.
- Included components.
- Quantity selector.
- Add to cart.
- Relevant safety information.
- Link back to the product catalogue.

The box product pages must state:

**Includes one electronic timer padlock.**

The standalone lock product page must explain that it is designed to work with suitable externally lockable containers, subject to physical compatibility.

Avoid fabricated customer ratings, product specifications, availability information, and reviews.

---

# 11. Shopping cart

Implement a fully functional shopping cart.

## 11.1 Behaviour

- Add products.
- Remove products.
- Change quantities.
- Automatically calculate subtotal.
- Persist cart contents across page refreshes.
- Display quantity badge in header.
- Empty-cart state.
- Continue shopping.
- Proceed to checkout.

Use localStorage for cart persistence, with SSR-safe hydration and no unnecessary user tracking.

## 11.2 Cart interface

Desktop:

A polished slide-in cart drawer from the right.

Mobile:

A responsive drawer or full-screen cart interface.

Each item shows:

- Thumbnail.
- Product name.
- Unit price.
- Quantity.
- Line total.
- Remove control.

Display:

**Subtotal: €XX**

Below it:

"Estimated EU delivery: €10"

Use the estimated delivery fee in checkout calculations.

The cart must clearly indicate that this is a pre-launch product preview.

Primary CTA:

**Continue to checkout**

---

# 12. Checkout simulation

This is the most important user journey.

Build a realistic checkout interface with a progress indicator.

The user should experience an ordinary e-commerce flow without being misled into believing they are placing a real order.

Do not collect payment credentials or unnecessary personal information.

## Step 1 — Review cart

Display:

- Product names.
- Product quantities.
- Unit prices.
- Total item price.
- Edit cart action.

CTA:

**Continue**

Record checkout initiation.

## Step 2 — Delivery country

Let the user select any of the 27 EU member states.

Use proper country names.

Do not include non-EU countries in this MVP.

Show:

- Selected country.
- Estimated delivery cost: €10.
- A note explaining that shipping prices and availability are provisional.

Do not request:

- Street address.
- Phone number.
- Postal code.
- Full name.

CTA:

**Review total**

## Step 3 — Final price review

Display a clean order summary:

| Item | Amount |
|---|---:|
| Products | Calculated subtotal |
| Estimated delivery | €10 |
| Estimated total | Calculated total |

All monetary calculations should be done safely in integer cents.

The prices are customer-facing estimates; final destination-specific VAT and shipping terms will be confirmed before actual sales begin.

Make this disclosure visible:

**"TimerLockBox.eu is not available for purchase yet. This is a pre-launch preview to help us understand demand. No order will be placed and no payment will be taken."**

Primary button:

**I'd buy this at this price**

This is the **purchase-intent confirmation**, not a purchase button.

Record this specific event and selected cart details for the experiment, subject to tracking consent.

The button must be protected against accidental double submissions.

## Step 4 — Confirmation / launch page

After purchase-intent confirmation, display:

**Looks like future-you needs a TimerLockBox.**

Supporting text:

"We're getting ready to launch. Thanks for checking out TimerLockBox.eu."

Explain that:

- No order has been placed.
- No payment has been collected.
- The products are not yet available to purchase.

Offer optional email signup.

Heading:

**Want to know when we launch?**

Email field.

Checkbox:

"I agree to receive an email about the TimerLockBox.eu launch."

Button:

**Notify me**

The email field and checkbox are voluntary.

The user must be able to leave without subscribing.

Do not create any fake order number, payment receipt, or payment confirmation.

---

# 13. Waitlist database

Use Supabase.

Create a `waitlist_signups` table.

Suggested fields:

- `id`
- `created_at`
- `email`
- `country`
- `preferred_product`
- `consent_given`
- `consent_timestamp`

Use appropriate constraints and indexes.

Requirements:

- Server-side validation.
- Email format validation.
- Explicit opt-in.
- Duplicate handling.
- Spam protection.
- Rate limiting suitable for serverless deployment.
- Secure storage.
- No public read access.

For MVP, store signups without integrating a mass-email platform.

Do not claim that a confirmation email was sent if no email-sending provider is configured.

Implement a secure admin CSV export.

Ensure waitlist signup works independently of optional analytics consent.

Do not pass email addresses to GA4, Meta Pixel, or Microsoft Clarity.

---

# 14. Analytics infrastructure

Analytics is a core product requirement, not an optional enhancement.

Implement a reusable event-tracking layer.

Prefer one central tracking module rather than scattered analytics calls.

## 14.1 Integrations

Support:

**Google Analytics 4**
- Traffic measurement.
- Session engagement.
- Funnel events.
- Traffic-source attribution.

**Meta Pixel**
- Advertising attribution.
- Campaign measurement.
- Relevant funnel events.

**Microsoft Clarity**
- User interaction analysis.
- Scroll behaviour.
- Session recordings where permitted.
- UX friction identification.

All integrations must be configurable through environment variables.

If an integration is not configured, the website must still work normally.

## 14.2 Privacy and consent

Build a cookie consent interface.

Categories:

- Strictly necessary.
- Analytics.
- Marketing.

Buttons:

- Accept all.
- Reject optional.
- Customize.

The user must be able to modify or withdraw consent later.

Do not load GA4 or Clarity before the required analytics consent.

Do not load Meta Pixel before marketing consent.

When consent is rejected, no optional tracking scripts or identifying analytics events may run.

Do not bypass rejection using fingerprinting, persistent identifiers, or server-side marketing tracking.

Provide cookie and privacy policy draft pages, clearly marked for legal review.

Make sure optional analytics tracking does not include entered email addresses or other form data. Apply masking or exclusion where appropriate for Clarity.

## 14.3 Event definitions

Use standard GA4 e-commerce event names where relevant.

Implement these events:

| Event | Trigger |
|---|---|
| `page_view` | Page view |
| `view_item_list` | Product list viewed |
| `select_item` | Product selected |
| `view_item` | Product detail page viewed |
| `add_to_cart` | Product added |
| `remove_from_cart` | Product removed |
| `view_cart` | Cart opened |
| `begin_checkout` | Checkout started |
| `checkout_step_view` | Checkout step displayed |
| `delivery_country_selected` | Delivery country selected |
| `checkout_review` | Final total reviewed |
| `purchase_intent` | User explicitly confirms purchase intent |
| `waitlist_signup` | Successful waitlist signup |

Do **not** fire the `purchase` event.

No real commercial transaction occurs.

Use stable item identifiers and include useful e-commerce fields such as:

- Item ID.
- Item name.
- Quantity.
- Unit price.
- Cart value.
- Currency EUR.

For custom funnel events, use a consistent event schema.

## 14.4 Additional measurement

Measure:

- Time spent on page.
- Scroll depth.
- Product section engagement.
- Product-detail interaction.
- Cart-to-checkout progression.
- Checkout step abandonment.
- Final purchase-intent conversion.

Where possible use built-in GA4 or Clarity capabilities instead of creating redundant tracking systems.

Do not record sensitive information.

## 14.5 Event quality

Avoid double-counting.

Examples:

- A rendered component must not repeatedly fire the same product-impression event during ordinary rerenders.
- A double-click must not produce duplicate purchase-intent confirmations.
- Refreshing the confirmation page must not create additional confirmations.
- Checkout progress events should be tied to actual navigation.

Use a generated event ID or equivalent idempotency mechanism for important events.

Where analytics tools and the database both receive an event, send the same logical event information through the shared tracking layer.

---

# 15. Advertising attribution

The website must support Meta advertising campaigns.

Example URL:

`/?utm_source=facebook&utm_medium=paid&utm_campaign=phone_detox&utm_content=video_a`

Recognize standard UTM parameters:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Where consent permits, associate the initial campaign information with later funnel events.

Support Meta click attribution where appropriate and consented.

Do not store unnecessary click identifiers without appropriate consent.

## 15.1 Campaign-specific landing messages

Support simple campaign variations through configuration.

Possible variants:

- `general`
- `phone_detox`
- `snack_control`
- `study_focus`
- `gaming_breaks`
- `alcohol_moderation`

The variation may change:

- Hero headline.
- Supporting copy.
- Highlighted use case.
- Hero CTA text.

The product catalogue and checkout remain unchanged.

Do not build six completely separate websites.

All variants must be editable through a simple configuration object.

---

# 16. Admin dashboard

Implement a functional protected admin dashboard at:

`/admin`

Use Supabase Auth or another secure, straightforward server-side authentication mechanism.

There is no need for public user registration.

Administrator access must be restricted to explicitly configured administrator accounts.

Do not rely on a password stored in client-side code.

Do not expose service-role credentials to the browser.

## 16.1 Dashboard overview

Display:

- Tracked sessions.
- Product-list views.
- Product detail views.
- Add-to-cart events.
- Checkout starts.
- Final price reviews.
- Purchase-intent confirmations.
- Waitlist signups.

Use actual stored data only.

Do not populate the production dashboard with fabricated metrics.

## 16.2 Funnel visualisation

Display an interactive conversion funnel:

**Visit → Product view → Cart → Checkout → Final price → Purchase intent**

Show:

- Event counts.
- Unique consenting sessions reaching each stage.
- Step-to-step conversion.
- Overall session-to-intent conversion.
- Drop-off percentages.

Clearly distinguish raw event counts from distinct-session counts.

Account for the fact that analytics consent may limit the measurable visitor population.

## 16.3 Product performance

Show separate performance for:

- Timer Padlock.
- S Box.
- M Box.
- L Box.

Metrics:

- Product views.
- Add-to-cart counts.
- Checkout occurrences.
- Purchase-intent confirmations.
- Conversion rates.

## 16.4 Traffic breakdown

Allow filtering by:

- Date range.
- Country.
- Product.
- Campaign.
- UTM source.
- Device category, if reliably available.

## 16.5 Experiment economics

Add a configurable experiment advertising budget input.

Default value:

**€100**

Based on measured data, calculate:

- Advertising spend entered by admin.
- Cost per landing-page visit, where visit data is available.
- Cost per add-to-cart.
- Cost per checkout start.
- Cost per purchase-intent confirmation.
- Cost per waitlist signup.

Clearly label manually entered spend.

Do not suggest the dashboard is automatically connected to Meta Ads spend unless such an API integration is actually implemented.

## 16.6 Data export

Allow administrator CSV export of:

- Analytics events.
- Aggregated funnel data.
- Waitlist signups.

Ensure sensitive waitlist data is accessible only to authorised administrators.

---

# 17. Database architecture

Use Supabase PostgreSQL.

Implement migrations for relevant tables.

Minimum tables:

### `analytics_events`

Fields:

- `id`
- `event_id`
- `created_at`
- `session_id`
- `event_name`
- `product_id`
- `cart_value_cents`
- `country`
- `campaign`
- `utm_source`
- `utm_medium`
- `utm_content`
- `event_data`

Only record optional behavioural analytics under the relevant consent.

Do not send identifiable personal information to external analytics services.

Do not collect raw IP addresses as analytical data.

### `waitlist_signups`

Fields:

- `id`
- `created_at`
- `email`
- `country`
- `preferred_product`
- `marketing_consent`
- `consent_timestamp`

Use suitable uniqueness constraints and timestamps.

Enforce Row Level Security.

Use server-side API routes for validation and controlled database writes.

Never trust price or product details submitted by the client.

Recalculate monetary totals from the server-side product catalogue where persistence or verification is required.

Use safe, serverless-compatible abuse prevention for public write endpoints.

Provide a documented production rate-limiting mechanism; do not rely only on in-memory rate limits that reset across serverless instances.

---

# 18. Essential business logic

## 18.1 Pricing

Store prices as integer cents.

Example:

- Timer lock: `3900`.
- S bundle: `5900`.
- M bundle: `7900`.
- L bundle: `9900`.
- Estimated shipping: `1000`.

Display euro prices using appropriate currency formatting.

Ensure totals are calculated consistently.

## 18.2 Shipping

All 27 EU member states selectable.

Initial indicative fee:

**€10 per order**

Use one delivery charge per order, not per item.

The delivery fee and shipping availability are provisional.

Do not promise three-day delivery until logistics have been confirmed.

## 18.3 Inventory

Do not build a complex inventory management system yet.

Use product availability status:

`prelaunch`

No product should be displayed as physically in stock.

## 18.4 Checkout state

Maintain state when navigating between checkout steps.

Users should be able to go back and modify their cart.

If the cart is empty, checkout should redirect to the catalogue or show a clear empty-cart state.

Prevent invalid totals or malformed product data.

## 18.5 Security

Implement:

- Server-side input validation.
- Secure admin authentication.
- Appropriate database permissions.
- Rate limiting.
- Spam prevention.
- No exposed credentials.
- Protection against duplicate submissions.
- Safe rendering of user inputs.
- No unnecessary third-party scripts.

---

# 19. SEO and social sharing

Implement essential metadata:

- Page titles.
- Meta descriptions.
- Open Graph metadata.
- Social sharing image.
- Canonical URLs.
- Sitemap.
- Robots configuration.
- Product-page metadata.

The main page should have a descriptive title, for example:

**TimerLockBox.eu — A Box With More Willpower Than You**

Suggested meta description:

"Meet TimerLockBox.eu: one simple timer padlock, three lockable boxes, and a practical way to put distractions out of reach. Explore the pre-launch collection."

Use semantic HTML and accessible headings.

The website should not appear to be an active store with stock availability or completed transactions.

---

# 20. Performance and accessibility

Prioritise a fast, clean mobile experience.

Requirements:

- Responsive layout.
- Optimized images.
- Lazy loading below the fold.
- Minimal unnecessary JavaScript.
- Limited animation.
- Keyboard navigation.
- Visible focus states.
- Accessible dialogs.
- Accessible form labels.
- Sufficient colour contrast.
- Proper button states.
- Loading indicators.
- Clear validation errors.
- Respect reduced-motion preferences.

Aim for Lighthouse scores of at least 90 for Performance, Accessibility, and SEO under reasonable test conditions.

Do not sacrifice functionality or accessibility solely to achieve a numeric score.

---

# 21. Local development and demo mode

The application must be usable locally before external services are configured.

Create a local demo mode.

In demo mode:

- Products load normally.
- Product detail pages work.
- Cart works.
- Checkout simulation works.
- Purchase-intent confirmation works.
- Waitlist form can demonstrate validation without pretending to persist real signups.
- Admin can display explicitly labeled example data or an empty state.

Demo mode must be clearly distinguishable from production data.

In production:

- Do not silently fall back to fake analytics or pretend that data was saved.
- If Supabase is not configured, show a clear configuration error for features requiring persistence.
- Fail safely without exposing database credentials.
- The storefront should remain usable where possible.

Use environment variables to control external integrations and the demo state.

---

# 22. Testing

Write useful automated tests.

## Unit tests

Cover at least:

- Product catalogue consistency.
- Currency calculations.
- Cart subtotal.
- Shipping calculation.
- Bundle pricing.
- Quantity changes.
- Empty cart.
- Checkout validation.
- Event idempotency.
- Consent-based tracking decisions.

## End-to-end tests

Use Playwright.

Test:

1. User opens the homepage.
2. Products render.
3. User opens a product page.
4. User adds a product to cart.
5. User changes quantity.
6. User opens cart.
7. User starts checkout.
8. User selects an EU country.
9. User reviews the correct total.
10. User confirms purchase intent.
11. Confirmation page appears.
12. No payment information is requested.
13. User can optionally submit waitlist details.
14. Translate popover works.
15. Mobile navigation works.

Also test:

- Cookie consent rejection.
- Cookie consent acceptance.
- Event tracking conditional on consent.
- Missing external-service credentials.
- Admin authentication protection.

Do not treat unexecuted tests as passed.

---

# 23. Development phases

Implement the application in this order.

## PHASE 1 — Project foundation and design system

- Initialize the project.
- Install required dependencies.
- Configure TypeScript and Tailwind.
- Create shared layout.
- Create design tokens.
- Build header and footer.
- Create product catalogue configuration.

Verify the project builds.

## PHASE 2 — Complete storefront

- Homepage.
- Hero.
- Product catalogue.
- Product detail pages.
- How it works.
- Use cases.
- Why TimerLockBox.eu.
- FAQ.
- Translate popover.
- Responsive layouts.

Verify the pages in browser.

## PHASE 3 — Functional shopping journey

- Persistent cart.
- Cart drawer.
- Quantity controls.
- Checkout steps.
- Shipping country selection.
- Price review.
- Purchase-intent confirmation.
- Waitlist UI.

Test the complete journey.

## PHASE 4 — Backend and analytics

- Supabase schema.
- Secure API routes.
- Waitlist persistence.
- Event collection.
- Consent management.
- GA4 integration.
- Meta Pixel integration.
- Clarity integration.
- UTM attribution.

Verify real events with local or test configuration.

## PHASE 5 — Administration

- Secure authentication.
- Dashboard.
- Funnel charts.
- Product performance.
- Campaign filtering.
- Experiment economics.
- CSV exports.

## PHASE 6 — Testing and deployment

- Automated tests.
- Responsive testing.
- Accessibility review.
- Performance improvements.
- SEO.
- Error handling.
- README.
- `.env.example`.
- Vercel deployment configuration.
- Supabase setup instructions.

Make commits after meaningful implementation milestones if Git is available.

**Continue through all phases autonomously. Do not stop after Phase 1 unless blocked by an essential external credential. In that case, implement the remaining functionality with clearly documented integration boundaries.**

---

# 24. Acceptance criteria

The application is considered functionally complete when all the following conditions are met:

- [ ] Homepage looks polished on desktop and mobile.
- [ ] Brand is consistently presented as TimerLockBox.eu.
- [ ] Four purchasable products are displayed.
- [ ] All boxes visibly use the same external timer padlock.
- [ ] Product details are accessible.
- [ ] Product prices are correct.
- [ ] Cart operations work.
- [ ] Cart contents persist across refreshes.
- [ ] Checkout has working step navigation.
- [ ] All EU countries are selectable.
- [ ] Delivery estimate is applied correctly.
- [ ] Final total is mathematically correct.
- [ ] The user can confirm purchase intent.
- [ ] No real payment is possible.
- [ ] Pre-launch status is disclosed before the final action.
- [ ] Waitlist form works when backend is configured.
- [ ] Event tracking is implemented and consent-aware.
- [ ] GA4 and Meta Pixel can be configured.
- [ ] Microsoft Clarity can be configured.
- [ ] UTM campaign information is supported.
- [ ] Admin dashboard is protected.
- [ ] Admin dashboard shows genuine stored data in production.
- [ ] English is the only native language.
- [ ] Translate button opens browser-translation instructions.
- [ ] All forms are validated.
- [ ] No fake reviews, orders, sales, or inventory claims appear.
- [ ] Privacy and cookie pages are available.
- [ ] Automated tests run.
- [ ] Production build succeeds.
- [ ] Application is ready for Vercel deployment once credentials are provided.

---

# 25. Future expansion

Design the architecture so these features can be added later without rewriting the application:

- Stripe or another European payment provider.
- Actual orders.
- Inventory management.
- Shipping integrations.
- Parcel lockers and pickup points.
- Discount codes.
- Order confirmation emails.
- Additional product variants.
- Standalone box sales.
- Replacement locks.
- Native multilingual support.
- AI-assisted translation.
- Customer reviews.
- Advanced conversion optimisation.

Do not implement these features now.

---

# 26. Final deliverables

When finished, provide:

1. The complete runnable application in the repository.
2. A concise description of the architecture.
3. Instructions for running locally.
4. Supabase setup and migration instructions.
5. Environment variables that must be configured.
6. Vercel deployment instructions.
7. Instructions for adding GA4, Meta Pixel and Clarity IDs.
8. Instructions for accessing the admin dashboard.
9. A summary of tests actually run and their results.
10. A list of remaining external dependencies or limitations.

Do not claim that deployment, integrations, analytics, or database persistence work until they have actually been verified.

## Final instruction

**Build this as a real, high-quality consumer e-commerce application, not a conceptual demo.**

Its immediate purpose is to validate demand through a €100 Meta advertising experiment, so the priorities are:

1. Excellent visual presentation.
2. Excellent mobile experience.
3. Fast and intuitive shopping journey.
4. Reliable purchase-intent measurement.
5. Clear, ethical pre-launch disclosure.
6. Accurate and privacy-conscious analytics.
7. Minimal technical and maintenance complexity.

Make the website look credible enough that a visitor would seriously consider buying the products at €39–99, while being transparent that purchases are not currently available.

Proceed with implementation now.
