
import HeroSection from "@/components/sections/HeroSections";
import AboutSection from "@/components/sections/AboutSections";
import ProjectsSection from "@/components/sections/ProjectsSections";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSections";
import FounderSection from "@/components/sections/FounderSection";

import { prisma } from "@/lib/prisma";
import type { PublicProject } from "@/types/public-project";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projectsFromDatabase = await prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      city: true,
      state: true,
      country: true,
      status: true,
      coverImageUrl: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  const projects: PublicProject[] = projectsFromDatabase.map(
    (project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category.name,
      location: [
        project.city,
        project.state,
        project.country,
      ]
        .filter(Boolean)
        .join(", "),
      imageUrl: project.coverImageUrl,
      status: project.status,
    })
  );

  return (
    <main className="flex flex-col gap-15">
      <HeroSection />
      <AboutSection />

      <ProjectsSection projects={projects} />

      <ServicesSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
