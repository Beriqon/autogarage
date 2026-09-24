import type { TeamMember } from "@/types/review";

export const team: TeamMember[] = [
  {
    id: "t-001",
    name: "Verkoop",
    role: "Inkoop & verkoop",
    bio: "Helpt u bij het vinden van een occasion, of bij de inkoop van uw auto. Ook voor import en export kunt u hier terecht.",
    image: "/images/garage/showroom-cars.jpg",
  },
  {
    id: "t-002",
    name: "Werkplaats",
    role: "Monteurs",
    bio: "Ervaren monteurs voor reparatie, onderhoud, APK, banden, airco en accu. Diagnose met moderne apparatuur.",
    image: "/images/garage/workshop.jpg",
  },
  {
    id: "t-003",
    name: "Klantenservice",
    role: "Afspraken & vragen",
    bio: "Het aanspreekpunt voor afspraken, statusupdates en vragen over onderhoud of een occasion.",
    image: "/images/garage/about-welcome.jpg",
  },
];
