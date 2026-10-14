
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { validateProject } from "@/lib/validations/project";

export const runtime = "nodejs";

export async function GET() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true },
        },
        _count: {
          select: {
            stages: true,
            images: true,
          },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return NextResponse.json(
      { message: "Unable to load projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const validation = validateProject(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error },
        { status: 400 }
      );
    }

    const category = await prisma.projectCategory.findUnique({
      where: {
        id: validation.data.categoryId,
      },
      select: {
        id: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Selected project category does not exist." },
        { status: 400 }
      );
    }

    const baseSlug = validation.data.slug;

    if (!baseSlug) {
      return NextResponse.json(
        { message: "Please provide a valid project title." },
        { status: 400 }
      );
    }

    let slug = baseSlug;
    let suffix = 2;

    while (
      await prisma.project.findUnique({
        where: { slug },
        select: { id: true },
      })
    ) {
      slug = `${baseSlug}-${suffix}`;
      suffix++;
    }

    const project = await prisma.project.create({
      data: {
        ...validation.data,
        slug,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message:
            "A project with this identifier already exists. Please try again.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Unable to create project." },
      { status: 500 }
    );
  }
}
