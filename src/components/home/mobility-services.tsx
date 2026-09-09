import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type MobilityServicesProps = {
  services: Service[];
};

export function MobilityServices({ services }: MobilityServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="bg-paper">
      <Container className="py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <div className="max-w-xl">
              <p className="font-display text-sm tracking-[0.16em] text-muted uppercase">
                Onze services
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                Private lease, verzekering & pechhulp
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
              Net als op onze vestiging: alles voor zorgeloos rijden — naast
              werkplaats en occasions.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={0.06 * index} className="h-full">
                <Link
                  href={`/diensten/${service.slug}`}
                  className="group relative flex h-full min-h-[420px] flex-col overflow-hidden outline-offset-[-4px] md:min-h-[480px]"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.05)_0%,rgba(26,20,16,0.45)_45%,rgba(26,20,16,0.92)_100%)]"
                    aria-hidden
                  />
                  <div className="relative z-10 mt-auto px-6 pb-8 pt-24 md:px-7 md:pb-10">
                    <h3 className="font-display text-[clamp(1.75rem,1.5vw+0.75rem,2.35rem)] leading-tight text-white">
                      {service.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                      {service.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-medium text-ink transition-transform duration-300 group-hover:scale-[1.03]">
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
