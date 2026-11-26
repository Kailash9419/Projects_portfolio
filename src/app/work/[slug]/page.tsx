import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";
import { CaseStudy } from "@/components/work/case-study";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found | DevLabs",
    };
  }

  const image = project.coverImage?.endsWith(".svg") ? undefined : project.coverImage;
  return {
    title: `${project.title} — ${project.tagline} | DevLabs`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | DevLabs`,
      description: project.tagline,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = await getAdjacentProjects(slug);
  return <CaseStudy project={project} prev={prev} next={next} />;
}
