import type { TeamMember } from "@/types/review";

export const team: TeamMember[] = [
  {
    id: "t-001",
    name: "Ap van Beek",
    role: "Eigenaar",
    bio: "Sinds 1983 actief in de autobranche. Bouwde Garage Ap van Beek uit tot een full-service bedrijf met twee vestigingen in Apeldoorn — met Opel als specialisme.",
    image: "/images/garage/team-erik.jpg",
  },
  {
    id: "t-002",
    name: "Verkoopteam",
    role: "Occasions & advies",
    bio: "Helpt u bij het vinden van de juiste occasion. Staat geen geschikte auto tussen? Dan gaan we graag op zoekopdracht voor u aan de slag.",
    image: "/images/garage/team-nadia.jpg",
  },
  {
    id: "t-003",
    name: "Werkplaats",
    role: "Monteurs",
    bio: "Vertrouwde monteurs met moderne diagnoseapparatuur. Van APK en onderhoud tot complexe storingen — vakmanschap met ouderwetse service.",
    image: "/images/garage/team-marc.jpg",
  },
  {
    id: "t-004",
    name: "Receptie",
    role: "Service & afspraken",
    bio: "Het aanspreekpunt voor afspraken, statusupdates en vragen. Service en klantvriendelijkheid staan bij Ap van Beek op één.",
    image: "/images/garage/team-sofie.jpg",
  },
];
