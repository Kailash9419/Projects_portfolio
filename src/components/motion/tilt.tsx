"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * 3D tilt with a moving glare. Wrap any block (an image frame, a card);
 * it leans toward the pointer in perspective. Fine pointers only.
 */
export function Tilt({ children, className, max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(inner.current, { rotateY: x * max * 2, rotateX: -y * max * 2, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    gsap.to(glare.current, {
      opacity: 1,
      background: `radial-gradient(600px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.18), transparent 45%)`,
      duration: 0.4,
      overwrite: "auto",
    });
  };
  const leave = () => {
    gsap.to(inner.current, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
    gsap.to(glare.current, { opacity: 0, duration: 0.5, overwrite: "auto" });
  };

  return (
    <div onPointerMove={move} onPointerLeave={leave} className={cn("[perspective:1400px]", className)}>
      <div ref={inner} className="relative h-full w-full [transform-style:preserve-3d] will-change-transform">
        {children}
        <div ref={glare} className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-overlay" />
      </div>
    </div>
  );
}
