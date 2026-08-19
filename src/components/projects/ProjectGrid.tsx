"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-center">
        <p className="text-text-secondary text-lg">No projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
