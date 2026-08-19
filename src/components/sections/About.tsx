"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
      <SectionReveal>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex-1 max-w-lg">
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-text-primary">
              We are a digital product studio.
            </h2>
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-text-secondary text-lg leading-relaxed">
              We combine design thinking with technical expertise to build products that matter. Every project starts with understanding the problem and ends with a solution that exceeds expectations.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our team brings together experience in product design, software engineering, and artificial intelligence to deliver digital experiences that feel premium and perform flawlessly.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
