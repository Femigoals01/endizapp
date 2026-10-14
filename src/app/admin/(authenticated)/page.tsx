
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  FolderKanban,
  HardHat,
  Images,
  Mail,
  Plus,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  const [
    totalProjects,
    ongoingProjects,
    completedProjects,
    newEnquiries,
    totalImages,
    recentProjects,
    recentEnquiries,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({
      where: { status: "ONGOING" },
    }),
    prisma.project.count({
      where: { status: "COMPLETED" },
    }),
    prisma.contactEnquiry.count({
      where: { status: "NEW" },
    }),
    prisma.projectImage.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        status: true,
        createdAt: true,
        category: {
          select: { name: true },
        },
      },
    }),
    prisma.contactEnquiry.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        message: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
      color: "#305A77",
      background: "#E8EEF2",
    },
    {
      label: "Ongoing Projects",
      value: ongoingProjects,
      icon: HardHat,
      color: "#C58A35",
      background: "#FFF4DF",
    },
    {
      label: "Completed Projects",
      value: completedProjects,
      icon: CheckCircle2,
      color: "#527B2E",
      background: "#EEF6E5",
    },
    {
      label: "New Enquiries",
      value: newEnquiries,
      icon: Mail,
      color: "#7655A5",
      background: "#F0EBF7",
    },
  ];

  return (
    <div className="space-y-9">
      <section className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C58A35]">
            Workspace Overview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#193A52] sm:text-4xl">
            Welcome back, {admin.name.split(" ")[0]}.
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Here&apos;s what&apos;s happening across your
            Endiz digital workspace.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#305A77] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#305A77]/15 transition hover:bg-[#21445F]"
        >
          <Plus size={18} />
          New Project
        </Link>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: stat.background }}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    style={{ color: stat.color }}
                  />
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-slate-300"
                />
              </div>

              <p className="mt-7 text-4xl font-semibold tracking-tight text-[#193A52]">
                {stat.value.toLocaleString("en-NG")}
              </p>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
            <div>
              <h3 className="text-lg font-semibold text-[#193A52]">
                Recent Projects
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Latest additions to your portfolio
              </p>
            </div>

            <Link
              href="/admin/projects"
              className="flex items-center gap-1 text-xs font-semibold text-[#305A77] hover:underline"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="flex min-h-[290px] flex-col items-center justify-center px-6 text-center">
              <Building2
                size={38}
                strokeWidth={1.3}
                className="text-slate-300"
              />

              <h4 className="mt-5 text-sm font-semibold text-[#193A52]">
                No projects added yet
              </h4>

              <p className="mt-2 max-w-xs text-xs leading-6 text-slate-400">
                Your architectural projects will appear here
                once they are added to the system.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#193A52]">
                      {project.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {project.category.name} ·{" "}
                      {[project.city, project.state]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-[#E8EEF2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#305A77]">
                      {project.status}
                    </span>

                    <span className="hidden text-xs text-slate-400 sm:block">
                      {formatDate(project.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
            <div>
              <h3 className="text-lg font-semibold text-[#193A52]">
                Recent Enquiries
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Latest messages from visitors
              </p>
            </div>

            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#305A77] hover:underline"
            >
              View All
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="flex min-h-[290px] flex-col items-center justify-center px-6 text-center">
              <Mail
                size={36}
                strokeWidth={1.3}
                className="text-slate-300"
              />

              <h4 className="mt-5 text-sm font-semibold text-[#193A52]">
                No enquiries yet
              </h4>

              <p className="mt-2 max-w-xs text-xs leading-6 text-slate-400">
                New website enquiries will appear here
                once your contact form is connected.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#193A52]">
                      {enquiry.name}
                    </p>

                    {enquiry.status === "NEW" && (
                      <span className="h-2 w-2 rounded-full bg-[#F3B24E]" />
                    )}
                  </div>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {enquiry.email}
                  </p>

                  <p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-500">
                    {enquiry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl bg-[#193A52] p-7 text-white sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F3B24E]">
              Portfolio Management
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              Every project tells a story.
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
              Document the architectural journey, manage
              construction stages, and present completed
              work with clarity and distinction.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-4">
            <Images size={22} className="text-[#F3B24E]" />

            <div>
              <p className="text-xl font-semibold">
                {totalImages.toLocaleString("en-NG")}
              </p>

              <p className="text-xs text-white/50">
                Project Gallery Images
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
