import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({ title: "Cookies en instellingen", description: "U bepaalt zelf of de video en interactieve kaart worden geladen. Hier leest u welke opslag daarbij wordt gebruikt.", path: "/cookies" });
const sections: LegalSection[] = [
  {
    "title": "Uw keuze",
    "paragraphs": [
      "U kunt onze website gebruiken zonder toestemming voor optionele media. Alleen het onthouden van uw privacykeuze is noodzakelijk. Vimeo en Google Maps staan standaard uit en kunt u afzonderlijk aan- of uitzetten via Cookievoorkeuren onderaan deze pagina of in de footer."
    ]
  },
  {
    "title": "Noodzakelijke lokale opslag",
    "paragraphs": [
      "Naam: damming-cookie-preferences-v2. Aanbieder: deze website van Damming Techniek. Type: localStorage in uw browser, geen klassieke cookie. Inhoud: toestemming voor video en kaart, een versienummer en het tijdstip van uw keuze. Doel: uw keuze respecteren bij volgende bezoeken.",
      "De keuze is 180 dagen geldig. Daarna vragen we opnieuw toestemming. LocalStorage heeft geen automatische vervaldatum: de verlopen waarde kan in uw browser blijven staan totdat die wordt overschreven of u deze wist. U kunt de opslag via de browserinstellingen verwijderen. Deze opslag wordt niet gebruikt om u over andere websites te volgen."
    ]
  },
  {
    "title": "Vimeo-video — optioneel",
    "paragraphs": [
      "Na toestemming laden we de achtergrondvideo van player.vimeo.com. Vimeo ontvangt daarbij onder meer uw IP-adres en apparaatgegevens. We gebruiken de instelling dnt=1 om tracking te beperken; dit betekent niet dat er helemaal geen gegevens naar Vimeo gaan.",
      "Vimeo kan noodzakelijke beveiligingsopslag gebruiken en reeds aanwezige cookies ontvangen. De namen en looptijden kunnen wijzigen; Vimeo beschrijft dit in zijn eigen cookiebeleid. Zonder toestemming tonen we een stilstaande foto."
    ]
  },
  {
    "title": "Google Maps — optioneel",
    "paragraphs": [
      "Na toestemming wordt de interactieve kaart via Google geladen. Google kan daarbij uw IP-adres, browsergegevens en informatie uit bestaande Google-cookies ontvangen en eigen opslag gebruiken. De opslag en looptijden worden door Google bepaald en kunnen afhangen van uw instellingen en account.",
      "Zonder toestemming blijft het adres zichtbaar en kunt u zelf een externe routelink openen. Het openen van die link is een bezoek aan Google en staat los van het inladen van een kaart op onze website."
    ]
  },
  {
    "title": "Aanpassen, weigeren en intrekken",
    "paragraphs": [
      "Alles weigeren en Alles accepteren zijn beide beschikbaar. Via Voorkeuren instellen kiest u afzonderlijk voor video en kaart. Uw keuze wordt pas actief nadat u opslaat.",
      "Intrekken verwijdert de ingesloten video of kaart van onze pagina. Het verwijdert geen gegevens die externe aanbieders al hebben ontvangen en ook geen eerder door hen geplaatste cookies. Beheer die cookies via uw browser en de instellingen van de aanbieder. Bij geblokkeerde lokale opslag kunnen we uw keuze alleen voor het huidige bezoek onthouden."
    ]
  },
  {
    "title": "Geen eigen advertentie- of analytische cookies",
    "paragraphs": [
      "In de huidige website zijn geen Google Analytics, advertentiepixels of andere eigen marketingtrackers opgenomen. Als we aanvullende technieken toevoegen, passen we deze verklaring en zo nodig het toestemmingsvenster aan. Voor vragen: info@dammingtechniek.nl."
    ]
  }
];
export default function Page() { return <LegalPage title="Cookies en instellingen" intro="U bepaalt zelf of de video en interactieve kaart worden geladen. Hier leest u welke opslag daarbij wordt gebruikt." path="/cookies" sections={sections} />; }
