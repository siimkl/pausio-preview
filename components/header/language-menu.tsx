"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LOCALE_COOKIE, localeFromPath, localizedPath, type Locale } from "@/lib/i18n";

function Flag({ locale }: { locale: Locale }) {
  if (locale === "de") {
    return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#161616" d="M0 0h60v12H0z" /><path fill="#d71920" d="M0 12h60v12H0z" /><path fill="#ffce00" d="M0 24h60v12H0z" /></svg>;
  }
  if (locale === "fr") {
    return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#1b3f8b" d="M0 0h20v36H0z" /><path fill="#fff" d="M20 0h20v36H20z" /><path fill="#e1273e" d="M40 0h20v36H40z" /></svg>;
  }
  if (locale === "sv") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#006aa7" d="M0 0h60v36H0z" /><path fill="#fecc00" d="M18 0h8v36H18zM0 14h60v8H0z" /></svg>;
  if (locale === "no") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#ba0c2f" d="M0 0h60v36H0z" /><path fill="#fff" d="M16 0h12v36H16zM0 12h60v12H0z" /><path fill="#00205b" d="M20 0h4v36H20zM0 16h60v4H0z" /></svg>;
  if (locale === "da") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#c8102e" d="M0 0h60v36H0z" /><path fill="#fff" d="M18 0h7v36H18zM0 14h60v7H0z" /></svg>;
  if (locale === "fi") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#fff" d="M0 0h60v36H0z" /><path fill="#003580" d="M18 0h8v36H18zM0 14h60v8H0z" /></svg>;
  if (locale === "nl") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#ae1c28" d="M0 0h60v12H0z" /><path fill="#fff" d="M0 12h60v12H0z" /><path fill="#21468b" d="M0 24h60v12H0z" /></svg>;
  if (locale === "it") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#009246" d="M0 0h20v36H0z" /><path fill="#fff" d="M20 0h20v36H20z" /><path fill="#ce2b37" d="M40 0h20v36H40z" /></svg>;
  if (locale === "es") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#aa151b" d="M0 0h60v9H0zM0 27h60v9H0z" /><path fill="#f1bf00" d="M0 9h60v18H0z" /></svg>;
  if (locale === "pl") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#fff" d="M0 0h60v18H0z" /><path fill="#dc143c" d="M0 18h60v18H0z" /></svg>;
  if (locale === "cs") return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#fff" d="M0 0h60v18H0z" /><path fill="#d7141a" d="M0 18h60v18H0z" /><path fill="#11457e" d="M0 0v36l25-18z" /></svg>;
  return <svg className="language-flag" viewBox="0 0 60 36" aria-hidden="true"><path fill="#21468b" d="M0 0h60v36H0z" /><path stroke="#fff" strokeWidth="8" d="m0 0 60 36M60 0 0 36" /><path stroke="#cf142b" strokeWidth="4" d="m0 0 60 36M60 0 0 36" /><path stroke="#fff" strokeWidth="12" d="M30 0v36M0 18h60" /><path stroke="#cf142b" strokeWidth="7" d="M30 0v36M0 18h60" /></svg>;
}

export function LanguageMenu({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const code = locale.toUpperCase();
  const languageLabel = { en: "Language", de: "Sprache", fr: "Langue", sv: "Språk", no: "Språk", da: "Sprog", fi: "Kieli", nl: "Taal", it: "Lingua", es: "Idioma", pl: "Język", cs: "Jazyk" }[locale];
  const chooseLabel = { en: "Choose language", de: "Sprache wählen", fr: "Choisir la langue", sv: "Välj språk", no: "Velg språk", da: "Vælg sprog", fi: "Valitse kieli", nl: "Kies taal", it: "Scegli la lingua", es: "Elegir idioma", pl: "Wybierz język", cs: "Vyberte jazyk" }[locale];

  const choose = (nextLocale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    window.location.assign(localizedPath(pathname, nextLocale));
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className="language-trigger" variant="ghost" size="default" aria-label={compact ? chooseLabel : undefined}>
          <Flag locale={locale} /><span className="language-label">{code}</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="language-popover" sideOffset={10} align="end">
          <DropdownMenu.Label>{languageLabel}</DropdownMenu.Label>
          <DropdownMenu.Item onSelect={() => choose("en")}><span className="language-option"><Flag locale="en" /><span><strong>English</strong><small>English</small></span></span>{locale === "en" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("de")}><span className="language-option"><Flag locale="de" /><span><strong>Deutsch</strong><small>German</small></span></span>{locale === "de" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("fr")}><span className="language-option"><Flag locale="fr" /><span><strong>Français</strong><small>French</small></span></span>{locale === "fr" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("sv")}><span className="language-option"><Flag locale="sv" /><span><strong>Svenska</strong><small>Swedish</small></span></span>{locale === "sv" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("no")}><span className="language-option"><Flag locale="no" /><span><strong>Norsk</strong><small>Norwegian</small></span></span>{locale === "no" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("da")}><span className="language-option"><Flag locale="da" /><span><strong>Dansk</strong><small>Danish</small></span></span>{locale === "da" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("fi")}><span className="language-option"><Flag locale="fi" /><span><strong>Suomi</strong><small>Finnish</small></span></span>{locale === "fi" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("nl")}><span className="language-option"><Flag locale="nl" /><span><strong>Nederlands</strong><small>Dutch</small></span></span>{locale === "nl" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("it")}><span className="language-option"><Flag locale="it" /><span><strong>Italiano</strong><small>Italian</small></span></span>{locale === "it" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("es")}><span className="language-option"><Flag locale="es" /><span><strong>Español</strong><small>Spanish</small></span></span>{locale === "es" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("pl")}><span className="language-option"><Flag locale="pl" /><span><strong>Polski</strong><small>Polish</small></span></span>{locale === "pl" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => choose("cs")}><span className="language-option"><Flag locale="cs" /><span><strong>Čeština</strong><small>Czech</small></span></span>{locale === "cs" && <Check size={16} />}</DropdownMenu.Item>
          <DropdownMenu.Arrow className="language-arrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
