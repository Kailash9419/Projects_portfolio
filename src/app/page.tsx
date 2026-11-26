import { HomeParticles } from "@/components/home/home-particles";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Manifesto } from "@/components/home/manifesto";
import { WorkList } from "@/components/home/work-list";
import { Numbers } from "@/components/home/numbers";
import { Process } from "@/components/home/process";
import { Contact } from "@/components/home/contact";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <HomeParticles />
      <Hero />
      <Services />
      <Manifesto />
      <WorkList projects={featured.length ? featured : projects} />
      <Numbers />
      <Process />
      <Contact />
    </>
  );
}
