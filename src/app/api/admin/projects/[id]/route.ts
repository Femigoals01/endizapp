
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { validateProject } from "@/lib/validations/project";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: Context
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      category: true,
      stages: {
        orderBy: { position: "asc" },
        include: {
          images: {
            orderBy: { position: "asc" },
          },
        },
      },
      images: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!project) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ project });
}

export async function PATCH(
  request: Request,
  context: Context
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const validation = validateProject(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error },
        { status: 400 }
      );
    }

    const [existing, category] = await Promise.all([
      prisma.project.findUnique({
        where: { id },
        select: { id: true },
      }),
      prisma.projectCategory.findUnique({
        where: { id: validation.data.categoryId },
        select: { id: true },
      }),
    ]);

    if (!existing) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { message: "Selected category does not exist." },
        { status: 400 }
      );
    }

    // Preserve the existing slug when editing a project.
    // This avoids breaking public links when a title changes.
    const { slug: _generatedSlug, ...updateData } = validation.data;

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Unable to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: Context
) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  // Only full administrators can permanently delete projects.
  if (admin.role !== "ADMIN") {
    return NextResponse.json(
      { message: "You do not have permission to delete projects." },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Unable to delete project." },
      { status: 500 }
    );
  }
}
