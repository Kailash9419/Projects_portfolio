"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="max-w-4xl mx-auto px-5 sm:px-6 py-16 md:py-20 text-center border-t border-border-default/60 scroll-mt-20 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[280px] rounded-full bg-accent-lime/[0.04] blur-3xl" />
      </div>

      <SectionReveal>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-text-primary leading-[1.2] py-0.5">
          {t.contact.title}
        </h2>
        <div className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.2] py-0.5">
          <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
            {t.contact.titleAccent}
          </GradientText>
        </div>
        
        <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6">
          {t.contact.subtitle}
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-card border border-border-default/80 text-xs font-mono text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
          <span>24h Response Time · Direct Developer Consultation</span>
        </div>
      </SectionReveal>
    </section>
  );
}
