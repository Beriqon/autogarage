"use client";

import { CookieConsentProvider } from "@/components/privacy/cookie-consent";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/shared/skip-link";
import { cn } from "@/lib/cn";
import { hasFullBleedHero } from "@/lib/full-bleed-hero";
import { garage } from "@/config/garage";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  return (
    <CookieConsentProvider>
      <SkipLink />
      <Header />
      <main
        id="main"
        className={cn(
          "flex flex-1 flex-col",
          !hasFullBleedHero(pathname) && "pt-16 lg:pt-[4.75rem]",
        )}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <a
        href={buildWhatsAppUrl(garage.whatsapp, buildGeneralWhatsAppMessage(garage))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`App ${garage.shortName} via WhatsApp`}
        title="Stuur ons een WhatsApp-bericht"
        className={cn(
          "fixed right-4 z-40 inline-flex size-14 items-center justify-center rounded-full border border-white/20 bg-accent text-white shadow-lg transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:right-6 md:size-16",
          pathname.startsWith("/occasions/")
            ? "bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:bottom-6"
            : "bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-6",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-8" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.96 11.96 0 0 0 5.8 1.48h.01C18.63 23.84 24 18.49 24 11.9a11.87 11.87 0 0 0-3.48-8.42ZM12.05 21.82a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.9 9.9 0 0 1-1.52-5.28c0-5.48 4.45-9.94 9.94-9.94a9.87 9.87 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.9 7.03c0 5.48-4.46 9.94-9.99 9.88Zm5.45-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.43.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>
    </CookieConsentProvider>
  );
}
