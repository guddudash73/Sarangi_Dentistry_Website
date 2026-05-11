"use client";

import PageBackground from "@/components/ui/PageBackground";
import ContactNoticeBar from "@/components/contact/ContactNoticeBar";
import AppointmentConfirmationModal from "@/components/book-appointment/AppointmentConfirmationModal";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ContactInfo } from "@/types/contact";
import type {
  PublicAppointmentGender,
  PublicAppointmentResponse,
  PublicAppointmentSubmitResult,
} from "@/types/appointment";
import { useMemo, useState } from "react";

type BookAppointmentPageClientProps = {
  data: ContactInfo;
};

type AgeMode = "AGE" | "DOB";

type FormState = {
  name: string;
  phone: string;
  appointmentDate: string;
  reason: string;
  address: string;
  gender: PublicAppointmentGender | "";
  ageMode: AgeMode;
  age: string;
  dob: string;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  appointmentDate: "",
  reason: "",
  address: "",
  gender: "",
  ageMode: "AGE",
  age: "",
  dob: "",
};

function todayIso(): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function getFieldError(
  fieldErrors: Record<string, string[]> | undefined,
  field: keyof FormState,
): string | undefined {
  return fieldErrors?.[field]?.[0];
}

export default function BookAppointmentPageClient({
  data,
}: BookAppointmentPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[]> | undefined
  >();
  const [generalError, setGeneralError] = useState("");
  const [createdAppointment, setCreatedAppointment] =
    useState<PublicAppointmentResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = useMemo(() => todayIso(), []);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "ageMode" && value === "AGE" ? { dob: "" } : {}),
      ...(field === "ageMode" && value === "DOB" ? { age: "" } : {}),
    }));

    setFieldErrors((current) => {
      if (!current?.[field]) return current;

      const next = { ...current };
      delete next[field];

      return next;
    });

    setGeneralError("");
  };

  const validateClientSide = (): boolean => {
    const errors: Record<string, string[]> = {};

    if (!form.name.trim()) errors.name = ["Name is required."];

    if (
      !form.phone.trim() ||
      form.phone.trim().replace(/\D/g, "").length < 10
    ) {
      errors.phone = ["Valid phone number is required."];
    }

    if (!form.appointmentDate) {
      errors.appointmentDate = ["Appointment date is required."];
    } else if (form.appointmentDate < minDate) {
      errors.appointmentDate = ["Appointment date cannot be in the past."];
    }

    if (!form.gender) errors.gender = ["Gender is required."];
    if (!form.reason.trim()) errors.reason = ["Reason is required."];
    if (!form.address.trim()) errors.address = ["Address is required."];

    if (form.ageMode === "AGE") {
      const ageNumber = Number(form.age);

      if (
        !form.age.trim() ||
        !Number.isInteger(ageNumber) ||
        ageNumber < 0 ||
        ageNumber > 130
      ) {
        errors.age = ["Valid age is required."];
      }
    }

    if (form.ageMode === "DOB") {
      if (!form.dob || !/^\d{4}-\d{2}-\d{2}$/.test(form.dob)) {
        errors.dob = ["Valid date of birth is required."];
      }
    }

    setFieldErrors(Object.keys(errors).length > 0 ? errors : undefined);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateClientSide()) return;

    try {
      setIsSubmitting(true);
      setGeneralError("");
      setCreatedAppointment(null);

      const ageNumber = Number(form.age);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          appointmentDate: form.appointmentDate,
          reason: form.reason.trim(),
          address: form.address.trim(),
          gender: form.gender,
          ...(form.ageMode === "AGE" ? { age: ageNumber } : {}),
          ...(form.ageMode === "DOB" ? { dob: form.dob } : {}),
        }),
      });

      const json = (await res
        .json()
        .catch(() => null)) as PublicAppointmentSubmitResult | null;

      if (!res.ok || !json?.ok) {
        setFieldErrors(json && !json.ok ? json.fieldErrors : undefined);
        setGeneralError(
          json && !json.ok
            ? json.message
            : "Unable to submit appointment request.",
        );
        return;
      }

      setCreatedAppointment(json.appointment);
      setForm(initialFormState);
      setFieldErrors(undefined);
    } catch {
      setGeneralError("Network error. Please try again or call the clinic.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className="min-h-screen overflow-x-clip text-secondary">
      {/* Full-screen confirmation modal */}
      {createdAppointment && (
        <AppointmentConfirmationModal
          appointment={createdAppointment}
          onClose={() => setCreatedAppointment(null)}
        />
      )}

      <section className="relative pb-24 pt-20 md:pt-28">
        <PageBackground />
        <ContactNoticeBar contactInfo={data} />

        <div className="relative mx-auto max-w-7xl px-5 pt-8 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="show"
            className="grid gap-12 lg:grid-cols-12 lg:items-start"
          >
            <div className="lg:sticky lg:top-32 lg:col-span-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="-ml-0.5 h-[1px] w-8 bg-primary/40" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                  Schedule Visit
                </span>
              </div>

              <h1
                data-cursor="invert"
                className="max-w-[12ch] text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.06em] text-secondary"
              >
                Let&apos;s find time for your smile
              </h1>

              <p className="mt-8 max-w-lg text-[1rem] leading-7 text-secondary-light sm:text-[1.06rem] sm:leading-8">
                Fill out the form to request an appointment. Our team will get
                back to you shortly to confirm the exact time and date that
                works best for you.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9e8e0] bg-white text-primary">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                      Need immediate assistance?
                    </div>
                    <a
                      href={`tel:${data.phone}`}
                      className="mt-1 block text-lg font-semibold text-secondary transition-colors hover:text-primary"
                    >
                      {data.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9e8e0] bg-white text-primary">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                      Clinic Hours
                    </div>

                    <div className="mt-1 space-y-0.5 text-sm font-medium text-secondary-light">
                      {data.hours.map((hour) => (
                        <div key={`${hour.label}-${hour.value}`}>
                          <span className="font-semibold text-secondary">
                            {hour.label}:
                          </span>{" "}
                          <span>{hour.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {data.addressLines.length > 0 ? (
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9e8e0] bg-white text-primary">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                        Clinic Location
                      </div>
                      <div className="mt-1 space-y-0.5 text-sm font-medium leading-6 text-secondary-light">
                        {data.addressLines.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[28px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,250,246,0.98))] p-5 shadow-[0_24px_60px_rgba(20,40,34,0.06)] backdrop-blur sm:p-6 md:p-7">
                {generalError ? (
                  <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {generalError}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField
                    label="Full Name"
                    error={getFieldError(fieldErrors, "name")}
                  >
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      required
                      className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all placeholder:text-[#a0c2af] focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Your full name"
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    error={getFieldError(fieldErrors, "phone")}
                  >
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      required
                      className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all placeholder:text-[#a0c2af] focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="+91 9999999999"
                    />
                  </FormField>

                  <FormField
                    label="Gender"
                    error={getFieldError(fieldErrors, "gender")}
                  >
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={(event) =>
                        updateField(
                          "gender",
                          event.target.value as PublicAppointmentGender | "",
                        )
                      }
                      required
                      className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                      <option value="UNKNOWN">Prefer not to say</option>
                    </select>
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
                    <FormField label="Age/DOB" error={undefined}>
                      <select
                        value={form.ageMode}
                        onChange={(event) =>
                          updateField("ageMode", event.target.value)
                        }
                        className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="AGE">Age</option>
                        <option value="DOB">DOB</option>
                      </select>
                    </FormField>

                    {form.ageMode === "AGE" ? (
                      <FormField
                        label="Patient Age"
                        error={getFieldError(fieldErrors, "age")}
                      >
                        <input
                          type="number"
                          min={0}
                          max={130}
                          value={form.age}
                          onChange={(event) =>
                            updateField("age", event.target.value)
                          }
                          required
                          className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all placeholder:text-[#a0c2af] focus:border-primary focus:ring-2 focus:ring-primary/20"
                          placeholder="Example: 32"
                        />
                      </FormField>
                    ) : (
                      <FormField
                        label="Date of Birth"
                        error={getFieldError(fieldErrors, "dob")}
                      >
                        <input
                          type="date"
                          value={form.dob}
                          onChange={(event) =>
                            updateField("dob", event.target.value)
                          }
                          required
                          className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </FormField>
                    )}
                  </div>

                  <FormField
                    label="Preferred Appointment Date"
                    error={getFieldError(fieldErrors, "appointmentDate")}
                  >
                    <input
                      type="date"
                      name="appointmentDate"
                      value={form.appointmentDate}
                      min={minDate}
                      onChange={(event) =>
                        updateField("appointmentDate", event.target.value)
                      }
                      required
                      className="w-full rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </FormField>

                  <FormField
                    label="Reason for Visit"
                    error={getFieldError(fieldErrors, "reason")}
                  >
                    <textarea
                      name="reason"
                      value={form.reason}
                      onChange={(event) =>
                        updateField("reason", event.target.value)
                      }
                      required
                      rows={4}
                      maxLength={500}
                      className="w-full resize-none rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all placeholder:text-[#a0c2af] focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us briefly about the concern or treatment you need..."
                    />
                  </FormField>

                  <FormField
                    label="Address"
                    error={getFieldError(fieldErrors, "address")}
                  >
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={(event) =>
                        updateField("address", event.target.value)
                      }
                      required
                      rows={3}
                      maxLength={500}
                      className="w-full resize-none rounded-[12px] border border-[#cfe3d8] bg-white px-3.5 py-2 text-sm text-secondary outline-none transition-all placeholder:text-[#a0c2af] focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Your address or locality"
                    />
                  </FormField>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative flex min-h-[44px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-primary px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(62,161,111,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-80"
                    >
                      {isSubmitting
                        ? "Sending Request..."
                        : "Request Appointment"}
                    </button>
                  </div>
                </form>

                <p className="mt-4 text-center text-xs leading-5 text-secondary-light">
                  This creates an appointment request only. A clinic team member
                  will confirm the final visit timing.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function FormField(props: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[9.5px] font-bold uppercase tracking-[0.15em] text-secondary-light">
        {props.label}
      </span>
      {props.children}
      {props.error ? (
        <span className="mt-1 block text-xs font-medium text-rose-600">
          {props.error}
        </span>
      ) : null}
    </label>
  );
}
