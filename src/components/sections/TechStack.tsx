"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const CATEGORIES = [
  {
    label: "Frontend",
    color: "#A3E635",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    color: "#22D3EE",
    techs: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Payments & APIs",
    color: "#8B5CF6",
    techs: ["Razorpay", "Stripe", "REST APIs", "Google Maps"],
  },
  {
    label: "Infrastructure",
    color: "#FB923C",
    techs: ["Vercel", "AWS", "Docker", "GitHub Actions"],
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
            <motion.div
              whileHover={{ y: -6, borderColor: `${cat.color}40` }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-bg-card/50 rounded-xl p-6 border border-border-default h-full hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              {/* Hover glow overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cat.color}10, transparent 70%)`
                }}
              />
              <h3
                className="text-sm font-mono uppercase tracking-wider mb-6 relative z-10"
                style={{ color: cat.color }}
              >
                {cat.label}
              </h3>
              <ul className="space-y-3 relative z-10">
                {cat.techs.map((tech, i) => (
                  <motion.li
                    key={tech}
                    className="text-text-primary font-body flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                      whileHover={{ scale: 2 }}
                    />
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
