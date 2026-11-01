"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/i18n";

const englishLinks = [
  ["Shop", "/#shop"],
  ["How it works", "/#how-it-works"],
  ["Why a timer lockbox?", "/#why-lockbox"],
  ["FAQ", "/#faq"],
] as const;

const germanLinks = [
  ["Shop", "/de/#shop"],
  ["So funktioniert’s", "/de/#how-it-works"],
  ["Warum eine Timerbox?", "/de/#why-lockbox"],
  ["FAQ", "/de/#faq"],
] as const;

const frenchLinks = [
  ["Shop", "/fr/#shop"],
  ["Comment ça marche", "/fr/#how-it-works"],
  ["Pourquoi une boîte à minuterie ?", "/fr/#why-lockbox"],
  ["FAQ", "/fr/#faq"],
] as const;

const nordicLinks = {
  sv: [["Shop", "/sv/#shop"], ["Så fungerar det", "/sv/#how-it-works"], ["Varför en timerbox?", "/sv/#why-lockbox"], ["FAQ", "/sv/#faq"]],
  no: [["Shop", "/no/#shop"], ["Slik fungerer det", "/no/#how-it-works"], ["Hvorfor en timerboks?", "/no/#why-lockbox"], ["FAQ", "/no/#faq"]],
  da: [["Shop", "/da/#shop"], ["Sådan fungerer det", "/da/#how-it-works"], ["Hvorfor en timerboks?", "/da/#why-lockbox"], ["FAQ", "/da/#faq"]],
  fi: [["Kauppa", "/fi/#shop"], ["Näin se toimii", "/fi/#how-it-works"], ["Miksi ajastinlaatikko?", "/fi/#why-lockbox"], ["UKK", "/fi/#faq"]],
  nl: [["Shop", "/nl/#shop"], ["Zo werkt het", "/nl/#how-it-works"], ["Waarom een timerbox?", "/nl/#why-lockbox"], ["FAQ", "/nl/#faq"]],
  it: [["Shop", "/it/#shop"], ["Come funziona", "/it/#how-it-works"], ["Perché una box con timer?", "/it/#why-lockbox"], ["FAQ", "/it/#faq"]],
  es: [["Tienda", "/es/#shop"], ["Cómo funciona", "/es/#how-it-works"], ["¿Por qué una caja con temporizador?", "/es/#why-lockbox"], ["FAQ", "/es/#faq"]],
  pl: [["Sklep", "/pl/#shop"], ["Jak to działa", "/pl/#how-it-works"], ["Dlaczego pudełko z timerem?", "/pl/#why-lockbox"], ["FAQ", "/pl/#faq"]],
  cs: [["Obchod", "/cs/#shop"], ["Jak to funguje", "/cs/#how-it-works"], ["Proč box s časovým zámkem?", "/cs/#why-lockbox"], ["FAQ", "/cs/#faq"]],
} as const;

export function MobileMenu({ locale = "en" }: { locale?: Locale }) {
  const links = locale === "de" ? germanLinks : locale === "fr" ? frenchLinks : locale in nordicLinks ? nordicLinks[locale as keyof typeof nordicLinks] : englishLinks;
  const labels = {
    en: ["Open navigation", "Close navigation", "Mobile navigation"], de: ["Navigation öffnen", "Navigation schließen", "Mobile Navigation"], fr: ["Ouvrir la navigation", "Fermer la navigation", "Navigation mobile"],
    sv: ["Öppna navigation", "Stäng navigation", "Mobil navigation"], no: ["Åpne navigasjon", "Lukk navigasjon", "Mobilnavigasjon"], da: ["Åbn navigation", "Luk navigation", "Mobil navigation"], fi: ["Avaa navigaatio", "Sulje navigaatio", "Mobiilinavigaatio"],
    nl: ["Navigatie openen", "Navigatie sluiten", "Mobiele navigatie"], it: ["Apri navigazione", "Chiudi navigazione", "Navigazione mobile"], es: ["Abrir navegación", "Cerrar navegación", "Navegación móvil"], pl: ["Otwórz nawigację", "Zamknij nawigację", "Nawigacja mobilna"], cs: ["Otevřít navigaci", "Zavřít navigaci", "Mobilní navigace"],
  }[locale];
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild><Button className="mobile-menu-trigger" variant="ghost" size="icon" aria-label={labels[0]}><Menu size={21} /></Button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-overlay" />
        <Dialog.Content className="mobile-menu-content" aria-describedby={undefined}>
          <div className="mobile-menu-head"><Dialog.Title asChild><Logo /></Dialog.Title><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label={labels[1]}><X size={20} /></Button></Dialog.Close></div>
          <nav aria-label={labels[2]}>
            {links.map(([label, href], index) => <Dialog.Close asChild key={href}><Link href={href}><span>0{index + 1}</span>{label}</Link></Dialog.Close>)}
          </nav>
          <p>{{ en: "Outsource your self-control.", de: "Lagere deine Willenskraft aus.", fr: "Externalisez votre volonté.", sv: "Lägg ut din självkontroll.", no: "Sett bort selvkontrollen.", da: "Udliciter din selvkontrol.", fi: "Ulkoista itsehillintäsi.", nl: "Besteed je zelfbeheersing uit.", it: "Delega il tuo autocontrollo.", es: "Delega tu autocontrol.", pl: "Oddaj samokontrolę.", cs: "Předejte sebekontrolu." }[locale]}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
