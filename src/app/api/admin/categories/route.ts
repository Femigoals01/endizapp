
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { validateProjectCategory } from "@/lib/validations/project-category";

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
    const categories = await prisma.projectCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    return NextResponse.json(
      { message: "Unable to load categories." },
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
    const result = validateProjectCategory(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: 400 }
      );
    }

    const existing = await prisma.projectCategory.findFirst({
      where: {
        OR: [
          { slug: result.data.slug },
          { name: { equals: result.data.name, mode: "insensitive" } },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "This category already exists." },
        { status: 409 }
      );
    }

    const category = await prisma.projectCategory.create({
      data: result.data,
    });

    return NextResponse.json(
      {
        message: "Category created successfully.",
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    return NextResponse.json(
      { message: "Unable to create category." },
      { status: 500 }
    );
  }
}
