// website/data/contact.ts
import type { ContactInfo, ContactHour } from "@/types/contact";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

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

function isContactHour(value: unknown): value is ContactHour {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<Record<keyof ContactHour, unknown>>;

  return (
    typeof item.label === "string" &&
    item.label.trim().length > 0 &&
    typeof item.value === "string" &&
    item.value.trim().length > 0
  );
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isContactInfo(value: unknown): value is ContactInfo {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<Record<keyof ContactInfo, unknown>>;

  return (
    typeof item.noticeEnabled === "boolean" &&
    isOptionalString(item.noticeMessage) &&
    isStringArray(item.addressLines) &&
    typeof item.phone === "string" &&
    item.phone.trim().length > 0 &&
    typeof item.email === "string" &&
    item.email.trim().length > 0 &&
    typeof item.mapEmbedUrl === "string" &&
    item.mapEmbedUrl.trim().length > 0 &&
    typeof item.mapTitle === "string" &&
    item.mapTitle.trim().length > 0 &&
    Array.isArray(item.hours) &&
    item.hours.every(isContactHour) &&
    isStringArray(item.quickHighlights)
  );
}

function normalizeContactInfo(item: ContactInfo): ContactInfo {
  const noticeMessage = item.noticeMessage?.trim();

  return {
    noticeEnabled: item.noticeEnabled === true,
    ...(noticeMessage ? { noticeMessage } : {}),

    addressLines: item.addressLines.map((line) => line.trim()).filter(Boolean),
    phone: item.phone.trim(),
    email: item.email.trim(),
    mapEmbedUrl: item.mapEmbedUrl.trim(),
    mapTitle: item.mapTitle.trim(),
    hours: item.hours.map((hour) => ({
      label: hour.label.trim(),
      value: hour.value.trim(),
    })),
    quickHighlights: item.quickHighlights
      .map((highlight) => highlight.trim())
      .filter(Boolean),
  };
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
      `CMS contact fetch failed: ${res.status} ${res.statusText}${
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
        message.includes("CMS contact fetch failed: 404") ||
        message.includes("Cannot GET");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("CMS contact fetch failed.");
}

export async function getContactInfo(): Promise<ContactInfo> {
  const response = await cmsFetch<ContactInfo>("/public/cms/contact");

  if (!isContactInfo(response)) {
    throw new Error("CMS contact response shape is invalid.");
  }

  return normalizeContactInfo(response);
}
