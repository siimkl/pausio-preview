"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, readConsent, saveConsent } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { localeFromPath, localize } from "@/lib/i18n";

export function CookieConsent() {
  const locale = localeFromPath(usePathname());
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    queueMicrotask(() => {
      if (consent) {
        setAnalytics(consent.analytics);
        setMarketing(consent.marketing);
      } else {
        setVisible(true);
      }
      setReady(true);
    });
  }, []);

  const decide = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const previous = readConsent();
    saveConsent(nextAnalytics, nextMarketing);
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setVisible(false);
    setCustomize(false);
    if ((previous?.analytics && !nextAnalytics) || (previous?.marketing && !nextMarketing)) {
      window.location.reload();
    }
  };

  if (!ready) return null;

  return (
    <>
      <Dialog.Root open={visible} onOpenChange={setVisible}>
        {!visible && (
          <Dialog.Trigger asChild>
            <button className="cookie-settings-button"><Cookie size={15} /> {localize(locale, "Cookie settings", "Cookie-Einstellungen", "Paramètres des cookies")}</button>
          </Dialog.Trigger>
        )}
        <Dialog.Portal>
          <Dialog.Overlay className="cookie-overlay" />
          <Dialog.Content className="cookie-panel" onEscapeKeyDown={(event) => !localStorage.getItem(CONSENT_KEY) && event.preventDefault()}>
            <div className="cookie-heading">
              <div><Dialog.Title>{localize(locale, "Your privacy, minus the small print gymnastics.", "Deine Privatsphäre – ohne Kleingedrucktes.", "Votre vie privée, sans les contorsions des petites lignes.")}</Dialog.Title><Dialog.Description>{localize(locale, "Optional analytics help us improve the Pausio.eu shopping experience. Marketing cookies support campaign measurement. Neither is required to use the site.", "Optionale Analyse-Cookies helfen uns, das Einkaufserlebnis zu verbessern. Marketing-Cookies unterstützen die Kampagnenmessung. Beides ist für die Nutzung der Website nicht erforderlich.", "Les analyses facultatives nous aident à améliorer l’expérience. Les cookies marketing servent à mesurer les campagnes. Aucun des deux n’est nécessaire pour utiliser le site.")}</Dialog.Description></div>
              {readConsent() && <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label={localize(locale, "Close cookie settings", "Cookie-Einstellungen schließen", "Fermer les paramètres des cookies")}><X size={18} /></Button></Dialog.Close>}
            </div>

            {customize && (
              <div className="consent-options">
                <div><span><strong>{localize(locale, "Strictly necessary", "Technisch notwendig", "Strictement nécessaires")}</strong><small>{localize(locale, "Cart, checkout state, and consent choices.", "Warenkorb, Checkout-Status und Einwilligungswahl.", "Panier, état du paiement et choix de consentement.")}</small></span><span className="always-on">{localize(locale, "Always on", "Immer aktiv", "Toujours actifs")}</span></div>
                <label><span><strong>{localize(locale, "Analytics", "Analyse", "Analyse")}</strong><small>{localize(locale, "GA4, Clarity, and consented funnel events.", "GA4, Clarity und freigegebene Funnel-Ereignisse.", "GA4, Clarity et événements de parcours autorisés.")}</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
                <label><span><strong>{localize(locale, "Marketing", "Marketing", "Marketing")}</strong><small>{localize(locale, "Meta Pixel campaign attribution.", "Zuordnung von Kampagnen über Meta Pixel.", "Attribution des campagnes via Meta Pixel.")}</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /></label>
              </div>
            )}

            <div className="cookie-actions">
              {customize ? (
                <Button onClick={() => decide(analytics, marketing)}>{localize(locale, "Save choices", "Auswahl speichern", "Enregistrer les choix")}</Button>
              ) : (
                <><Button onClick={() => decide(true, true)}>{localize(locale, "Accept all", "Alle akzeptieren", "Tout accepter")}</Button><Button variant="secondary" onClick={() => decide(false, false)}>{localize(locale, "Reject optional", "Optionale ablehnen", "Refuser les facultatifs")}</Button><Button variant="ghost" onClick={() => setCustomize(true)}>{localize(locale, "Customize", "Anpassen", "Personnaliser")}</Button></>
              )}
            </div>
            <p className="fine-print">{locale === "de" ? <>Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ ändern. Lies unsere <Link href="/cookies">Cookie-Richtlinie</Link> und <Link href="/privacy">Datenschutzerklärung</Link>.</> : locale === "fr" ? <>Vous pouvez modifier votre choix à tout moment dans « Paramètres des cookies ». Consultez notre <Link href="/cookies">politique relative aux cookies</Link> et notre <Link href="/privacy">politique de confidentialité</Link>.</> : locale === "sv" ? <>Du kan ändra ditt val när som helst via ”Cookie-inställningar”. Läs vår <Link href="/cookies">cookiepolicy</Link> och <Link href="/privacy">integritetspolicy</Link>.</> : locale === "no" ? <>Du kan endre valget når som helst via «Innstillinger for informasjonskapsler». Les vår <Link href="/cookies">retningslinje for informasjonskapsler</Link> og <Link href="/privacy">personvernerklæring</Link>.</> : locale === "da" ? <>Du kan ændre dit valg når som helst via ”Cookieindstillinger”. Læs vores <Link href="/cookies">cookiepolitik</Link> og <Link href="/privacy">privatlivspolitik</Link>.</> : locale === "fi" ? <>Voit muuttaa valintaasi milloin tahansa evästeasetuksista. Lue <Link href="/cookies">evästekäytäntömme</Link> ja <Link href="/privacy">tietosuojakäytäntömme</Link>.</> : <>Change your choice any time from “Cookie settings”. Read our <Link href="/cookies">Cookie Policy</Link> and <Link href="/privacy">Privacy Policy</Link>.</>}</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
