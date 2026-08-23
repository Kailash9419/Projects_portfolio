"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyDevLabs() {
  const { t, isHindi } = useLanguage();

  const PILLARS = [
    {
      num: "01",
      title: t.whyUs.pillar1Title,
      desc: t.whyUs.pillar1Desc,
    },
    {
      num: "02",
      title: t.whyUs.pillar2Title,
      desc: t.whyUs.pillar2Desc,
    },
    {
      num: "03",
      title: t.whyUs.pillar3Title,
      desc: t.whyUs.pillar3Desc,
    },
  ];

  return (
    <section id="why-us" className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-16 scroll-mt-20">
      <SectionReveal>
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            {t.whyUs.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-[1.2] py-0.5">
            {t.whyUs.title}{" "}
            <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
              {t.whyUs.titleAccent}
            </GradientText>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
            {t.whyUs.subtitle}
          </p>
        </div>
      </SectionReveal>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {PILLARS.map((pillar, index) => (
          <SectionReveal key={pillar.num} delay={index * 0.08}>
            <motion.div
              whileHover={{ y: -4, borderColor: "rgba(163, 230, 53, 0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 sm:p-7 rounded-2xl bg-bg-card border border-border-default relative overflow-hidden flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-accent-lime px-2.5 py-1 rounded-md bg-accent-lime/10 border border-accent-lime/20">
                    {pillar.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime/40 group-hover:bg-accent-lime transition-colors" />
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary mb-2.5 group-hover:text-accent-lime transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border-default/60 flex items-center gap-2 text-xs text-text-muted">
                <span className="text-accent-lime">✦</span>
                <span>{isHindi ? "स्टूडियो गारंटी" : "Studio Guarantee"}</span>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>

      {/* Numbers Banner */}
      <SectionReveal delay={0.2}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-6 rounded-2xl bg-bg-card/70 border border-border-default backdrop-blur-sm">
          <div className="text-center p-3 lg:border-r border-border-default/60">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-text-primary block mb-0.5">
              10+
            </span>
            <span className="text-xs text-text-muted font-medium">
              {t.hero.stats.products}
            </span>
          </div>

          <div className="text-center p-3 lg:border-r border-border-default/60">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-accent-lime block mb-0.5">
              4
            </span>
            <span className="text-xs text-text-muted font-medium">
              {t.hero.stats.live}
            </span>
          </div>

          <div className="text-center p-3 lg:border-r border-border-default/60">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-accent-cyan block mb-0.5">
              100%
            </span>
            <span className="text-xs text-text-muted font-medium">
              {t.hero.stats.focus}
            </span>
          </div>

          <div className="text-center p-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-accent-violet block mb-0.5">
              24h
            </span>
            <span className="text-xs text-text-muted font-medium">
              {t.hero.stats.response}
            </span>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
