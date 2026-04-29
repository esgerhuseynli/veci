"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

export type GalleryCategory = "lashes" | "makeup" | "skincare";

type GalleryItem = {
  id: string;
  category: GalleryCategory;
  minHeightClass: string;
  gradient: string;
};

const ITEMS: GalleryItem[] = [
  { id: "1", category: "lashes", minHeightClass: "min-h-[200px] sm:min-h-[220px]", gradient: "linear-gradient(150deg, #E8C9BB 0%, #C9897A 50%, #8B5E6A 100%)" },
  { id: "2", category: "makeup", minHeightClass: "min-h-[260px] sm:min-h-[280px]", gradient: "linear-gradient(130deg, #D4B896 0%, #E8C9BB 45%, #F5EFE6 100%)" },
  { id: "3", category: "skincare", minHeightClass: "min-h-[180px] sm:min-h-[200px]", gradient: "linear-gradient(170deg, #F5EFE6 0%, #E8C9BB 60%, #C9897A 100%)" },
  { id: "4", category: "lashes", minHeightClass: "min-h-[220px] sm:min-h-[240px]", gradient: "linear-gradient(120deg, #8B5E6A 0%, #C9897A 50%, #E8C9BB 100%)" },
  { id: "5", category: "makeup", minHeightClass: "min-h-[200px] sm:min-h-[220px]", gradient: "linear-gradient(160deg, #E8C9BB 0%, #C9897A 40%, #D4B896 100%)" },
  { id: "6", category: "skincare", minHeightClass: "min-h-[240px] sm:min-h-[260px]", gradient: "linear-gradient(145deg, #F5EFE6 0%, #8B5E6A 35%, #C9897A 90%)" },
  { id: "7", category: "lashes", minHeightClass: "min-h-[190px] sm:min-h-[210px]", gradient: "linear-gradient(135deg, #C9897A 0%, #E8C9BB 55%, #FEFCFA 100%)" },
  { id: "8", category: "makeup", minHeightClass: "min-h-[250px] sm:min-h-[270px]", gradient: "linear-gradient(155deg, #8B5E6A 0%, #C9897A 50%, #E8C9BB 100%)" },
  { id: "9", category: "skincare", minHeightClass: "min-h-[210px] sm:min-h-[230px]", gradient: "linear-gradient(125deg, #D4B896 0%, #E8C9BB 50%, #C9897A 100%)" },
  { id: "10", category: "lashes", minHeightClass: "min-h-[230px] sm:min-h-[250px]", gradient: "linear-gradient(165deg, #E8C9BB 0%, #F5EFE6 40%, #8B5E6A 85%)" },
  { id: "11", category: "makeup", minHeightClass: "min-h-[200px] sm:min-h-[220px]", gradient: "linear-gradient(140deg, #C9897A 0%, #D4B896 50%, #E8C9BB 100%)" },
  { id: "12", category: "skincare", minHeightClass: "min-h-[220px] sm:min-h-[240px]", gradient: "linear-gradient(150deg, #F5EFE6 0%, #C9897A 45%, #8B5E6A 100%)" },
];

const INSTAGRAM_URL = "https://www.instagram.com/vecibeautyhouse/";

const copy = {
  az: {
    tabs: ["Hamısı", "Kirpik", "Makiyaj", "Dəriyə qulluq"],
    labels: { lashes: "Kirpik", makeup: "Makiyaj", skincare: "Dəriyə qulluq" } as Record<GalleryCategory, string>,
    lightbox: "Şəkil baxışı",
    close: "Bağla",
    prev: "Əvvəlki",
    next: "Növbəti",
    follow: "Instagram-da bizi izləyin",
    handle: "@vecibeautyhouse",
    more: "Instagram-da daha çox",
  },
  ru: {
    tabs: ["Все", "Ресницы", "Макияж", "Уход"],
    labels: { lashes: "Ресницы", makeup: "Макияж", skincare: "Уход за кожей" } as Record<GalleryCategory, string>,
    lightbox: "Просмотр изображения",
    close: "Закрыть",
    prev: "Назад",
    next: "Вперед",
    follow: "Следите за нами в Instagram",
    handle: "@vecibeautyhouse",
    more: "Смотреть больше в Instagram",
  },
} as const;

function tabButtonClass(active: boolean) {
  return active
    ? "bg-rose text-white border-transparent shadow-sm"
    : "bg-transparent text-mauve border-mauve/40 hover:border-mauve/60 hover:bg-mauve/5";
}

