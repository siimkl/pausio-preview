import type { ProductId } from "@/lib/products";

export type Locale = "en" | "de" | "fr" | "sv" | "no" | "da" | "fi" | "nl" | "it" | "es" | "pl" | "cs";
export type NordicLocale = "sv" | "no" | "da" | "fi";
export type EuropeanLocale = "nl" | "it" | "es" | "pl" | "cs";
export type DynamicLocale = NordicLocale | EuropeanLocale;

export const LOCALES: readonly Locale[] = ["en", "de", "fr", "sv", "no", "da", "fi", "nl", "it", "es", "pl", "cs"];
export const NORDIC_LOCALES: readonly NordicLocale[] = ["sv", "no", "da", "fi"];
export const EUROPEAN_LOCALES: readonly EuropeanLocale[] = ["nl", "it", "es", "pl", "cs"];
export const DYNAMIC_LOCALES: readonly DynamicLocale[] = [...NORDIC_LOCALES, ...EUROPEAN_LOCALES];

export const LOCALE_COOKIE = "tlb_locale";

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  if (LOCALES.includes(segment as Locale) && segment !== "en") return segment as Locale;
  return "en";
}

export function localizedPath(pathname: string, locale: Locale) {
  const englishPath = /^\/(de|fr|sv|no|da|fi|nl|it|es|pl|cs)(\/|$)/.test(pathname) ? pathname.replace(/^\/(de|fr|sv|no|da|fi|nl|it|es|pl|cs)/, "") || "/" : pathname;
  const isStorefrontPath = englishPath === "/" || englishPath === "/checkout" || englishPath.startsWith("/products/");
  if (locale === "en") return englishPath;
  return isStorefrontPath ? `/${locale}${englishPath === "/" ? "" : englishPath}` : `/${locale}`;
}

type NordicTranslations = Record<NordicLocale, string>;

