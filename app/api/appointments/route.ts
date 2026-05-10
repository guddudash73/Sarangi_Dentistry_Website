import { NextResponse } from "next/server";
import { submitAppointmentRequest } from "@/data/appointment";
import type { PublicCreateAppointmentInput } from "@/types/appointment";

export const dynamic = "force-dynamic";

type FieldErrors = Record<string, string[]>;

function isValidGender(
  value: unknown,
): value is PublicCreateAppointmentInput["gender"] {
  return (
    value === "MALE" ||
    value === "FEMALE" ||
    value === "OTHER" ||
    value === "UNKNOWN"
  );
}

function jsonError(message: string, status: number, fieldErrors?: FieldErrors) {
  return NextResponse.json(
    {
      ok: false,
      message,
      ...(fieldErrors ? { fieldErrors } : {}),
    },
    { status },
  );
}

function isValidAppointmentBody(
  value: unknown,
): value is PublicCreateAppointmentInput {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<
    Record<keyof PublicCreateAppointmentInput, unknown>
  >;

  const hasDob = typeof item.dob === "string" && item.dob.trim().length > 0;
  const hasAge = typeof item.age === "number" && Number.isFinite(item.age);

  return (
    typeof item.name === "string" &&
    item.name.trim().length > 0 &&
    typeof item.phone === "string" &&
    item.phone.trim().length >= 7 &&
    typeof item.appointmentDate === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.appointmentDate) &&
    typeof item.reason === "string" &&
    item.reason.trim().length > 0 &&
    typeof item.address === "string" &&
    item.address.trim().length > 0 &&
    isValidGender(item.gender) &&
    ((hasDob && !hasAge) || (!hasDob && hasAge))
  );
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  if (!isValidAppointmentBody(body)) {
    return jsonError("Please fill all appointment fields correctly.", 400);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const requestedDate = new Date(`${body.appointmentDate}T00:00:00`);

  if (Number.isNaN(requestedDate.getTime()) || requestedDate < today) {
    return jsonError("Appointment date cannot be in the past.", 400, {
      appointmentDate: ["Appointment date cannot be in the past."],
    });
  }

  try {
    const appointment = await submitAppointmentRequest({
      name: body.name.trim(),
      phone: body.phone.trim(),
      appointmentDate: body.appointmentDate,
      reason: body.reason.trim(),
      address: body.address.trim(),
      gender: body.gender,
      ...(body.dob ? { dob: body.dob.trim() } : {}),
      ...(typeof body.age === "number" ? { age: body.age } : {}),
    });

    return NextResponse.json(
      {
        ok: true,
        appointment,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unable to submit appointment request.";

    const fieldErrors =
      error && typeof error === "object" && "fieldErrors" in error
        ? (error as { fieldErrors?: FieldErrors }).fieldErrors
        : undefined;

    return jsonError(message, 400, fieldErrors);
  }
}
