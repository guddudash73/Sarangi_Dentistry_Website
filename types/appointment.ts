export type PublicAppointmentGender = "MALE" | "FEMALE" | "OTHER" | "UNKNOWN";

export type PublicCreateAppointmentInput = {
  name: string;
  phone: string;
  appointmentDate: string;
  reason: string;
  address: string;
  gender: PublicAppointmentGender;
  dob?: string;
  age?: number;
};

export type PublicAppointmentResponse = {
  id: string;
  name: string;
  phone: string;
  normalizedPhone: string;
  appointmentDate: string;
  reason: string;
  address: string;
  gender?: PublicAppointmentGender;
  dob?: string;
  age?: number;
  status:
    | "NEW"
    | "REVIEWING"
    | "PATIENT_LINKED"
    | "VISIT_CREATED"
    | "CANCELLED"
    | "ARCHIVED";
  createdAt: number;
  updatedAt: number;
  createdBy: "WEBSITE" | "STAFF";
};

export type PublicAppointmentSubmitResult =
  | {
      ok: true;
      appointment: PublicAppointmentResponse;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