export function GalleryClient({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const tabs: { id: "all" | GalleryCategory; label: string }[] = [
    { id: "all", label: t.tabs[0] },
    { id: "lashes", label: t.tabs[1] },
    { id: "makeup", label: t.tabs[2] },
    { id: "skincare", label: t.tabs[3] },
  ];

  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => (filter === "all" ? ITEMS : ITEMS.filter((i) => i.category === filter)), [filter]);

  const close = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i === null ? i : i === 0 ? visible.length - 1 : i - 1)), [visible.length]);
  const goNext = useCallback(() => setLightboxIndex((i) => (i === null ? i : i === visible.length - 1 ? 0 : i + 1)), [visible.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = Array.from(
          lightboxRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((node) => !node.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    if (lightboxIndex !== null) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
    } else {
      lastFocusedRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

  return (
    <>
      <div className="px-4 py-8 sm:px-6 sm:py-10">
        <div
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label={locale === "az" ? "Qalereya filtri" : "Фильтр галереи"}
        >
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(tab.id);
                  setLightboxIndex(null);
                }}
                className={["veci-focus-ring rounded-full border-2 px-4 py-2 text-sm font-light transition", tabButtonClass(active)].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-6xl [column-count:1] [column-gap:1.25rem] sm:[column-count:2] sm:[column-gap:1.5rem] lg:[column-count:3] lg:[column-gap:1.5rem]">
          {visible.map((item) => (
            <article key={item.id} className={`mb-4 break-inside-avoid ${item.minHeightClass}`}>
              <button type="button" onClick={() => setLightboxIndex(visible.findIndex((i) => i.id === item.id))} className="veci-focus-ring group relative w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/30 text-left shadow-[0_10px_35px_rgba(61,43,43,0.1)]">
                <div className={`relative w-full ${item.minHeightClass}`} style={{ background: item.gradient }}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_30%_20%,rgba(255,255,255,0.4)_0%,transparent_55%)]" aria-hidden />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#E8C9BB]/90 via-rose/45 to-transparent p-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <span className="mb-0 font-sans text-sm font-light tracking-wide text-white drop-shadow-md">{t.labels[item.category]}</span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {current && lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={t.lightbox}>
          <button type="button" className="absolute inset-0 cursor-default bg-text-dark/75 backdrop-blur-sm" onClick={close} aria-label={t.close} />
          <div ref={lightboxRef} className="relative z-[101] w-full max-w-4xl">
            <button ref={closeButtonRef} type="button" onClick={close} className="veci-focus-ring absolute -top-1 right-0 z-[102] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-text-dark/40 text-2xl leading-none text-white transition hover:bg-text-dark/60 sm:-right-2 sm:top-[-3rem]" aria-label={t.close}>×</button>
            {visible.length > 1 && (
              <>
                <button type="button" onClick={goPrev} className="veci-focus-ring absolute top-1/2 left-0 z-[102] -translate-y-1/2 rounded-full border border-white/20 bg-text-dark/40 p-2.5 text-white transition hover:bg-text-dark/60" aria-label={t.prev}>◀</button>
                <button type="button" onClick={goNext} className="veci-focus-ring absolute top-1/2 right-0 z-[102] -translate-y-1/2 rounded-full border border-white/20 bg-text-dark/40 p-2.5 text-white transition hover:bg-text-dark/60" aria-label={t.next}>▶</button>
              </>
            )}
            <div className="min-h-[min(70vh,480px)] w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl" style={{ background: current.gradient }}>
              <div className="h-full min-h-[min(70vh,480px)] w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(255,255,255,0.35)_0%,transparent_60%)]" role="img" aria-label={t.labels[current.category]} />
            </div>
          </div>
        </div>
      )}

      <section className="border-t border-blush/40 bg-gradient-to-b from-cream/80 to-pearl/60 px-4 py-12 text-center sm:px-6 sm:py-14">
        <p className="font-display text-xl text-text-dark sm:text-2xl">{t.follow}</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="veci-focus-ring mt-2 inline-flex items-center justify-center gap-2 font-sans text-sm font-light text-rose">
          <InstagramGlyph className="h-5 w-5" />
          <span className="font-medium">{t.handle}</span>
        </a>
        <div className="mt-6">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="veci-focus-ring inline-flex items-center justify-center rounded-full border border-transparent bg-rose px-7 py-3 text-sm font-light text-white shadow-md transition hover:bg-rose/90">
            {t.more}
          </a>
        </div>
      </section>
    </>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8A3.6 3.6 0 0 0 20 16.4V7.6A3.6 3.6 0 0 0 16.4 4H7.6M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6M17.6 5.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" />
    </svg>
  );
}
