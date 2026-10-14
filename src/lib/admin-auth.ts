
import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });

  if (!admin?.active) {
    return null;
  }

  return admin;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
