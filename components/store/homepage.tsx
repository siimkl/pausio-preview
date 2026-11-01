import { ArrowDown, Box, LockKeyhole, Sparkles, TimerReset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { ProductCatalogue } from "@/components/store/product-catalogue";
import { Faq } from "@/components/store/faq";
import { campaignMessages, type CampaignVariant } from "@/lib/site-config";
import stepPutItInside from "@/public/lifestyle/step-put-it-inside.png";
import stepSetTimer from "@/public/lifestyle/step-set-timer.png";
import stepLiveLife from "@/public/lifestyle/step-live-life.png";
import temptationsEditorial from "@/public/lifestyle/temptations-editorial.png";
import usePhoneDetox from "@/public/lifestyle/use-phone-detox.png";
import useBetterEvenings from "@/public/lifestyle/use-better-evenings.png";
import useSnackControl from "@/public/lifestyle/use-snack-control.png";
import useStudyFocus from "@/public/lifestyle/use-study-focus.png";
import useGamingBreaks from "@/public/lifestyle/use-gaming-breaks.png";
import { localize, type Locale } from "@/lib/i18n";

const uses = [
  ["phone-detox", "Phone detox", "Put your phone in jail.", "Screen time", usePhoneDetox, "A phone being placed inside an open striped timer lockbox"],
  ["better-evenings", "Better evenings", "Your midnight scrolling habit has been cancelled.", "Wind down", useBetterEvenings, "A locked striped timer box on a warmly lit bedside table"],
  ["snack-control", "Snack control", "Chocolate can wait.", "Cravings", useSnackControl, "Chocolate and cookies being placed inside an open striped timer lockbox"],
  ["alcohol-moderation", "Alcohol moderation", "Make the decision before the third beer.", "Moderation", temptationsEditorial, "A capped bottle beside an open striped timer lockbox"],
  ["study-focus", "Study & focus", "Less scrolling. More doing.", "Deep work", useStudyFocus, "A locked striped timer box on a desk while someone studies"],
  ["gaming-breaks", "Gaming breaks", "Your controller has a bedtime.", "Reset", useGamingBreaks, "A game controller being placed inside an open striped timer lockbox"],
] as const;

const usesDe = [
  ["phone-detox", "Handy-Pause", "Steck dein Handy ins Gefängnis.", "Bildschirmzeit", usePhoneDetox, "Ein Smartphone wird in eine offene gestreifte Timerbox gelegt"],
  ["better-evenings", "Bessere Abende", "Mitternächtliches Scrollen fällt heute aus.", "Abschalten", useBetterEvenings, "Eine verschlossene gestreifte Timerbox auf einem warm beleuchteten Nachttisch"],
  ["snack-control", "Snack-Kontrolle", "Die Schokolade kann warten.", "Heißhunger", useSnackControl, "Schokolade und Kekse werden in eine offene gestreifte Timerbox gelegt"],
  ["alcohol-moderation", "Bewusster trinken", "Entscheide dich vor dem dritten Bier.", "Maß halten", temptationsEditorial, "Eine verschlossene Flasche neben einer offenen gestreiften Timerbox"],
  ["study-focus", "Lernen & Fokus", "Weniger scrollen. Mehr schaffen.", "Fokus", useStudyFocus, "Eine verschlossene gestreifte Timerbox auf einem Schreibtisch beim Lernen"],
  ["gaming-breaks", "Gaming-Pausen", "Auch dein Controller braucht eine Schlafenszeit.", "Reset", useGamingBreaks, "Ein Gaming-Controller wird in eine offene gestreifte Timerbox gelegt"],
] as const;

const usesFr = [
  ["phone-detox", "Pause téléphone", "Mettez votre téléphone en prison.", "Temps d’écran", usePhoneDetox, "Un téléphone placé dans une boîte à minuterie ouverte"],
  ["better-evenings", "De meilleures soirées", "Le scroll de minuit est annulé.", "Déconnexion", useBetterEvenings, "Une boîte à minuterie verrouillée sur une table de chevet"],
  ["snack-control", "Contrôle des snacks", "Le chocolat peut attendre.", "Envies", useSnackControl, "Du chocolat et des biscuits placés dans une boîte à minuterie"],
  ["alcohol-moderation", "Modération", "Décidez avant la troisième bière.", "Modération", temptationsEditorial, "Une bouteille fermée à côté d’une boîte à minuterie"],
  ["study-focus", "Étude et concentration", "Moins de scroll. Plus d’action.", "Concentration", useStudyFocus, "Une boîte à minuterie verrouillée sur un bureau"],
  ["gaming-breaks", "Pauses gaming", "Votre manette a aussi une heure de coucher.", "Pause", useGamingBreaks, "Une manette placée dans une boîte à minuterie"],
] as const;

const nordicHome = {
  sv: { headline: "Lås bort distraktionerna. Ta tillbaka din tid.", copy: "Mobil, snacks, alkohol eller spelkontroll: lås in dem, ställ timern och sluta förhandla med dig själv.", cta: "Utforska Pausio.eu", sticker: <>LÄGG UT<br />DIN SJÄLV-<br />KONTROLL.</>, use: [["Mobilpaus", "Sätt mobilen i fängelse.", "Skärmtid"], ["Bättre kvällar", "Midnattsskrollandet är inställt.", "Varva ner"], ["Snackskontroll", "Chokladen kan vänta.", "Sug"], ["Måttlighet", "Bestäm dig före den tredje ölen.", "Måttlighet"], ["Studier & fokus", "Mindre skroll. Mer gjort.", "Fokus"], ["Spelpauser", "Din kontroll har en läggtid.", "Paus"]] },
  no: { headline: "Lås bort distraksjonene. Ta tiden tilbake.", copy: "Mobil, snacks, alkohol eller spillkontroll: lås dem inn, still timeren og slutt å forhandle med deg selv.", cta: "Utforsk Pausio.eu", sticker: <>SETT BORT<br />SELV-<br />KONTROLLEN.</>, use: [["Mobilpause", "Sett mobilen i fengsel.", "Skjermtid"], ["Bedre kvelder", "Midnattsscrollingen er avlyst.", "Ro ned"], ["Snackskontroll", "Sjokoladen kan vente.", "Søtsug"], ["Moderasjon", "Bestem deg før den tredje ølen.", "Moderasjon"], ["Studier og fokus", "Mindre scrolling. Mer gjort.", "Fokus"], ["Spillpauser", "Kontrolleren din har leggetid.", "Pause"]] },
  da: { headline: "Lås distraktionerne væk. Tag tiden tilbage.", copy: "Mobil, snacks, alkohol eller controller: lås dem inde, indstil timeren og stop med at forhandle med dig selv.", cta: "Udforsk Pausio.eu", sticker: <>UDLICITÉR<br />DIN SELV-<br />KONTROL.</>, use: [["Mobilpause", "Sæt mobilen i fængsel.", "Skærmtid"], ["Bedre aftener", "Midnatsscrollingen er aflyst.", "Ro ned"], ["Snackkontrol", "Chokoladen kan vente.", "Trang"], ["Mådehold", "Beslut dig før den tredje øl.", "Mådehold"], ["Studier og fokus", "Mindre scrolling. Mere gjort.", "Fokus"], ["Spilpauser", "Din controller har sengetid.", "Pause"]] },
  fi: { headline: "Lukitse häiriöt pois. Ota aikasi takaisin.", copy: "Puhelin, herkut, alkoholi tai peliohjain: lukitse ne, aseta ajastin ja lopeta neuvottelu itsesi kanssa.", cta: "Tutustu Pausio.eu:hun", sticker: <>ULKOISTA<br />ITSE-<br />HILLINTÄ.</>, use: [["Puhelintauko", "Laita puhelin vankilaan.", "Ruutuaika"], ["Paremmat illat", "Keskiyön selaaminen on peruttu.", "Rauhoitu"], ["Herkkujen hallinta", "Suklaa voi odottaa.", "Mieliteot"], ["Kohtuus", "Päätä ennen kolmatta olutta.", "Kohtuus"], ["Opiskelu ja keskittyminen", "Vähemmän selaamista. Enemmän tekemistä.", "Keskittyminen"], ["Pelitauot", "Ohjaimellasi on nukkumaanmenoaika.", "Tauko"]] },
} as const;

const europeanHome = {
  nl: { headline: "Sluit afleidingen op. Pak je tijd terug.", copy: "Telefoon, snacks, alcohol of controller: sluit ze op, stel de timer in en stop met onderhandelen met jezelf.", cta: "Ontdek Pausio.eu", sticker: <>BESTEED JE<br />ZELF-<br />BEHEERSING UIT.</>, use: [["Telefoonpauze", "Zet je telefoon achter slot.", "Schermtijd"], ["Betere avonden", "Middernachtelijk scrollen gaat niet door.", "Ontspannen"], ["Snackcontrole", "Chocolade kan wachten.", "Trek"], ["Matiging", "Beslis vóór het derde biertje.", "Matiging"], ["Studie & focus", "Minder scrollen. Meer doen.", "Diep werk"], ["Gamepauzes", "Je controller heeft een bedtijd.", "Reset"]] },
  it: { headline: "Chiudi le distrazioni. Riprenditi il tuo tempo.", copy: "Telefono, snack, alcol o controller: chiudili, imposta il timer e smetti di negoziare con te stesso.", cta: "Scopri Pausio.eu", sticker: <>DELEGA<br />IL TUO AUTO-<br />CONTROLLO.</>, use: [["Pausa telefono", "Metti il telefono in prigione.", "Tempo schermo"], ["Serate migliori", "Lo scroll di mezzanotte è annullato.", "Rallenta"], ["Controllo snack", "Il cioccolato può aspettare.", "Voglie"], ["Moderazione", "Decidi prima della terza birra.", "Moderazione"], ["Studio e concentrazione", "Meno scroll. Più azione.", "Focus"], ["Pause dal gaming", "Anche il controller va a dormire.", "Reset"]] },
  es: { headline: "Encierra las distracciones. Recupera tu tiempo.", copy: "Móvil, snacks, alcohol o mando: enciérralos, programa el temporizador y deja de negociar contigo.", cta: "Descubre Pausio.eu", sticker: <>DELEGA<br />TU AUTO-<br />CONTROL.</>, use: [["Descanso del móvil", "Mete el móvil en la cárcel.", "Pantalla"], ["Mejores noches", "Se cancela el scroll de medianoche.", "Desconecta"], ["Control de snacks", "El chocolate puede esperar.", "Antojos"], ["Moderación", "Decide antes de la tercera cerveza.", "Moderación"], ["Estudio y foco", "Menos scroll. Más acción.", "Concentración"], ["Pausas de juego", "Tu mando también tiene hora de dormir.", "Pausa"]] },
  pl: { headline: "Zamknij rozpraszacze. Odzyskaj swój czas.", copy: "Telefon, przekąski, alkohol czy pad: zamknij je, ustaw timer i przestań negocjować ze sobą.", cta: "Poznaj Pausio.eu", sticker: <>ODDAJ<br />SAMO-<br />KONTROLĘ.</>, use: [["Detoks od telefonu", "Wsadź telefon do więzienia.", "Czas ekranu"], ["Lepsze wieczory", "Nocne scrollowanie odwołane.", "Wyciszenie"], ["Kontrola przekąsek", "Czekolada może poczekać.", "Zachcianki"], ["Umiar", "Zdecyduj przed trzecim piwem.", "Umiar"], ["Nauka i skupienie", "Mniej scrollowania. Więcej działania.", "Skupienie"], ["Przerwy od grania", "Twój kontroler też ma porę snu.", "Reset"]] },
  cs: { headline: "Zamkněte rozptýlení. Vezměte si svůj čas zpět.", copy: "Telefon, svačiny, alkohol nebo ovladač: zamkněte je, nastavte časovač a přestaňte sami se sebou vyjednávat.", cta: "Prozkoumat Pausio.eu", sticker: <>PŘEDEJTE<br />SEBE-<br />KONTROLU.</>, use: [["Pauza od telefonu", "Dejte telefon do vězení.", "Čas u obrazovky"], ["Lepší večery", "Půlnoční scrollování je zrušeno.", "Zklidnění"], ["Kontrola svačin", "Čokoláda může počkat.", "Chutě"], ["Střídmost", "Rozhodněte se před třetím pivem.", "Střídmost"], ["Studium a soustředění", "Méně scrollování. Více práce.", "Soustředění"], ["Herní pauzy", "Váš ovladač má večerku.", "Reset"]] },
} as const;

export function Homepage({ campaign, locale = "en" }: { campaign: CampaignVariant; locale?: Locale }) {
  const de = locale === "de";
  const fr = locale === "fr";
  const nordic = locale === "sv" || locale === "no" || locale === "da" || locale === "fi" ? nordicHome[locale] : null;
  const european = locale === "nl" || locale === "it" || locale === "es" || locale === "pl" || locale === "cs" ? europeanHome[locale] : null;
  const regional = nordic || european;
  const regionalSections = {
    sv: { steps: <>Tre steg. Ingen app.<br />Ingen krånglig installation.</>, why: <>Viljestyrka är bra.<br />Hårdvara är bättre.</>, manifesto: <>Ta ett bra beslut.<br /><em>Gör det svårare att ångra.</em></> },
    no: { steps: <>Tre trinn. Ingen app.<br />Ingen komplisert oppsett.</>, why: <>Viljestyrke er bra.<br />Maskinvare er bedre.</>, manifesto: <>Ta en god beslutning.<br /><em>Gjør den vanskeligere å ombestemme.</em></> },
    da: { steps: <>Tre trin. Ingen app.<br />Ingen kompliceret opsætning.</>, why: <>Viljestyrke er godt.<br />Hardware er bedre.</>, manifesto: <>Tag en god beslutning.<br /><em>Gør den sværere at fortryde.</em></> },
    fi: { steps: <>Kolme vaihetta. Ei sovellusta.<br />Ei monimutkaista asennusta.</>, why: <>Tahdonvoima on hyvä.<br />Lukko on parempi.</>, manifesto: <>Tee hyvä päätös.<br /><em>Tee sen perumisesta vaikeampaa.</em></> },
    nl: { steps: <>Drie stappen. Geen app.<br />Geen ingewikkelde installatie.</>, why: <>Wilskracht is fijn.<br />Een slot is beter.</>, manifesto: <>Neem een goed besluit.<br /><em>Maak terugdraaien moeilijker.</em></> },
    it: { steps: <>Tre passaggi. Nessuna app.<br />Nessuna configurazione complicata.</>, why: <>La forza di volontà è utile.<br />Un lucchetto è meglio.</>, manifesto: <>Prendi una buona decisione.<br /><em>Rendila più difficile da annullare.</em></> },
    es: { steps: <>Tres pasos. Sin aplicación.<br />Sin configuraciones complicadas.</>, why: <>La fuerza de voluntad está bien.<br />Un candado es mejor.</>, manifesto: <>Toma una buena decisión.<br /><em>Haz que sea más difícil deshacerla.</em></> },
    pl: { steps: <>Trzy kroki. Bez aplikacji.<br />Bez skomplikowanej konfiguracji.</>, why: <>Silna wola jest dobra.<br />Kłódka jest lepsza.</>, manifesto: <>Podejmij dobrą decyzję.<br /><em>Utrudnij jej cofnięcie.</em></> },
    cs: { steps: <>Tři kroky. Bez aplikace.<br />Bez složitého nastavení.</>, why: <>Pevná vůle je skvělá.<br />Zámek je lepší.</>, manifesto: <>Udělejte dobré rozhodnutí.<br /><em>Ztěžte jeho zrušení.</em></> },
  } as const;
  const t = <T,>(english: T, german: T, french: T) => localize(locale, english, german, french);
  const message = de ? {
    headline: "Ablenkungen weg. Zeit zurück.",
    copy: "Handy, Snacks, Alkohol oder Controller: einschließen, Timer stellen und nicht mehr mit dir selbst verhandeln.",
    cta: "Pausio.eu entdecken",
    highlight: undefined,
  } : fr ? {
    headline: "Éloignez les distractions. Reprenez votre temps.",
    copy: "Téléphone, snacks, alcool ou manette : enfermez-les, réglez le minuteur et arrêtez de négocier avec vous-même.",
    cta: "Découvrir Pausio.eu",
    highlight: undefined,
  } : regional ? { headline: regional.headline, copy: regional.copy, cta: regional.cta, highlight: undefined } : campaignMessages[campaign];
  const useItems = de ? usesDe : fr ? usesFr : regional ? uses.map(([id, , , , image, alt], index) => [id, regional.use[index][0], regional.use[index][1], regional.use[index][2], image, alt] as const) : uses;
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="display">{message.headline}</h1>
            <p>{message.copy}</p>
            <div className="hero-actions"><Button asChild size="lg"><Link href="#shop">{message.cta} <ArrowDown size={17} /></Link></Button><Button asChild size="lg" variant="secondary"><Link href="#how-it-works">{t("See how it works", "So funktioniert’s", "Voir comment ça marche")}</Link></Button></div>
            <div className="hero-points"><span>{t("One lock. Three sizes.", "Ein Schloss. Drei Größen.", "Un cadenas. Trois tailles.")}</span><span>{t("No app required.", "Keine App nötig.", "Aucune application.")}</span><span>{t("Simple timer control.", "Einfache Timer-Steuerung.", "Minuterie simple.")}</span></div>
          </div>
          <div className="hero-visual-wrap"><span className="hero-sticker">{de ? <>WILLENS-<br />KRAFT<br />AUSLAGERN.</> : fr ? <>DÉLÉGUEZ<br />VOTRE<br />VOLONTÉ.</> : regional ? regional.sticker : <>OUTSOURCE<br />YOUR SELF-<br />CONTROL.</>}</span><ProductVisual size="family" priority /></div>
        </div>
        <div className="hero-ticker" aria-hidden="true">
          <div className="hero-ticker__track">
            {[0, 1].map((copy) => <div className="hero-ticker__group" key={copy}>
              <span>{t("PHONE GOES IN. LIFE HAPPENS.", "HANDY REIN. LEBEN WEITER.", "TÉLÉPHONE RANGÉ. LA VIE CONTINUE.")}</span><i>•</i><span>{t("FUTURE-YOU DOESN'T GET A VOTE.", "DEIN SPÄTERES ICH HAT KEIN MITSPRACHERECHT.", "VOTRE FUTUR VOUS N’A PAS SON MOT À DIRE.")}</span><i>•</i><span>{t("LOCK YOUR STUFF. GET YOUR LIFE BACK.", "SACHEN WEGSCHLIESSEN. ZEIT ZURÜCKHOLEN.", "VERROUILLEZ VOS OBJETS. REPRENEZ VOTRE TEMPS.")}</span><i>•</i>
            </div>)}
          </div>
        </div>
      </section>

      <ProductCatalogue locale={locale} />

      <section className="section how-section" id="how-it-works">
        <div className="container"><div className="section-heading"><p className="eyebrow">{t("Almost suspiciously simple", "Fast verdächtig einfach", "Presque trop simple")}</p><h2 className="h2">{de ? <>Drei Schritte. Keine App.<br />Kein kompliziertes Setup.</> : fr ? <>Trois étapes. Aucune appli.<br />Aucune installation compliquée.</> : regional ? regionalSections[locale as keyof typeof regionalSections].steps : <>Three steps. No app.<br />No complicated setup.</>}</h2></div>
          <div className="steps-grid">
            <article><div className="step-visual"><Image src={stepPutItInside} alt={t("A phone being placed inside an open striped timer lockbox", "Ein Smartphone wird in eine offene Timerbox gelegt", "Un téléphone placé dans une boîte à minuterie ouverte")} sizes="(max-width: 820px) 100vw, 33vw" /><span className="step-icon"><Box size={22} /></span></div><span>01</span><h3>{t("Put it inside", "Rein damit", "Placez-le dedans")}</h3><p>{t("Choose what you want to stop reaching for.", "Wähle, wonach du nicht mehr ständig greifen willst.", "Choisissez ce que vous voulez arrêter de saisir sans cesse.")}</p></article>
            <article><div className="step-visual"><Image src={stepSetTimer} alt={t("A hand setting the silver timer padlock attached through both zipper pulls", "Eine Hand stellt das Zeitschloss an der Timerbox ein", "Une main règle le cadenas à minuterie")} sizes="(max-width: 820px) 100vw, 33vw" /><span className="step-icon"><TimerReset size={22} /></span></div><span>02</span><h3>{t("Set the timer", "Timer stellen", "Réglez le minuteur")}</h3><p>{t("Attach the timer padlock and choose your lockout period.", "Zeitschloss anbringen und Sperrzeit wählen.", "Fixez le cadenas et choisissez la durée de verrouillage.")}</p></article>
            <article><div className="step-visual"><Image src={stepLiveLife} alt={t("A locked timer box in the foreground while someone reads in the background", "Eine verschlossene Timerbox, während im Hintergrund jemand liest", "Une boîte verrouillée pendant qu’une personne lit")} sizes="(max-width: 820px) 100vw, 33vw" /><span className="step-icon"><Sparkles size={22} /></span></div><span>03</span><h3>{t("Get on with your life", "Leben weiterleben", "Passez à autre chose")}</h3><p>{t("Your stuff stays put until the timer allows the lock to open.", "Deine Sachen bleiben drin, bis der Timer das Schloss freigibt.", "Vos objets restent en place jusqu’à ce que le minuteur libère le cadenas.")}</p></article>
          </div>
        </div>
      </section>

      <section className="section section--sand use-section">
        <div className="container"><div className="section-heading use-heading"><div><p className="eyebrow">{t("Pick your temptation", "Wähle deine Versuchung", "Choisissez votre tentation")}</p><h2 className="h2">{t("Useful for whatever keeps saying “just one more”.", "Für alles, was ständig „nur noch einmal“ sagt.", "Pour tout ce qui répète « encore une fois ».")}</h2></div><p>{t("Examples of intended use—not promises of guaranteed outcomes.", "Beispiele für mögliche Anwendungen – keine Erfolgsgarantie.", "Exemples d’utilisation, sans promesse de résultat garanti.")}</p></div>
          <div className="use-editorial">
            <Image src={temptationsEditorial} alt="A phone, chocolate, game controller, and capped wine bottle arranged around an open timer lockbox" sizes="(max-width: 820px) 100vw, 70vw" />
            <div className="use-editorial-copy"><span>{t("THE EVERYDAY SHORTLIST", "DIE ALLTAGS-AUSWAHL", "LA SÉLECTION DU QUOTIDIEN")}</span><strong>{t("Put distance between an impulse and the next decision.", "Schaffe Abstand zwischen einem Impuls und der nächsten Entscheidung.", "Mettez de la distance entre une impulsion et votre prochaine décision.")}</strong><p>{t("Phone, snacks, controller, or bottle—the box does not judge. It just keeps the agreement you made earlier.", "Handy, Snacks, Controller oder Flasche – die Box urteilt nicht. Sie hält nur die Abmachung ein, die du vorher getroffen hast.", "Téléphone, snacks, manette ou bouteille : la boîte ne juge pas. Elle respecte simplement l’accord que vous avez pris plus tôt.")}</p></div>
          </div>
          <div className="use-grid">{useItems.map(([id, title, copy, label, image, alt], index) => <article className={message.highlight === id ? "is-highlighted" : ""} key={id}><div className="use-card-top"><span>0{index + 1}</span><span className="use-card-tag">{label}</span></div><div className={`use-card-visual use-card-visual--${id}`}><Image src={image} alt={alt} sizes="(max-width: 520px) 100vw, (max-width: 820px) 50vw, 33vw" /></div><div className="use-card-copy"><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section why-section" id="why-lockbox">
        <div className="container why-grid"><div className="why-copy"><p className="eyebrow">{t("Why a timer lockbox?", "Warum eine Timerbox?", "Pourquoi une boîte à minuterie ?")}</p><h2 className="h2">{de ? <>Willenskraft ist gut.<br />Hardware ist besser.</> : fr ? <>La volonté, c’est bien.<br />Le verrou, c’est mieux.</> : regional ? regionalSections[locale as keyof typeof regionalSections].why : <>Willpower is lovely.<br />Hardware is better.</>}</h2><p className="lede">{t("Make the choice while you are still feeling sensible. Then give the argument to a piece of metal.", "Triff die Entscheidung, solange du vernünftig denkst. Den Rest übernimmt ein Stück Metall.", "Prenez la décision pendant que vous êtes encore raisonnable. Puis confiez le débat à un morceau de métal.")}</p></div>
          <div className="feature-list"><article><span><LockKeyhole /></span><div><h3>{t("Physical boundaries", "Physische Grenze", "Une limite physique")}</h3><p>{t("Not another notification you can ignore.", "Keine weitere Benachrichtigung, die du wegwischen kannst.", "Pas une notification de plus à ignorer.")}</p></div></article><article><span><TimerReset /></span><div><h3>{t("One universal lock", "Ein Schloss für alle Boxen", "Un cadenas universel")}</h3><p>{t("Use the same timer padlock with different boxes.", "Verwende dasselbe Zeitschloss mit verschiedenen Boxen.", "Utilisez le même cadenas avec plusieurs boîtes.")}</p></div></article><article><span><Sparkles /></span><div><h3>{t("Simple by design", "Bewusst einfach", "Simple par conception")}</h3><p>{t("No app, account, or complicated setup.", "Keine App, kein Konto, kein kompliziertes Setup.", "Sans application, compte ni installation compliquée.")}</p></div></article></div>
        </div>
      </section>

      <section className="manifesto"><div className="container"><p>{t("THE IDEA, IN ONE LINE", "DIE IDEE IN EINEM SATZ", "L’IDÉE EN UNE PHRASE")}</p><h2>{de ? <>Triff eine gute Entscheidung.<br /><em>Mach es schwerer, sie rückgängig zu machen.</em></> : fr ? <>Prenez une bonne décision.<br /><em>Rendez-la plus difficile à annuler.</em></> : regional ? regionalSections[locale as keyof typeof regionalSections].manifesto : <>Make a good decision.<br /><em>Make it harder to undo.</em></>}</h2></div></section>
      <Faq locale={locale} />
    </>
  );
}
