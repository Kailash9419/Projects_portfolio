import Link from "next/link";
import { cn } from "@/lib/utils";

/** DevLabs wordmark: a lime bracket glyph + the name. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="DevLabs home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center rounded-md bg-lime text-primary-foreground transition-transform duration-500 group-hover:rotate-[-8deg]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M8 6 3 12l5 6" />
          <path d="M16 6l5 6-5 6" />
          <path d="M13.5 4 10.5 20" />
        </svg>
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">
        Dev<span className="text-lime">Labs</span>
      </span>
    </Link>
  );
}
