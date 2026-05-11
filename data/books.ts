import type { Book } from "@/types/book";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

const UUID_LIKE_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type MaybeWrappedBooksResponse =
  | Book[]
  | {
      items?: Book[];
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

function normalizeOptionalString(
  value: string | undefined,
): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeSlug(value: string | undefined): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

function extractBookSlugFromPath(pathOrSlug: string | undefined): string {
  const trimmed = decodeURIComponent(pathOrSlug ?? "").trim();

  if (!trimmed) return "";

  const withoutQuery = trimmed.split("?")[0]?.split("#")[0] ?? trimmed;
  const withoutTrailingSlash = withoutQuery.replace(/\/+$/, "");

  if (withoutTrailingSlash.startsWith("/book/")) {
    return withoutTrailingSlash.replace(/^\/book\//, "").trim();
  }

  return withoutTrailingSlash.replace(/^\/+/, "").trim();
}

function buildBookPath(item: Book): string {
  const slugFromField = normalizeSlug(item.slug);
  const slugFromPath = extractBookSlugFromPath(item.path);

  const canonicalSlug =
    slugFromField ||
    (slugFromPath && !UUID_LIKE_RE.test(slugFromPath) ? slugFromPath : "") ||
    item.id.trim();

  return `/book/${encodeURIComponent(canonicalSlug)}`;
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || typeof value === "boolean";
}

function isOptionalRating(value: unknown): value is number | undefined {
  return (
    value === undefined ||
    (typeof value === "number" &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= 5)
  );
}

function isOptionalPositiveNumber(value: unknown): value is number | undefined {
  return (
    value === undefined ||
    (typeof value === "number" && Number.isFinite(value) && value > 0)
  );
}

function isBook(value: unknown): value is Book {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<Record<keyof Book, unknown>>;
  const testimonial = item.testimonial;

  const testimonialOk =
    testimonial === undefined ||
    (typeof testimonial === "object" &&
      testimonial !== null &&
      typeof (testimonial as { quote?: unknown }).quote === "string" &&
      (testimonial as { quote: string }).quote.trim().length > 0 &&
      isOptionalString((testimonial as { author?: unknown }).author));

  return (
    typeof item.id === "string" &&
    item.id.trim().length > 0 &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    isOptionalString(item.slug) &&
    isOptionalString(item.path) &&
    isOptionalString(item.subtitle) &&
    typeof item.coverImage === "string" &&
    item.coverImage.trim().length > 0 &&
    isOptionalString(item.thumbnailUrl) &&
    isOptionalString(item.cardUrl) &&
    isOptionalString(item.fullUrl) &&
    isOptionalPositiveNumber(item.width) &&
    isOptionalPositiveNumber(item.height) &&
    typeof item.publishedYear === "string" &&
    item.publishedYear.trim().length > 0 &&
    typeof item.genre === "string" &&
    item.genre.trim().length > 0 &&
    typeof item.synopsis === "string" &&
    item.synopsis.trim().length > 0 &&
    isOptionalString(item.excerpt) &&
    isOptionalString(item.buyLink) &&
    isOptionalBoolean(item.pinned) &&
    isOptionalRating(item.rating) &&
    testimonialOk &&
    typeof item.bodyHtml === "string" &&
    item.bodyHtml.trim().length > 0
  );
}

function normalizeBook(item: Book): Book {
  const id = item.id.trim();
  const slug = normalizeSlug(item.slug) || extractBookSlugFromPath(item.path);

  return {
    id,
    title: item.title.trim(),
    slug: slug || undefined,
    path: buildBookPath(item),

    subtitle: normalizeOptionalString(item.subtitle),

    coverImage: item.coverImage.trim(),
    thumbnailUrl: normalizeOptionalString(item.thumbnailUrl),
    cardUrl: normalizeOptionalString(item.cardUrl),
    fullUrl: normalizeOptionalString(item.fullUrl),

    width: item.width,
    height: item.height,

    publishedYear: item.publishedYear.trim(),
    genre: item.genre.trim(),
    synopsis: item.synopsis.trim(),
    excerpt: normalizeOptionalString(item.excerpt),
    buyLink: normalizeOptionalString(item.buyLink),

    pinned: item.pinned === true,

    rating: item.rating,
    testimonial: item.testimonial
      ? {
          quote: item.testimonial.quote.trim(),
          author: normalizeOptionalString(item.testimonial.author),
        }
      : undefined,

    bodyHtml: item.bodyHtml.trim(),
  };
}

function normalizeBooksResponse(response: MaybeWrappedBooksResponse): Book[] {
  const rawItems = Array.isArray(response) ? response : response.items;

  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.filter(isBook).map(normalizeBook);
}

function extractBookIdentifier(pathOrSlug: string): string {
  return extractBookSlugFromPath(pathOrSlug);
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
      `CMS books fetch failed: ${res.status} ${res.statusText}${
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
        message.includes("CMS books fetch failed: 404") ||
        message.includes("Cannot GET");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("CMS books fetch failed.");
}

export async function getAllBooks(): Promise<Book[]> {
  const response =
    await cmsFetch<MaybeWrappedBooksResponse>("/public/cms/books");

  return normalizeBooksResponse(response);
}

export async function getPinnedBook(): Promise<Book | undefined> {
  try {
    const item = await cmsFetch<Book>("/public/cms/books/pinned");

    return isBook(item) ? normalizeBook(item) : undefined;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (!message.includes("CMS books fetch failed: 404")) {
      throw error;
    }

    const items = await getAllBooks();
    return items.find((book) => book.pinned) ?? items[0];
  }
}

/**
 * Kept as getBookById so existing imports do not break.
 * It now accepts either UUID or SEO slug.
 */
export async function getBookById(idOrSlug: string): Promise<Book | undefined> {
  const normalizedIdentifier = extractBookIdentifier(idOrSlug);

  if (!normalizedIdentifier) {
    return undefined;
  }

  try {
    const item = await cmsFetch<Book>(
      `/public/cms/books/${encodeURIComponent(normalizedIdentifier)}`,
    );

    return isBook(item) ? normalizeBook(item) : undefined;
  } catch {
    return undefined;
  }
}

export async function getBookByPath(path: string): Promise<Book | undefined> {
  const identifier = extractBookIdentifier(path);

  if (!identifier) {
    return undefined;
  }

  return getBookById(identifier);
}
