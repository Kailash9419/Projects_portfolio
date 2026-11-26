"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Scroll to a y position or element, through Lenis when it's running. */
export function scrollTo(target: number | string | HTMLElement, smooth = true) {
  if (lenis) {
    lenis.scrollTo(target, { immediate: !smooth, force: true, offset: typeof target === "number" ? 0 : -72 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }
}

/** Lenis smooth wheel scrolling, ticked by GSAP so ScrollTrigger stays in sync. Touch keeps native scrolling. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: { offset: -72 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New pages start at the top (unless navigating to a hash).
  useEffect(() => {
    if (!window.location.hash) scrollTo(0, false);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
