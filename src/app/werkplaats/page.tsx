import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { garage } from "@/config/garage";
import {
  getFeaturedServices,
  getServicesByCategory,
} from "@/lib/repositories/services";
import { getFeaturedGallery } from "@/lib/repositories/reviews";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { WorkshopGallery } from "@/components/home/workshop-gallery";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = createPageMetadata({
  title: "Werkplaats",
  description: `Moderne werkplaats bij ${garage.name} in ${garage.address.city}: APK, onderhoud, airco, banden en diagnose. Transparant advies en vervangend vervoer op aanvraag.`,
  path: "/werkplaats",
  image: "/images/garage/workshop.jpg",
});

const pillars = [
  {
    title: "Moderne apparatuur",
    description:
      "Diagnoseapparatuur en gereedschap om uw auto in optimale conditie te houden — merkoverstijgend.",
  },
  {
    title: "Transparant advies",
    description:
      "Reparaties pas na overleg. U weet vooraf wat er nodig is en wat het kost — geen verrassingen.",
  },
  {
    title: "Vervangend vervoer",
    description:
      "Leenauto of leenfiets op aanvraag. Geef het door bij het maken van uw werkplaatsafspraak.",
  },
];

export default function WerkplaatsPage() {
  const workshopServices = getServicesByCategory("workshop");
  const featuredWorkshop = getFeaturedServices(4, "workshop");
  const gallery = getFeaturedGallery(6);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Werkplaats", path: "/werkplaats" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        title="Werkplaats"
        description={`In onze moderne werkplaats in ${garage.address.city} gaat vakmanschap gepaard met ouderwetse service — APK, onderhoud, airco, banden en storingen.`}
        imageSrc="/images/garage/workshop.jpg"
        imageAlt={`Werkplaats van ${garage.name}`}
      />

      <section className="bg-paper">
        <div className="grid lg:grid-cols-2">
          <Reveal className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
            <Image
              src="/images/garage/workshop-bay.jpg"
              alt={`Werkplaatsbrug bij ${garage.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.1)_0%,rgba(26,20,16,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(26,20,16,0)_60%,rgba(245,243,241,0.15)_100%)]"
              aria-hidden
            />
          </Reveal>

          <div className="flex flex-col justify-center px-4 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
            <Reveal>
              <div className="max-w-lg">
                <h2 className="font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                  Vakmanschap met moderne middelen
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  Periodiek onderhoud is de slimste keuze voor veilig rijden.
                  Onze monteurs blijven via cursussen bij met de laatste
                  ontwikkelingen. Of het nu om Opel of een ander merk gaat: u
                  bent welkom.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  Blijkt tijdens de controle een reparatie nodig? Dan voeren we
                  die pas uit na overleg met u. Transparantie en eerlijkheid
                  horen bij hoe wij werken.
                </p>
                <Link
                  href="/afspraak"
                  className="mt-8 inline-flex rounded-full bg-ink px-7 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  Plan werkplaatsafspraak
                </Link>
              </div>
            </Reveal>

            <ul className="mt-14 grid max-w-2xl gap-8 border-t border-line pt-12 sm:grid-cols-3 sm:gap-6">
              {pillars.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={0.08 * (index + 1)}>
                    <p className="font-display text-sm tracking-[0.16em] text-muted uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-lg tracking-tight text-ink md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1a1410] text-white">
        <Container className="relative z-10 py-16 md:py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
              <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-white">
                Wat we in de werkplaats doen
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-right md:text-base">
                Van APK tot airco — dezelfde monteurs, heldere uitleg en eerlijke
                prijsafspraken.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workshopServices.map((service, index) => (
              <li key={service.id}>
                <Reveal delay={0.04 * index}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="group flex h-full flex-col border border-white/10 bg-white/[0.03] px-6 py-7 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    <h3 className="font-display text-xl tracking-tight text-white md:text-2xl">
                      {service.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                      {service.shortDescription}
                    </p>
                    <span className="mt-6 text-sm font-medium text-white/90 transition-transform duration-300 group-hover:translate-x-1">
                      Meer over {service.name.toLowerCase()} →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-16 md:py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
              <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                Foto&apos;s uit onze werkplaats
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
                Een indruk van hoe we werken — echte beelden van onze vestiging
                in {garage.address.city}.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:gap-4">
            {featuredWorkshop.map((service, index) => (
              <li key={service.id}>
                <Reveal delay={0.05 * index} className="h-full">
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.05)_0%,rgba(26,20,16,0.75)_100%)]"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
                      <h3 className="font-display text-xl text-white md:text-2xl">
                        {service.name}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WorkshopGallery images={gallery} />

      <CtaBand />
    </>
  );
}
