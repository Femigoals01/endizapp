
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import ProjectGallery from "@/components/projects/ProjectGallery";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const statusLabels = {
  UPCOMING: "Upcoming Project",
  ONGOING: "Ongoing Project",
  COMPLETED: "Completed Project",
};

function formatDate(date: Date | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-NG", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await prisma.project.findFirst({
    where: {
      slug,
      published: true,
    },
    select: {
      title: true,
      summary: true,
      coverImageUrl: true,
    },
  });

  if (!project) {
    return {
      title: "Project Not Found | Endiz",
    };
  }

  return {
    title: `${project.title} | Endiz Design & Con. Ltd.`,
    description:
      project.summary ||
      `Explore ${project.title}, an architectural project by Endiz Design & Con. Ltd.`,
    openGraph: {
      title: project.title,
      images: project.coverImageUrl
        ? [{ url: project.coverImageUrl }]
        : [],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = await prisma.project.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
      stages: {
        orderBy: {
          position: "asc",
        },
        include: {
          images: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const location = [
    project.city,
    project.state,
    project.country,
  ]
    .filter(Boolean)
    .join(", ");

  const generalImages = project.images.filter(
    (image) => !image.stageId
  );

  return (
    <main className="bg-[#F7F7F5]">
      {/* Hero */}
      <section className="relative min-h-[75vh] overflow-hidden bg-[#193A52]">
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#305A77] to-[#102B40]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#071825]/95 via-[#071825]/45 to-[#071825]/30" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-36 sm:px-8 lg:px-12">
          <Link
            href="/#projects"
            className="mb-10 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:text-[#F3B24E]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              {project.category.name}
            </span>

            <span className="text-xs uppercase tracking-[0.18em] text-[#F3B24E]">
              {statusLabels[project.status]}
            </span>
          </div>

          <h1 className="max-w-5xl text-4xl font-light leading-tight tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/75">
            <MapPin size={17} className="text-[#F3B24E]" />
            {location}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:gap-24 lg:px-12 lg:py-32">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C58A35]">
            Project Profile
          </p>

          <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight text-[#305A77] sm:text-5xl">
            Architecture with
            <br />
            <span className="font-semibold">purpose.</span>
          </h2>

          <div className="mt-10 space-y-5 border-t border-gray-300 pt-7">
            <div className="flex justify-between gap-5">
              <span className="text-sm text-gray-500">
                Project Type
              </span>
              <span className="text-right text-sm font-semibold text-[#305A77]">
                {project.category.name}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-sm text-gray-500">
                Location
              </span>
              <span className="text-right text-sm font-semibold text-[#305A77]">
                {location}
              </span>
            </div>

            <div className="flex justify-between gap-5">
              <span className="text-sm text-gray-500">
                Status
              </span>
              <span className="text-right text-sm font-semibold text-[#305A77]">
                {statusLabels[project.status]}
              </span>
            </div>

            {project.startDate && (
              <div className="flex justify-between gap-5">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={15} />
                  Started
                </span>

                <span className="text-right text-sm font-semibold text-[#305A77]">
                  {formatDate(project.startDate)}
                </span>
              </div>
            )}

            {project.progress !== null && (
              <div className="border-t border-gray-300 pt-6">
                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-gray-500">
                    Construction Progress
                  </span>
                  <span className="font-semibold text-[#305A77]">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden bg-[#305A77]/10">
                  <div
                    className="h-full bg-[#8EC543]"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, project.progress)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-[#305A77]">
              Project Overview
            </h3>

            <p className="mt-5 whitespace-pre-line text-base leading-9 text-gray-600">
              {project.description ||
                project.summary ||
                "Further project details will be available soon."}
            </p>
          </div>

          {project.architectNote && (
            <div className="border-l-[3px] border-[#F3B24E] bg-white px-7 py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
                Architect&apos;s Perspective
              </p>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#305A77]">
                {project.architectNote}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Construction Journey */}
      {project.stages.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-16 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C58A35]">
                From Concept to Completion
              </p>

              <h2 className="mt-5 text-4xl font-light tracking-tight text-[#305A77] sm:text-5xl">
                The construction{" "}
                <span className="font-semibold">journey.</span>
              </h2>

              <p className="mt-6 text-base leading-8 text-gray-600">
                Explore the stages, processes, and craftsmanship
                behind this project.
              </p>
            </div>

            <div className="space-y-20">
              {project.stages.map((stage, index) => (
                <article
                  key={stage.id}
                  className="grid gap-8 border-t border-gray-200 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
                >
                  <div>
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#C58A35]">
                      STAGE {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-5 text-3xl font-medium text-[#305A77]">
                      {stage.title}
                    </h3>

                    {stage.isCurrent && (
                      <span className="mt-4 inline-block bg-[#8EC543]/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#305A77]">
                        Current Stage
                      </span>
                    )}

                    {stage.stageDate && (
                      <p className="mt-5 text-xs uppercase tracking-[0.16em] text-gray-400">
                        {formatDate(stage.stageDate)}
                      </p>
                    )}

                    {stage.description && (
                      <p className="mt-6 whitespace-pre-line text-sm leading-8 text-gray-600">
                        {stage.description}
                      </p>
                    )}

                    {stage.architectNote && (
                      <div className="mt-8 border-l-2 border-[#F3B24E] pl-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C58A35]">
                          Architect&apos;s Note
                        </p>

                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                          {stage.architectNote}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    {stage.images.length > 0 ? (
                      <ProjectGallery
                        title={`${stage.title} Gallery`}
                        images={stage.images.map((image) => ({
                          id: image.id,
                          imageUrl: image.imageUrl,
                          caption: image.caption,
                          altText: image.altText,
                        }))}
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-[#F1F4F5] text-sm text-gray-400">
                        Stage photographs coming soon
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* General Project Gallery */}
      {generalImages.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
          <ProjectGallery
            title="Project Photography"
            images={generalImages.map((image) => ({
              id: image.id,
              imageUrl: image.imageUrl,
              caption: image.caption,
              altText: image.altText,
            }))}
          />
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#193A52] px-6 py-24 text-center sm:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3B24E]">
          Your Vision, Our Expertise
        </p>

        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-light leading-tight text-white sm:text-5xl">
          Have a project in mind?
          <br />
          <span className="font-semibold">
            Let&apos;s bring it to life.
          </span>
        </h2>

        <Link
          href="/#contact"
          className="mt-10 inline-flex items-center gap-4 bg-[#F3B24E] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#193A52] transition hover:bg-white"
        >
          Start a Conversation
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
