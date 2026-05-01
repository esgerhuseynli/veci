import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { getLocale } from "@/lib/i18n";
import { readCmsData } from "@/lib/cms";
import { siteName, siteUrl } from "@/lib/site";

const desc = "Veci Beauty House qalereyası.";

export const metadata: Metadata = {
  title: "Qalereya",
  description: desc,
  openGraph: {
    title: `${siteName} | Qalereya`,
    description: desc,
    url: `${siteUrl}/gallery`,
    type: "website",
  },
};

export default async function GalleryPage() {
  const locale = getLocale();
  const cms = await readCmsData();

  return (
    <div>
      <header className="px-4 py-12 text-center sm:px-6">
        <h1 className="font-display text-5xl text-mauve">{locale === "az" ? "Qalereya" : "Галерея"}</h1>
      </header>
      <GalleryClient locale={locale} photos={cms.galleryPhotos} />
    </div>
  );
}
