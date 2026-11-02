import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({ title: "Algemene voorwaarden", description: "Heldere afspraken over occasions, inkoop, onderhoud en reparatie bij Garage Damming Techniek.", path: "/voorwaarden" });
const sections: LegalSection[] = [
  {
    "title": "Over Damming en deze voorwaarden",
    "paragraphs": [
      "Garage Damming Techniek, Prinsenweide 5, 7317 BA Apeldoorn. U bereikt ons via info@dammingtechniek.nl of +31 6 25048182.",
      "Deze voorwaarden gelden voor onze verkoop en inkoop van auto’s, inruil, reparatie, onderhoud en overige overeengekomen werkzaamheden. U ontvangt de voorwaarden vóór het sluiten van een overeenkomst. Afwijkende afspraken leggen we samen vast. Wettelijke consumentenrechten blijven altijd gelden."
    ]
  },
  {
    "title": "Aanbod, prijzen en afspraken",
    "paragraphs": [
      "De website geeft een indruk van ons aanbod. Voorraad, kilometerstanden en beschikbaarheid kunnen wijzigen. We bevestigen de gegevens en de totale prijs bij het maken van een koop- of werkplaatsafspraak. Duidelijk herkenbare vergissingen kunnen worden gecorrigeerd; een bestaande overeenkomst wijzigen we niet eenzijdig.",
      "Prijzen voor consumenten zijn inclusief btw voor zover van toepassing en inclusief onvermijdbare kosten. Optionele extra’s worden alleen in rekening gebracht na uw akkoord. Bij een marge-auto is de btw niet afzonderlijk aftrekbaar. Een formulieraanvraag is op zichzelf geen koopovereenkomst, definitieve reservering of bevestigde afspraak."
    ]
  },
  {
    "title": "Koop en levering van een occasion",
    "paragraphs": [
      "Voor de koop leggen we onder meer de auto, prijs, kilometerstand, bekende gebreken, aflevering en eventuele extra garantie vast. U krijgt gelegenheid vragen te stellen en de auto te bekijken of een aankoopkeuring te bespreken.",
      "Wij leveren op het afgesproken moment en in de overeengekomen staat. Bij vertraging informeren we u en bespreken we een oplossing. Betaling, tenaamstelling, vrijwaring en overdracht stemmen we vooraf af."
    ]
  },
  {
    "title": "Uw auto verkopen of inruilen",
    "paragraphs": [
      "Een eerste bod is gebaseerd op de door u opgegeven gegevens en foto’s. Meld bekende schade, gebreken, onderhoud, kilometerstand en eventuele financiering of rechten van derden. U moet bevoegd zijn de auto te verkopen.",
      "Na bezichtiging kan bij afwijkende gegevens een aangepast bod volgen. Een aanpassing geldt alleen als u daarmee instemt. De uiteindelijke koopprijs, betaling, overdracht en eventuele ophaalafspraak worden afzonderlijk vastgelegd."
    ]
  },
  {
    "title": "Onderhoud, reparatie en meerwerk",
    "paragraphs": [
      "We spreken vooraf af welke werkzaamheden u wilt laten uitvoeren en of een vaste prijs of een prijsindicatie geldt. Eventuele onderzoekskosten bespreken we vooraf.",
      "Blijkt aanvullend werk nodig, dan vragen we uw akkoord op het werk en de extra kosten voordat we dit uitvoeren. Zonder akkoord beperken we ons tot de afgesproken opdracht. Als een veilige uitvoering niet mogelijk is, overleggen we eerst met u."
    ]
  },
  {
    "title": "Betaling, proefritten en annuleren",
    "paragraphs": [
      "De betaalwijze en betaaltermijn staan in de overeenkomst of op de factuur. Zonder andere afspraak wordt bij aflevering of ophalen betaald. Bij betalingsproblemen zoeken we eerst contact; eventuele rente of incassokosten worden uitsluitend volgens de wet berekend.",
      "Voor een proefrit is een geldig rijbewijs nodig. We bespreken de route, duur en eventuele verzekeringsvoorwaarden vooraf. Verkeersboetes door uw eigen overtredingen zijn voor uw rekening.",
      "Kunt u een afspraak niet nakomen, bel of mail ons zo snel mogelijk. Er geldt via deze website geen automatische annuleringsboete. Bij het beëindigen van een overeenkomst gelden de gemaakte afspraken en de wettelijke regels; kosten zijn niet vanzelfsprekend het volledige aankoop- of opdrachtbedrag."
    ]
  },
  {
    "title": "Wettelijke rechten en garantie",
    "paragraphs": [
      "Ook bij een gebruikte auto heeft u recht op een product dat voldoet aan wat u redelijkerwijs mocht verwachten. Daarbij tellen onder meer leeftijd, kilometerstand, prijs en onze mededelingen mee. In Nederland geldt geen vaste algemene wettelijke garantietermijn voor iedere auto.",
      "Eventuele aanvullende garantie leggen we schriftelijk vast en deze beperkt uw wettelijke rechten niet. Neem bij een gebrek eerst contact met ons op, zodat we dit kunnen beoordelen en waar nodig oplossen. Een extra garantiepakket is geen voorwaarde voor wettelijke bescherming."
    ]
  },
  {
    "title": "Bedenktijd en aansprakelijkheid",
    "paragraphs": [
      "Bij een aankoop in onze showroom bestaat geen algemene wettelijke bedenktijd. Komt een consumentenovereenkomst volledig op afstand of buiten onze bedrijfsruimte tot stand, dan kan een wettelijke bedenktijd van 14 dagen gelden. We geven u vóór het sluiten van zo’n overeenkomst informatie over het herroepingsrecht, de uitzonderingen en de wijze van herroepen. Een online contact- of afspraakverzoek is geen aankoop.",
      "Voor werkzaamheden die u tijdens een toepasselijke bedenktijd wilt laten beginnen, maken we de wettelijk vereiste afspraken over uw uitdrukkelijke verzoek en eventuele kosten.",
      "Bij schade beoordelen we de oorzaak en verantwoordelijkheid volgens de wet. Deze voorwaarden sluiten aansprakelijkheid voor opzet of bewuste roekeloosheid en dwingende wettelijke rechten niet uit."
    ]
  },
  {
    "title": "Klachten, recht en wijzigingen",
    "paragraphs": [
      "Heeft u een klacht, stuur dan een omschrijving en relevante aankoop- of opdrachtgegevens naar info@dammingtechniek.nl. U kunt ook bellen. We bespreken de klacht en zoeken samen naar een passende oplossing.",
      "Op onze overeenkomsten is Nederlands recht van toepassing, met behoud van dwingende bescherming die voor u geldt. U kunt een geschil voorleggen aan de bevoegde rechter. Nieuwe voorwaarden gelden voor nieuwe overeenkomsten; lopende afspraken veranderen daardoor niet automatisch."
    ]
  }
];
export default function Page() { return <LegalPage title="Algemene voorwaarden" intro="Heldere afspraken over occasions, inkoop, onderhoud en reparatie bij Garage Damming Techniek." path="/voorwaarden" sections={sections} />; }
