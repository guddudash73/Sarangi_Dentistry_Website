import type { ProcedureItem, ProceduresResponse } from "@/types/procedure";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

const UUID_LIKE_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type MaybeWrappedProceduresResponse =
  | ProceduresResponse
  | {
      items?: ProcedureItem[];
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

function buildBaseCandidates() {
  const normalized = DCM_CMS_API_BASE_URL.replace(/\/+$/, "");

  const candidates = [normalized];

  if (normalized.endsWith("/api")) {
    candidates.push(normalized.slice(0, -4));
  } else {
    candidates.push(`${normalized}/api`);
  }

  return [...new Set(candidates)];
}

function normalizeOptionalUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeSlug(value: string | undefined): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

function extractProcedureSlugFromPath(pathOrSlug: string | undefined): string {
  const trimmed = decodeURIComponent(pathOrSlug ?? "").trim();

  if (!trimmed) return "";

  const withoutQuery = trimmed.split("?")[0]?.split("#")[0] ?? trimmed;
  const withoutTrailingSlash = withoutQuery.replace(/\/+$/, "");

  if (withoutTrailingSlash.startsWith("/procedure/")) {
    return withoutTrailingSlash.replace(/^\/procedure\//, "").trim();
  }

  return withoutTrailingSlash.replace(/^\/+/, "").trim();
}

function buildProcedurePath(item: ProcedureItem): string {
  const slugFromField = normalizeSlug(item.slug);
  const slugFromPath = extractProcedureSlugFromPath(item.path);

  const canonicalSlug =
    slugFromField ||
    (slugFromPath && !UUID_LIKE_RE.test(slugFromPath) ? slugFromPath : "") ||
    item.id.trim();

  return `/procedure/${encodeURIComponent(canonicalSlug)}`;
}

function normalizeProcedureItem(item: ProcedureItem): ProcedureItem {
  const id = item.id.trim();
  const slug =
    normalizeSlug(item.slug) || extractProcedureSlugFromPath(item.path);

  return {
    ...item,
    id,
    title: item.title.trim(),
    slug: slug || undefined,
    path: buildProcedurePath(item),

    image: item.image.trim(),
    thumbnailUrl: normalizeOptionalUrl(item.thumbnailUrl),
    cardUrl: normalizeOptionalUrl(item.cardUrl),
    fullUrl: normalizeOptionalUrl(item.fullUrl),

    width: item.width,
    height: item.height,

    shortText: item.shortText.trim(),
    longDescription: item.longDescription.trim(),
    steps: Array.isArray(item.steps) ? item.steps : [],
    faqs: Array.isArray(item.faqs) ? item.faqs : [],
    bodyHtml: item.bodyHtml || "",
  };
}

function normalizeProceduresResponse(
  response: MaybeWrappedProceduresResponse,
): ProcedureItem[] {
  const items = Array.isArray(response) ? response : response.items;

  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(normalizeProcedureItem);
}

function extractProcedureIdentifier(pathOrSlug: string): string {
  return extractProcedureSlugFromPath(pathOrSlug);
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
      `CMS fetch failed: ${res.status} ${res.statusText}${body ? ` - ${body}` : ""}`,
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
        message.includes("CMS fetch failed: 404") ||
        message.includes("Cannot GET");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("CMS fetch failed.");
}

export async function getAllProcedures(): Promise<ProcedureItem[]> {
  const response = await cmsFetch<MaybeWrappedProceduresResponse>(
    "/public/cms/procedures",
  );

  return normalizeProceduresResponse(response);
}

/**
 * Kept as getProcedureById so existing imports do not break.
 * It now accepts either a UUID or an SEO slug.
 */
export async function getProcedureById(
  idOrSlug: string,
): Promise<ProcedureItem | undefined> {
  const normalizedIdentifier = extractProcedureIdentifier(idOrSlug);

  if (!normalizedIdentifier) {
    return undefined;
  }

  try {
    const item = await cmsFetch<ProcedureItem>(
      `/public/cms/procedures/${encodeURIComponent(normalizedIdentifier)}`,
    );

    return normalizeProcedureItem(item);
  } catch {
    return undefined;
  }
}

export async function getProcedureByPath(
  path: string,
): Promise<ProcedureItem | undefined> {
  const identifier = extractProcedureIdentifier(path);

  if (!identifier) {
    return undefined;
  }

  return getProcedureById(identifier);
}

export async function getRelatedProcedures(
  currentId: string,
  limit = 3,
): Promise<ProcedureItem[]> {
  const items = await getAllProcedures();

  return items
    .filter((item) => item.id !== currentId)
    .slice(0, Math.max(0, limit));
}
