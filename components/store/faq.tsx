"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, ShieldAlert } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";

const items = [
  ["What is Pausio.eu?", "Pausio.eu is a physical self-control system: one electronic timer padlock and three compatible lockable box sizes. It creates a physical pause between you and a nonessential item you choose to put away."],
  ["How does the timer work?", "Set the lockout period directly on the electronic padlock, close the box, and attach the lock through both zipper pulls. The box stays closed until the timer finishes."],
  ["Can I use one lock with different boxes?", "Yes. All three Pausio.eu boxes use compatible zipper loops, so the same timer padlock can move between them."],
  ["What happens if the battery runs out?", "Charge the timer padlock before a lockout period and follow the care and charging instructions supplied with it."],
  ["Can I open it in an emergency?", "Do not use Pausio.eu for anything that may require urgent access. Never lock away medication, essential keys, emergency equipment, or your only means of making an emergency call."],
  ["Do I need an app?", "No. The controls are on the timer padlock itself, with no app or account required."],
  ["What can I put inside?", "Use it for nonessential items such as phones, game controllers, snacks, or other everyday distractions that fit safely inside your chosen box."],
  ["Where does Pausio.eu deliver?", "We deliver within 3–4 days to your chosen local parcel locker in the EU, UK, Switzerland, and Norway for a flat €10 per order."],
  ["Can I buy the timer padlock separately?", "Yes. The collection includes a standalone timer padlock for suitable externally lockable containers, subject to physical compatibility."],
] as const;

const germanItems = [
  ["Was ist Pausio.eu?", "Pausio.eu ist ein physisches Selbstkontroll-System: ein elektronisches Zeitschloss und drei passende abschließbare Boxgrößen. Es schafft eine echte Pause zwischen dir und einem Gegenstand, den du bewusst weglegen möchtest."],
  ["Wie funktioniert der Timer?", "Stelle die Sperrzeit direkt am elektronischen Schloss ein, schließe die Box und führe das Schloss durch beide Reißverschlussösen. Die Box bleibt zu, bis der Timer abgelaufen ist."],
  ["Kann ich ein Schloss mit mehreren Boxen verwenden?", "Ja. Alle drei Pausio.eu-Boxen haben passende Verschlussösen, sodass du dasselbe Zeitschloss zwischen ihnen wechseln kannst."],
  ["Was passiert, wenn der Akku leer ist?", "Lade das Zeitschloss vor einer Sperrzeit auf und beachte die mitgelieferten Pflege- und Ladehinweise."],
  ["Kann ich die Box im Notfall öffnen?", "Verwende Pausio.eu niemals für Dinge, auf die du dringend zugreifen können musst. Schließe keine Medikamente, wichtigen Schlüssel, Notfallausrüstung oder dein einziges Notfalltelefon ein."],
  ["Brauche ich eine App?", "Nein. Die Bedienung erfolgt direkt am Zeitschloss – ohne App und ohne Konto."],
  ["Was kann ich hineinlegen?", "Zum Beispiel Handys, Gaming-Controller, Snacks oder andere alltägliche Ablenkungen, die sicher in deine gewählte Box passen."],
  ["Wohin liefert Pausio.eu?", "Wir liefern in 3–4 Tagen für pauschal 10 € pro Bestellung an einen lokalen Paketautomaten deiner Wahl in der EU, Großbritannien, der Schweiz und Norwegen."],
  ["Kann ich das Zeitschloss einzeln kaufen?", "Ja. Die Kollektion enthält auch ein einzelnes Zeitschloss für geeignete extern abschließbare Behälter."],
] as const;

