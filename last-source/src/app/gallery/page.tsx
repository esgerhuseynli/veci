import type { Metadata } from "next";
import Link from "next/link";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getLocale } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/site";

const desc = "Veci Beauty House işləri: kirpik, makiyaj və dəriyə qulluq nümunələri.";

export const metadata: Metadata = {
  title: "Qalereya",
  description: desc,
  openGraph: {
    title: `${siteName} | Qalereya`,
    description: desc,
    url: `${siteUrl}/gallery`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: { title: `${siteName} | Qalereya`, description: desc },
  alternates: { canonical: `${siteUrl}/gallery` },
};

export default function GalleryPage() {
  const locale = getLocale();
  const t =
    locale === "az"
      ? { home: "Ana səhifə", title: "İşlərimiz", sub: "Hər görünüş diqqətlə hazırlanır" }
      : { home: "Главная", title: "Наши работы", sub: "Каждый образ создан с вниманием к деталям" };

  return (
    <div>
      <header className="relative overflow-hidden border-b border-blush/50 bg-gradient-to-br from-cream via-blush/40 to-cream/95 px-4 py-12 sm:px-6 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 8px)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <nav className="mb-6 font-sans text-xs font-light text-text-dark/60" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-1.5">
              <li>
                <Link href="/" className="text-mauve/90 underline decoration-blush/60 underline-offset-2 transition hover:text-rose">
                  {t.home}
                </Link>
              </li>
              <li aria-hidden className="text-text-dark/40">&gt;</li>
              <li className="text-text-dark/75" aria-current="page">{t.title}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-normal text-text-dark sm:text-5xl md:text-6xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-light text-text-dark/70">{t.sub}</p>
        </div>
      </header>

      <ScrollReveal>
        <GalleryClient locale={locale} />
      </ScrollReveal>
    </div>
  );
}
