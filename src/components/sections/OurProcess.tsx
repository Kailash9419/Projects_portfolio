"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";

const STEPS = [
  {
    num: "01",
    title: "IDEA",
    desc: "Understanding the problem space and defining the vision.",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Crafting interfaces that are intuitive and memorable.",
  },
  {
    num: "03",
    title: "MVP",
    desc: "Building the core product with precision and speed.",
  },
  {
    num: "04",
    title: "ITERATION",
    desc: "Refining based on real feedback and data.",
  },
  {
    num: "05",
    title: "LAUNCH",
    desc: "Deploying to production and watching it fly.",
  },
];

export default function OurProcess() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <SectionReveal>
        <span className="text-xs font-mono uppercase tracking-widest text-accent-violet block mb-2">
          Methodology
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-text-primary">
          Our Process
        </h2>
      </SectionReveal>

      <div className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
        {/* Connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border-default md:left-0 md:right-0 md:top-6 md:bottom-auto md:h-px md:w-full" />

        {STEPS.map((step, index) => (
          <SectionReveal key={step.num} delay={index * 0.1} className="relative z-10 pl-16 md:pl-0 md:pt-16 flex-1">
            <div className="absolute left-0 top-0 md:top-0 md:left-0 w-12 h-12 bg-bg-primary flex items-center justify-center">
              <span className="text-accent-violet font-mono text-sm border border-border-default rounded-full w-10 h-10 flex items-center justify-center bg-bg-card">
                {step.num}
              </span>
            </div>
            
            <div>
              <h3 className="font-display text-xl font-bold mb-2 text-text-primary">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm md:text-base">
                {step.desc}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
