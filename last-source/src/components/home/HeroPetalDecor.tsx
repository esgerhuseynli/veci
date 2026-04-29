/**
 * Soft floating petal / floral corner accents (inline SVG, no images).
 */
export function HeroPetalDecor() {
  return (
    <>
      <div
        className="hero-decor-animate pointer-events-none absolute -left-4 top-8 w-32 text-rose/35 sm:-left-2 sm:top-12 sm:w-40"
        aria-hidden
      >
        <PetalCluster flip />
      </div>
      <div
        className="hero-decor-animate pointer-events-none absolute -right-6 top-1/4 w-36 text-mauve/30 sm:-right-2 sm:top-1/3 sm:w-44 [animation-delay:0.65s]"
        aria-hidden
      >
        <PetalCluster />
      </div>
      <div
        className="hero-decor-animate pointer-events-none absolute -bottom-4 left-8 w-28 text-champagne/50 sm:bottom-6 sm:left-16 sm:w-36 [animation-delay:0.75s]"
        aria-hidden
      >
        <PetalSingle />
      </div>
      <div
        className="hero-decor-animate pointer-events-none absolute -bottom-2 right-4 w-32 text-blush/80 sm:bottom-8 sm:right-10 sm:w-40 [animation-delay:0.85s]"
        aria-hidden
      >
        <PetalCluster flip />
      </div>
    </>
  );
}

function PetalCluster({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`h-auto w-full ${flip ? "scale-x-[-1]" : ""}`}
      fill="currentColor"
    >
      <path
        opacity="0.5"
        d="M100 20c-8 25-2 40 6 55 12-8 28-12 40-4-20 10-32 30-32 50 18-5 40 2 50 20-15 6-32 2-45-8-4 20 8 40 30 50-8 12-28 6-40-4-2 20-18 36-40 40 4-22 0-40-8-50-12 8-32 4-40-4 20-6 32-30 32-50-20 6-38-4-50-20 20-2 32-2 48 8 0-22 10-40 32-50-10-8-4-32 2-50z"
      />
      <path
        opacity="0.35"
        d="M160 140c6-18 0-32-6-40 10 0 20 8 20 20-4 12-8 20-14 20zM40 60c-8 12-2 24 4 32-8-4-16-2-20 6-2-8 4-24 16-38z"
      />
    </svg>
  );
}

function PetalSingle() {
  return (
    <svg viewBox="0 0 120 120" className="h-auto w-full" fill="currentColor">
      <path
        opacity="0.45"
        d="M60 8c-6 20 2 34 8 48 14-2 30 4 36 20-20 0-32 10-40 24 12 10 8 32-4 44-2-12-6-20-12-24-4 10-20 20-40 20 8-12 2-32-4-40-8 6-24 0-32-4 20-2 32-20 32-40-6-2-6-20 4-32 8 6 20 2 32-6 0-8 8-18 20-20z"
      />
      <path
        opacity="0.25"
        d="M90 100c-4-8-2-20 2-24 6 2 6 10 0 18-2 4-2 4-2 6z"
      />
    </svg>
  );
}
