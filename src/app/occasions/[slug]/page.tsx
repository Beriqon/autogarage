import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { garage } from "@/config/garage";
import {
  getAllVehicleSlugs,
  getRelatedVehiclesForSlug,
  getVehicleBySlug,
} from "@/lib/repositories/vehicles";
import { createPageMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  vehicleJsonLd,
} from "@/lib/structured-data";
import { buildVehicleWhatsAppMessage } from "@/lib/whatsapp";
import { formatMileage, formatPrice, vehicleTitle } from "@/lib/format";
import { leaseFromPrice } from "@/lib/lease";
import {
  bodyLabel,
  fuelLabel,
  transmissionLabel,
} from "@/lib/vehicles/labels";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { VehicleOptions } from "@/components/vehicles/vehicle-options";
import { VehicleSpecs } from "@/components/vehicles/vehicle-specs";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import { StickyVehicleCta } from "@/components/vehicles/sticky-vehicle-cta";
import { LeaseCalculator } from "@/components/vehicles/lease-calculator";
import { Reveal } from "@/components/shared/reveal";

const labelCopy = {
  "nieuw-binnen": "Nieuw binnen",
  "btw-auto": "BTW-auto",
} as const;

const statusCopy = {
  available: "Beschikbaar",
  reserved: "Gereserveerd",
  sold: "Verkocht",
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function PurchaseCard({
  vehicle,
  title,
  leaseFrom,
  isSold,
  appointmentHref,
  whatsappMessage,
}: {
  vehicle: NonNullable<ReturnType<typeof getVehicleBySlug>>;
  title: string;
  leaseFrom: number;
  isSold: boolean;
  appointmentHref: string;
  whatsappMessage: string;
}) {
  return (
    <div className="border border-line bg-surface p-5 md:p-6">
      <div className="flex flex-wrap gap-2">
        {vehicle.labels.map((label) => (
          <Badge key={label} variant="accent">
            {labelCopy[label]}
          </Badge>
        ))}
        <Badge
          variant={
            vehicle.status === "available"
              ? "success"
              : vehicle.status === "reserved"
                ? "muted"
                : "outline"
          }
        >
          {statusCopy[vehicle.status]}
        </Badge>
      </div>

      <h1 className="mt-4 font-display text-[clamp(1.5rem,1.2vw+1rem,2.15rem)] leading-tight text-ink">
        {title}
      </h1>

      <p className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">
        {formatPrice(vehicle.price)}
      </p>
      {leaseFrom > 0 ? (
        <p className="mt-1 text-sm text-muted">
          Vanaf{" "}
          <a
            href="#lease"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            {formatPrice(leaseFrom)} p/m leasen
          </a>
        </p>
      ) : null}

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5">
        {(
          [
            ["Bouwjaar", String(vehicle.year)],
            ["Kilometerstand", formatMileage(vehicle.mileage)],
            ["Brandstof", fuelLabel(vehicle.fuel)],
            ["Transmissie", transmissionLabel(vehicle.transmission)],
            ["Vermogen", `${vehicle.power} pk`],
            ["Carrosserie", bodyLabel(vehicle.bodyType)],
            ["Kleur", vehicle.color],
            [
              "Deuren",
              vehicle.specifications.doors != null
                ? String(vehicle.specifications.doors)
                : "",
            ],
            ["Kenteken", vehicle.specifications.licensePlate ?? ""],
            ["APK tot", vehicle.specifications.apkUntil ?? ""],
          ] as const
        )
          .filter((entry) => entry[1])
          .map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-sm font-semibold text-ink">{value}</dd>
            </div>
          ))}
      </dl>

      {!isSold ? (
        <div className="mt-5 hidden flex-col gap-2 md:flex">
          <Link
            href={appointmentHref}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            <Calendar className="size-4" aria-hidden />
            Proefrit aanvragen
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <PhoneLink
              asButton
              variant="secondary"
              size="lg"
              label="Bellen"
              className="w-full"
            />
            <WhatsAppButton
              message={whatsappMessage}
              label="WhatsApp"
              variant="secondary"
              size="lg"
              className="w-full"
            />
          </div>
        </div>
      ) : (
        <p className="mt-5 border border-line bg-paper px-4 py-3 text-sm text-muted">
          Deze occasion is verkocht. Bekijk onze{" "}
          <Link
            href="/occasions"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            actuele voorraad
          </Link>
          .
        </p>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return getAllVehicleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return createPageMetadata({
      title: "Occasion niet gevonden",
      description: `Deze occasion is niet (meer) beschikbaar bij ${garage.name}.`,
      path: `/occasions/${slug}`,
      noIndex: true,
    });
  }

  const title = vehicleTitle(vehicle);
  const description = `${title} — ${vehicle.year}, ${formatMileage(vehicle.mileage)}, ${formatPrice(vehicle.price)}. Bekijk specificaties en plan een proefrit bij ${garage.shortName} in ${garage.address.city}.`;

  return createPageMetadata({
    title,
    description,
    path: `/occasions/${vehicle.slug}`,
    image: vehicle.images[0],
  });
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const title = vehicleTitle(vehicle);
  const related = getRelatedVehiclesForSlug(vehicle.slug, 3);
  const whatsappMessage = buildVehicleWhatsAppMessage(garage, vehicle);
  const appointmentHref = `/afspraak?occasion=${encodeURIComponent(vehicle.slug)}`;
  const isSold = vehicle.status === "sold";
  const leaseFrom = isSold ? 0 : leaseFromPrice(vehicle.price);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Occasions", path: "/occasions" },
    { name: title, path: `/occasions/${vehicle.slug}` },
  ];

  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);
  const vehicleLd = vehicleJsonLd(vehicle);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleLd) }}
      />

      <Section
        tone="paper"
        className={cn(
          "pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16",
          !isSold && "pb-28 md:pb-24",
        )}
      >
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,24rem)] lg:gap-10">
          <VehicleGallery images={vehicle.images} alt={title} />
          <div className="lg:sticky lg:top-24">
            <PurchaseCard
              vehicle={vehicle}
              title={title}
              leaseFrom={leaseFrom}
              isSold={isSold}
              appointmentHref={appointmentHref}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,26rem)] lg:gap-10">
          <div>
            <h2 className="font-display text-xl text-ink md:text-2xl">Omschrijving</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {vehicle.description}
            </p>
          </div>

          {!isSold && vehicle.price > 0 ? (
            <div className="max-h-[min(36rem,70dvh)] overflow-y-auto overscroll-y-contain lg:sticky lg:top-24 lg:row-span-3 lg:max-h-[calc(100dvh-7rem)] lg:self-start">
              <LeaseCalculator
                purchasePrice={vehicle.price}
                vehicleSlug={vehicle.slug}
                vehicleTitle={title}
              />
            </div>
          ) : null}

          <VehicleOptions vehicle={vehicle} className="lg:col-start-1" />
          <VehicleSpecs vehicle={vehicle} className="lg:col-start-1" />
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface" className={!isSold ? "pb-28 md:pb-24 lg:pb-32" : undefined}>
          <Reveal>
            <SectionHeading
              eyebrow="Vergelijkbaar"
              title="Gerelateerde occasions"
              description="Andere auto’s die aansluiten bij dit model of prijsniveau."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10 md:mt-12">
            <VehicleGrid vehicles={related} />
          </Reveal>
          <div className="mt-10">
            <Link
              href="/occasions"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Alle occasions
            </Link>
          </div>
        </Section>
      ) : null}

      <StickyVehicleCta vehicle={vehicle} />
    </>
  );
}
