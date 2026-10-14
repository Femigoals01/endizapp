
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FolderKanban,
  Images,
  MapPin,
  Plus,
  Search,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  city: string;
  state: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  published: boolean;
  featured: boolean;
  coverImageUrl: string | null;
  categoryName: string;
  imagesCount: number;
  stagesCount: number;
  createdAt: string;
};

const filters = ["ALL", "UPCOMING", "ONGOING", "COMPLETED"] as const;

export default function ProjectsManager({
  projects,
}: {
  projects: Project[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof filters)[number]>("ALL");

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesSearch = [
          project.title,
          project.categoryName,
          project.city,
          project.state,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" || project.status === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [projects, search, statusFilter]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C58A35]">
            Architectural Portfolio
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#193A52]">
            Project Management
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Manage your architectural projects, construction
            progress, and portfolio publications.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#305A77] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#21445F]"
        >
          <Plus size={18} />
          Add New Project
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="relative w-full max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFB] pl-11 pr-4 text-sm outline-none focus:border-[#305A77]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`rounded-lg px-4 py-2.5 text-[11px] font-semibold transition ${
                statusFilter === filter
                  ? "bg-[#305A77] text-white"
                  : "bg-[#F3F6F8] text-slate-500 hover:text-[#305A77]"
              }`}
            >
              {filter === "ALL" ? "All Projects" : filter}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <FolderKanban size={44} className="text-slate-300" />

          <h2 className="mt-6 text-lg font-semibold text-[#193A52]">
            No projects found
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
            {projects.length === 0
              ? "Your portfolio is ready. Create your first architectural project."
              : "Try another search term or project status."}
          </p>

          {projects.length === 0 && (
            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#305A77]"
            >
              Create First Project
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative flex h-52 items-center justify-center bg-[#E8EEF2]">
                {project.coverImageUrl ? (
                  <img
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building2 size={48} className="text-[#305A77]/30" />
                )}

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#305A77]">
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C58A35]">
                  {project.categoryName}
                </p>

                <h2 className="mt-3 text-lg font-semibold text-[#193A52]">
                  {project.title}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={15} />
                  {project.city}, {project.state}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Images size={15} />
                    {project.imagesCount} images
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 size={15} />
                    {project.stagesCount} stages
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                      project.published
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#305A77] hover:underline"
                  >
                    Manage Project
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
