import Hero from "@/components/hero/Hero";
import FeaturedWork from "@/components/projects/FeaturedWork";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import OurProcess from "@/components/sections/OurProcess";
import TechStack from "@/components/sections/TechStack";
import MoreProjects from "@/components/sections/MoreProjects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <WhatWeBuild />
      <MoreProjects />
      <OurProcess />
      <TechStack />
      <About />
      <Contact />
    </>
  );
}
