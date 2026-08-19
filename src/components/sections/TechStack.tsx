"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";

const CATEGORIES = [
  {
    label: "Frontend",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "Python", "Go", "PostgreSQL"],
  },
  {
    label: "AI & Data",
    techs: ["TensorFlow", "OpenAI", "LangChain", "Redis"],
  },
  {
    label: "Infrastructure",
    techs: ["Docker", "AWS", "Vercel", "GitHub Actions"],
  },
];

export default function TechStack() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <SectionReveal>
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan block mb-2">
            Tooling
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            Our Stack
          </h2>
          <p className="text-text-secondary text-lg">
            The technologies we trust to build world-class products.
          </p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, index) => (
          <SectionReveal key={cat.label} delay={index * 0.1}>
            <div className="bg-bg-card/50 rounded-xl p-6 border border-border-default h-full hover:border-border-hover transition-colors">
              <h3 className="text-accent-cyan text-sm font-mono uppercase tracking-wider mb-6">
                {cat.label}
              </h3>
              <ul className="space-y-3">
                {cat.techs.map((tech) => (
                  <li key={tech} className="text-text-primary font-body flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
