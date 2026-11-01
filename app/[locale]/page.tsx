import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Homepage } from "@/components/store/homepage";
import { DYNAMIC_LOCALES, type DynamicLocale } from "@/lib/i18n";

const metadataCopy: Record<DynamicLocale, { title: string; description: string }> = {
  sv: { title: "Lås bort distraktionerna. Ta tillbaka din tid.", description: "Ett timerlås, tre låsbara boxar och ett enkelt sätt att hålla distraktioner utom räckhåll." },
  no: { title: "Lås bort distraksjonene. Ta tiden tilbake.", description: "Én timerlås, tre låsbare bokser og en enkel måte å holde distraksjoner utenfor rekkevidde." },
  da: { title: "Lås distraktionerne væk. Tag tiden tilbage.", description: "Én timerlås, tre aflåselige bokse og en enkel måde at holde distraktioner uden for rækkevidde." },
  fi: { title: "Lukitse häiriöt pois. Ota aikasi takaisin.", description: "Yksi ajastinlukko, kolme lukittavaa laatikkoa ja helppo tapa pitää häiriöt poissa ulottuvilta." },
  nl: { title: "Sluit afleidingen op. Pak je tijd terug.", description: "Eén timerslot, drie afsluitbare boxen en een eenvoudige manier om afleidingen buiten bereik te houden." },
  it: { title: "Chiudi le distrazioni. Riprenditi il tuo tempo.", description: "Un lucchetto a tempo, tre box richiudibili e un modo semplice per tenere le distrazioni fuori portata." },
  es: { title: "Encierra las distracciones. Recupera tu tiempo.", description: "Un candado con temporizador, tres cajas con cierre y una forma sencilla de mantener las distracciones fuera de alcance." },
  pl: { title: "Zamknij rozpraszacze. Odzyskaj swój czas.", description: "Jedna kłódka czasowa, trzy zamykane pudełka i prosty sposób, by odłożyć rozpraszacze poza zasięg." },
  cs: { title: "Zamkněte rozptýlení. Vezměte si svůj čas zpět.", description: "Jeden časový zámek, tři uzamykatelné boxy a jednoduchý způsob, jak udržet rozptýlení mimo dosah." },
};

export function generateStaticParams() {
  return DYNAMIC_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!DYNAMIC_LOCALES.includes(locale as DynamicLocale)) return {};
  const copy = metadataCopy[locale as DynamicLocale];
  return { title: copy.title, description: copy.description, alternates: { canonical: `/${locale}`, languages: { en: "/", de: "/de", fr: "/fr", sv: "/sv", no: "/no", da: "/da", fi: "/fi", nl: "/nl", it: "/it", es: "/es", pl: "/pl", cs: "/cs" } } };
}

export default async function NordicHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!DYNAMIC_LOCALES.includes(locale as DynamicLocale)) notFound();
  return <Homepage campaign="general" locale={locale as DynamicLocale} />;
}
