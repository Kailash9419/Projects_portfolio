"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import { BRAND, LOCATION } from "@/data/brand";

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-16 scroll-mt-20 border-t border-border-default/60">
      <SectionReveal>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="flex-1 max-w-lg">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-lime block mb-3">
              About Us
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-text-primary">
              We are <span className="text-accent-lime">{BRAND.name}</span> — a software studio for small businesses.
            </h2>
            <p className="text-xs font-mono text-text-muted mt-3">
              Founded {BRAND.foundedYear} · {LOCATION.workingScope}
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Based in <strong className="text-text-primary">{LOCATION.city}, {LOCATION.state}</strong>, we build SaaS platforms, modern websites, and automation tools that small business owners can manage themselves — owner-managed from simple admin panels, so running them never requires a developer.
            </p>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Our approach is simple: understand your business bottlenecks, design something intuitive for your customers, and ship fast with weekly demos. Every product we deliver is built to last and engineered for growth.
            </p>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Whether you&apos;re a local business in {LOCATION.city} or operating anywhere across India and worldwide — we bring the same engineering rigor and dedication to every build.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
