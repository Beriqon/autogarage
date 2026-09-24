import Link from "next/link";
import type { Service } from "@/types/service";
import { garage } from "@/config/garage";
import { buildServiceWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

type ServiceCtaProps = {
  service: Service;
};

export function ServiceCta({ service }: ServiceCtaProps) {
  const appointmentHref = `/afspraak?dienst=${encodeURIComponent(service.slug)}`;
  const whatsappMessage = buildServiceWhatsAppMessage(garage, service);
  const isPhone = service.cta === "phone";

  return (
    <Section tone="ink">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-semibold tracking-[0.14em] text-white/55 uppercase">
            {isPhone ? "Altijd bereikbaar" : "Afspraak maken"}
          </p>
          <h2 className="mt-3 font-display text-paper">
            {isPhone ? "Hulp nodig? Bel ons." : `${service.name} inplannen?`}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            {isPhone
              ? `De takelservice van ${garage.shortName} is 24 uur per dag bereikbaar, ook ’s nachts en in het weekend. Bel direct, of stuur een WhatsApp.`
              : `Plan online een moment bij ${garage.shortName} in ${garage.address.city}, of neem contact op via WhatsApp. We denken graag met u mee over planning en kosten.`}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {isPhone ? (
              <PhoneLink
                asButton
                variant="primary"
                size="lg"
                label={garage.phoneDisplay}
              />
            ) : (
              <Link
                href={appointmentHref}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                Online afspraak
              </Link>
            )}
            <WhatsAppButton
              message={whatsappMessage}
              variant="inverse"
              size="lg"
              label="WhatsApp ons"
            />
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}
            >
              Contact
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
