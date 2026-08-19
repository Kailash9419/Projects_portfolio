"use client";

import { useState, useMemo } from "react";
import { getAllProjects } from "@/lib/projects";
import { ProjectCategory, SortOption, CATEGORY_FILTER_MAP } from "@/types/project";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectFilter from "@/components/projects/ProjectFilter";
import ProjectSearch from "@/components/projects/ProjectSearch";
import ProjectSort from "@/components/projects/ProjectSort";
import GradientText from "@/components/ui/GradientText";
import SectionReveal from "@/components/ui/SectionReveal";

export default function WorkPage() {
  const allProjects = useMemo(() => getAllProjects(), []);
  const [activeFilterKey, setActiveFilterKey] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filter & Search & Sort pipeline
  const filteredProjects = useMemo(() => {
    let result = [...allProjects];

    // 1. Filter by category
    const categoryTarget = CATEGORY_FILTER_MAP[activeFilterKey];
    if (categoryTarget && categoryTarget !== "All") {
      result = result.filter((p) => p.category === categoryTarget);
    }

    // 2. Search query (title, description, tagline, technologies, category, features)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const searchable = [
          p.title,
          p.tagline,
          p.description,
          p.category,
          ...p.technologies,
          ...(p.features || []),
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(q);
      });
    }

    // 3. Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "featured":
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.year - a.year;
        });
        break;
    }

    return result;
  }, [allProjects, activeFilterKey, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <SectionReveal direction="up">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-violet">
            Archive & Showcase
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mt-3 text-text-primary">
            All <GradientText>Projects</GradientText>
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl">
            A comprehensive collection of web applications, AI tools, SaaS products, dashboards, and experimental interfaces built with precision.
          </p>
        </div>
      </SectionReveal>

      {/* Control Bar: Filters, Search, Sort */}
      <SectionReveal direction="up" delay={0.1}>
        <div className="space-y-6 mb-12">
          {/* Top Row: Categories */}
          <ProjectFilter
            activeFilter={activeFilterKey}
            onFilterChange={(key) => setActiveFilterKey(key)}
          />

          {/* Bottom Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="w-full sm:max-w-md">
              <ProjectSearch
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
              />
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-mono text-text-muted">
                Showing {filteredProjects.length} of {allProjects.length}
              </span>
              <ProjectSort
                value={sortBy}
                onChange={(sort) => setSortBy(sort)}
              />
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Animated Project Grid */}
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
}
