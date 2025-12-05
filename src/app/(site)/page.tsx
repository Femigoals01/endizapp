

import HeroSection from "@/components/sections/HeroSections";
import AboutSection from "@/components/sections/AboutSections";
import ProjectsSection from "@/components/sections/ProjectsSections";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSections";
import FounderSection from "@/components/sections/FounderSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-15">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
        <FounderSection />
      <ContactSection />
    </main>
  );
}
