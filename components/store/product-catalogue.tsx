"use client";

import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { useEffect, useRef } from "react";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductVisual } from "@/components/product-visual";
import { TrackedProductLink } from "@/components/store/tracked-product-link";
import { PRODUCTS, formatCurrency } from "@/lib/products";
import { trackEvent } from "@/lib/analytics";
import { getLocalizedProductCopy, localize, type Locale } from "@/lib/i18n";

export function ProductCatalogue({ locale = "en" }: { locale?: Locale }) {
  const de = locale === "de";
  const fr = locale === "fr";
  const nordicHeading = { sv: <>Välj din nivå<br />av självkontroll.</>, no: <>Velg nivået ditt<br />av selvkontroll.</>, da: <>Vælg dit niveau<br />af selvkontrol.</>, fi: <>Valitse itsehillintäsi<br />taso.</>, nl: <>Kies je niveau<br />van zelfbeheersing.</>, it: <>Scegli il tuo livello<br />di autocontrollo.</>, es: <>Elige tu nivel<br />de autocontrol.</>, pl: <>Wybierz poziom<br />samokontroli.</>, cs: <>Vyberte si úroveň<br />sebekontroly.</> }[locale as "sv" | "no" | "da" | "fi" | "nl" | "it" | "es" | "pl" | "cs"];
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        void trackEvent("view_item_list", { item_list_id: "homepage", items: PRODUCTS.map((product) => ({ item_id: product.id, item_name: product.catalogueName, price: product.priceCents / 100, quantity: 1 })) }, { idempotencyKey: "list:homepage" });
        observer.disconnect();
      }
    }, { threshold: .25 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section catalogue-section" id="shop" ref={sectionRef}>
      <div className="container">
        <div className="section-heading catalogue-heading">
          <div><p className="eyebrow">{localize(locale, "The pausio collection", "Die pausio-Kollektion", "La collection pausio")}</p><h2 className="h2">{de ? <>Wähle deine Portion<br />Selbstkontrolle.</> : fr ? <>Choisissez votre niveau<br />de maîtrise.</> : nordicHeading || <>Choose your level<br />of self-control.</>}</h2></div>
          <p className="lede">{localize(locale, "One timer padlock. Three box sizes. Zero negotiations with future-you.", "Ein Zeitschloss. Drei Boxgrößen. Keine Verhandlungen mit deinem späteren Ich.", "Un cadenas à minuterie. Trois tailles de boîte. Zéro négociation avec votre futur vous.")}</p>
        </div>
        <div className="product-grid">
          {PRODUCTS.map((product, index) => {
            const copy = getLocalizedProductCopy(locale, product.id) ?? product;
            return (
            <article className="product-card" key={product.id}>
              <TrackedProductLink product={product} locale={locale} className="product-image-link"><ProductVisual size={product.size} /></TrackedProductLink>
              <div className="product-card-copy">
                <div className="product-card-topline"><span>0{index + 1}</span>{product.bundle && <span className="bundle-label"><LockKeyhole size={13} /> {localize(locale, "Box + timer lock", "Box + Zeitschloss", "Boîte + cadenas")}</span>}</div>
                <div><h3><TrackedProductLink product={product} locale={locale}>{copy.catalogueName}</TrackedProductLink></h3><p>{copy.shortDescription}</p></div>
                <div className="product-card-actions"><strong>{formatCurrency(product.priceCents, locale)}</strong><TrackedProductLink product={product} locale={locale} className="details-link">{localize(locale, "Details", "Details", "Détails")} <ArrowUpRight size={15} /></TrackedProductLink><AddToCartButton productId={product.id} label={localize(locale, "Add to cart", "In den Warenkorb", "Ajouter au panier")} /></div>
              </div>
            </article>
          );})}
        </div>
      </div>
    </section>
  );
}
