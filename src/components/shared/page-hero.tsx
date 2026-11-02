"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  imagePosition?: string;
  action?: { label: string; href: string };
};

export function PageHero({
  title,
  description,
  imageSrc,
  imageAlt,
  action,
  imagePosition = "center",
  eyebrow = garage.name,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-[#181818] text-paper md:min-h-[540px] lg:min-h-[600px]">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,15,0.35)_0%,rgba(15,15,15,0.3)_35%,rgba(15,15,15,0.88)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10 w-full px-6 pb-16 pt-32 md:pb-20 md:pt-40 lg:pb-24">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#ddc7af]">
            <span className="h-px w-8 bg-current" aria-hidden />{eyebrow}
          </p>
          <h1 style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }} className="mt-5 font-display text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] leading-[1.05] tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            {description}
          </p>
          {action && <Link href={action.href} className="group mt-7 inline-flex min-h-12 items-center gap-7 rounded-sm bg-[#e0c7ad] px-6 py-3 text-sm font-normal text-[#211c17] transition-colors hover:bg-[#efddc8]">{action.label}<ArrowUpRight size={18} aria-hidden /></Link>}
        </motion.div>
      </Container>
    </section>
  );
}