const NORDIC_TEXT: Record<string, NordicTranslations> = {
  "Language": { sv: "Språk", no: "Språk", da: "Sprog", fi: "Kieli" },
  "EU, UK, Switzerland & Norway": { sv: "EU, Storbritannien, Schweiz och Norge", no: "EU, Storbritannia, Sveits og Norge", da: "EU, Storbritannien, Schweiz og Norge", fi: "EU, Iso-Britannia, Sveitsi ja Norja" },
  "3–4 days to your chosen local parcel locker": { sv: "Inom 3–4 dagar till valfri lokal paketbox", no: "På 3–4 dager til en lokal pakkeboks du velger", da: "På 3–4 dage til en lokal pakkeboks efter eget valg", fi: "3–4 päivässä valitsemaasi paikalliseen pakettiautomaattiin" },
  "€10 per order": { sv: "10 € per beställning", no: "10 € per bestilling", da: "10 € pr. ordre", fi: "10 € per tilaus" },
  "How it works": { sv: "Så fungerar det", no: "Slik fungerer det", da: "Sådan fungerer det", fi: "Näin se toimii" },
  "Why a timer lockbox?": { sv: "Varför en timerbox?", no: "Hvorfor en timerboks?", da: "Hvorfor en timerboks?", fi: "Miksi ajastinlaatikko?" },
  "Explore": { sv: "Utforska", no: "Utforsk", da: "Udforsk", fi: "Tutustu" },
  "Privacy": { sv: "Integritet", no: "Personvern", da: "Privatliv", fi: "Tietosuoja" },
  "Terms": { sv: "Villkor", no: "Vilkår", da: "Vilkår", fi: "Ehdot" },
  "Elsewhere": { sv: "Kontakt", no: "Kontakt", da: "Kontakt", fi: "Yhteystiedot" },
  "Contact details coming soon": { sv: "Kontaktuppgifter kommer snart", no: "Kontaktinformasjon kommer snart", da: "Kontaktoplysninger kommer snart", fi: "Yhteystiedot tulossa pian" },
  "See how it works": { sv: "Se hur det fungerar", no: "Se hvordan det fungerer", da: "Se hvordan det fungerer", fi: "Katso miten se toimii" },
  "One lock. Three sizes.": { sv: "Ett lås. Tre storlekar.", no: "Én lås. Tre størrelser.", da: "Én lås. Tre størrelser.", fi: "Yksi lukko. Kolme kokoa." },
  "No app required.": { sv: "Ingen app behövs.", no: "Ingen app nødvendig.", da: "Ingen app nødvendig.", fi: "Ei sovellusta." },
  "Simple timer control.": { sv: "Enkel timerstyrning.", no: "Enkel tidsstyring.", da: "Enkel timerstyring.", fi: "Helppo ajastin." },
  "Almost suspiciously simple": { sv: "Nästan misstänkt enkelt", no: "Nesten mistenkelig enkelt", da: "Næsten mistænkeligt enkelt", fi: "Melkein epäilyttävän helppoa" },
  "Put it inside": { sv: "Lägg den i", no: "Legg den i", da: "Læg den i", fi: "Laita se sisään" },
  "Set the timer": { sv: "Ställ in timern", no: "Still inn timeren", da: "Indstil timeren", fi: "Aseta ajastin" },
  "Get on with your life": { sv: "Fortsätt med dagen", no: "Fortsett med dagen", da: "Fortsæt med dagen", fi: "Jatka päivääsi" },
  "Pick your temptation": { sv: "Välj din frestelse", no: "Velg fristelsen", da: "Vælg din fristelse", fi: "Valitse houkutuksesi" },
  "THE EVERYDAY SHORTLIST": { sv: "VARDAGSLISTAN", no: "HVERDAGSLISTEN", da: "HVERDAGSLISTEN", fi: "ARJEN LISTA" },
  "Physical boundaries": { sv: "Fysisk gräns", no: "Fysisk grense", da: "Fysisk grænse", fi: "Fyysinen raja" },
  "One universal lock": { sv: "Ett universallås", no: "Én universallås", da: "Én universallås", fi: "Yksi yleislukko" },
  "Simple by design": { sv: "Avsiktligt enkel", no: "Enkel med vilje", da: "Enkel med vilje", fi: "Tarkoituksella yksinkertainen" },
  "The pausio collection": { sv: "pausio-kollektionen", no: "pausio-kolleksjonen", da: "pausio-kollektionen", fi: "pausio-mallisto" },
  "One timer padlock. Three box sizes. Zero negotiations with future-you.": { sv: "Ett timerlås. Tre boxstorlekar. Inga förhandlingar med ditt framtida jag.", no: "Én timerlås. Tre boksstørrelser. Ingen forhandling med ditt fremtidige jeg.", da: "Én timerlås. Tre boksstørrelser. Ingen forhandling med dit fremtidige jeg.", fi: "Yksi ajastinlukko. Kolme laatikkokokoa. Ei neuvotteluja tulevan minäsi kanssa." },
  "Box + timer lock": { sv: "Box + timerlås", no: "Boks + timerlås", da: "Boks + timerlås", fi: "Laatikko + ajastinlukko" },
  "Details": { sv: "Detaljer", no: "Detaljer", da: "Detaljer", fi: "Tiedot" },
  "Add to cart": { sv: "Lägg i varukorgen", no: "Legg i handlekurven", da: "Læg i kurven", fi: "Lisää ostoskoriin" },
  "Back to the collection": { sv: "Tillbaka till kollektionen", no: "Tilbake til kolleksjonen", da: "Tilbage til kollektionen", fi: "Takaisin mallistoon" },
  "How it locks": { sv: "Så låses den", no: "Slik låses den", da: "Sådan låses den", fi: "Näin se lukitaan" },
  "Includes one electronic timer padlock.": { sv: "Ett elektroniskt timerlås ingår.", no: "Én elektronisk timerlås følger med.", da: "Én elektronisk timerlås medfølger.", fi: "Sisältää yhden elektronisen ajastinlukon." },
  "Good for": { sv: "Passar för", no: "Passer til", da: "Velegnet til", fi: "Sopii" },
  "What's included": { sv: "Detta ingår", no: "Dette følger med", da: "Dette medfølger", fi: "Pakkauksen sisältö" },
  "A sensible warning": { sv: "En viktig varning", no: "En viktig advarsel", da: "En vigtig advarsel", fi: "Tärkeä huomautus" },
  "Quantity": { sv: "Antal", no: "Antall", da: "Antal", fi: "Määrä" },
  "Decrease quantity": { sv: "Minska antal", no: "Reduser antall", da: "Reducer antal", fi: "Vähennä määrää" },
  "Increase quantity": { sv: "Öka antal", no: "Øk antall", da: "Øg antal", fi: "Lisää määrää" },
  "Loading cart…": { sv: "Laddar varukorgen…", no: "Laster handlekurven…", da: "Indlæser kurven…", fi: "Ladataan ostoskoria…" },
  "Nothing locked in yet.": { sv: "Inget är inlåst ännu.", no: "Ingenting er låst inn ennå.", da: "Intet er låst inde endnu.", fi: "Mitään ei ole vielä lukittu." },
  "Browse Pausio.eu": { sv: "Utforska Pausio.eu", no: "Utforsk Pausio.eu", da: "Udforsk Pausio.eu", fi: "Tutustu Pausio.eu:hun" },
  "each": { sv: "styck", no: "per stykk", da: "pr. stk.", fi: "kpl" },
  "Subtotal": { sv: "Delsumma", no: "Delsum", da: "Delsum", fi: "Välisumma" },
  "Parcel-locker delivery · 3–4 days": { sv: "Leverans till paketbox · 3–4 dagar", no: "Levering til pakkeboks · 3–4 dager", da: "Levering til pakkeboks · 3–4 dage", fi: "Toimitus pakettiautomaattiin · 3–4 päivää" },
  "Continue to checkout": { sv: "Fortsätt till kassan", no: "Gå til kassen", da: "Gå til kassen", fi: "Jatka kassalle" },
  "Continue shopping": { sv: "Fortsätt handla", no: "Fortsett å handle", da: "Fortsæt med at handle", fi: "Jatka ostoksia" },
  "Preparing your cart…": { sv: "Förbereder varukorgen…", no: "Klargjør handlekurven…", da: "Gør kurven klar…", fi: "Valmistellaan ostoskoria…" },
  "Explore the collection": { sv: "Utforska kollektionen", no: "Utforsk kolleksjonen", da: "Udforsk kollektionen", fi: "Tutustu mallistoon" },
  "Checkout progress": { sv: "Kassans steg", no: "Fremdrift i kassen", da: "Kassens trin", fi: "Kassan vaiheet" },
  "Review cart": { sv: "Granska varukorgen", no: "Se gjennom handlekurven", da: "Gennemgå kurven", fi: "Tarkista ostoskori" },
  "Delivery country": { sv: "Leveransland", no: "Leveringsland", da: "Leveringsland", fi: "Toimitusmaa" },
  "Availability": { sv: "Tillgänglighet", no: "Tilgjengelighet", da: "Tilgængelighed", fi: "Saatavuus" },
  "Continue": { sv: "Fortsätt", no: "Fortsett", da: "Fortsæt", fi: "Jatka" },
  "Choose a country": { sv: "Välj ett land", no: "Velg et land", da: "Vælg et land", fi: "Valitse maa" },
  "Back": { sv: "Tillbaka", no: "Tilbake", da: "Tilbage", fi: "Takaisin" },
  "Order summary": { sv: "Ordersammanfattning", no: "Ordresammendrag", da: "Ordreoversigt", fi: "Tilausyhteenveto" },
  "Products": { sv: "Produkter", no: "Produkter", da: "Produkter", fi: "Tuotteet" },
  "Estimated total": { sv: "Beräknad totalsumma", no: "Beregnet totalsum", da: "Anslået total", fi: "Arvioitu yhteensä" },
  "Continue browsing": { sv: "Fortsätt utforska", no: "Fortsett å se", da: "Fortsæt med at kigge", fi: "Jatka selaamista" },
  "Email address": { sv: "E-postadress", no: "E-postadresse", da: "E-mailadresse", fi: "Sähköpostiosoite" },
  "Saving…": { sv: "Sparar…", no: "Lagrer…", da: "Gemmer…", fi: "Tallennetaan…" },
  "Email me when it's back": { sv: "Meddela mig när den är tillbaka", no: "Gi meg beskjed når den er tilbake", da: "Giv mig besked, når den er tilbage", fi: "Ilmoita kun tuotetta on saatavilla" },
  "Cookie settings": { sv: "Cookie-inställningar", no: "Innstillinger for informasjonskapsler", da: "Cookieindstillinger", fi: "Evästeasetukset" },
  "Accept all": { sv: "Acceptera alla", no: "Godta alle", da: "Acceptér alle", fi: "Hyväksy kaikki" },
  "Reject optional": { sv: "Avvisa valfria", no: "Avvis valgfrie", da: "Afvis valgfrie", fi: "Hylkää valinnaiset" },
  "Customize": { sv: "Anpassa", no: "Tilpass", da: "Tilpas", fi: "Mukauta" },
  "A timer-locked box that keeps phones, snacks, and other distractions out of reach until time's up.": { sv: "En box med timerlås som håller mobiler, snacks och andra distraktioner utom räckhåll tills tiden är ute.", no: "En boks med timerlås som holder mobiler, snacks og andre distraksjoner utenfor rekkevidde til tiden er ute.", da: "En boks med timerlås, der holder mobiler, snacks og andre distraktioner uden for rækkevidde, indtil tiden er gået.", fi: "Ajastinlukollinen laatikko pitää puhelimet, herkut ja muut häiriöt poissa ulottuvilta, kunnes aika on kulunut." },
  "Future-you doesn't get a vote.": { sv: "Ditt framtida jag får inte rösta.", no: "Ditt fremtidige jeg får ikke stemme.", da: "Dit fremtidige jeg har ikke stemmeret.", fi: "Tuleva minäsi ei saa ääntä." },
  "We deliver to your chosen local parcel locker across the EU, UK, Switzerland, and Norway. Choose the country now; you’ll add your phone number and delivery address in the next step.": { sv: "Vi levererar till en lokal paketbox du väljer i EU, Storbritannien, Schweiz och Norge. Välj land nu; telefonnummer och leveransadress anger du i nästa steg.", no: "Vi leverer til en lokal pakkeboks du velger i EU, Storbritannia, Sveits og Norge. Velg land nå; telefonnummer og leveringsadresse legger du til i neste trinn.", da: "Vi leverer til en lokal pakkeboks efter eget valg i EU, Storbritannien, Schweiz og Norge. Vælg land nu; telefonnummer og leveringsadresse tilføjer du i næste trin.", fi: "Toimitamme valitsemaasi paikalliseen pakettiautomaattiin EU:ssa, Isossa-Britanniassa, Sveitsissä ja Norjassa. Valitse maa nyt; lisäät puhelinnumeron ja toimitusosoitteen seuraavassa vaiheessa." },
  "Thanks — we'll keep you posted.": { sv: "Tack — vi håller dig uppdaterad.", no: "Takk — vi holder deg oppdatert.", da: "Tak — vi holder dig opdateret.", fi: "Kiitos — pidämme sinut ajan tasalla." },
  "We'll email you when Pausio.eu is back in stock.": { sv: "Vi mejlar dig när Pausio.eu finns i lager igen.", no: "Vi sender deg en e-post når Pausio.eu er på lager igjen.", da: "Vi sender dig en e-mail, når Pausio.eu er på lager igen.", fi: "Lähetämme sähköpostin, kun Pausio.eu on jälleen saatavilla." },
  "I agree to receive one email when Pausio.eu is back in stock.": { sv: "Jag godkänner att få ett mejl när Pausio.eu finns i lager igen.", no: "Jeg godtar å motta én e-post når Pausio.eu er på lager igjen.", da: "Jeg accepterer at modtage én e-mail, når Pausio.eu er på lager igen.", fi: "Hyväksyn yhden sähköpostiviestin, kun Pausio.eu on jälleen saatavilla." },
  "We will only use this address for this stock update.": { sv: "Vi använder bara adressen för denna lageruppdatering.", no: "Vi bruker bare adressen til denne lageroppdateringen.", da: "Vi bruger kun adressen til denne lageropdatering.", fi: "Käytämme osoitetta vain tähän saatavuusilmoitukseen." },
  "you@example.com": { sv: "du@exempel.se", no: "deg@eksempel.no", da: "dig@eksempel.dk", fi: "sina@esimerkki.fi" },
  "Your privacy, minus the small print gymnastics.": { sv: "Din integritet, utan krångel i det finstilta.", no: "Personvernet ditt, uten kronglete liten skrift.", da: "Dit privatliv, uden kringlet småt skrift.", fi: "Yksityisyytesi ilman pienellä painettua kiertelyä." },
  "Optional analytics help us improve the Pausio.eu shopping experience. Marketing cookies support campaign measurement. Neither is required to use the site.": { sv: "Valfri analys hjälper oss att förbättra köpupplevelsen på Pausio.eu. Marknadsföringscookies används för kampanjmätning. Inget av detta krävs för att använda webbplatsen.", no: "Valgfri analyse hjelper oss med å forbedre handleopplevelsen på Pausio.eu. Markedsføringskapsler brukes til kampanjemåling. Ingen av delene er nødvendig for å bruke nettstedet.", da: "Valgfri analyse hjælper os med at forbedre købsoplevelsen på Pausio.eu. Marketingcookies bruges til kampagnemåling. Ingen af delene er nødvendige for at bruge siden.", fi: "Valinnainen analytiikka auttaa parantamaan Pausio.eu-ostokokemusta. Markkinointievästeet tukevat kampanjoiden mittaamista. Kumpaakaan ei tarvita sivuston käyttöön." },
  "Close cookie settings": { sv: "Stäng cookie-inställningar", no: "Lukk innstillinger for informasjonskapsler", da: "Luk cookieindstillinger", fi: "Sulje evästeasetukset" },
  "Strictly necessary": { sv: "Helt nödvändiga", no: "Strengt nødvendige", da: "Strengt nødvendige", fi: "Välttämättömät" },
  "Cart, checkout state, and consent choices.": { sv: "Varukorg, kassaläge och samtyckesval.", no: "Handlekurv, kassestatus og samtykkevalg.", da: "Kurv, kassestatus og samtykkevalg.", fi: "Ostoskori, kassan tila ja suostumusvalinnat." },
  "Always on": { sv: "Alltid aktiva", no: "Alltid på", da: "Altid aktive", fi: "Aina käytössä" },
  "GA4, Clarity, and consented funnel events.": { sv: "GA4, Clarity och godkända tratthändelser.", no: "GA4, Clarity og godkjente trakt-hendelser.", da: "GA4, Clarity og godkendte tragthændelser.", fi: "GA4, Clarity ja suostumuksella kerätyt ostopolun tapahtumat." },
  "Meta Pixel campaign attribution.": { sv: "Kampanjattribuering med Meta Pixel.", no: "Kampanjeattribusjon med Meta Pixel.", da: "Kampagnetilskrivning med Meta Pixel.", fi: "Kampanjoiden kohdistus Meta Pixelillä." },
  "Save choices": { sv: "Spara val", no: "Lagre valg", da: "Gem valg", fi: "Tallenna valinnat" },
  "Analytics": { sv: "Analys", no: "Analyse", da: "Analyse", fi: "Analytiikka" },
  "Marketing": { sv: "Marknadsföring", no: "Markedsføring", da: "Marketing", fi: "Markkinointi" },
  "Do not lock away medication, emergency equipment, essential keys, or your only means of making an emergency call. Pausio.eu is not a security safe or emergency-access device.": { sv: "Lås inte in medicin, nödutrustning, viktiga nycklar eller din enda möjlighet att ringa ett nödsamtal. Pausio.eu är inte ett säkerhetsskåp eller en nödåtkomstenhet.", no: "Ikke lås inn medisiner, nødutstyr, viktige nøkler eller din eneste mulighet til å ringe etter hjelp. Pausio.eu er ikke en safe eller nødtilgangsenhet.", da: "Lås ikke medicin, nødudstyr, vigtige nøgler eller din eneste mulighed for at foretage et nødopkald inde. Pausio.eu er ikke et pengeskab eller en nødadgangsenhed.", fi: "Älä lukitse lääkkeitä, hätävarusteita, tärkeitä avaimia tai ainoaa keinoasi soittaa hätäpuhelu. Pausio.eu ei ole turvakaappi tai hätäkäyttölaite." },
  "PHONE GOES IN. LIFE HAPPENS.": { sv: "MOBILEN ÅKER IN. LIVET FORTSÄTTER.", no: "MOBILEN GÅR INN. LIVET FORTSETTER.", da: "MOBILEN RYGER IND. LIVET FORTSÆTTER.", fi: "PUHELIN SISÄÄN. ELÄMÄ JATKUU." },
  "FUTURE-YOU DOESN'T GET A VOTE.": { sv: "DITT FRAMTIDA JAG FÅR INTE RÖSTA.", no: "DITT FREMTIDIGE JEG FÅR IKKE STEMME.", da: "DIT FREMTIDIGE JEG HAR IKKE STEMMERET.", fi: "TULEVA MINÄSI EI SAA ÄÄNTÄ." },
  "LOCK YOUR STUFF. GET YOUR LIFE BACK.": { sv: "LÅS IN SAKERNA. TA TIDEN TILLBAKA.", no: "LÅS INN TINGENE. TA TIDEN TILBAKE.", da: "LÅS TINGENE INDE. TAG TIDEN TILBAGE.", fi: "LUKITSE TAVARAT. OTA AIKASI TAKAISIN." },
  "Choose what you want to stop reaching for.": { sv: "Välj det du vill sluta sträcka dig efter.", no: "Velg det du vil slutte å strekke deg etter.", da: "Vælg det, du vil holde op med at række ud efter.", fi: "Valitse asia, johon et halua enää tarttua jatkuvasti." },
  "Attach the timer padlock and choose your lockout period.": { sv: "Fäst timerlåset och välj låstid.", no: "Fest timerlåsen og velg låsetid.", da: "Fastgør timerlåsen og vælg låsetid.", fi: "Kiinnitä ajastinlukko ja valitse lukitusaika." },
  "Your stuff stays put until the timer allows the lock to open.": { sv: "Sakerna stannar där tills timern låter låset öppnas.", no: "Tingene blir der til timeren lar låsen åpnes.", da: "Tingene bliver der, indtil timeren frigiver låsen.", fi: "Tavarat pysyvät sisällä, kunnes ajastin vapauttaa lukon." },
  "Useful for whatever keeps saying “just one more”.": { sv: "För allt som fortsätter säga ”bara en till”.", no: "For alt som fortsetter å si «bare én til».", da: "Til alt det, der bliver ved med at sige »bare én til«.", fi: "Kaikelle, joka sanoo jatkuvasti ”vielä yksi”." },
  "Examples of intended use—not promises of guaranteed outcomes.": { sv: "Exempel på användning, inte löften om garanterade resultat.", no: "Eksempler på bruk, ikke løfter om garanterte resultater.", da: "Eksempler på brug, ikke løfter om garanterede resultater.", fi: "Käyttöesimerkkejä, ei lupauksia taatuista tuloksista." },
  "Put distance between an impulse and the next decision.": { sv: "Skapa avstånd mellan impulsen och nästa beslut.", no: "Skap avstand mellom impulsen og neste beslutning.", da: "Skab afstand mellem impulsen og den næste beslutning.", fi: "Luo etäisyyttä mielijohteen ja seuraavan päätöksen välille." },
  "Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.": { sv: "Ta beslutet medan du fortfarande tänker klart. Låt sedan metallen ta diskussionen.", no: "Ta valget mens du fortsatt tenker klart. La deretter metallet ta diskusjonen.", da: "Træf valget, mens du stadig tænker klart. Lad derefter metallet tage diskussionen.", fi: "Tee päätös, kun ajattelet vielä selkeästi. Anna sitten metallin hoitaa väittely." },
  "Not another notification you can ignore.": { sv: "Inte ännu en notis du kan ignorera.", no: "Ikke enda et varsel du kan ignorere.", da: "Ikke endnu en notifikation, du kan ignorere.", fi: "Ei taas yhtä ilmoitusta, jonka voit ohittaa." },
  "Use the same timer padlock with different boxes.": { sv: "Använd samma timerlås med olika boxar.", no: "Bruk samme timerlås med ulike bokser.", da: "Brug den samme timerlås med forskellige bokse.", fi: "Käytä samaa ajastinlukkoa eri laatikoissa." },
  "No app, account, or complicated setup.": { sv: "Ingen app, inget konto och ingen krånglig installation.", no: "Ingen app, konto eller komplisert oppsett.", da: "Ingen app, konto eller kompliceret opsætning.", fi: "Ei sovellusta, tiliä tai monimutkaista asennusta." },
  "THE IDEA, IN ONE LINE": { sv: "IDÉN I EN MENING", no: "IDEEN I ÉN SETNING", da: "IDÉEN I ÉN SÆTNING", fi: "AJATUS YHDELLÄ LAUSEELLA" },
  "The external timer padlock passes through the box's aligned locking loops to keep both zipper pulls together.": { sv: "Timerlåset förs genom boxens låsöglor och håller ihop båda dragkedjorna.", no: "Timerlåsen føres gjennom boksens låseløkker og holder begge glidelåsene sammen.", da: "Timerlåsen føres gennem boksens låseløkker og holder begge lynlåse sammen.", fi: "Ajastinlukko viedään laatikon lukituslenkkien läpi ja pitää vetoketjut yhdessä." },
  "Designed for suitable externally lockable containers, subject to physical compatibility.": { sv: "För lämpliga externt låsbara behållare, förutsatt fysisk kompatibilitet.", no: "For egnede beholdere som kan låses utenfra, forutsatt fysisk kompatibilitet.", da: "Til egnede beholdere, der kan låses udefra, forudsat fysisk kompatibilitet.", fi: "Sopiville ulkopuolelta lukittaville säilytysastioille fyysisen yhteensopivuuden mukaan." },
  "3–4 days to your chosen local parcel locker · €10 per order": { sv: "Inom 3–4 dagar till valfri lokal paketbox · 10 € per beställning", no: "På 3–4 dager til en lokal pakkeboks du velger · 10 € per bestilling", da: "På 3–4 dage til en lokal pakkeboks efter eget valg · 10 € pr. ordre", fi: "3–4 päivässä valitsemaasi paikalliseen pakettiautomaattiin · 10 € per tilaus" },
  "Do not use Pausio.eu for medication, emergency equipment, essential keys, or your only emergency phone. It is not a security safe.": { sv: "Använd inte Pausio.eu för medicin, nödutrustning, viktiga nycklar eller din enda nödtelefon. Den är inte ett säkerhetsskåp.", no: "Ikke bruk Pausio.eu til medisiner, nødutstyr, viktige nøkler eller din eneste nødtelefon. Den er ikke en safe.", da: "Brug ikke Pausio.eu til medicin, nødudstyr, vigtige nøgler eller din eneste nødtelefon. Den er ikke et pengeskab.", fi: "Älä käytä Pausio.eu:ta lääkkeille, hätävarusteille, tärkeille avaimille tai ainoalle hätäpuhelimellesi. Se ei ole turvakaappi." },
  "Your Pausio.eu cart": { sv: "Din Pausio.eu-varukorg", no: "Din Pausio.eu-handlekurv", da: "Din Pausio.eu-kurv", fi: "Pausio.eu-ostoskorisi" },
  "Review your selected products": { sv: "Granska dina valda produkter", no: "Se gjennom valgte produkter", da: "Gennemgå dine valgte produkter", fi: "Tarkista valitsemasi tuotteet" },
  "Close cart": { sv: "Stäng varukorgen", no: "Lukk handlekurven", da: "Luk kurven", fi: "Sulje ostoskori" },
  "Choose a box—or just the timer lock—and future-you can take it from there.": { sv: "Välj en box eller bara timerlåset och låt ditt framtida jag ta resten.", no: "Velg en boks eller bare timerlåsen, og la ditt fremtidige jeg ta resten.", da: "Vælg en boks eller kun timerlåsen, og lad dit fremtidige jeg tage resten.", fi: "Valitse laatikko tai pelkkä ajastinlukko ja anna tulevan minäsi hoitaa loput." },
  "Your chosen local parcel locker in the EU, UK, Switzerland, or Norway · flat rate per order.": { sv: "Till valfri lokal paketbox i EU, Storbritannien, Schweiz eller Norge · fast pris per beställning.", no: "Til en lokal pakkeboks du velger i EU, Storbritannia, Sveits eller Norge · fast pris per bestilling.", da: "Til en lokal pakkeboks efter eget valg i EU, Storbritannien, Schweiz eller Norge · fast pris pr. ordre.", fi: "Valitsemaasi paikalliseen pakettiautomaattiin EU:ssa, Isossa-Britanniassa, Sveitsissä tai Norjassa · kiinteä hinta per tilaus." },
  "There's nothing to review yet.": { sv: "Det finns inget att granska ännu.", no: "Det er ingenting å se gjennom ennå.", da: "Der er endnu intet at gennemgå.", fi: "Tarkistettavaa ei vielä ole." },
  "Add a Pausio.eu product to your cart before starting checkout.": { sv: "Lägg en Pausio.eu-produkt i varukorgen innan du går till kassan.", no: "Legg et Pausio.eu-produkt i handlekurven før du går til kassen.", da: "Læg et Pausio.eu-produkt i kurven, før du går til kassen.", fi: "Lisää Pausio.eu-tuote ostoskoriin ennen kassalle siirtymistä." },
  "Review your cart, choose delivery details, and check availability.": { sv: "Granska varukorgen, fyll i leveransuppgifter och kontrollera tillgängligheten.", no: "Se gjennom handlekurven, fyll inn leveringsdetaljer og sjekk tilgjengeligheten.", da: "Gennemgå kurven, udfyld leveringsoplysninger og tjek tilgængeligheden.", fi: "Tarkista ostoskori, täytä toimitustiedot ja tarkista saatavuus." },
  "Edit cart": { sv: "Redigera varukorgen", no: "Rediger handlekurven", da: "Rediger kurven", fi: "Muokkaa ostoskoria" },
  "Products subtotal": { sv: "Delsumma för produkter", no: "Delsum for produkter", da: "Delsum for produkter", fi: "Tuotteiden välisumma" },
  "Where would it go?": { sv: "Vart ska den skickas?", no: "Hvor skal den sendes?", da: "Hvor skal den sendes hen?", fi: "Minne se toimitetaan?" },
  "Your parcel-locker delivery fee is included in the order summary.": { sv: "Avgiften för leverans till paketbox ingår i ordersammanfattningen.", no: "Prisen for levering til pakkeboks er med i ordresammendraget.", da: "Prisen for levering til pakkeboks er med i ordreoversigten.", fi: "Pakettiautomaattitoimituksen hinta sisältyy tilausyhteenvetoon." },
  "We're sorry — Pausio.eu is currently out of stock.": { sv: "Tyvärr är Pausio.eu tillfälligt slut i lager.", no: "Beklager, Pausio.eu er midlertidig utsolgt.", da: "Beklager, Pausio.eu er midlertidigt udsolgt.", fi: "Pahoittelemme, Pausio.eu on tällä hetkellä loppuunmyyty." },
  "Leave your email and we'll let you know when it is available again, or check back in a week.": { sv: "Lämna din e-post så meddelar vi när den finns igen, eller kom tillbaka om en vecka.", no: "Legg igjen e-posten din, så sier vi fra når den er tilbake, eller sjekk igjen om en uke.", da: "Efterlad din e-mail, så giver vi besked, når den er tilbage, eller kig igen om en uge.", fi: "Jätä sähköpostisi, niin ilmoitamme kun tuotetta on taas saatavilla, tai palaa viikon kuluttua." },
  "Before you ask": { sv: "Bra att veta", no: "Greit å vite", da: "Godt at vide", fi: "Hyvä tietää" },
  "The sensible questions.": { sv: "De viktiga frågorna.", no: "De viktige spørsmålene.", da: "De vigtige spørgsmål.", fi: "Tärkeät kysymykset." },
  "Everything you need to choose a box and use your timer lock responsibly.": { sv: "Allt du behöver veta för att välja box och använda timerlåset ansvarsfullt.", no: "Alt du trenger for å velge boks og bruke timerlåsen ansvarlig.", da: "Alt du skal vide for at vælge boks og bruge timerlåsen ansvarligt.", fi: "Kaikki tarvittava laatikon valintaan ja ajastinlukon vastuulliseen käyttöön." },
  "Use common sense.": { sv: "Använd sunt förnuft.", no: "Bruk sunn fornuft.", da: "Brug sund fornuft.", fi: "Käytä tervettä järkeä." },
  "Email me when it’s back": { sv: "Meddela mig när den är tillbaka", no: "Gi meg beskjed når den er tilbake", da: "Giv mig besked, når den er tilbage", fi: "Ilmoita kun tuotetta on saatavilla" },
  "STEP 01": { sv: "STEG 01", no: "TRINN 01", da: "TRIN 01", fi: "VAIHE 01" },
  "STEP 02": { sv: "STEG 02", no: "TRINN 02", da: "TRIN 02", fi: "VAIHE 02" },
  "STEP 03": { sv: "STEG 03", no: "TRINN 03", da: "TRIN 03", fi: "VAIHE 03" },
  "STEP 04": { sv: "STEG 04", no: "TRINN 04", da: "TRIN 04", fi: "VAIHE 04" },
};

