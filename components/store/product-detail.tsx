import { ArrowLeft, Check, ShieldAlert, Truck } from "lucide-react";
import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import { ProductPurchase } from "@/components/store/product-purchase";
import { ProductViewTracker } from "@/components/store/product-view-tracker";
import { getLocalizedProductCopy, localize, type Locale } from "@/lib/i18n";
import { formatCurrency, type Product } from "@/lib/products";

export function ProductDetail({ product, locale = "en" }: { product: Product; locale?: Locale }) {
  const copy = getLocalizedProductCopy(locale, product.id) ?? product;
  const home = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="product-page container">
      <ProductViewTracker product={product} />
      <Link className="back-link" href={`${home}/#shop`}><ArrowLeft size={16} /> {localize(locale, "Back to the collection", "Zurück zur Kollektion", "Retour à la collection")}</Link>
      <div className="product-detail-grid">
        <div className="product-gallery"><ProductVisual size={product.size} /><div className="concept-caption"><span>{localize(locale, "How it locks", "So wird sie verschlossen", "Comment elle se verrouille")}</span><p>{localize(locale, "The external timer padlock passes through the box's aligned locking loops to keep both zipper pulls together.", "Das externe Zeitschloss wird durch die beiden ausgerichteten Verschlussösen geführt und hält beide Reißverschlüsse zusammen.", "Le cadenas à minuterie passe dans les deux boucles alignées afin de maintenir les tirettes ensemble.")}</p></div></div>
        <div className="product-detail-copy"><p className="product-kicker">Pausio.eu / {product.id.toUpperCase()}</p><h1 className="h1">{copy.name}</h1><p className="product-price">{formatCurrency(product.priceCents, locale)}</p><p className="lede">{copy.description}</p>{product.bundle ? <p className="included-callout"><Check size={18} /> {localize(locale, "Includes one electronic timer padlock.", "Ein elektronisches Zeitschloss ist enthalten.", "Comprend un cadenas électronique à minuterie.")}</p> : <p className="included-callout"><Check size={18} /> {localize(locale, "Designed for suitable externally lockable containers, subject to physical compatibility.", "Für geeignete extern abschließbare Behälter – physische Kompatibilität vorausgesetzt.", "Conçu pour les contenants externes verrouillables compatibles.")}</p>}<div className="product-shipping"><Truck size={22} /><div><strong>{localize(locale, "EU, UK, Switzerland & Norway", "EU, UK, Schweiz & Norwegen", "UE, Royaume-Uni, Suisse et Norvège")}</strong><span>{localize(locale, "3–4 days to your chosen local parcel locker · €10 per order", "In 3–4 Tagen zum Paketautomaten deiner Wahl · 10 € pro Bestellung", "Sous 3–4 jours vers la consigne à colis locale de votre choix · 10 € par commande")}</span></div></div><ProductPurchase productId={product.id} locale={locale} /></div>
      </div>
      <div className="product-info-grid"><article><h2>{localize(locale, "Good for", "Geeignet für", "Idéal pour")}</h2><ul>{copy.intendedUses.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article><article><h2>{localize(locale, "What's included", "Im Lieferumfang", "Contenu")}</h2><ul>{copy.included.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article><article className="product-safety"><ShieldAlert size={22} /><div><h2>{localize(locale, "A sensible warning", "Ein sinnvoller Hinweis", "Un avertissement utile")}</h2><p>{localize(locale, "Do not use Pausio.eu for medication, emergency equipment, essential keys, or your only emergency phone. It is not a security safe.", "Pausio.eu nicht für Medikamente, Notfallausrüstung, wichtige Schlüssel oder dein einziges Notfalltelefon verwenden. Die Box ist kein Tresor.", "N’utilisez pas Pausio.eu pour des médicaments, du matériel d’urgence, des clés essentielles ou votre seul téléphone. Ce n’est pas un coffre-fort.")}</p></div></article></div>
    </div>
  );
}
