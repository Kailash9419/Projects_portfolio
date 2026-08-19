"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRelativeMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  layout?: "default" | "wide" | "tall";
}

export default function ProjectCard({ project, layout = "default" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { x, y, isInside } = useRelativeMousePosition(cardRef);
  const shouldReduceMotion = useReducedMotion();

  const isWide = layout === "wide";
  const isTall = layout === "tall";

  const accentColor = project.accentColor || "#8B5CF6"; // default violet

  return (
    <Link href={`/work/${project.slug}`} className="block w-full h-full group">
      <motion.div
        ref={cardRef}
        className={cn(
          "relative overflow-hidden rounded-xl bg-bg-card border border-border-default h-full transition-colors duration-300",
          !shouldReduceMotion && "group-hover:border-transparent"
        )}
        style={{
          ...( !shouldReduceMotion && isInside && {
            borderColor: accentColor,
            boxShadow: `0 0 15px -3px ${accentColor}40`,
          })
        }}
        whileHover={!shouldReduceMotion ? { y: -4 } : {}}
      >
        {!shouldReduceMotion && isInside && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(circle 400px at ${x}px ${y}px, ${accentColor}15, transparent 80%)`,
            }}
          />
        )}
        
        <div className={cn("relative z-10 flex h-full", isWide ? "flex-col md:flex-row" : "flex-col")}>
          <div className={cn("relative overflow-hidden bg-bg-tertiary", 
            isWide ? "w-full md:w-[60%]" : "w-full",
            isTall ? "aspect-[4/3]" : "aspect-video"
          )}>
            <motion.div
              className="w-full h-full relative"
              animate={!shouldReduceMotion && isInside ? { x: (x - (cardRef.current?.clientWidth || 0)/2) * 0.02, y: (y - (cardRef.current?.clientHeight || 0)/2) * 0.02 } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
              <Image
                src={project.coverImage || `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='${encodeURIComponent(accentColor)}'/></svg>`}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
          
          <div className={cn("p-6 flex flex-col flex-grow", isWide ? "w-full md:w-[40%] justify-center" : "")}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-bg-tertiary text-text-secondary text-xs font-medium border border-border-default">
                  {project.category}
                </span>
                <span className="text-text-muted text-sm">{project.year}</span>
              </div>
            </div>
            
            <h3 className="font-display text-xl font-bold text-text-primary mb-2 transition-colors duration-300"
                style={!shouldReduceMotion && isInside ? { color: accentColor } : {}}>
              {project.title}
            </h3>
            
            <p className="text-text-secondary line-clamp-2 mb-6 flex-grow text-sm">
              {project.tagline}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-semibold text-text-muted border border-border-default rounded-full px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="overflow-hidden relative w-6 h-6 flex items-center justify-center">
                <svg className="w-5 h-5 text-text-muted transition-transform duration-300 group-hover:translate-x-full absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <svg className="w-5 h-5 text-text-primary transition-transform duration-300 -translate-x-full group-hover:translate-x-0 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: accentColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
