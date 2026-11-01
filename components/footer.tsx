"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site-config";
import { localeFromPath, localize } from "@/lib/i18n";

export function Footer() {
  const locale = localeFromPath(usePathname());
  const home = locale === "en" ? "" : `/${locale}`;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo /><p>{localize(locale, "A timer-locked box that keeps phones, snacks, and other distractions out of reach until time's up.", "Eine Box mit Zeitschloss, die Handys, Snacks und andere Ablenkungen außer Reichweite hält, bis die Zeit abgelaufen ist.", "Une boîte verrouillée par minuterie qui garde téléphones, snacks et autres distractions hors de portée jusqu’à la fin du temps.")}</p></div>
        <div><h2>{localize(locale, "Explore", "Entdecken", "Découvrir")}</h2><Link href={`${home}/#shop`}>Shop</Link><Link href={`${home}/#how-it-works`}>{localize(locale, "How it works", "So funktioniert’s", "Comment ça marche")}</Link><Link href={`${home}/#why-lockbox`}>{localize(locale, "Why a timer lockbox?", "Warum eine Timerbox?", "Pourquoi une boîte à minuterie ?")}</Link><Link href={`${home}/#faq`}>FAQ</Link></div>
        <div><h2>Information</h2><Link href="/privacy">{localize(locale, "Privacy", "Datenschutz", "Confidentialité")}</Link><Link href="/cookies">Cookies</Link><Link href="/terms">{localize(locale, "Terms", "Bedingungen", "Conditions")}</Link></div>
        <div><h2>{localize(locale, "Elsewhere", "Kontakt", "Contact")}</h2>
          {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}<ArrowUpRight size={14} /></a> : <span>{localize(locale, "Contact details coming soon", "Kontaktdaten folgen in Kürze", "Coordonnées à venir")}</span>}
          {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={14} /></a>}
          {siteConfig.facebookUrl && <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer">Facebook<ArrowUpRight size={14} /></a>}
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Pausio.eu</span><span>{localize(locale, "Future-you doesn't get a vote.", "Dein späteres Ich hat kein Mitspracherecht.", "Votre futur vous n’a pas son mot à dire.")}</span></div>
    </footer>
  );
}