const frenchItems = [
  ["Qu’est-ce que Pausio.eu ?", "Pausio.eu est un système physique de maîtrise de soi : un cadenas électronique à minuterie et trois tailles de boîtes verrouillables compatibles. Il crée une vraie pause entre vous et l’objet que vous choisissez de ranger."],
  ["Comment fonctionne le minuteur ?", "Réglez la durée directement sur le cadenas, fermez la boîte et passez le cadenas dans les deux tirettes. La boîte reste fermée jusqu’à la fin du minuteur."],
  ["Puis-je utiliser un cadenas avec plusieurs boîtes ?", "Oui. Les trois boîtes utilisent des boucles compatibles, ce qui permet de déplacer le même cadenas de l’une à l’autre."],
  ["Que se passe-t-il si la batterie est vide ?", "Chargez le cadenas avant une période de verrouillage et suivez les instructions d’entretien et de charge fournies."],
  ["Puis-je ouvrir la boîte en cas d’urgence ?", "N’utilisez jamais Pausio.eu pour un objet auquel vous pourriez devoir accéder rapidement. N’y placez pas de médicaments, clés essentielles, matériel d’urgence ou votre seul téléphone."],
  ["Ai-je besoin d’une application ?", "Non. Les commandes se trouvent directement sur le cadenas, sans application ni compte."],
  ["Que puis-je mettre dedans ?", "Des objets non essentiels comme un téléphone, une manette, des snacks ou d’autres distractions quotidiennes qui tiennent dans la boîte choisie."],
  ["Où Pausio.eu livre-t-il ?", "Nous livrons sous 3–4 jours à la consigne à colis locale de votre choix dans l’UE, au Royaume-Uni, en Suisse et en Norvège, pour 10 € par commande."],
  ["Puis-je acheter le cadenas séparément ?", "Oui. La collection comprend un cadenas à minuterie vendu seul pour les contenants externes compatibles."],
] as const;

