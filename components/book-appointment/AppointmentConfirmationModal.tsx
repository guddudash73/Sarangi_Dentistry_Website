// components/book-appointment/AppointmentConfirmationModal.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PublicAppointmentResponse } from "@/types/appointment";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  // iso = "YYYY-MM-DD"
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatRefDate(): string {
  const now = new Date();
  return `${getOrdinal(now.getDate())} ${now.toLocaleString("en-IN", { month: "long" })} ${now.getFullYear()}`;
}

// ─── sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-emerald-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-rose-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

type Props = {
  appointment: PublicAppointmentResponse;
  onClose: () => void;
};

export default function AppointmentConfirmationModal({
  appointment,
  onClose,
}: Props) {
  // Lock body scroll + stop Lenis while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Stop Lenis smooth scroll so overlay can scroll
    window.dispatchEvent(new CustomEvent("lenis:stop"));
    return () => {
      document.body.style.overflow = original;
      window.dispatchEvent(new CustomEvent("lenis:start"));
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const [isDownloading, setIsDownloading] = useState(false);

  const patientFirstName = appointment.name.split(" ")[0];
  const formattedDate = formatDate(appointment.appointmentDate);
  const refDate = formatRefDate();


  const DOS = [
    "Arrive at the clinic by 10:00 AM or earlier to secure a better queue position.",
    "Carry a valid government-issued photo ID (Aadhar, PAN, Passport, etc.).",
    "Bring any previous dental records, X-rays, or prescriptions if available.",
    "Inform the reception immediately upon arrival to confirm your appointment slot.",
    "Maintain good oral hygiene — brush and rinse before visiting the clinic.",
    "Notify us at least 24 hours in advance if you need to reschedule.",
    "Wear comfortable clothing; dental treatments may take 30–90 minutes.",
    "Parents/guardians must accompany patients under 18 years of age.",
  ];

  const DONTS = [
    "Do not consume heavy meals within 1 hour before a dental procedure.",
    "Do not smoke, chew tobacco, or consume alcohol on the day of treatment.",
    "Do not ignore prescribed medications — take them as directed before your visit.",
    "Do not arrive late — our clinic operates on a first-come, first-served basis.",
    "Do not bring large groups; only one companion is allowed in the treatment area.",
    "Do not self-medicate or apply any home remedies on dental pain before visiting.",
    "Do not cancel your appointment on the same day without prior notice.",
  ];

  // Download as A4 PDF — uses html2canvas + jsPDF (no print dialog)
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      // Append to DOM first so the browser establishes a layout context
      const container = document.createElement("div");
      document.body.appendChild(container);

      // Set styles individually AFTER append so getComputedStyle() reliably
      // returns 'absolute' when html2canvas checks the container position
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "794px";
      container.style.background = "#fff";
      container.style.zIndex = "-1";
      container.innerHTML = buildPrintHtml(appointment, patientFirstName, formattedDate, refDate, DOS, DONTS);

      // Force a synchronous reflow so computed styles are settled
      // before html2canvas reads them
      void container.offsetHeight;

      try {
        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 794,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();
        // 12 mm margin on all four sides
        const margin = 12;
        const usableW = pdfW - margin * 2;
        const usableH = pdfH - margin * 2;
        const ratio = usableW / canvas.width;
        const scaledH = canvas.height * ratio;
        if (scaledH <= usableH) {
          pdf.addImage(imgData, "PNG", margin, margin, usableW, scaledH);
        } else {
          const s = usableH / scaledH;
          pdf.addImage(imgData, "PNG", margin, margin, usableW * s, usableH);
        }
        pdf.save(`Sarangi-Appointment-${appointment.id.slice(0, 8).toUpperCase()}.pdf`);
      } finally {
        document.body.removeChild(container);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {/* Fixed overlay — scrolls independently from the page */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] bg-[#0c1a14]/70 backdrop-blur-md"
        style={{ overflowY: "scroll" }}
        // data-lenis-prevent stops Lenis from hijacking scroll inside this element
        data-lenis-prevent
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        aria-modal
        role="dialog"
        aria-label="Appointment Confirmation"
      >
        {/* Inner centering wrapper — not a click target */}
        <div className="flex min-h-full items-start justify-center px-3 py-6 sm:px-4 sm:py-10 md:py-14">
        {/* Document card */}
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.28)] ring-1 ring-black/8 sm:rounded-[32px]"
        >

          {/* ── Clinic letterhead ──────────────────── */}
          <div className="relative overflow-hidden bg-[#1e3d32] px-6 py-7 sm:px-10 sm:py-9">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 left-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />

            <div className="relative flex items-start justify-between gap-4">
              {/* Left: clinic identity */}
              <div>
                <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400/80 sm:text-[11px]">
                  Official Appointment Notice
                </div>
                <h1 className="text-[1.55rem] font-black tracking-[-0.04em] text-white sm:text-[1.9rem]">
                  Sarangi Dentistry
                </h1>
                <p className="mt-1.5 text-xs leading-5 text-white/55 sm:text-[13px]">
                  Multi-Specialty Dental Clinic &nbsp;·&nbsp; Bhubaneswar, Odisha
                </p>
              </div>

              {/* Right: Reference box */}
              <div className="shrink-0 text-right">
                <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/45 sm:text-[10px]">
                  Ref No.
                </div>
                <div className="mt-0.5 font-mono text-xs font-semibold text-white/80 sm:text-sm">
                  {appointment.id.slice(0, 12).toUpperCase()}
                </div>
                <div className="mt-2 text-[9px] text-white/40 sm:text-[10px]">
                  Issued: {refDate}
                </div>
              </div>
            </div>

            {/* Divider strip */}
            <div className="relative mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/12" />
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/25">
                <svg className="h-3.5 w-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="h-px flex-1 bg-white/12" />
            </div>

            <p className="relative mt-4 text-sm font-medium leading-6 text-white/70 sm:text-[15px]">
              Your appointment request has been received and is pending confirmation.
            </p>
          </div>

          {/* ── Body ───────────────────────────────── */}
          <div className="divide-y divide-[#e8f0ec] px-6 sm:px-10">

            {/* Salutation */}
            <div className="py-7 sm:py-8">
              <p className="text-[15px] leading-7 text-[#334d42] sm:text-base">
                Dear{" "}
                <span className="font-bold text-[#1e3d32]">{patientFirstName}</span>,
              </p>
              <p className="mt-3 text-[14px] leading-7 text-[#4a6558] sm:text-[15px]">
                We are pleased to confirm that your appointment request at{" "}
                <span className="font-semibold text-[#1e3d32]">Sarangi Dentistry</span>{" "}
                has been successfully registered for the date indicated below. Our
                clinical team will reach out to you for final confirmation.
              </p>
            </div>

            {/* Appointment details card */}
            <div className="py-7 sm:py-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#6a8a7b] sm:text-[11px]">
                Appointment Details
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#d8ebe3] bg-[#f4faf7]">
                <div className="grid divide-y divide-[#daeae2] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <DetailRow label="Patient Name" value={appointment.name} accent />
                  <DetailRow label="Contact Number" value={appointment.phone} />
                </div>
                <div className="border-t border-[#daeae2]">
                  <DetailRow label="Requested Appointment Date" value={formattedDate} accent highlight />
                </div>
                <div className="border-t border-[#daeae2]">
                  <DetailRow label="Reason for Visit" value={appointment.reason} />
                </div>
              </div>

              {/* First-come first-served notice */}
              <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-[13px] leading-6 text-amber-800 sm:text-[14px]">
                  <span className="font-bold">Important:</span> Our clinic operates on a{" "}
                  <span className="font-bold">First Come, First Served</span> basis. We
                  strongly advise you to arrive by{" "}
                  <span className="font-bold">10:00 AM</span> to secure an early position
                  and reduce waiting time. Please confirm your appointment at the reception
                  desk upon arrival.
                </p>
              </div>

              <p className="mt-4 text-[13px] leading-6 text-[#4a6558] sm:text-[14px]">
                Our team will contact you on{" "}
                <span className="font-bold text-[#1e3d32]">{appointment.phone}</span> to
                confirm the final visit timing. Please ensure your phone is reachable.
              </p>
            </div>

            {/* Do's and Don'ts */}
            <div className="py-7 sm:py-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#6a8a7b] sm:text-[11px]">
                Visit Guidelines — Do&rsquo;s &amp; Don&rsquo;ts
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {/* DO's */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
                      Please Do
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {DOS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[12.5px] leading-5 text-emerald-900 sm:text-[13px]">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DON'Ts */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100">
                      <svg className="h-4 w-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-700">
                      Please Don&rsquo;t
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {DONTS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[12.5px] leading-5 text-rose-900 sm:text-[13px]">
                        <CrossIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Clinic info */}
            <div className="py-7 sm:py-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#6a8a7b] sm:text-[11px]">
                Clinic Information
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <InfoTile
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  label="Clinic Hours"
                  value={
                    <>
                      <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
                      <span>Sunday: 10:00 AM – 2:00 PM</span>
                    </>
                  }
                />
                <InfoTile
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  label="Contact"
                  value={<span>+91 9938942846</span>}
                />
                <InfoTile
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  label="Location"
                  value={
                    <>
                      <span>7RGM+H8G Stalwart Complex,</span>
                      <span>Bhouma Nagar, Bhubaneswar</span>
                    </>
                  }
                />
              </div>
            </div>

            {/* Closing note */}
            <div className="py-7 sm:py-8">
              <p className="text-[13px] italic leading-7 text-[#4a6558] sm:text-[14px]">
                We look forward to welcoming you to Sarangi Dentistry. If you have
                any questions or need to reschedule, please do not hesitate to call
                us directly. We are committed to making your visit as comfortable and
                seamless as possible.
              </p>
              <p className="mt-5 text-[13px] leading-6 text-[#4a6558] sm:text-[14px]">
                Warm regards,
                <br />
                <span className="mt-1 block font-bold text-[#1e3d32]">
                  The Sarangi Dentistry Clinical Team
                </span>
              </p>

              {/* Reference ID footer */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#d8ebe3]" />
                <span className="font-mono text-[10px] text-[#8aad9a]">
                  APPOINTMENT REF: {appointment.id.toUpperCase()}
                </span>
                <div className="h-px flex-1 bg-[#d8ebe3]" />
              </div>
            </div>
          </div>

          {/* ── Footer action ──────────────────────── */}
          <div className="sticky bottom-0 flex flex-col items-center gap-3 border-t border-[#e0ede6] bg-white/95 px-6 py-5 backdrop-blur-sm sm:flex-row sm:justify-between sm:px-10">
            <p className="text-center text-[11px] leading-5 text-[#7a9a8a] sm:text-left sm:text-xs">
              This is not a final confirmation. Our team will call you to confirm.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[16px] border border-[#d8ebe3] bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#1e3d32] shadow-[0_4px_12px_rgba(30,61,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1e3d32]/30 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
              >
                {isDownloading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#1e3d32] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(30,61,50,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#274f40] sm:w-auto"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Understood — Close
              </button>
            </div>
          </div>

          {/* Close ✕ button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
            aria-label="Close"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
        </div>{/* end inner centering wrapper */}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── A4 print HTML builder ────────────────────────────────────────────────────

function buildPrintHtml(
  appointment: PublicAppointmentResponse,
  firstName: string,
  formattedDate: string,
  refDate: string,
  dos: string[],
  donts: string[],
): string {
  const dosHtml = dos.map(d => `<li>&#10003;&nbsp; ${d}</li>`).join("");
  const dontsHtml = donts.map(d => `<li>&#10007;&nbsp; ${d}</li>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Appointment Confirmation — Sarangi Dentistry</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 8.5pt; color: #1a2e26; background: #fff; padding: 22px 26px; }
  .header { background: #1e3d32; color: #fff; padding: 12px 16px 10px; display: flex; justify-content: space-between; align-items: flex-start; border-radius: 5px 5px 0 0; }
  .header h1 { font-size: 15pt; letter-spacing: -0.5px; margin-bottom: 1px; }
  .header .sub { font-size: 7pt; opacity: 0.55; margin-top: 2px; }
  .header .label { font-size: 6pt; text-transform: uppercase; letter-spacing: 2px; color: #7ecfb0; margin-bottom: 2px; }
  .ref { text-align: right; }
  .ref .refnum { font-family: monospace; font-size: 7.5pt; color: rgba(255,255,255,0.82); }
  .ref .issued { font-size: 6pt; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .body { border: 1px solid #d0e6d8; border-top: none; padding: 10px 14px; }
  h2 { font-size: 6.5pt; text-transform: uppercase; letter-spacing: 2px; color: #6a8a7b; margin: 8px 0 4px; }
  .salutation { font-size: 8.5pt; line-height: 1.5; margin-bottom: 6px; }
  .salutation p + p { margin-top: 3px; }
  table { width: 100%; border-collapse: collapse; margin-top: 4px; font-size: 8pt; }
  table td { border: 1px solid #d0e6d8; padding: 4px 7px; }
  table td.lbl { font-size: 6pt; text-transform: uppercase; letter-spacing: 1.5px; color: #8aad9a; width: 32%; background: #f4faf7; }
  table td.val { font-weight: 600; }
  .date-row { background: #eaf7f0; }
  .notice { border: 1px solid #fcd34d; background: #fefce8; border-radius: 3px; padding: 6px 9px; margin: 6px 0; font-size: 8pt; line-height: 1.45; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 5px; }
  .dos { border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 3px; padding: 6px 8px; }
  .donts { border: 1px solid #fecaca; background: #fff1f2; border-radius: 3px; padding: 6px 8px; }
  .dos h3 { color: #15803d; font-size: 6.5pt; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
  .donts h3 { color: #be123c; font-size: 6.5pt; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
  ul { padding-left: 2px; list-style: none; }
  li { font-size: 7.5pt; line-height: 1.35; margin-bottom: 2.5px; }
  .info-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; margin-top: 5px; }
  .info-box { border: 1px solid #d0e6d8; background: #f4faf7; border-radius: 3px; padding: 5px 7px; font-size: 7.5pt; }
  .info-box .ilbl { font-size: 6pt; text-transform: uppercase; letter-spacing: 1.5px; color: #8aad9a; margin-bottom: 2px; }
  .closing { margin-top: 8px; font-size: 8pt; line-height: 1.5; font-style: italic; color: #334d42; }
  .signature { margin-top: 5px; font-size: 8pt; }
  .sig-name { font-weight: 700; font-style: normal; margin-top: 1px; }
  .refline { margin-top: 8px; text-align: center; font-family: monospace; font-size: 6.5pt; color: #8aad9a; border-top: 1px solid #d0e6d8; padding-top: 5px; }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="label">Official Appointment Notice</div>
    <h1>Sarangi Dentistry</h1>
    <div class="sub">Multi-Specialty Dental Clinic &middot; Bhubaneswar, Odisha</div>
  </div>
  <div class="ref">
    <div class="label">Ref No.</div>
    <div class="refnum">${appointment.id.slice(0,12).toUpperCase()}</div>
    <div class="issued">Issued: ${refDate}</div>
  </div>
</div>
<div class="body">
  <div class="salutation"><p>Dear <strong>${firstName}</strong>,</p><p style="margin-top:6px">We are pleased to confirm that your appointment request at <strong>Sarangi Dentistry</strong> has been successfully registered. Our clinical team will contact you for final confirmation.</p></div>
  <h2>Appointment Details</h2>
  <table>
    <tr><td class="lbl">Patient Name</td><td class="val">${appointment.name}</td><td class="lbl">Contact Number</td><td class="val">${appointment.phone}</td></tr>
    <tr class="date-row"><td class="lbl">Appointment Date</td><td class="val" colspan="3">${formattedDate}</td></tr>
    <tr><td class="lbl">Reason for Visit</td><td class="val" colspan="3">${appointment.reason}</td></tr>
  </table>
  <div class="notice"><strong>Important:</strong> Our clinic operates on a <strong>First Come, First Served</strong> basis. Please arrive by <strong>10:00 AM</strong> to secure an early position. Confirm at the reception desk upon arrival. Our team will contact you on <strong>${appointment.phone}</strong>.</div>
  <h2>Visit Guidelines</h2>
  <div class="grid2">
    <div class="dos"><h3>&#10003; Please Do</h3><ul>${dosHtml}</ul></div>
    <div class="donts"><h3>&#10007; Please Don't</h3><ul>${dontsHtml}</ul></div>
  </div>
  <h2>Clinic Information</h2>
  <div class="info-grid">
    <div class="info-box"><div class="ilbl">Clinic Hours</div>Mon–Sat: 10:00 AM – 8:00 PM<br/>Sunday: 10:00 AM – 2:00 PM</div>
    <div class="info-box"><div class="ilbl">Contact</div>+91 9938942846</div>
    <div class="info-box"><div class="ilbl">Location</div>7RGM+H8G Stalwart Complex,<br/>Bhouma Nagar, Bhubaneswar</div>
  </div>
  <p class="closing">We look forward to welcoming you to Sarangi Dentistry. If you need to reschedule, please call us at least 24 hours in advance.</p>
  <p class="signature">Warm regards,<br/><span class="sig-name">The Sarangi Dentistry Clinical Team</span></p>
  <div class="refline">APPOINTMENT REF: ${appointment.id.toUpperCase()}</div>
</div>
</body>
</html>`;
}

// ─── tiny helper sub-components ───────────────────────────────────────────────

function DetailRow({
  label,
  value,
  accent = false,
  highlight = false,
  badge = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  highlight?: boolean;
  badge?: boolean;
}) {
  return (
    <div className={`px-5 py-3.5 ${highlight ? "bg-emerald-50" : ""}`}>
      <div className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#8aad9a] sm:text-[10px]">
        {label}
      </div>
      {badge ? (
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {value}
        </span>
      ) : (
        <div
          className={`mt-1 text-[13px] font-semibold leading-6 sm:text-[14px] ${
            highlight
              ? "text-[#145033]"
              : accent
                ? "text-[#1e3d32]"
                : "text-[#334d42]"
          }`}
        >
          {value}
        </div>
      )}
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#d8ebe3] bg-[#f4faf7] p-4">
      <div className="flex items-center gap-2.5 text-[#4a8a68]">{icon}</div>
      <div className="mt-2.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#8aad9a] sm:text-[10px]">
        {label}
      </div>
      <div className="mt-1 flex flex-col gap-0.5 text-[12px] font-medium leading-5 text-[#1e3d32] sm:text-[13px]">
        {value}
      </div>
    </div>
  );
}
