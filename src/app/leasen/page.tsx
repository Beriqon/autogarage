import type { Metadata } from "next";
import Link from "next/link";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import {
  LEASE_DEFAULT_TERM,
  formatLeaseApr,
  formatNominalRate,
} from "@/lib/lease";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";

const steps = [
  {
    title: "Kies een occasion",
    text: "Op elke auto staat al een indicatief maandbedrag: vanaf … leasen.",
  },
  {
    title: "Stel de financiering in",
    text: "Pas aanbetaling, inruil, slottermijn en looptijd aan. Het maandbedrag rekent direct mee.",
  },
  {
    title: "Vraag een offerte aan",
    text: "Vrijblijvend, voor ondernemers (financial lease) en particulieren (autofinanciering).",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Leasen",
  description: `Financial lease en autofinanciering op occasions van ${garage.name} in ${garage.address.city}. Bereken een indicatief maandbedrag en vraag een vrijblijvende offerte aan.`,
  path: "/leasen",
  image: "/images/garage/private-lease.jpg",
});

export default function LeasenPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Leasen", path: "/leasen" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Financieren"
        title="Leasen bij aankoop"
        description={`Financial lease of autofinanciering op een occasion van ${garage.shortName}. Het maandbedrag rekent u per auto; de offerte is vrijblijvend.`}
        imageSrc="/images/garage/private-lease.jpg"
        imageAlt={`Occasion die te leasen is bij ${garage.name}`}
      />

      <section className="bg-paper">
        <Container className="py-16 md:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <h2 className="font-display text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-tight text-ink">
                Zakelijk en particulier
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <article className="border border-line bg-surface p-6">
                  <h3 className="font-display text-xl text-ink">Financial lease</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Voor ondernemers. U wordt economisch eigenaar, de auto staat
                    op de balans en de btw is vaak verrekenbaar bij een btw-auto.
                  </p>
                </article>
                <article className="border border-line bg-surface p-6">
                  <h3 className="font-display text-xl text-ink">Autofinanciering</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Voor particulieren in loondienst. U rijdt de auto en betaalt
                    een vast maandbedrag, met een slottermijn aan het einde.
                  </p>
                </article>
              </div>
              <p className="mt-8 text-sm leading-relaxed text-muted">
                Op elke auto staat een indicatie bij {LEASE_DEFAULT_TERM} maanden,
                zonder aanbetaling en met een slottermijn van 15%. Rekenvoorbeeld
                op basis van {formatNominalRate()} nominale rente
                (JKP {formatLeaseApr()}). Dit is een indicatie, geen kredietaanbod.
              </p>
              <p className="mt-4 border border-ink/15 bg-surface px-4 py-3 text-sm font-medium text-ink">
                Let op! Geld lenen kost geld
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5">
              <h2 className="font-display text-xl text-ink md:text-2xl">
                Zo werkt het
              </h2>
              <ol className="mt-6 space-y-6">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-display text-sm tracking-[0.14em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/occasions"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "mt-8",
                )}
              >
                Kies een auto en bereken
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
