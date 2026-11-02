import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type MobilityServicesProps = {
  services: Service[];
  eyebrow?: string;
  title: string;
  description: string;
};

export function MobilityServices({
  services,
  eyebrow = "Werkplaats",
  title,
  description,
}: MobilityServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="bg-paper">
      <Container className="py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div className="max-w-xl">
              <p className="font-display text-sm tracking-[0.16em] text-muted uppercase">
                {eyebrow}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                {title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
              {description}
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={0.06 * index} className="h-full">
                <Link
                  href={`/diensten/${service.slug}`}
                  className="group relative flex h-full min-h-[240px] flex-col overflow-hidden outline-offset-[-4px] sm:min-h-[320px] md:min-h-[480px]"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,24,24,0.05)_0%,rgba(24,24,24,0.45)_45%,rgba(24,24,24,0.92)_100%)]"
                    aria-hidden
                  />
                  <div className="relative z-10 mt-auto px-4 pb-5 pt-16 sm:px-6 sm:pb-8 sm:pt-24 md:px-7 md:pb-10">
                    <h3 className="font-display text-lg leading-tight text-white sm:text-2xl md:text-[clamp(1.75rem,1.5vw+0.75rem,2.35rem)]">
                      {service.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/80 sm:mt-3 sm:text-sm">
                      {service.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink transition-transform duration-300 group-hover:scale-[1.03] sm:mt-6 sm:px-5 sm:py-2 sm:text-sm">
                      Meer info
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
