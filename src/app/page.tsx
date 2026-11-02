import type { Metadata } from "next";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { getFeaturedVehicles } from "@/lib/repositories/vehicles";
import {
  getFeaturedServices,
  getServicesBySlugs,
} from "@/lib/repositories/services";
import {
  getFeaturedGallery,
  getFeaturedReviews,
} from "@/lib/repositories/reviews";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/home/hero";
import { SellYourCar } from "@/components/home/sell-your-car";
import { FeaturedOccasions } from "@/components/home/featured-occasions";
import { ServicesPreview } from "@/components/home/services-preview";
import { MobilityServices } from "@/components/home/mobility-services";
import { StatsBand } from "@/components/home/stats-band";
import { AboutPreview } from "@/components/home/about-preview";
import { WorkshopGallery } from "@/components/home/workshop-gallery";
import { Reviews } from "@/components/home/reviews";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = createPageMetadata({
  title: `Occasions & garage in ${garage.address.city}`,
  description: garage.description,
  path: "/",
  image: "/images/damming/voorkant3.webp",
});

export default function Home() {
  const vehicles = getFeaturedVehicles(4);
  const workshopServices = getFeaturedServices(4, "workshop");
  const onderhoudServices = getServicesBySlugs([
    "kleine-beurt",
    "grote-beurt",
    "merkbeurt",
    "autobanden",
    "airco-service",
    "schadeherstel",
  ]);
  const reviews = getFeaturedReviews(3);
  const gallery = getFeaturedGallery(6);

  return (
    <>
      <Hero />
      <FeaturedOccasions vehicles={vehicles} />
      <section className="bg-paper" aria-label="Auto verkopen">
        <Container className="grid gap-4 py-4 sm:gap-5 sm:py-6 lg:py-8">
          <SellYourCar />
        </Container>
      </section>
      <ServicesPreview services={workshopServices} />
      <MobilityServices
        services={onderhoudServices}
        eyebrow="Onderhoud en banden"
        title="Kleine beurt, grote beurt en merkbeurt"
        description="Onderhoud voor elk merk, ook elektrisch. Nieuwe autobanden monteren we in de werkplaats; airco controleren we jaarlijks."
      />
      <StatsBand />
      <AboutPreview />
      <WorkshopGallery images={gallery} />
      <Reviews reviews={reviews} />
      <CtaBand />
    </>
  );
}
