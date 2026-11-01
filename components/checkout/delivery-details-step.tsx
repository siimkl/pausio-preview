"use client";

import { ArrowLeft, ArrowRight, CreditCard, Landmark, WalletCards, type LucideIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { checkoutDeliveryDetailsSchema, PAYMENT_METHODS, type CheckoutDeliveryDetails, type PaymentMethod } from "@/lib/checkout";
import { getCheckoutDetailsCopy } from "@/lib/checkout-details-copy";
import { localize, type Locale } from "@/lib/i18n";

type DetailsErrors = Partial<Record<keyof CheckoutDeliveryDetails, string>>;

const paymentIcons = {
  card: CreditCard,
  "bank-transfer": Landmark,
  paypal: WalletCards,
} satisfies Record<PaymentMethod, LucideIcon>;

export function DeliveryDetailsStep({ locale, initialValue, onBack, onContinue }: { locale: Locale; initialValue?: CheckoutDeliveryDetails; onBack: () => void; onContinue: (details: CheckoutDeliveryDetails) => void }) {
  const copy = getCheckoutDetailsCopy(locale);
  const [phone, setPhone] = useState(initialValue?.phone ?? "");
  const [deliveryAddress, setDeliveryAddress] = useState(initialValue?.deliveryAddress ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">(initialValue?.paymentMethod ?? "");
  const [errors, setErrors] = useState<DetailsErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = checkoutDeliveryDetailsSchema.safeParse({ phone, deliveryAddress, paymentMethod });
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      setErrors({
        phone: fields.phone?.length ? copy.phoneError : undefined,
        deliveryAddress: fields.deliveryAddress?.length ? copy.addressError : undefined,
        paymentMethod: fields.paymentMethod?.length ? copy.paymentError : undefined,
      });
      return;
    }
    setErrors({});
    onContinue(result.data);
  };

  return (
    <section aria-labelledby="details-title">
      <div className="checkout-section-head"><div><span>{localize(locale, "STEP 03", "SCHRITT 03", "ÉTAPE 03")}</span><h2 id="details-title">{copy.title}</h2></div></div>
      <p className="checkout-explainer">{copy.explainer}</p>
      <form className="checkout-details-form" onSubmit={submit} noValidate>
        <div className="checkout-details-grid">
          <div className="field">
            <label htmlFor="checkout-phone">{copy.phone}</label>
            <input className="input" id="checkout-phone" type="tel" autoComplete="tel" inputMode="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={copy.phonePlaceholder} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "checkout-phone-error" : undefined} />
            {errors.phone && <p className="field-error" id="checkout-phone-error" role="alert">{errors.phone}</p>}
          </div>
          <div className="field">
            <label htmlFor="checkout-address">{copy.address}</label>
            <input className="input" id="checkout-address" type="text" autoComplete="street-address" required value={deliveryAddress} onChange={(event) => setDeliveryAddress(event.target.value)} placeholder={copy.addressPlaceholder} aria-invalid={Boolean(errors.deliveryAddress)} aria-describedby={errors.deliveryAddress ? "checkout-address-error" : "checkout-address-hint"} />
            <p className="field-hint" id="checkout-address-hint">{copy.addressHint}</p>
            {errors.deliveryAddress && <p className="field-error" id="checkout-address-error" role="alert">{errors.deliveryAddress}</p>}
          </div>
        </div>
        <fieldset className="payment-methods" aria-describedby={errors.paymentMethod ? "payment-method-error" : "payment-privacy"}>
          <legend>{copy.payment}</legend>
          <div className="payment-options">
            {PAYMENT_METHODS.map((method) => {
              const Icon = paymentIcons[method];
              return <label className={paymentMethod === method ? "is-selected" : ""} key={method}><input type="radio" name="payment-method" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} /><Icon size={20} aria-hidden="true" /><span>{copy.methods[method]}</span></label>;
            })}
          </div>
          {errors.paymentMethod && <p className="field-error" id="payment-method-error" role="alert">{errors.paymentMethod}</p>}
        </fieldset>
        <p className="checkout-data-note" id="payment-privacy">{copy.privacy}</p>
        <div className="checkout-nav"><Button type="button" variant="ghost" onClick={onBack}><ArrowLeft size={17} /> {localize(locale, "Back", "Zurück", "Retour")}</Button><Button type="submit" size="lg">{copy.continue} <ArrowRight size={17} /></Button></div>
      </form>
    </section>
  );
}
