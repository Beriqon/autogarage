"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#1a1410] text-paper md:items-center">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/garage/vestiging-hero.jpg"
          alt={`Vestiging van ${garage.name} aan de Veenweg in ${garage.address.city}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[82%_42%] md:object-[88%_40%]"
        />
      </motion.div>

      {/* Darker on the left for text; keep the building readable on the right */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,20,16,0.88)_0%,rgba(26,20,16,0.62)_32%,rgba(26,20,16,0.2)_58%,rgba(26,20,16,0.22)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.25)_0%,transparent_35%,rgba(26,20,16,0.55)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10 w-full px-6 pt-28 pb-16 md:py-36 lg:py-44">
        <motion.div
          className="max-w-[18rem] text-left sm:max-w-xs md:max-w-sm"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(2rem,3.5vw+0.5rem,3.25rem)] leading-tight tracking-[-0.02em] text-white">
            {garage.shortName}
          </p>

          <h1 className="mt-4 font-display text-[clamp(1.75rem,2.6vw+0.5rem,2.65rem)] leading-[1.15] text-white/95">
            {garage.tagline}
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
            Occasions, APK en onderhoud voor alle merken — met specialisme Opel
            in {garage.address.city}.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/occasions"
              className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Bekijk ons aanbod
            </Link>
            <Link
              href="/afspraak"
              className="inline-flex rounded-full border border-white/35 bg-transparent px-8 py-3 text-sm font-medium text-white transition-colors hover:border-white/70 hover:bg-white/10"
            >
              Afspraak maken
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