const EUROPEAN_TEXT: Record<EuropeanLocale, Record<string, string>> = {
  nl: {
    "Language": "Taal", "EU, UK, Switzerland & Norway": "EU, VK, Zwitserland en Noorwegen", "3–4 days to your chosen local parcel locker": "Binnen 3–4 dagen naar je gekozen lokale pakketautomaat", "€10 per order": "€10 per bestelling",
    "How it works": "Zo werkt het", "Why a timer lockbox?": "Waarom een timerbox?", "Explore": "Ontdek", "Privacy": "Privacy", "Terms": "Voorwaarden", "Elsewhere": "Contact", "Contact details coming soon": "Contactgegevens volgen binnenkort",
    "See how it works": "Bekijk hoe het werkt", "One lock. Three sizes.": "Eén slot. Drie maten.", "No app required.": "Geen app nodig.", "Simple timer control.": "Eenvoudige timerbediening.",
    "PHONE GOES IN. LIFE HAPPENS.": "TELEFOON ERIN. LEVEN AAN.", "FUTURE-YOU DOESN'T GET A VOTE.": "JE TOEKOMSTIGE IK HEEFT GEEN STEM.", "LOCK YOUR STUFF. GET YOUR LIFE BACK.": "SLUIT JE SPULLEN OP. PAK JE LEVEN TERUG.",
    "The pausio collection": "De pausio-collectie", "One timer padlock. Three box sizes. Zero negotiations with future-you.": "Eén timerslot. Drie boxformaten. Geen onderhandelingen met je toekomstige ik.", "Box + timer lock": "Box + timerslot", "Details": "Details", "Add to cart": "In winkelmand",
    "Almost suspiciously simple": "Bijna verdacht eenvoudig", "Put it inside": "Leg het erin", "Set the timer": "Stel de timer in", "Get on with your life": "Ga verder met je dag", "Choose what you want to stop reaching for.": "Kies waar je niet steeds meer naar wilt grijpen.", "Attach the timer padlock and choose your lockout period.": "Bevestig het timerslot en kies de vergrendeltijd.", "Your stuff stays put until the timer allows the lock to open.": "Je spullen blijven liggen tot de timer het slot vrijgeeft.",
    "Pick your temptation": "Kies je verleiding", "Useful for whatever keeps saying “just one more”.": "Voor alles wat blijft zeggen: ‘nog eentje dan’.", "Examples of intended use—not promises of guaranteed outcomes.": "Voorbeelden van gebruik, geen garantie op resultaten.", "THE EVERYDAY SHORTLIST": "DE DAGELIJKSE SELECTIE", "Put distance between an impulse and the next decision.": "Zet afstand tussen een impuls en je volgende beslissing.", "Phone, snacks, controller, or bottle—the box does not judge. It just keeps the agreement you made earlier.": "Telefoon, snacks, controller of fles: de box oordeelt niet. Hij bewaakt alleen de afspraak die je eerder maakte.",
    "Physical boundaries": "Een fysieke grens", "Not another notification you can ignore.": "Geen melding die je gewoon kunt negeren.", "One universal lock": "Eén universeel slot", "Use the same timer padlock with different boxes.": "Gebruik hetzelfde timerslot met verschillende boxen.", "Simple by design": "Bewust eenvoudig", "No app, account, or complicated setup.": "Geen app, account of ingewikkelde installatie.", "Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.": "Maak de keuze terwijl je nog helder denkt. Laat daarna een stukje metaal de discussie voeren.", "THE IDEA, IN ONE LINE": "HET IDEE IN ÉÉN ZIN",
    "Back to the collection": "Terug naar de collectie", "How it locks": "Zo sluit het", "Includes one electronic timer padlock.": "Inclusief één elektronisch timerslot.", "Good for": "Geschikt voor", "What's included": "Inbegrepen", "A sensible warning": "Een belangrijke waarschuwing", "Quantity": "Aantal", "Decrease quantity": "Aantal verlagen", "Increase quantity": "Aantal verhogen",
    "Your Pausio.eu cart": "Je Pausio.eu-winkelmand", "Review your selected products": "Bekijk je gekozen producten", "Close cart": "Winkelmand sluiten", "Loading cart…": "Winkelmand laden…", "Nothing locked in yet.": "Nog niets gekozen.", "Browse Pausio.eu": "Bekijk Pausio.eu", "each": "per stuk", "Subtotal": "Subtotaal", "Parcel-locker delivery · 3–4 days": "Levering naar pakketautomaat · 3–4 dagen", "Continue to checkout": "Doorgaan naar afrekenen", "Continue shopping": "Verder winkelen",
    "Checkout progress": "Voortgang", "Review cart": "Winkelmand bekijken", "Delivery country": "Land van levering", "Availability": "Beschikbaarheid", "Continue": "Doorgaan", "Choose a country": "Kies een land", "Back": "Terug", "Order summary": "Besteloverzicht", "Products": "Producten", "Products subtotal": "Subtotaal producten", "Estimated total": "Geschat totaal", "Continue browsing": "Verder kijken", "Where would it go?": "Waar moet het naartoe?", "Edit cart": "Winkelmand wijzigen", "Explore the collection": "Bekijk de collectie", "Preparing your cart…": "Winkelmand voorbereiden…", "STEP 01": "STAP 01", "STEP 02": "STAP 02", "STEP 03": "STAP 03", "STEP 04": "STAP 04",
    "We're sorry — Pausio.eu is currently out of stock.": "Sorry, Pausio.eu is momenteel uitverkocht.", "Leave your email and we'll let you know when it is available again, or check back in a week.": "Laat je e-mailadres achter; we laten weten wanneer het weer beschikbaar is. Je kunt ook over een week terugkomen.",
    "Email address": "E-mailadres", "Saving…": "Opslaan…", "Email me when it’s back": "Laat me weten wanneer het terug is", "Thanks — we'll keep you posted.": "Bedankt — we houden je op de hoogte.", "We'll email you when Pausio.eu is back in stock.": "We mailen je wanneer Pausio.eu weer op voorraad is.", "I agree to receive one email when Pausio.eu is back in stock.": "Ik ga akkoord met één e-mail wanneer Pausio.eu weer op voorraad is.", "We will only use this address for this stock update.": "We gebruiken dit adres alleen voor deze voorraadmelding.",
    "Before you ask": "Goed om te weten", "The sensible questions.": "De belangrijke vragen.", "Everything you need to choose a box and use your timer lock responsibly.": "Alles wat je nodig hebt om een box te kiezen en je timerslot verantwoord te gebruiken.", "Use common sense.": "Gebruik je gezonde verstand.",
    "Cookie settings": "Cookie-instellingen", "Accept all": "Alles accepteren", "Reject optional": "Optionele weigeren", "Customize": "Aanpassen", "Save choices": "Keuzes opslaan", "Strictly necessary": "Strikt noodzakelijk", "Always on": "Altijd actief", "Analytics": "Analyse", "Marketing": "Marketing"
  },
  it: {
    "Language": "Lingua", "EU, UK, Switzerland & Norway": "UE, Regno Unito, Svizzera e Norvegia", "3–4 days to your chosen local parcel locker": "In 3–4 giorni al locker locale scelto", "€10 per order": "10 € per ordine",
    "How it works": "Come funziona", "Why a timer lockbox?": "Perché una box con timer?", "Explore": "Scopri", "Privacy": "Privacy", "Terms": "Termini", "Elsewhere": "Contatti", "Contact details coming soon": "Contatti disponibili a breve",
    "See how it works": "Scopri come funziona", "One lock. Three sizes.": "Un lucchetto. Tre misure.", "No app required.": "Nessuna app.", "Simple timer control.": "Timer semplice.",
    "PHONE GOES IN. LIFE HAPPENS.": "IL TELEFONO ENTRA. LA VITA CONTINUA.", "FUTURE-YOU DOESN'T GET A VOTE.": "IL TUO IO FUTURO NON VOTA.", "LOCK YOUR STUFF. GET YOUR LIFE BACK.": "CHIUDI LE COSE. RIPRENDI LA TUA VITA.",
    "The pausio collection": "La collezione pausio", "One timer padlock. Three box sizes. Zero negotiations with future-you.": "Un lucchetto a tempo. Tre misure. Zero trattative con il tuo io futuro.", "Box + timer lock": "Box + lucchetto a tempo", "Details": "Dettagli", "Add to cart": "Aggiungi al carrello",
    "Almost suspiciously simple": "Quasi sospettosamente semplice", "Put it inside": "Mettilo dentro", "Set the timer": "Imposta il timer", "Get on with your life": "Continua la tua giornata", "Choose what you want to stop reaching for.": "Scegli cosa vuoi smettere di cercare continuamente.", "Attach the timer padlock and choose your lockout period.": "Collega il lucchetto a tempo e scegli la durata.", "Your stuff stays put until the timer allows the lock to open.": "Le tue cose restano ferme finché il timer non sblocca il lucchetto.",
    "Pick your temptation": "Scegli la tentazione", "Useful for whatever keeps saying “just one more”.": "Utile per tutto ciò che continua a dire ‘solo un altro’.", "Examples of intended use—not promises of guaranteed outcomes.": "Esempi d'uso, non promesse di risultati garantiti.", "THE EVERYDAY SHORTLIST": "LA LISTA QUOTIDIANA", "Put distance between an impulse and the next decision.": "Metti distanza tra un impulso e la prossima decisione.", "Phone, snacks, controller, or bottle—the box does not judge. It just keeps the agreement you made earlier.": "Telefono, snack, controller o bottiglia: la box non giudica. Mantiene solo l'accordo che hai preso prima.",
    "Physical boundaries": "Un limite fisico", "Not another notification you can ignore.": "Non un'altra notifica da ignorare.", "One universal lock": "Un lucchetto universale", "Use the same timer padlock with different boxes.": "Usa lo stesso lucchetto con box diverse.", "Simple by design": "Semplice per scelta", "No app, account, or complicated setup.": "Nessuna app, account o configurazione complicata.", "Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.": "Decidi mentre ragioni ancora lucidamente. Poi lascia la discussione a un pezzo di metallo.", "THE IDEA, IN ONE LINE": "L'IDEA IN UNA FRASE",
    "Back to the collection": "Torna alla collezione", "How it locks": "Come si chiude", "Includes one electronic timer padlock.": "Include un lucchetto elettronico a tempo.", "Good for": "Ideale per", "What's included": "Cosa include", "A sensible warning": "Un'avvertenza importante", "Quantity": "Quantità", "Decrease quantity": "Riduci quantità", "Increase quantity": "Aumenta quantità",
    "Your Pausio.eu cart": "Il tuo carrello Pausio.eu", "Review your selected products": "Controlla i prodotti scelti", "Close cart": "Chiudi carrello", "Loading cart…": "Caricamento carrello…", "Nothing locked in yet.": "Non hai ancora scelto nulla.", "Browse Pausio.eu": "Scopri Pausio.eu", "each": "cad.", "Subtotal": "Subtotale", "Parcel-locker delivery · 3–4 days": "Consegna al locker · 3–4 giorni", "Continue to checkout": "Vai al checkout", "Continue shopping": "Continua gli acquisti",
    "Checkout progress": "Avanzamento checkout", "Review cart": "Controlla il carrello", "Delivery country": "Paese di consegna", "Availability": "Disponibilità", "Continue": "Continua", "Choose a country": "Scegli un paese", "Back": "Indietro", "Order summary": "Riepilogo ordine", "Products": "Prodotti", "Products subtotal": "Subtotale prodotti", "Estimated total": "Totale stimato", "Continue browsing": "Continua a esplorare", "Where would it go?": "Dove va consegnato?", "Edit cart": "Modifica carrello", "Explore the collection": "Scopri la collezione", "Preparing your cart…": "Preparazione del carrello…", "STEP 01": "PASSO 01", "STEP 02": "PASSO 02", "STEP 03": "PASSO 03", "STEP 04": "PASSO 04",
    "We're sorry — Pausio.eu is currently out of stock.": "Ci dispiace: Pausio.eu è attualmente esaurito.", "Leave your email and we'll let you know when it is available again, or check back in a week.": "Lascia la tua e-mail e ti avviseremo quando sarà di nuovo disponibile, oppure ricontrolla tra una settimana.",
    "Email address": "Indirizzo e-mail", "Saving…": "Salvataggio…", "Email me when it’s back": "Avvisami quando torna", "Thanks — we'll keep you posted.": "Grazie — ti terremo aggiornato.", "We'll email you when Pausio.eu is back in stock.": "Ti scriveremo quando Pausio.eu tornerà disponibile.", "I agree to receive one email when Pausio.eu is back in stock.": "Accetto di ricevere un'e-mail quando Pausio.eu tornerà disponibile.", "We will only use this address for this stock update.": "Useremo questo indirizzo solo per questo aggiornamento.",
    "Before you ask": "Prima di chiedere", "The sensible questions.": "Le domande importanti.", "Everything you need to choose a box and use your timer lock responsibly.": "Tutto ciò che serve per scegliere una box e usare responsabilmente il lucchetto.", "Use common sense.": "Usa il buon senso.",
    "Cookie settings": "Impostazioni cookie", "Accept all": "Accetta tutto", "Reject optional": "Rifiuta gli opzionali", "Customize": "Personalizza", "Save choices": "Salva scelte", "Strictly necessary": "Strettamente necessari", "Always on": "Sempre attivi", "Analytics": "Analisi", "Marketing": "Marketing"
  },
  es: {
    "Language": "Idioma", "EU, UK, Switzerland & Norway": "UE, Reino Unido, Suiza y Noruega", "3–4 days to your chosen local parcel locker": "En 3–4 días a la taquilla de paquetería local que elijas", "€10 per order": "10 € por pedido",
    "How it works": "Cómo funciona", "Why a timer lockbox?": "¿Por qué una caja con temporizador?", "Explore": "Descubre", "Privacy": "Privacidad", "Terms": "Términos", "Elsewhere": "Contacto", "Contact details coming soon": "Datos de contacto próximamente",
    "See how it works": "Mira cómo funciona", "One lock. Three sizes.": "Un candado. Tres tamaños.", "No app required.": "Sin aplicación.", "Simple timer control.": "Temporizador sencillo.",
    "PHONE GOES IN. LIFE HAPPENS.": "EL MÓVIL ENTRA. LA VIDA SIGUE.", "FUTURE-YOU DOESN'T GET A VOTE.": "TU YO FUTURO NO VOTA.", "LOCK YOUR STUFF. GET YOUR LIFE BACK.": "ENCIERRA TUS COSAS. RECUPERA TU VIDA.",
    "The pausio collection": "La colección pausio", "One timer padlock. Three box sizes. Zero negotiations with future-you.": "Un candado con temporizador. Tres tamaños. Cero negociaciones con tu yo futuro.", "Box + timer lock": "Caja + candado con temporizador", "Details": "Detalles", "Add to cart": "Añadir al carrito",
    "Almost suspiciously simple": "Casi sospechosamente sencillo", "Put it inside": "Mételo dentro", "Set the timer": "Programa el temporizador", "Get on with your life": "Sigue con tu día", "Choose what you want to stop reaching for.": "Elige aquello que quieres dejar de buscar constantemente.", "Attach the timer padlock and choose your lockout period.": "Coloca el candado y elige el tiempo de bloqueo.", "Your stuff stays put until the timer allows the lock to open.": "Tus cosas se quedan dentro hasta que el temporizador permita abrir.",
    "Pick your temptation": "Elige tu tentación", "Useful for whatever keeps saying “just one more”.": "Para todo lo que sigue diciendo ‘solo uno más’.", "Examples of intended use—not promises of guaranteed outcomes.": "Ejemplos de uso, no promesas de resultados garantizados.", "THE EVERYDAY SHORTLIST": "LA LISTA COTIDIANA", "Put distance between an impulse and the next decision.": "Pon distancia entre un impulso y la siguiente decisión.", "Phone, snacks, controller, or bottle—the box does not judge. It just keeps the agreement you made earlier.": "Móvil, snacks, mando o botella: la caja no juzga. Solo mantiene el acuerdo que hiciste antes.",
    "Physical boundaries": "Un límite físico", "Not another notification you can ignore.": "No es otra notificación que puedas ignorar.", "One universal lock": "Un candado universal", "Use the same timer padlock with different boxes.": "Usa el mismo candado con diferentes cajas.", "Simple by design": "Simple a propósito", "No app, account, or complicated setup.": "Sin aplicación, cuenta ni configuración complicada.", "Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.": "Decide mientras aún piensas con claridad. Después deja la discusión en manos de un trozo de metal.", "THE IDEA, IN ONE LINE": "LA IDEA EN UNA FRASE",
    "Back to the collection": "Volver a la colección", "How it locks": "Cómo se cierra", "Includes one electronic timer padlock.": "Incluye un candado electrónico con temporizador.", "Good for": "Ideal para", "What's included": "Qué incluye", "A sensible warning": "Una advertencia importante", "Quantity": "Cantidad", "Decrease quantity": "Reducir cantidad", "Increase quantity": "Aumentar cantidad",
    "Your Pausio.eu cart": "Tu carrito de Pausio.eu", "Review your selected products": "Revisa los productos seleccionados", "Close cart": "Cerrar carrito", "Loading cart…": "Cargando carrito…", "Nothing locked in yet.": "Todavía no has elegido nada.", "Browse Pausio.eu": "Explora Pausio.eu", "each": "cada uno", "Subtotal": "Subtotal", "Parcel-locker delivery · 3–4 days": "Entrega a taquilla de paquetería · 3–4 días", "Continue to checkout": "Continuar al pago", "Continue shopping": "Seguir comprando",
    "Checkout progress": "Progreso del pago", "Review cart": "Revisar carrito", "Delivery country": "País de entrega", "Availability": "Disponibilidad", "Continue": "Continuar", "Choose a country": "Elige un país", "Back": "Atrás", "Order summary": "Resumen del pedido", "Products": "Productos", "Products subtotal": "Subtotal de productos", "Estimated total": "Total estimado", "Continue browsing": "Seguir explorando", "Where would it go?": "¿Dónde lo enviamos?", "Edit cart": "Editar carrito", "Explore the collection": "Explorar la colección", "Preparing your cart…": "Preparando tu carrito…", "STEP 01": "PASO 01", "STEP 02": "PASO 02", "STEP 03": "PASO 03", "STEP 04": "PASO 04",
    "We're sorry — Pausio.eu is currently out of stock.": "Lo sentimos: Pausio.eu está agotado actualmente.", "Leave your email and we'll let you know when it is available again, or check back in a week.": "Déjanos tu correo y te avisaremos cuando vuelva a estar disponible, o vuelve dentro de una semana.",
    "Email address": "Correo electrónico", "Saving…": "Guardando…", "Email me when it’s back": "Avísame cuando vuelva", "Thanks — we'll keep you posted.": "Gracias — te mantendremos informado.", "We'll email you when Pausio.eu is back in stock.": "Te enviaremos un correo cuando Pausio.eu vuelva a estar disponible.", "I agree to receive one email when Pausio.eu is back in stock.": "Acepto recibir un correo cuando Pausio.eu vuelva a estar disponible.", "We will only use this address for this stock update.": "Solo usaremos esta dirección para este aviso de existencias.",
    "Before you ask": "Antes de preguntar", "The sensible questions.": "Las preguntas importantes.", "Everything you need to choose a box and use your timer lock responsibly.": "Todo lo necesario para elegir una caja y usar el candado responsablemente.", "Use common sense.": "Usa el sentido común.",
    "Cookie settings": "Configuración de cookies", "Accept all": "Aceptar todo", "Reject optional": "Rechazar opcionales", "Customize": "Personalizar", "Save choices": "Guardar opciones", "Strictly necessary": "Estrictamente necesarias", "Always on": "Siempre activas", "Analytics": "Analítica", "Marketing": "Marketing"
  },
  pl: {
    "Language": "Język", "EU, UK, Switzerland & Norway": "UE, Wielka Brytania, Szwajcaria i Norwegia", "3–4 days to your chosen local parcel locker": "W 3–4 dni do wybranego lokalnego automatu paczkowego", "€10 per order": "10 € za zamówienie",
    "How it works": "Jak to działa", "Why a timer lockbox?": "Dlaczego pudełko z timerem?", "Explore": "Odkryj", "Privacy": "Prywatność", "Terms": "Warunki", "Elsewhere": "Kontakt", "Contact details coming soon": "Dane kontaktowe wkrótce",
    "See how it works": "Zobacz, jak to działa", "One lock. Three sizes.": "Jedna kłódka. Trzy rozmiary.", "No app required.": "Bez aplikacji.", "Simple timer control.": "Prosty timer.",
    "PHONE GOES IN. LIFE HAPPENS.": "TELEFON DO ŚRODKA. ŻYCIE TOCZY SIĘ DALEJ.", "FUTURE-YOU DOESN'T GET A VOTE.": "TWOJE PRZYSZŁE JA NIE GŁOSUJE.", "LOCK YOUR STUFF. GET YOUR LIFE BACK.": "ZAMKNIJ RZECZY. ODZYSKAJ SWÓJ CZAS.",
    "The pausio collection": "Kolekcja pausio", "One timer padlock. Three box sizes. Zero negotiations with future-you.": "Jedna kłódka czasowa. Trzy rozmiary. Zero negocjacji z przyszłym sobą.", "Box + timer lock": "Pudełko + kłódka czasowa", "Details": "Szczegóły", "Add to cart": "Dodaj do koszyka",
    "Almost suspiciously simple": "Podejrzanie proste", "Put it inside": "Włóż do środka", "Set the timer": "Ustaw timer", "Get on with your life": "Wracaj do swojego dnia", "Choose what you want to stop reaching for.": "Wybierz rzecz, po którą chcesz przestać ciągle sięgać.", "Attach the timer padlock and choose your lockout period.": "Załóż kłódkę i wybierz czas zamknięcia.", "Your stuff stays put until the timer allows the lock to open.": "Rzeczy pozostają w środku, aż timer pozwoli otworzyć zamek.",
    "Pick your temptation": "Wybierz pokusę", "Useful for whatever keeps saying “just one more”.": "Do wszystkiego, co mówi: ‘jeszcze tylko raz’.", "Examples of intended use—not promises of guaranteed outcomes.": "Przykłady zastosowania, nie gwarancje rezultatów.", "THE EVERYDAY SHORTLIST": "CODZIENNA LISTA", "Put distance between an impulse and the next decision.": "Oddziel impuls od następnej decyzji.", "Phone, snacks, controller, or bottle—the box does not judge. It just keeps the agreement you made earlier.": "Telefon, przekąski, pad czy butelka: pudełko nie ocenia. Po prostu pilnuje wcześniejszej decyzji.",
    "Physical boundaries": "Fizyczna granica", "Not another notification you can ignore.": "Nie kolejne powiadomienie, które możesz zignorować.", "One universal lock": "Jedna uniwersalna kłódka", "Use the same timer padlock with different boxes.": "Używaj tej samej kłódki z różnymi pudełkami.", "Simple by design": "Celowo proste", "No app, account, or complicated setup.": "Bez aplikacji, konta i skomplikowanej konfiguracji.", "Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.": "Podejmij decyzję, gdy myślisz rozsądnie. Potem oddaj spór kawałkowi metalu.", "THE IDEA, IN ONE LINE": "POMYSŁ W JEDNYM ZDANIU",
    "Back to the collection": "Wróć do kolekcji", "How it locks": "Jak się zamyka", "Includes one electronic timer padlock.": "Zawiera jedną elektroniczną kłódkę czasową.", "Good for": "Dobre do", "What's included": "W zestawie", "A sensible warning": "Ważne ostrzeżenie", "Quantity": "Ilość", "Decrease quantity": "Zmniejsz ilość", "Increase quantity": "Zwiększ ilość",
    "Your Pausio.eu cart": "Twój koszyk Pausio.eu", "Review your selected products": "Sprawdź wybrane produkty", "Close cart": "Zamknij koszyk", "Loading cart…": "Ładowanie koszyka…", "Nothing locked in yet.": "Koszyk jest jeszcze pusty.", "Browse Pausio.eu": "Przeglądaj Pausio.eu", "each": "za sztukę", "Subtotal": "Suma częściowa", "Parcel-locker delivery · 3–4 days": "Dostawa do automatu paczkowego · 3–4 dni", "Continue to checkout": "Przejdź do kasy", "Continue shopping": "Kontynuuj zakupy",
    "Checkout progress": "Postęp zamówienia", "Review cart": "Sprawdź koszyk", "Delivery country": "Kraj dostawy", "Availability": "Dostępność", "Continue": "Dalej", "Choose a country": "Wybierz kraj", "Back": "Wstecz", "Order summary": "Podsumowanie zamówienia", "Products": "Produkty", "Products subtotal": "Suma produktów", "Estimated total": "Szacowana suma", "Continue browsing": "Przeglądaj dalej", "Where would it go?": "Dokąd wysłać?", "Edit cart": "Edytuj koszyk", "Explore the collection": "Zobacz kolekcję", "Preparing your cart…": "Przygotowywanie koszyka…", "STEP 01": "KROK 01", "STEP 02": "KROK 02", "STEP 03": "KROK 03", "STEP 04": "KROK 04",
    "We're sorry — Pausio.eu is currently out of stock.": "Przepraszamy — Pausio.eu jest obecnie wyprzedany.", "Leave your email and we'll let you know when it is available again, or check back in a week.": "Zostaw e-mail, a damy znać, gdy produkt wróci, albo zajrzyj ponownie za tydzień.",
    "Email address": "Adres e-mail", "Saving…": "Zapisywanie…", "Email me when it’s back": "Powiadom mnie o dostępności", "Thanks — we'll keep you posted.": "Dziękujemy — damy Ci znać.", "We'll email you when Pausio.eu is back in stock.": "Napiszemy, gdy Pausio.eu wróci do magazynu.", "I agree to receive one email when Pausio.eu is back in stock.": "Zgadzam się na jedną wiadomość e-mail, gdy Pausio.eu wróci do magazynu.", "We will only use this address for this stock update.": "Użyjemy tego adresu tylko do powiadomienia o dostępności.",
    "Before you ask": "Zanim zapytasz", "The sensible questions.": "Najważniejsze pytania.", "Everything you need to choose a box and use your timer lock responsibly.": "Wszystko, czego potrzebujesz, by wybrać pudełko i odpowiedzialnie używać kłódki.", "Use common sense.": "Kieruj się zdrowym rozsądkiem.",
    "Cookie settings": "Ustawienia plików cookie", "Accept all": "Akceptuj wszystkie", "Reject optional": "Odrzuć opcjonalne", "Customize": "Dostosuj", "Save choices": "Zapisz wybór", "Strictly necessary": "Niezbędne", "Always on": "Zawsze aktywne", "Analytics": "Analityka", "Marketing": "Marketing"
  },
  cs: {
    "Language": "Jazyk", "EU, UK, Switzerland & Norway": "EU, Spojené království, Švýcarsko a Norsko", "3–4 days to your chosen local parcel locker": "Za 3–4 dny do zvoleného místního výdejního boxu", "€10 per order": "10 € za objednávku",
    "How it works": "Jak to funguje", "Why a timer lockbox?": "Proč box s časovým zámkem?", "Explore": "Prozkoumat", "Privacy": "Soukromí", "Terms": "Podmínky", "Elsewhere": "Kontakt", "Contact details coming soon": "Kontaktní údaje již brzy",
    "See how it works": "Podívejte se, jak to funguje", "One lock. Three sizes.": "Jeden zámek. Tři velikosti.", "No app required.": "Bez aplikace.", "Simple timer control.": "Jednoduchý časovač.",
    "PHONE GOES IN. LIFE HAPPENS.": "TELEFON DOVNITŘ. ŽIVOT POKRAČUJE.", "FUTURE-YOU DOESN'T GET A VOTE.": "VAŠE BUDOUCÍ JÁ NEMÁ HLAS.", "LOCK YOUR STUFF. GET YOUR LIFE BACK.": "ZAMKNĚTE VĚCI. ZÍSKEJTE SVŮJ ČAS ZPĚT.",
    "The pausio collection": "Kolekce pausio", "One timer padlock. Three box sizes. Zero negotiations with future-you.": "Jeden časový zámek. Tři velikosti boxů. Žádné vyjednávání s budoucím já.", "Box + timer lock": "Box + časový zámek", "Details": "Podrobnosti", "Add to cart": "Přidat do košíku",
    "Almost suspiciously simple": "Téměř podezřele jednoduché", "Put it inside": "Vložte to dovnitř", "Set the timer": "Nastavte časovač", "Get on with your life": "Pokračujte ve svém dni", "Choose what you want to stop reaching for.": "Vyberte, po čem už nechcete neustále sahat.", "Attach the timer padlock and choose your lockout period.": "Připevněte časový zámek a zvolte dobu uzamčení.", "Your stuff stays put until the timer allows the lock to open.": "Věci zůstanou uvnitř, dokud časovač nedovolí zámek otevřít.",
    "Pick your temptation": "Vyberte své pokušení", "Useful for whatever keeps saying “just one more”.": "Pro vše, co pořád říká ‚ještě jednou‘.", "Examples of intended use—not promises of guaranteed outcomes.": "Příklady použití, nikoli záruka výsledků.", "THE EVERYDAY SHORTLIST": "KAŽDODENNÍ SEZNAM", "Put distance between an impulse and the next decision.": "Vytvořte odstup mezi impulzem a dalším rozhodnutím.", "Phone, snacks, controller, or bottle—the box does not judge. It just keeps the agreement you made earlier.": "Telefon, svačina, ovladač nebo láhev: box nesoudí. Jen drží dohodu, kterou jste uzavřeli dříve.",
    "Physical boundaries": "Fyzická hranice", "Not another notification you can ignore.": "Ne další upozornění, které můžete ignorovat.", "One universal lock": "Jeden univerzální zámek", "Use the same timer padlock with different boxes.": "Používejte stejný zámek s různými boxy.", "Simple by design": "Záměrně jednoduché", "No app, account, or complicated setup.": "Bez aplikace, účtu a složitého nastavení.", "Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.": "Rozhodněte se, dokud uvažujete rozumně. Pak předejte spor kousku kovu.", "THE IDEA, IN ONE LINE": "MYŠLENKA V JEDNÉ VĚTĚ",
    "Back to the collection": "Zpět ke kolekci", "How it locks": "Jak se zamyká", "Includes one electronic timer padlock.": "Obsahuje jeden elektronický časový zámek.", "Good for": "Vhodné pro", "What's included": "Obsah balení", "A sensible warning": "Důležité upozornění", "Quantity": "Množství", "Decrease quantity": "Snížit množství", "Increase quantity": "Zvýšit množství",
    "Your Pausio.eu cart": "Váš košík Pausio.eu", "Review your selected products": "Zkontrolujte vybrané produkty", "Close cart": "Zavřít košík", "Loading cart…": "Načítání košíku…", "Nothing locked in yet.": "Košík je zatím prázdný.", "Browse Pausio.eu": "Prohlédnout Pausio.eu", "each": "za kus", "Subtotal": "Mezisoučet", "Parcel-locker delivery · 3–4 days": "Doručení do výdejního boxu · 3–4 dny", "Continue to checkout": "Pokračovat k pokladně", "Continue shopping": "Pokračovat v nákupu",
    "Checkout progress": "Průběh objednávky", "Review cart": "Zkontrolovat košík", "Delivery country": "Země doručení", "Availability": "Dostupnost", "Continue": "Pokračovat", "Choose a country": "Vyberte zemi", "Back": "Zpět", "Order summary": "Souhrn objednávky", "Products": "Produkty", "Products subtotal": "Mezisoučet produktů", "Estimated total": "Odhadovaná celková cena", "Continue browsing": "Pokračovat v prohlížení", "Where would it go?": "Kam zásilku poslat?", "Edit cart": "Upravit košík", "Explore the collection": "Prozkoumat kolekci", "Preparing your cart…": "Připravujeme košík…", "STEP 01": "KROK 01", "STEP 02": "KROK 02", "STEP 03": "KROK 03", "STEP 04": "KROK 04",
    "We're sorry — Pausio.eu is currently out of stock.": "Omlouváme se — Pausio.eu je momentálně vyprodán.", "Leave your email and we'll let you know when it is available again, or check back in a week.": "Zanechte e-mail a dáme vám vědět, až bude produkt opět dostupný, nebo se vraťte za týden.",
    "Email address": "E-mailová adresa", "Saving…": "Ukládání…", "Email me when it’s back": "Upozornit na dostupnost", "Thanks — we'll keep you posted.": "Děkujeme — dáme vám vědět.", "We'll email you when Pausio.eu is back in stock.": "Napíšeme vám, až bude Pausio.eu opět skladem.", "I agree to receive one email when Pausio.eu is back in stock.": "Souhlasím s jedním e-mailem, až bude Pausio.eu opět skladem.", "We will only use this address for this stock update.": "Adresu použijeme pouze pro toto oznámení o dostupnosti.",
    "Before you ask": "Než se zeptáte", "The sensible questions.": "Důležité otázky.", "Everything you need to choose a box and use your timer lock responsibly.": "Vše, co potřebujete k výběru boxu a zodpovědnému používání zámku.", "Use common sense.": "Používejte zdravý rozum.",
    "Cookie settings": "Nastavení cookies", "Accept all": "Přijmout vše", "Reject optional": "Odmítnout volitelné", "Customize": "Přizpůsobit", "Save choices": "Uložit volby", "Strictly necessary": "Nezbytné", "Always on": "Vždy aktivní", "Analytics": "Analytika", "Marketing": "Marketing"
  }
};

