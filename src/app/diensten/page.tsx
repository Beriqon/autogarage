import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { garage } from "@/config/garage";
import {
  getServicesByCategory,
} from "@/lib/repositories/services";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBand } from "@/components/home/cta-band";
import { ServicesShowcase } from "@/components/services/services-showcase";
import { MobilityServices } from "@/components/home/mobility-services";

export const metadata: Metadata = createPageMetadata({
  title: "Diensten",
  description: `APK, onderhoud, private lease, autoverzekering en BOVAG pechhulp bij ${garage.name} in ${garage.address.city}.`,
  path: "/diensten",
  image: "/images/garage/workshop.jpg",
});

const workshopPillars = [
  {
    title: "Heldere diagnose",
    description:
      "Eerst kijken, dan doen. U krijgt uitleg in begrijpelijke taal vóór we aan de slag gaan.",
  },
  {
    title: "Eerlijke prijs",
    description:
      "Transparante vanafprijzen en een vaste offerte na inspectie — zonder verrassingen achteraf.",
  },
  {
    title: "Vakkundig werk",
    description:
      "Ervaren monteurs, A-kwaliteit onderdelen en nazorg op uitgevoerd werk.",
  },
];

export default function DienstenPage() {
  const workshopServices = getServicesByCategory("workshop");
  const mobilityServices = getServicesByCategory("mobility");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Diensten", path: "/diensten" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        title="Diensten"
        description={`Van werkplaats tot private lease: bij ${garage.shortName} in ${garage.address.city} regelt u onderhoud, verzekering en pechhulp onder één dak.`}
        imageSrc="/images/garage/workshop.jpg"
        imageAlt={`Werkplaats van ${garage.name} in ${garage.address.city}`}
      />

      <MobilityServices services={mobilityServices} />

      <ServicesShowcase services={workshopServices} />

      <section className="bg-paper">
        <div className="grid lg:grid-cols-2">
          <Reveal className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
            <Image
              src="/images/garage/workshop-detail.jpg"
              alt={`Detail van de werkplaats bij ${garage.name}`}
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
                  Zo werken wij in de werkplaats
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  Geen verkooppraatjes, wel vakmanschap. We denken mee over wat
                  nodig is — en wat beter kan wachten.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/afspraak"
                    className="inline-flex rounded-full bg-ink px-7 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Plan een afspraak
                  </Link>
                  <Link
                    href="/werkplaats"
                    className="inline-flex rounded-full border border-ink/20 bg-transparent px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Bekijk de werkplaats
                  </Link>
                </div>
              </div>
            </Reveal>

            <ul className="mt-14 grid max-w-2xl gap-8 border-t border-line pt-12 sm:grid-cols-3 sm:gap-6">
              {workshopPillars.map((item, index) => (
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

      <CtaBand />
    </>
  );
}
