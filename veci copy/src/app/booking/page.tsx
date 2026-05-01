import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { getLocale } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/site";

const desc =
  "Veci Beauty House üçün rezervasiya səhifəsi: kirpik, makiyaj və dəriyə qulluq xidmətləri.";

export const metadata: Metadata = {
  title: "Rezervasiya",
  description: desc,
  openGraph: {
    title: `${siteName} | Rezervasiya`,
    description: desc,
    url: `${siteUrl}/booking`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: { title: `${siteName} | Rezervasiya`, description: desc },
  alternates: { canonical: `${siteUrl}/booking` },
};

const copy = {
  az: { title: "Rezervasiya et", sub: "Sizi görmək üçün səbirsizlənirik" },
  ru: { title: "Запишитесь на процедуру", sub: "Будем рады видеть вас" },
} as const;

export default function BookingPage() {
  const locale = getLocale();
  const t = copy[locale];

  return (
    <div>
      <header className="relative overflow-hidden border-b border-blush/50 bg-gradient-to-b from-cream/95 via-blush/25 to-cream/90 px-4 py-14 text-center sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(232,201,187,0.5)_0%,transparent_60%)]" aria-hidden />
        <h1 className="relative z-[1] font-display text-4xl font-normal text-text-dark sm:text-5xl md:text-6xl">{t.title}</h1>
        <p className="relative z-[1] mt-3 font-sans text-base font-light text-text-dark/75 sm:text-lg">{t.sub}</p>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <BookingForm locale={locale} />
      </div>
    </div>
  );
}
