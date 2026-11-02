import { cn } from "@/lib/cn";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 48 52" fill="none" className="h-11 w-10 shrink-0" aria-hidden="true">
        <path d="M8 5h14c14 0 22 8 22 21s-8 21-22 21H8V5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 13h17c9 0 15 5 15 13s-6 13-15 13H3" stroke="#b49473" strokeWidth="2" />
        <path d="M15 15v22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="flex flex-col">
        <span className="font-display text-[30px] leading-none tracking-[0.02em]">Damming<span className="text-[#b49473]">.</span></span>
        <span className="mt-2 text-[8px] font-normal uppercase leading-none tracking-[0.26em]">Garage & Techniek</span>
      </span>
    </span>
  );
}
