"use client";

import React, { useState } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";
import QuickInquiryModal from "@/components/ui/QuickInquiryModal";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/data/brand";

export default function PricingDiscussion() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PILLARS = [
    {
      icon: "🤝",
      title: t.pricing.pillar1Title,
      desc: t.pricing.pillar1Desc,
    },
    {
      icon: "🎯",
      title: t.pricing.pillar2Title,
      desc: t.pricing.pillar2Desc,
    },
    {
      icon: "🛡️",
      title: t.pricing.pillar3Title,
      desc: t.pricing.pillar3Desc,
    },
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-16 scroll-mt-20">
      <SectionReveal>
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-b from-bg-card/95 via-bg-card/70 to-bg-secondary/90 border border-border-default overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent-lime/[0.05] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-cyan/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-primary/80 text-xs font-mono text-accent-lime mb-4 backdrop-blur-sm">
              <span>{t.pricing.badge}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-[1.25] py-0.5">
              {t.pricing.title}{" "}
              <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
                {t.pricing.titleAccent}
              </GradientText>
            </h2>

            <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-bg-primary/70 border border-border-default/80 hover:border-accent-lime/40 transition-colors"
                >
                  <span className="text-xl mb-2.5 block">{pillar.icon}</span>
                  <h3 className="font-display text-sm font-bold text-text-primary mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Discussion CTA */}
            <div className="flex justify-center">
              <MagneticButton
                href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent("Hi DevLabs! I would like to discuss my project and get a price quote.")}`}
                className="w-full sm:w-auto bg-accent-lime text-bg-primary font-bold px-7 py-3.5 rounded-full hover:bg-accent-lime/90 transition-all text-xs sm:text-sm shadow-xl shadow-accent-lime/25 flex items-center justify-center gap-2"
              >
                <span>{t.pricing.ctaWhatsApp}</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Global Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
