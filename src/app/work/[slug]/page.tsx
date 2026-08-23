import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";
import TechBadge from "@/components/projects/TechBadge";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { CONTACT } from "@/data/brand";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found | DevLabs",
    };
  }

  return {
    title: `${project.title} — ${project.tagline} | DevLabs`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(params.slug);
  const accentColor = project.accentColor || "#A3E635";
  const allMedia = [
    project.coverImage,
    ...(project.screenshots || []),
  ].filter(Boolean) as string[];

  const whatsappInquiryUrl = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(
    `Hi DevLabs! I saw the ${project.title} project and want to build something similar for my business.`
  )}`;

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Top Header Bar: Breadcrumb + Prev/Next controls */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-border-default/70">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted hover:text-accent-lime transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to All Projects</span>
        </Link>

        {/* Quick Prev / Next Switcher */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="px-3 py-1 rounded-lg bg-bg-card border border-border-default hover:border-accent-lime text-text-muted hover:text-text-primary transition-all"
              title={prev.title}
            >
              ← Prev
            </Link>
          ) : (
            <span className="px-3 py-1 rounded-lg bg-bg-primary border border-border-default/40 text-text-muted/40 cursor-not-allowed">
              ← Prev
            </span>
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="px-3 py-1 rounded-lg bg-bg-card border border-border-default hover:border-accent-lime text-text-muted hover:text-text-primary transition-all"
              title={next.title}
            >
              Next →
            </Link>
          ) : (
            <span className="px-3 py-1 rounded-lg bg-bg-primary border border-border-default/40 text-text-muted/40 cursor-not-allowed">
              Next →
            </span>
          )}
        </div>
      </div>

      {/* Main Low-Scroll Split Grid (Above the fold compact design) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Project Details, Metrics, Highlights & CTAs */}
        <div className="lg:col-span-6 space-y-6">
          <SectionReveal>
            {/* Category & Year Badges */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-xs font-mono font-bold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-text-muted">
                Shipped {project.year}
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-2">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-accent-cyan font-medium mb-4">
              {project.tagline}
            </p>

            {/* Overview Description */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </SectionReveal>

          {/* Results / ROI Metrics Bar (If defined) */}
          {project.results && project.results.length > 0 && (
            <SectionReveal delay={0.05}>
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-bg-card border border-border-default">
                {project.results.map((res, i) => (
                  <div key={i} className="text-center p-1">
                    <span
                      className="text-xl sm:text-2xl font-black font-display block"
                      style={{ color: accentColor }}
                    >
                      {res.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-text-muted font-medium block mt-0.5 leading-tight">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          )}

          {/* Problem & Solution (Compact 2-Box Grid) */}
          {(project.problem || project.solution) && (
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.problem && (
                  <div className="p-4 rounded-xl bg-bg-secondary border border-border-default">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent-pink font-bold block mb-1.5">
                      ⚠️ The Challenge
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-4">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="p-4 rounded-xl bg-bg-secondary border border-border-default">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider font-bold block mb-1.5"
                      style={{ color: accentColor }}
                    >
                      ⚡ DevLabs Solution
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-4">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            </SectionReveal>
          )}

          {/* Key Deliverables / Features Chips */}
          {project.features && project.features.length > 0 && (
            <SectionReveal delay={0.15}>
              <div className="p-4 rounded-xl bg-bg-card/70 border border-border-default space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                  Key Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-text-primary">
                      <span className="text-accent-lime font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Tech Stack Pills */}
          <SectionReveal delay={0.2}>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                Technologies & Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} accentColor={accentColor} />
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Action CTAs: Live Demo + Direct WhatsApp */}
          <SectionReveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.liveUrl && (
                <MagneticButton
                  href={project.liveUrl}
                  className="bg-accent-lime text-bg-primary font-bold px-6 py-3 rounded-full hover:bg-accent-lime/90 transition-all text-xs sm:text-sm shadow-md"
                >
                  <span>Launch Live Site ↗</span>
                </MagneticButton>
              )}

              <MagneticButton
                href={whatsappInquiryUrl}
                className="px-5 py-3 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
              >
                <span>💬</span>
                <span>Discuss Similar Build</span>
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>

        {/* RIGHT COLUMN: Cover Media & Gallery (Compact Viewport Fit) */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
          <SectionReveal direction="left">
            {/* Main Cover Mockup Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-border-default bg-bg-card shadow-2xl group">
              {/* Browser Header Bar simulation */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-bg-secondary/90 border-b border-border-default">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono text-text-muted truncate max-w-[200px]">
                  {project.liveUrl ? project.liveUrl.replace("https://", "") : `${project.slug}.devlabs.studio`}
                </span>
                <span className="text-[10px] font-mono text-accent-lime">Live</span>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] w-full bg-bg-primary overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    project.coverImage ||
                    `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='${encodeURIComponent(
                      accentColor
                    )}'/></svg>`
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Screenshots Strip (If more media exists) */}
            {allMedia.length > 1 && (
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-text-muted block mb-2">
                  Gallery & Screens ({allMedia.length})
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {allMedia.slice(1, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border-default bg-bg-card hover:border-accent-lime transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Screen ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
