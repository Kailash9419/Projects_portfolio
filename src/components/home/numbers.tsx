"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Four facts, set huge. Digits scramble into place when they arrive. */
export function Numbers() {
  const { t, language } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const glyphs = "0123456789₹%#";
      root.current!.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el, n) => {
        const final = el.dataset.scramble!;
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          duration: 1.4,
          delay: n * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          onUpdate: () => {
            const keep = Math.floor(state.p * final.length);
            el.textContent = final
              .split("")
              .map((c, i) => (i < keep || c === "–" || c === " " ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
              .join("");
          },
          onComplete: () => {
            el.textContent = final;
          },
        });
      });
    },
    { scope: root, dependencies: [language], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="border-y border-line bg-ink">
      <dl className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {t.numbers.map((n, i) => (
          <div key={n.label} className={`border-line px-4 py-10 sm:px-8 sm:py-14 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}>
            <dd data-scramble={n.value} className="font-display text-5xl font-extrabold tracking-[-0.05em] text-lime min-[400px]:text-6xl sm:text-8xl">
              {n.value}
            </dd>
            <dt className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{n.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
