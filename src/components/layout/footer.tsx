import Link from "next/link";
import Image from "next/image";
import { garage } from "@/config/garage";
import { footerNav, legalNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { OpeningHours } from "@/components/shared/opening-hours";
import { PhoneLink } from "@/components/shared/phone-link";
import { SocialLinks } from "@/components/shared/social-links";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

function formatAddress() {
  const { street, postalCode, city } = garage.address;
  return `${street}, ${postalCode} ${city}`;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`${garage.name} – naar home`}
            >
              <Image
                src={garage.logo}
                alt={garage.name}
                width={160}
                height={160}
                className="size-16 rounded-full md:size-20"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {garage.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <PhoneLink
                asButton
                variant="inverse"
                size="sm"
                className="border-white/25"
              />
              <WhatsAppButton variant="inverse" size="sm" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">
              Navigatie
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">
              Bezoek
            </h2>
            <address className="mt-4 space-y-2 text-sm text-white/80 not-italic">
              <p>{garage.name}</p>
              <p>{formatAddress()}</p>
              <p>
                <a
                  href={`mailto:${garage.email}`}
                  className="transition-colors hover:text-white"
                >
                  {garage.email}
                </a>
              </p>
            </address>
            <div className="mt-6">
              <h2 className="font-display text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">
                Volg ons
              </h2>
              <SocialLinks className="mt-3" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <OpeningHours tone="dark" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {garage.legalName}
            {garage.kvk ? ` · KVK ${garage.kvk}` : null}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-xs tracking-wide text-white/40">
          <a
            href="https://geniuzaic.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Powered by Geniuz
          </a>
        </p>
      </Container>
    </footer>
  );
}
