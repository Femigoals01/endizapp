export type ProjectCategoryInput = {
  name: string;
  description?: string;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateProjectCategory(input: unknown) {
  if (!input || typeof input !== "object") {
    return { success: false as const, error: "Invalid request." };
  }

  const data = input as Record<string, unknown>;

  const name =
    typeof data.name === "string" ? data.name.trim() : "";

  const description =
    typeof data.description === "string"
      ? data.description.trim()
      : "";

  if (name.length < 2 || name.length > 80) {
    return {
      success: false as const,
      error: "Category name must contain 2–80 characters.",
    };
  }

  if (description.length > 500) {
    return {
      success: false as const,
      error: "Description must not exceed 500 characters.",
    };
  }

  const slug = slugify(name);

  if (!slug) {
    return {
      success: false as const,
      error: "Enter a valid category name.",
    };
  }

  return {
    success: true as const,
    data: { name, description: description || null, slug },
  };
}