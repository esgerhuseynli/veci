import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, type Locale } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/site";

const desc =
  "Veci Beauty House paketlər, makiyaj, saç, xına və kirpik xidmətləri üzrə aktual qiymətlər.";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description: desc,
  openGraph: {
    title: `${siteName} | Xidmətlər`,
    description: desc,
    url: `${siteUrl}/services`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
  },
  twitter: { title: `${siteName} | Xidmətlər`, description: desc },
  alternates: { canonical: `${siteUrl}/services` },
};

type ServiceItem = {
  name: string;
  duration: string;
  price: string;
  description: string;
};

type Category = {
  id: string;
  title: string;
  accent: "packages" | "hair" | "henna" | "makeup" | "eyelash";
  services: ServiceItem[];
};

const localized: Record<Locale, { title: string; sub: string; home: string; categories: Category[]; cta: string; ctaLink: string }> = {
  az: {
    title: "Xidmətlərimiz",
    sub: "Paketlər, makiyaj, saç və xına — aktual qiymət menyusu.",
    home: "Ana səhifə",
    categories: [
      {
        id: "packages",
        title: "Paketlər",
        accent: "packages",
        services: [
          {
            name: "Həri, nişan, xına, nigah paketi",
            duration: "paket",
            price: "350 AZN",
            description: "Daxildir: makiyaj + sinə tonlaşması, ziyafət saçı + kiçik ölçüdə saç aksesuarları.",
          },
          {
            name: "Gəlin paketi",
            duration: "paket",
            price: "400 AZN",
            description: "Daxildir: makiyaj + linza + sinə tonlaşması; ziyafət saçı + əlavə saç qoyulması + kiçik saç aksesuarları.",
          },
          {
            name: "Nigar xanım — paketdə əlavə",
            duration: "qeyd",
            price: "+50 AZN",
            description: "Hər iki paket üçün saç tərəfdə ustası Nigar xanım seçildikdə ümumi qiymətə əlavə olunur.",
          },
        ],
      },
      {
        id: "makeup",
        title: "Makiyaj (Ziyafət) · Arzu, Aytən, Soli, Nur, Çinarə",
        accent: "makeup",
        services: [
          {
            name: "Ziyafət makiyajı — kipriksiz",
            duration: "60–90 dəq",
            price: "80 AZN",
            description: "Kirpik tələb olunmayan əsas ziyafət makiyajı.",
          },
          {
            name: "Ziyafət makiyajı — kirpikli",
            duration: "60–90 dəq",
            price: "90 AZN",
            description: "Kirpiklə tamamlanan ziyafət makiyajı.",
          },
          {
            name: "Linza",
            duration: "əlavə",
            price: "+15 AZN",
            description: "Makiyaj paketinə əlavə linza seçimi.",
          },
          {
            name: "Sinə tonlaşdırması",
            duration: "əlavə",
            price: "+10 AZN",
            description: "Dekolt zonası üçün uyğunlaşdırılmış tonlama.",
          },
        ],
      },
      {
        id: "hair",
        title: "Saç (Ziyafət) · Raksana, İnara, Nigar",
        accent: "hair",
        services: [
          {
            name: "Ziyafət saçı — Nigar xanım",
            duration: "60–90 dəq",
            price: "60 / 70 / 80 AZN",
            description: "Qiymət saçın uzunluğundan asılıdır; əlavə saç üçün +10 / +20 AZN.",
          },
          {
            name: "Kırıq fön — Nigar xanım",
            duration: "~45 dəq",
            price: "40 / 50 AZN",
            description: "Dalğalı fön üslubu (iki qiymət səviyyəsi).",
          },
          {
            name: "Uklatka — Nigar xanım",
            duration: "~30 dəq",
            price: "20 / 30 AZN",
            description: "Üslubu və iş həcimində iki səviyyə.",
          },
          {
            name: "Ziyafət saçı — Raksana & İnara xanım",
            duration: "60–90 dəq",
            price: "40 / 50 / 60 AZN",
            description: "Qiymət saç uzunluğundan asılıdır; əlavə saç üçün +10 / +20 AZN.",
          },
          {
            name: "Kırıq fön — Raksana & İnara xanım",
            duration: "~45 dəq",
            price: "40 / 50 AZN",
            description: "Dalğalı fön (iki qiymət səviyyəsi).",
          },
          {
            name: "Uklatka — Raksana & İnara xanım",
            duration: "~30 dəq",
            price: "20 / 30 AZN",
            description: "Üslubu və iş həcimində iki səviyyə.",
          },
        ],
      },
      {
        id: "henna",
        title: "Əl üçün ağ xına",
        accent: "henna",
        services: [
          {
            name: "1 əl",
            duration: "dəyişən",
            price: "30 / 40 AZN",
            description: "Naxışın ölçü və sıxlığından asılı seçimlər.",
          },
          {
            name: "2 əl",
            duration: "dəyişən",
            price: "50 / 60 AZN",
            description: "Hər iki əl üçün uyğunlaşdırılmış qiymət.",
          },
        ],
      },
      {
        id: "eyelash",
        title: "Kirpik",
        accent: "eyelash",
        services: [
          {
            name: "Kirpik uzatma və başqa seçimlər",
            duration: "rezervasyon",
            price: "əlaqə",
            description: "Kirpik xidmətləri üçün dəqiqi qiymət və tarix rezerv vasitəsilə uyğunlaşdırılır.",
          },
        ],
      },
    ],
    cta: "Hansı xidmətin sizə uyğun olduğunu bilmirsiniz?",
    ctaLink: "Bizimlə əlaqə →",
  },
  ru: {
    title: "Наши услуги",
    sub: "Пакеты, макияж, волосы и хна — актуальное меню цен.",
    home: "Главная",
    categories: [
      {
        id: "packages",
        title: "Пакеты",
        accent: "packages",
        services: [
          {
            name: "Пакет: обручение, хна, свадьба",
            duration: "пакет",
            price: "350 AZN",
            description: "Включено: макияж + тонирование декольте, вечерняя причёска + аксессуары для волос (небольшого размера).",
          },
          {
            name: "Свадебный пакет невесты",
            duration: "пакет",
            price: "400 AZN",
            description: "Включено: макияж + линзы + тон декольте; причёска + наращивание/дополнительный объём + аксессуары для волос.",
          },
          {
            name: "Мастер Нигар — доплата в пакете",
            duration: "примечание",
            price: "+50 AZN",
            description: "Если для волос выбрана Нигар, к стоимости пакета добавляется сумма указанная ниже.",
          },
        ],
      },
      {
        id: "makeup",
        title: "Макияж (вечерний) · Арзу, Айтән, Соли, Нур, Чинара",
        accent: "makeup",
        services: [
          {
            name: "Вечерний макияж — без накладных ресниц",
            duration: "60–90 мин",
            price: "80 AZN",
            description: "Базовый вечерний образ без включённых ресниц.",
          },
          {
            name: "Вечерний макияж — с ресницами",
            duration: "60–90 мин",
            price: "90 AZN",
            description: "Вечерний макияж с ресницами.",
          },
          {
            name: "Линзы",
            duration: "дополнительно",
            price: "+15 AZN",
            description: "Дополнительная опция к макияжу.",
          },
          {
            name: "Тонирование декольте",
            duration: "дополнительно",
            price: "+10 AZN",
            description: "Выравнивание тона зоны декольте под образ.",
          },
        ],
      },
      {
        id: "hair",
        title: "Волосы (мероприятия) · Раксана, Инара, Нигар",
        accent: "hair",
        services: [
          {
            name: "Вечерняя причёска — госпожа Нигар",
            duration: "60–90 мин",
            price: "60 / 70 / 80 AZN",
            description: "Цена зависит от длины волос; дополнительный объём +10 / +20 AZN.",
          },
          {
            name: "Волнистая укладка — госпожа Нигар",
            duration: "~45 мин",
            price: "40 / 50 AZN",
            description: "Два ценовых уровня.",
          },
          {
            name: "Укладка (uklatka) — госпожа Нигар",
            duration: "~30 мин",
            price: "20 / 30 AZN",
            description: "Два уровня сложности / объёма работ.",
          },
          {
            name: "Вечерняя причёска — госпожа Раксана и Инара",
            duration: "60–90 мин",
            price: "40 / 50 / 60 AZN",
            description: "Цена зависит от длины; доп. пряди +10 / +20 AZN.",
          },
          {
            name: "Волнистая укладка — госпожа Раксана и Инара",
            duration: "~45 мин",
            price: "40 / 50 AZN",
            description: "Два ценовых уровня.",
          },
          {
            name: "Укладка (uklatka) — госпожа Раксана и Инара",
            duration: "~30 мин",
            price: "20 / 30 AZN",
            description: "Два ценовых уровня.",
          },
        ],
      },
      {
        id: "henna",
        title: "Белая хна для рук",
        accent: "henna",
        services: [
          {
            name: "Одна рука",
            duration: "по времени",
            price: "30 / 40 AZN",
            description: "Зависит от размера и детализации узора.",
          },
          {
            name: "Обе руки",
            duration: "по времени",
            price: "50 / 60 AZN",
            description: "Пакеты для двух рук.",
          },
        ],
      },
      {
        id: "eyelash",
        title: "Ресницы",
        accent: "eyelash",
        services: [
          {
            name: "Наращивание и другие услуги",
            duration: "запись",
            price: "уточняйте",
            description: "Стоимость и время согласуются при бронировании.",
          },
        ],
      },
    ],
    cta: "Не уверены, какая услуга вам подойдет?",
    ctaLink: "Связаться с нами →",
  },
};

