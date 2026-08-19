import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

// Placeholder components if they don't exist yet
const SectionReveal = ({ children }: { children: React.ReactNode }) => <div className="reveal">{children}</div>;
const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => <button className={className}>{children}</button>;

export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();

  if (!projects?.length) return null;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Selected Work
          </h2>
          <p className="text-text-secondary text-lg">
            A curated selection of our recent projects
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, i) => {
            const indexMod = i % 4;
            
            if (indexMod === 0) {
              return (
                <SectionReveal key={project.id}>
                  <ProjectCard project={project} layout="wide" />
                </SectionReveal>
              );
            }
            
            if (indexMod === 1) {
              const nextProject = projects[i + 1];
              if (nextProject) {
                return (
                  <SectionReveal key={project.id}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7">
                        <ProjectCard project={project} layout="tall" />
                      </div>
                      <div className="md:col-span-5">
                        <ProjectCard project={nextProject} layout="default" />
                      </div>
                    </div>
                  </SectionReveal>
                );
              } else {
                return (
                  <SectionReveal key={project.id}>
                    <ProjectCard project={project} layout="default" />
                  </SectionReveal>
                );
              }
            }
            
            if (indexMod === 2 && i > 0 && projects[i - 1]) {
              return null; // Skip if handled in the symmetric grid step
            }
            
            if (indexMod === 2 || indexMod === 3) {
              return (
                <SectionReveal key={project.id}>
                  <div className="w-full relative h-[60vh] min-h-[400px] rounded-xl overflow-hidden group border border-border-default block">
                    <div className="absolute inset-0 z-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={project.coverImage || `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='${encodeURIComponent(project.accentColor || "#8B5CF6")}'/></svg>`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-bg-tertiary/80 backdrop-blur-sm text-text-primary text-xs font-medium border border-border-default">
                          {project.category}
                        </span>
                        <span className="text-text-primary/80 text-sm">{project.year}</span>
                      </div>
                      <h3 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-4">
                        {project.title}
                      </h3>
                      <p className="text-text-primary/80 max-w-2xl text-lg mb-8 line-clamp-2">
                        {project.tagline}
                      </p>
                      <Link href={`/work/${project.slug}`}>
                         <span className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                           View Project
                         </span>
                      </Link>
                    </div>
                  </div>
                </SectionReveal>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-24 flex justify-center">
          <Link href="/work">
            <MagneticButton className="px-8 py-4 rounded-full bg-bg-card border border-border-default text-text-primary hover:text-white transition-colors flex items-center gap-2 group">
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
