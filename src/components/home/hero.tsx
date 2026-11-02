"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { useCookieConsent } from "@/components/privacy/cookie-consent";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { video } = useCookieConsent();

  return (
    <section className="relative isolate flex min-h-[max(780px,100svh)] flex-col justify-center overflow-hidden bg-[#181818] text-paper">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/garage/damming-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_42%] md:object-center"
        />
        {video && reduceMotion === false && (
          <iframe
            src="https://player.vimeo.com/video/828047701?background=1&autoplay=1&loop=1&muted=1&dnt=1"
            title="Hero-video van Damming Techniek"
            allow="autoplay; fullscreen"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78svh)] -translate-x-1/2 -translate-y-1/2 border-0"
          />
        )}
      </motion.div>

      {/* Darker on the left for text; keep the building readable on the right */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.84)_0%,rgba(15,15,15,0.62)_38%,rgba(15,15,15,0.16)_75%,rgba(15,15,15,0.12)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,24,0.25)_0%,transparent_35%,rgba(24,24,24,0.55)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10 w-full px-6 pt-40 pb-44 md:pt-44 md:pb-48 lg:px-10">
        <motion.div
          className="max-w-[680px]"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-4 text-[10px] font-normal uppercase tracking-[0.22em] text-white/80 sm:text-xs">
            <span className="h-px w-9 bg-[#c5a688]" aria-hidden />
            Damming Techniek <span className="text-[#c5a688]">/</span> Apeldoorn
          </p>
          <h1 style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", lineHeight: 1.02 }} className="mt-7 font-display text-[clamp(3.3rem,6.3vw,6rem)] leading-[0.99] tracking-[-0.035em] text-white">
            Een auto die past.<br />
            <span className="italic text-[#ddc7af]">Service die blijft.</span>
          </h1>
          <p className="mt-7 max-w-[440px] text-sm font-light leading-[1.9] text-white/75 md:text-base">
            Van uw volgende occasion tot vakkundig onderhoud.
            Bij Damming krijgt uw auto de aandacht die hij verdient,
            met persoonlijk advies en duidelijke afspraken.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Link href="/occasions" className="group inline-flex min-h-14 items-center justify-between gap-9 rounded-sm bg-[#e0c7ad] px-6 text-sm font-normal text-[#211c17] transition-colors hover:bg-[#efddc8] focus-visible:outline-white">
              Ontdek onze occasions
              <ArrowUpRight size={19} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
            <Link href="/afspraak" className="group inline-flex min-h-11 items-center gap-5 border-b border-white/40 py-2 text-sm text-white transition-colors hover:border-[#e0c7ad] hover:text-[#e0c7ad]">
              Plan uw werkplaatsbezoek <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <Container className="px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-white/20 py-7 md:py-8">
            <div className="flex items-center gap-8 sm:gap-12">
              <div>
                <p className="font-display text-3xl leading-none text-white">30<span className="text-[#ddc7af]">+</span></p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-white/60">Jaar ervaring</p>
              </div>
              <a href={garage.googleReviews.url} target="_blank" rel="noopener noreferrer" className="group" aria-label={`Lees onze Google-reviews: ${garage.reviewScore} van 5`}>
                <div className="flex items-center gap-3"><span className="font-display text-3xl leading-none text-white">{garage.reviewScore.toLocaleString("nl-NL", { minimumFractionDigits: 1 })}</span><span className="flex gap-0.5 text-[#ddc7af]" aria-hidden>{Array.from({length:5},(_,i)=><Star key={i} size={11} fill="currentColor" strokeWidth={0} />)}</span></div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-white/60 group-hover:text-white">Beoordeeld op Google</p>
              </a>
            </div>
            <a href="#occasions" className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-white md:inline-flex">Maak kennis met Damming <ArrowDown size={15} aria-hidden /></a>
          </div>
        </Container>
      </div>
    </section>
  );
}
