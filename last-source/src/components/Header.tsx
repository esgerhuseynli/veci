"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { primaryNav } from "@/lib/navigation";
import { BrandLink } from "./BrandWordmark";

const navLabels: Record<Locale, Record<string, string>> = {
  az: {
    Home: "Ana səhifə",
    Services: "Xidmətlər",
    Gallery: "Qalereya",
    Contact: "Əlaqə",
    Booking: "Rezervasiya",
    bookNow: "İndi rezerv et",
  },
  ru: {
    Home: "Главная",
    Services: "Услуги",
    Gallery: "Галерея",
    Contact: "Контакты",
    Booking: "Бронирование",
    bookNow: "Записаться",
  },
};

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const labels = navLabels[locale];
  const ui = locale === "az"
    ? { openMenu: "Menyunu aç", closeMenu: "Menyunu bağla", menu: "Menyu", primary: "Əsas naviqasiya", mobile: "Mobil naviqasiya" }
    : { openMenu: "Открыть меню", closeMenu: "Закрыть меню", menu: "Меню", primary: "Основная навигация", mobile: "Мобильная навигация" };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    closeMenuButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (drawerOpen) return;
    lastFocusedRef.current?.focus();
  }, [drawerOpen]);

  const setLocale = (nextLocale: Locale) => {
    document.cookie = `veci_locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 border-b border-blush",
          "transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out",
          scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <BrandLink className="text-left" veciBold />

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label={ui.primary}>
            {primaryNav.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "nav-link-rose inline-flex min-h-11 items-center px-1.5 text-sm font-light",
                    active ? "text-rose" : "text-text-dark/90",
                  ].join(" ")}
                >
                  {labels[label] ?? label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-blush/60 bg-pearl/70 p-1">
              <button
                type="button"
                onClick={() => setLocale("az")}
                className={`veci-focus-ring rounded-full px-2.5 py-1 text-xs ${locale === "az" ? "bg-rose text-white" : "text-mauve"}`}
              >
                AZ
              </button>
              <button
                type="button"
                onClick={() => setLocale("ru")}
                className={`veci-focus-ring rounded-full px-2.5 py-1 text-xs ${locale === "ru" ? "bg-rose text-white" : "text-mauve"}`}
              >
                RU
              </button>
            </div>
            <Link
              href="/booking"
              className="veci-btn-primary veci-btn-rose veci-focus-ring inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-light text-white shadow-sm"
            >
              <span className="veci-btn-cta-label">{labels.bookNow}</span>
            </Link>
          </div>

          <button
            type="button"
            ref={openMenuButtonRef}
            className="veci-focus-ring flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md lg:hidden"
            onClick={() => {
              lastFocusedRef.current = document.activeElement as HTMLElement | null;
              setDrawerOpen(true);
            }}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            aria-label={ui.openMenu}
          >
            <span className="h-0.5 w-5 rounded-full bg-text-dark/85" />
            <span className="h-0.5 w-5 rounded-full bg-text-dark/85" />
            <span className="h-0.5 w-5 rounded-full bg-text-dark/85" />
          </button>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-text-dark/40 transition-[opacity,visibility] duration-300 ease-out lg:hidden"
            onClick={() => setDrawerOpen(false)}
            role="presentation"
            aria-hidden
          />

          <div
            id="mobile-drawer"
            className="fixed top-0 right-0 z-[70] flex h-full w-[min(100%,20rem)] flex-col bg-white shadow-[-8px_0_32px_rgba(61,43,43,0.12)] transition-transform duration-300 ease-out lg:hidden translate-x-0"
            role="dialog"
            aria-modal="true"
            aria-label={ui.menu}
          >
            <div className="flex items-center justify-between border-b border-blush/80 px-4 py-3">
              <BrandLink className="scale-90" veciBold />
              <button
                type="button"
                ref={closeMenuButtonRef}
                onClick={() => setDrawerOpen(false)}
                className="veci-focus-ring flex h-10 w-10 items-center justify-center rounded-md text-2xl leading-none text-text-dark/60"
                aria-label={ui.closeMenu}
              >
                ×
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-0 px-2 py-4" aria-label={ui.mobile}>
              <div className="mb-3 flex items-center gap-2 px-3">
                <button
                  type="button"
                  onClick={() => setLocale("az")}
                  className={`veci-focus-ring rounded-full px-3 py-1.5 text-xs ${locale === "az" ? "bg-rose text-white" : "border border-blush text-mauve"}`}
                >
                  AZ
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("ru")}
                  className={`veci-focus-ring rounded-full px-3 py-1.5 text-xs ${locale === "ru" ? "bg-rose text-white" : "border border-blush text-mauve"}`}
                >
                  RU
                </button>
              </div>
              {primaryNav.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={[
                      "nav-link-rose block rounded-lg px-3 py-3.5 text-base font-light",
                      active ? "text-rose" : "text-text-dark/90",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {labels[label] ?? label}
                  </Link>
                );
              })}
              <Link
                href="/booking"
                onClick={() => setDrawerOpen(false)}
                className="veci-btn-primary veci-btn-rose veci-focus-ring mx-3 mt-4 inline-flex items-center justify-center rounded-full py-3 text-sm font-light text-white"
              >
                <span className="veci-btn-cta-label w-full text-center">{labels.bookNow}</span>
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
