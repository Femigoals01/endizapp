
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import CategoryManager from "@/components/admin/categories/CategoryManager";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  await requireAdmin();

  const categories = await prisma.projectCategory.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });

  return (
    <CategoryManager
      initialCategories={categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        projectCount: category._count.projects,
      }))}
    />
  );
}
