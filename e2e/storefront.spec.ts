import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("complete shopping journey reaches the out-of-stock notification", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await expect(page.getByRole("heading", { name: "Lock distractions away. Get your time back." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose your level of self-control." })).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(4);

  const timerLink = page.locator(".product-card").filter({ hasText: "Timer Padlock" }).getByRole("link", { name: "Timer Padlock" });
  await expect(timerLink).toHaveAttribute("href", "/products/timer-lock");
  await timerLink.click();
  await expect(page).toHaveURL(/\/products\/timer-lock$/);
  await expect(page.getByRole("heading", { name: "Electronic Timer Padlock" })).toBeVisible();
  await expect(page.getByText("3–4 days to your chosen local parcel locker · €10 per order", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("dialog", { name: "Your Pausio.eu cart" })).toBeVisible();
  await expect(page.getByText("Parcel-locker delivery · 3–4 days", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(page.getByRole("dialog", { name: "Your Pausio.eu cart" }).locator(".cart-line").getByText("€78", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Continue to checkout" }).click();

  await expect(page.getByRole("heading", { name: "Review cart" })).toBeVisible();
  await page.getByRole("button", { name: /Continue/ }).click();
  await expect(page.locator(".checkout-explainer")).toContainText("chosen local parcel locker");
  await page.getByLabel("Delivery country").selectOption("Estonia");
  await expect(page.getByText("3–4 days to your chosen local parcel locker · €10 per order", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Complete delivery details" })).toBeVisible();
  await page.getByRole("button", { name: "Continue to availability" }).click();
  await expect(page.getByText("Enter a valid phone number.")).toBeVisible();
  await expect(page.getByText("Enter a complete delivery address.")).toBeVisible();
  await expect(page.getByText("Choose a payment method.")).toBeVisible();
  await page.getByLabel("Phone number").fill("+372 5555 1234");
  await page.getByLabel("Delivery address").fill("Viru väljak 4, 10111 Tallinn, Estonia");
  await page.getByLabel("Card").check();
  await page.getByRole("button", { name: "Continue to availability" }).click();
  await expect(page.getByText("Parcel-locker delivery to Estonia", { exact: true })).toBeVisible();
  await expect(page.getByText("Viru väljak 4, 10111 Tallinn, Estonia", { exact: true })).toBeVisible();
  await expect(page.getByText("Card", { exact: true })).toBeVisible();
  await expect(page.getByText("€88", { exact: true })).toBeVisible();
  await expect(page.getByText(/currently out of stock/)).toBeVisible();
  await expect(page.getByText(/check back in a week/)).toBeVisible();
  await expect(page.locator('input[type="password"], input[name*="card" i]')).toHaveCount(0);
  await page.getByLabel("Email address").fill("tester@example.com");
  await page.getByText("I agree to receive one email when Pausio.eu is back in stock.").click();
  await page.getByRole("button", { name: "Email me when it’s back" }).click();
  await expect(page.getByRole("heading", { name: "Thanks — we'll keep you posted." })).toBeVisible();
});

test("small-box checkout clearly identifies the complete box and timer-lock set", async ({ page }) => {
  await page.goto("/products/box-s");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Continue to checkout" }).click();

  await expect(page.getByText("1 × Small box + Timer Padlock", { exact: true })).toBeVisible();
  await expect(page.getByText(/Small box · Suitable for Smartphone, Gaming controller, Candy, Small personal items/)).toBeVisible();
  await expect(page.getByText(/Complete set: 1 × Small box \+ One electronic timer padlock · Final dimensions to be confirmed/)).toBeVisible();
});

test("language selector switches between English, German, and French", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await page.getByRole("button", { name: /EN|Choose language/ }).click();
  await page.getByRole("menuitem", { name: /Deutsch/ }).click();
  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { name: "Ablenkungen weg. Zeit zurück." })).toBeVisible();
  await page.getByRole("button", { name: /DE|Sprache wählen/ }).click();
  await page.getByRole("menuitem", { name: /Français/ }).click();
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { name: "Éloignez les distractions. Reprenez votre temps." })).toBeVisible();
  await page.getByRole("button", { name: /FR|Choisir la langue/ }).click();
  await page.getByRole("menuitem", { name: /English/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("German-speaking visitors are shown the German storefront", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ locale: "de-DE" });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page).toHaveURL(/\/de$/);
  await page.getByRole("button", { name: "Optionale ablehnen" }).click();
  await expect(page.getByRole("heading", { name: "Ablenkungen weg. Zeit zurück." })).toBeVisible();
  await context.close();
});

test("French-speaking visitors are shown the French storefront", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ locale: "fr-FR" });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.getByRole("button", { name: "Refuser les facultatifs" }).click();
  await expect(page.getByRole("heading", { name: "Éloignez les distractions. Reprenez votre temps." })).toBeVisible();
  await context.close();
});

test("Nordic storefronts and flags are available in the language selector", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "single desktop locale check");
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();

  const locales = [
    { option: "Svenska", route: "/sv", lang: "sv", heading: "Lås bort distraktionerna. Ta tillbaka din tid." },
    { option: "Norsk", route: "/no", lang: "no", heading: "Lås bort distraksjonene. Ta tiden tilbake." },
    { option: "Dansk", route: "/da", lang: "da", heading: "Lås distraktionerne væk. Tag tiden tilbage." },
    { option: "Suomi", route: "/fi", lang: "fi", heading: "Lukitse häiriöt pois. Ota aikasi takaisin." },
  ] as const;

  for (const locale of locales) {
    await page.locator(".language-trigger").first().click();
    const option = page.getByRole("menuitem", { name: new RegExp(locale.option) });
    await expect(option.locator(".language-flag")).toBeVisible();
    await option.click();
    await expect(page).toHaveURL(new RegExp(`${locale.route}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale.lang);
    await expect(page.locator("h1.display")).toHaveText(locale.heading);
  }
});

test("Nordic browser languages automatically open the matching storefront", async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "single desktop locale check");
  const cases = [
    ["sv-SE", "/sv", "sv"],
    ["nb-NO", "/no", "no"],
    ["da-DK", "/da", "da"],
    ["fi-FI", "/fi", "fi"],
  ] as const;

  for (const [browserLocale, route, htmlLang] of cases) {
    const context = await browser.newContext({ locale: browserLocale });
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", htmlLang);
    await context.close();
  }
});

test("Dutch, Italian, Spanish, Polish, and Czech storefronts are available from the flag menu", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "single desktop locale check");
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();

  const locales = [
    { option: "Nederlands", route: "/nl", lang: "nl", heading: "Sluit afleidingen op. Pak je tijd terug." },
    { option: "Italiano", route: "/it", lang: "it", heading: "Chiudi le distrazioni. Riprenditi il tuo tempo." },
    { option: "Español", route: "/es", lang: "es", heading: "Encierra las distracciones. Recupera tu tiempo." },
    { option: "Polski", route: "/pl", lang: "pl", heading: "Zamknij rozpraszacze. Odzyskaj swój czas." },
    { option: "Čeština", route: "/cs", lang: "cs", heading: "Zamkněte rozptýlení. Vezměte si svůj čas zpět." },
  ] as const;

  for (const locale of locales) {
    await page.locator(".language-trigger").first().click();
    const option = page.getByRole("menuitem", { name: new RegExp(locale.option) });
    await option.scrollIntoViewIfNeeded();
    await expect(option.locator(".language-flag")).toBeVisible();
    await option.click();
    await expect(page).toHaveURL(new RegExp(`${locale.route}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale.lang);
    await expect(page.locator("h1.display")).toHaveText(locale.heading);
  }
});

