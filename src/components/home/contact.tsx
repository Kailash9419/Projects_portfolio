"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Mail, MessageCircle } from "lucide-react";
import { SectionLabel, SplitHeading } from "@/components/motion/reveal";
import { InquiryForm } from "@/components/site/inquiry";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/data/brand";

const StudioCore = dynamic(() => import("@/components/three/studio-core"), { ssr: false });

export function Contact() {
  const { t } = useLanguage();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line bg-ink">
      {wide ? (
        <div className="pointer-events-none absolute -right-[14vw] top-1/2 -z-10 aspect-square w-[min(100vw,980px)] -translate-y-1/2 opacity-70" aria-hidden>
          <StudioCore mood="calm" className="absolute inset-0 mix-blend-screen [mask-image:radial-gradient(closest-side,black_55%,transparent_100%)]" />
        </div>
      ) : (
        <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 size-[420px] rounded-full bg-lime/15 blur-[110px]" aria-hidden />
      )}

      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 py-24 sm:px-8 md:py-36 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <SectionLabel index={t.contact.index}>{t.contact.label}</SectionLabel>
          <SplitHeading className="mt-6 font-display text-[clamp(5rem,15vw,14rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.06em]">
            {t.contact.title} <span className="text-signal">{t.contact.titleAccent}</span>
          </SplitHeading>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.contact.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CONTACT.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-whatsapp/40 px-5 text-sm text-whatsapp transition-colors hover:bg-whatsapp/10"
            >
              <MessageCircle className="size-4" /> {CONTACT.whatsapp.displayNumber}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-muted-foreground transition-colors hover:border-lime hover:text-lime"
            >
              <Mail className="size-4" /> {CONTACT.email}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="hud rounded-2xl border border-line bg-surface/70 p-6 shadow-[0_40px_120px_-40px_rgba(197,248,42,0.35)] backdrop-blur-xl sm:p-10">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
