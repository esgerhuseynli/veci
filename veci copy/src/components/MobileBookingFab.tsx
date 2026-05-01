"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  az: "Rezervasiya et",
  ru: "Записаться",
};

export function MobileBookingFab({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const hideOnPage =
    pathname === "/booking" || pathname.startsWith("/admin") || pathname === "/admin/login";

  if (hideOnPage) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
      <Link
        href="/booking"
        className="veci-btn-primary veci-btn-rose veci-focus-ring mx-auto flex min-h-12 w-full max-w-sm items-center justify-center rounded-full px-6 py-3 text-sm text-white shadow-lg"
      >
        <span className="veci-btn-cta-label">{labels[locale]}</span>
      </Link>
    </div>
  );
}
