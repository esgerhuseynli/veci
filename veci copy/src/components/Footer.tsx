import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { primaryNav } from "@/lib/navigation";
import { BrandLink } from "./BrandWordmark";

const copy = {
  az: {
    tagline: "Kirpik uzatma · Makiyaj · Dəriyə qulluq",
    contact: "Əlaqə",
    follow: "Bizi izləyin",
    followText: "Açılış və yeniliklər üçün bizi izləyin.",
    email: "E-poçt",
    phone: "Telefon",
    studio: "Studio",
    phoneVal: "Tezliklə",
    studioVal: "Ünvan açılışda elan ediləcək",
    rights: "© 2025 Veci Beauty House. Bütün hüquqlar qorunur.",
  },
  ru: {
    tagline: "Наращивание ресниц · Макияж · Уход за кожей",
    contact: "Контакты",
    follow: "Следите за нами",
    followText: "Следите за открытием и новостями студии.",
    email: "Email",
    phone: "Телефон",
    studio: "Студия",
    phoneVal: "Скоро",
    studioVal: "Адрес будет объявлен при открытии",
    rights: "© 2025 Veci Beauty House. Все права защищены.",
  },
} as const;

function SocialIcon({ children, label, href }: { children: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      className="veci-focus-ring flex h-10 w-10 items-center justify-center rounded-full text-white/95 ring-1 ring-rose/50 transition hover:bg-white/10 hover:ring-rose/70"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <footer className="bg-mauve text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-rose/45">
          <div className="flex flex-col gap-4 pr-0 md:pr-8">
            <BrandLink className="mb-1 self-start" veciBold theme="onDark" />
            <p className="font-sans text-sm font-light text-white/80">{t.tagline}</p>
            <nav className="mt-2 flex flex-col gap-1" aria-label="Footer">
              {primaryNav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="veci-focus-ring w-fit py-1 text-sm font-light text-white/90 underline-offset-2 transition hover:text-white hover:underline"
                >
                  {locale === "az"
                    ? label === "Home"
                      ? "Ana səhifə"
                      : label === "Services"
                        ? "Xidmətlər"
                        : label === "Gallery"
                          ? "Qalereya"
                          : label === "Contact"
                            ? "Əlaqə"
                            : "Rezervasiya"
                    : label === "Home"
                      ? "Главная"
                      : label === "Services"
                        ? "Услуги"
                        : label === "Gallery"
                          ? "Галерея"
                          : label === "Contact"
                            ? "Контакты"
                            : "Бронирование"}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 border-t border-rose/45 pt-10 md:border-t-0 md:pt-0 md:px-8">
            <h2 className="font-display text-lg font-medium tracking-wide text-white">{t.contact}</h2>
            <ul className="space-y-3 font-sans text-sm font-light text-white/85">
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-rose/90">{t.email}</span>
                <a href="mailto:hello@vecibeautyhouse.com" className="veci-focus-ring mt-0.5 inline-block text-white/95 underline decoration-rose/50 underline-offset-2 transition hover:decoration-white/80">
                  hello@vecibeautyhouse.com
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-rose/90">{t.phone}</span>
                <span className="mt-0.5 block">{t.phoneVal}</span>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-rose/90">{t.studio}</span>
                <span className="mt-0.5 block">{t.studioVal}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-rose/45 pt-10 md:pt-0 md:pl-8">
            <h2 className="font-display text-lg font-medium tracking-wide text-white">{t.follow}</h2>
            <p className="font-sans text-sm font-light text-white/80">{t.followText}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <SocialIcon label="Instagram" href="https://www.instagram.com/">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.636 1.35 1.01 1.01 1.29 2.28 1.35 3.64.06 1.27.08 1.65.08 4.85s-.02 3.59-.08 4.85c-.06 1.36-.35 2.63-1.35 3.64-1.01 1.01-2.28 1.29-3.64 1.35-1.27.05-1.65.07-4.85.07s-3.59-.02-4.85-.08c-1.36-.06-2.63-.35-3.64-1.35-1.01-1.01-1.29-2.28-1.35-3.64-.06-1.27-.08-1.65-.08-4.85s.02-3.59.08-4.85c.06-1.36.35-2.63 1.35-3.64 1.01-1.01 2.28-1.29 3.64-1.35 1.27-.05 1.65-.07 4.85-.07zm0 1.83c-3.15 0-3.5.01-4.72.07-1.1.05-1.7.25-2.1.42-.5.2-.9.45-1.3.86-.4.4-.65.8-.86 1.3-.16.4-.36 1-.42 2.1-.05 1.22-.07 1.57-.07 4.72s.02 3.5.07 4.72c.05 1.1.25 1.7.42 2.1.2.5.45.9.86 1.3.4.4.8.65 1.3.86.4.16 1 .36 2.1.42 1.22.05 1.57.07 4.72.07s3.5-.02 4.72-.07c1.1-.05 1.7-.25 2.1-.42.5-.2.9-.45 1.3-.86.4-.4.65-.8.86-1.3.16-.4.36-1 .42-2.1.05-1.22.07-1.57.07-4.72s-.02-3.5-.07-4.72c-.05-1.1-.25-1.7-.42-2.1-.2-.5-.45-.9-.86-1.3-.4-.4-.8-.65-1.3-.86-.4-.16-1-.36-2.1-.42-1.22-.05-1.57-.07-4.72-.07zm0 3.4a5.59 5.59 0 1 1 0 11.18 5.59 5.59 0 0 1 0-11.18zm0 1.84a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.88-.77a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="TikTok" href="https://www.tiktok.com/">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.84 4.84 0 0 1-3.77-1.55V0h-3.3v12.4a2.5 2.5 0 1 1-1.7-2.4V7.1a5.7 5.7 0 1 0 4 5.5V7.1a4.8 4.8 0 0 0 4.8 4.7V12a4.5 4.5 0 0 1-.1-.3z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-rose/45">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-light text-white/75">{t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
