import React from "react";
import { getFeaturedProjects } from "@/lib/projects";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingThumbnail from "@/components/hero/FloatingThumbnail";

export default async function Hero() {
  const featuredProjects = getFeaturedProjects();
  const topProjects = featuredProjects.slice(0, 4);

  // Pre-defined positions for up to 4 floating thumbnails
  const positions = [
    { top: "15%", left: "10%", animationDelay: "0s" },
    { top: "20%", right: "15%", animationDelay: "1s" },
    { bottom: "25%", left: "15%", animationDelay: "2s" },
    { bottom: "20%", right: "10%", animationDelay: "1.5s" },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary pt-20 px-6">
      
      {/* Floating Thumbnails */}
      {topProjects.map((project, index) => (
        <FloatingThumbnail
          key={project.id}
          project={project}
          style={{
            ...positions[index],
            animationDelay: positions[index]?.animationDelay
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="font-display">
          <div className="text-text-secondary text-lg uppercase tracking-[0.3em] font-medium mb-4">
            WE BUILD
          </div>
          <div className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-2">
            <GradientText 
              from="from-[#8B5CF6]" 
              to="to-[#22D3EE]"
            >
              DIGITAL
            </GradientText>
          </div>
          <div className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none text-text-primary mb-8">
            PRODUCTS
          </div>
        </div>

        <p className="text-text-secondary max-w-xl text-lg mb-10 font-body">
          We design and build premium digital products that solve real problems.
        </p>

        <MagneticButton
          href="/work"
          className="bg-text-primary text-bg-primary font-medium px-8 py-4 rounded-full hover:bg-text-secondary transition-colors"
        >
          View Our Work →
        </MagneticButton>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-bounce opacity-70">
        <span className="text-text-muted text-xs uppercase tracking-widest mb-2 font-display">Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
