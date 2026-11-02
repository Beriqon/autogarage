import Link from "next/link";
import { CookiePreferencesButton } from "@/components/privacy/cookie-consent";
import Image from "next/image";
import { BrandLogo } from "@/components/shared/brand-logo";
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
              className="inline-flex py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Garage Damming – naar home"
            >
              <BrandLogo className="origin-left scale-110" />
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

        <section
          aria-labelledby="footer-erkenningen"
          className="mt-12 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8"
        >
          <div>
            <h2 id="footer-erkenningen" className="font-display text-xl text-white">
              Erkend vakmanschap
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
              RDW erkend en erkend leerbedrijf. Zorg voor uw auto én voor de
              vakmensen van morgen.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Image
              src="/images/brand/rdw-erkend.webp"
              alt="RDW erkend"
              width={303}
              height={169}
              sizes="160px"
              className="h-auto w-40 object-contain"
            />
            <Image
              src="/images/brand/erkend-leerbedrijf.webp"
              alt="Erkend leerbedrijf – wij leiden vakmensen op"
              width={250}
              height={250}
              sizes="112px"
              className="h-auto w-28 object-contain"
            />
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {garage.legalName}
            {garage.kvk ? ` · KVK ${garage.kvk}` : null}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><CookiePreferencesButton /></li>
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
