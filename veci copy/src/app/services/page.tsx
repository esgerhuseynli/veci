import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";
import { readCmsData } from "@/lib/cms";
import { siteName, siteUrl } from "@/lib/site";

const desc = "Veci Beauty House xidmətləri və qiymətləri.";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description: desc,
  openGraph: {
    title: `${siteName} | Xidmətlər`,
    description: desc,
    url: `${siteUrl}/services`,
    type: "website",
  },
};

export default async function ServicesPage() {
  const locale = getLocale();
  const cms = await readCmsData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl text-mauve">{locale === "az" ? "Xidmətlərimiz" : "Наши услуги"}</h1>
      <p className="mt-2 text-sm text-text-dark/70">
        {locale === "az" ? "Admin paneldən tam idarə olunur." : "Полностью управляется из админ-панели."}
      </p>

      <div className="mt-8 space-y-4">
        {cms.services.map((service) => (
          <article key={service.id} className="rounded-2xl border border-blush/40 bg-cream/70 p-5">
            <h2 className="font-display text-2xl text-text-dark">{service.name[locale]}</h2>
            <p className="mt-1 text-sm text-mauve">{service.category}</p>
            <p className="mt-2 text-sm text-text-dark/70">
              {service.duration[locale]} · <strong>{service.price[locale]}</strong>
            </p>
            <p className="mt-2 text-sm text-text-dark/80">{service.description[locale]}</p>
            <Link href="/booking" className="mt-4 inline-flex rounded-full border border-rose px-4 py-2 text-sm text-rose">
              {locale === "az" ? "Rezervasiya et" : "Записаться"}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
