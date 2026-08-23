"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import { useLanguage } from "@/context/LanguageContext";

export default function OurProcess() {
  const { t, isHindi } = useLanguage();

  const STEPS = [
    {
      num: "01",
      step: isHindi ? "स्टेप 01" : "STEP 01",
      title: t.process.step1Title,
      desc: t.process.step1Desc,
    },
    {
      num: "02",
      step: isHindi ? "स्टेप 02" : "STEP 02",
      title: t.process.step2Title,
      desc: t.process.step2Desc,
    },
    {
      num: "03",
      step: isHindi ? "स्टेप 03" : "STEP 03",
      title: t.process.step3Title,
      desc: t.process.step3Desc,
    },
    {
      num: "04",
      step: isHindi ? "स्टेप 04" : "STEP 04",
      title: t.process.step4Title,
      desc: t.process.step4Desc,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-16">
      <SectionReveal>
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            {t.process.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-text-primary leading-[1.2] py-0.5">
            {t.process.title}{" "}
            <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
              {t.process.titleAccent}
            </GradientText>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl">
            {t.process.subtitle}
          </p>
        </div>
      </SectionReveal>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {STEPS.map((step, index) => (
          <SectionReveal key={step.num} delay={index * 0.08} className="relative">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-5 sm:p-6 rounded-2xl bg-bg-card border border-border-default h-full flex flex-col justify-between hover:border-accent-lime/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-mono text-accent-lime font-bold">
                    {step.step}
                  </span>
                  <span className="text-xl font-black font-display text-text-muted/30">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold mb-1.5 text-text-primary">
                  {step.title}
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border-default/50 flex items-center gap-2 text-[11px] text-text-muted font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <span>{isHindi ? "पारदर्शी प्रोसेस" : "Verified Workflow"}</span>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
