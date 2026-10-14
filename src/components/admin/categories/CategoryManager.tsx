
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FolderKanban,
  Layers3,
  Plus,
  X,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  projectCount: number;
};

export default function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();

  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function createCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to create category.");
      }

      const category: Category = {
        ...result.category,
        projectCount: 0,
      };

      setCategories((current) =>
        [...current, category].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );

      setName("");
      setDescription("");
      setShowForm(false);
      setSuccess("Category created successfully.");

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C58A35]">
            Portfolio Organization
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#193A52]">
            Project Categories
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Organize architectural projects into clear,
            professional portfolio collections.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setError("");
            setSuccess("");
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#305A77] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#21445F]"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {success && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800"
        >
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {error && !showForm && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#305A77]/30 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8EEF2] text-[#305A77]">
                <Layers3 size={23} />
              </div>

              <span className="rounded-full bg-[#F5F7F8] px-3 py-1.5 text-[11px] font-medium text-slate-500">
                {category.projectCount} projects
              </span>
            </div>

            <h2 className="mt-6 text-lg font-semibold text-[#193A52]">
              {category.name}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              /{category.slug}
            </p>

            <p className="mt-4 min-h-[48px] text-sm leading-6 text-slate-500">
              {category.description || "No description provided."}
            </p>

            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-medium text-[#305A77]">
              <FolderKanban size={15} />
              Portfolio collection
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <Building2 size={42} className="text-slate-300" />

          <h2 className="mt-6 text-lg font-semibold text-[#193A52]">
            No categories yet
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
            Create your first category to begin organizing
            the Endiz project portfolio.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#305A77]"
          >
            Create Category
            <ArrowRight size={17} />
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102B40]/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
                  Portfolio Management
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#193A52]">
                  New Category
                </h2>
              </div>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={createCategory} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]"
                >
                  Category Name
                </label>

                <input
                  id="category-name"
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Residential Architecture"
                  className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#305A77]"
                />
              </div>

              <div>
                <label
                  htmlFor="category-description"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]"
                >
                  Description
                </label>

                <textarea
                  id="category-description"
                  rows={4}
                  maxLength={500}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Briefly describe this project category..."
                  className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-[#305A77]"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#305A77] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? "Creating..." : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
