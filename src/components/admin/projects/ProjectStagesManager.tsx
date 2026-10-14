
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  HardHat,
  Images,
  Plus,
  X,
} from "lucide-react";

type Stage = {
  id: string;
  title: string;
  description: string | null;
  architectNote: string | null;
  stageDate: string | null;
  position: number;
  isCurrent: boolean;
  imageCount: number;
};

type Props = {
  projectId: string;
  initialStages: Stage[];
};

export default function ProjectStagesManager({
  projectId,
  initialStages,
}: Props) {
  const router = useRouter();

  const [stages, setStages] = useState(initialStages);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    architectNote: "",
    stageDate: "",
    isCurrent: false,
  });

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/stages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Unexpected server response (HTTP ${response.status}).`
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to create stage."
        );
      }

      const newStage: Stage = {
        ...result.stage,
        imageCount: 0,
      };

      setStages((current) => [
        ...current.map((stage) => ({
          ...stage,
          isCurrent: form.isCurrent ? false : stage.isCurrent,
        })),
        newStage,
      ]);

      setForm({
        title: "",
        description: "",
        architectNote: "",
        stageDate: "",
        isCurrent: false,
      });

      setShowForm(false);
      setSuccess("Construction stage created successfully.");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create stage."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
            Project Journey
          </p>

          <h2 className="mt-2 text-xl font-semibold text-[#193A52]">
            Construction Stages
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Record each milestone and document construction progress.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setError("");
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#305A77] px-5 py-3 text-sm font-semibold text-white hover:bg-[#21445F]"
        >
          <Plus size={17} />
          Add Stage
        </button>
      </div>

      {success && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {stages.length === 0 ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-[#FAFBFC] p-8 text-center">
          <HardHat size={38} className="text-slate-300" />

          <h3 className="mt-5 text-sm font-semibold text-[#193A52]">
            No construction stages yet
          </h3>

          <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">
            Add the first construction milestone to begin documenting
            this project.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="flex flex-wrap items-center justify-between gap-5 rounded-xl border border-slate-200 bg-[#FAFBFC] p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8EEF2] text-sm font-bold text-[#305A77]">
                  {index + 1}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-sm font-semibold text-[#193A52]">
                      {stage.title}
                    </h3>

                    {stage.isCurrent && (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-700">
                        Current Stage
                      </span>
                    )}
                  </div>

                  {stage.description && (
                    <p className="mt-2 max-w-lg text-xs leading-6 text-slate-500">
                      {stage.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Images size={14} />
                      {stage.imageCount} images
                    </span>

                    {stage.stageDate && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {new Date(stage.stageDate).toLocaleDateString(
                          "en-NG",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <span className="text-xs font-medium text-[#305A77]">
                Stage {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102B40]/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
                  Construction Progress
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-[#193A52]">
                  Add Construction Stage
                </h3>
              </div>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
                  Stage Title *
                </label>

                <input
                  required
                  minLength={3}
                  maxLength={150}
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g. Foundation Construction"
                  className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#305A77]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
                  Stage Date
                </label>

                <input
                  type="date"
                  value={form.stageDate}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      stageDate: event.target.value,
                    }))
                  }
                  className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#305A77]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
                  Description
                </label>

                <textarea
                  rows={3}
                  maxLength={10000}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-[#305A77]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
                  Architect&apos;s Note
                </label>

                <textarea
                  rows={3}
                  maxLength={10000}
                  value={form.architectNote}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      architectNote: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-[#305A77]"
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={form.isCurrent}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isCurrent: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#305A77]"
                />
                Mark as current construction stage
              </label>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-4">
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
                  {saving ? "Saving..." : "Create Stage"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
