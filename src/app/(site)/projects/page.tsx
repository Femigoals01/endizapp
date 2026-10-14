
import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import ProjectsPortfolio from "@/components/projects/ProjectsPortfolio";
import type { PublicProject } from "@/types/public-project";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Projects | Endiz Design & Con. Ltd.",
  description:
    "Explore architectural projects by Endiz Design & Con. Ltd., including residential, commercial, and other developments.",
};

export default async function ProjectsPage() {
  const records = await prisma.project.findMany({
    where: {
      published: true,
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
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });

  const projects: PublicProject[] = records.map((project) => ({
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
  }));

  return <ProjectsPortfolio projects={projects} />;
}
