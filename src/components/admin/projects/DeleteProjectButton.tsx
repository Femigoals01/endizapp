
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProjectButton({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Permanently delete "${projectTitle}"?\n\nThis will also remove its construction stages and image records. This action cannot be undone.`
    );

    if (!confirmed || deleting) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}`,
        { method: "DELETE" }
      );

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Unexpected server response.");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete project.");
      }

      router.replace("/admin/projects");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete project."
      );
      setDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
      >
        <Trash2 size={16} />
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
