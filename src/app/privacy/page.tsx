import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({ title: "Privacyverklaring", description: "Welke persoonsgegevens we verwerken, waarom we dat doen en welke rechten u heeft.", path: "/privacy" });
const sections: LegalSection[] = [
  {
    "title": "Wie verantwoordelijk is",
    "paragraphs": [
      "Garage Damming Techniek, Prinsenweide 5, 7317 BA Apeldoorn. U bereikt ons via info@dammingtechniek.nl of +31 6 25048182.",
      "Deze verklaring gaat over persoonsgegevens bij contact met Damming, onze website en de voorbereiding en uitvoering van onze dienstverlening."
    ]
  },
  {
    "title": "Gegevens en doelen",
    "paragraphs": [
      "Bij een vraag verwerken we uw naam, e-mailadres, telefoonnummer, onderwerp en bericht om u te antwoorden. Bij een afspraak kunnen ook de gewenste datum, dienst en gekozen auto worden verwerkt.",
      "Bij een inkoopaanvraag gaat het om kenteken, kilometerstand, merk, model, bouwjaar, brandstof, contactgegevens, aanvullende informatie en de door u aangeleverde foto’s of bestanden. Deel alleen informatie die nodig is; stuur geen kopie van uw identiteitsbewijs of gegevens van anderen mee.",
      "De huidige website controleert formuliergegevens op de server maar slaat deze niet op in een klantendatabase en verstuurt ze nog niet per e-mail. Voor een daadwerkelijke aanvraag kunt u bellen, mailen of WhatsApp gebruiken. Als deze verwerking verandert, passen we deze verklaring aan.",
      "Voor het afleveren en beveiligen van de website zijn technische gegevens nodig, zoals een IP-adres, browserinformatie en opgevraagde pagina’s. Welke toegangs- en foutlogs worden bewaard, hangt af van de gebruikte hosting."
    ]
  },
  {
    "title": "Grondslagen",
    "paragraphs": [
      "Voor een offerte, afspraak, aankoop of onderhoud verwerken we noodzakelijke gegevens voor het voorbereiden of uitvoeren van een overeenkomst. Voor verplichte administratie kan een wettelijke verplichting gelden.",
      "Voor het beveiligen van de website en het afhandelen van gewone vragen kan ons gerechtvaardigd belang gelden, waarbij we uw privacy afwegen. Voor optionele Vimeo-video en Google Maps vragen we vooraf toestemming. U kunt die toestemming steeds intrekken. We nemen geen besluiten met rechtsgevolgen uitsluitend op basis van geautomatiseerde verwerking."
    ]
  },
  {
    "title": "Kentekencheck, contact en externe diensten",
    "paragraphs": [
      "Bij de kentekencheck vraagt onze server met het ingevulde kenteken openbare voertuiggegevens op bij RDW Open Data. Hierbij worden geen naam, e-mailadres of telefoonnummer naar RDW gestuurd. De voertuigrespons kan maximaal 24 uur technisch worden gecachet. We gebruiken de uitkomst voor het invullen van voertuiggegevens, niet om de eigenaar op te zoeken.",
      "Bij een klik op WhatsApp, Instagram of een externe Google-link verlaat u onze website. De betreffende dienst verwerkt gegevens volgens zijn eigen privacybeleid. Controleer de tekst voordat u een WhatsApp-bericht verstuurt.",
      "Vimeo en Google Maps worden alleen na toestemming ingesloten. Deze partijen ontvangen dan onder meer uw IP-adres en browsergegevens en kunnen gegevens buiten de Europese Economische Ruimte verwerken. Zie hun eigen privacyverklaringen voor ontvangers, bewaartermijnen en doorgiftewaarborgen."
    ]
  },
  {
    "title": "Delen en beveiligen",
    "paragraphs": [
      "Wij verkopen uw persoonsgegevens niet. Gegevens delen we alleen als dat nodig is voor uw opdracht, het technisch leveren van de website of een wettelijke verplichting. Met dienstverleners die namens ons gegevens verwerken moeten passende afspraken worden gemaakt.",
      "Toegang tot klantgegevens hoort beperkt te blijven tot degenen die deze nodig hebben. We gebruiken passende technische en organisatorische maatregelen. Geen enkel systeem is volledig risicovrij; meld een vermoeden van misbruik aan info@dammingtechniek.nl."
    ]
  },
  {
    "title": "Bewaartermijnen",
    "paragraphs": [
      "De huidige formulierfunctie bewaart aanvragen en uploads niet blijvend. Gegevens die u per e-mail of WhatsApp deelt, bewaren we zolang nodig om uw vraag of aanvraag af te handelen. Wanneer dat doel vervalt en er geen wettelijke verplichting of geschil is, worden ze verwijderd.",
      "Aankoop-, opdracht- en onderhoudsgegevens kunnen nodig blijven voor uitvoering, nazorg en de onderbouwing van wettelijke rechten. De noodzaak hangt af van de opdracht en eventuele lopende aanspraken. Fiscale basisadministratie wordt in beginsel zeven jaar bewaard.",
      "Uw websitevoorkeuren worden 180 dagen in uw browser gebruikt. Na die termijn vragen we opnieuw om een keuze. U kunt lokale gegevens ook eerder via uw browser verwijderen."
    ]
  },
  {
    "title": "Uw privacyrechten",
    "paragraphs": [
      "U kunt vragen om inzage, correctie, verwijdering, beperking of overdracht van uw persoonsgegevens, voor zover de wettelijke voorwaarden daarvoor gelden. U kunt bezwaar maken tegen verwerking op basis van een gerechtvaardigd belang en eerder gegeven toestemming intrekken. Intrekken maakt eerdere rechtmatige verwerking niet ongedaan.",
      "Stuur uw verzoek naar info@dammingtechniek.nl. We reageren in beginsel binnen één maand; als de wet een verlenging toestaat, laten we dat op tijd weten. Om misbruik te voorkomen kunnen we uw identiteit op een passende manier controleren. Stuur niet ongevraagd een volledige kopie van uw identiteitsbewijs.",
      "Bent u niet tevreden over hoe we met uw gegevens omgaan, neem dan contact met ons op. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens via autoriteitpersoonsgegevens.nl."
    ]
  },
  {
    "title": "Cookies en wijzigingen",
    "paragraphs": [
      "We gebruiken noodzakelijke lokale opslag voor uw keuze en optionele externe media. We hebben geen eigen advertentiepixels of bezoekersanalysesoftware ingebouwd. In onze cookieverklaring leest u meer; uw keuze wijzigt u via Cookievoorkeuren.",
      "Bij wijzigingen in de website of verwerking werken we deze verklaring bij. De datum bovenaan geeft aan wanneer de tekst voor het laatst is aangepast."
    ]
  }
];
export default function Page() { return <LegalPage title="Privacyverklaring" intro="Welke persoonsgegevens we verwerken, waarom we dat doen en welke rechten u heeft." path="/privacy" sections={sections} />; }
