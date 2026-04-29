import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteLayout } from "@/components/Layout";
import { getLocale } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  style: ["normal"],
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400"],
  display: "swap",
});

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const base = new URL(siteUrl);

export const metadata: Metadata = {
  metadataBase: base,
  title: {
    default: "Kirpik, makiyaj və dəriyə qulluq",
    template: "Veci Beauty House | %s",
  },
  description:
    "Veci Beauty House — kirpik, makiyaj və dəriyə qulluq xidmətləri ilə zərif gözəllik məkanı.",
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    url: base,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veci Beauty House",
    description:
      "Kirpik, makiyaj və dəriyə qulluq üçün zərif və romantik studio.",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${script.variable}`}
    >
      <body className="font-sans">
        <a
          href="#main"
          className="veci-focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-pearl focus:px-3 focus:py-2 focus:text-text-dark"
        >
          Məzmuna keç
        </a>
        <SiteLayout locale={locale}>
          <AppProviders>{children}</AppProviders>
        </SiteLayout>
      </body>
    </html>
  );
}
