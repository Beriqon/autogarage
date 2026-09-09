import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "s-001",
    slug: "apk-keuring",
    name: "APK-keuring",
    shortDescription:
      "Snelle APK inclusief herkeuring wanneer nodig — zonder verrassingen.",
    description:
      "Laat uw auto keuren door onze RDW-erkende keurmeesters. Wij controleren grondig, leggen bevindingen helder uit en kunnen kleine gebreken vaak direct meenemen in de werkplaats.",
    image: "/images/garage/apk.jpg",
    featured: true,
    category: "workshop",
    priceFrom: 49.95,
    priceLabel: "vanaf",
    highlights: [
      "RDW-erkende keuring",
      "Duidelijke rapportage",
      "Vaak dezelfde dag klaar",
      "Combinatie met onderhoud mogelijk",
    ],
    whenNeeded: [
      "Uw APK-vervaldatum nadert",
      "U wilt zekerheid vóór verkoop of aankoop",
      "Na grotere reparaties of schadeherstel",
    ],
    whyUs: [
      "Keurmeesters met jarenlange ervaring",
      "Geen verkooppraatjes — alleen wat nodig is",
      "Afspraak online of telefonisch",
    ],
    faq: [
      {
        question: "Hoe lang duurt een APK?",
        answer:
          "Reken op ongeveer 45–60 minuten. Combineert u APK met onderhoud, dan plannen we voldoende tijd in.",
      },
      {
        question: "Mag ik wachten tijdens de keuring?",
        answer:
          "Ja, u bent welkom in onze wachtruimte met koffie. We houden u op de hoogte van de voortgang.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "diagnose"],
  },
  {
    id: "s-002",
    slug: "onderhoudsbeurt",
    name: "Onderhoudsbeurt",
    shortDescription:
      "Periodiek onderhoud volgens fabrieksvoorschrift, met originele of A-kwaliteit onderdelen.",
    description:
      "Van grote tot kleine beurt: olie, filters, remmen en slijtageonderdelen. We werken merkoverstijgend en volgen de onderhoudsintervallen van de fabrikant.",
    image: "/images/garage/maintenance.jpg",
    featured: true,
    category: "workshop",
    priceFrom: 149,
    priceLabel: "vanaf",
    highlights: [
      "Grote & kleine beurt",
      "Onderhoudsboekje digitaal bijgewerkt",
      "Transparante prijsopgave vooraf",
      "Vervangingsauto op aanvraag",
    ],
    whenNeeded: [
      "Bij het bereiken van het onderhoudsinterval",
      "Wanneer een storingslampje brandt",
      "Vóór een lange vakantierit",
    ],
    whyUs: [
      "Vakkundige diagnose vóór onnodige onderdelen",
      "Scherp geprijsde onderhoudspakketten",
      "Nazorg en garantie op uitgevoerd werk",
    ],
    faq: [
      {
        question: "Gebruiken jullie originele onderdelen?",
        answer:
          "We bieden OEM en A-kwaliteit equivalenten. U kiest zelf; wij adviseren op basis van leeftijd en gebruik van de auto.",
      },
    ],
    relatedSlugs: ["apk-keuring", "airco-service"],
  },
  {
    id: "s-003",
    slug: "diagnose",
    name: "Diagnose & storingen",
    shortDescription:
      "Uitlezen en gericht zoeken naar de oorzaak van storingen en lampjes.",
    description:
      "Met moderne diagnoseapparatuur lezen we merkspecifieke systemen uit. U krijgt een heldere uitleg van de oorzaak en een offerte vóór we repareren.",
    image: "/images/garage/diagnostics.jpg",
    featured: true,
    category: "workshop",
    priceFrom: 69,
    priceLabel: "vanaf",
    highlights: [
      "Merkspecifieke uitleesapparatuur",
      "Proefrit indien nodig",
      "Duidelijke diagnose vóór reparatie",
    ],
    whenNeeded: [
      "Motor-, ABS- of airbaglampje brandt",
      "Onverklaarbaar verbruik of vermogensverlies",
      "Startproblemen of waarschuwingen in het display",
    ],
    whyUs: [
      "Ervaring met Opel én andere merken",
      "Geen giswerk — meten is weten",
      "Snelle doorlooptijd",
    ],
    faq: [
      {
        question: "Is diagnose altijd nodig bij een lampje?",
        answer:
          "Vaak wel. Een lampje kan meerdere oorzaken hebben; uitlezen voorkomt onnodige onderdelenwissel.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "apk-keuring"],
  },
  {
    id: "s-004",
    slug: "banden-wissel",
    name: "Banden & wielen",
    shortDescription:
      "Seizoenswissel, balanceren, uitlijnen en advies over bandenmaten.",
    description:
      "Winter- en zomerbanden wisselen, opslaan of nieuw aanschaffen. We controleren profieldiepte, spanning en slijtagepatroon.",
    image: "/images/garage/tires.jpg",
    featured: true,
    category: "workshop",
    priceFrom: 25,
    priceLabel: "wissel vanaf",
    highlights: [
      "Seizoenswissel",
      "Balanceren & uitlijnen",
      "Bandenadvies op maat",
      "Optionele bandenopslag",
    ],
    whenNeeded: [
      "Bij seizoenswisseling",
      "Bij ongelijkmatige slijtage",
      "Wanneer het profiel onder de 1,6 mm komt",
    ],
    whyUs: [
      "Scherpe bandenprijzen",
      "Correcte montage en moment",
      "Advies zonder upsell-druk",
    ],
    faq: [
      {
        question: "Kunnen jullie banden opslaan?",
        answer:
          "Ja, vraagt u naar onze opslagmogelijkheden bij het maken van een wisselafspraak.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "apk-keuring"],
  },
  {
    id: "s-005",
    slug: "airco-service",
    name: "Airco-service",
    shortDescription:
      "Vullen, reinigen en controleren van het aircosysteem voor optimale koeling.",
    description:
      "Een goed werkende airco is comfortabel én veilig (ontwaseming). Wij controleren lekken, vullen koudemiddel bij en reinigen het systeem waar nodig.",
    image: "/images/garage/airco.jpg",
    featured: false,
    category: "workshop",
    priceFrom: 89,
    priceLabel: "vanaf",
    highlights: [
      "Aircocheck",
      "Bijvullen koudemiddel",
      "Desinfectie op verzoek",
    ],
    whenNeeded: [
      "Koeling is onvoldoende",
      "Ongeveer elke 2 jaar preventief",
      "Bij onaangename geur uit de ventilatie",
    ],
    whyUs: [
      "Gespecialiseerde aircostations",
      "Duidelijke prijs vooraf",
      "Combinatie met onderhoud mogelijk",
    ],
    faq: [
      {
        question: "Hoe vaak moet airco onderhouden worden?",
        answer:
          "Wij adviseren een check elke twee jaar, of eerder bij verminderde werking.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "diagnose"],
  },
  {
    id: "s-006",
    slug: "schadeherstel",
    name: "Schadeherstel",
    shortDescription:
      "Herstel van blikschade en cosmetische schade — netjes afgewerkt, klaar voor de weg.",
    description:
      "Heeft u schade aan uw auto? Wij beoordelen de schade, stemmen af met uw verzekeraar waar nodig en herstellen uw auto vakkundig. Van kleine deukjes tot grotere herstelklussen.",
    image: "/images/garage/brakes.jpg",
    featured: false,
    category: "workshop",
    priceFrom: undefined,
    priceLabel: "op aanvraag",
    highlights: [
      "Schadebeoordeling",
      "Afstemming met verzekeraar",
      "Vakkundig herstel",
      "Nazorg en oplevering",
    ],
    whenNeeded: [
      "Na een aanrijding of parkeerschade",
      "Bij hagelschade of cosmetische schade",
      "Wanneer u een nette oplevering wilt",
    ],
    whyUs: [
      "Ervaren werkplaats in Apeldoorn",
      "Transparante communicatie",
      "Combinatie met APK of onderhoud mogelijk",
    ],
    faq: [
      {
        question: "Werken jullie met verzekeraars?",
        answer:
          "Ja, we kunnen de schadeafhandeling met uw verzekeraar afstemmen. Neem contact op voor de mogelijkheden.",
      },
    ],
    relatedSlugs: ["apk-keuring", "autoverzekering"],
  },
  {
    id: "s-007",
    slug: "private-lease",
    name: "Private lease",
    shortDescription:
      "Rijden in een auto met een vast maandbedrag — zonder grote aanschaf in één keer.",
    description:
      "Wilt u bij Garage Ap van Beek een auto aanschaffen, maar liever niet het hele bedrag in één keer betalen? Met private lease betaalt u elke maand een vast bedrag. Verzekering, wegenbelasting en onderhoud zijn inbegrepen; alleen tanken doet u zelf. Wij werken samen met een gespecialiseerde leasemaatschappij en geven u vooraf een helder beeld van wat erbij zit en wat de maandelijkse kosten zijn.",
    image: "/images/garage/private-lease.jpg",
    featured: true,
    category: "mobility",
    priceLabel: "op maat",
    highlights: [
      "Vast maandbedrag",
      "Verzekering, wegenbelasting & onderhoud inbegrepen",
      "Geen fiscale bijtelling (particulier)",
      "Duidelijke kilometerafspraak vooraf",
    ],
    whenNeeded: [
      "U wilt een auto zonder grote eenmalige investering",
      "U zoekt overzichtelijke maandelijkse kosten",
      "U wilt ontzorgd worden rond verzekering en onderhoud",
    ],
    whyUs: [
      "Advies via uw vertrouwde garage in Apeldoorn",
      "Samenwerking met gespecialiseerde lease-partner",
      "Heldere uitleg over inbegrepen kosten",
    ],
    faq: [
      {
        question: "Wat is private lease precies?",
        answer:
          "Private lease is een vorm van huren: de auto blijft eigendom van de leasemaatschappij. Aan het eind van de looptijd levert u de auto weer in. U betaalt een vast maandbedrag en heeft geen omkijken naar verzekering, wegenbelasting of onderhoud.",
      },
      {
        question: "Kan ik private lease via jullie regelen?",
        answer:
          "Ja. Neem contact op of kom langs; wij bespreken de mogelijkheden en de maandelijkse kosten voor uw situatie.",
      },
    ],
    relatedSlugs: ["autoverzekering", "onderhoudsbeurt"],
  },
  {
    id: "s-008",
    slug: "autoverzekering",
    name: "Autoverzekering",
    shortDescription:
      "Verzekering op maat bij aankoop — WA, WA+ of Allrisk, direct geregeld.",
    description:
      "Koopt u een (nieuwe) auto, dan moet die vanaf dag één goed verzekerd zijn. Bij Garage Ap van Beek regelen we dat graag mee. We voeren de gegevens van uw auto in en geven een offerte op maat. U kiest zelf de dekking: WA, WA+ Beperkt Casco of Allrisk. Zo heeft u alles in één keer geregeld — en bij schade regelen wij reparatie en afhandeling.",
    image: "/images/garage/autoverzekering.jpg",
    featured: true,
    category: "mobility",
    priceLabel: "offerte op maat",
    highlights: [
      "Offerte op maat bij aankoop",
      "Keuze uit WA, WA+ of Allrisk",
      "Alles in één keer geregeld",
      "Schadeherstel in onze werkplaats",
    ],
    whenNeeded: [
      "Bij aankoop van een nieuwe of gebruikte auto",
      "Wanneer u dekking wilt herzien",
      "Als u schade wilt laten afhandelen via ons",
    ],
    whyUs: [
      "Persoonlijk advies in de showroom",
      "Direct afsluiten bij oplevering mogelijk",
      "Bekende monteurs bij schade — geen vreemde garage",
    ],
    faq: [
      {
        question: "Welke dekking past bij mij?",
        answer:
          "Dat hangt af van leeftijd, waarde en accessoires van de auto, en wat u belangrijk vindt. Wij helpen u bij die keuze.",
      },
      {
        question: "Regelen jullie ook schade?",
        answer:
          "Ja. Bij schade nemen we reparatie en afhandeling uit handen, zodat u bij uw vertrouwde garage blijft.",
      },
    ],
    relatedSlugs: ["schadeherstel", "private-lease"],
  },
  {
    id: "s-009",
    slug: "bovag-pechhulp",
    name: "BOVAG Pechhulp",
    shortDescription:
      "Pech onderweg? 24/7 hulp via BOVAG Pechhulp — snel weer op weg.",
    description:
      "Ook met goed onderhoud kan pech onderweg voorkomen. Bij Garage Ap van Beek bieden we pechservice in samenwerking met BOVAG Pechhulp. Bij panne belt u het speciale nummer; BOVAG Pechhulp schakelt uw BOVAG-autobedrijf of een professionele hulpdienst in. Zo bent u 24 uur per dag, 7 dagen per week gedekt.",
    image: "/images/garage/pechhulp.jpg",
    featured: true,
    category: "mobility",
    priceLabel: "op aanvraag",
    highlights: [
      "Samenwerking met BOVAG Pechhulp",
      "24/7 bereikbaar",
      "Snelle hulp bij pech onderweg",
      "Kosten en dekking in overleg",
    ],
    whenNeeded: [
      "U wilt zekerheid bij pech onderweg",
      "U reist veel of lange afstanden",
      "U wilt pechhulp via uw BOVAG-garage",
    ],
    whyUs: [
      "Gekoppeld aan uw vertrouwde garage",
      "Landelijke BOVAG-dekking",
      "Persoonlijk advies over kosten en mogelijkheden",
    ],
    faq: [
      {
        question: "Hoe werkt BOVAG Pechhulp?",
        answer:
          "Bij pech belt u het pechnummer. BOVAG Pechhulp schakelt direct uw BOVAG-autobedrijf of een professionele hulpdienst in om u weer op weg te helpen.",
      },
      {
        question: "Wat kost pechhulp?",
        answer:
          "De prijs hangt af van de gekozen dekking. Neem contact op; we bespreken de mogelijkheden en kosten.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "diagnose"],
  },
];
