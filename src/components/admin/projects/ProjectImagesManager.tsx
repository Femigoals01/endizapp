


"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Crown,
  ImagePlus,
  Images,
  Loader2,
  Pencil,
  Save,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

type Stage = {
  id: string;
  title: string;
};

// type ProjectImage = {
//   id: string;
//   imageUrl: string;
//   publicId: string;
//   caption: string | null;
//   stageId: string | null;
// };

// type Props = {
//   projectId: string;
//   stages: Stage[];
//   initialImages: ProjectImage[];
//   initialCoverImageId?: string | null;
//   canDelete?: boolean;
// };


type ProjectImage = {
  id: string;
  imageUrl: string;
  publicId: string | null;
  caption: string | null;
  stageId: string | null;
};

type Props = {
  projectId: string;
  stages: {
    id: string;
    title: string;
  }[];
  initialImages: ProjectImage[];
  initialCoverImageId?: string | null;
  canDelete?: boolean;
};

export default function ProjectImagesManager({
  projectId,
  stages,
  initialImages,
  initialCoverImageId = null,
  canDelete = false,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState(initialImages);
  const [coverImageId, setCoverImageId] = useState(
    initialCoverImageId
  );

  const [files, setFiles] = useState<File[]>([]);
  const [stageId, setStageId] = useState("");
  const [caption, setCaption] = useState("");

  const [uploading, setUploading] = useState(false);
  const [busyImageId, setBusyImageId] = useState<string | null>(
    null
  );

  const [editingImage, setEditingImage] =
    useState<ProjectImage | null>(null);

  const [editCaption, setEditCaption] = useState("");
  const [editStageId, setEditStageId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function notify(message: string) {
    setError("");
    setSuccess(message);
  }

  async function readJson(response: Response) {
    const contentType =
      response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      throw new Error(
        `Unexpected server response (HTTP ${response.status}).`
      );
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Request failed.");
    }

    return result;
  }

  async function handleUpload() {
    if (uploading || files.length === 0) return;

    if (files.length > 10) {
      setError("You can upload a maximum of 10 images at once.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      files.forEach((file) => formData.append("files", file));
      formData.append("stageId", stageId);
      formData.append("caption", caption);

      const response = await fetch(
        `/api/admin/projects/${projectId}/images`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await readJson(response);

      setImages((current) => [...current, ...result.images]);
      setFiles([]);
      setCaption("");

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      notify(result.message);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to upload images."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSetCover(image: ProjectImage) {
    if (busyImageId) return;

    setBusyImageId(image.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/cover`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageId: image.id,
          }),
        }
      );

      const result = await readJson(response);

      setCoverImageId(result.coverImageId);
      notify("Project cover image updated successfully.");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to set cover image."
      );
    } finally {
      setBusyImageId(null);
    }
  }

  function openEditor(image: ProjectImage) {
    setEditingImage(image);
    setEditCaption(image.caption ?? "");
    setEditStageId(image.stageId ?? "");
    setError("");
  }

  async function handleSaveImage() {
    if (!editingImage || busyImageId) return;

    setBusyImageId(editingImage.id);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/images/${editingImage.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            caption: editCaption,
            stageId: editStageId || null,
          }),
        }
      );

      const result = await readJson(response);

      setImages((current) =>
        current.map((image) =>
          image.id === editingImage.id
            ? {
                ...image,
                caption: result.image.caption,
                stageId: result.image.stageId,
              }
            : image
        )
      );

      setEditingImage(null);
      notify("Image details updated successfully.");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update image."
      );
    } finally {
      setBusyImageId(null);
    }
  }

  async function handleDelete(image: ProjectImage) {
    if (busyImageId) return;

    const confirmed = window.confirm(
      "Permanently delete this photograph from Cloudinary and the database? This action cannot be undone."
    );

    if (!confirmed) return;

    setBusyImageId(image.id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/images/${image.id}`,
        {
          method: "DELETE",
        }
      );

      await readJson(response);

      setImages((current) =>
        current.filter((item) => item.id !== image.id)
      );

      if (coverImageId === image.publicId) {
        setCoverImageId(null);
      }

      notify("Photograph deleted successfully.");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete image."
      );
    } finally {
      setBusyImageId(null);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#193A52] outline-none focus:border-[#305A77]";

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
          Project Photography
        </p>

        <h2 className="mt-2 text-xl font-semibold text-[#193A52]">
          Project Media Manager
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          Upload photographs, organize construction galleries,
          and select the project cover image.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
              Select Photographs
            </label>

            <label className="flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#305A77]/20 bg-[#F7FAFC] px-5 text-center transition hover:border-[#305A77]/50">
              <UploadCloud
                size={34}
                className="text-[#305A77]"
              />

              <span className="mt-4 text-sm font-semibold text-[#193A52]">
                Choose project images
              </span>

              <span className="mt-2 text-xs text-slate-400">
                JPEG, PNG or WebP · Maximum 10 MB each
              </span>

              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(event) => {
                  setFiles(
                    Array.from(event.target.files ?? [])
                  );
                  setError("");
                  setSuccess("");
                }}
              />
            </label>

            {files.length > 0 && (
              <p className="mt-3 text-xs font-medium text-[#305A77]">
                {files.length} photograph(s) selected
              </p>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
                Assign to Construction Stage
              </label>

              <select
                value={stageId}
                onChange={(event) =>
                  setStageId(event.target.value)
                }
                className={inputClass}
              >
                <option value="">General Project Gallery</option>

                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#305A77]">
                Image Caption
              </label>

              <textarea
                rows={3}
                maxLength={500}
                value={caption}
                onChange={(event) =>
                  setCaption(event.target.value)
                }
                placeholder="Describe these photographs..."
                className={inputClass}
              />
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#305A77] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#21445F] disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <ImagePlus size={18} />
                  Upload Images
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {images.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <Images size={38} className="text-slate-300" />

          <h3 className="mt-5 text-sm font-semibold text-[#193A52]">
            No project photographs yet
          </h3>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => {
            const isCover =
              coverImageId === image.publicId;

            const isBusy =
              busyImageId === image.id;

            return (
              <div
                key={image.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={image.imageUrl}
                    alt={
                      image.caption ||
                      "Endiz architectural photograph"
                    }
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {isCover && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#F3B24E] px-3 py-1.5 text-[10px] font-bold text-[#193A52]">
                      <Crown size={13} />
                      Project Cover
                    </span>
                  )}
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <p className="line-clamp-2 min-h-10 text-xs leading-5 text-slate-600">
                      {image.caption ||
                        "Architectural project photograph"}
                    </p>

                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#C58A35]">
                      {image.stageId
                        ? stages.find(
                            (stage) =>
                              stage.id === image.stageId
                          )?.title ??
                          "Construction Stage"
                        : "General Gallery"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isCover || Boolean(busyImageId)}
                      onClick={() =>
                        handleSetCover(image)
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8EEF2] px-3 py-2 text-[11px] font-semibold text-[#305A77] disabled:opacity-50"
                    >
                      <Crown size={14} />
                      {isCover ? "Cover" : "Set Cover"}
                    </button>

                    <button
                      type="button"
                      disabled={Boolean(busyImageId)}
                      onClick={() => openEditor(image)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-600 disabled:opacity-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    {canDelete && (
                      <button
                        type="button"
                        disabled={Boolean(busyImageId)}
                        onClick={() =>
                          handleDelete(image)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-[11px] font-semibold text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    )}
                  </div>

                  {isBusy && (
                    <p className="flex items-center gap-2 text-xs text-slate-400">
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                      Processing...
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editingImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102B40]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C58A35]">
                  Media Management
                </p>

                <h3 className="mt-2 text-xl font-semibold text-[#193A52]">
                  Edit Photograph
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setEditingImage(null)}
                aria-label="Close editor"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#305A77]">
                  Image Caption
                </label>

                <textarea
                  rows={4}
                  maxLength={500}
                  value={editCaption}
                  onChange={(event) =>
                    setEditCaption(event.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#305A77]">
                  Construction Stage
                </label>

                <select
                  value={editStageId}
                  onChange={(event) =>
                    setEditStageId(event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">
                    General Project Gallery
                  </option>

                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                disabled={Boolean(busyImageId)}
                onClick={handleSaveImage}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#305A77] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                <Save size={17} />
                Save Image Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