const nordicItems = {
  sv: [
    ["Vad är Pausio.eu?", "Ett fysiskt självkontrollsystem med ett elektroniskt timerlås och tre kompatibla låsbara boxstorlekar."],
    ["Hur fungerar timern?", "Ställ in låstiden på låset, stäng boxen och fäst låset genom båda dragkedjeöglorna. Boxen förblir stängd tills tiden löper ut."],
    ["Kan jag använda ett lås med flera boxar?", "Ja. Samma timerlås kan flyttas mellan alla tre boxstorlekarna."],
    ["Behöver jag en app?", "Nej. All styrning finns direkt på timerlåset, utan app eller konto."],
    ["Vad kan jag lägga i?", "Till exempel mobil, spelkontroll, snacks eller andra vardagsdistraktioner som ryms säkert i boxen."],
    ["Vart levererar Pausio.eu?", "Vi levererar inom 3–4 dagar till en valfri lokal paketbox i EU, Storbritannien, Schweiz och Norge för 10 € per beställning."],
  ],
  no: [
    ["Hva er Pausio.eu?", "Et fysisk selvkontrollsystem med en elektronisk timerlås og tre kompatible låsbare boksstørrelser."],
    ["Hvordan fungerer timeren?", "Still inn låsetiden, lukk boksen og fest låsen gjennom begge glidelåsløkkene. Boksen forblir lukket til tiden er ute."],
    ["Kan jeg bruke én lås med flere bokser?", "Ja. Den samme timerlåsen kan flyttes mellom alle tre boksstørrelsene."],
    ["Trenger jeg en app?", "Nei. Alle kontroller sitter på timerlåsen, uten app eller konto."],
    ["Hva kan jeg legge i?", "For eksempel mobil, spillkontroller, snacks eller andre hverdagslige distraksjoner som passer trygt i boksen."],
    ["Hvor leverer Pausio.eu?", "Vi leverer på 3–4 dager til en lokal pakkeboks du velger i EU, Storbritannia, Sveits og Norge for 10 € per bestilling."],
  ],
  da: [
    ["Hvad er Pausio.eu?", "Et fysisk selvkontrolsystem med en elektronisk timerlås og tre kompatible aflåselige boksstørrelser."],
    ["Hvordan fungerer timeren?", "Indstil låsetiden, luk boksen og fastgør låsen gennem begge lynlåsløkker. Boksen forbliver lukket, indtil tiden er gået."],
    ["Kan jeg bruge én lås med flere bokse?", "Ja. Den samme timerlås kan flyttes mellem alle tre boksstørrelser."],
    ["Har jeg brug for en app?", "Nej. Alle funktioner sidder på timerlåsen, uden app eller konto."],
    ["Hvad kan jeg lægge i?", "For eksempel mobil, spilcontroller, snacks eller andre hverdagsdistraktioner, der passer sikkert i boksen."],
    ["Hvor leverer Pausio.eu?", "Vi leverer på 3–4 dage til en lokal pakkeboks efter eget valg i EU, Storbritannien, Schweiz og Norge for 10 € pr. ordre."],
  ],
  fi: [
    ["Mikä Pausio.eu on?", "Fyysinen itsehillintäjärjestelmä, johon kuuluu elektroninen ajastinlukko ja kolme yhteensopivaa lukittavaa laatikkokokoa."],
    ["Miten ajastin toimii?", "Aseta lukitusaika, sulje laatikko ja kiinnitä lukko molempien vetoketjulenkkien läpi. Laatikko pysyy kiinni ajan loppuun asti."],
    ["Voinko käyttää yhtä lukkoa usean laatikon kanssa?", "Kyllä. Sama ajastinlukko sopii kaikkiin kolmeen laatikkokokoon."],
    ["Tarvitsenko sovelluksen?", "Et. Kaikki ohjaimet ovat ajastinlukossa, ilman sovellusta tai tiliä."],
    ["Mitä laatikkoon voi laittaa?", "Esimerkiksi puhelimen, peliohjaimen, välipaloja tai muita arjen häiriötekijöitä, jotka mahtuvat turvallisesti laatikkoon."],
    ["Minne Pausio.eu toimittaa?", "Toimitamme 3–4 päivässä valitsemaasi paikalliseen pakettiautomaattiin EU:ssa, Isossa-Britanniassa, Sveitsissä ja Norjassa, 10 € per tilaus."],
  ],
  nl: [
    ["Wat is Pausio.eu?", "Een fysiek zelfbeheersingssysteem met een elektronisch timerslot en drie bijpassende afsluitbare boxformaten."],
    ["Hoe werkt de timer?", "Stel de vergrendeltijd op het slot in, sluit de box en bevestig het slot door beide ritssluitingslussen. De box blijft dicht tot de tijd voorbij is."],
    ["Kan ik één slot met meerdere boxen gebruiken?", "Ja. Hetzelfde timerslot past op alle drie de boxformaten."],
    ["Heb ik een app nodig?", "Nee. Alle bediening zit op het timerslot zelf, zonder app of account."],
    ["Wat kan ik erin doen?", "Bijvoorbeeld een telefoon, controller, snacks of andere dagelijkse afleidingen die veilig in de box passen."],
    ["Waar levert Pausio.eu?", "We leveren binnen 3–4 dagen bij een lokale pakketautomaat naar keuze in de EU, het VK, Zwitserland en Noorwegen voor €10 per bestelling."],
  ],
  it: [
    ["Cos'è Pausio.eu?", "Un sistema fisico di autocontrollo con un lucchetto elettronico a tempo e tre misure di box richiudibili compatibili."],
    ["Come funziona il timer?", "Imposta la durata sul lucchetto, chiudi la box e collega il lucchetto attraverso entrambe le asole delle cerniere. La box resta chiusa fino allo scadere del tempo."],
    ["Posso usare un lucchetto con più box?", "Sì. Lo stesso lucchetto a tempo può essere usato con tutte e tre le misure."],
    ["Serve un'app?", "No. Tutti i comandi sono sul lucchetto, senza app o account."],
    ["Cosa posso mettere dentro?", "Telefono, controller, snack o altre distrazioni quotidiane che entrano in sicurezza nella box."],
    ["Dove consegna Pausio.eu?", "Consegniamo in 3–4 giorni al locker locale scelto nell’UE, Regno Unito, Svizzera e Norvegia per 10 € a ordine."],
  ],
  es: [
    ["¿Qué es Pausio.eu?", "Un sistema físico de autocontrol con un candado electrónico con temporizador y tres tamaños de cajas compatibles."],
    ["¿Cómo funciona el temporizador?", "Programa el tiempo en el candado, cierra la caja y coloca el candado por las dos anillas de las cremalleras. La caja permanece cerrada hasta que termina el tiempo."],
    ["¿Puedo usar un candado con varias cajas?", "Sí. El mismo candado sirve para los tres tamaños de caja."],
    ["¿Necesito una aplicación?", "No. Todos los controles están en el propio candado, sin aplicación ni cuenta."],
    ["¿Qué puedo guardar dentro?", "Un móvil, mando, snacks u otras distracciones cotidianas que quepan con seguridad."],
    ["¿Dónde entrega Pausio.eu?", "Entregamos en 3–4 días en la taquilla de paquetería local que elijas en la UE, Reino Unido, Suiza y Noruega por 10 € el pedido."],
  ],
  pl: [
    ["Czym jest Pausio.eu?", "To fizyczny system samokontroli: elektroniczna kłódka czasowa i trzy pasujące rozmiary zamykanych pudełek."],
    ["Jak działa timer?", "Ustaw czas na kłódce, zamknij pudełko i przełóż kłódkę przez obie pętle zamków. Pudełko pozostaje zamknięte do końca czasu."],
    ["Czy mogę używać jednej kłódki z różnymi pudełkami?", "Tak. Ta sama kłódka pasuje do wszystkich trzech rozmiarów."],
    ["Czy potrzebuję aplikacji?", "Nie. Wszystkie elementy sterowania są na kłódce, bez aplikacji i konta."],
    ["Co mogę włożyć do środka?", "Telefon, kontroler, przekąski lub inne codzienne rozpraszacze, które bezpiecznie mieszczą się w pudełku."],
    ["Dokąd dostarcza Pausio.eu?", "Dostarczamy w 3–4 dni do wybranego lokalnego automatu paczkowego w UE, Wielkiej Brytanii, Szwajcarii i Norwegii za 10 € od zamówienia."],
  ],
  cs: [
    ["Co je Pausio.eu?", "Fyzický systém sebekontroly s elektronickým časovým zámkem a třemi kompatibilními velikostmi uzamykatelných boxů."],
    ["Jak funguje časovač?", "Nastavte dobu na zámku, zavřete box a provlékněte zámek oběma poutky zipu. Box zůstane zavřený do konce nastavené doby."],
    ["Mohu použít jeden zámek s více boxy?", "Ano. Stejný časový zámek lze použít se všemi třemi velikostmi."],
    ["Potřebuji aplikaci?", "Ne. Veškeré ovládání je přímo na zámku, bez aplikace a účtu."],
    ["Co mohu vložit dovnitř?", "Telefon, herní ovladač, svačinu nebo jiné každodenní rozptýlení, které se bezpečně vejde."],
    ["Kam Pausio.eu doručuje?", "Doručujeme za 3–4 dny do zvoleného místního výdejního boxu v EU, Spojeném království, Švýcarsku a Norsku za 10 € za objednávku."],
  ],
} as const;