const EUROPEAN_EXTRA: Record<string, Record<EuropeanLocale, string>> = {
  "A timer-locked box that keeps phones, snacks, and other distractions out of reach until time's up.": { nl: "Een box met timerslot die telefoons, snacks en andere afleidingen buiten bereik houdt tot de tijd voorbij is.", it: "Una box con lucchetto a tempo che tiene telefoni, snack e altre distrazioni fuori portata fino allo scadere del tempo.", es: "Una caja con temporizador que mantiene móviles, snacks y otras distracciones fuera de alcance hasta que termina el tiempo.", pl: "Pudełko z kłódką czasową, które trzyma telefony, przekąski i inne rozpraszacze poza zasięgiem do końca czasu.", cs: "Box s časovým zámkem, který udrží telefony, svačiny a další rozptýlení mimo dosah až do konce času." },
  "Future-you doesn't get a vote.": { nl: "Je toekomstige ik heeft geen stem.", it: "Il tuo io futuro non vota.", es: "Tu yo futuro no vota.", pl: "Twoje przyszłe ja nie głosuje.", cs: "Vaše budoucí já nemá hlas." },
  "There's nothing to review yet.": { nl: "Er is nog niets om te bekijken.", it: "Non c'è ancora nulla da controllare.", es: "Todavía no hay nada que revisar.", pl: "Nie ma jeszcze nic do sprawdzenia.", cs: "Zatím není co kontrolovat." },
  "Add a Pausio.eu product to your cart before starting checkout.": { nl: "Voeg eerst een Pausio.eu-product toe aan je winkelmand.", it: "Aggiungi un prodotto Pausio.eu al carrello prima del checkout.", es: "Añade un producto Pausio.eu al carrito antes de iniciar el pago.", pl: "Dodaj produkt Pausio.eu do koszyka przed przejściem do kasy.", cs: "Před zahájením objednávky přidejte produkt Pausio.eu do košíku." },
  "Review your cart, choose delivery details, and check availability.": { nl: "Bekijk je winkelmand, vul de bezorggegevens in en controleer de beschikbaarheid.", it: "Controlla il carrello, completa i dati di consegna e verifica la disponibilità.", es: "Revisa el carrito, completa los datos de entrega y comprueba la disponibilidad.", pl: "Sprawdź koszyk, uzupełnij dane dostawy i zobacz dostępność.", cs: "Zkontrolujte košík, doplňte údaje doručení a ověřte dostupnost." },
  "We deliver to your chosen local parcel locker across the EU, UK, Switzerland, and Norway. Choose the country now; you’ll add your phone number and delivery address in the next step.": { nl: "We leveren bij een lokale pakketautomaat naar keuze in de EU, het VK, Zwitserland en Noorwegen. Kies nu het land; telefoonnummer en bezorgadres vul je in de volgende stap in.", it: "Consegniamo al locker locale scelto nell’UE, Regno Unito, Svizzera e Norvegia. Scegli ora il paese; inserirai telefono e indirizzo di consegna nel passaggio successivo.", es: "Entregamos en la taquilla de paquetería local que elijas en la UE, Reino Unido, Suiza y Noruega. Elige ahora el país; añadirás el teléfono y la dirección de entrega en el siguiente paso.", pl: "Dostarczamy do wybranego lokalnego automatu paczkowego w UE, Wielkiej Brytanii, Szwajcarii i Norwegii. Wybierz teraz kraj; numer telefonu i adres dostawy podasz w następnym kroku.", cs: "Doručujeme do zvoleného místního výdejního boxu v EU, Spojeném království, Švýcarsku a Norsku. Nyní vyberte zemi; telefon a doručovací adresu zadáte v dalším kroku." },
  "Your parcel-locker delivery fee is included in the order summary.": { nl: "De kosten voor levering naar de pakketautomaat staan in het besteloverzicht.", it: "Il costo della consegna al locker è incluso nel riepilogo.", es: "El coste de entrega en la taquilla de paquetería está incluido en el resumen.", pl: "Koszt dostawy do automatu paczkowego jest uwzględniony w podsumowaniu.", cs: "Cena doručení do výdejního boxu je zahrnuta v souhrnu objednávky." },
  "Choose a box—or just the timer lock—and future-you can take it from there.": { nl: "Kies een box of alleen het timerslot; je toekomstige ik doet de rest.", it: "Scegli una box o solo il lucchetto; al resto penserà il tuo io futuro.", es: "Elige una caja o solo el candado; tu yo futuro se encargará del resto.", pl: "Wybierz pudełko lub samą kłódkę, a resztą zajmie się przyszłe ja.", cs: "Vyberte box nebo jen zámek a zbytek nechte na svém budoucím já." },
  "Your chosen local parcel locker in the EU, UK, Switzerland, or Norway · flat rate per order.": { nl: "Naar een lokale pakketautomaat naar keuze in de EU, het VK, Zwitserland of Noorwegen · vast tarief per bestelling.", it: "Al locker locale scelto nell’UE, Regno Unito, Svizzera o Norvegia · tariffa fissa per ordine.", es: "A la taquilla de paquetería local que elijas en la UE, Reino Unido, Suiza o Noruega · tarifa fija por pedido.", pl: "Do wybranego lokalnego automatu paczkowego w UE, Wielkiej Brytanii, Szwajcarii lub Norwegii · stała opłata za zamówienie.", cs: "Do zvoleného místního výdejního boxu v EU, Spojeném království, Švýcarsku nebo Norsku · pevná sazba za objednávku." },
  "3–4 days to your chosen local parcel locker · €10 per order": { nl: "Binnen 3–4 dagen naar je gekozen lokale pakketautomaat · €10 per bestelling", it: "In 3–4 giorni al locker locale scelto · 10 € per ordine", es: "En 3–4 días a la taquilla de paquetería local que elijas · 10 € por pedido", pl: "W 3–4 dni do wybranego lokalnego automatu paczkowego · 10 € za zamówienie", cs: "Za 3–4 dny do zvoleného místního výdejního boxu · 10 € za objednávku" },
  "Do not use Pausio.eu for medication, emergency equipment, essential keys, or your only emergency phone. It is not a security safe.": { nl: "Gebruik Pausio.eu niet voor medicijnen, noodapparatuur, essentiële sleutels of je enige noodtelefoon. Het is geen kluis.", it: "Non usare Pausio.eu per farmaci, attrezzature di emergenza, chiavi essenziali o il tuo unico telefono. Non è una cassaforte.", es: "No uses Pausio.eu para medicamentos, equipos de emergencia, llaves esenciales ni tu único teléfono. No es una caja fuerte.", pl: "Nie używaj Pausio.eu do leków, sprzętu ratunkowego, ważnych kluczy ani jedynego telefonu. To nie jest sejf.", cs: "Nepoužívejte Pausio.eu na léky, nouzové vybavení, důležité klíče ani jediný telefon. Nejde o bezpečnostní trezor." },
  "Do not lock away medication, emergency equipment, essential keys, or your only means of making an emergency call. Pausio.eu is not a security safe or emergency-access device.": { nl: "Sluit geen medicijnen, noodapparatuur, essentiële sleutels of je enige noodtelefoon op. Pausio.eu is geen kluis of noodvoorziening.", it: "Non chiudere farmaci, attrezzature di emergenza, chiavi essenziali o l'unico mezzo per chiamare aiuto. Pausio.eu non è una cassaforte.", es: "No encierres medicamentos, equipos de emergencia, llaves esenciales ni tu único medio para llamar a emergencias. Pausio.eu no es una caja fuerte.", pl: "Nie zamykaj leków, sprzętu ratunkowego, ważnych kluczy ani jedynego środka wezwania pomocy. Pausio.eu nie jest sejfem.", cs: "Nezamykávejte léky, nouzové vybavení, důležité klíče ani jediný prostředek nouzového volání. Pausio.eu není trezor." },
  "Your privacy, minus the small print gymnastics.": { nl: "Je privacy, zonder acrobatiek in de kleine lettertjes.", it: "La tua privacy, senza acrobazie nelle clausole.", es: "Tu privacidad, sin malabarismos con la letra pequeña.", pl: "Twoja prywatność, bez gimnastyki w drobnym druku.", cs: "Vaše soukromí bez kliček v drobném písmu." },
  "Optional analytics help us improve the Pausio.eu shopping experience. Marketing cookies support campaign measurement. Neither is required to use the site.": { nl: "Optionele analyse helpt ons de winkelervaring te verbeteren. Marketingcookies meten campagnes. Geen van beide is nodig om de site te gebruiken.", it: "Le analisi facoltative ci aiutano a migliorare l'esperienza. I cookie marketing misurano le campagne. Nessuno dei due è necessario.", es: "La analítica opcional mejora la experiencia. Las cookies de marketing miden campañas. Ninguna es necesaria para usar el sitio.", pl: "Opcjonalna analityka pomaga ulepszać zakupy. Marketingowe pliki cookie mierzą kampanie. Żadne nie są wymagane.", cs: "Volitelná analytika pomáhá zlepšovat nákup. Marketingové cookies měří kampaně. Ani jedno není nutné." },
  "Close cookie settings": { nl: "Cookie-instellingen sluiten", it: "Chiudi impostazioni cookie", es: "Cerrar configuración de cookies", pl: "Zamknij ustawienia cookies", cs: "Zavřít nastavení cookies" },
  "Cart, checkout state, and consent choices.": { nl: "Winkelmand, checkoutstatus en toestemmingskeuzes.", it: "Carrello, stato del checkout e scelte di consenso.", es: "Carrito, estado del pago y opciones de consentimiento.", pl: "Koszyk, stan zamówienia i wybory zgody.", cs: "Košík, stav objednávky a volby souhlasu." },
  "GA4, Clarity, and consented funnel events.": { nl: "GA4, Clarity en goedgekeurde funnelgebeurtenissen.", it: "GA4, Clarity ed eventi del percorso autorizzati.", es: "GA4, Clarity y eventos autorizados del embudo.", pl: "GA4, Clarity i zaakceptowane zdarzenia lejka.", cs: "GA4, Clarity a odsouhlasené události nákupní cesty." },
  "Meta Pixel campaign attribution.": { nl: "Campagnetoeschrijving via Meta Pixel.", it: "Attribuzione campagne con Meta Pixel.", es: "Atribución de campañas con Meta Pixel.", pl: "Atrybucja kampanii przez Meta Pixel.", cs: "Přiřazení kampaní pomocí Meta Pixelu." }
};

