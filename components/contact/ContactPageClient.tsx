"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ContactInfo } from "@/types/contact";

type ContactPageClientProps = {
  data: ContactInfo;
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function DetailIcon({ type }: { type: "location" | "phone" | "email" }) {
  if (type === "location") {
    return (
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
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  }

  if (type === "phone") {
    return (
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
    );
  }

  return (
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: EASE,
      },
    },
  };

  return (
    <main className="min-h-screen overflow-x-clip   text-secondary">
      <section className="relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-4rem] top-[-2rem] h-72 w-72 rounded-full bg-accent-soft/30 blur-3xl" />
          <div className="absolute right-[-5rem] top-[10%] h-80 w-80 rounded-full bg-accent-soft/30 blur-3xl" />
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,150,106,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,150,106,0.025)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "url('/assets/sketch_it_sarangi.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-6 md:px-10 md:pb-18 lg:px-16 lg:pb-20">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="show"
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/84 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary-hover shadow-[0_10px_24px_rgba(20,40,34,0.05)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-hover" />
                Contact & Appointments
              </div>

              <div className="max-w-5xl">
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-secondary-light">
                  Sarangi Dentistry · Bhubaneswar
                </div>

                <h1 className="max-w-[9ch] text-[clamp(3.2rem,6vw,6.8rem)] font-bold leading-[0.84] tracking-[-0.075em] text-secondary">
                  Contact designed to feel as calm as the clinic itself
                </h1>

                <p className="mt-8 max-w-3xl text-[1rem] leading-7 text-secondary-light sm:text-[1.06rem] sm:leading-8 md:text-[1.12rem]">
                  Reach out for appointments, directions, and treatment guidance
                  through a cleaner, more refined contact experience — designed
                  to feel reassuring before you even step into the clinic.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
                  {[
                    { value: "Direct", label: "Phone & Email Access" },
                    { value: "Easy", label: "Location Guidance" },
                    { value: "Calm", label: "Patient-First Experience" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-[#d9e8e0] bg-white/76 p-5 shadow-[0_12px_26px_rgba(20,40,34,0.04)]"
                    >
                      <div className="text-[1.95rem] font-black tracking-[-0.05em] text-primary-hover">
                        {item.value}
                      </div>
                      <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full border border-[#cfe3d8] bg-white/40 backdrop-blur md:block" />
                <div className="absolute -bottom-8 right-8 hidden h-16 w-16 rounded-full bg-[#03966a]/12 blur-2xl md:block" />

                <div className="relative overflow-hidden rounded-[34px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(243,249,245,0.95))] p-6 shadow-[0_24px_60px_rgba(20,40,34,0.07)] backdrop-blur sm:p-7">
                  <div className="mb-6 flex items-center justify-between border-b border-[#dcebe3] pb-5">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                        Quick Contact
                      </div>
                      <div className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-secondary-light">
                        Start with what feels easiest
                      </div>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf8f2] text-primary-hover">
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
                          d="M8 12h8m-4-4v8"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-[#d9e8e0] bg-white/80 p-4 shadow-[0_10px_22px_rgba(20,40,34,0.04)]">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                        Phone
                      </div>
                      <a
                        href={`tel:${data.phone}`}
                        className="mt-2 block text-[1.05rem] font-semibold text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        {data.phone}
                      </a>
                    </div>

                    <div className="rounded-[24px] border border-[#d9e8e0] bg-white/80 p-4 shadow-[0_10px_22px_rgba(20,40,34,0.04)]">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                        Email
                      </div>
                      <a
                        href={`mailto:${data.email}`}
                        className="mt-2 block break-all text-[1.05rem] font-semibold text-secondary transition-colors duration-300 hover:text-primary-hover"
                      >
                        {data.email}
                      </a>
                    </div>

                    <div className="rounded-[24px] border border-[#d9e8e0] bg-secondary-light p-4 text-white shadow-[0_14px_30px_rgba(20,40,34,0.10)]">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/68">
                        Visit Window
                      </div>
                      <div className="mt-3 space-y-2">
                        {data.hours.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between gap-3 text-sm"
                          >
                            <span className="font-bold uppercase tracking-[0.18em] text-white/72">
                              {item.label}
                            </span>
                            <span className="text-white">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href={`tel:${data.phone}`}
                      className="inline-flex min-h-[56px] flex-1 items-center justify-center rounded-[22px] bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_40px_rgba(62,161,111,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
                    >
                      Call Clinic
                    </Link>

                    <a
                      href={`mailto:${data.email}`}
                      className="inline-flex min-h-[56px] flex-1 items-center justify-center rounded-[22px] border border-[#cfdfd6] bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-hover shadow-[0_10px_24px_rgba(20,40,34,0.05)] transition-all duration-300 hover:-translate-y-1"
                    >
                      Write Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-10 sm:px-6 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-[34px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,250,246,0.98))] shadow-[0_24px_60px_rgba(20,40,34,0.05)]">
              <div className="border-b border-[#dcebe3] px-6 py-6 sm:px-8">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                  Contact Details
                </div>
                <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-secondary">
                  Visit, call, or write to us
                </h2>
              </div>

              <div className="space-y-6 px-6 py-7 sm:px-8 sm:py-8">
                <div className="rounded-[26px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf8f2] text-primary-hover">
                      <DetailIcon type="location" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                        Address
                      </div>
                      <div className="mt-3 space-y-1 text-[1rem] leading-7 text-secondary">
                        {data.addressLines.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf8f2] text-primary-hover">
                      <DetailIcon type="phone" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                        Phone
                      </div>
                      <a
                        href={`tel:${data.phone}`}
                        className="mt-3 inline-block text-[1.05rem] font-semibold text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        {data.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf8f2] text-primary-hover">
                      <DetailIcon type="email" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                        Email
                      </div>
                      <a
                        href={`mailto:${data.email}`}
                        className="mt-3 inline-block break-all text-[1.05rem] font-semibold text-secondary transition-colors duration-300 hover:text-primary"
                      >
                        {data.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                    Appointment Focus
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.quickHighlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#d7e7de] bg-[#f8fcfa] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-hover"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-[34px] border border-[#dcebe3] bg-white shadow-[0_24px_60px_rgba(20,40,34,0.05)]">
              <div className="flex flex-col gap-4 border-b border-[#dcebe3] px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                    Clinic Map
                  </div>
                  <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-secondary">
                    Find us with ease
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-6 text-primary-hover">
                  Use the live map for directions before your visit to Sarangi
                  Dentistry.
                </p>
              </div>

              <div className="relative min-h-[420px] bg-[#edf6f1] sm:min-h-[540px]">
                <iframe
                  src={data.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: "absolute",
                    inset: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={data.mapTitle}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
