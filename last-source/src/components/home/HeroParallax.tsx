import { HeroPetalDecor } from "./HeroPetalDecor";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function HeroParallax({
  children,
  className = "",
  id,
  "aria-labelledby": aria,
}: Props) {
  return (
    <section
      id={id}
      className={`relative flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center overflow-hidden bg-cream px-4 py-20 sm:min-h-[calc(100dvh-5rem)] sm:px-6 ${className}`}
      aria-labelledby={aria}
    >
      <div className="home-hero-silk pointer-events-none absolute inset-0 -z-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
        <HeroPetalDecor />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
