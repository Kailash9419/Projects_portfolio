"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { useInquiry } from "@/components/site/inquiry";
import { useLanguage } from "@/context/LanguageContext";
import { particleState } from "@/components/three/particle-state";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The landing is mostly empty on purpose: the particle field assembles the
 * DEVLABS wordmark behind it and the cursor plays with it. Copy is one line.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const { open } = useInquiry();

  useGSAP(
    () => {
      // while the hero is on screen the field shows the wordmark
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            particleState.stage = 0;
            particleState.layout = 0;
            particleState.presence = 1;
          }
        },
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".shutter", { display: "none" });
        return;
      }
      const split = SplitText.create(".hero-line", { type: "words", mask: "words" });
      gsap
        .timeline({ defaults: { ease: "expo.inOut" } })
        .fromTo(".shutter-top", { yPercent: 0 }, { yPercent: -100, duration: 1.4 }, 0.1)
        .fromTo(".shutter-bottom", { yPercent: 0 }, { yPercent: 100, duration: 1.4 }, 0.1)
        .fromTo(split.words, { yPercent: 120 }, { yPercent: 0, duration: 1.2, stagger: 0.06, ease: "expo.out" }, 1.2)
        .fromTo(".hero-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 1.4);

      gsap.to(".hero-copy", {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
      });
      return () => split.revert();
    },
    { scope: root, dependencies: [language], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="relative isolate h-svh min-h-[640px] overflow-hidden" aria-label="Intro">
      <h1 className="sr-only">
        DevLabs — {t.hero.line1} {t.hero.line2}
      </h1>
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="shutter shutter-top pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-ink" aria-hidden />
      <div className="shutter shutter-bottom pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/2 bg-ink" aria-hidden />

      <div className="hero-copy mx-auto flex h-full max-w-[1440px] flex-col px-4 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
        <div className="hero-in flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[11px]">
          <span className="flex items-center gap-3">
            <span className="size-2 animate-pulse rounded-full bg-lime shadow-[0_0_14px_var(--lime)]" />
            {t.hero.kicker}
          </span>
          <span className="hidden items-center gap-2 text-faint md:flex">
            <span className="inline-block size-3 rounded-full border border-lime/70" /> {t.hero.hint}
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p
            key={language}
            aria-hidden
            className="font-display text-[clamp(2.4rem,6.2vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            <span className="hero-line block">{t.hero.line1}</span>
            <span className="hero-line text-signal block">{t.hero.line2}</span>
          </p>
          <div className="hero-in flex flex-wrap items-center gap-3 lg:pb-3">
            <Magnetic>
              <Button onClick={open} size="lg" className="group h-14 rounded-full px-8 text-base font-semibold" data-cursor="Go">
                {t.hero.ctaPrimary}
                <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-line-strong bg-ink/40 px-7 text-base backdrop-blur">
              <Link href="#work">
                {t.hero.ctaSecondary} <ArrowDownRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
