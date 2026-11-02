import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export function SellYourCar() {
  return (
    <article className="grid h-full overflow-hidden rounded-[2rem] bg-ink text-white md:grid-cols-[1.05fr_1fr] md:rounded-[2.25rem]">
      <div className="flex flex-col items-start justify-center px-7 py-10 md:px-10 md:py-14 lg:px-14">
        <p className="flex items-center gap-3 text-[10px] font-normal uppercase tracking-[0.2em] text-[#ddc7af]">
          <span className="h-px w-7 bg-current" aria-hidden /> Uw auto verkopen
        </p>
        <h2 className="mt-5 font-display text-[clamp(2rem,3vw,3rem)] leading-tight tracking-[-0.02em] text-white">
          Een nieuwe stap voor u.<br /><span className="italic text-[#ddc7af]">Een goed bod op uw auto.</span>
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          Tijd voor iets anders? Bied uw auto aan bij Damming.
          Vertel ons meer over uw auto en ontvang een vrijblijvend bod,
          met persoonlijk contact en heldere afspraken.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80">
          {["Vrijblijvend bod", "Ook inruil mogelijk"].map((item) => (
            <li key={item} className="flex items-center gap-2"><Check size={14} className="text-[#ddc7af]" aria-hidden />{item}</li>
          ))}
        </ul>
        <Link href="/auto-verkopen" className="group mt-8 inline-flex min-h-12 items-center gap-7 rounded-full bg-[#e0c7ad] px-6 py-3 text-sm font-normal text-[#211c17] transition-colors hover:bg-[#efddc8]">
          Vraag een bod aan <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
      </div>
      <div className="relative min-h-[320px] md:min-h-[480px]">
        <Image src="/images/damming/showroom2.webp" alt="Occasions in de showroom van Garage Damming" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[center_65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/65">Verkopen aan Damming</p>
          <p className="mt-2 font-display text-2xl text-white md:text-3xl">Van uw oprit naar onze showroom.</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">Uw volgende stap begint met een kennismaking.</p>
        </div>
      </div>
    </article>
  );
}
