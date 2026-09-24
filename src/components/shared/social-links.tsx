import type { SVGProps } from "react";
import { garage } from "@/config/garage";
import { cn } from "@/lib/cn";

type IconProps = SVGProps<SVGSVGElement>;

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M15.1 8.5h2.4V5.4h-2.4c-2.1 0-3.5 1.4-3.5 3.6v1.8H9.2v3.1h2.4V21h3.2v-7.1h2.5l.4-3.1h-2.9V9.3c0-.5.3-.8.9-.8Z"
      />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4Zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5.9-8.8a1.08 1.08 0 1 1-1.08-1.08A1.08 1.08 0 0 1 17.9 6.2Zm3.05 1.1a5.4 5.4 0 0 0-1.47-3.82 5.4 5.4 0 0 0-3.82-1.47c-1.5-.09-6.02-.09-7.52 0a5.4 5.4 0 0 0-3.82 1.47A5.4 5.4 0 0 0 2.85 7.3c-.09 1.5-.09 6.02 0 7.52a5.4 5.4 0 0 0 1.47 3.82 5.4 5.4 0 0 0 3.82 1.47c1.5.09 6.02.09 7.52 0a5.4 5.4 0 0 0 3.82-1.47 5.4 5.4 0 0 0 1.47-3.82c.09-1.5.09-6.01 0-7.52Zm-1.9 9.14a3.08 3.08 0 0 1-1.74 1.74c-1.2.48-4.06.37-5.31.37s-4.12.1-5.31-.37a3.08 3.08 0 0 1-1.74-1.74c-.48-1.2-.37-4.06-.37-5.31s-.11-4.12.37-5.31a3.08 3.08 0 0 1 1.74-1.74c1.2-.48 4.06-.37 5.31-.37s4.12-.11 5.31.37a3.08 3.08 0 0 1 1.74 1.74c.48 1.2.37 4.06.37 5.31s.11 4.11-.37 5.31Z"
      />
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M14.4 3c.3 2.2 1.5 3.8 3.6 4.2v2.5a6.3 6.3 0 0 1-3.6-1.1v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.6a3.1 3.1 0 1 0 2.2 3V3h2.6Z"
      />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16.7 3.5h2.7l-5.9 6.7 6.9 9.3h-5.4l-4.2-5.5-4.8 5.5H3.3l6.3-7.2L3 3.5h5.5l3.8 5 4.4-5Zm-.9 14.5h1.5L8.3 5h-1.6l8.1 13Z"
      />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M6.7 9.2H4V20h2.7V9.2ZM5.3 4A1.6 1.6 0 1 0 5.4 7.2 1.6 1.6 0 0 0 5.3 4ZM20 20h-2.7v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20H10.8V9.2h2.6v1.5h.1a2.8 2.8 0 0 1 2.6-1.4c2.7 0 3.2 1.8 3.2 4.1V20Z"
      />
    </svg>
  );
}

const items = [
  { key: "facebook", label: "Facebook", href: garage.socials.facebook, Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", href: garage.socials.instagram, Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", href: garage.socials.tiktok, Icon: TikTokIcon },
  { key: "x", label: "X", href: garage.socials.x, Icon: XIcon },
  { key: "linkedin", label: "LinkedIn", href: garage.socials.linkedin, Icon: LinkedInIcon },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  const links = items.filter((item) => item.href);

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} van ${garage.name}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-colors hover:border-white hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
