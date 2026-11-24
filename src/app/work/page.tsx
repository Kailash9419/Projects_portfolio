import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import WorkBrowser from "@/components/projects/WorkBrowser";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = {
  title: `All Projects | ${BRAND.name}`,
  description: `SaaS platforms, websites and automation tools built by ${BRAND.fullName}.`,
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  return <WorkBrowser projects={await getAllProjects()} />;
}