test("Dutch, Italian, Spanish, Polish, and Czech browser settings select the matching storefront", async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "single desktop locale check");
  const cases = [["nl-NL", "/nl", "nl"], ["it-IT", "/it", "it"], ["es-ES", "/es", "es"], ["pl-PL", "/pl", "pl"], ["cs-CZ", "/cs", "cs"]] as const;

  for (const [browserLocale, route, htmlLang] of cases) {
    const context = await browser.newContext({ locale: browserLocale });
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await expect(page.locator("html")).toHaveAttribute("lang", htmlLang);
    await context.close();
  }
});

test("cookie choices gate optional tracking", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("lockbox-consent-v1") || "{}"))).toMatchObject({ analytics: false, marketing: false });
  await expect(page.locator("#lockbox-ga, #lockbox-meta, #lockbox-clarity")).toHaveCount(0);
  await page.getByRole("button", { name: /Cookie settings/ }).click();
  await page.getByRole("button", { name: "Accept all" }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("lockbox-consent-v1") || "{}"))).toMatchObject({ analytics: true, marketing: true });
});

test("admin does not expose fake data without credentials", async ({ page }) => {
  await page.goto("/admin");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await expect(page.getByRole("heading", { name: "Admin data is unavailable." })).toBeVisible();
  await expect(page.getByText("No example metrics are being presented as real data.")).toBeVisible();
});

test("mobile navigation opens and reaches sections", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "mobile-only check");
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: /How it works/ }).click();
  await expect(page.locator("#how-it-works")).toBeInViewport();
});

test("homepage has no serious automated accessibility violations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "single desktop accessibility scan");
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional" }).click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact || ""))).toEqual([]);
});
