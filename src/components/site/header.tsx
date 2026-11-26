"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { useInquiry } from "@/components/site/inquiry";
import { Magnetic } from "@/components/motion/magnetic";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/data/brand";
import { cn } from "@/lib/utils";

function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label="Language" className={cn("flex items-center rounded-full border border-line-strong p-0.5 font-mono text-[11px]", className)}>
      {(["en", "hi"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            language === lang ? "bg-fg text-ink" : "text-muted-foreground hover:text-fg"
          )}
        >
          {lang === "en" ? "EN" : "हिं"}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLanguage();
  const { open } = useInquiry();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide on fast downward scroll, reveal on any upward scroll
      setHidden(y > 320 && y > last + 4);
      if (y < last - 2 || y < 320) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = pathname === "/";
  const links = [
    { href: home ? "#work" : "/work", label: t.nav.work },
    { href: "/#services", label: t.nav.services },
    { href: "/#process", label: t.nav.process },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled ? "border-b border-line/80 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-fg"
            >
              {l.label}
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="mr-1 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground xl:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
            {t.nav.available}
          </span>
          <LanguageToggle className="hidden sm:flex" />
          <Magnetic>
            <Button onClick={open} className="group hidden h-10 rounded-full px-5 font-semibold sm:inline-flex">
              {t.nav.cta}
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </Magnetic>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-line-strong bg-transparent lg:hidden" aria-label={t.nav.menu}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-line bg-ink p-0 sm:max-w-md">
              <SheetHeader className="border-b border-line px-6 py-5">
                <SheetTitle className="font-mono text-[11px] font-normal uppercase tracking-[0.28em] text-muted-foreground">
                  {t.nav.menu}
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-6 py-6">
                {links.map((l, i) => (
                  <SheetClose asChild key={l.href}>
                    <Link
                      href={l.href}
                      className="group flex items-baseline justify-between border-b border-line py-4 font-display text-4xl font-extrabold tracking-tight transition-colors hover:text-lime"
                    >
                      {l.label}
                      <span className="font-mono text-xs font-normal text-faint group-hover:text-lime">0{i + 1}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto grid gap-4 px-6 pb-8">
                <LanguageToggle className="w-fit" />
                <SheetClose asChild>
                  <Button onClick={open} size="lg" className="h-14 rounded-full text-base font-semibold">
                    {t.nav.cta} <ArrowUpRight />
                  </Button>
                </SheetClose>
                <a href={CONTACT.whatsapp.link} target="_blank" rel="noopener noreferrer" className="text-center text-sm text-whatsapp">
                  WhatsApp {CONTACT.whatsapp.displayNumber}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
