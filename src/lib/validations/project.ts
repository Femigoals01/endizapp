
import { slugify } from "@/lib/validations/project-category";

export type ProjectInput = {
  title: string;
  categoryId: string;
  summary: string;
  description: string;
  architectNote: string;
  city: string;
  state: string;
  country: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  progress: number | null;
  featured: boolean;
  published: boolean;
};

export function validateProject(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false as const, error: "Invalid project data." };
  }

  const data = input as Record<string, unknown>;

  const stringField = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";

  const title = stringField("title");
  const categoryId = stringField("categoryId");
  const summary = stringField("summary");
  const description = stringField("description");
  const architectNote = stringField("architectNote");
  const city = stringField("city");
  const state = stringField("state");
  const country = stringField("country") || "Nigeria";

  const status = data.status;
  const progress = data.progress;

  if (title.length < 3 || title.length > 150) {
    return {
      success: false as const,
      error: "Project title must contain 3–150 characters.",
    };
  }

  if (!categoryId) {
    return {
      success: false as const,
      error: "Select a project category.",
    };
  }

  if (summary.length > 500) {
    return {
      success: false as const,
      error: "Summary must not exceed 500 characters.",
    };
  }

  if (description.length > 20000 || architectNote.length > 10000) {
    return {
      success: false as const,
      error: "Project description or architect's note is too long.",
    };
  }

  if (!city || !state || country.length > 100) {
    return {
      success: false as const,
      error: "Provide a valid city, state, and country.",
    };
  }

  if (!["UPCOMING", "ONGOING", "COMPLETED"].includes(String(status))) {
    return {
      success: false as const,
      error: "Select a valid project status.",
    };
  }

  if (
    progress !== null &&
    progress !== undefined &&
    (!Number.isInteger(progress) || Number(progress) < 0 || Number(progress) > 100)
  ) {
    return {
      success: false as const,
      error: "Progress must be a whole number between 0 and 100.",
    };
  }

  return {
    success: true as const,
    data: {
      title,
      slug: slugify(title),
      categoryId,
      summary: summary || null,
      description: description || null,
      architectNote: architectNote || null,
      city,
      state,
      country,
      status: status as ProjectInput["status"],
      progress: progress == null ? null : Number(progress),
      featured: data.featured === true,
      published: data.published === true,
    },
  };
}
