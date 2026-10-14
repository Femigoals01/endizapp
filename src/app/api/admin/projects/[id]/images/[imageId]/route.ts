
import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

type Context = {
  params: Promise<{
    id: string;
    imageId: string;
  }>;
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
    const { id, imageId } = await context.params;
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const image = await prisma.projectImage.findFirst({
      where: {
        id: imageId,
        projectId: id,
      },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Image not found." },
        { status: 404 }
      );
    }

    const updateData: Prisma.ProjectImageUpdateInput = {};

    if ("caption" in data) {
      if (
        data.caption !== null &&
        typeof data.caption !== "string"
      ) {
        return NextResponse.json(
          { message: "Invalid caption." },
          { status: 400 }
        );
      }

      const caption =
        typeof data.caption === "string"
          ? data.caption.trim()
          : "";

      if (caption.length > 500) {
        return NextResponse.json(
          { message: "Caption cannot exceed 500 characters." },
          { status: 400 }
        );
      }

      updateData.caption = caption || null;
    }

    if ("stageId" in data) {
      if (
        data.stageId !== null &&
        typeof data.stageId !== "string"
      ) {
        return NextResponse.json(
          { message: "Invalid construction stage." },
          { status: 400 }
        );
      }

      const stageId =
        typeof data.stageId === "string"
          ? data.stageId.trim()
          : "";

      if (stageId) {
        const stage = await prisma.projectStage.findFirst({
          where: {
            id: stageId,
            projectId: id,
          },
          select: { id: true },
        });

        if (!stage) {
          return NextResponse.json(
            { message: "Construction stage not found." },
            { status: 400 }
          );
        }

        updateData.stage = {
          connect: { id: stageId },
        };
      } else {
        updateData.stage = {
          disconnect: true,
        };
      }
    }

    const updatedImage = await prisma.projectImage.update({
      where: { id: imageId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Image updated successfully.",
      image: updatedImage,
    });
  } catch (error) {
    console.error("UPDATE PROJECT IMAGE ERROR:", error);

    return NextResponse.json(
      { message: "Unable to update image." },
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

  if (admin.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Only administrators can delete images." },
      { status: 403 }
    );
  }

  try {
    const { id, imageId } = await context.params;

    const image = await prisma.projectImage.findFirst({
      where: {
        id: imageId,
        projectId: id,
      },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Image not found." },
        { status: 404 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        coverImageId: true,
      },
    });

    // Delete the Cloudinary asset first. If deletion fails,
    // keep the database record so the admin can retry.
    if (image.publicId) {
  const result = await cloudinary.uploader.destroy(
    image.publicId,
    {
      resource_type: "image",
      invalidate: true,
    }
  );

  if (
    result.result !== "ok" &&
    result.result !== "not found"
  ) {
    return NextResponse.json(
      {
        message: "Cloudinary could not delete this image.",
      },
      { status: 502 }
    );
  }
}

    await prisma.$transaction(async (tx) => {
      if (project?.coverImageId === image.publicId) {
        await tx.project.update({
          where: { id },
          data: {
            coverImageId: null,
            coverImageUrl: null,
          },
        });
      }

      await tx.projectImage.delete({
        where: { id: imageId },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PROJECT IMAGE ERROR:", error);

    return NextResponse.json(
      { message: "Unable to delete image." },
      { status: 500 }
    );
  }
}
