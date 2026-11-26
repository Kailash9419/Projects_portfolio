"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal, SplitHeading } from "@/components/motion/reveal";
import { useInquiry } from "@/components/site/inquiry";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/data/brand";
import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseStudy({ project, prev, next }: { project: Project; prev: Project | null; next: Project | null }) {
  const { t } = useLanguage();
  const c = t.caseStudy;
  const { open } = useInquiry();
  const root = useRef<HTMLElement>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const screens = (project.screenshots || []).filter(Boolean);
  const host = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".cs-cover", { clipPath: "inset(18% 12% 18% 12% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 4px)", duration: 1.6, ease: "expo.out", delay: 0.2 });
      gsap.to(".cs-cover-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ".cs-cover", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".cs-in", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.3 });
    },
    { scope: root }
  );

  const whatsapp = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(
    `Hi DevLabs! I saw the ${project.title} project and want to build something similar for my business.`
  )}`;

  return (
    <article ref={root} className="pb-24">
      {/* ─── header ─── */}
      <header className="mx-auto max-w-[1440px] px-4 pt-28 sm:px-8 sm:pt-36">
        <Link href="/work" className="cs-in inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-lime">
          <ArrowLeft className="size-4" /> {c.back}
        </Link>
        <div className="cs-in mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="rounded-full bg-lime px-3 py-1 text-ink">{project.category}</span>
          <span className="rounded-full border border-line-strong px-3 py-1 text-muted-foreground">{project.year}</span>
          {host && <span className="rounded-full border border-line-strong px-3 py-1 text-muted-foreground">{host}</span>}
        </div>
        <SplitHeading as="h1" immediate className="mt-6 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] sm:text-8xl lg:text-[10rem]">
          {project.title}
        </SplitHeading>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="cs-in text-xl text-fg sm:text-2xl lg:col-span-7">{project.tagline}</p>
          <div className="cs-in flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {project.liveUrl && (
              <Button asChild size="lg" className="group h-14 rounded-full px-7 text-base font-semibold">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="Open">
                  {c.live} <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ─── cover ─── */}
      <div className="mx-auto mt-12 max-w-[1440px] px-4 sm:px-8">
        <div className="cs-cover relative aspect-[16/9] overflow-hidden rounded-sm border border-line bg-surface">
          <div className="cs-cover-img absolute inset-x-0 -top-[8%] h-[116%]">
            <Image src={project.coverImage || "/placeholder-project.svg"} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      </div>

      {/* ─── overview ─── */}
      <section className="mx-auto mt-20 grid max-w-[1440px] gap-12 px-4 sm:px-8 md:mt-28 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:sticky lg:top-28">
            <div className="bg-ink p-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">{c.stack}</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
            {project.results && project.results.length > 0 && (
              <div className="grid grid-cols-2 gap-px bg-line">
                {project.results.map((r) => (
                  <div key={r.label} className="bg-ink p-6">
                    <dd className="font-display text-4xl font-extrabold tracking-tight text-lime">{r.value}</dd>
                    <dt className="mt-1 text-xs text-muted-foreground">{r.label}</dt>
                  </div>
                ))}
              </div>
            )}
          </dl>
        </aside>

        <div className="space-y-16 lg:col-span-8">
          {project.description && (
            <Reveal>
              <p className="text-2xl leading-snug text-fg sm:text-3xl">{project.description}</p>
            </Reveal>
          )}

          {(project.problem || project.solution) && (
            <Reveal className="grid gap-4 md:grid-cols-2" stagger={0.12}>
              {project.problem && (
                <div className="rounded-xl border border-line bg-surface p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff8a7a]">{c.challenge}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-xl border border-lime/30 bg-lime/[0.04] p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime">{c.solution}</p>
                  <p className="mt-4 leading-relaxed text-fg">{project.solution}</p>
                </div>
              )}
            </Reveal>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">{c.delivered}</p>
              <Reveal as="ul" className="mt-6 border-t border-line" stagger={0.05} y={20}>
                {project.features.map((f, i) => (
                  <li key={f} className="flex items-center gap-5 border-b border-line py-5">
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <Check className="size-4 shrink-0 text-lime" strokeWidth={3} />
                    <span className="text-lg">{f}</span>
                  </li>
                ))}
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ─── screens ─── */}
      {screens.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-8 md:mt-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
            {screens.length} ×
          </p>
          <Reveal className="mt-6 grid gap-4 md:grid-cols-2" stagger={0.1}>
            {screens.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setZoom(src)}
                data-cursor="Zoom"
                className={`group relative overflow-hidden rounded-sm border border-line bg-surface ${i === 0 && screens.length % 2 === 1 ? "aspect-[16/8] md:col-span-2" : "aspect-[4/3]"}`}
              >
                <Image src={src} alt={`${project.title} screen ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </button>
            ))}
          </Reveal>
        </section>
      )}

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-[min(96vw,1400px)] border-line bg-ink p-2 sm:max-w-[min(96vw,1400px)]">
          <DialogTitle className="sr-only">{project.title}</DialogTitle>
          {zoom && (
            <div className="relative aspect-[16/10] w-full">
              <Image src={zoom} alt={project.title} fill sizes="96vw" className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── CTA ─── */}
      <section className="mx-auto mt-24 max-w-[1440px] px-4 sm:px-8 md:mt-32">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-lime/15 blur-[120px]" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-7xl">{c.similar}</h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button onClick={open} size="lg" className="h-14 rounded-full px-8 text-base font-semibold">
                {t.nav.cta} <ArrowUpRight />
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-whatsapp/50 bg-transparent px-6 text-base text-whatsapp hover:bg-whatsapp/10 hover:text-whatsapp">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── prev / next ─── */}
      <nav aria-label="More projects" className="mx-auto mt-16 grid max-w-[1440px] gap-px px-4 sm:grid-cols-2 sm:px-8">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="group border-t border-line py-8">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> {c.prev}
            </span>
            <span className="mt-3 block font-display text-3xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-lime sm:text-5xl">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="border-t border-line" />
        )}
        {next && (
          <Link href={`/work/${next.slug}`} className="group border-t border-line py-8 sm:text-right">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint sm:justify-end">
              {c.next} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-3 block font-display text-3xl font-extrabold uppercase tracking-tight transition-colors group-hover:text-lime sm:text-5xl">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
