"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectDetailHeroProps {
  project: Project;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-bg-primary pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <nav className="text-sm text-text-muted mb-6">
            <Link href="/work" className="hover:text-text-primary transition-colors">
              Work
            </Link>{" "}
            / <span className="text-text-secondary">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary">
              {project.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 md:mt-0">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: project.accentColor || "#8B5CF6" }}
              >
                {project.category}
              </span>
              <span className="text-text-secondary text-sm font-medium border border-border-default px-2 py-1 rounded">
                {project.year}
              </span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mb-8">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: project.accentColor || "#8B5CF6" }}
              >
                Visit Live Site &rarr;
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-text-primary border border-border-default hover:border-border-hover transition-colors"
              >
                View on GitHub
              </Link>
            )}
          </div>
        </div>

        <motion.div
          className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-bg-card border border-border-default"
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  );
}