const accentClass: Record<Category["accent"], string> = {
  packages: "from-mauve/30 via-blush/50 to-champagne/45",
  hair: "from-champagne/45 via-blush/45 to-mauve/20",
  henna: "from-rose/30 via-champagne/50 to-blush/40",
  makeup: "from-champagne/50 via-blush/30 to-rose/20",
  eyelash: "from-rose/35 via-cream/80 to-mauve/20",
};

function ServicePlaceholder({ accent }: { accent: Category["accent"] }) {
  return (
    <div className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br shadow-inner sm:h-28 sm:w-28 ${accentClass[accent]}`} aria-hidden>
      <span className="font-display text-3xl text-white/40 sm:text-4xl">✦</span>
    </div>
  );
}

function ServiceCard({ service, accent, index, locale }: { service: ServiceItem; accent: Category["accent"]; index: number; locale: Locale }) {
  const bg = index % 2 === 0 ? "bg-cream/90" : "bg-pearl";
  return (
    <li className={`flex flex-col gap-5 rounded-2xl border border-blush/35 p-5 shadow-sm sm:flex-row sm:items-stretch sm:gap-6 sm:p-6 ${bg}`}>
      <div className="flex justify-center sm:justify-start">
        <ServicePlaceholder accent={accent} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="break-words font-display text-2xl leading-tight text-mauve sm:text-[1.65rem]">{service.name}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-sans text-sm font-light text-text-dark/85">
          <span className="text-text-dark/60">{service.duration}</span>
          <span className="font-medium text-rose">· {service.price}</span>
        </div>
        <p className="mt-3 font-sans text-sm font-light leading-relaxed text-text-dark/75">{service.description}</p>
        <div className="mt-5">
          <Link href="/booking" className="veci-focus-ring group inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-rose bg-transparent px-5 py-2.5 text-sm font-light text-rose transition active:scale-[0.98] hover:scale-[1.02] hover:bg-rose hover:text-white">
            {locale === "az" ? "Bu xidməti rezerv et" : "Записаться"}
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function ServicesPage() {
  const locale = getLocale();
  const t = localized[locale];

  return (
    <div>
      <header className="relative overflow-hidden border-b border-blush/50 bg-gradient-to-br from-cream via-blush/40 to-cream/95 px-4 py-12 sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(100deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 8px)" }} aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <nav className="mb-6 font-sans text-xs font-light text-text-dark/60" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-1.5">
              <li><Link href="/" className="text-mauve/90 underline decoration-blush/60 underline-offset-2 transition hover:text-rose">{t.home}</Link></li>
              <li aria-hidden className="text-text-dark/40">&gt;</li>
              <li className="text-text-dark/75" aria-current="page">{t.title}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-normal text-text-dark sm:text-5xl md:text-6xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-light text-text-dark/70">{t.sub}</p>
        </div>
      </header>

      <div className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {t.categories.map((cat, catIndex) => (
            <section key={cat.id} className="relative" aria-labelledby={`${cat.id}-title`}>
              {catIndex > 0 && <div className="mb-10 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-rose/45 to-transparent" aria-hidden />}
              <h2 id={`${cat.id}-title`} className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.3em] text-mauve">{cat.title}</h2>
              <ul className="space-y-5">
                {cat.services.map((service, i) => (
                  <ServiceCard key={service.name} service={service} accent={cat.accent} index={i} locale={locale} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <section className="border-t border-blush/40 bg-gradient-to-b from-pearl/50 to-cream/60 px-4 py-12 text-center sm:px-6 sm:py-14">
        <p className="font-sans text-base font-light text-text-dark/80 sm:text-lg">
          {t.cta}{" "}
          <Link href="/contact" className="veci-focus-ring inline font-medium text-rose underline decoration-rose/40 underline-offset-4 transition hover:decoration-mauve/70">{t.ctaLink}</Link>
        </p>
      </section>
    </div>
  );
}
