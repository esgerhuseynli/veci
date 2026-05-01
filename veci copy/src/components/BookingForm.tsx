"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
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
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const serviceOptions = useMemo(() => (!category ? [] : BOOKING_SERVICES[category]), [category]);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json: { user: { id: string; name: string; email: string } | null }) => {
        setUser(json.user);
        if (json.user?.email) {
          setEmail(json.user.email);
        }
      });
  }, []);

  useEffect(() => {
    const authQuery = searchParams.get("auth");
    if (authQuery === "signin") {
      setAuthMode("signin");
      setAuthOpen(true);
    } else if (authQuery === "signup") {
      setAuthMode("signup");
      setAuthOpen(true);
    }
  }, [searchParams]);

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
    setEmail(json.user.email);
    setAuthOpen(false);
  }

  async function logoutUser() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_min(22rem,100%)] lg:items-start lg:gap-12">
      <form
        className="space-y-8"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!user) {
            setAuthMode("signin");
            setAuthOpen(true);
            return;
          }
          setStatus("saving");
          const response = await fetch("/api/reservations", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              category,
              service,
              firstName,
              lastName,
              email,
              phone,
              date,
              time: time ?? "",
              notes,
            }),
          });

          if (!response.ok) {
            setStatus("error");
            return;
          }

          setStatus("done");
          setCategory("");
          setService("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDate("");
          setTime(null);
          setNotes("");
        }}
        noValidate
      >
        <div className="rounded-xl border border-blush/50 bg-pearl/70 p-4 text-sm">
          {user ? (
            <div className="flex items-center justify-between gap-3">
              <p>
                {locale === "az" ? "Daxil olunub:" : "Вход выполнен:"}{" "}
                <strong>{user.email}</strong>
              </p>
              <button
                type="button"
                className="rounded-full border border-mauve/30 px-3 py-1.5 text-xs"
                onClick={logoutUser}
              >
                {locale === "az" ? "Çıxış" : "Выйти"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <p>{locale === "az" ? "Rezervasiya üçün daxil olun və ya qeydiyyatdan keçin." : "Для записи войдите или зарегистрируйтесь."}</p>
              <button
                type="button"
                className="rounded-full border border-mauve/30 px-3 py-1.5 text-xs"
                onClick={() => setAuthOpen(true)}
              >
                {locale === "az" ? "Daxil ol" : "Войти"}
              </button>
            </div>
          )}
        </div>

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
            <div><label className="booking-label" htmlFor="firstName">{t.firstName}</label><input id="firstName" className="booking-field" value={firstName} onChange={(e)=>setFirstName(e.target.value)} /></div>
            <div><label className="booking-label" htmlFor="lastName">{t.lastName}</label><input id="lastName" className="booking-field" value={lastName} onChange={(e)=>setLastName(e.target.value)} /></div>
          </div>
          <div><label className="booking-label" htmlFor="email">{t.email}</label><input id="email" type="email" className="booking-field" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
          <div><label className="booking-label" htmlFor="phone">{t.phone}</label><input id="phone" type="tel" className="booking-field" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
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

        <button type="submit" className="booking-btn-confirm veci-focus-ring" disabled={status === "saving"}>
          <span className="booking-btn-text">{status === "saving" ? "..." : t.confirm}</span>
        </button>
        {status === "done" ? (
          <p className="text-sm text-mauve">{locale === "az" ? "Rezervasiya göndərildi." : "Запись отправлена."}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-rose">{locale === "az" ? "Xəta baş verdi. Yenidən yoxlayın." : "Произошла ошибка. Проверьте поля."}</p>
        ) : null}
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
    </div>
  );
}
