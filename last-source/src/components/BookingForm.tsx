"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { BOOKING_CATEGORIES, BOOKING_SERVICES, type BookingCategory } from "@/lib/booking-services";

const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"] as const;

const copy = {
  az: {
    step1: "Addım 1 — Xidmət seçin",
    step2: "Addım 2 — Şəxsi məlumat",
    step3: "Addım 3 — Tarix və saat",
    step4: "Addım 4 — Qeydlər",
    category: "Kateqoriya",
    service: "Xidmət",
    chooseCategory: "Kateqoriya seçin",
    chooseService: "Xüsusi xidmət seçin",
    firstCategory: "Əvvəl kateqoriya seçin",
    firstName: "Ad",
    lastName: "Soyad",
    email: "E-poçt ünvanı",
    phone: "Telefon nömrəsi",
    date: "Tarix",
    time: "Saat",
    notes: "Xüsusi istək və ya qeydləriniz?",
    confirm: "Rezervasiyanı təsdiqlə",
    note: "Bu forma demo üçündür — canlı sistemə qoşulduqda real rezervasiya işləyəcək.",
    expect: "Nə gözləmək olar",
    expect1: "Sorğunuza uyğun tarix və saat e-poçtla təsdiqlənəcək.",
    expect2: "Xidmətə başlamazdan əvvəl qısa konsultasiya aparılır.",
    expect3: "Hər xidmət rahat tempdə və tələsmədən edilir.",
    cancel: "Ləğv qaydası",
    cancelText: "Ləğv və ya dəyişiklik üçün ən azı 24 saat əvvəl məlumat verməyinizi xahiş edirik.",
    contact: "Əlaqə",
  },
  ru: {
    step1: "Шаг 1 — Выберите услугу",
    step2: "Шаг 2 — Личные данные",
    step3: "Шаг 3 — Дата и время",
    step4: "Шаг 4 — Комментарий",
    category: "Категория",
    service: "Услуга",
    chooseCategory: "Выберите категорию",
    chooseService: "Выберите услугу",
    firstCategory: "Сначала выберите категорию",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Email",
    phone: "Телефон",
    date: "Дата",
    time: "Время",
    notes: "Особые пожелания или заметки?",
    confirm: "Подтвердить запись",
    note: "Это демо-форма — подключите реальную систему бронирования перед запуском.",
    expect: "Что вас ждет",
    expect1: "Подтверждение даты и времени придет на email.",
    expect2: "Перед началом услуги проводится короткая консультация.",
    expect3: "Мы работаем в спокойном темпе, без спешки.",
    cancel: "Политика отмены",
    cancelText: "Пожалуйста, сообщайте об отмене или переносе минимум за 24 часа.",
    contact: "Контакты",
  },
} as const;

function BookingFloral() {
  return (
    <svg className="mt-4 h-24 w-24 text-rose/45" viewBox="0 0 120 120" fill="currentColor" aria-hidden>
      <path opacity="0.45" d="M60 8c-5 16 2 28 6 40 12-2 24 2 32 10-12 0-20 4-28 8 8 4 4 20-4 28 8-4 16-2 20 2 4-4 2-20-2-24 4 8-4 20-8 20 12 2 4 8-2 8-4-2-4-4-4-4-4-8-4-4-2 8-12 0-16-2-8-8-4-8-4-12 8-2-8-8-2-2z" />
      <path opacity="0.3" d="M20 80c4-6 10-2 12 2-4 2-8 0-8-2zM88 32c2 6-2 10-4 4 2-2 4-4 4-2z" />
    </svg>
  );
}

