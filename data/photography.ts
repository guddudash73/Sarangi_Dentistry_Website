// data/photography.ts
import type { Photo, PhotoAlbum } from "@/types/photography";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

type MaybeWrappedPhotographyResponse =
  | Photo[]
  | {
      items?: Photo[];
    };

function getCmsHeaders(): HeadersInit {
  if (!CMS_PUBLIC_API_KEY) {
    throw new Error("CMS_PUBLIC_API_KEY is not set");
  }

  return {
    Accept: "application/json",
    "x-website-key": CMS_PUBLIC_API_KEY,
  };
}

function buildBaseCandidates(): string[] {
  const normalized = DCM_CMS_API_BASE_URL.replace(/\/+$/, "");

  const candidates = [normalized];

  if (normalized.endsWith("/api")) {
    candidates.push(normalized.slice(0, -4));
  } else {
    candidates.push(`${normalized}/api`);
  }

  return [...new Set(candidates)];
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || typeof value === "boolean";
}

function isOptionalPositiveNumber(value: unknown): value is number | undefined {
  return (
    value === undefined ||
    (typeof value === "number" && Number.isFinite(value) && value > 0)
  );
}

function isOptionalTags(value: unknown): value is string[] | undefined {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.every((item) => typeof item === "string" && item.trim().length > 0))
  );
}

function isPhoto(value: unknown): value is Photo {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<Record<keyof Photo, unknown>>;

  return (
    typeof item.id === "string" &&
    item.id.trim().length > 0 &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    isOptionalString(item.alt) &&
    typeof item.src === "string" &&
    item.src.trim().length > 0 &&
    isOptionalString(item.thumbnailUrl) &&
    isOptionalString(item.cardUrl) &&
    isOptionalString(item.fullUrl) &&
    isOptionalPositiveNumber(item.width) &&
    isOptionalPositiveNumber(item.height) &&
    isOptionalString(item.location) &&
    isOptionalString(item.takenAt) &&
    isOptionalString(item.camera) &&
    isOptionalString(item.description) &&
    isOptionalTags(item.tags) &&
    isOptionalString(item.spanClass) &&
    isOptionalBoolean(item.featured)
  );
}

function normalizeOptionalString(
  value: string | undefined,
): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizePhoto(item: Photo): Photo {
  return {
    id: item.id.trim(),
    title: item.title.trim(),
    alt: normalizeOptionalString(item.alt),

    src: item.src.trim(),
    thumbnailUrl: normalizeOptionalString(item.thumbnailUrl),
    cardUrl: normalizeOptionalString(item.cardUrl),
    fullUrl: normalizeOptionalString(item.fullUrl),

    width: item.width,
    height: item.height,

    location: normalizeOptionalString(item.location),
    takenAt: normalizeOptionalString(item.takenAt),
    camera: normalizeOptionalString(item.camera),
    description: normalizeOptionalString(item.description),
    tags: Array.isArray(item.tags)
      ? item.tags.map((tag) => tag.trim()).filter(Boolean)
      : [],
    spanClass: normalizeOptionalString(item.spanClass),
    featured: item.featured === true,
  };
}

function normalizePhotographyResponse(
  response: MaybeWrappedPhotographyResponse,
): Photo[] {
  const rawItems = Array.isArray(response) ? response : response.items;

  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.filter(isPhoto).map(normalizePhoto);
}

async function cmsFetchFromBase<T>(baseUrl: string, path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: getCmsHeaders(),
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");

    throw new Error(
      `CMS photography fetch failed: ${res.status} ${res.statusText}${
        body ? ` - ${body}` : ""
      }`,
    );
  }

  return (await res.json()) as T;
}

async function cmsFetch<T>(path: string): Promise<T> {
  const candidates = buildBaseCandidates();
  let lastError: unknown = null;

  for (const baseUrl of candidates) {
    try {
      return await cmsFetchFromBase<T>(baseUrl, path);
    } catch (error) {
      lastError = error;

      const message = error instanceof Error ? error.message : String(error);

      const is404 =
        message.includes("CMS photography fetch failed: 404") ||
        message.includes("Cannot GET");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("CMS photography fetch failed.");
}

/** Returns all published photos. */
export async function getAllPhotos(): Promise<Photo[]> {
  const response = await cmsFetch<MaybeWrappedPhotographyResponse>(
    "/public/cms/photography",
  );

  return normalizePhotographyResponse(response);
}

/**
 * Returns the single featured photo for the home-page
 * Beyond Dentistry card thumbnail.
 */
export async function getFeaturedPhoto(): Promise<Photo | undefined> {
  try {
    const item = await cmsFetch<Photo>("/public/cms/photography/featured");

    return isPhoto(item) ? normalizePhoto(item) : undefined;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (!message.includes("CMS photography fetch failed: 404")) {
      throw error;
    }

    const items = await getAllPhotos();
    return items.find((photo) => photo.featured) ?? items[0];
  }
}

/** Returns a single photo by UUID ID. */
export async function getPhotoById(id: string): Promise<Photo | undefined> {
  const normalizedId = decodeURIComponent(id).trim();

  if (!normalizedId) {
    return undefined;
  }

  try {
    const item = await cmsFetch<Photo>(
      `/public/cms/photography/${encodeURIComponent(normalizedId)}`,
    );

    return isPhoto(item) ? normalizePhoto(item) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Keeps the old album API shape for any UI that still imports it.
 * Albums are now derived from tags instead of static data.
 */
export async function getAllAlbums(): Promise<PhotoAlbum[]> {
  const photos = await getAllPhotos();
  const tags = Array.from(
    new Set(photos.flatMap((photo) => photo.tags ?? [])),
  ).sort();

  return tags.map((tag) => {
    const albumPhotos = photos.filter((photo) => photo.tags?.includes(tag));

    return {
      id: tag,
      title: tag
        .split("-")
        .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
        .join(" "),
      coverPhotoId: albumPhotos[0]?.id ?? "",
      description: `Photography tagged with ${tag}.`,
      photos: albumPhotos,
    };
  });
}
