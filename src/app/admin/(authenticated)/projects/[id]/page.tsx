
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  Images,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import DeleteProjectButton from "@/components/admin/projects/DeleteProjectButton";
import ProjectStagesManager from "@/components/admin/projects/ProjectStagesManager";
import ProjectImagesManager from "@/components/admin/projects/ProjectImagesManager";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({
  params,
}: PageProps) {
  const admin = await requireAdmin();
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      category: true,
      stages: {
        orderBy: { position: "asc" },
        include: {
          _count: {
            select: { images: true },
          },
        },
      },
      _count: {
        select: { images: true },
      },
      images: {
  orderBy: {
    position: "asc",
  },
},
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#305A77]"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C58A35]">
              {project.category.name}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#193A52] sm:text-4xl">
              {project.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} />
              {project.city}, {project.state}, {project.country}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#305A77] px-5 py-3 text-sm font-semibold text-white hover:bg-[#21445F]"
            >
              <Pencil size={16} />
              Edit Project
            </Link>

            {admin.role === "ADMIN" && (
              <DeleteProjectButton
                projectId={project.id}
                projectTitle={project.title}
              />
            )}
          </div>
        </div>
      </div>

      


      <ProjectStagesManager
  projectId={project.id}
  initialStages={project.stages.map((stage) => ({
    id: stage.id,
    title: stage.title,
    description: stage.description,
    architectNote: stage.architectNote,
    stageDate: stage.stageDate?.toISOString() ?? null,
    position: stage.position,
    isCurrent: stage.isCurrent,
    imageCount: stage._count.images,
  }))}
/>


<ProjectImagesManager
  projectId={project.id}
  stages={project.stages.map((stage) => ({
    id: stage.id,
    title: stage.title,
  }))}
  initialImages={project.images.map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    publicId: image.publicId,
    caption: image.caption,
    stageId: image.stageId,
  }))}
  initialCoverImageId={project.coverImageId}
  canDelete={admin.role === "ADMIN"}
/>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-7">
          <div className="flex items-center gap-3">
            <Building2 size={20} className="text-[#C58A35]" />
            <h2 className="text-lg font-semibold text-[#193A52]">
              Project Overview
            </h2>
          </div>

          <p className="mt-6 text-sm leading-8 text-slate-600">
            {project.description ||
              project.summary ||
              "No project description has been added yet."}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-[#C58A35]" />
            <h2 className="text-lg font-semibold text-[#193A52]">
              Architect&apos;s Note
            </h2>
          </div>

          <p className="mt-6 whitespace-pre-line text-sm leading-8 text-slate-600">
            {project.architectNote ||
              "No architect's note has been added yet."}
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
              Project Journey
            </p>

            <h2 className="mt-2 text-xl font-semibold text-[#193A52]">
              Construction Stages
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Document every stage of construction with photographs
              and professional notes.
            </p>
          </div>

          <span className="rounded-full bg-[#E8EEF2] px-4 py-2 text-xs font-semibold text-[#305A77]">
            {project.stages.length} stages
          </span>
        </div>

        {project.stages.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
            <Building2 size={40} className="text-slate-300" />

            <h3 className="mt-5 text-sm font-semibold text-[#193A52]">
              No construction stages yet
            </h3>

            <p className="mt-3 max-w-sm text-xs leading-6 text-slate-500">
              Construction stages and photo uploads will be
              available in the next module.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {project.stages.map((stage, index) => (
              <div
                key={stage.id}
                className="flex items-center justify-between gap-5 p-6"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EEF2] text-sm font-semibold text-[#305A77]">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-[#193A52]">
                      {stage.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {stage._count.images} images
                    </p>
                  </div>
                </div>

                {stage.isCurrent && (
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-semibold text-green-700">
                    Current Stage
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