export function Faq({ locale = "en" }: { locale?: Locale }) {
  const de = locale === "de";
  const fr = locale === "fr";
  const faqItems = de ? germanItems : fr ? frenchItems : locale in nordicItems ? nordicItems[locale as keyof typeof nordicItems] : items;
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div className="faq-intro"><p className="eyebrow">{localize(locale, "Before you ask", "Gut zu wissen", "Avant de demander")}</p><h2 className="h2">{localize(locale, "The sensible questions.", "Die wichtigen Fragen.", "Les bonnes questions.")}</h2><p className="lede">{localize(locale, "Everything you need to choose a box and use your timer lock responsibly.", "Alles, was du für die Wahl deiner Box und den verantwortungsvollen Umgang mit dem Zeitschloss wissen musst.", "Tout ce qu’il faut savoir pour choisir votre boîte et utiliser le cadenas de manière responsable.")}</p><div className="safety-note"><ShieldAlert size={22} /><p><strong>{localize(locale, "Use common sense.", "Mit gesundem Menschenverstand verwenden.", "Faites preuve de bon sens.")}</strong> {localize(locale, "Do not lock away medication, emergency equipment, essential keys, or your only means of making an emergency call. Pausio.eu is not a security safe or emergency-access device.", "Schließe keine Medikamente, Notfallausrüstung, wichtigen Schlüssel oder dein einziges Notfalltelefon ein. Pausio.eu ist weder ein Tresor noch ein Notfallzugangssystem.", "N’enfermez pas de médicaments, de matériel d’urgence, de clés essentielles ou votre seul moyen de passer un appel d’urgence. Pausio.eu n’est ni un coffre-fort ni un dispositif d’accès d’urgence.")}</p></div></div>
        <Accordion.Root className="faq-list" type="single" collapsible>
          {faqItems.map(([question, answer], index) => (
            <Accordion.Item value={`item-${index}`} key={question}>
              <Accordion.Header><Accordion.Trigger><span>{question}</span><ChevronDown size={19} /></Accordion.Trigger></Accordion.Header>
              <Accordion.Content><div>{answer}</div></Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
