
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/projects/ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();

  const categories = await prisma.projectCategory.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return <ProjectForm categories={categories} />;
}