const CHECKOUT_SET_TEXT: Record<string, Partial<Record<Locale, string>>> = {
  "Box size": { sv: "Boxstorlek", no: "Boksstørrelse", da: "Boksstørrelse", fi: "Laatikon koko", nl: "Boxformaat", it: "Dimensione box", es: "Tamaño de caja", pl: "Rozmiar pudełka", cs: "Velikost boxu" },
  "Suitable for": { sv: "Passar för", no: "Passer til", da: "Velegnet til", fi: "Sopii", nl: "Geschikt voor", it: "Ideale per", es: "Ideal para", pl: "Odpowiednie do", cs: "Vhodné pro" },
  "Complete set": { sv: "Komplett set", no: "Komplett sett", da: "Komplet sæt", fi: "Täydellinen setti", nl: "Complete set", it: "Set completo", es: "Conjunto completo", pl: "Pełny zestaw", cs: "Kompletní sada" },
  "Final dimensions to be confirmed": { sv: "Slutliga mått bekräftas senare", no: "Endelige mål bekreftes senere", da: "Endelige mål bekræftes senere", fi: "Lopulliset mitat vahvistetaan myöhemmin", nl: "Definitieve afmetingen worden nog bevestigd", it: "Dimensioni finali da confermare", es: "Dimensiones finales pendientes de confirmación", pl: "Ostateczne wymiary do potwierdzenia", cs: "Konečné rozměry budou potvrzeny" },
};

