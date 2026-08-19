"use client";

import React from "react";
import { getProjectCategories } from "@/lib/projects";
import SectionReveal from "@/components/ui/SectionReveal";

const CategoryIcon = ({ index }: { index: number }) => {
  const colors = [
    "text-accent-violet",
    "text-accent-cyan",
    "text-accent-lime",
    "text-accent-orange",
    "text-accent-pink",
    "text-white",
  ];
  const color = colors[index % colors.length];

  const shapes = [
    <circle cx="12" cy="12" r="8" fill="currentColor" key="circle" />,
    <rect x="6" y="6" width="12" height="12" fill="currentColor" key="rect" />,
    <polygon points="12,4 20,18 4,18" fill="currentColor" key="polygon" />,
    <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" key="diamond" />,
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="none" stroke="currentColor" strokeWidth="4" key="ring" />,
    <path d="M6 6h12v12H6z" fill="none" stroke="currentColor" strokeWidth="4" key="square-ring" />,
  ];

  return (
    <svg className={`w-8 h-8 ${color} mb-4 opacity-80`} viewBox="0 0 24 24">
      {shapes[index % shapes.length]}
    </svg>
  );
};

export default function WhatWeBuild() {
  const categoriesWithCounts = getProjectCategories();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <SectionReveal>
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan block mb-2">
            Domains & Specialties
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            What We Build
          </h2>
          <p className="text-text-secondary text-lg">
            From concept to launch, we cover the full spectrum.
          </p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoriesWithCounts.map((cat, index) => (
          <SectionReveal key={cat.category} delay={index * 0.05}>
            <div className="bg-bg-card border border-border-default rounded-xl p-6 transition-all duration-300 hover:border-border-hover hover:-translate-y-1 group">
              <CategoryIcon index={index} />
              <h3 className="font-display text-lg font-semibold text-text-primary mb-1 group-hover:text-accent-cyan transition-colors">
                {cat.category}
              </h3>
              <p className="text-text-muted text-sm">
                {cat.count} project{cat.count !== 1 && "s"}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
