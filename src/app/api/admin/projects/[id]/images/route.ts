

import { NextResponse } from "next/server";
import { Readable } from "node:stream";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ id: string }>;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isSupportedImage(buffer: Buffer) {
  const jpeg =
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff;

  const png =
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    );

  const webp =
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP";

  return jpeg || png || webp;
}

async function uploadImage(
  buffer: Buffer,
  folder: string
): Promise<{ imageUrl: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    Readable.from(buffer).pipe(stream);
  });
}

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
    select: { id: true },
  });

  if (!project) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 }
    );
  }

  const images = await prisma.projectImage.findMany({
    where: { projectId: id },
    orderBy: [
      { position: "asc" },
      { createdAt: "asc" },
    ],
  });

  return NextResponse.json({ images });
}

export async function POST(
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

  const { id } = await context.params;

  try {
    const contentLength = Number(
      request.headers.get("content-length") ?? 0
    );

    if (contentLength > MAX_FILES * MAX_FILE_SIZE + 1024 * 1024) {
      return NextResponse.json(
        { message: "Upload request is too large." },
        { status: 413 }
      );
    }

    const formData = await request.formData();

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File);

    const stageIdValue = formData.get("stageId");
    const stageId =
      typeof stageIdValue === "string" && stageIdValue.trim()
        ? stageIdValue.trim()
        : null;

    const captionValue = formData.get("caption");
    const caption =
      typeof captionValue === "string"
        ? captionValue.trim()
        : "";

    if (files.length === 0 || files.length > MAX_FILES) {
      return NextResponse.json(
        { message: "Select between 1 and 10 images." },
        { status: 400 }
      );
    }

    if (caption.length > 500) {
      return NextResponse.json(
        { message: "Caption must not exceed 500 characters." },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (
        !allowedTypes.has(file.type) ||
        file.size === 0 ||
        file.size > MAX_FILE_SIZE
      ) {
        return NextResponse.json(
          {
            message:
              "Each image must be JPEG, PNG or WebP and no larger than 10 MB.",
          },
          { status: 400 }
        );
      }
    }

    const project = await prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

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
          { message: "Invalid construction stage." },
          { status: 400 }
        );
      }
    }

    const latest = await prisma.projectImage.findFirst({
      where: { projectId: id },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    let position = (latest?.position ?? -1) + 1;

    const createdImages = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!isSupportedImage(buffer)) {
        return NextResponse.json(
          { message: "One of the files is not a supported image." },
          { status: 400 }
        );
      }

      const uploaded = await uploadImage(
        buffer,
        `endiz/projects/${id}`
      );

      try {
        const image = await prisma.projectImage.create({
          data: {
            projectId: id,
            stageId,
            imageUrl: uploaded.imageUrl,
            publicId: uploaded.publicId,
            caption: caption || null,
            altText: file.name.slice(0, 200),
            position: position++,
          },
        });

        createdImages.push(image);
      } catch (error) {
        // Avoid leaving a newly uploaded asset orphaned
        // when its database record cannot be saved.
        await cloudinary.uploader
          .destroy(uploaded.publicId, { resource_type: "image" })
          .catch((cleanupError) => {
            console.error("CLOUDINARY CLEANUP ERROR:", cleanupError);
          });

        throw error;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `${createdImages.length} image(s) uploaded successfully.`,
        images: createdImages,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PROJECT IMAGE UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        message:
          "Image upload failed. Check the server logs and try again.",
      },
      { status: 500 }
    );
  }
}
