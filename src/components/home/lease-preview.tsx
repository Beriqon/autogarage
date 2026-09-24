import Link from "next/link";

export function LeasePreview() {
  return (
    <article className="flex h-full flex-col justify-between rounded-[2rem] border border-line bg-surface px-7 py-8 md:rounded-[2.25rem] md:px-9 md:py-10">
      <div>
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Financieren
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,1.4vw+1rem,2.15rem)] leading-tight tracking-[-0.02em] text-ink">
          Occasions ook te leasen
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
          Financial lease voor ondernemers en autofinanciering voor
          particulieren. Op elke auto staat al vanaf welk bedrag per maand u
          kunt leasen. Reken het na en vraag een vrijblijvende offerte.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/leasen"
          className="inline-flex w-fit rounded-full bg-ink px-7 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          Meer over leasen
        </Link>
        <Link
          href="/occasions"
          className="inline-flex w-fit rounded-full border border-ink/30 px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper"
        >
          Bekijk occasions
        </Link>
      </div>
    </article>
  );
}
