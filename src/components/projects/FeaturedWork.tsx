import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { readProjects } from "@/lib/server/projectStore";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default async function FeaturedWork() {
  const allProjects = await readProjects();
  const allFeatured = allProjects.filter((p) => p.featured);
  
  // Strictly filter only real, valid uploaded projects (no empty/blank ghost items)
  const projects = (allFeatured || []).filter(
    (p) => p && p.title && p.title.trim().length > 0
  );

  if (!projects?.length) return null;

  return (
    <section id="featured-work" className="py-14 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            04 — SELECTED WORK
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-[1.2] py-0.5">
            Selected Work
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl">
            Live platforms and digital products built for our clients.
          </p>
        </div>

        {/* Clean, Non-empty Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => {
            // First item gets a wide banner card if odd count, otherwise sleek 2-col card
            const isFirstAndOdd = i === 0 && projects.length % 2 !== 0;

            return (
              <SectionReveal
                key={project.id || project.slug}
                className={isFirstAndOdd ? "md:col-span-2" : "col-span-1"}
              >
                <ProjectCard
                  project={project}
                  layout={isFirstAndOdd ? "wide" : "default"}
                />
              </SectionReveal>
            );
          })}
        </div>

        {/* Archive Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/work">
            <MagneticButton className="px-6 py-3 rounded-full bg-bg-card border border-border-default text-text-primary hover:border-accent-lime/50 transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <span>View All Projects Archive ({projects.length})</span>
              <span>→</span>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
