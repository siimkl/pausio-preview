export const SHIPPING_CENTS = 1_000;
export const CURRENCY = "EUR";

export type ProductId = "timer-lock" | "box-s" | "box-m" | "box-l";

export type Product = {
  id: ProductId;
  slug: ProductId;
  name: string;
  catalogueName: string;
  priceCents: number;
  size: "lock" | "s" | "m" | "l";
  shortDescription: string;
  description: string;
  intendedUses: string[];
  included: string[];
  bundle: boolean;
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "timer-lock",
    slug: "timer-lock",
    name: "Electronic Timer Padlock",
    catalogueName: "Timer Padlock",
    priceCents: 3_900,
    size: "lock",
    shortDescription: "Already have a box? Bring your own self-control.",
    description:
      "A standalone electronic timer padlock designed to add a deliberate pause between you and the things you keep reaching for.",
    intendedUses: ["Suitable lockable containers", "Travel cases", "Personal storage"],
    included: ["One electronic timer padlock", "Final charging accessories to be confirmed"],
    bundle: false,
  },
  {
    id: "box-s",
    slug: "box-s",
    name: "Small box + Timer Padlock",
    catalogueName: "Small box",
    priceCents: 5_900,
    size: "s",
    shortDescription: "Perfect for your phone and smaller temptations.",
    description:
      "A compact lockable box for the little distractions that somehow take up a lot of your day.",
    intendedUses: ["Smartphone", "Gaming controller", "Candy", "Small personal items"],
    included: ["1 × Small box", "One electronic timer padlock"],
    bundle: true,
  },
  {
    id: "box-m",
    slug: "box-m",
    name: "Medium box + Timer Padlock",
    catalogueName: "Medium box",
    priceCents: 7_900,
    size: "m",
    shortDescription: "More room for the things you said you’d avoid.",
    description:
      "The useful middle ground: enough space for shared devices, snacks, or the bottle that does not need another round.",
    intendedUses: ["Multiple smartphones", "Snacks", "Bottles", "Electronic accessories"],
    included: ["1 × Medium box", "One electronic timer padlock"],
    bundle: true,
  },
  {
    id: "box-l",
    slug: "box-l",
    name: "Large box + Timer Padlock",
    catalogueName: "Large box",
    priceCents: 9_900,
    size: "l",
    shortDescription: "When the whole household needs a time-out.",
    description:
      "Our roomiest box, made for larger objects, several devices, or a household-wide agreement with future-you.",
    intendedUses: ["Multiple devices", "Larger objects", "Family use", "Household-item storage"],
    included: ["1 × Large box", "One electronic timer padlock"],
    bundle: true,
  },
] as const;

export function isProductId(value: string): value is ProductId {
  return PRODUCTS.some((product) => product.id === value);
}

export function getProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatCurrency(cents: number, locale: "en" | "de" | "fr" | "sv" | "no" | "da" | "fi" | "nl" | "it" | "es" | "pl" | "cs" = "en") {
  const numberLocale = { en: "en-IE", de: "de-DE", fr: "fr-FR", sv: "sv-SE", no: "nb-NO", da: "da-DK", fi: "fi-FI", nl: "nl-NL", it: "it-IT", es: "es-ES", pl: "pl-PL", cs: "cs-CZ" }[locale];
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export type CartLine = { productId: ProductId; quantity: number };

export function cartSubtotal(lines: readonly CartLine[]) {
  return lines.reduce((total, line) => {
    const product = getProduct(line.productId);
    return total + (product?.priceCents ?? 0) * Math.max(0, Math.floor(line.quantity));
  }, 0);
}

export function cartTotal(lines: readonly CartLine[]) {
  const subtotal = cartSubtotal(lines);
  return subtotal > 0 ? subtotal + SHIPPING_CENTS : 0;
}

export const DELIVERY_COUNTRIES = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Norway",
  "Switzerland",
  "United Kingdom",
] as const;

export type DeliveryCountry = (typeof DELIVERY_COUNTRIES)[number];

export function isDeliveryCountry(value: string): value is DeliveryCountry {
  return DELIVERY_COUNTRIES.includes(value as DeliveryCountry);
}
