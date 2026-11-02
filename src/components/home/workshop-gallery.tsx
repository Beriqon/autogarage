"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { GalleryImage } from "@/types/review";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type WorkshopGalleryProps = {
  title?: string;
  description?: string;
  images: GalleryImage[];
};

export function WorkshopGallery({ images, title = "Een kijkje bij Damming", description = "Ontdek onze showroom en werkplaats, met aandacht voor onderhoud tot in de details." }: WorkshopGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  if (images.length === 0) return null;

  return (
    <section className="overflow-hidden bg-paper">
      <Container className="pt-16 md:pt-20 lg:pt-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
              {title}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
              {description}
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" aria-label="Vorige foto" onClick={() => emblaApi?.scrollPrev()} className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white"><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Volgende foto" onClick={() => emblaApi?.scrollNext()} className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white"><ArrowRight size={18} /></button>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.08} className="mt-10 pb-16 md:mt-14 md:pb-24 lg:pb-28">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-3 px-4 md:gap-4 md:px-6 lg:px-8">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={
                  index % 2 === 0
                    ? "relative min-w-0 shrink-0 grow-0 basis-[76%] overflow-hidden sm:basis-[55%] lg:basis-[28%]"
                    : "relative min-w-0 shrink-0 grow-0 basis-[70%] overflow-hidden sm:basis-[48%] lg:basis-[25%]"
                }
              >
                <div
                  className={
                    index % 2 === 0
                      ? "relative aspect-[3/4]"
                      : "relative aspect-[3/4] md:mt-12"
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 75vw, 28vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-sm text-muted">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
