import type { Locale } from "@/lib/i18n";

type CardProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

function ContactCard({ icon, title, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-blush/40 bg-white p-5 shadow-[0_8px_30px_rgba(139,94,106,0.08)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/15 text-lg" aria-hidden>{icon}</div>
      <h3 className="mt-3 font-display text-lg text-mauve">{title}</h3>
      <div className="mt-1.5 font-sans text-sm font-light leading-relaxed text-text-dark/80">{children}</div>
    </div>
  );
}

const copy = {
  az: { address: "Ünvan", phone: "Telefon", email: "E-poçt", hours: "İş saatları", placeholder: "(Müvəqqəti ünvan)", mon: "B.e–C.a:", sat: "Şənbə:", sun: "Bazar:" },
  ru: { address: "Адрес", phone: "Телефон", email: "Эл. почта", hours: "Часы работы", placeholder: "(Временный адрес)", mon: "Пн–Пт:", sat: "Суббота:", sun: "Воскресенье:" },
} as const;

export function ContactInfoPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="space-y-4">
      <ContactCard icon="📍" title={t.address}>
        <p>123 Peony Lane, Suite 200</p><p className="text-text-dark/70">Austin, TX 78701</p><p className="mt-1 text-xs text-text-dark/55">{t.placeholder}</p>
      </ContactCard>
      <ContactCard icon="📞" title={t.phone}>
        <a href="tel:+15550001000" className="veci-focus-ring text-rose underline decoration-rose/40 underline-offset-2 transition hover:decoration-mauve/70">(555) 000-1000</a>
      </ContactCard>
      <ContactCard icon="📧" title={t.email}>
        <a href="mailto:hello@vecibeautyhouse.com" className="veci-focus-ring break-all text-rose underline decoration-rose/40 underline-offset-2 transition hover:decoration-mauve/70">hello@vecibeautyhouse.com</a>
      </ContactCard>
      <ContactCard icon="🕐" title={t.hours}>
        <ul className="space-y-1.5 text-text-dark/85">
          <li><span className="text-text-dark/55">{t.mon}</span> 9:00 – 19:00</li>
          <li><span className="text-text-dark/55">{t.sat}</span> 10:00 – 17:00</li>
          <li><span className="text-text-dark/55">{t.sun}</span> {locale === "az" ? "Bağlıdır" : "Закрыто"}</li>
        </ul>
      </ContactCard>
    </div>
  );
}
