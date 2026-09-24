import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "s-001",
    slug: "apk-keuring",
    name: "APK-keuring",
    shortDescription:
      "RDW-erkende keuring op veiligheid en milieu, met een duidelijk rapport na afloop.",
    description:
      "Verloopt de APK van uw auto binnen twee maanden? Maak dan op tijd een afspraak. Onze gediplomeerde keurmeesters controleren de auto volgens de RDW-regels. Tijdens de Algemene Periodieke Keuring kijken we of de auto voldoet aan de Europese eisen voor veiligheid en milieu: banden, remmen, verlichting, schokdempers en meer. Gebreken komen zo op tijd aan het licht, nog vóór ze tot een grotere reparatie leiden. Na afloop ontvangt u een rapport: goedgekeurd, of met de punten die eerst verholpen moeten worden.",
    image: "/images/garage/apk.jpg",
    featured: true,
    category: "workshop",
    highlights: [
      "RDW-erkende keurmeesters",
      "Rapport na de keuring",
      "Banden, remmen, verlichting en schokdempers",
      "Combinatie met onderhoud mogelijk",
    ],
    whenNeeded: [
      "Nieuwe benzineauto: eerste APK na 4 jaar",
      "Nieuwe dieselauto: eerste APK na 3 jaar, daarna jaarlijks",
      "Benzineauto van 4 tot 8 jaar: om het jaar, daarna elk jaar",
      "Zes weken voor de vervaldatum stuurt het RDW een oproep",
    ],
    whyUs: [
      "Keurmeesters met jarenlange ervaring",
      "Alleen repareren wat nodig is, na overleg",
      "Afspraak online of telefonisch",
    ],
    faq: [
      {
        question: "Wat gebeurt er als mijn APK verloopt?",
        answer:
          "U mag dan niet meer de weg op. U riskeert een boete en de auto is op dat moment niet verzekerd. Plan de keuring daarom vóór de vervaldatum.",
      },
      {
        question: "Hoe vaak moet mijn auto gekeurd worden?",
        answer:
          "Een nieuwe benzineauto gaat na vier jaar voor het eerst naar de APK, een diesel na drie jaar. Daarna is een diesel elk jaar aan de beurt. Een benzineauto om het jaar, en vanaf acht jaar eveneens elk jaar.",
      },
    ],
    relatedSlugs: ["kleine-beurt", "grote-beurt", "banden-wissel"],
  },
  {
    id: "s-003",
    slug: "kleine-beurt",
    name: "Kleine beurt",
    shortDescription:
      "Controle van de belangrijkste punten, inclusief olie verversen, oliefilter en ruitensproeiervloeistof.",
    description:
      "Tijdens de kleine beurt lopen we de auto na op de punten die er het meest toe doen. We verversen de motorolie, vervangen het oliefilter en vullen de ruitensproeiervloeistof bij. Na afloop krijgt u het inspectieformulier mee, zodat u altijd weet hoe de auto er technisch voor staat. De fabrikant schrijft dit onderhoud voor: slijtage komt op tijd aan het licht en een klein gebrek groeit niet uit tot een grotere schade.",
    image: "/images/garage/workshop-detail.jpg",
    featured: false,
    category: "workshop",
    highlights: [
      "Motorolie verversen",
      "Oliefilter vervangen",
      "Ruitensproeiervloeistof bijvullen",
      "Inspectieformulier mee naar huis",
    ],
    whenNeeded: [
      "Oudere auto (ongeveer 6 à 7 jaar of ouder): jaarlijks of elke 15.000 km",
      "Nieuwere auto: zodra het dashboard om onderhoud vraagt",
      "Wanneer de vorige kleine beurt al een tijd geleden is",
    ],
    whyUs: [
      "Vaste inspectielijst, niets overgeslagen",
      "Slijtage gemeld vóór het een storing wordt",
      "Te combineren met APK",
    ],
    faq: [
      {
        question: "Wanneer is een kleine beurt nodig?",
        answer:
          "Bij een auto van een jaar of zes, zeven of ouder rekent u op een kleine beurt per jaar of na elke 15.000 kilometer. Bij een jongere auto verschijnt meestal een melding op het dashboard.",
      },
    ],
    relatedSlugs: ["grote-beurt", "merkbeurt", "apk-keuring"],
  },
  {
    id: "s-004",
    slug: "grote-beurt",
    name: "Grote beurt",
    shortDescription:
      "Uitgebreide tweejaarlijkse controle: olie, filters, uitlijning, remmen en een volledig inspectierapport.",
    description:
      "Tijdens de grote beurt controleren we de auto op een groot aantal punten. We verversen de motorolie, vervangen het oliefilter en het interieurfilter, doen een uitlijncontrole en reinigen en controleren de remmen. Alle onderdelen worden nagelopen op werking, slijtage en beschadiging. U krijgt het inspectierapport mee, zodat u precies weet wat de technische staat is. De beurt overslaan betekent langer doorrijden met een auto die minder betrouwbaar kan zijn.",
    image: "/images/garage/workshop-bay.jpg",
    featured: false,
    category: "workshop",
    highlights: [
      "Motorolie, oliefilter en interieurfilter",
      "Uitlijncontrole",
      "Remmen reinigen en controleren",
      "Inspectierapport na afloop",
    ],
    whenNeeded: [
      "Oudere auto (ongeveer 6 à 7 jaar of ouder): elke 2 jaar of elke 30.000 km",
      "Nieuwere auto: zodra het dashboard om een grote beurt vraagt",
      "Na een lange periode zonder uitgebreid onderhoud",
    ],
    whyUs: [
      "Meer dan een olie-beurt: de hele auto wordt nagelopen",
      "Slijtage en beschadiging in één rapport",
      "Extra werk alleen na uw akkoord",
    ],
    faq: [
      {
        question: "Wat is het verschil met een kleine beurt?",
        answer:
          "De grote beurt is uitgebreider. Naast olie en oliefilter vervangen we het interieurfilter, controleren we de uitlijning en de remmen, en lopen we alle onderdelen na op werking, slijtage en beschadiging.",
      },
      {
        question: "Hoe vaak is een grote beurt nodig?",
        answer:
          "Bij een oudere auto doorgaans elke twee jaar of na elke 30.000 kilometer. Bij een jongere auto volgt u de melding op het dashboard.",
      },
    ],
    relatedSlugs: ["kleine-beurt", "merkbeurt", "apk-keuring"],
  },
  {
    id: "s-005",
    slug: "merkbeurt",
    name: "Merkbeurt",
    shortDescription:
      "Onderhoud precies volgens de autofabrikant, afgestemd op merk, type, bouwjaar en kilometerstand.",
    description:
      "Is de auto toe aan onderhoud op maat, kies dan de merkbeurt. Die volgt het schema van de autofabrikant en de merkdealer: volledig afgestemd op uw merk, type, bouwjaar en kilometerstand. Nieuwe onderdelen voldoen aan de fabrieksspecificaties, zodat de fabrieksgarantie behouden blijft.",
    image: "/images/garage/maintenance.jpg",
    featured: false,
    category: "workshop",
    highlights: [
      "Volgens fabrieksvoorschrift",
      "Afgestemd op merk, type, bouwjaar en km-stand",
      "Onderdelen volgens fabrieksspecificatie",
      "Fabrieksgarantie blijft behouden",
    ],
    whenNeeded: [
      "Wanneer het onderhoudsschema van de fabrikant daarom vraagt",
      "Om de fabrieksgarantie te behouden",
      "Als u onderhoud wilt dat gelijkwaardig is aan de merkdealer",
    ],
    whyUs: [
      "Zelfde voorschriften als de merkdealer",
      "Persoonlijk advies in de werkplaats",
      "Concurrerende prijs voor merkwaardig onderhoud",
    ],
    faq: [
      {
        question: "Blijft mijn garantie geldig?",
        answer:
          "Ja. De merkbeurt volgt het fabrieksvoorschrift en de onderdelen voldoen aan de specificaties van de fabrikant. Daarmee blijft de fabrieksgarantie behouden.",
      },
    ],
    relatedSlugs: ["kleine-beurt", "grote-beurt", "apk-keuring"],
  },
  {
    id: "s-006",
    slug: "diagnose",
    name: "Diagnose & storingen",
    shortDescription:
      "Uitlezen en gericht zoeken naar de oorzaak van storingen, met moderne diagnoseapparatuur.",
    description:
      "Ons team spoort storingen op met de nieuwste technologie en moderne apparatuur, en verhelpt ze vakkundig. We lezen merkspecifieke systemen uit, leggen de oorzaak in gewone taal uit en geven een prijsopgave vóór we repareren. Zo voorkomt u dat er onderdelen worden vervangen die de storing niet oplossen.",
    image: "/images/garage/diagnostics.jpg",
    featured: true,
    category: "workshop",
    highlights: [
      "Moderne diagnoseapparatuur",
      "Merkspecifieke uitlezing",
      "Prijsopgave vóór de reparatie",
      "Proefrit indien nodig",
    ],
    whenNeeded: [
      "Motor-, ABS- of airbaglampje brandt",
      "Onverklaarbaar verbruik of vermogensverlies",
      "Startproblemen of meldingen in het display",
    ],
    whyUs: [
      "Ervaring met alle gangbare merken",
      "Eerst meten, dan pas vervangen",
      "Duidelijke uitleg van de oorzaak",
    ],
    faq: [
      {
        question: "Is diagnose altijd nodig bij een lampje?",
        answer:
          "Meestal wel. Eén lampje kan meerdere oorzaken hebben. Uitlezen voorkomt dat u betaalt voor onderdelen die het probleem niet verhelpen.",
      },
    ],
    relatedSlugs: ["kleine-beurt", "apk-keuring"],
  },
  {
    id: "s-007",
    slug: "banden-wissel",
    name: "Banden wisselen",
    shortDescription:
      "Wielenwissel €40, bandenwissel €70. Inclusief monteren, balanceren en nieuwe ventielen.",
    description:
      "Elk jaar wisselen ruim drie miljoen automobilisten van winter- naar zomerbanden en andersom. Plan de wissel op tijd, dan staan uw banden klaar op het afgesproken moment. Een bandenwissel duurt gemiddeld een uur: monteren, balanceren en de ventielen vervangen. Een wielenwissel is sneller klaar, in ongeveer 20 tot 30 minuten. Uitlijnen raden we aan bij nieuwe banden en duurt meestal een half uur. Heeft u lichtmetalen velgen met slotbouten, neem dan de speciale sleutel mee.",
    image: "/images/garage/tires.jpg",
    featured: true,
    category: "workshop",
    priceFrom: 40,
    priceLabel: "wielenwissel",
    prices: [
      { label: "Wielenwissel", amount: 40 },
      { label: "Bandenwissel", amount: 70 },
    ],
    highlights: [
      "Wielenwissel: €40 voor 4 wielen",
      "Bandenwissel: €70 voor 4 banden",
      "Balanceren en nieuwe ventielen",
      "Uitlijnen in ongeveer 30 minuten",
    ],
    whenNeeded: [
      "Bij de seizoenswissel, zodra het warmer of kouder wordt dan 7 °C",
      "Bij nieuwe banden, inclusief uitlijnen",
      "Wanneer u van velgen wisselt",
    ],
    whyUs: [
      "Vaste prijzen, vooraf bekend",
      "Banden liggen klaar op de afgesproken tijd",
      "Montage, balans en ventielen in één beurt",
    ],
    faq: [
      {
        question: "Wat kost een bandenwissel?",
        answer:
          "Een wielenwissel van vier wielen kost €40. Een bandenwissel van vier banden — demonteren, monteren, balanceren en nieuwe ventielen — kost €70.",
      },
      {
        question: "Hoe lang duurt het?",
        answer:
          "Een wielenwissel duurt ongeveer 20 tot 30 minuten. Een bandenwissel gemiddeld een uur. Uitlijnen komt daar nog een half uur bij en is aan te raden bij nieuwe banden.",
      },
      {
        question: "Moet ik iets meenemen?",
        answer:
          "Bij lichtmetalen velgen met slotbouten heeft u de speciale sleutel nodig. Neem die mee naar de afspraak.",
      },
    ],
    relatedSlugs: ["autobanden", "apk-keuring", "grote-beurt"],
  },
  {
    id: "s-008",
    slug: "autobanden",
    name: "Autobanden",
    shortDescription:
      "Zomer-, winter- en allseasonbanden in verschillende prijsklassen, vakkundig gemonteerd.",
    description:
      "Banden bepalen de grip, de stabiliteit in bochten en of de auto ook echt stopt als u remt. Wij leveren zomerbanden, winterbanden en 4-seizoenenbanden, in uiteenlopende prijsklassen en kwaliteiten, passend bij uw auto en rijstijl. Nieuwe banden monteren we direct op de velg: gebalanceerd, met een nieuw ventiel. Een set monteren duurt ongeveer een uur; een uitgebreider montagepakket ongeveer anderhalf uur. De wettelijke minimale profieldiepte is 1,6 mm. Wij adviseren eerder te wisselen: zomerbanden onder 2 mm, winterbanden onder 4 mm. Boven de 7 °C horen er zomerbanden onder; op winterbanden doorrijden in de zomer geeft minder grip en snellere slijtage.",
    image: "/images/garage/workshop.jpg",
    featured: false,
    category: "workshop",
    highlights: [
      "Zomer, winter en allseason",
      "Meerdere prijsklassen en kwaliteiten",
      "Montage, balanceren en nieuw ventiel",
      "Advies bij 2 mm (zomer) en 4 mm (winter)",
    ],
    whenNeeded: [
      "Profieldiepte onder 2 mm (zomer) of 4 mm (winter)",
      "Wettelijke grens is 1,6 mm — eerder vervangen rijdt veiliger",
      "Temperatuur boven 7 °C: tijd voor zomerbanden",
    ],
    whyUs: [
      "Advies zonder een duurdere band op te dringen",
      "Montage in de eigen werkplaats",
      "Bandenwissel €70, wielenwissel €40",
    ],
    faq: [
      {
        question: "Welke band past bij mijn auto?",
        answer:
          "Dat hangt af van het seizoen, uw kilometrage en of u vooral in de stad, op de snelweg of in de winter rijdt. We helpen u kiezen tussen zomer, winter en allseason, in een prijsklasse die bij de auto past.",
      },
      {
        question: "Wat kost monteren?",
        answer:
          "Een bandenwissel van vier banden kost €70 en duurt ongeveer een uur, inclusief balanceren en nieuwe ventielen. Een wielenwissel kost €40. De prijs van de banden hangt af van maat en kwaliteit.",
      },
    ],
    relatedSlugs: ["banden-wissel", "apk-keuring", "kleine-beurt"],
  },
  {
    id: "s-009",
    slug: "airco-service",
    name: "Airco-service",
    shortDescription:
      "Jaarlijkse controle van de airco, en bijvullen wanneer de koeling terugloopt.",
    description:
      "Een airco die goed werkt, houdt het interieur koel en de ruiten vrij van wasem. Wij adviseren de airco elk jaar te laten controleren en, als dat nodig is, bij te vullen. We kijken naar de werking, vullen koudemiddel bij en reinigen het systeem wanneer er een onaangename geur uit de ventilatie komt.",
    image: "/images/garage/airco.jpg",
    featured: false,
    category: "workshop",
    highlights: [
      "Jaarlijkse aircocheck",
      "Bijvullen wanneer nodig",
      "Reiniging bij onaangename geur",
      "Te combineren met een beurt",
    ],
    whenNeeded: [
      "Eén keer per jaar, preventief",
      "Wanneer de koeling minder wordt",
      "Bij een muffe geur uit de roosters",
    ],
    whyUs: [
      "Check en bijvullen in één afspraak",
      "Duidelijke prijs vooraf",
      "Zelfde werkplaats als uw onderhoud",
    ],
    faq: [
      {
        question: "Hoe vaak moet de airco gecontroleerd worden?",
        answer:
          "Eén keer per jaar. Merkt u dat de koeling terugloopt, dan vullen we het systeem bij.",
      },
    ],
    relatedSlugs: ["kleine-beurt", "diagnose"],
  },
  {
    id: "s-010",
    slug: "schadeherstel",
    name: "Schadeherstel",
    shortDescription:
      "Beoordeling en herstel van blik- en parkeerschade, netjes afgewerkt en klaar voor de weg.",
    description:
      "Heeft u schade aan de auto? We beoordelen wat er nodig is en herstellen het in de werkplaats: van een kleine parkeerdeuk tot een grotere herstelklus. U hoort vooraf wat we gaan doen. Waar dat helpt, stemmen we de afhandeling af met uw verzekeraar. Na het herstel kan de auto desgewenst meteen mee voor APK of onderhoud.",
    image: "/images/garage/brakes.jpg",
    featured: false,
    category: "workshop",
    highlights: [
      "Schadebeoordeling in de werkplaats",
      "Afstemming met de verzekeraar",
      "Vakkundig herstel",
      "Oplevering klaar voor de weg",
    ],
    whenNeeded: [
      "Na een aanrijding of parkeerschade",
      "Bij cosmetische schade die u netjes wilt laten maken",
      "Wanneer herstel en APK in één bezoek moeten",
    ],
    whyUs: [
      "Eén aanspreekpunt in Apeldoorn",
      "Transparante communicatie over de schade",
      "Combinatie met APK of onderhoud",
    ],
    faq: [
      {
        question: "Werken jullie met verzekeraars?",
        answer:
          "Ja. We kunnen de schadeafhandeling met uw verzekeraar afstemmen. Neem contact op voor de mogelijkheden van uw dossier.",
      },
    ],
    relatedSlugs: ["apk-keuring", "diagnose"],
  },
  {
    id: "s-011",
    slug: "takelservice",
    name: "24/7 takelservice",
    shortDescription:
      "Altijd bereikbaar, altijd hulp. Dag en nacht een takelwagen als u met pech staat.",
    description:
      "Staat u stil door pech, een lekke band of een ongeval? Bel ons: de takelservice van Car Service Nederland is 24 uur per dag, 7 dagen per week bereikbaar. We halen de auto op en brengen hem naar onze werkplaats in Apeldoorn, of naar een adres dat u doorgeeft. Daarna kunnen we meteen kijken wat er nodig is om weer veilig de weg op te gaan.",
    image: "/images/garage/pechhulp.jpg",
    featured: true,
    category: "workshop",
    priceLabel: "24 uur per dag, 7 dagen per week",
    cta: "phone",
    highlights: [
      "Dag en nacht bereikbaar",
      "Takelen bij pech of ongeval",
      "Transport naar onze werkplaats",
      "Daarna diagnose en herstel mogelijk",
    ],
    whenNeeded: [
      "De auto start niet of blijft stilstaan",
      "Na een ongeval, of wanneer de auto niet meer veilig rijdt",
      "Een lekke band of ander defect onderweg",
      "’s Avonds, ’s nachts of in het weekend",
    ],
    whyUs: [
      "Altijd bereikbaar, altijd hulp",
      "Eén nummer, ook buiten openingstijden",
      "Aansluitend onderhoud in onze eigen werkplaats",
    ],
    faq: [
      {
        question: "Zijn jullie ook ’s nachts bereikbaar?",
        answer:
          "Ja. De takelservice is 24 uur per dag en 7 dagen per week bereikbaar. Bel ons, ook buiten de openingstijden van de werkplaats.",
      },
      {
        question: "Waar brengen jullie de auto naartoe?",
        answer:
          "Standaard naar onze werkplaats in Apeldoorn, zodat we daarna kunnen kijken wat er aan de hand is. Een ander adres is in overleg mogelijk.",
      },
    ],
    relatedSlugs: ["diagnose", "schadeherstel", "apk-keuring"],
  },
];
