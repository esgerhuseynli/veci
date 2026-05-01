import { cookies } from "next/headers";

export const locales = ["az", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocale(): Locale {
  const value = cookies().get("veci_locale")?.value ?? defaultLocale;
  return isLocale(value) ? value : defaultLocale;
}

export function pickLocale<T>(locale: Locale, values: Record<Locale, T>): T {
  return values[locale] ?? values[defaultLocale];
}