export function localize<T>(locale: Locale, english: T, german: T, french: T): T {
  if (locale === "de") return german;
  if (locale === "fr") return french;
  if (NORDIC_LOCALES.includes(locale as NordicLocale)) {
    if (typeof english === "string") return (NORDIC_TEXT[english]?.[locale as NordicLocale] ?? CHECKOUT_SET_TEXT[english]?.[locale] ?? english) as T;
    if (Array.isArray(english)) return english.map((item) => typeof item === "string" ? NORDIC_TEXT[item]?.[locale as NordicLocale] ?? CHECKOUT_SET_TEXT[item]?.[locale] ?? item : item) as T;
  }
  if (EUROPEAN_LOCALES.includes(locale as EuropeanLocale)) {
    if (typeof english === "string") return (EUROPEAN_TEXT[locale as EuropeanLocale]?.[english] ?? EUROPEAN_EXTRA[english]?.[locale as EuropeanLocale] ?? CHECKOUT_SET_TEXT[english]?.[locale] ?? english) as T;
    if (Array.isArray(english)) return english.map((item) => typeof item === "string" ? EUROPEAN_TEXT[locale as EuropeanLocale]?.[item] ?? EUROPEAN_EXTRA[item]?.[locale as EuropeanLocale] ?? CHECKOUT_SET_TEXT[item]?.[locale] ?? item : item) as T;
  }
  return english;
}

