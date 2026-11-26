"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel, SplitHeading } from "@/components/motion/reveal";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

/**
 * Work as giant names. Hovering a row dims the rest and pulls a live preview
 * of that project after the cursor; the preview leans into the direction of
 * travel. Phones get the image inline instead.
 */
export function WorkList({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  // Three layers, one owner each, so GSAP never fights Tailwind:
  //   follow  – GSAP x/y only (tracks the cursor)
  //   frame   – CSS only (centring, scale + fade on hover)
  //   tilt    – GSAP rotate only (leans with cursor speed)
  const follow = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const placed = useRef(false);
  const [hovered, setHovered] = useState<number | null>(null);
  // the last project shown stays on screen while the preview fades out
  const [shown, setShown] = useState(0);
  // the image underneath while the next one wipes up over it
  const [under, setUnder] = useState<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const f = follow.current!;
    const xTo = gsap.quickTo(f, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(f, "y", { duration: 0.55, ease: "power3" });
    const rotTo = gsap.quickTo(tilt.current!, "rotation", { duration: 0.5, ease: "power3" });
    let lastX = 0;
    let velocity = 0;
    const move = (e: PointerEvent) => {
      if (!placed.current) {
        // first sighting: jump straight to the cursor instead of flying in from the corner
        gsap.set(f, { x: e.clientX, y: e.clientY });
        placed.current = true;
        lastX = e.clientX;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      velocity += e.clientX - lastX;
      lastX = e.clientX;
      // sit beside the cursor so the hovered title stays readable; flip sides near the right edge
      const w = frame.current?.offsetWidth ?? 440;
      if (frame.current) frame.current.dataset.flip = e.clientX + 48 + w > window.innerWidth ? "1" : "0";
    };
    // lean into the direction of travel, then settle back to level when the mouse rests
    const tick = () => {
      rotTo(gsap.utils.clamp(-10, 10, velocity * 0.35));
      velocity *= 0.8;
    };
    gsap.ticker.add(tick);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const enter = (i: number, e: React.PointerEvent) => {
    if (!placed.current && follow.current) {
      gsap.set(follow.current, { x: e.clientX, y: e.clientY });
      placed.current = true;
    }
    setHovered(i);
    if (i !== shown) {
      setUnder(shown);
      setShown(i);
    }
  };

  return (
    <section id="work" ref={root} className="relative bg-ink px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel index={t.work.index}>{t.work.label}</SectionLabel>
            <SplitHeading className="mt-5 font-display text-7xl font-extrabold uppercase leading-[0.85] tracking-[-0.05em] sm:text-9xl">
              {t.work.title}
              <span className="text-lime">.</span>
            </SplitHeading>
          </div>
          <Link href="/work" className="mb-2 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-lime sm:flex">
            {t.work.all} <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-14 border-t border-line" onPointerLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <li key={p.id} className="border-b border-line">
              <Link
                href={`/work/${p.slug}`}
                data-cursor="Open"
                onPointerEnter={(e) => enter(i, e)}
                className={cn(
                  "group grid grid-cols-12 items-center gap-4 py-6 transition-opacity duration-500 sm:py-8",
                  hovered !== null && hovered !== i && "opacity-25"
                )}
              >
                {/* phones: image inline */}
                <div className="relative col-span-12 aspect-[16/9] overflow-hidden rounded-sm border border-line md:hidden">
                  <Image src={p.coverImage || "/placeholder-project.svg"} alt="" fill sizes="100vw" className="object-cover" />
                </div>
                <span className="col-span-1 font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-11 font-display text-[clamp(2.4rem,7.4vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:col-span-8">
                  {p.title}
                </span>
                <span className="col-span-11 col-start-2 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:col-span-3 md:col-start-auto md:justify-end">
                  <span>
                    {p.category} · {p.year}
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* cursor-following preview (mouse only) */}
      <div ref={follow} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(pointer:fine)]:md:block">
        <div
          ref={frame}
          data-flip="0"
          className={cn(
            "absolute left-0 top-0 aspect-[4/3] w-[min(30vw,420px)] -translate-y-1/2 translate-x-12 transition-[opacity,scale,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-[flip=1]:-translate-x-[calc(100%+3rem)]",
            hovered === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <div ref={tilt} className="relative h-full w-full overflow-hidden rounded-md border border-white/10 bg-surface shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)]">
            {projects.map((p, i) => (
              // plain eager <img>: every preview is decoded before the first hover, so it never pops in blank
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.id}
                src={p.coverImage || "/placeholder-project.svg"}
                alt=""
                loading="eager"
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover ease-[cubic-bezier(0.16,1,0.3,1)]",
                  i === shown
                    ? "z-10 transition-[clip-path] duration-700 [clip-path:inset(0_0_0_0)]"
                    : i === under
                      ? "z-0 [clip-path:inset(0_0_0_0)]"
                      : "z-0 transition-none [clip-path:inset(100%_0_0_0)]"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
