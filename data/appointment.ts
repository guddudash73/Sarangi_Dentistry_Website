// website/data/appointment.ts
import type {
  PublicAppointmentResponse,
  PublicCreateAppointmentInput,
} from "@/types/appointment";

const DCM_CMS_API_BASE_URL =
  process.env.DCM_CMS_API_BASE_URL?.trim() || "http://localhost:4000/api";

const CMS_PUBLIC_API_KEY = process.env.CMS_PUBLIC_API_KEY?.trim();

type DcmErrorResponse = {
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  traceId?: string;
};

function getCmsHeaders(): HeadersInit {
  if (!CMS_PUBLIC_API_KEY) {
    throw new Error("CMS_PUBLIC_API_KEY is not set");
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
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

function isAppointmentResponse(
  value: unknown,
): value is PublicAppointmentResponse {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<
    Record<keyof PublicAppointmentResponse, unknown>
  >;

  const validDob = item.dob === undefined || typeof item.dob === "string";
  const validAge = item.age === undefined || typeof item.age === "number";

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.phone === "string" &&
    typeof item.normalizedPhone === "string" &&
    typeof item.appointmentDate === "string" &&
    typeof item.reason === "string" &&
    typeof item.address === "string" &&
    validDob &&
    validAge &&
    typeof item.status === "string" &&
    typeof item.createdAt === "number" &&
    typeof item.updatedAt === "number" &&
    typeof item.createdBy === "string"
  );
}

function normalizeAppointmentInput(
  input: PublicCreateAppointmentInput,
): PublicCreateAppointmentInput {
  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    appointmentDate: input.appointmentDate.trim(),
    reason: input.reason.trim(),
    address: input.address.trim(),
    ...(input.dob ? { dob: input.dob.trim() } : {}),
    ...(typeof input.age === "number" ? { age: input.age } : {}),
  };
}

async function postAppointmentFromBase(
  baseUrl: string,
  input: PublicCreateAppointmentInput,
): Promise<PublicAppointmentResponse> {
  const res = await fetch(`${baseUrl}/public/appointments`, {
    method: "POST",
    headers: getCmsHeaders(),
    body: JSON.stringify(normalizeAppointmentInput(input)),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => null)) as
    | PublicAppointmentResponse
    | DcmErrorResponse
    | null;

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data && data.message
        ? data.message
        : `Appointment request failed: ${res.status} ${res.statusText}`;

    const err = new Error(message);

    (err as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors =
      data && typeof data === "object" && "fieldErrors" in data
        ? data.fieldErrors
        : undefined;

    throw err;
  }

  if (!isAppointmentResponse(data)) {
    throw new Error("Appointment response shape is invalid.");
  }

  return data;
}

export async function submitAppointmentRequest(
  input: PublicCreateAppointmentInput,
): Promise<PublicAppointmentResponse> {
  const candidates = buildBaseCandidates();
  let lastError: unknown = null;

  for (const baseUrl of candidates) {
    try {
      return await postAppointmentFromBase(baseUrl, input);
    } catch (error) {
      lastError = error;

      const message = error instanceof Error ? error.message : String(error);

      const is404 =
        message.includes("Appointment request failed: 404") ||
        message.includes("Cannot POST");

      if (!is404) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Appointment request failed.");
}