type GermanProductCopy = {
  name: string;
  catalogueName: string;
  shortDescription: string;
  description: string;
  intendedUses: string[];
  included: string[];
};

export const GERMAN_PRODUCTS: Record<ProductId, GermanProductCopy> = {
  "timer-lock": {
    name: "Elektronisches Zeitschloss",
    catalogueName: "Zeitschloss",
    shortDescription: "Schon eine Box da? Dann fehlt nur noch das Schloss.",
    description: "Ein elektronisches Zeitschloss, das bewusst Abstand zwischen dir und den Dingen schafft, nach denen du ständig greifst.",
    intendedUses: ["Geeignete abschließbare Behälter", "Reiseetuis", "Persönliche Aufbewahrung"],
    included: ["Ein elektronisches Zeitschloss", "Passendes Ladezubehör"],
  },
  "box-s": {
    name: "S BOX + Zeitschloss",
    catalogueName: "S BOX",
    shortDescription: "Perfekt für dein Handy und kleine Versuchungen.",
    description: "Eine kompakte, abschließbare Box für die kleinen Ablenkungen, die erstaunlich viel von deinem Tag verschlucken.",
    intendedUses: ["Smartphone", "Gaming-Controller", "Süßigkeiten", "Kleine persönliche Gegenstände"],
    included: ["Eine S BOX", "Ein elektronisches Zeitschloss"],
  },
  "box-m": {
    name: "M BOX + Zeitschloss",
    catalogueName: "M BOX",
    shortDescription: "Mehr Platz für alles, was heute Pause hat.",
    description: "Die praktische Mitte: genug Platz für mehrere Geräte, Snacks oder die Flasche, die keine weitere Runde braucht.",
    intendedUses: ["Mehrere Smartphones", "Snacks", "Flaschen", "Elektronisches Zubehör"],
    included: ["Eine M BOX", "Ein elektronisches Zeitschloss"],
  },
  "box-l": {
    name: "L BOX + Zeitschloss",
    catalogueName: "L BOX",
    shortDescription: "Wenn der ganze Haushalt eine Pause braucht.",
    description: "Unsere geräumigste Box für größere Dinge, mehrere Geräte oder eine gemeinsame Abmachung mit deinem späteren Ich.",
    intendedUses: ["Mehrere Geräte", "Größere Gegenstände", "Familiennutzung", "Haushaltsgegenstände"],
    included: ["Eine L BOX", "Ein elektronisches Zeitschloss"],
  },
};

export const FRENCH_PRODUCTS: Record<ProductId, GermanProductCopy> = {
  "timer-lock": {
    name: "Cadenas électronique à minuterie",
    catalogueName: "Cadenas à minuterie",
    shortDescription: "Vous avez déjà une boîte ? Il ne manque que le cadenas.",
    description: "Un cadenas électronique à minuterie qui crée une vraie distance entre vous et les objets que vous saisissez trop souvent.",
    intendedUses: ["Contenants verrouillables adaptés", "Trousses de voyage", "Rangement personnel"],
    included: ["Un cadenas électronique à minuterie", "Accessoires de charge adaptés"],
  },
  "box-s": {
    name: "S BOX + cadenas à minuterie",
    catalogueName: "S BOX",
    shortDescription: "Parfaite pour votre téléphone et les petites tentations.",
    description: "Une boîte verrouillable compacte pour les petites distractions qui finissent par prendre une grande partie de votre journée.",
    intendedUses: ["Smartphone", "Manette de jeu", "Friandises", "Petits objets personnels"],
    included: ["Une S BOX", "Un cadenas électronique à minuterie"],
  },
  "box-m": {
    name: "M BOX + cadenas à minuterie",
    catalogueName: "M BOX",
    shortDescription: "Plus de place pour ce qui mérite une pause.",
    description: "Le juste milieu : assez de place pour plusieurs appareils, des snacks ou la bouteille qui n’a pas besoin d’un autre verre.",
    intendedUses: ["Plusieurs smartphones", "Snacks", "Bouteilles", "Accessoires électroniques"],
    included: ["Une M BOX", "Un cadenas électronique à minuterie"],
  },
  "box-l": {
    name: "L BOX + cadenas à minuterie",
    catalogueName: "L BOX",
    shortDescription: "Quand toute la maison a besoin d’une pause.",
    description: "Notre boîte la plus spacieuse, conçue pour les objets volumineux, plusieurs appareils ou un accord collectif avec votre futur vous.",
    intendedUses: ["Plusieurs appareils", "Objets volumineux", "Usage familial", "Objets du quotidien"],
    included: ["Une L BOX", "Un cadenas électronique à minuterie"],
  },
};

export const NORDIC_PRODUCTS: Record<NordicLocale, Record<ProductId, GermanProductCopy>> = {
  sv: {
    "timer-lock": { name: "Elektroniskt timerlås", catalogueName: "Timerlås", shortDescription: "Har du redan en låda? Då saknas bara låset.", description: "Ett elektroniskt timerlås som skapar avstånd mellan dig och det du försöker sluta sträcka dig efter.", intendedUses: ["Lämpliga låsbara behållare", "Resefodral", "Personlig förvaring"], included: ["Ett elektroniskt timerlås", "Passande laddningstillbehör"] },
    "box-s": { name: "S BOX + timerlås", catalogueName: "S BOX", shortDescription: "Perfekt för mobilen och mindre frestelser.", description: "En kompakt låsbar box för de små distraktionerna som tar förvånansvärt mycket av dagen.", intendedUses: ["Smartphone", "Spelkontroll", "Godis", "Små personliga föremål"], included: ["En S BOX", "Ett elektroniskt timerlås"] },
    "box-m": { name: "M BOX + timerlås", catalogueName: "M BOX", shortDescription: "Mer plats för det som behöver en paus.", description: "Det praktiska mellanläget: plats för flera enheter, snacks eller flaskan som inte behöver en runda till.", intendedUses: ["Flera smartphones", "Snacks", "Flaskor", "Elektroniktillbehör"], included: ["En M BOX", "Ett elektroniskt timerlås"] },
    "box-l": { name: "L BOX + timerlås", catalogueName: "L BOX", shortDescription: "När hela hushållet behöver en paus.", description: "Vår rymligaste box för större saker, flera enheter eller en gemensam överenskommelse med ditt framtida jag.", intendedUses: ["Flera enheter", "Större föremål", "Familjeanvändning", "Hushållsförvaring"], included: ["En L BOX", "Ett elektroniskt timerlås"] },
  },
  no: {
    "timer-lock": { name: "Elektronisk timerlås", catalogueName: "Timerlås", shortDescription: "Har du allerede en boks? Da mangler du bare låsen.", description: "En elektronisk timerlås som skaper avstand mellom deg og det du stadig strekker deg etter.", intendedUses: ["Egnede låsbare beholdere", "Reiseetuier", "Personlig oppbevaring"], included: ["Én elektronisk timerlås", "Passende ladetilbehør"] },
    "box-s": { name: "S BOX + timerlås", catalogueName: "S BOX", shortDescription: "Perfekt for mobilen og små fristelser.", description: "En kompakt låsbar boks for de små distraksjonene som tar overraskende mye av dagen.", intendedUses: ["Smarttelefon", "Spillkontroller", "Godteri", "Små personlige eiendeler"], included: ["Én S BOX", "Én elektronisk timerlås"] },
    "box-m": { name: "M BOX + timerlås", catalogueName: "M BOX", shortDescription: "Mer plass til det som trenger en pause.", description: "Den praktiske mellomstørrelsen: plass til flere enheter, snacks eller flasken som ikke trenger en runde til.", intendedUses: ["Flere smarttelefoner", "Snacks", "Flasker", "Elektronisk tilbehør"], included: ["Én M BOX", "Én elektronisk timerlås"] },
    "box-l": { name: "L BOX + timerlås", catalogueName: "L BOX", shortDescription: "Når hele husstanden trenger en pause.", description: "Vår romsligste boks for større ting, flere enheter eller en felles avtale med ditt fremtidige jeg.", intendedUses: ["Flere enheter", "Større gjenstander", "Familiebruk", "Oppbevaring i hjemmet"], included: ["Én L BOX", "Én elektronisk timerlås"] },
  },
  da: {
    "timer-lock": { name: "Elektronisk timerlås", catalogueName: "Timerlås", shortDescription: "Har du allerede en boks? Så mangler du kun låsen.", description: "En elektronisk timerlås, der skaber afstand mellem dig og det, du bliver ved med at række ud efter.", intendedUses: ["Egnede aflåselige beholdere", "Rejseetuier", "Personlig opbevaring"], included: ["Én elektronisk timerlås", "Passende ladetilbehør"] },
    "box-s": { name: "S BOX + timerlås", catalogueName: "S BOX", shortDescription: "Perfekt til mobilen og små fristelser.", description: "En kompakt aflåselig boks til de små distraktioner, der tager overraskende meget af dagen.", intendedUses: ["Smartphone", "Spilcontroller", "Slik", "Små personlige ejendele"], included: ["Én S BOX", "Én elektronisk timerlås"] },
    "box-m": { name: "M BOX + timerlås", catalogueName: "M BOX", shortDescription: "Mere plads til det, der har brug for en pause.", description: "Den praktiske mellemstørrelse: plads til flere enheder, snacks eller flasken, der ikke behøver en omgang mere.", intendedUses: ["Flere smartphones", "Snacks", "Flasker", "Elektronisk tilbehør"], included: ["Én M BOX", "Én elektronisk timerlås"] },
    "box-l": { name: "L BOX + timerlås", catalogueName: "L BOX", shortDescription: "Når hele husstanden har brug for en pause.", description: "Vores rummeligste boks til større ting, flere enheder eller en fælles aftale med dit fremtidige jeg.", intendedUses: ["Flere enheder", "Større genstande", "Familiebrug", "Opbevaring i hjemmet"], included: ["Én L BOX", "Én elektronisk timerlås"] },
  },
  fi: {
    "timer-lock": { name: "Elektroninen ajastinlukko", catalogueName: "Ajastinlukko", shortDescription: "Onko sinulla jo laatikko? Tarvitset vain lukon.", description: "Elektroninen ajastinlukko luo etäisyyttä sinun ja jatkuvasti houkuttelevien tavaroiden välille.", intendedUses: ["Sopivat lukittavat säilytysastiat", "Matkakotelot", "Henkilökohtainen säilytys"], included: ["Yksi elektroninen ajastinlukko", "Sopivat lataustarvikkeet"] },
    "box-s": { name: "S BOX + ajastinlukko", catalogueName: "S BOX", shortDescription: "Täydellinen puhelimelle ja pienille houkutuksille.", description: "Kompakti lukittava laatikko pienille häiriötekijöille, jotka vievät yllättävän suuren osan päivästä.", intendedUses: ["Älypuhelin", "Peliohjain", "Makeiset", "Pienet henkilökohtaiset tavarat"], included: ["Yksi S BOX", "Yksi elektroninen ajastinlukko"] },
    "box-m": { name: "M BOX + ajastinlukko", catalogueName: "M BOX", shortDescription: "Enemmän tilaa taukoa tarvitseville tavaroille.", description: "Käytännöllinen keskikoko: tilaa useille laitteille, välipaloille tai pullolle, joka ei tarvitse uutta kierrosta.", intendedUses: ["Useita älypuhelimia", "Välipalat", "Pullot", "Elektroniikkatarvikkeet"], included: ["Yksi M BOX", "Yksi elektroninen ajastinlukko"] },
    "box-l": { name: "L BOX + ajastinlukko", catalogueName: "L BOX", shortDescription: "Kun koko kotitalous tarvitsee tauon.", description: "Tilavin laatikkomme suuremmille tavaroille, useille laitteille tai koko perheen yhteiselle sopimukselle.", intendedUses: ["Useita laitteita", "Suuremmat tavarat", "Perhekäyttö", "Kodintavaroiden säilytys"], included: ["Yksi L BOX", "Yksi elektroninen ajastinlukko"] },
  },
};

