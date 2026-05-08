// data/certifications.ts
import type { CertificationItem } from "@/types/certification";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

type MaybeWrappedCertificationsResponse =
  | CertificationItem[]
  | {
      items?: CertificationItem[];
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

function isOptionalPositiveNumber(value: unknown): value is number | undefined {
  return (
    value === undefined ||
    (typeof value === "number" && Number.isFinite(value) && value > 0)
  );
}

function isCertificationItem(value: unknown): value is CertificationItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<Record<keyof CertificationItem, unknown>>;

  return (
    typeof item.id === "string" &&
    item.id.trim().length > 0 &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    typeof item.image === "string" &&
    item.image.trim().length > 0 &&
    isOptionalString(item.thumbnailUrl) &&
    isOptionalString(item.cardUrl) &&
    isOptionalString(item.fullUrl) &&
    isOptionalPositiveNumber(item.width) &&
    isOptionalPositiveNumber(item.height) &&
    isOptionalString(item.issuer) &&
    isOptionalString(item.year) &&
    isOptionalString(item.category)
  );
}

function normalizeOptionalString(
  value: string | undefined,
): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeCertificationItem(
  item: CertificationItem,
): CertificationItem {
  return {
    id: item.id.trim(),
    title: item.title.trim(),

    image: item.image.trim(),
    thumbnailUrl: normalizeOptionalString(item.thumbnailUrl),
    cardUrl: normalizeOptionalString(item.cardUrl),
    fullUrl: normalizeOptionalString(item.fullUrl),

    width: item.width,
    height: item.height,

    issuer: normalizeOptionalString(item.issuer),
    year: normalizeOptionalString(item.year),
    category: normalizeOptionalString(item.category),
  };
}

function normalizeCertificationsResponse(
  response: MaybeWrappedCertificationsResponse,
): CertificationItem[] {
  const rawItems = Array.isArray(response) ? response : response.items;

  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.filter(isCertificationItem).map(normalizeCertificationItem);
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
      `CMS certifications fetch failed: ${res.status} ${res.statusText}${
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
        message.includes("CMS certifications fetch failed: 404") ||
        message.includes("Cannot GET");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("CMS certifications fetch failed.");
}

export async function getAllCertifications(): Promise<CertificationItem[]> {
  const response = await cmsFetch<MaybeWrappedCertificationsResponse>(
    "/public/cms/certifications",
  );

  return normalizeCertificationsResponse(response);
}
