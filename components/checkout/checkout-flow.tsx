"use client";

import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DeliveryDetailsStep } from "@/components/checkout/delivery-details-step";
import { EditCartButton } from "@/components/checkout/edit-cart-button";
import { WaitlistForm } from "@/components/launch/waitlist-form";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { cartItems, trackEvent } from "@/lib/analytics";
import { checkoutCountrySchema, type CheckoutDeliveryDetails } from "@/lib/checkout";
import { getCheckoutDetailsCopy } from "@/lib/checkout-details-copy";
import { DELIVERY_COUNTRIES, formatCurrency, getProduct, SHIPPING_CENTS, cartTotal, type DeliveryCountry } from "@/lib/products";
import { getLocalizedCountry, getLocalizedProductCopy, localize, type Locale } from "@/lib/i18n";

const CHECKOUT_KEY = "lockbox-checkout-v1";

function readCheckoutCountry(): DeliveryCountry | "" {
  if (typeof window === "undefined") return "";
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(CHECKOUT_KEY) || "{}") as { country?: string };
    return DELIVERY_COUNTRIES.includes(stored.country as DeliveryCountry) ? (stored.country as DeliveryCountry) : "";
  } catch { return ""; }
}

export function CheckoutFlow({ locale = "en" }: { locale?: Locale }) {
  const de = locale === "de";
  const fr = locale === "fr";
  const home = locale === "en" ? "" : `/${locale}`;
  const detailsCopy = getCheckoutDetailsCopy(locale);
  const nordicHeading = { sv: <>Granska priset.<br />Inte dina livsval.</>, no: <>Sjekk prisen.<br />Ikke livsvalgene dine.</>, da: <>Tjek prisen.<br />Ikke dine livsvalg.</>, fi: <>Tarkista hinta.<br />Älä elämänvalintojasi.</>, nl: <>Bekijk de prijs.<br />Niet je levenskeuzes.</>, it: <>Controlla il prezzo.<br />Non le tue scelte di vita.</>, es: <>Revisa el precio.<br />No tus decisiones vitales.</>, pl: <>Sprawdź cenę.<br />Nie swoje życiowe wybory.</>, cs: <>Zkontrolujte cenu.<br />Ne svá životní rozhodnutí.</> }[locale as "sv" | "no" | "da" | "fi" | "nl" | "it" | "es" | "pl" | "cs"];
  const deliveryTo = { nl: "Levering naar pakketautomaat in", it: "Consegna al locker in", es: "Entrega a taquilla de paquetería en", pl: "Dostawa do automatu paczkowego w", cs: "Doručení do výdejního boxu v" }[locale as "nl" | "it" | "es" | "pl" | "cs"];
  const deliveryEstimate = { nl: `Binnen 3–4 dagen naar je gekozen lokale pakketautomaat · ${formatCurrency(SHIPPING_CENTS, locale)} per bestelling`, it: `In 3–4 giorni al locker locale scelto · ${formatCurrency(SHIPPING_CENTS, locale)} per ordine`, es: `En 3–4 días a la taquilla de paquetería local que elijas · ${formatCurrency(SHIPPING_CENTS, locale)} por pedido`, pl: `W 3–4 dni do wybranego lokalnego automatu paczkowego · ${formatCurrency(SHIPPING_CENTS, locale)} za zamówienie`, cs: `Za 3–4 dny do zvoleného místního výdejního boxu · ${formatCurrency(SHIPPING_CENTS, locale)} za objednávku` }[locale as "nl" | "it" | "es" | "pl" | "cs"];
  const { lines, subtotal, hydrated } = useCart();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<DeliveryCountry | "">("");
  const [countryError, setCountryError] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState<CheckoutDeliveryDetails>();
  const total = useMemo(() => cartTotal(lines), [lines]);
  const preferredProduct = useMemo(() => [...lines].sort((a, b) => b.quantity - a.quantity)[0]?.productId || "", [lines]);

  useEffect(() => { queueMicrotask(() => setCountry(readCheckoutCountry())); }, []);

  useEffect(() => {
    if (!hydrated || lines.length === 0) return;
    const eventName = step === 1 ? "begin_checkout" : "checkout_step_view";
    void trackEvent(eventName, { checkout_step: step, cart_value_cents: subtotal, items: cartItems(lines) }, { idempotencyKey: `${eventName}:${step}:${lines.map((line) => `${line.productId}-${line.quantity}`).join(",")}` });
    if (step === 4) void trackEvent("checkout_review", { country, cart_value_cents: total, items: cartItems(lines) }, { idempotencyKey: `review:${country}:${total}` });
  }, [step, hydrated, lines, subtotal, total, country]);

  const selectCountry = (value: string) => {
    const result = checkoutCountrySchema.safeParse({ country: value });
    if (!result.success) { setCountryError(localize(locale, result.error.issues[0]?.message || "Choose a country.", "Wähle ein Lieferland.", "Choisissez un pays de livraison.")); return; }
    setCountry(result.data.country);
    setCountryError("");
    window.sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify({ country: result.data.country }));
    void trackEvent("delivery_country_selected", { country: result.data.country, checkout_step: 2 }, { idempotencyKey: `country:${result.data.country}` });
  };

  const continueToDetails = () => {
    const result = checkoutCountrySchema.safeParse({ country });
    if (!result.success) { setCountryError(localize(locale, result.error.issues[0]?.message || "Choose a country.", "Wähle ein Lieferland.", "Choisissez un pays de livraison.")); return; }
    setStep(3);
  };

  if (!hydrated) return <div className="checkout-loading">{localize(locale, "Preparing your cart…", "Warenkorb wird vorbereitet…", "Préparation de votre panier…")}</div>;
  if (lines.length === 0) return <div className="empty-checkout card"><ShoppingBag size={38} /><h1>{localize(locale, "There's nothing to review yet.", "Hier gibt es noch nichts zu prüfen.", "Il n’y a encore rien à vérifier.")}</h1><p>{localize(locale, "Add a Pausio.eu product to your cart before starting checkout.", "Lege zuerst ein Pausio.eu-Produkt in den Warenkorb.", "Ajoutez un produit Pausio.eu à votre panier avant de commencer.")}</p><Button asChild><Link href={`${home}/#shop`}>{localize(locale, "Explore the collection", "Kollektion entdecken", "Découvrir la collection")}</Link></Button></div>;

  return (
    <div className="checkout-shell">
      <div className="checkout-head"><div><p className="eyebrow">Checkout</p><h1>{de ? <>Preis prüfen.<br />Nicht deine Entscheidungen.</> : fr ? <>Vérifiez le prix.<br />Pas vos choix de vie.</> : nordicHeading || <>Review the price.<br />Not your life choices.</>}</h1></div><p>{localize(locale, "Review your cart, choose delivery details, and check availability.", "Prüfe deinen Warenkorb, ergänze die Lieferdetails und sieh dir die Verfügbarkeit an.", "Vérifiez votre panier, complétez les détails de livraison et consultez la disponibilité.")}</p></div>
      <ol className="checkout-progress" aria-label={localize(locale, "Checkout progress", "Checkout-Fortschritt", "Progression du paiement")}>{[localize(locale, "Review cart", "Warenkorb", "Panier"), localize(locale, "Delivery country", "Lieferland", "Pays de livraison"), detailsCopy.progress, localize(locale, "Availability", "Verfügbarkeit", "Disponibilité")].map((label, index) => { const number = index + 1; return <li className={step === number ? "is-current" : step > number ? "is-complete" : ""} key={label} aria-current={step === number ? "step" : undefined}><span>{step > number ? <Check size={14} /> : number}</span><p>{label}</p></li>; })}</ol>

      <div className="checkout-card card">
        {step === 1 && <section aria-labelledby="review-title"><div className="checkout-section-head"><div><span>{localize(locale, "STEP 01", "SCHRITT 01", "ÉTAPE 01")}</span><h2 id="review-title">{localize(locale, "Review cart", "Warenkorb prüfen", "Vérifier le panier")}</h2></div><EditCartButton label={localize(locale, "Edit cart", "Warenkorb bearbeiten", "Modifier le panier")} /></div><div className="checkout-lines">{lines.map((line) => {
          const product = getProduct(line.productId);
          if (!product) return null;
          const copy = getLocalizedProductCopy(locale, product.id) ?? product;
          const boxDetails = product.bundle
            ? `${copy.catalogueName} · ${localize(locale, "Suitable for", "Geeignet für", "Idéal pour")} ${copy.intendedUses.join(", ")}`
            : copy.shortDescription;
          const included = product.bundle
            ? `${localize(locale, "Complete set", "Komplettset", "Ensemble complet")}: ${copy.included.join(" + ")} · ${localize(locale, "Final dimensions to be confirmed", "Endgültige Maße werden noch bestätigt", "Dimensions finales à confirmer")}`
            : copy.included.join(" + ");
          return <div key={line.productId}><div className="checkout-line-product"><strong>{line.quantity} × {copy.name}</strong><span>{boxDetails}</span><small>{included}</small></div><span>{formatCurrency(product.priceCents, locale)} {localize(locale, "each", "pro Stück", "l’unité")}</span><strong>{formatCurrency(product.priceCents * line.quantity, locale)}</strong></div>;
        })}</div><div className="checkout-subtotal"><span>{localize(locale, "Products subtotal", "Zwischensumme Produkte", "Sous-total des produits")}</span><strong>{formatCurrency(subtotal, locale)}</strong></div><div className="checkout-nav checkout-nav--end"><Button size="lg" onClick={() => setStep(2)}>{localize(locale, "Continue", "Weiter", "Continuer")} <ArrowRight size={17} /></Button></div></section>}

        {step === 2 && <section aria-labelledby="country-title"><div className="checkout-section-head"><div><span>{localize(locale, "STEP 02", "SCHRITT 02", "ÉTAPE 02")}</span><h2 id="country-title">{localize(locale, "Where would it go?", "Wohin soll es gehen?", "Où faut-il livrer ?")}</h2></div></div><p className="checkout-explainer">{localize(locale, "We deliver to your chosen local parcel locker across the EU, UK, Switzerland, and Norway. Choose the country now; you’ll add your phone number and delivery address in the next step.", "Wir liefern in der EU, in Großbritannien, der Schweiz und Norwegen zum lokalen Paketautomaten deiner Wahl. Wähle jetzt das Land; Telefonnummer und Lieferadresse ergänzt du im nächsten Schritt.", "Nous livrons à la consigne à colis locale de votre choix dans l’UE, au Royaume-Uni, en Suisse et en Norvège. Choisissez maintenant le pays ; vous indiquerez votre téléphone et votre adresse de livraison à l’étape suivante.")}</p><div className="field"><label htmlFor="country">{localize(locale, "Delivery country", "Lieferland", "Pays de livraison")}</label><select className="input" id="country" value={country} onChange={(event) => selectCountry(event.target.value)} aria-invalid={Boolean(countryError)}><option value="">{localize(locale, "Choose a country", "Land wählen", "Choisir un pays")}</option>{DELIVERY_COUNTRIES.map((name) => <option value={name} key={name}>{getLocalizedCountry(locale, name)}</option>)}</select>{countryError && <p className="field-error" role="alert">{countryError}</p>}</div>{country && <div className="delivery-estimate"><LockKeyhole size={20} /><div><strong>{getLocalizedCountry(locale, country)}</strong><span>{deliveryEstimate || localize(locale, `3–4 days to your chosen local parcel locker · ${formatCurrency(SHIPPING_CENTS)} per order`, `In 3–4 Tagen zum Paketautomaten deiner Wahl · ${formatCurrency(SHIPPING_CENTS, locale)} pro Bestellung`, `Sous 3–4 jours vers la consigne à colis locale de votre choix · ${formatCurrency(SHIPPING_CENTS, locale)} par commande`)}</span></div></div>}<p className="fine-print">{localize(locale, "Your parcel-locker delivery fee is included in the order summary.", "Die Kosten für die Lieferung zum Paketautomaten sind in der Bestellübersicht enthalten.", "Les frais de livraison en consigne à colis sont inclus dans le récapitulatif.")}</p><div className="checkout-nav"><Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft size={17} /> {localize(locale, "Back", "Zurück", "Retour")}</Button><Button size="lg" onClick={continueToDetails}>{localize(locale, "Continue", "Weiter", "Continuer")} <ArrowRight size={17} /></Button></div></section>}

        {step === 3 && <DeliveryDetailsStep locale={locale} initialValue={deliveryDetails} onBack={() => setStep(2)} onContinue={(details) => { setDeliveryDetails(details); setStep(4); }} />}

        {step === 4 && <section aria-labelledby="total-title"><div className="checkout-section-head"><div><span>{localize(locale, "STEP 04", "SCHRITT 04", "ÉTAPE 04")}</span><h2 id="total-title">{localize(locale, "Order summary", "Bestellübersicht", "Récapitulatif")}</h2></div></div><div className="final-summary"><div><span>{localize(locale, "Products", "Produkte", "Produits")}</span><strong>{formatCurrency(subtotal, locale)}</strong></div><div><span>{locale === "sv" ? `Leverans till paketbox i ${getLocalizedCountry(locale, country)}` : locale === "no" ? `Levering til pakkeboks i ${getLocalizedCountry(locale, country)}` : locale === "da" ? `Levering til pakkeboks i ${getLocalizedCountry(locale, country)}` : locale === "fi" ? `Toimitus pakettiautomaattiin: ${getLocalizedCountry(locale, country)}` : deliveryTo ? `${deliveryTo} ${getLocalizedCountry(locale, country)}` : localize(locale, `Parcel-locker delivery to ${getLocalizedCountry(locale, country)}`, `Lieferung zum Paketautomaten in ${getLocalizedCountry(locale, country)}`, `Livraison en consigne à colis en ${getLocalizedCountry(locale, country)}`)}</span><strong>{formatCurrency(SHIPPING_CENTS, locale)}</strong></div><div className="final-total"><span>{localize(locale, "Estimated total", "Gesamtsumme", "Total estimé")}</span><strong>{formatCurrency(total, locale)}</strong></div></div>{deliveryDetails && <dl className="submitted-delivery-details"><div><dt>{detailsCopy.phone}</dt><dd>{deliveryDetails.phone}</dd></div><div><dt>{detailsCopy.address}</dt><dd>{deliveryDetails.deliveryAddress}</dd></div><div><dt>{detailsCopy.payment}</dt><dd>{detailsCopy.methods[deliveryDetails.paymentMethod]}</dd></div></dl>}<div className="stock-notice"><strong>{localize(locale, "We're sorry — Pausio.eu is currently out of stock.", "Es tut uns leid – Pausio.eu ist derzeit ausverkauft.", "Désolé, Pausio.eu est actuellement en rupture de stock.")}</strong><p>{localize(locale, "Leave your email and we'll let you know when it is available again, or check back in a week.", "Hinterlasse deine E-Mail-Adresse und wir melden uns, sobald das Produkt wieder verfügbar ist – oder schau in einer Woche noch einmal vorbei.", "Laissez votre e-mail et nous vous préviendrons dès le retour en stock, ou revenez dans une semaine.")}</p></div><div className="checkout-stock-form"><WaitlistForm defaultCountry={country} preferredProduct={preferredProduct} locale={locale} /></div><div className="checkout-nav"><Button variant="ghost" onClick={() => setStep(3)}><ArrowLeft size={17} /> {localize(locale, "Back", "Zurück", "Retour")}</Button><Button asChild variant="secondary"><Link href={home || "/"}>{localize(locale, "Continue browsing", "Weiter stöbern", "Continuer à parcourir")}</Link></Button></div></section>}
      </div>
    </div>
  );
}
