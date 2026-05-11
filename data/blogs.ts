import type { BlogPost, BlogsResponse } from "@/types/blog";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

const UUID_LIKE_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type MaybeWrappedBlogsResponse =
  | BlogPost[]
  | BlogsResponse
  | {
      items?: BlogPost[];
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

function extractBlogSlugFromPath(pathOrSlug: string | undefined): string {
  const trimmed = decodeURIComponent(pathOrSlug ?? "").trim();

  if (!trimmed) return "";

  const withoutQuery = trimmed.split("?")[0]?.split("#")[0] ?? trimmed;
  const withoutTrailingSlash = withoutQuery.replace(/\/+$/, "");

  if (withoutTrailingSlash.startsWith("/blog/")) {
    return withoutTrailingSlash.replace(/^\/blog\//, "").trim();
  }

  return withoutTrailingSlash.replace(/^\/+/, "").trim();
}

function buildBlogPath(item: BlogPost): string {
  const slugFromField = normalizeSlug(item.slug);
  const slugFromPath = extractBlogSlugFromPath(item.path);

  const canonicalSlug =
    slugFromField ||
    (slugFromPath && !UUID_LIKE_RE.test(slugFromPath) ? slugFromPath : "") ||
    item.id.trim();

  return `/blog/${encodeURIComponent(canonicalSlug)}`;
}

function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<BlogPost>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.image === "string" &&
    typeof candidate.excerpt === "string"
  );
}

function normalizeBlogPost(item: BlogPost): BlogPost {
  const id = item.id.trim();
  const slug = normalizeSlug(item.slug) || extractBlogSlugFromPath(item.path);

  return {
    ...item,
    id,
    title: item.title.trim(),
    slug: slug || undefined,
    path: buildBlogPath(item),

    date: item.date?.trim() || "Recent",
    author: item.author?.trim() || "Sarangi Dentistry",
    category: item.category?.trim() || "Dental Care",

    image: item.image.trim(),
    thumbnailUrl: normalizeOptionalUrl(item.thumbnailUrl),
    cardUrl: normalizeOptionalUrl(item.cardUrl),
    fullUrl: normalizeOptionalUrl(item.fullUrl),

    width: item.width,
    height: item.height,

    excerpt: item.excerpt.trim(),
    readTime: item.readTime?.trim() || "5 min",
    featured: item.featured,
    bodyHtml: item.bodyHtml || "",
  };
}

function normalizeBlogsResponse(
  response: MaybeWrappedBlogsResponse,
): BlogPost[] {
  const items = Array.isArray(response) ? response : response.items;

  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(isBlogPost).map(normalizeBlogPost);
}

function extractBlogIdentifier(pathOrSlug: string): string {
  return extractBlogSlugFromPath(pathOrSlug);
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
      `CMS blog fetch failed: ${res.status} ${res.statusText}${
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
        message.includes("CMS blog fetch failed: 404") ||
        message.includes("Cannot GET");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("CMS blog fetch failed.");
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const response =
    await cmsFetch<MaybeWrappedBlogsResponse>("/public/cms/blogs");
  return normalizeBlogsResponse(response);
}

export async function getFeaturedBlog(): Promise<BlogPost | undefined> {
  try {
    const item = await cmsFetch<BlogPost | null>("/public/cms/blogs/featured");

    if (item && isBlogPost(item)) {
      return normalizeBlogPost(item);
    }
  } catch {
    // Fall back to list-based featured selection.
  }

  const items = await getAllBlogs();
  return items.find((item) => item.featured) ?? items[0];
}

/**
 * Kept as getBlogById so existing imports do not break.
 * It now accepts either UUID or SEO slug.
 */
export async function getBlogById(
  idOrSlug: string,
): Promise<BlogPost | undefined> {
  const normalizedIdentifier = extractBlogIdentifier(idOrSlug);

  if (!normalizedIdentifier) {
    return undefined;
  }

  try {
    const item = await cmsFetch<BlogPost>(
      `/public/cms/blogs/${encodeURIComponent(normalizedIdentifier)}`,
    );

    return isBlogPost(item) ? normalizeBlogPost(item) : undefined;
  } catch {
    return undefined;
  }
}

export async function getBlogByPath(
  path: string,
): Promise<BlogPost | undefined> {
  const identifier = extractBlogIdentifier(path);

  if (!identifier) {
    return undefined;
  }

  return getBlogById(identifier);
}

export async function getRelatedBlogs(
  currentId: string,
  limit = 2,
): Promise<BlogPost[]> {
  const items = await getAllBlogs();

  return items
    .filter((item) => item.id !== currentId)
    .slice(0, Math.max(0, limit));
}
