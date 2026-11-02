import type { GarageConfig } from "@/types/garage";

const googleReviews = {
  score: 5,
  count: 19,
  url: "https://www.google.com/search?q=Damming+Techniek+Apeldoorn+reviews",
};

const reviewCount = googleReviews.count;
const reviewScore = googleReviews.score;

const reviewScoreLabel = reviewScore.toLocaleString("nl-NL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const garage: GarageConfig = {
  name: "Garage Damming Techniek",
  shortName: "Damming Techniek",
  legalName: "Garage Damming Techniek",
  tagline: "Veilig en soepel op weg",
  description:
    "Garage Damming Techniek is een autobedrijf in Apeldoorn, gespecialiseerd in autoreparaties, onderhoud, inkoop, verkoop, import en export.",
  logo: "/images/brand/damming-wordmark.svg",
  logoDark: "/images/brand/damming-wordmark.svg",
  colors: {
    ink: "#181818",
    paper: "#f5f4f1",
    surface: "#FFFFFF",
    muted: "#66635f",
    line: "#d9d5cf",
    accent: "#805b3e",
    accentHover: "#65452f",
    success: "#62634f",
  },
  phone: "+31625048182",
  phoneDisplay: "+31 6 25048182",
  whatsapp: "+31625048182",
  email: "info@dammingtechniek.nl",
  website: "https://www.dammingtechniek.nl",
  address: {
    street: "Prinsenweide 5",
    postalCode: "7317 BA",
    city: "Apeldoorn",
    region: "Gelderland",
    country: "Nederland",
    countryCode: "NL",
  },
  openingHours: [
    { day: "monday", label: "Maandag", open: "08:30", close: "18:00" },
    { day: "tuesday", label: "Dinsdag", open: "08:30", close: "18:00" },
    { day: "wednesday", label: "Woensdag", open: "08:30", close: "18:00" },
    { day: "thursday", label: "Donderdag", open: "08:30", close: "18:00" },
    { day: "friday", label: "Vrijdag", open: "08:30", close: "18:00" },
    { day: "saturday", label: "Zaterdag", open: "10:00", close: "17:00" },
    { day: "sunday", label: "Zondag", open: null, close: null, closed: true },
  ],
  socials: {
    instagram: "https://www.instagram.com/dammingtechniek",
  },
  reviewScore,
  reviewCount,
  googleReviews,
  stats: [
    { label: "jaar in Apeldoorn", value: "30+" },
    { label: "adres voor auto & onderhoud", value: "1" },
    { label: "dagen per week open", value: "6" },
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
        "Occasions uit eigen voorraad, te koop. Plus inkoop, import en export.",
    },
    {
      title: "Scherpe prijzen",
      description:
        "Hoogwaardig werk tegen concurrerende tarieven — voor onderhoud, APK, banden, airco en accu.",
    },
    {
      title: "Ook ’s avonds op afspraak",
      description:
        "Maandag tot en met vrijdag van 08:30 tot 18:00 uur, zaterdag van 10:00 tot 17:00 uur. Zondag gesloten. ’s Avonds eventueel mogelijk op afspraak.",
    },
  ],
};
