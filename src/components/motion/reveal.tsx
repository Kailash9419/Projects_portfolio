"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Display headline whose words rise out of a mask as it scrolls into view.
 * Splits by words (not chars) so Devanagari conjuncts never break apart.
 */
export function SplitHeading({
  children,
  className,
  as: Tag = "h2",
  immediate = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { language } = useLanguage();

  useGSAP(
    () => {
      if (reduced()) return;
      const split = SplitText.create(ref.current!, {
        type: "lines,words",
        linesClass: "split-line",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { yPercent: 115, rotate: 4 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.15,
              ease: "expo.out",
              stagger: 0.06,
              delay: immediate ? 0.15 + delay : delay,
              scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 88%", once: true },
            }
          ),
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [language], revertOnUpdate: true }
  );

  // Keyed by language so React remounts fresh DOM: SplitText's revert()
  // restores the HTML it captured, which would bring back the old language.
  return (
    <Tag key={language} ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Fades and lifts its direct children into view, staggered. */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 48,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (reduced()) return;
      gsap.fromTo(
        ref.current!.children,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref }
  );
  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

/** Mono section label: "01 / Selected work" with a hairline. */
export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground", className)}>
      <span className="text-lime">{index}</span>
      <span className="h-px w-10 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}
