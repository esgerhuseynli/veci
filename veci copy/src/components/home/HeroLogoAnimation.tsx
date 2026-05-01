export function HeroLogoAnimation() {
  return (
    <h1 id="veci-hero-title" className="relative mt-4 text-center">
      <svg
        className="veci-logo-petal pointer-events-none absolute -left-8 -top-10 h-16 w-16 sm:-left-12 sm:-top-12 sm:h-20 sm:w-20"
        style={{ animationDelay: "0.2s" }}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
      >
        <ellipse cx="32" cy="32" rx="11" ry="27" fill="#C9897A" transform="rotate(-20 32 32)" />
        <ellipse cx="32" cy="32" rx="11" ry="27" fill="#C9897A" opacity="0.6" transform="rotate(20 32 32)" />
      </svg>
      <svg
        className="veci-logo-petal pointer-events-none absolute -right-10 top-1/3 h-14 w-14 sm:-right-14 sm:h-16 sm:w-16"
        style={{ animationDelay: "1s" }}
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden
      >
        <ellipse cx="26" cy="26" rx="9" ry="22" fill="#C9897A" transform="rotate(30 26 26)" />
        <ellipse cx="26" cy="26" rx="9" ry="22" fill="#C9897A" opacity="0.6" transform="rotate(-30 26 26)" />
      </svg>
      <svg
        className="veci-logo-petal pointer-events-none absolute -bottom-7 right-2 h-16 w-16 sm:-bottom-8 sm:right-3 sm:h-[72px] sm:w-[72px]"
        style={{ animationDelay: "0.6s" }}
        viewBox="0 0 72 72"
        fill="none"
        aria-hidden
      >
        <ellipse cx="36" cy="36" rx="12" ry="30" fill="#D4B896" transform="rotate(15 36 36)" />
        <ellipse cx="36" cy="36" rx="12" ry="30" fill="#D4B896" opacity="0.6" transform="rotate(-15 36 36)" />
      </svg>

      <span className="veci-logo-main block font-display text-6xl font-bold uppercase tracking-[0.22em] text-[#3D2B2B] sm:text-7xl md:text-8xl">
        Veci
      </span>
      <span className="veci-logo-script -mt-1 block font-script text-5xl leading-none text-rose sm:text-6xl md:text-7xl">
        Beauty House
      </span>
    </h1>
  );
}
