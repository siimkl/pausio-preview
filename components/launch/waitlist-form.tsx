"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { waitlistSchema } from "@/lib/checkout";
import type { ProductId } from "@/lib/products";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";

type FormErrors = Partial<Record<"email" | "consent" | "form", string>>;

export function WaitlistForm({ defaultCountry = "", preferredProduct = "", locale = "en" }: { defaultCountry?: string; preferredProduct?: ProductId | ""; locale?: Locale }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "saved" | "demo" | "static">("idle");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting" || status === "saved" || status === "demo" || status === "static") return;
    const parsed = waitlistSchema.safeParse({ email, country: defaultCountry, preferredProduct, consent, website });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({ email: fieldErrors.email?.[0], consent: fieldErrors.consent?.[0] });
      return;
    }
    setErrors({});
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      setStatus("static");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await response.json() as { ok?: boolean; demo?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not save your signup.");
      setStatus(result.demo ? "demo" : "saved");
      if (!result.demo) void trackEvent("waitlist_signup", { country: defaultCountry, product_id: preferredProduct || undefined }, { idempotencyKey: `waitlist:${email.toLowerCase()}` });
    } catch (error) {
      setStatus("idle"); setErrors({ form: error instanceof Error ? error.message : "Could not save your signup." });
    }
  };

  if (status === "static") return <div className="waitlist-success" role="status"><CheckCircle2 size={30} /><div><h3>{localize(locale, "Preview mode", "Vorschaumodus", "Mode aperçu")}</h3><p>{localize(locale, "This shared preview does not save email addresses. Contact info@pausio.eu for a stock update.", "Diese geteilte Vorschau speichert keine E-Mail-Adressen. Kontaktiere info@pausio.eu für ein Verfügbarkeitsupdate.", "Cet aperçu partagé n’enregistre pas les adresses e-mail. Contactez info@pausio.eu pour être informé du stock.")}</p></div></div>;

  if (status === "saved" || status === "demo") return <div className="waitlist-success" role="status"><CheckCircle2 size={30} /><div><h3>{localize(locale, "Thanks — we'll keep you posted.", "Danke – wir halten dich auf dem Laufenden.", "Merci, nous vous tiendrons au courant.")}</h3><p>{localize(locale, "We'll email you when Pausio.eu is back in stock.", "Wir schreiben dir, sobald Pausio.eu wieder verfügbar ist.", "Nous vous écrirons dès que Pausio.eu sera de nouveau disponible.")}</p></div></div>;

  return (
    <form className="waitlist-form" onSubmit={submit} noValidate data-clarity-mask="true">
      <div className="field"><label htmlFor="waitlist-email">{localize(locale, "Email address", "E-Mail-Adresse", "Adresse e-mail")}</label><input className="input" id="waitlist-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={localize(locale, "you@example.com", "du@beispiel.de", "vous@exemple.fr")} aria-invalid={Boolean(errors.email)} />{errors.email && <p className="field-error" role="alert">{errors.email}</p>}</div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
      <label className="consent-check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{localize(locale, "I agree to receive one email when Pausio.eu is back in stock.", "Ich stimme zu, eine E-Mail zu erhalten, sobald Pausio.eu wieder verfügbar ist.", "J’accepte de recevoir un e-mail lorsque Pausio.eu sera de nouveau disponible.")}</span></label>{errors.consent && <p className="field-error" role="alert">{errors.consent}</p>}{errors.form && <p className="field-error" role="alert">{errors.form}</p>}
      <Button size="lg" type="submit" disabled={status === "submitting"}>{status === "submitting" ? localize(locale, "Saving…", "Wird gespeichert…", "Enregistrement…") : localize(locale, "Email me when it’s back", "Bei Verfügbarkeit benachrichtigen", "Me prévenir du retour")}</Button><p className="fine-print">{localize(locale, "We will only use this address for this stock update.", "Wir verwenden diese Adresse nur für diese Verfügbarkeitsmeldung.", "Nous utiliserons cette adresse uniquement pour cette alerte de disponibilité.")}</p>
    </form>
  );
}
