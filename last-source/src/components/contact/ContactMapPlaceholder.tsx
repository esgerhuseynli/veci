import type { Locale } from "@/lib/i18n";

export function ContactMapPlaceholder({ locale }: { locale: Locale }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-blush/50 bg-cream/80 shadow-sm"
      role="img"
      aria-label="Map location placeholder"
    >
      <div
        className="flex min-h-[min(18rem,50vh)] w-full items-center justify-center bg-gradient-to-br from-blush/30 via-cream/90 to-rose/15"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg, rgba(139,94,106,0.04) 0 1px, transparent 1px 24px)",
            "repeating-linear-gradient(90deg, rgba(139,94,106,0.04) 0 1px, transparent 1px 24px)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(232,201,187,0.4) 0%, transparent 70%)",
          ].join(","),
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <p className="font-display text-lg text-mauve sm:text-xl">{locale === "az" ? "Xəritə tezliklə" : "Карта скоро"}</p>
        <p className="mt-1 max-w-sm font-sans text-xs font-light text-text-dark/60">
          {locale === "az" ? "Google Maps iframe ilə əvəz edin." : "Замените на iframe Google Maps."}
        </p>
        <div className="mt-4 h-1 w-16 rounded-full bg-rose/40" aria-hidden />
      </div>
    </div>
  );
}
