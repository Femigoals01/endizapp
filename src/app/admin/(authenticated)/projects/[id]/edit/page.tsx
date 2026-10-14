
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/projects/ProjectForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({
  params,
}: PageProps) {
  await requireAdmin();

  const { id } = await params;

  const [project, categories] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
    }),
    prisma.projectCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <ProjectForm
      projectId={project.id}
      categories={categories}
      initialData={{
        title: project.title,
        categoryId: project.categoryId,
        summary: project.summary ?? "",
        description: project.description ?? "",
        architectNote: project.architectNote ?? "",
        city: project.city,
        state: project.state,
        country: project.country,
        status: project.status,
        progress: project.progress ?? 0,
        featured: project.featured,
        published: project.published,
      }}
    />
  );
}
