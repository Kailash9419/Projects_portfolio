"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/motion/reveal";
import { useLanguage } from "@/context/LanguageContext";
import { particleState } from "@/components/three/particle-state";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Pinned for four screens. Each step swaps one huge word while the particle
 * field (behind) re-forms into that service's icon. Nothing else to read.
 */
export function Services() {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const items = t.services.items;

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          particleState.stage = 1 + i;
          particleState.layout = 1;
          particleState.presence = 1;
          setActive(i);
        },
        onLeave: () => {
          particleState.stage = 5;
          particleState.presence = 0;
        },
        onEnterBack: () => {
          particleState.presence = 1;
        },
        onLeaveBack: () => {
          particleState.stage = 0;
          particleState.layout = 0;
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [items.length] }
  );

  return (
    <section id="services" ref={root} className="relative" style={{ height: `${items.length * 100}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-between px-4 pb-10 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
          <SectionLabel index={t.services.index}>{t.services.label}</SectionLabel>
          <div className="flex gap-1.5" aria-hidden>
            {items.map((_, i) => (
              <span key={i} className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-8 bg-lime" : "w-3 bg-line-strong")} />
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative h-[1.1em] overflow-hidden font-display text-[clamp(2.5rem,12.5vw,13rem)] font-extrabold uppercase leading-none tracking-[-0.05em]">
            {items.map((s, i) => (
              <h3
                key={s.word}
                className={cn(
                  "absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                )}
                aria-hidden={i !== active}
              >
                {s.word}
                <span className="text-lime">.</span>
              </h3>
            ))}
          </div>
          <div className="mt-4 flex items-baseline gap-5">
            <span className="font-mono text-sm text-lime">0{active + 1}</span>
            <p key={active} className="animate-in fade-in slide-in-from-bottom-2 text-base text-muted-foreground duration-500 sm:text-2xl">
              {items[active].line}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
