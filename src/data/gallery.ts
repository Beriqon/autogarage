import type { GalleryImage } from "@/types/review";
import { garage } from "@/config/garage";

export const gallery: GalleryImage[] = [
  {
    id: "g-001",
    src: "/images/garage/hero.jpg",
    alt: `Showroom ${garage.name} in ${garage.address.city}`,
    category: "showroom",
    featured: true,
  },
  {
    id: "g-002",
    src: "/images/garage/workshop.jpg",
    alt: "Moderne werkplaats met hefbruggen",
    category: "workshop",
    featured: true,
  },
  {
    id: "g-003",
    src: "/images/garage/workshop-bay.jpg",
    alt: "Werkplaatsbrug en diagnoseapparatuur",
    category: "workshop",
    featured: true,
  },
  {
    id: "g-004",
    src: "/images/garage/about-welcome.jpg",
    alt: "Showroom en ontvangst bij Ap van Beek",
    category: "showroom",
    featured: true,
  },
  {
    id: "g-005",
    src: "/images/garage/showroom-2.jpg",
    alt: "Occasions in de showroom",
    category: "showroom",
    featured: true,
  },
  {
    id: "g-006",
    src: "/images/garage/team.jpg",
    alt: `Team van ${garage.name}`,
    category: "team",
    featured: true,
  },
  {
    id: "g-007",
    src: "/images/garage/over-ons.jpg",
    alt: `Vestiging van ${garage.name} in Apeldoorn`,
    category: "showroom",
    featured: false,
  },
  {
    id: "g-008",
    src: "/images/garage/apk.jpg",
    alt: "APK en onderhoud in de werkplaats",
    category: "workshop",
    featured: false,
  },
  {
    id: "g-009",
    src: "/images/garage/diagnostics.jpg",
    alt: "Storingsdiagnose in de werkplaats",
    category: "detail",
    featured: false,
  },
  {
    id: "g-010",
    src: "/images/garage/showroom-1.jpg",
    alt: "Occasions op de vloer",
    category: "showroom",
    featured: false,
  },
];
