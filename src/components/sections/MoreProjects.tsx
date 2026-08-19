"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function MoreProjects() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32 text-center relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-accent-violet/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <SectionReveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-text-primary">
          THERE&apos;S MORE.
        </h2>
        <p className="text-text-secondary text-xl mb-12">
          Explore everything we&apos;ve built.
        </p>

        <div className="flex justify-center">
          <MagneticButton
            href="/work"
            className="inline-flex items-center justify-center px-8 py-4 bg-bg-card border border-border-default rounded-full text-text-primary hover:border-border-hover transition-colors font-semibold"
          >
            Explore All Projects &rarr;
          </MagneticButton>
        </div>
      </SectionReveal>
    </section>
  );
}
