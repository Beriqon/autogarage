"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "damming-cookie-preferences-v2";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
type Preferences = { version: 2; video: boolean; maps: boolean; savedAt: number };
type ConsentContextValue = { video: boolean; maps: boolean; openPreferences: () => void };
const ConsentContext = React.createContext<ConsentContextValue | null>(null);

function readPreferences(): Preferences | null {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (value?.version === 2 && typeof value.video === "boolean" && typeof value.maps === "boolean" &&
      typeof value.savedAt === "number" && value.savedAt <= Date.now() &&
      Date.now() - value.savedAt < MAX_AGE) return value;
  } catch { /* Storage may be disabled or contain an invalid value. */ }
  return null;
}

export function useCookieConsent() {
  const context = React.useContext(ConsentContext);
  if (!context) throw new Error("CookieConsentProvider is required");
  return context;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState<Preferences | null>(null);
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const [maps, setMaps] = React.useState(false);
  const [storageError, setStorageError] = React.useState(false);

  React.useEffect(() => {
    const saved = readPreferences();
    setPreferences(saved);
    setVideo(saved?.video ?? false);
    setMaps(saved?.maps ?? false);
    setOpen(!saved);
    const sync = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const updated = readPreferences();
      setPreferences(updated);
      setVideo(updated?.video ?? false);
      setMaps(updated?.maps ?? false);
      setOpen(!updated);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  function save(allowVideo: boolean, allowMaps: boolean) {
    const next: Preferences = { version: 2, video: allowVideo, maps: allowMaps, savedAt: Date.now() };
    let failed = false;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { failed = true; }
    setStorageError(failed);
    setPreferences(next);
    setVideo(allowVideo);
    setMaps(allowMaps);
    setOpen(false);
  }

  function openPreferences() {
    setVideo(preferences?.video ?? false);
    setMaps(preferences?.maps ?? false);
    setDetails(true);
    setOpen(true);
  }

  return (
    <ConsentContext.Provider value={{ video: preferences?.video ?? false, maps: preferences?.maps ?? false, openPreferences }}>
      {children}
      <Dialog.Root open={open} onOpenChange={next => { if (next || preferences) setOpen(next); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 z-[71] max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-surface p-6 text-ink shadow-2xl sm:p-8"
            onOpenAutoFocus={event => { event.preventDefault(); document.getElementById("cookie-heading")?.focus(); }}
            onInteractOutside={event => event.preventDefault()}
          >
            <p className="mb-3 text-xs font-medium tracking-[0.16em] text-accent uppercase">Uw privacy</p>
            <Dialog.Title id="cookie-heading" tabIndex={-1} className="font-display text-3xl outline-none">Cookies & voorkeuren</Dialog.Title>
            <Dialog.Description className="mt-4 text-sm leading-relaxed text-muted">
              We onthouden uw keuze op dit apparaat. De achtergrondvideo van Vimeo en de kaart van Google Maps laden alleen met uw toestemming. Deze partijen kunnen cookies plaatsen en gegevens ontvangen, zoals uw IP-adres.
            </Dialog.Description>
            {details && (
              <div className="mt-6 space-y-4 rounded-xl border border-line bg-paper p-4">
                <label className="flex items-start justify-between gap-4 text-sm">
                  <span><span className="block font-medium">Noodzakelijke opslag</span><span className="mt-1 block text-muted">Onthoudt uw cookievoorkeuren. Altijd actief.</span></span>
                  <input type="checkbox" checked disabled className="mt-1 size-5 shrink-0 accent-accent" />
                </label>
                <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-line pt-4 text-sm">
                  <span><span className="block font-medium">Video van Vimeo</span><span className="mt-1 block text-muted">Speelt de achtergrondvideo af. Vimeo ontvangt onder meer uw IP-adres en browsergegevens.</span></span>
                  <input type="checkbox" checked={video} onChange={event => setVideo(event.target.checked)} className="mt-1 size-5 shrink-0 accent-accent" />
                </label>
                <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-line pt-4 text-sm">
                  <span><span className="block font-medium">Kaart van Google Maps</span><span className="mt-1 block text-muted">Toont de interactieve kaart. Google ontvangt onder meer uw IP-adres en browsergegevens.</span></span>
                  <input type="checkbox" checked={maps} onChange={event => setMaps(event.target.checked)} className="mt-1 size-5 shrink-0 accent-accent" />
                </label>
                <p className="text-xs leading-relaxed text-muted">We gebruiken geen eigen advertentie- of analytische cookies. Uw voorkeur wordt 180 dagen onthouden. Externe aanbieders kunnen gegevens buiten de EER verwerken.</p>
              </div>
            )}
            {storageError && <p role="status" className="mt-4 text-sm text-muted">Uw browser kan de keuze niet bewaren. De instelling geldt voor dit bezoek.</p>}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => save(false, false)}>Alles weigeren</Button>
              <Button variant="secondary" onClick={() => save(true, true)}>Alles accepteren</Button>
              {details ? (
                <Button className="col-span-2" onClick={() => save(video, maps)}>Voorkeuren opslaan</Button>
              ) : (
                <Button variant="ghost" className="col-span-2" onClick={() => setDetails(true)}>Voorkeuren instellen</Button>
              )}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              U kunt uw keuze altijd wijzigen via ‘Cookievoorkeuren’ onderaan de website. Uw keuze wordt maximaal 180 dagen bewaard. Lees onze <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">privacyverklaring (nieuw tabblad)</a> en <a href="/cookies" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">cookieverklaring (nieuw tabblad)</a>.
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ConsentContext.Provider>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  const { openPreferences } = useCookieConsent();
  return <button type="button" onClick={openPreferences} className={className ?? "transition-colors hover:text-white"}>Cookievoorkeuren</button>;
}
