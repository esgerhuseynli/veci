import type { Metadata } from "next";
import Link from "next/link";
import { HeroParallax } from "@/components/home/HeroParallax";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  StaggerBox,
  StaggerDivGrid,
  StaggerList,
  StaggerListItem,
} from "@/components/motion/StaggerGrid";
import { getLocale, type Locale } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ana səhifə",
  description:
    "Veci Beauty House — kirpik, makiyaj və dəriyə qulluq xidmətləri.",
  openGraph: {
    title: `${siteName} | Ana səhifə`,
    description: "Veci Beauty House — kirpik, makiyaj və dəriyə qulluq.",
    url: siteUrl,
    type: "website",
  },
};

type LocalizedCopy = {
  comingSoon: string;
  tagline: string;
  ctaBook: string;
  ctaServices: string;
  introTitle: string;
  introSub: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  signatureTitle: string;
  signatureSub: string;
  learnMore: string;
  testimonialsTitle: string;
  testimonialsSub: string;
  ctaBannerTitle: string;
  ctaBannerBtn: string;
  introCards: { icon: string; title: string; line: string }[];
  featured: { name: string; desc: string; gradient: string; imageTint: string; mark: string }[];
  quotes: { name: string; text: string }[];
};

const copy: Record<Locale, LocalizedCopy> = {
  az: {
    comingSoon: "tezliklə",
    tagline: "Özünə layiq olduğun diqqəti ver",
    ctaBook: "Rezervasiya et",
    ctaServices: "Xidmətlərimiz",
    introTitle: "Sizin üçün hazırlanıb",
    introSub: "Üç əsas istiqamət — bir zərif gözəllik təcrübəsi.",
    aboutTitle: "Sevgi ilə hazırlanır, qayğı ilə təqdim olunur",
    aboutParagraphs: [
      "Veci Beauty House fərdi yanaşmanı sevənlər üçün yaradılıb: tələsmədən xidmət, incə toxunuş və təbii nəticə.",
      "Biz romantik üslubu sadə şəkildə təqdim edirik: pastel tonlar, yumşaq işıq və hər detalda peşəkarlıq.",
      "Kirpikdən tutmuş dəriyə qədər hər görüş özünə qayğı ritualına çevrilir.",
    ],
    signatureTitle: "İmza xidmətlərimiz",
    signatureSub: "Veci Beauty House təcrübəsinin əsas üç istiqaməti.",
    learnMore: "Ətraflı",
    testimonialsTitle: "Müştəri rəyləri",
    testimonialsSub: "Qonaqlarımızın təcrübələrindən seçmələr.",
    ctaBannerTitle: "Dəyişiminizə hazırsınız?",
    ctaBannerBtn: "Seansı rezerv et",
    introCards: [
      { icon: "✨", title: "Kirpik", line: "Üz quruluşunuza uyğun yüngül və zərif kirpiklər." },
      { icon: "💄", title: "Makiyaj", line: "Tədbirlər və gündəlik görünüş üçün təbii makiyaj toxunuşu." },
      { icon: "💇‍♀️", title: "Saç", line: "Ziyafət saçı, kırıq fön və uklatka seçimləri ilə görünüşünüzü tamamlayın." },
    ],
    featured: [
      {
        name: "Kirpik uzatma",
        desc: "Göz formasına uyğun xəritələnmiş, rahat və təbii görünən kirpik setləri.",
        gradient: "from-blush/80 via-cream/90 to-pearl",
        imageTint: "from-rose/35 via-cream/60 to-mauve/25",
        mark: "K",
      },
      {
        name: "Tədbir makiyajı",
        desc: "Foto və canlı görüntüdə eyni dərəcədə zərif görünən peşəkar makiyaj.",
        gradient: "from-rose/25 via-blush/50 to-cream/95",
        imageTint: "from-champagne/50 via-blush/40 to-rose/30",
        mark: "M",
      },
      {
        name: "Saç",
        desc: "Ziyafət saçı, kırıq fön və uklatka xidmətləri; qiymətlər saç uzunluğu və üsluba görə dəyişir.",
        gradient: "from-cream/95 via-champagne/40 to-blush/40",
        imageTint: "from-mauve/20 via-rose/15 to-blush/50",
        mark: "S",
      },
    ],
    quotes: [
      {
        name: "Ameliya R.",
        text: "Ən yüngül və təbii kirpik təcrübəm oldu — nəticə həm gözəl, həm də çox rahatdır.",
      },
      {
        name: "Jordana K.",
        text: "Gəlin makiyajım tam istədiyim kimi oldu: yumşaq, zərif və fotolarda möhtəşəm.",
      },
      {
        name: "Morgana L.",
        text: "Dəriyə qulluq prosedurundan sonra dərim həqiqətən canlandı və uzun müddət parlaq qaldı.",
      },
    ],
  },
  ru: {
    comingSoon: "скоро",
    tagline: "Где элегантность встречается с искусством",
    ctaBook: "Записаться",
    ctaServices: "Наши услуги",
    introTitle: "Создано для вас",
    introSub: "Три направления — один нежный beauty-опыт.",
    aboutTitle: "С заботой создано, с любовью выполнено",
    aboutParagraphs: [
      "Veci Beauty House создан для тех, кто ценит индивидуальный подход: без спешки, с деликатностью и точностью.",
      "Мы выбираем романтичную эстетику без перегруза: пастель, мягкий свет и внимание к каждой детали.",
      "Каждый визит — это ритуал красоты: от ресниц до ухода за кожей.",
    ],
    signatureTitle: "Наши фирменные услуги",
    signatureSub: "Три ключевых направления опыта Veci Beauty House.",
    learnMore: "Подробнее",
    testimonialsTitle: "Отзывы гостей",
    testimonialsSub: "Что говорят наши клиенты после визита.",
    ctaBannerTitle: "Готовы к преображению?",
    ctaBannerBtn: "Записаться на сеанс",
    introCards: [
      { icon: "✨", title: "Ресницы", line: "Легкие и аккуратные наборы с учетом формы ваших глаз." },
      { icon: "💄", title: "Макияж", line: "Естественный и вечерний макияж для любого повода." },
      { icon: "💇‍♀️", title: "Волосы", line: "Вечерние прически, волнистая укладка и uklatka под ваш образ." },
    ],
    featured: [
      {
        name: "Наращивание ресниц",
        desc: "Индивидуальные карты, комфортная посадка и естественный результат.",
        gradient: "from-blush/80 via-cream/90 to-pearl",
        imageTint: "from-rose/35 via-cream/60 to-mauve/25",
        mark: "Р",
      },
      {
        name: "Макияж для события",
        desc: "Нежный, фотогеничный и стойкий образ под ваш стиль.",
        gradient: "from-rose/25 via-blush/50 to-cream/95",
        imageTint: "from-champagne/50 via-blush/40 to-rose/30",
        mark: "М",
      },
      {
        name: "Волосы",
        desc: "Вечерние прически, волнистая укладка и uklatka; стоимость зависит от длины волос и стиля.",
        gradient: "from-cream/95 via-champagne/40 to-blush/40",
        imageTint: "from-mauve/20 via-rose/15 to-blush/50",
        mark: "В",
      },
    ],
    quotes: [
      { name: "Амелия Р.", text: "Самые легкие и естественные ресницы, которые у меня были." },
      { name: "Джордан К.", text: "Свадебный макияж получился именно таким, как я мечтала." },
      { name: "Морган Л.", text: "После ухода кожа выглядела свежей и сияющей очень долго." },
    ],
  },
};

