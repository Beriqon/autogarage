import Link from "next/link";
import { garage } from "@/config/garage";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CookiePreferencesButton } from "@/components/privacy/cookie-consent";

export type LegalSection = { title: string; paragraphs: string[] };
export function LegalPage({ title, intro, path, sections }: { title: string; intro: string; path: string; sections: LegalSection[] }) {
  return <Section tone="paper">
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title, path }]} className="mb-8" />
    <p className="text-xs uppercase tracking-[0.18em] text-accent">Damming Techniek · Duidelijke afspraken</p>
    <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">{title}</h1>
    <p className="mt-5 max-w-2xl text-muted">{intro}</p>
    <p className="mt-4 text-xs text-muted">Laatst bijgewerkt: 2 november 2026</p>
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
      <aside className="rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-28">
        <p className="text-xs uppercase tracking-widest text-accent">Op deze pagina</p>
        <nav aria-label="Inhoudsopgave" className="mt-4 flex flex-col gap-3">{sections.map((section,i)=><a key={section.title} href={`#artikel-${i+1}`} className="text-sm text-muted hover:text-accent">{i+1}. {section.title}</a>)}</nav>
      </aside>
      <div className="max-w-3xl space-y-9">
        {sections.map((section,i)=><section key={section.title} id={`artikel-${i+1}`} className="scroll-mt-28 border-b border-line pb-8"><h2 className="font-display text-2xl text-ink">{i+1}. {section.title}</h2><div className="mt-4 space-y-4 text-sm leading-relaxed text-muted md:text-base">{section.paragraphs.map(text=><p key={text}>{text}</p>)}</div></section>)}
        {path === "/cookies" && <p className="text-sm leading-relaxed text-muted">Meer informatie van de aanbieders: <a className="underline" href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer">Vimeo-privacybeleid</a>, <a className="underline" href="https://help.vimeo.com/hc/en-us/articles/26080940921361-Vimeo-Player-Cookies" target="_blank" rel="noopener noreferrer">Vimeo-playercookies</a> en <a className="underline" href="https://policies.google.com/privacy?hl=nl" target="_blank" rel="noopener noreferrer">Google-privacybeleid</a>.</p>}
        {path === "/privacy" && <p className="text-sm text-muted">Meer informatie of een klacht: <a className="underline" href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.</p>}
        <div className="rounded-2xl bg-ink p-7 text-white">
          <h2 className="font-display text-2xl text-white">Vragen? Neem contact op.</h2>
          <p className="mt-3 text-sm text-white/75">{garage.name} · {garage.address.street}, {garage.address.postalCode} {garage.address.city}</p>
          <div className="mt-4 flex flex-wrap gap-5 text-sm"><a href={`mailto:${garage.email}`} className="underline underline-offset-4">{garage.email}</a><a href={`tel:${garage.phone}`}>{garage.phoneDisplay}</a></div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-accent"><Link href="/voorwaarden">Algemene voorwaarden</Link><Link href="/privacy">Privacyverklaring</Link><Link href="/cookies">Cookies</Link><CookiePreferencesButton className="underline underline-offset-4 hover:text-ink" /></div>
      </div>
    </div>
  </Section>;
}
