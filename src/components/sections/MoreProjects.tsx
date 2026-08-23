"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function MoreProjects() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32 text-center relative">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl -z-10 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <SectionReveal>
        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold mb-4 text-text-primary"
          whileInView={{ letterSpacing: ["0em", "0.05em", "0em"] }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          THERE&apos;S MORE.
        </motion.h2>
        <p className="text-text-secondary text-xl mb-12">
          Explore everything we&apos;ve built.
        </p>

        <div className="flex justify-center">
          <MagneticButton
            href="/work"
            className="inline-flex items-center justify-center px-8 py-4 bg-bg-card border border-border-default rounded-full text-text-primary hover:border-accent-lime/50 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)] transition-all duration-500 font-semibold"
          >
            Explore All Projects &rarr;
          </MagneticButton>
        </div>
      </SectionReveal>
    </section>
  );
}
