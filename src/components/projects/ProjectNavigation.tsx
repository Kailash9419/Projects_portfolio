"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

export default function ProjectNavigation({
  prev,
  next,
}: ProjectNavigationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!prev && !next) return null;

  return (
    <section className="w-full border-t border-border-default">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row">
        {/* Previous Project */}
        <div className="flex-1 flex flex-col items-start border-b md:border-b-0 border-border-default md:border-r pb-6 md:pb-0 md:pr-6">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group block w-full">
              <span className="text-text-muted text-sm block mb-2 transition-colors group-hover:text-text-secondary">
                &larr; Previous Project
              </span>
              <motion.h3
                className="font-display text-xl font-bold text-text-secondary transition-colors group-hover:text-text-primary"
                whileHover={shouldReduceMotion ? {} : { x: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {prev.title}
              </motion.h3>
            </Link>
          ) : (
            <div className="w-full h-full min-h-[4rem]" />
          )}
        </div>

        {/* Next Project */}
        <div className="flex-1 flex flex-col items-end pt-6 md:pt-0 md:pl-6 text-right">
          {next ? (
            <Link href={`/work/${next.slug}`} className="group block w-full">
              <span className="text-text-muted text-sm block mb-2 transition-colors group-hover:text-text-secondary">
                Next Project &rarr;
              </span>
              <motion.h3
                className="font-display text-xl font-bold text-text-secondary transition-colors group-hover:text-text-primary"
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {next.title}
              </motion.h3>
            </Link>
          ) : (
            <div className="w-full h-full min-h-[4rem]" />
          )}
        </div>
      </div>
    </section>
  );
}
