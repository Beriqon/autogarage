"use client";

import { useCookieConsent } from "@/components/privacy/cookie-consent";
import { garage } from "@/config/garage";
import { cn } from "@/lib/cn";

type MapEmbedProps = {
  className?: string;
  title?: string;
};

export function MapEmbed({
  className,
  title = `Kaart van ${garage.name}`,
}: MapEmbedProps) {
  const { maps, openPreferences } = useCookieConsent();
  const location = encodeURIComponent(`${garage.address.street}, ${garage.address.postalCode} ${garage.address.city}`);
  const src = `https://maps.google.com/maps?q=${location}&hl=nl&z=15&output=embed`;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-line/40 md:aspect-[16/10]",
        className,
      )}
    >
      {maps ? <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
        allowFullScreen
      /> : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-ink">
          <p className="text-sm">De kaart van Google Maps is uitgeschakeld. Sta Google Maps toe om de kaart te bekijken.</p>
          <button type="button" onClick={openPreferences} className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover">Cookievoorkeuren aanpassen</button>
          <a href={`https://www.google.com/maps/search/?api=1&query=${location}`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">Open route in Google Maps</a>
        </div>
      )}
    </div>
  );
}
