import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { ContactMapPlaceholder } from "@/components/contact/ContactMapPlaceholder";
import { ContactSocialRow } from "@/components/contact/ContactSocialRow";
import { getLocale } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/site";

const desc = "Veci Beauty House ilə əlaqə: iş saatları, ünvan və suallar üçün məlumatlar.";

export const metadata: Metadata = {
  title: "Əlaqə",
  description: desc,
  openGraph: {
    title: `${siteName} | Əlaqə`,
    description: desc,
    url: `${siteUrl}/contact`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: { title: `${siteName} | Əlaqə`, description: desc },
  alternates: { canonical: `${siteUrl}/contact` },
};

const copy = {
  az: { title: "Əlaqə", sub: "Sizdən eşitməkdən məmnun olarıq" },
  ru: { title: "Связаться с нами", sub: "Будем рады вашему сообщению" },
} as const;

export default function ContactPage() {
  const locale = getLocale();
  const t = copy[locale];

  return (
    <div>
      <header className="border-b border-blush/40 bg-gradient-to-b from-cream to-blush/30 px-4 py-12 text-center sm:px-6 sm:py-16">
        <h1 className="font-display text-4xl font-normal text-text-dark sm:text-5xl md:text-6xl">{t.title}</h1>
        <p className="mt-3 font-sans text-base font-light text-text-dark/75 sm:text-lg">{t.sub}</p>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div><ContactForm locale={locale} /></div>
          <ContactInfoPanel locale={locale} />
        </div>

        <div className="mt-12 sm:mt-16">
          <ContactMapPlaceholder locale={locale} />
        </div>

        <div className="mt-12 border-t border-blush/40 pt-10 sm:mt-16 sm:pt-12">
          <ContactSocialRow locale={locale} />
        </div>
      </div>
    </div>
  );
}
