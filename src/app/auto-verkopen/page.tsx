import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { formatPhoneHref } from "@/lib/format";
import { buildSellCarWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { OpeningHours } from "@/components/shared/opening-hours";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { SellCarForm } from "@/components/forms/sell-car-form";

const points = [
  "Alle merken, ook met schade of een hoge kilometerstand",
  "Inruil op een occasion uit de voorraad, of directe verkoop",
  "Vrijblijvend bod, vaak dezelfde dag",
  "Ophalen in overleg, of langskomen in Apeldoorn",
];

export const metadata: Metadata = createPageMetadata({
  title: "Wij kopen uw auto",
  description: `Verkoop of ruil uw auto in bij ${garage.name} in ${garage.address.city}. Vul kenteken en kilometerstand in voor een vrijblijvend bod.`,
  path: "/auto-verkopen",
  image: "/images/garage/showroom-1.jpg",
});

export default function AutoVerkopenPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Auto verkopen", path: "/auto-verkopen" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Inkoop"
        title="Wij kopen uw auto"
        description={`Stuur uw kenteken en kilometerstand. ${garage.shortName} neemt contact op met een vrijblijvend bod — inruil of directe verkoop.`}
        imageSrc="/images/garage/showroom-1.jpg"
        imageAlt={`Occasions bij ${garage.name} in ${garage.address.city}`}
      />

      <section className="bg-paper">
        <Container className="py-16 md:py-20 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="border border-line bg-surface p-6 md:p-8">
                <h2 className="font-display text-xl text-ink md:text-2xl">
                  Vraag een bod aan
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                  Velden met een * zijn verplicht. We gebruiken het kenteken om
                  merk en model op te zoeken. Foto&apos;s van de staat van de auto
                  helpen bij een scherper bod.
                </p>
                <div className="mt-8">
                  <SellCarForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="space-y-10 lg:sticky lg:top-28">
                <div>
                  <h2 className="font-display text-xl text-ink md:text-2xl">
                    Zo werkt het
                  </h2>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted md:text-base">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-ink"
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-8">
                  <h2 className="font-display text-xl text-ink">
                    Liever direct contact?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                    Bel of WhatsApp de inkoop. Handig als u meteen wilt
                    schakelen over prijs of ophalen.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href={`tel:${formatPhoneHref(garage.whatsapp)}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "md" }),
                        "w-fit",
                      )}
                    >
                      <Phone className="size-4" aria-hidden />
                      06 24 46 08 53
                    </Link>
                    <WhatsAppButton
                      size="md"
                      className="w-fit"
                      message={buildSellCarWhatsAppMessage(garage)}
                    />
                  </div>
                </div>

                <div className="border-t border-line pt-8">
                  <OpeningHours />
                </div>

                <div className="border-t border-line pt-8">
                  <p className="font-display text-sm font-semibold tracking-[0.12em] text-muted uppercase">
                    Adres
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {garage.address.street}
                    <br />
                    {garage.address.postalCode} {garage.address.city}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
