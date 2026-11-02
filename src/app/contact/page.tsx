import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { OpeningHours } from "@/components/shared/opening-hours";
import { MapEmbed } from "@/components/shared/map-embed";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Neem contact op met ${garage.name} in ${garage.address.city}. Bel, app of stuur een bericht — ${garage.address.street}.`,
  path: "/contact",
  image: "/images/damming/voorkant3.webp",
});

export default function ContactPage() {
  const { address } = garage;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;
  const whatsappUrl = `https://wa.me/${garage.whatsapp.replace(/\D/g, "")}`;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        action={{ label: "Neem contact op", href: "#contactformulier" }}
        title="Welkom bij Damming"
        description={`Stel uw vraag over occasions, onderhoud of een bezoek. U bereikt ${garage.shortName} telefonisch of met het formulier — welkom aan de ${address.street} in ${address.city}.`}
        imageSrc="/images/damming/voorkant3.webp"
        imageAlt="Voorgevel en ingang van Garage Damming"
      />

      <section id="contactformulier" className="scroll-mt-24 bg-paper">
        <Container className="py-16 md:py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
              <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                Stuur een bericht
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
                We reageren doorgaans binnen één werkdag. Voor spoed: bel of
                WhatsApp.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="space-y-10 lg:sticky lg:top-28">
                <div>
                  <h3 className="font-display text-2xl text-ink">Bezoekadres</h3>
                  <address className="mt-4 not-italic">
                    <p className="font-display text-lg text-ink">{garage.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                      {address.street}
                      <br />
                      {address.postalCode} {address.city}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                      Inkoop & verkoop
                      <br />
                      <a href={`tel:${garage.whatsapp}`} className="text-ink">
                        {garage.phoneDisplay}
                      </a>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                      Klantenservice
                      <br />
                      <a href={`tel:${garage.phone}`} className="text-ink">
                        {garage.phoneDisplay}
                      </a>
                    </p>
                  </address>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={`tel:${garage.phone}`}
                      className="inline-flex w-fit rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
                    >
                      {garage.phoneDisplay}
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                    >
                      WhatsApp ons
                    </a>
                    <a
                      href={`mailto:${garage.email}`}
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {garage.email}
                    </a>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/afspraak"
                      className="inline-flex rounded-full bg-ink px-7 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                    >
                      Afspraak maken
                    </Link>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-ink/20 px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
                    >
                      Route plannen
                    </a>
                  </div>
                </div>

                <div className="border-t border-line pt-8">
                  <OpeningHours />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#181818] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><path fill='none' stroke='#fff' stroke-width='1.2' d='M60 12 L88 28 V68 L60 108 L32 68 V28 Z'/><path fill='none' stroke='#fff' stroke-width='1' d='M60 28 L76 38 V62 L60 88 L44 62 V38 Z'/></svg>`,
            )}")`,
            backgroundSize: "120px 120px",
          }}
          aria-hidden
        />

        <Container className="relative z-10 py-16 md:py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
              <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-white">
                Vind ons in {address.city}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-right md:text-base">
                {address.street} in {address.city}. Parkeren voor de deur.
              </p>
            </div>
          </Reveal>
        </Container>

        <Reveal delay={0.08}>
          <div className="relative min-h-[360px] md:min-h-[480px] lg:min-h-[560px]">
            <MapEmbed className="absolute inset-0 aspect-auto h-full border-0 md:aspect-auto" />
          </div>
        </Reveal>
      </section>

      <section className="bg-paper">
        <Container className="py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Uw bezoek</p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">Zo herkent u ons</h2>
          <p className="mt-4 max-w-xl text-muted">U vindt ons aan de Prinsenweide 5. Kom gerust kennismaken, bekijk de showroom of neem plaats met een kop koffie.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { src: "voorkant2", title: "Welkom bij Damming", text: "Onze voorgevel aan de Prinsenweide." },
              { src: "zijingang", title: "Naast het pand", text: "Een herkenningspunt bij uw bezoek aan onze werkplaats." },
              { src: "wachtruimte", title: "De koffie staat klaar", text: "Neem rustig plaats in onze wachtruimte." },
            ].map((photo) => (
              <figure key={photo.src}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={`/images/damming/${photo.src}.webp`} alt={photo.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                </div>
                <figcaption className="mt-4"><h3 className="font-display text-xl text-ink">{photo.title}</h3><p className="mt-2 text-sm text-muted">{photo.text}</p></figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
