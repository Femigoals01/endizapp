
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import ProjectsManager from "@/components/admin/projects/ProjectsManager";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await requireAdmin();

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      _count: { select: { images: true, stages: true } },
    },
  });

  return (
    <ProjectsManager
      projects={projects.map((project) => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        city: project.city,
        state: project.state,
        status: project.status,
        published: project.published,
        featured: project.featured,
        coverImageUrl: project.coverImageUrl,
        categoryName: project.category.name,
        imagesCount: project._count.images,
        stagesCount: project._count.stages,
        createdAt: project.createdAt.toISOString(),
      }))}
    />
  );
}
