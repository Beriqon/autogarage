import Link from "next/link";

export function SellYourCar() {
  return (
    <article className="flex h-full flex-col justify-between rounded-[2rem] bg-ink px-7 py-8 text-white md:rounded-[2.25rem] md:px-9 md:py-10">
      <div>
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-white/55 uppercase">
          Inkoop
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,1.4vw+1rem,2.15rem)] leading-tight tracking-[-0.02em] text-white">
          Wij kopen uw auto
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
          Kenteken en kilometerstand zijn genoeg voor een vrijblijvend bod,
          vaak dezelfde dag.
        </p>
      </div>
      <Link
        href="/auto-verkopen"
        className="mt-8 inline-flex w-fit rounded-full bg-white px-7 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
      >
        Vraag een bod aan
      </Link>
    </article>
  );
}
