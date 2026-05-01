export const primaryNav = [
  { href: "/" as const, label: "Home" },
  { href: "/services" as const, label: "Services" },
  { href: "/gallery" as const, label: "Gallery" },
  { href: "/contact" as const, label: "Contact" },
  { href: "/booking" as const, label: "Booking" },
] as const;

export type NavHref = (typeof primaryNav)[number]["href"];
