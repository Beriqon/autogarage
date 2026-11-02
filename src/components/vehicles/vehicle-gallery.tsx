"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type VehicleGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export function VehicleGallery({ images, alt, className }: VehicleGalleryProps) {
  const [selected, setSelected] = React.useState(0);
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    align: "start",
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!mainApi) return;
    const sync = () => {
      const index = mainApi.selectedScrollSnap();
      setSelected(index);
      thumbApi?.scrollTo(index);
    };
    sync();
    mainApi.on("select", sync).on("reInit", sync);
    return () => { mainApi.off("select", sync).off("reInit", sync); };
  }, [mainApi, thumbApi]);

  React.useEffect(() => {
    if (!thumbApi) return;
    const sync = () => {
      setCanPrev(thumbApi.canScrollPrev());
      setCanNext(thumbApi.canScrollNext());
    };
    sync();
    thumbApi.on("select", sync).on("reInit", sync);
    return () => { thumbApi.off("select", sync).off("reInit", sync); };
  }, [thumbApi]);

  if (!images.length) return (
    <div className={cn("aspect-[16/10] border border-line bg-line/40", className)} aria-label="Geen foto's beschikbaar" />
  );

  return (
    <div className={cn("min-w-0 space-y-3", className)}>
      <div className="relative overflow-hidden bg-line">
        <div ref={mainRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {images.map((src, index) => (
              <div key={src} className="relative aspect-[16/10] min-w-0 shrink-0 grow-0 basis-full">
                <Image src={src} alt={`${alt} — foto ${index + 1}`} fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 60vw, 720px"
                  priority={index === 0} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && <>
          <Button type="button" variant="secondary" size="icon"
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-surface/95 shadow-md"
            aria-label="Vorige foto" onClick={() => mainApi?.scrollPrev()}>
            <ChevronLeft className="size-5" aria-hidden />
          </Button>
          <Button type="button" variant="secondary" size="icon"
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-surface/95 shadow-md"
            aria-label="Volgende foto" onClick={() => mainApi?.scrollNext()}>
            <ChevronRight className="size-5" aria-hidden />
          </Button>
          <p className="absolute right-3 bottom-3 rounded-full bg-black/65 px-3 py-1 text-xs text-white tabular-nums" aria-live="polite" aria-atomic="true">
            {selected + 1} / {images.length}
          </p>
        </>}
      </div>
      {images.length > 1 && (
        <div className="flex min-w-0 items-center gap-2">
          <Button type="button" variant="secondary" size="icon" className="shrink-0"
            aria-label="Vorige miniaturen" disabled={!canPrev} onClick={() => thumbApi?.scrollPrev()}>
            <ChevronLeft className="size-5" aria-hidden />
          </Button>
          <div ref={thumbRef} className="min-w-0 flex-1 overflow-hidden">
            <ul className="-ml-2 flex touch-pan-y">
              {images.map((src, index) => (
                <li key={src} className="min-w-0 shrink-0 grow-0 basis-1/3 pl-2 sm:basis-1/4 lg:basis-1/5">
                  <button type="button" onClick={() => mainApi?.scrollTo(index)}
                    aria-label={`Toon foto ${index + 1}`} aria-current={index === selected}
                    className={cn("relative block aspect-[16/10] w-full overflow-hidden border-2 transition-opacity focus-visible:-outline-offset-4", index === selected ? "border-accent opacity-100" : "border-transparent opacity-65 hover:opacity-100")}>
                    <Image src={src} alt="" fill sizes="(max-width: 767px) 28vw, 140px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Button type="button" variant="secondary" size="icon" className="shrink-0"
            aria-label="Volgende miniaturen" disabled={!canNext} onClick={() => thumbApi?.scrollNext()}>
            <ChevronRight className="size-5" aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
}
