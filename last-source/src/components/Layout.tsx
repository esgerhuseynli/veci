import type { Locale } from "@/lib/i18n";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Shared site shell: fixed header, scrollable main (offset for header), mauve footer.
 */
export function SiteLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <>
      <Header locale={locale} />
      <main id="main" className="relative z-0 pt-[4.5rem] sm:pt-20">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
