import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Service } from "@/types/service";
import { garage } from "@/config/garage";
import { formatPrice } from "@/lib/format";
import { buildServiceWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

type ServiceHeroProps = {
  service: Service;
  className?: string;
};

export function ServiceHero({ service, className }: ServiceHeroProps) {
  const appointmentHref = `/afspraak?dienst=${encodeURIComponent(service.slug)}`;
  const whatsappMessage = buildServiceWhatsAppMessage(garage, service);

  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:items-end",
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-ink md:aspect-[16/10]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Dienst
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,2vw+1rem,2.75rem)] leading-tight text-ink">
          {service.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {service.shortDescription}
        </p>

        {service.prices && service.prices.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {service.prices.map((price) => (
              <li
                key={price.label}
                className="flex items-baseline justify-between gap-6 border-b border-line pb-2 font-display text-xl font-semibold text-ink last:border-b-0"
              >
                <span className="text-sm font-sans font-normal tracking-normal text-muted">
                  {price.label}
                </span>
                {formatPrice(price.amount)}
              </li>
            ))}
          </ul>
        ) : service.priceFrom != null ? (
          <p className="mt-6 font-display text-2xl font-semibold text-ink">
            <span className="mr-2 text-sm font-sans font-normal tracking-normal text-muted">
              {service.priceLabel ?? "vanaf"}
            </span>
            {formatPrice(service.priceFrom)}
          </p>
        ) : service.priceLabel ? (
          <p className="mt-6 text-sm text-muted">{service.priceLabel}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {service.cta === "phone" ? (
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
              <Calendar className="size-4" aria-hidden />
              Afspraak maken
            </Link>
          )}
          <WhatsAppButton
            message={whatsappMessage}
            label="WhatsApp"
            variant="secondary"
            size="lg"
          />
          {service.cta === "phone" ? (
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              Contact
            </Link>
          ) : (
            <PhoneLink asButton variant="secondary" size="lg" label="Bellen" />
          )}
        </div>
      </div>
    </div>
  );
}
