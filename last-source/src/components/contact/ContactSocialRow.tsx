import type { Locale } from "@/lib/i18n";

const social = [
  { name: "Instagram", href: "https://www.instagram.com/vecibeautyhouse/", Icon: IconInstagram },
  { name: "TikTok", href: "https://www.tiktok.com/@vecibeautyhouse", Icon: IconTikTok },
  { name: "WhatsApp", href: "https://wa.me/15550001000", Icon: IconWhatsApp },
] as const;

export function ContactSocialRow({ locale }: { locale: Locale }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-2xl text-text-dark sm:text-3xl">
        {locale === "az" ? "Yolumuzu izləyin" : "Следите за нашим путем"}
      </h2>
      <p className="mt-1 font-sans text-sm font-light text-text-dark/65">
        {locale === "az" ? "Gündəlik ilham və açılış yenilikləri" : "Ежедневное вдохновение и новости открытия"}
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {social.map(({ name, href, Icon }) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="veci-focus-ring group flex h-12 w-12 items-center justify-center rounded-full border border-blush/50 bg-white text-mauve shadow-sm transition hover:border-rose/50 hover:text-rose hover:shadow-md" aria-label={name}>
              <Icon className="h-5 w-5 transition group-hover:scale-105" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.636 1.35 1.01 1.01 1.29 2.28 1.35 3.64.06 1.27.08 1.65.08 4.85s-.02 3.59-.08 4.85c-.06 1.36-.35 2.63-1.35 3.64-1.01 1.01-2.28 1.29-3.64 1.35-1.27.05-1.65.07-4.85.07s-3.59-.02-4.85-.08c-1.36-.06-2.63-.35-3.64-1.35-1.01-1.01-1.29-2.28-1.35-3.64-.06-1.27-.08-1.65-.08-4.85s.02-3.59.08-4.85c.06-1.36.35-2.63 1.35-3.64 1.01-1.01 2.28-1.29 3.64-1.35 1.27-.05 1.65-.07 4.85-.07zm0 1.83c-3.15 0-3.5.01-4.72.07-1.1.05-1.7.25-2.1.42-.5.2-.9.45-1.3.86-.4.4-.65.8-.86 1.3-.16.4-.36 1-.42 2.1-.05 1.22-.07 1.57-.07 4.72s.02 3.5.07 4.72c.05 1.1.25 1.7.42 2.1.2.5.45.9.86 1.3.4.4.8.65 1.3.86.4.16 1 .36 2.1.42 1.22.05 1.57.07 4.72.07s3.5-.02 4.72-.07c1.1-.05 1.7-.25 2.1-.42.5-.2.9-.45 1.3-.86.4-.4.65-.8.86-1.3.16-.4.36-1 .42-2.1.05-1.22.07-1.57.07-4.72s-.02-3.5-.07-4.72c-.05-1.1-.25-1.7-.42-2.1-.2-.5-.45-.9-.86-1.3-.4-.4-.8-.65-1.3-.86-.4-.16-1-.36-2.1-.42-1.22-.05-1.57-.07-4.72-.07zm0 3.4a5.59 5.59 0 1 1 0 11.18 5.59 5.59 0 0 1 0-11.18zm0 1.84a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.88-.77a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z" /></svg>);
}
function IconTikTok({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M19.59 6.69a4.8 4.8 0 0 1-3.77-1.55V.04h-3.3v12.4a2.5 2.5 0 0 1-1.7 2.3l-.1.02a2.5 2.5 0 0 1-1.1-2.1V6.1a5.6 5.6 0 0 0-1.1-.1 5.7 5.7 0 1 0 4 5.5V6.1a4.8 4.8 0 0 0 4.8 4.7V12a4.5 4.5 0 0 1-.1-.3z" /></svg>);
}
function IconWhatsApp({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>);
}
