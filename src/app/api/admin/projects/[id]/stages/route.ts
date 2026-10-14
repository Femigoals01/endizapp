
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";

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
    select: { id: true },
  });

  if (!project) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 }
    );
  }

  const stages = await prisma.projectStage.findMany({
    where: { projectId: id },
    orderBy: [
      { position: "asc" },
      { createdAt: "asc" },
    ],
    include: {
      _count: {
        select: { images: true },
      },
    },
  });

  return NextResponse.json({ stages });
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

  try {
    const { id } = await context.params;
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid request data." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const title =
      typeof data.title === "string" ? data.title.trim() : "";

    const description =
      typeof data.description === "string"
        ? data.description.trim()
        : "";

    const architectNote =
      typeof data.architectNote === "string"
        ? data.architectNote.trim()
        : "";

    const stageDate =
      typeof data.stageDate === "string" && data.stageDate
        ? new Date(`${data.stageDate}T12:00:00.000Z`)
        : null;

    if (title.length < 3 || title.length > 150) {
      return NextResponse.json(
        { message: "Stage title must contain 3–150 characters." },
        { status: 400 }
      );
    }

    if (description.length > 10000 || architectNote.length > 10000) {
      return NextResponse.json(
        { message: "Stage description or architect's note is too long." },
        { status: 400 }
      );
    }

    if (stageDate && Number.isNaN(stageDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid stage date." },
        { status: 400 }
      );
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

    const latestStage = await prisma.projectStage.findFirst({
      where: { projectId: id },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    const stage = await prisma.$transaction(async (tx) => {
      if (data.isCurrent === true) {
        await tx.projectStage.updateMany({
          where: { projectId: id, isCurrent: true },
          data: { isCurrent: false },
        });
      }

      return tx.projectStage.create({
        data: {
          projectId: id,
          title,
          description: description || null,
          architectNote: architectNote || null,
          stageDate,
          position: (latestStage?.position ?? -1) + 1,
          isCurrent: data.isCurrent === true,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Construction stage created successfully.",
        stage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PROJECT STAGE ERROR:", error);

    return NextResponse.json(
      { message: "Unable to create construction stage." },
      { status: 500 }
    );
  }
}
