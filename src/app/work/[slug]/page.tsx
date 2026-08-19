import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero";
import ScreenshotGallery from "@/components/projects/ScreenshotGallery";
import TechBadge from "@/components/projects/TechBadge";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";

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
      title: "Project Not Found | Studio",
    };
  }

  return {
    title: `${project.title} — ${project.tagline} | Studio`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(params.slug);
  const accentColor = project.accentColor || "#8B5CF6";

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Project Hero (Title, Category, Year, Cover, Links) */}
      <ProjectDetailHero project={project} />

      {/* Main Content Details */}
      <div className="max-w-6xl mx-auto px-6 mt-16 md:mt-24 space-y-20 md:space-y-28">
        
        {/* Overview & Core Technologies */}
        <SectionReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-text-muted">
                Overview & Context
              </h2>
              <p className="text-2xl font-bold font-display mt-2 text-text-primary">
                About the Product
              </p>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                {project.description}
              </p>

              {/* Technologies Pill Showcase */}
              <div className="pt-4 border-t border-border-default">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-3">
                  Technologies & Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} accentColor={accentColor} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Problem & Solution (Rendered if either exists) */}
        {(project.problem || project.solution) && (
          <SectionReveal direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.problem && (
                <div className="p-8 rounded-2xl bg-bg-card border border-border-default relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: "#F472B6" }}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-pink block mb-3">
                    01 // The Problem
                  </span>
                  <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                    The Challenge
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-8 rounded-2xl bg-bg-card border border-border-default relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span
                    className="text-xs font-mono uppercase tracking-wider block mb-3"
                    style={{ color: accentColor }}
                  >
                    02 // The Solution
                  </span>
                  <h3 className="text-xl font-bold font-display text-text-primary mb-4">
                    Our Engineering Approach
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </SectionReveal>
        )}

        {/* Key Features (Rendered only if features array exists) */}
        {project.features && project.features.length > 0 && (
          <SectionReveal direction="up">
            <div className="p-8 md:p-12 rounded-2xl bg-bg-secondary border border-border-default">
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted block mb-2">
                Capabilities
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-8">
                Key Features & Engineering Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-bg-card/70 border border-border-default/80 flex items-start gap-4"
                  >
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: accentColor }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm md:text-base text-text-primary font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* Measurable Results / Metrics (Gracefully hidden if not defined) */}
        {project.results && project.results.length > 0 && (
          <SectionReveal direction="up">
            <div className="space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-text-muted">
                Impact & Performance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-6 md:p-8 rounded-2xl bg-bg-card border border-border-default flex flex-col justify-center text-center items-center group hover:border-border-hover transition-colors"
                  >
                    <span
                      className="text-4xl md:text-5xl font-black font-display tracking-tight mb-2"
                      style={{ color: accentColor }}
                    >
                      {res.value}
                    </span>
                    <span className="text-sm text-text-secondary font-medium uppercase tracking-wider">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* Interactive Screenshot Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <ScreenshotGallery
            screenshots={project.screenshots}
            accentColor={accentColor}
          />
        )}

        {/* Project External Links / Action CTA */}
        {(project.liveUrl || project.githubUrl) && (
          <SectionReveal direction="up">
            <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-bg-card to-bg-secondary border border-border-default flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold font-display text-text-primary">
                  Interested in experiencing {project.title}?
                </h3>
                <p className="text-text-secondary mt-1">
                  Explore the live production deployment or inspect the repository.
                </p>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {project.liveUrl && (
                  <MagneticButton
                    href={project.liveUrl}
                    className="bg-accent-violet hover:bg-accent-violet/90 text-white"
                  >
                    Launch Live App →
                  </MagneticButton>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-border-default bg-bg-card hover:bg-bg-card-hover text-text-primary text-sm font-medium transition-colors"
                  >
                    View Source Code
                  </Link>
                )}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* Prev / Next Project Navigation */}
        <ProjectNavigation prev={prev} next={next} />
      </div>
    </div>
  );
}
