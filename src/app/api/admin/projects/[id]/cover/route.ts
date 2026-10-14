
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ id: string }>;
};

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
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    if (typeof data.imageId !== "string" || !data.imageId) {
      return NextResponse.json(
        { message: "Please select an image." },
        { status: 400 }
      );
    }

    const image = await prisma.projectImage.findFirst({
      where: {
        id: data.imageId,
        projectId: id,
      },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Selected image does not belong to this project." },
        { status: 404 }
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        coverImageUrl: image.imageUrl,
        coverImageId: image.publicId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project cover image updated successfully.",
      coverImageUrl: project.coverImageUrl,
      coverImageId: project.coverImageId,
    });
  } catch (error) {
    console.error("SET PROJECT COVER ERROR:", error);

    return NextResponse.json(
      { message: "Unable to update project cover." },
      { status: 500 }
    );
  }
}
