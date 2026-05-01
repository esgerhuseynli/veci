"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const SUBJECTS = [
  { value: "general", label: { az: "Ümumi sorğu", ru: "Общий вопрос" } },
  { value: "booking", label: { az: "Rezervasiya sualı", ru: "Вопрос по записи" } },
  { value: "partnership", label: { az: "Tərəfdaşlıq", ru: "Партнерство" } },
  { value: "other", label: { az: "Digər", ru: "Другое" } },
] as const;

const copy = {
  az: {
    name: "Ad", email: "E-poçt", phone: "Telefon", subject: "Mövzu", message: "Mesaj",
    subjectPlaceholder: "Mövzu seçin", messagePlaceholder: "Sizə necə kömək edə bilərik?",
    send: "Mesajı göndər", thanks: "Təşəkkürlər! Tezliklə sizinlə əlaqə saxlayacağıq",
    sendAnother: "Yeni mesaj göndər",
  },
  ru: {
    name: "Имя", email: "Email", phone: "Телефон", subject: "Тема", message: "Сообщение",
    subjectPlaceholder: "Выберите тему", messagePlaceholder: "Как мы можем помочь?",
    send: "Отправить сообщение", thanks: "Спасибо! Мы свяжемся с вами в ближайшее время",
    sendAnother: "Отправить еще",
  },
} as const;

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const reset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  if (submitted) {
    return (
      <div className="contact-success-panel contact-success-animate" role="status" aria-live="polite">
        <p className="font-sans text-lg font-light text-text-dark/90 sm:text-xl">
          {t.thanks} <span className="inline-block" aria-hidden>🤍</span>
        </p>
        <button type="button" onClick={reset} className="veci-focus-ring mt-6 text-sm font-light text-rose underline decoration-rose/40 underline-offset-4 transition hover:decoration-mauve/70">
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} noValidate>
      <div><label className="booking-label" htmlFor="contact-name">{t.name}</label><input id="contact-name" className="booking-field" value={name} onChange={(e)=>setName(e.target.value)} /></div>
      <div><label className="booking-label" htmlFor="contact-email">{t.email}</label><input id="contact-email" type="email" className="booking-field" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
      <div><label className="booking-label" htmlFor="contact-phone">{t.phone}</label><input id="contact-phone" type="tel" className="booking-field" value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
      <div>
        <label className="booking-label" htmlFor="contact-subject">{t.subject}</label>
        <select id="contact-subject" className="booking-field" value={subject} onChange={(e)=>setSubject(e.target.value)}>
          <option value="" disabled>{t.subjectPlaceholder}</option>
          {SUBJECTS.map((s)=><option key={s.value} value={s.value}>{s.label[locale]}</option>)}
        </select>
      </div>
      <div><label className="booking-label" htmlFor="contact-message">{t.message}</label><textarea id="contact-message" rows={5} className="booking-field resize-y" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={t.messagePlaceholder} /></div>
      <button type="submit" className="veci-btn-primary veci-btn-rose veci-focus-ring w-full rounded-xl py-3.5 text-sm font-light text-white"><span className="veci-btn-cta-label w-full">{t.send}</span></button>
    </form>
  );
}
