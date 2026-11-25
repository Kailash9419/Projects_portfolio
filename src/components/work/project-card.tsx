"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { Tilt } from "@/components/motion/tilt";
import { cn } from "@/lib/utils";

/** Archive card: image with a lime wipe on hover, title, tagline, tech. */
export function ProjectCard({ project, index, className }: { project: Project; index: number; className?: string }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="View" className={cn("group block", className)}>
      <Tilt className="aspect-[4/3]" max={6}>
      <div className="relative h-full overflow-hidden rounded-sm border border-line bg-surface">
        <Image
          src={project.coverImage || "/placeholder-project.svg"}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
          {project.category}
        </span>
        <span className="absolute bottom-3 right-3 grid size-11 translate-y-3 place-items-center rounded-full bg-lime text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      </Tilt>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors group-hover:text-lime">
            {project.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-faint">
          {String(index + 1).padStart(2, "0")} · {project.year}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
