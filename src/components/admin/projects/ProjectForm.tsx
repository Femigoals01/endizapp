
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  FileText,
  MapPin,
  Save,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
};

type ProjectStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

export type ProjectFormData = {
  title: string;
  categoryId: string;
  summary: string;
  description: string;
  architectNote: string;
  city: string;
  state: string;
  country: string;
  status: ProjectStatus;
  progress: number;
  featured: boolean;
  published: boolean;
};

type ProjectFormProps = {
  categories: Category[];
  projectId?: string;
  initialData?: ProjectFormData;
};

const emptyProject: ProjectFormData = {
  title: "",
  categoryId: "",
  summary: "",
  description: "",
  architectNote: "",
  city: "",
  state: "",
  country: "Nigeria",
  status: "UPCOMING",
  progress: 0,
  featured: false,
  published: false,
};

export default function ProjectForm({
  categories,
  projectId,
  initialData,
}: ProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(projectId);

  const [form, setForm] = useState<ProjectFormData>(
    initialData ?? emptyProject
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");

    try {
      const endpoint = isEditing
        ? `/api/admin/projects/${projectId}`
        : "/api/admin/projects";

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Unexpected server response (HTTP ${response.status}). Check the Next.js terminal.`
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save project.");
      }

      router.push(
        isEditing
          ? `/admin/projects/${projectId}`
          : "/admin/projects"
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save project."
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#193A52] outline-none transition focus:border-[#305A77] focus:ring-4 focus:ring-[#305A77]/10";

  const textareaClass =
    "w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-[#193A52] outline-none transition focus:border-[#305A77] focus:ring-4 focus:ring-[#305A77]/10";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#305A77]";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link
          href={
            isEditing
              ? `/admin/projects/${projectId}`
              : "/admin/projects"
          }
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#305A77]"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[#C58A35]">
          Portfolio Management
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#193A52]">
          {isEditing ? "Edit Project" : "Create New Project"}
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {isEditing
            ? "Update the project information, progress and publication settings."
            : "Document the project details. Images and construction stages can be added after creating the project."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-3">
            <Building2 className="text-[#C58A35]" size={22} />
            <h2 className="text-lg font-semibold text-[#193A52]">
              Project Information
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Project Title *</label>
              <input
                required
                minLength={3}
                maxLength={150}
                className={inputClass}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Project title"
              />
            </div>

            <div>
              <label className={labelClass}>Project Category *</label>
              <select
                required
                className={inputClass}
                value={form.categoryId}
                onChange={(e) => update("categoryId", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Project Status</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as ProjectStatus)
                }
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Short Summary</label>
              <textarea
                rows={3}
                maxLength={500}
                className={textareaClass}
                value={form.summary}
                onChange={(e) => update("summary", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Full Description</label>
              <textarea
                rows={6}
                maxLength={20000}
                className={textareaClass}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-3">
            <MapPin className="text-[#C58A35]" size={22} />
            <h2 className="text-lg font-semibold text-[#193A52]">
              Location & Progress
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label className={labelClass}>City *</label>
              <input
                required
                className={inputClass}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>State *</label>
              <input
                required
                className={inputClass}
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Country</label>
              <input
                className={inputClass}
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </div>

            <div className="sm:col-span-3">
              <label className={labelClass}>
                Construction Progress ({form.progress}%)
              </label>

              <input
                type="range"
                min={0}
                max={100}
                value={form.progress}
                onChange={(e) =>
                  update("progress", Number(e.target.value))
                }
                className="w-full accent-[#305A77]"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-3">
            <FileText className="text-[#C58A35]" size={22} />
            <h2 className="text-lg font-semibold text-[#193A52]">
              Architect&apos;s Notes
            </h2>
          </div>

          <textarea
            rows={5}
            maxLength={10000}
            className={textareaClass}
            value={form.architectNote}
            onChange={(e) => update("architectNote", e.target.value)}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-[#193A52]">
            Publication Settings
          </h2>

          <div className="mt-6 space-y-5">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 accent-[#305A77]"
              />
              Feature this project on the website
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => update("published", e.target.checked)}
                className="h-4 w-4 accent-[#305A77]"
              />
              Mark this project as published
            </label>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="flex flex-wrap justify-end gap-3 pb-10">
          <Link
            href="/admin/projects"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-600"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving || categories.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[#305A77] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#21445F] disabled:opacity-60"
          >
            <Save size={18} />
            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
