import Link from "next/link";

type BrandWordmarkProps = {
  className?: string;
  as?: "h1" | "p" | "span" | "div";
  /** Default: dark Veci + rose Beauty House. onDark: both white (footer / contrast). */
  theme?: "default" | "onDark";
  /** Use bold Cormorant for "Veci" (navbar) */
  veciBold?: boolean;
};

/**
 * "Veci" in display serif, "Beauty House" in Great Vibes — side by side.
 */
export function BrandWordmark({
  className = "",
  as: Tag = "div",
  theme = "default",
  veciBold = false,
}: BrandWordmarkProps) {
  const isDark = theme === "onDark";
  return (
    <Tag
      className={`inline-flex items-baseline gap-1.5 ${className}`}
    >
      <span
        className={[
          "font-display text-[1.12em] tracking-[0.12em] sm:text-[1.15em]",
          veciBold ? "font-bold" : "font-normal",
          isDark ? "text-white" : "text-[#6B4A3A]",
        ].join(" ")}
      >
        Veci
      </span>
      <span
        className={[
          "font-script text-[1.28em] leading-none sm:text-[1.32em]",
          isDark ? "text-white" : "text-rose",
        ].join(" ")}
        aria-label="Beauty House"
      >
        Beauty House
      </span>
    </Tag>
  );
}

export function BrandLink({
  className = "",
  veciBold = true,
  theme = "default",
}: {
  className?: string;
  veciBold?: boolean;
  theme?: "default" | "onDark";
}) {
  return (
    <Link
      href="/"
      className={`veci-focus-ring group inline-flex shrink-0 items-baseline rounded-sm ${className}`}
    >
      <BrandWordmark as="span" veciBold={veciBold} theme={theme} />
    </Link>
  );
}
