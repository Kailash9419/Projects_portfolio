import Hero from "@/components/hero/Hero";

export const dynamic = "force-dynamic";
import BusinessSolutionFinder from "@/components/sections/BusinessSolutionFinder";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import FeaturedWork from "@/components/projects/FeaturedWork";
import PlatformComparison from "@/components/sections/PlatformComparison";
import OurProcess from "@/components/sections/OurProcess";
import WhyDevLabs from "@/components/sections/WhyDevLabs";
import PricingDiscussion from "@/components/sections/PricingDiscussion";
import ShopkeeperFAQ from "@/components/sections/ShopkeeperFAQ";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessSolutionFinder />
      <WhatWeBuild />
      <FeaturedWork />
      <PlatformComparison />
      <OurProcess />
      <WhyDevLabs />
      <PricingDiscussion />
      <ShopkeeperFAQ />
      <About />
      <Contact />
    </>
  );
}