const EUROPEAN_PRODUCTS: Record<EuropeanLocale, Record<ProductId, GermanProductCopy>> = {
  nl: {
    "timer-lock": { name: "Elektronisch timerslot", catalogueName: "Timerslot", shortDescription: "Heb je al een box? Dan ontbreekt alleen het slot.", description: "Een elektronisch timerslot dat bewust afstand schept tussen jou en de spullen waar je steeds naar grijpt.", intendedUses: ["Geschikte afsluitbare bakken", "Reisetuis", "Persoonlijke opslag"], included: ["Eén elektronisch timerslot", "Bijpassende laadaccessoires"] },
    "box-s": { name: "S BOX + timerslot", catalogueName: "S BOX", shortDescription: "Perfect voor je telefoon en kleine verleidingen.", description: "Een compacte afsluitbare box voor kleine afleidingen die verrassend veel van je dag opslokken.", intendedUses: ["Smartphone", "Gamecontroller", "Snoep", "Kleine persoonlijke spullen"], included: ["Eén S BOX", "Eén elektronisch timerslot"] },
    "box-m": { name: "M BOX + timerslot", catalogueName: "M BOX", shortDescription: "Meer ruimte voor alles wat even pauze nodig heeft.", description: "De praktische middenmaat: ruimte voor meerdere apparaten, snacks of de fles die geen volgende ronde nodig heeft.", intendedUses: ["Meerdere smartphones", "Snacks", "Flessen", "Elektronische accessoires"], included: ["Eén M BOX", "Eén elektronisch timerslot"] },
    "box-l": { name: "L BOX + timerslot", catalogueName: "L BOX", shortDescription: "Wanneer het hele huishouden een time-out nodig heeft.", description: "Onze ruimste box voor grotere spullen, meerdere apparaten of een gezamenlijke afspraak met je toekomstige ik.", intendedUses: ["Meerdere apparaten", "Grotere voorwerpen", "Gezinsgebruik", "Huishoudelijke opslag"], included: ["Eén L BOX", "Eén elektronisch timerslot"] }
  },
  it: {
    "timer-lock": { name: "Lucchetto elettronico a tempo", catalogueName: "Lucchetto a tempo", shortDescription: "Hai già una box? Ti manca solo il lucchetto.", description: "Un lucchetto elettronico a tempo che crea una pausa tra te e ciò che continui a cercare.", intendedUses: ["Contenitori richiudibili compatibili", "Custodie da viaggio", "Oggetti personali"], included: ["Un lucchetto elettronico a tempo", "Accessori di ricarica compatibili"] },
    "box-s": { name: "S BOX + lucchetto a tempo", catalogueName: "S BOX", shortDescription: "Perfetta per il telefono e le piccole tentazioni.", description: "Una box compatta richiudibile per le piccole distrazioni che occupano sorprendentemente tanto tempo.", intendedUses: ["Smartphone", "Controller", "Dolci", "Piccoli oggetti personali"], included: ["Una S BOX", "Un lucchetto elettronico a tempo"] },
    "box-m": { name: "M BOX + lucchetto a tempo", catalogueName: "M BOX", shortDescription: "Più spazio per ciò che ha bisogno di una pausa.", description: "La pratica misura intermedia: spazio per più dispositivi, snack o la bottiglia che non ha bisogno di un altro giro.", intendedUses: ["Più smartphone", "Snack", "Bottiglie", "Accessori elettronici"], included: ["Una M BOX", "Un lucchetto elettronico a tempo"] },
    "box-l": { name: "L BOX + lucchetto a tempo", catalogueName: "L BOX", shortDescription: "Quando tutta la casa ha bisogno di una pausa.", description: "La box più capiente per oggetti grandi, più dispositivi o un accordo di famiglia con il vostro io futuro.", intendedUses: ["Più dispositivi", "Oggetti grandi", "Uso familiare", "Oggetti domestici"], included: ["Una L BOX", "Un lucchetto elettronico a tempo"] }
  },
  es: {
    "timer-lock": { name: "Candado electrónico con temporizador", catalogueName: "Candado con temporizador", shortDescription: "¿Ya tienes una caja? Solo te falta el candado.", description: "Un candado electrónico que crea una pausa consciente entre tú y aquello que sigues buscando.", intendedUses: ["Contenedores con cierre compatibles", "Estuches de viaje", "Objetos personales"], included: ["Un candado electrónico con temporizador", "Accesorios de carga compatibles"] },
    "box-s": { name: "S BOX + candado con temporizador", catalogueName: "S BOX", shortDescription: "Perfecta para tu móvil y las pequeñas tentaciones.", description: "Una caja compacta con cierre para las pequeñas distracciones que ocupan demasiado tiempo.", intendedUses: ["Smartphone", "Mando de videojuegos", "Dulces", "Objetos personales pequeños"], included: ["Una S BOX", "Un candado electrónico con temporizador"] },
    "box-m": { name: "M BOX + candado con temporizador", catalogueName: "M BOX", shortDescription: "Más espacio para lo que necesita una pausa.", description: "El punto medio práctico: espacio para varios dispositivos, snacks o la botella que no necesita otra ronda.", intendedUses: ["Varios smartphones", "Snacks", "Botellas", "Accesorios electrónicos"], included: ["Una M BOX", "Un candado electrónico con temporizador"] },
    "box-l": { name: "L BOX + candado con temporizador", catalogueName: "L BOX", shortDescription: "Cuando toda la casa necesita un descanso.", description: "Nuestra caja más amplia para objetos grandes, varios dispositivos o un acuerdo familiar con vuestro yo futuro.", intendedUses: ["Varios dispositivos", "Objetos grandes", "Uso familiar", "Almacenamiento doméstico"], included: ["Una L BOX", "Un candado electrónico con temporizador"] }
  },
  pl: {
    "timer-lock": { name: "Elektroniczna kłódka czasowa", catalogueName: "Kłódka czasowa", shortDescription: "Masz już pudełko? Potrzebujesz tylko kłódki.", description: "Elektroniczna kłódka czasowa tworząca świadomy dystans między Tobą a rzeczami, po które ciągle sięgasz.", intendedUses: ["Odpowiednie zamykane pojemniki", "Etui podróżne", "Przechowywanie osobiste"], included: ["Jedna elektroniczna kłódka czasowa", "Pasujące akcesoria do ładowania"] },
    "box-s": { name: "S BOX + kłódka czasowa", catalogueName: "S BOX", shortDescription: "Idealne na telefon i małe pokusy.", description: "Kompaktowe zamykane pudełko na drobne rozpraszacze, które zabierają zaskakująco dużo dnia.", intendedUses: ["Smartfon", "Kontroler", "Słodycze", "Małe przedmioty osobiste"], included: ["Jedno S BOX", "Jedna elektroniczna kłódka czasowa"] },
    "box-m": { name: "M BOX + kłódka czasowa", catalogueName: "M BOX", shortDescription: "Więcej miejsca na rzeczy, które potrzebują przerwy.", description: "Praktyczny środek: miejsce na kilka urządzeń, przekąski albo butelkę, która nie potrzebuje kolejnej rundy.", intendedUses: ["Kilka smartfonów", "Przekąski", "Butelki", "Akcesoria elektroniczne"], included: ["Jedno M BOX", "Jedna elektroniczna kłódka czasowa"] },
    "box-l": { name: "L BOX + kłódka czasowa", catalogueName: "L BOX", shortDescription: "Gdy całe gospodarstwo domowe potrzebuje przerwy.", description: "Największe pudełko na większe rzeczy, kilka urządzeń lub wspólną umowę z przyszłym sobą.", intendedUses: ["Kilka urządzeń", "Większe przedmioty", "Użytek rodzinny", "Przechowywanie domowe"], included: ["Jedno L BOX", "Jedna elektroniczna kłódka czasowa"] }
  },
  cs: {
    "timer-lock": { name: "Elektronický časový zámek", catalogueName: "Časový zámek", shortDescription: "Už máte box? Chybí vám jen zámek.", description: "Elektronický časový zámek, který vytvoří odstup mezi vámi a věcmi, po nichž stále saháte.", intendedUses: ["Vhodné uzamykatelné nádoby", "Cestovní pouzdra", "Osobní úložné prostory"], included: ["Jeden elektronický časový zámek", "Odpovídající nabíjecí příslušenství"] },
    "box-s": { name: "S BOX + časový zámek", catalogueName: "S BOX", shortDescription: "Ideální pro telefon a menší pokušení.", description: "Kompaktní uzamykatelný box na malé rozptýlení, které zabírá překvapivě velkou část dne.", intendedUses: ["Smartphone", "Herní ovladač", "Sladkosti", "Drobné osobní věci"], included: ["Jeden S BOX", "Jeden elektronický časový zámek"] },
    "box-m": { name: "M BOX + časový zámek", catalogueName: "M BOX", shortDescription: "Více místa pro věci, které potřebují pauzu.", description: "Praktická střední velikost: prostor pro několik zařízení, svačiny nebo láhev, která nepotřebuje další kolo.", intendedUses: ["Více telefonů", "Svačiny", "Lahve", "Elektronické příslušenství"], included: ["Jeden M BOX", "Jeden elektronický časový zámek"] },
    "box-l": { name: "L BOX + časový zámek", catalogueName: "L BOX", shortDescription: "Když celá domácnost potřebuje pauzu.", description: "Náš nejprostornější box na větší věci, několik zařízení nebo rodinnou dohodu s vaším budoucím já.", intendedUses: ["Více zařízení", "Větší předměty", "Rodinné použití", "Domácí skladování"], included: ["Jeden L BOX", "Jeden elektronický časový zámek"] }
  }
};

const BOX_LABELS: Record<Exclude<Locale, "en">, Record<"box-s" | "box-m" | "box-l", string>> = {
  de: { "box-s": "Kleine Box", "box-m": "Mittlere Box", "box-l": "Große Box" },
  fr: { "box-s": "Petite boîte", "box-m": "Boîte moyenne", "box-l": "Grande boîte" },
  sv: { "box-s": "Liten box", "box-m": "Mellanstor box", "box-l": "Stor box" },
  no: { "box-s": "Liten boks", "box-m": "Mellomstor boks", "box-l": "Stor boks" },
  da: { "box-s": "Lille boks", "box-m": "Mellemstor boks", "box-l": "Stor boks" },
  fi: { "box-s": "Pieni laatikko", "box-m": "Keskikokoinen laatikko", "box-l": "Suuri laatikko" },
  nl: { "box-s": "Kleine box", "box-m": "Middelgrote box", "box-l": "Grote box" },
  it: { "box-s": "Box piccola", "box-m": "Box media", "box-l": "Box grande" },
  es: { "box-s": "Caja pequeña", "box-m": "Caja mediana", "box-l": "Caja grande" },
  pl: { "box-s": "Małe pudełko", "box-m": "Średnie pudełko", "box-l": "Duże pudełko" },
  cs: { "box-s": "Malý box", "box-m": "Střední box", "box-l": "Velký box" },
};

export function getLocalizedProductCopy(locale: Locale, productId: ProductId) {
  let products: Record<ProductId, GermanProductCopy> | undefined;
  if (locale === "de") products = GERMAN_PRODUCTS;
  else if (locale === "fr") products = FRENCH_PRODUCTS;
  else if (NORDIC_LOCALES.includes(locale as NordicLocale)) products = NORDIC_PRODUCTS[locale as NordicLocale];
  else if (EUROPEAN_LOCALES.includes(locale as EuropeanLocale)) products = EUROPEAN_PRODUCTS[locale as EuropeanLocale];
  if (!products) return undefined;

  const copy = products[productId];
  if (productId === "timer-lock") return copy;
  const boxName = BOX_LABELS[locale as Exclude<Locale, "en">][productId];
  return { ...copy, name: `${boxName} + ${products["timer-lock"].catalogueName}`, catalogueName: boxName, included: [`1 × ${boxName}`, copy.included[1]] };
}

export const GERMAN_COUNTRIES: Record<string, string> = {
  Austria: "Österreich", Belgium: "Belgien", Bulgaria: "Bulgarien", Croatia: "Kroatien", Cyprus: "Zypern",
  Czechia: "Tschechien", Denmark: "Dänemark", Estonia: "Estland", Finland: "Finnland", France: "Frankreich",
  Germany: "Deutschland", Greece: "Griechenland", Hungary: "Ungarn", Ireland: "Irland", Italy: "Italien",
  Latvia: "Lettland", Lithuania: "Litauen", Luxembourg: "Luxemburg", Malta: "Malta", Netherlands: "Niederlande",
  Poland: "Polen", Portugal: "Portugal", Romania: "Rumänien", Slovakia: "Slowakei", Slovenia: "Slowenien",
  Spain: "Spanien", Sweden: "Schweden", Norway: "Norwegen", Switzerland: "Schweiz", "United Kingdom": "Vereinigtes Königreich",
};

export const FRENCH_COUNTRIES: Record<string, string> = {
  Austria: "Autriche", Belgium: "Belgique", Bulgaria: "Bulgarie", Croatia: "Croatie", Cyprus: "Chypre",
  Czechia: "Tchéquie", Denmark: "Danemark", Estonia: "Estonie", Finland: "Finlande", France: "France",
  Germany: "Allemagne", Greece: "Grèce", Hungary: "Hongrie", Ireland: "Irlande", Italy: "Italie",
  Latvia: "Lettonie", Lithuania: "Lituanie", Luxembourg: "Luxembourg", Malta: "Malte", Netherlands: "Pays-Bas",
  Poland: "Pologne", Portugal: "Portugal", Romania: "Roumanie", Slovakia: "Slovaquie", Slovenia: "Slovénie",
  Spain: "Espagne", Sweden: "Suède", Norway: "Norvège", Switzerland: "Suisse", "United Kingdom": "Royaume-Uni",
};

const COUNTRY_CODES: Record<string, string> = {
  Austria: "AT", Belgium: "BE", Bulgaria: "BG", Croatia: "HR", Cyprus: "CY", Czechia: "CZ", Denmark: "DK", Estonia: "EE", Finland: "FI", France: "FR", Germany: "DE", Greece: "GR", Hungary: "HU", Ireland: "IE", Italy: "IT", Latvia: "LV", Lithuania: "LT", Luxembourg: "LU", Malta: "MT", Netherlands: "NL", Poland: "PL", Portugal: "PT", Romania: "RO", Slovakia: "SK", Slovenia: "SI", Spain: "ES", Sweden: "SE", Norway: "NO", Switzerland: "CH", "United Kingdom": "GB",
};

export function getLocalizedCountry(locale: Locale, country: string) {
  if (locale === "de") return GERMAN_COUNTRIES[country] || country;
  if (locale === "fr") return FRENCH_COUNTRIES[country] || country;
  const code = COUNTRY_CODES[country];
  if (!code || locale === "en") return country;
  return new Intl.DisplayNames([locale], { type: "region" }).of(code) || country;
}
