"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    signIn: "Daxil ol",
    signUp: "Qeydiyyat",
    logout: "Çıxış",
    myReservations: "Rezervasiyalarım",
    adminServices: "Xidmətlər",
    adminHome: "Home şəkillər",
    adminGallery: "Qalereya",
    adminReservations: "Rezervasiyalar",
  },
  ru: {
    Home: "Главная",
    Services: "Услуги",
    Gallery: "Галерея",
    Contact: "Контакты",
    Booking: "Бронирование",
    bookNow: "Записаться",
    signIn: "Войти",
    signUp: "Регистрация",
    logout: "Выйти",
    myReservations: "Мои бронирования",
    adminServices: "Услуги",
    adminHome: "Фото главной",
    adminGallery: "Галерея",
    adminReservations: "Бронирования",
  },
};

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const labels = navLabels[locale];
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname.startsWith("/admin/login");
  const currentTab = searchParams.get("tab");
  const adminNav = [
    { href: "/admin?tab=reservations", label: labels.adminReservations, tab: "reservations" },
    { href: "/admin?tab=services", label: labels.adminServices, tab: "services" },
    { href: "/admin?tab=home", label: labels.adminHome, tab: "home" },
    { href: "/admin?tab=gallery", label: labels.adminGallery, tab: "gallery" },
  ];
  const desktopNavItems =
    isAdminRoute && !isAdminLogin
      ? adminNav
      : primaryNav.map((item) => ({ href: item.href, label: labels[item.label] ?? item.label, tab: null as string | null }));
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json: { user: { id: string; name: string; email: string } | null }) =>
        setUser(json.user),
      )
      .catch(() => setUser(null));
  }, [pathname]);

  const setLocale = (nextLocale: Locale) => {
    document.cookie = `veci_locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  async function submitAuth() {
    setAuthLoading(true);
    setAuthError(null);
    const endpoint = authMode === "signin" ? "/api/auth/login" : "/api/auth/signup";
    const payload =
      authMode === "signin"
        ? { email: authEmail, password: authPassword }
        : { name: authName, email: authEmail, password: authPassword };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    setAuthLoading(false);
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      setAuthError(err?.error ?? "Authentication failed");
      return;
    }
    const json = (await res.json()) as { user: { id: string; name: string; email: string } };
    setUser(json.user);
    setAuthOpen(false);
    setAuthPassword("");
  }

  async function logoutUser() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

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
            {desktopNavItems.map(({ href, label, tab }) => {
              const active = isAdminRoute && !isAdminLogin ? (tab ? pathname === "/admin" && currentTab === tab : pathname === "/admin" && !currentTab) : pathname === href;
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
                  {label}
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
            {!isAdminRoute ? (
              <>
                {user ? (
                  <>
                    <Link
                      href="/rezervasiyalarim"
                      className="veci-focus-ring inline-flex items-center justify-center rounded-full border border-rose/40 px-4 py-2 text-sm text-rose"
                    >
                      {labels.myReservations}
                    </Link>
                    <button
                      type="button"
                      onClick={logoutUser}
                      className="veci-focus-ring inline-flex items-center justify-center rounded-full border border-mauve/30 px-4 py-2 text-sm text-mauve"
                    >
                      {labels.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signin");
                        setAuthOpen(true);
                      }}
                      className="veci-focus-ring inline-flex items-center justify-center rounded-full border border-mauve/30 px-4 py-2 text-sm text-mauve"
                    >
                      {labels.signIn}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signup");
                        setAuthOpen(true);
                      }}
                      className="veci-focus-ring inline-flex items-center justify-center rounded-full border border-rose/40 px-4 py-2 text-sm text-rose"
                    >
                      {labels.signUp}
                    </button>
                  </>
                )}
                <Link
                  href="/booking"
                  className="veci-btn-primary veci-btn-rose veci-focus-ring inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-light text-white shadow-sm"
                >
                  <span className="veci-btn-cta-label">{labels.bookNow}</span>
                </Link>
              </>
            ) : null}
          </div>

          <button
            type="button"
            className="veci-focus-ring flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md lg:hidden"
            onClick={() => setDrawerOpen(true)}
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

      <div
        className={[
          "fixed inset-0 z-[60] bg-text-dark/40 transition-[opacity,visibility] duration-300 ease-out lg:hidden",
          drawerOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setDrawerOpen(false)}
        role="presentation"
        aria-hidden
      />

      <div
        id="mobile-drawer"
        className={[
          "fixed top-0 right-0 z-[70] flex h-full w-[min(100%,20rem)] flex-col bg-white shadow-[-8px_0_32px_rgba(61,43,43,0.12)] transition-transform duration-300 ease-out lg:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={ui.menu}
        aria-hidden={!drawerOpen}
      >
        <div className="flex items-center justify-between border-b border-blush/80 px-4 py-3">
          <BrandLink className="scale-90" veciBold />
          <button
            type="button"
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
          {desktopNavItems.map(({ href, label, tab }) => {
            const active = isAdminRoute && !isAdminLogin ? (tab ? pathname === "/admin" && currentTab === tab : pathname === "/admin" && !currentTab) : pathname === href;
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
                {label}
              </Link>
            );
          })}
          {!isAdminRoute ? (
            <>
              {user ? (
                <>
                  <Link
                    href="/rezervasiyalarim"
                    onClick={() => setDrawerOpen(false)}
                    className="veci-focus-ring mx-3 mt-2 inline-flex items-center justify-center rounded-full border border-rose/40 py-2.5 text-sm text-rose"
                  >
                    {labels.myReservations}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      logoutUser();
                    }}
                    className="veci-focus-ring mx-3 mt-2 inline-flex items-center justify-center rounded-full border border-mauve/30 py-2.5 text-sm text-mauve"
                  >
                    {labels.logout}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      setAuthMode("signin");
                      setAuthOpen(true);
                    }}
                    className="veci-focus-ring mx-3 mt-2 inline-flex items-center justify-center rounded-full border border-mauve/30 py-2.5 text-sm text-mauve"
                  >
                    {labels.signIn}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      setAuthMode("signup");
                      setAuthOpen(true);
                    }}
                    className="veci-focus-ring mx-3 mt-2 inline-flex items-center justify-center rounded-full border border-rose/40 py-2.5 text-sm text-rose"
                  >
                    {labels.signUp}
                  </button>
                </>
              )}
              <Link
                href="/booking"
                onClick={() => setDrawerOpen(false)}
                className="veci-btn-primary veci-btn-rose veci-focus-ring mx-3 mt-3 inline-flex items-center justify-center rounded-full py-3 text-sm font-light text-white"
              >
                <span className="veci-btn-cta-label w-full text-center">{labels.bookNow}</span>
              </Link>
            </>
          ) : null}
        </nav>
      </div>
      {authOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-text-dark/60"
            aria-label="Close auth popup"
            onClick={() => setAuthOpen(false)}
          />
          <div className="relative z-[121] w-full max-w-md rounded-2xl border border-blush/50 bg-pearl p-6 shadow-xl">
            <h3 className="font-display text-3xl text-mauve">
              {authMode === "signin"
                ? locale === "az"
                  ? "Daxil ol"
                  : "Войти"
                : locale === "az"
                ? "Qeydiyyat"
                : "Регистрация"}
            </h3>
            <div className="mt-4 flex gap-2">
              <button type="button" className={`rounded-full border px-3 py-1.5 text-sm ${authMode === "signin" ? "border-rose bg-rose text-white" : "border-mauve/30"}`} onClick={() => setAuthMode("signin")}>
                {locale === "az" ? "Daxil ol" : "Войти"}
              </button>
              <button type="button" className={`rounded-full border px-3 py-1.5 text-sm ${authMode === "signup" ? "border-rose bg-rose text-white" : "border-mauve/30"}`} onClick={() => setAuthMode("signup")}>
                {locale === "az" ? "Qeydiyyat" : "Регистрация"}
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {authMode === "signup" ? (
                <input className="booking-field" placeholder={locale === "az" ? "Ad" : "Имя"} value={authName} onChange={(e) => setAuthName(e.target.value)} />
              ) : null}
              <input className="booking-field" type="email" placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
              <input className="booking-field" type="password" placeholder={locale === "az" ? "Şifrə" : "Пароль"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
              {authError ? <p className="text-sm text-rose">{authError}</p> : null}
              <button type="button" className="booking-btn-confirm" onClick={submitAuth} disabled={authLoading}>
                <span className="booking-btn-text">{authLoading ? "..." : authMode === "signin" ? (locale === "az" ? "Daxil ol" : "Войти") : (locale === "az" ? "Qeydiyyatdan keç" : "Зарегистрироваться")}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
