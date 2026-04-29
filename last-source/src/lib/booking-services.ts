export type BookingCategory = "packages" | "makeup" | "hair" | "henna" | "eyelash";

export type LocalizedLabel = {
  az: string;
  ru: string;
};

export const BOOKING_CATEGORIES: { id: BookingCategory; label: LocalizedLabel }[] = [
  { id: "packages", label: { az: "Paketlər", ru: "Пакеты" } },
  { id: "makeup", label: { az: "Makiyaj", ru: "Макияж" } },
  { id: "hair", label: { az: "Saç", ru: "Волосы" } },
  { id: "henna", label: { az: "Xına", ru: "Хна" } },
  { id: "eyelash", label: { az: "Kirpik", ru: "Ресницы" } },
];

export const BOOKING_SERVICES: Record<
  BookingCategory,
  { value: string; label: LocalizedLabel }[]
> = {
  packages: [
    {
      value: "package-nisan",
      label: {
        az: "Həri, nişan, xına, nigah paketi — 350 AZN",
        ru: "Пакет (обручение, хна, бракосоч.) — 350 AZN",
      },
    },
    {
      value: "package-gelin",
      label: {
        az: "Gəlin paketi — 400 AZN",
        ru: "Свадебный пакет невесты — 400 AZN",
      },
    },
    {
      value: "package-nigar-extra",
      label: {
        az: "Paketdə saç üçün Nigar xanım — +50 AZN əlavə",
        ru: "Пакет: мастер Нигар по волосам — +50 AZN доплата",
      },
    },
  ],
  makeup: [
    {
      value: "ziyafet-kipriksiz",
      label: {
        az: "Ziyafət makiyajı — kipriksiz — 80 AZN",
        ru: "Вечерний макияж — без ресниц — 80 AZN",
      },
    },
    {
      value: "ziyafet-kirpikli",
      label: {
        az: "Ziyafət makiyajı — kirpikli — 90 AZN",
        ru: "Вечерний макияж — с ресницами — 90 AZN",
      },
    },
    {
      value: "makeup-linza",
      label: {
        az: "Linza (əlavə) — +15 AZN",
        ru: "Линзы (доп.) — +15 AZN",
      },
    },
    {
      value: "makeup-sine",
      label: {
        az: "Sinə tonlaşdırması (əlavə) — +10 AZN",
        ru: "Тонирование декольте (доп.) — +10 AZN",
      },
    },
  ],
  hair: [
    {
      value: "ziyafet-nigar",
      label: {
        az: "Ziyafət saçı (Nigar xanım) — 60/70/80 AZN",
        ru: "Вечерняя прическа (Нигар) — 60/70/80 AZN",
      },
    },
    {
      value: "elave-nigar",
      label: {
        az: "Əlavə saç (Nigar xanım) — +10/+20 AZN",
        ru: "Доп. пряди (Нигар) — +10/+20 AZN",
      },
    },
    {
      value: "kirik-fon-nigar",
      label: {
        az: "Kırıq fön (Nigar xanım) — 40/50 AZN",
        ru: "Волнистая укладка (Нигар) — 40/50 AZN",
      },
    },
    {
      value: "uklatka-nigar",
      label: {
        az: "Uklatka (Nigar xanım) — 20/30 AZN",
        ru: "Укладка (Нигар) — 20/30 AZN",
      },
    },
    {
      value: "ziyafet-raksana-inara",
      label: {
        az: "Ziyafət saçı (Raksana & İnara) — 40/50/60 AZN",
        ru: "Вечерняя прическа (Раксана и Инара) — 40/50/60 AZN",
      },
    },
    {
      value: "elave-raksana-inara",
      label: {
        az: "Əlavə saç (Raksana & İnara) — +10/+20 AZN",
        ru: "Доп. пряди (Раксана и Инара) — +10/+20 AZN",
      },
    },
    {
      value: "kirik-fon-raksana-inara",
      label: {
        az: "Kırıq fön (Raksana & İnara) — 40/50 AZN",
        ru: "Волнистая укладка (Раксана и Инара) — 40/50 AZN",
      },
    },
    {
      value: "uklatka-raksana-inara",
      label: {
        az: "Uklatka (Raksana & İnara) — 20/30 AZN",
        ru: "Укладка (Раксана и Инара) — 20/30 AZN",
      },
    },
  ],
  henna: [
    {
      value: "white-henna-1-hand",
      label: {
        az: "Əl üçün ağ xına — 1 əl — 30/40 AZN",
        ru: "Белая хна для рук — 1 рука — 30/40 AZN",
      },
    },
    {
      value: "white-henna-2-hand",
      label: {
        az: "Əl üçün ağ xına — 2 əl — 50/60 AZN",
        ru: "Белая хна для рук — обе руки — 50/60 AZN",
      },
    },
  ],
  eyelash: [
    {
      value: "consult-eyelash",
      label: {
        az: "Kirpik xidməti (ətraflı — əlaqə)",
        ru: "Услуги по ресницам (уточняйте у администратора)",
      },
    },
  ],
};