export function BookingForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [category, setCategory] = useState<BookingCategory | "">("");
  const [service, setService] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const serviceOptions = useMemo(() => (!category ? [] : BOOKING_SERVICES[category]), [category]);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_min(22rem,100%)] lg:items-start lg:gap-12">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <fieldset className="space-y-4 border-0 p-0">
          <legend className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mauve/90">{t.step1}</legend>
          <div>
            <label className="booking-label" htmlFor="booking-category">{t.category}</label>
            <select id="booking-category" className="booking-field" value={category} onChange={(e) => {setCategory(e.target.value as BookingCategory | ""); setService("");}}>
              <option value="" disabled>{t.chooseCategory}</option>
              {BOOKING_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label[locale]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="booking-label" htmlFor="booking-service">{t.service}</label>
            <select id="booking-service" className="booking-field" value={service} onChange={(e) => setService(e.target.value)} disabled={!category}>
              <option value="" disabled>{category ? t.chooseService : t.firstCategory}</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label[locale]}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="space-y-4 border-0 p-0">
          <legend className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mauve/90">{t.step2}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="booking-label" htmlFor="firstName">{t.firstName}</label><input id="firstName" className="booking-field" autoComplete="given-name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} /></div>
            <div><label className="booking-label" htmlFor="lastName">{t.lastName}</label><input id="lastName" className="booking-field" autoComplete="family-name" value={lastName} onChange={(e)=>setLastName(e.target.value)} /></div>
          </div>
          <div><label className="booking-label" htmlFor="email">{t.email}</label><input id="email" type="email" autoComplete="email" inputMode="email" className="booking-field" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
          <div><label className="booking-label" htmlFor="phone">{t.phone}</label><input id="phone" type="tel" autoComplete="tel" inputMode="tel" className="booking-field" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
        </fieldset>

        <fieldset className="space-y-4 border-0 p-0">
          <legend className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mauve/90">{t.step3}</legend>
          <div><label className="booking-label" htmlFor="booking-date">{t.date}</label><input id="booking-date" type="date" min={minDate} className="booking-field booking-date-input" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
          <div>
            <span className="booking-label">{t.time}</span>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button key={slot} type="button" onClick={() => setTime(slot)} className={["veci-focus-ring rounded-full border-2 px-3.5 py-2 text-sm font-light transition", time === slot ? "border-rose bg-rose text-white shadow-sm" : "border-mauve/30 bg-pearl/80 text-text-dark/90 hover:border-rose/50"].join(" ")} aria-pressed={time === slot}>{slot}</button>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-2 border-0 p-0">
          <legend className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mauve/90">{t.step4}</legend>
          <label className="booking-label" htmlFor="notes">{t.notes}</label>
          <textarea id="notes" rows={4} className="booking-field resize-y" value={notes} onChange={(e)=>setNotes(e.target.value)} />
        </fieldset>

        <button type="submit" className="booking-btn-confirm veci-focus-ring"><span className="booking-btn-text">{t.confirm}</span></button>
        <p className="text-center font-sans text-xs font-light text-text-dark/50">{t.note}</p>
      </form>

      <aside className="surface-card space-y-6 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28">
        <div>
          <h2 className="font-display text-xl text-mauve">{t.expect}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-4 font-sans text-sm font-light text-text-dark/80">
            <li>{t.expect1}</li><li>{t.expect2}</li><li>{t.expect3}</li>
          </ul>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
        <div>
          <h2 className="font-display text-xl text-mauve">{t.cancel}</h2>
          <p className="mt-2 font-sans text-sm font-light leading-relaxed text-text-dark/80">{t.cancelText}</p>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
        <div>
          <h2 className="font-display text-xl text-mauve">{t.contact}</h2>
          <p className="mt-2 font-sans text-sm font-light text-text-dark/80">
            <a href="tel:+0000000000" className="veci-focus-ring text-rose underline decoration-rose/40 underline-offset-2 hover:decoration-mauve/70">(555) 000-0000</a><br />
            <a href="mailto:hello@vecibeautyhouse.com" className="veci-focus-ring mt-1 inline-block text-rose underline decoration-rose/40 underline-offset-2 hover:decoration-mauve/70">hello@vecibeautyhouse.com</a>
          </p>
        </div>
        <div className="flex justify-center opacity-80"><BookingFloral /></div>
      </aside>
    </div>
  );
}
