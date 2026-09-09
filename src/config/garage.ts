import type { GarageConfig } from "@/types/garage";

export const garage: GarageConfig = {
  name: "Garage Ap van Beek",
  shortName: "Ap van Beek",
  legalName: "Garage Ap van Beek",
  tagline: "Vakmanschap met ouderwetse service",
  description:
    "Garage Ap van Beek is sinds 1983 een begrip in Apeldoorn voor aankoop en onderhoud van alle merken, met specialisme Opel. Moderne werkplaats, ruim occasions-aanbod en persoonlijke service.",
  logo: "/images/brand/logo.png",
  logoDark: "/images/brand/logo-dark.png",
  colors: {
    ink: "#231913",
    paper: "#F5F3F1",
    surface: "#FFFFFF",
    muted: "#6B6560",
    line: "#D2CDCA",
    accent: "#2F241E",
    accentHover: "#231913",
    success: "#2F6B4F",
  },
  phone: "+31553551175",
  phoneDisplay: "055 355 11 75",
  whatsapp: "+31553551175",
  email: "info@apvanbeek.nl",
  website: "https://apvanbeek.nl",
  address: {
    street: "Veenweg 44",
    postalCode: "7336 AG",
    city: "Apeldoorn",
    region: "Gelderland",
    country: "Nederland",
    countryCode: "NL",
  },
  coordinates: {
    lat: 52.1786,
    lng: 5.9789,
  },
  openingHours: [
    { day: "monday", label: "Maandag", open: "08:30", close: "18:00" },
    { day: "tuesday", label: "Dinsdag", open: "08:30", close: "18:00" },
    { day: "wednesday", label: "Woensdag", open: "08:30", close: "18:00" },
    { day: "thursday", label: "Donderdag", open: "08:30", close: "18:00" },
    { day: "friday", label: "Vrijdag", open: "08:30", close: "18:00" },
    { day: "saturday", label: "Zaterdag", open: "09:00", close: "16:00" },
    { day: "sunday", label: "Zondag", open: null, close: null, closed: true },
  ],
  socials: {},
  reviewScore: 4.9,
  reviewCount: 41,
  stats: [
    { label: "jaar ervaring", value: "40+" },
    { label: "occasions op voorraad", value: "12+" },
    { label: "medewerkers", value: "7" },
    { label: "Google-score", value: "4,9" },
  ],
  uspItems: [
    {
      title: "Sinds 1983",
      description:
        "Al meer dan veertig jaar een begrip in Apeldoorn en verre omstreken — voor aankoop én onderhoud van alle merken.",
    },
    {
      title: "Opel-specialist",
      description:
        "Specialisme in Opel, nieuw en gebruikt. Ook voor andere merken bent u van harte welkom in onze werkplaats.",
    },
    {
      title: "Persoonlijke service",
      description:
        "Geen prijsvechter, wel het beste voor een scherpe prijs. De klant staat centraal — Ap van Beek staat u graag persoonlijk te woord.",
    },
    {
      title: "Moderne werkplaats",
      description:
        "APK, onderhoud, aircoservice, banden en storingsdiagnose met moderne gereedschappen en diagnoseapparatuur.",
    },
  ],
  kvk: "54620627",
  btw: "NL851375169B01",
};
