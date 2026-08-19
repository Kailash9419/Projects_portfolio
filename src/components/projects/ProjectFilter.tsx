"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FILTERS = [
  "ALL", "WEB APPS", "AI", "SAAS", "DASHBOARDS", "MOBILE", "AUTOMATION", "EXPERIMENTS"
];

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex items-center gap-2 w-max">
        {FILTERS.map((filter) => {
          const isActive = activeFilter.toUpperCase() === filter.toUpperCase();
          
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                isActive 
                  ? "text-white" 
                  : "bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-tertiary border border-transparent"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-accent-violet rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          );
        })}
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
