"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A trailing ring + dot cursor. Grows over interactive elements and shows a
 * label for anything with data-cursor="View" etc. Fine pointers only.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current!;
    const d = dot.current!;
    const l = label.current!;
    r.style.display = d.style.display = "flex";
    const xr = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const yr = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    let lastText = "";

    const move = (e: PointerEvent) => {
      xr(e.clientX);
      yr(e.clientY);
      gsap.set(d, { x: e.clientX, y: e.clientY });
      const target = e.target as Element | null;
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const hot = target?.closest?.("a,button,select,label,input,textarea,[role=tab]");
      const text = labelled?.dataset.cursor ?? "";
      if (text !== lastText) {
        l.textContent = text;
        lastText = text;
      }
      gsap.to(r, {
        scale: text ? 3.2 : hot ? 1.9 : 1,
        backgroundColor: text ? "rgba(197,248,42,1)" : "rgba(197,248,42,0)",
        duration: 0.35,
        overwrite: "auto",
      });
      gsap.to(d, { opacity: text ? 0 : 1, duration: 0.2, overwrite: "auto" });
    };
    const leave = () => gsap.to([r, d], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([r, d], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 hidden h-8 w-8 items-center justify-center rounded-full border border-lime/80 mix-blend-difference"
      >
        <span
          ref={label}
          className="font-mono text-[4px] font-semibold uppercase tracking-[0.15em] text-black"
        />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[3px] -mt-[3px] hidden h-1.5 w-1.5 rounded-full bg-lime"
      />
    </>
  );
}
