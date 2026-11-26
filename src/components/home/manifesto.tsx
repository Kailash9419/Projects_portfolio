"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Two stacked statements. The top one is ink; a liquid lens under the cursor
 * cuts through it to reveal the lime answer underneath. On touch devices the
 * lens drifts on its own.
 */
export function Manifesto() {
  const { t, language } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const lens = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const layer = lens.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: el.clientWidth * 0.5, y: el.clientHeight * 0.5, r: 0 };
    const target = { x: pos.x, y: pos.y, r: 0 };
    let hovering = false;
    let touchUntil = 0;

    const apply = () => {
      // wobbling radius gives the blob a liquid edge
      const t = performance.now() / 1000;
      const r = pos.r * (1 + Math.sin(t * 3) * 0.04);
      layer.style.clipPath = `circle(${r}px at ${pos.x}px ${pos.y}px)`;
    };

    const tick = () => {
      if (!hovering && performance.now() > touchUntil) {
        // autonomous drift for touch and idle states
        const t = performance.now() / 1000;
        target.x = el.clientWidth * (0.5 + Math.sin(t * 0.5) * 0.3);
        target.y = el.clientHeight * (0.5 + Math.cos(t * 0.7) * 0.22);
        target.r = Math.max(120, Math.min(el.clientWidth, 900) * 0.16);
      }
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      pos.r += (target.r - pos.r) * 0.1;
      apply();
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      hovering = true;
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      target.r = Math.min(el.clientWidth, 1100) * 0.22;
    };
    const leave = () => {
      hovering = false;
    };
    const tap = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      target.r = Math.max(170, el.clientWidth * 0.42);
      touchUntil = performance.now() + 1800;
    };

    if (reduce) {
      // just show the answer, no motion
      layer.style.clipPath = "none";
      return;
    }
    gsap.ticker.add(tick);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", tap);
    return () => {
      el.removeEventListener("pointerdown", tap);
      gsap.ticker.remove(tick);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [language]);

  const lines = (arr: string[], cls: string) =>
    arr.map((l) => (
      <span key={l} className={`block ${cls}`}>
        {l}
      </span>
    ));

  const type = "font-display text-[clamp(2.3rem,10.5vw,11rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]";

  return (
    <section ref={root} data-cursor="Look" className="relative isolate overflow-hidden bg-ink px-4 py-28 sm:px-8 md:py-44" aria-label={t.manifesto.reveal.join(" ")}>
      <div className="mx-auto max-w-[1440px]">
        <p className={`${type} text-fg/90`} aria-hidden>
          {lines(t.manifesto.base, "")}
        </p>
      </div>
      {/* the answer, revealed by the lens */}
      <div ref={lens} className="absolute inset-0 bg-lime px-4 py-28 sm:px-8 md:py-44" style={{ clipPath: "circle(0px at 50% 50%)" }} aria-hidden>
        <div className="mx-auto max-w-[1440px]">
          <p className={`${type} text-ink`}>{lines(t.manifesto.reveal, "")}</p>
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-6 right-4 font-mono text-[11px] uppercase tracking-[0.3em] text-faint sm:right-8">
        ◐ {t.manifesto.hint}
      </p>
    </section>
  );
}