function Stars() {
  return (
    <div className="flex min-h-11 min-w-11 justify-center gap-0.5 text-rose" aria-label="5 out of 5 stars">
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="text-base">
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const locale = getLocale();
  const t = copy[locale];

  return (
    <div>
      <HeroParallax aria-labelledby="veci-hero-title">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p className="hero-animate hero-delay-0 font-sans text-xs font-light uppercase tracking-[0.4em] text-mauve" style={{ fontVariantCaps: "all-small-caps" }}>
            {t.comingSoon}
          </p>
          <h1 id="veci-hero-title" className="hero-animate hero-delay-1 mt-4 text-center">
            <span className="block font-display text-6xl font-bold tracking-wide text-[#6B4A3A] sm:text-7xl md:text-8xl">Veci</span>
            <span className="hero-animate hero-delay-2 -mt-1 block font-script text-5xl leading-none text-rose sm:text-6xl md:text-7xl">Beauty House</span>
          </h1>
          <p className="hero-animate hero-delay-3 font-display text-xl text-text-dark/90 sm:text-2xl md:text-[1.65rem]">{t.tagline}</p>
          <div className="hero-animate hero-delay-4 mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <Link href="/booking" className="veci-btn-primary veci-btn-rose veci-focus-ring inline-flex w-full min-w-0 max-w-sm justify-center rounded-full px-8 py-3 text-sm sm:w-auto">
              <span className="veci-btn-cta-label">{t.ctaBook}</span>
            </Link>
            <Link href="/services" className="veci-focus-ring inline-flex min-h-11 w-full min-w-0 max-w-sm items-center justify-center rounded-full border-2 border-mauve/40 bg-pearl/40 px-8 py-3 text-sm font-light text-mauve backdrop-blur-sm transition active:scale-[0.98] hover:scale-[1.02] hover:border-rose/60 hover:text-rose sm:w-auto">
              {t.ctaServices}
            </Link>
          </div>
        </div>
      </HeroParallax>

      <ScrollReveal>
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <StaggerDivGrid className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {t.introCards.map((c) => (
              <StaggerBox key={c.title}>
                <div className="group surface-card flex min-h-11 flex-col items-center rounded-2xl px-6 py-8 text-center transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(139,94,106,0.12)]">
                  <span className="text-3xl" aria-hidden>{c.icon}</span>
                  <h2 className="mt-3 font-display text-2xl text-rose">{c.title}</h2>
                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-text-dark/75">{c.line}</p>
                </div>
              </StaggerBox>
            ))}
          </StaggerDivGrid>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 lg:order-1">
              <div className="aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border-2 border-blush bg-cream/80 shadow-sm lg:max-w-none" style={{ borderColor: "#E8C9BB" }}>
                <div className="h-full w-full bg-gradient-to-br from-blush/50 via-rose/20 to-mauve/15" role="img" aria-label="Studio placeholder" />
              </div>
            </div>
            <div className="order-1 text-center lg:order-2 lg:text-left">
              <h2 className="font-display text-3xl text-text-dark sm:text-4xl">{t.aboutTitle}</h2>
              <div className="mx-auto mt-4 h-px w-16 bg-rose/80 lg:mx-0" aria-hidden />
              <div className="mt-6 space-y-4 font-sans text-sm font-light leading-relaxed text-text-dark/80 sm:text-base">
                {t.aboutParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl text-text-dark sm:text-4xl">{t.signatureTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center font-sans text-sm font-light text-text-dark/70">{t.signatureSub}</p>
          </ScrollReveal>
          <StaggerList className="mt-12 grid list-none gap-7 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {t.featured.map((s) => (
              <StaggerListItem key={s.name} className={`flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br shadow-[0_12px_40px_rgba(61,43,43,0.06)] ${s.gradient}`}>
                <div className={`relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br ${s.imageTint}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.5)_0%,transparent_55%)]" aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center font-display text-5xl text-white/35 sm:text-6xl">{s.mark}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-text-dark/10 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-mauve">{s.name}</h3>
                  <p className="mt-2 flex-1 font-sans text-sm font-light leading-relaxed text-text-dark/80">{s.desc}</p>
                  <Link href="/services" className="veci-focus-ring mt-4 inline-flex min-h-11 w-fit items-center text-sm font-light text-rose underline decoration-rose/40 underline-offset-4 transition hover:decoration-mauve/80">{t.learnMore}</Link>
                </div>
              </StaggerListItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <section className="bg-cream/90 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-center font-display text-3xl text-text-dark sm:text-4xl">{t.testimonialsTitle}</h2>
            <p className="mx-auto mt-2 max-w-lg text-center font-sans text-sm font-light text-text-dark/65">{t.testimonialsSub}</p>
          </ScrollReveal>
          <StaggerList className="mt-12 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {t.quotes.map((q) => (
              <StaggerListItem key={q.name} className="surface-card flex min-h-11 flex-col rounded-2xl p-6 sm:p-7">
                <Stars />
                <p className="mt-4 flex-1 text-center font-display text-lg font-normal italic leading-relaxed text-text-dark/90">&ldquo;{q.text}&rdquo;</p>
                <p className="mt-4 text-center font-sans text-sm font-light text-mauve">{q.name}</p>
              </StaggerListItem>
            ))}
          </StaggerList>
        </div>
      </section>

      <ScrollReveal>
        <section className="relative overflow-hidden bg-gradient-to-r from-blush via-rose/90 to-rose py-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(100deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 6px)" }} aria-hidden />
          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl text-pearl sm:text-4xl">{t.ctaBannerTitle}</h2>
            <Link href="/booking" className="veci-btn-primary veci-focus-ring relative mt-8 inline-flex min-w-[12rem] justify-center overflow-hidden rounded-full bg-white text-sm font-medium text-rose shadow-lg">
              <span className="veci-btn-cta-label relative z-20 px-8 py-3.5">{t.ctaBannerBtn}</span>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
