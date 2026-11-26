import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { WorkBrowser } from "@/components/work/work-browser";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = {
  title: `All Projects | ${BRAND.name}`,
  description: `Stores, booking platforms, SaaS and websites built by ${BRAND.fullName}.`,
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  return <WorkBrowser projects={await getAllProjects()} />;
}
