export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Occasions", href: "/occasions" },
  { label: "Auto verkopen", href: "/auto-verkopen" },
  { label: "Werkplaats", href: "/werkplaats" },
  { label: "Diensten", href: "/diensten" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Occasions", href: "/occasions" },
  { label: "Auto verkopen", href: "/auto-verkopen" },
  { label: "Werkplaats", href: "/werkplaats" },
  { label: "Diensten", href: "/diensten" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
  { label: "Afspraak maken", href: "/afspraak" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Voorwaarden", href: "/voorwaarden" },
];
