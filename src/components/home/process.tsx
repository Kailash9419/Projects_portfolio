"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/motion/reveal";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Four words, stacked as an accordion of giant type. Hovering a step opens it
 * (the others compress) and floods it lime. No paragraphs.
 */
export function Process() {
  const { t } = useLanguage();
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // phones/tablets: light up whichever step crosses the middle of the screen
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;
    const items = Array.from(list.current!.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="bg-ink px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel index={t.process.index}>{t.process.label}</SectionLabel>
        <ol ref={list} className="mt-12 flex flex-col gap-2 lg:h-[60svh] lg:flex-row">
          {t.process.steps.map((s, i) => (
            <li
              key={s.title}
              data-cursor={`0${i + 1}`}
              data-active={active === i}
              className="group relative flex min-h-36 flex-1 flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface p-6 transition-[flex-grow,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:flex-[2.4] hover:border-lime hover:bg-lime data-[active=true]:border-lime data-[active=true]:bg-lime sm:p-8"
            >
              <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-faint transition-colors duration-500 group-hover:text-ink/70 group-data-[active=true]:text-ink/70">
                <span>0{i + 1}</span>
                <span>{s.when}</span>
              </div>
              <h3 className="font-display text-5xl font-extrabold uppercase leading-none tracking-[-0.04em] transition-colors duration-500 group-hover:text-ink group-data-[active=true]:text-ink sm:text-6xl xl:text-7xl">
                {s.title}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
