"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import UnderlineLink from "@/components/ui/UnderlineLink";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-32 text-center border-t border-border-default scroll-mt-24">
      <SectionReveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-2 text-text-primary">
          Let&apos;s Build Something
        </h2>
        <div className="font-display text-4xl md:text-6xl font-bold mb-6">
          <GradientText from="from-violet-500" to="to-cyan-400">
            Together.
          </GradientText>
        </div>
        
        <p className="text-text-secondary text-xl mb-12">
          Have a project in mind? Let&apos;s talk about it.
        </p>

        <div className="mb-16">
          <UnderlineLink href="mailto:hello@studio.com" external className="text-2xl font-bold">
            hello@studio.com
          </UnderlineLink>
        </div>

        <div className="flex justify-center gap-6">
          <a href="#" className="p-3 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded-full transition-colors border border-transparent hover:border-border-default" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href="#" className="p-3 text-text-secondary hover:text-accent-cyan hover:bg-bg-card rounded-full transition-colors border border-transparent hover:border-border-default" aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="#" className="p-3 text-text-secondary hover:text-accent-violet hover:bg-bg-card rounded-full transition-colors border border-transparent hover:border-border-default" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </SectionReveal>
    </section>
  );
}
