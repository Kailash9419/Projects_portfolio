"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Playground } from "@/components/site/playground";
import { scrollTo } from "@/components/motion/smooth-scroll";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND, CONTACT, LOCATION, SOCIAL } from "@/data/brand";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink">
      <Playground />

      <div className="mx-auto grid max-w-[1440px] gap-8 border-t border-line px-4 py-10 sm:px-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-3">
          <Logo />
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground md:col-span-5">
          <Link href="/work" className="hover:text-lime">
            {t.nav.work}
          </Link>
          <Link href="/#services" className="hover:text-lime">
            {t.nav.services}
          </Link>
          <Link href="/#process" className="hover:text-lime">
            {t.nav.process}
          </Link>
          <Link href="/#contact" className="hover:text-lime">
            {t.nav.contact}
          </Link>
          <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
            Instagram
          </a>
          <a href={CONTACT.whatsapp.link} target="_blank" rel="noopener noreferrer" className="hover:text-whatsapp">
            WhatsApp
          </a>
        </nav>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint md:col-span-4 md:text-right">{LOCATION.shortLabel}</p>
      </div>

      <div className="pointer-events-none select-none px-2" aria-hidden>
        <p className="text-outline text-center font-display text-[19.5vw] font-extrabold leading-[0.8] tracking-[-0.05em]">DEVLABS</p>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 border-t border-line px-4 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:flex-row sm:items-center sm:px-8">
        <span>
          © {year} {BRAND.fullName}. {t.footer.rights}
        </span>
        <span>{t.footer.built}</span>
        <button type="button" onClick={() => scrollTo(0)} className="flex items-center gap-2 transition-colors hover:text-lime">
          Top <ArrowUp className="size-3.5" />
        </button>
      </div>
    </footer>
  );
}
