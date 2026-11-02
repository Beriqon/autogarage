import type { Review } from "@/types/review";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type ReviewsProps = {
  reviews: Review[];
};

function formatScore(score: number) {
  return score.toLocaleString("nl-NL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function Reviews({ reviews }: ReviewsProps) {
  const { googleReviews } = garage;

  if (reviews.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#181818] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><path fill='none' stroke='#fff' stroke-width='1.2' d='M60 12 L88 28 V68 L60 108 L32 68 V28 Z'/><path fill='none' stroke='#fff' stroke-width='1' d='M60 28 L76 38 V62 L60 88 L44 62 V38 Z'/></svg>`,
          )}")`,
          backgroundSize: "120px 120px",
        }}
        aria-hidden
      />

      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-white">
              Wat klanten zeggen
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/75 md:text-right md:text-base">
              <a
                href={googleReviews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                {formatScore(googleReviews.score)} / 5 op Google
              </a>{" "}
              ({googleReviews.count} reviews). Lees hieronder een selectie uit de ervaringen van onze klanten.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-0 border-t border-white/15 sm:mt-16 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <li
              key={review.id}
              className={
                index > 0
                  ? "border-t border-white/15 lg:border-t-0 lg:border-l"
                  : undefined
              }
            >
              <Reveal delay={0.06 * index} className="h-full">
                <blockquote className="flex h-full flex-col px-0 py-10 lg:px-7 lg:py-12">
                  <p className="font-display text-lg leading-relaxed md:text-xl text-white">
                    “{review.body}”
                  </p>
                  <footer className="mt-8">
                    <cite className="text-sm font-medium not-italic tracking-wide text-white">
                      {review.author}
                    </cite>
                    {review.sourceUrl && (
                      <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs text-white/60 underline underline-offset-4 hover:text-white">
                        Bekijk de reviewbron
                      </a>
                    )}
                    {review.source === "google" ? (
                      <p className="mt-1.5 text-xs tracking-wide text-white/45">
                        Google · {review.rating}/5
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs tracking-wide text-white/45">
                        {review.rating}/5
                      </p>
                    )}
                  </footer>
                </blockquote>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
