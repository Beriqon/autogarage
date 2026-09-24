import type { GarageConfig } from "@/types/garage";

const googleReviews = {
  score: 4.8,
  count: 187,
  url: "https://www.google.com/search?sca_esv=76c3b7943658a61d&rlz=1C1GCEA_enNL990NL990&sxsrf=APpeQnsIYEcYRi5bxDfah_RR7QP7rOPmkQ:1790198153208&q=car+service+nederland+google+reviews&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_4WGWD-M7xUeAZ1EA_4HM16cl-OonqXzU0TKEzrM3HQPfmz0H8AEQR9o9ZsI828k8QuzffI%3D&uds=AJ5uw195omnGJ76DOhPThDoE1qc-brDyWuXXCw4wCpSQJvXvG31KtGnPz0Q6hajqbq82qMG50-lJ0acosp8Sz4m1OUgiDo_QgmhQJiiCdfxX95aT5-RSTNsmQ7GUJ9F4P-1HjFPCeRDZ&sa=X&ved=2ahUKEwiyjP_nz4WXAxXyhv0HHelYDbwQ3PALegQILBAF&biw=1536&bih=730&dpr=1.25",
};

const trustpilotReviews = {
  score: 4.7,
  count: 41,
  url: "https://nl.trustpilot.com/review/csnauto.nl",
};

const reviewCount = googleReviews.count + trustpilotReviews.count;
const reviewScore =
  Math.round(
    ((googleReviews.score * googleReviews.count +
      trustpilotReviews.score * trustpilotReviews.count) /
      reviewCount) *
      10,
  ) / 10;

const reviewScoreLabel = reviewScore.toLocaleString("nl-NL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const garage: GarageConfig = {
  name: "Car Service Nederland",
  shortName: "Car Service Nederland",
  legalName: "Car Service Nederland",
  tagline: "Veilig en soepel op weg",
  description:
    "Car Service Nederland is een autobedrijf in Apeldoorn, gespecialiseerd in autoreparaties, onderhoud, inkoop, verkoop, import en export.",
  logo: "/images/brand/logo-mark.png",
  logoDark: "/images/brand/logo-mark.png",
  colors: {
    ink: "#12151A",
    paper: "#F2F3F5",
    surface: "#FFFFFF",
    muted: "#5A616A",
    line: "#D4D7DC",
    accent: "#16325A",
    accentHover: "#102440",
    success: "#2A6B52",
  },
  phone: "+31611264594",
  phoneDisplay: "06 11 26 45 94",
  whatsapp: "+31624460853",
  email: "info@csnauto.nl",
  website: "https://www.csnauto.nl",
  address: {
    street: "Sleutelbloemstraat 12",
    postalCode: "7322 AG",
    city: "Apeldoorn",
    region: "Gelderland",
    country: "Nederland",
    countryCode: "NL",
  },
  coordinates: {
    lat: 52.2241489,
    lng: 5.9760954,
  },
  openingHours: [
    { day: "monday", label: "Maandag", open: "08:00", close: "18:30" },
    { day: "tuesday", label: "Dinsdag", open: "08:00", close: "18:30" },
    { day: "wednesday", label: "Woensdag", open: "08:00", close: "18:30" },
    { day: "thursday", label: "Donderdag", open: "08:00", close: "18:30" },
    { day: "friday", label: "Vrijdag", open: "08:00", close: "18:30" },
    { day: "saturday", label: "Zaterdag", open: "08:00", close: "18:30" },
    { day: "sunday", label: "Zondag", open: "12:00", close: "17:30" },
  ],
  socials: {
    facebook: "https://www.facebook.com/carservicenederland",
    instagram: "https://www.instagram.com/carservicenederland/",
    x: "https://x.com/CarNederland",
    linkedin: "https://www.linkedin.com/company/csnautos",
    tiktok: "https://www.tiktok.com/@csnauto",
  },
  reviewScore,
  reviewCount,
  googleReviews,
  trustpilotReviews,
  stats: [
    { label: "jaar in Apeldoorn", value: "10+" },
    { label: "occasions op voorraad", value: "90+" },
    { label: "dagen per week open", value: "7" },
    { label: "klantscore", value: reviewScoreLabel },
  ],
  uspItems: [
    {
      title: "Reparatie en onderhoud",
      description:
        "Ervaren monteurs houden uw auto veilig en soepel op de weg, met moderne apparatuur en een duidelijke prijsafspraak.",
    },
    {
      title: "Inkoop en verkoop",
      description:
        "Occasions uit eigen voorraad, te koop of te leasen. Plus inkoop, import en export.",
    },
    {
      title: "Scherpe prijzen",
      description:
        "Hoogwaardig werk tegen concurrerende tarieven — voor onderhoud, APK, banden, airco en accu.",
    },
    {
      title: "Ook op zondag open",
      description:
        "Maandag tot en met zaterdag van 08:00 tot 18:30 uur, zondag van 12:00 tot 17:30 uur.",
    },
  ],
};
