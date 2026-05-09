// components/contact/ContactPageClient.tsx
"use client";

import Button from "@/components/ui/Button";
import PageBackground from "@/components/ui/PageBackground";
import SectionReveal from "@/components/ui/SectionReveal";
import ContactNoticeBar from "@/components/contact/ContactNoticeBar";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ContactInfo } from "@/types/contact";

type ContactPageClientProps = {
  data: ContactInfo;
};

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex items-center">
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="-ml-0.5 h-[1px] w-8 bg-primary/40" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}

function DetailIcon({
  type,
}: {
  type: "location" | "phone" | "email" | "clock";
}) {
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

  if (type === "clock") {
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 012 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-secondary">
      <section className="relative pb-24 pt-20 md:pt-28">
        <PageBackground />
        <ContactNoticeBar contactInfo={data} />

        <div className="relative mx-auto max-w-7xl px-5 pt-8 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="show"
            className="grid gap-12 lg:grid-cols-12 lg:items-start"
          >
            <div className="lg:sticky lg:top-32 lg:col-span-6">
              <EyebrowLabel>Contact &amp; Appointments</EyebrowLabel>

              <h1
                data-cursor="invert"
                className="max-w-[12ch] text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.06em] text-secondary"
              >
                Trusted Care for Every Smile.
              </h1>

              <p className="mt-8 max-w-lg text-[1rem] leading-7 text-secondary-light sm:text-[1.06rem] sm:leading-8">
                Your perfect smile begins with a simple conversation. Reach out
                with any questions, and our team will respond with clarity,
                care, and guidance tailored to you. reassuring before you even
                step inside.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9e8e0] bg-white text-primary">
                    <DetailIcon type="phone" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                      Phone
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
                    <DetailIcon type="email" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                      Email
                    </div>
                    <a
                      href={`mailto:${data.email}`}
                      className="mt-1 block break-all text-lg font-semibold text-secondary transition-colors hover:text-primary"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9e8e0] bg-white text-primary">
                    <DetailIcon type="clock" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                      Clinic Hours
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {data.hours.map((h) => (
                        <div
                          key={`${h.label}-${h.value}`}
                          className="flex gap-2 text-sm font-medium text-secondary-light"
                        >
                          <span className="font-semibold text-secondary">
                            {h.label}:
                          </span>
                          <span>{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href={`tel:${data.phone}`}>Call Clinic</Button>
                <Button href={`mailto:${data.email}`} variant="outline">
                  Write Email
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-[28px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,250,246,0.98))] shadow-[0_24px_60px_rgba(20,40,34,0.06)]">
                <div className="border-b border-[#dcebe3] px-6 py-6 sm:px-8">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                    Quick Access
                  </div>
                  <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[0.95] tracking-[-0.04em] text-secondary">
                    Start with what feels easiest
                  </h2>
                </div>

                <div className="space-y-5 px-6 py-7 sm:px-8 sm:py-8">
                  <div className="rounded-[22px] border border-[#d9e8e0] bg-white/90 p-5 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d9e8e0] bg-background text-primary">
                        <DetailIcon type="location" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-light">
                          Address
                        </div>
                        <div className="mt-2 space-y-0.5 text-[0.97rem] leading-7 text-secondary">
                          {data.addressLines.map((line) => (
                            <div key={line}>{line}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-[#d9e8e0] bg-white/90 p-5 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d9e8e0] bg-background text-primary">
                        <DetailIcon type="phone" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-light">
                          Phone
                        </div>
                        <a
                          href={`tel:${data.phone}`}
                          className="mt-2 block text-[1.05rem] font-semibold text-secondary transition-colors hover:text-primary"
                        >
                          {data.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] bg-secondary p-5 text-white shadow-[0_14px_30px_rgba(20,40,34,0.12)]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                      Visit Window
                    </div>
                    <div className="mt-4 space-y-2">
                      {data.hours.map((h) => (
                        <div
                          key={`${h.label}-${h.value}`}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="font-bold uppercase tracking-[0.16em] text-white/65">
                            {h.label}
                          </span>
                          <span className="font-medium text-white">
                            {h.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-[#d9e8e0] bg-white/90 px-5 py-4 shadow-[0_14px_28px_rgba(20,40,34,0.04)]">
                    <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-light">
                      Appointment Focus
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.quickHighlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#d9e8e0] bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-hover"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden px-5 pb-24 pt-0 sm:px-6 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-[rgba(255,255,255,0.22)] via-[rgba(248,255,250,0.12)] to-[rgba(248,255,250,0.30)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <SectionReveal>
            <div className="overflow-hidden rounded-[30px] border border-[#dce9e2] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(239,248,243,0.94))] shadow-[0_30px_80px_rgba(20,40,34,0.07)]">
              <div className="flex flex-col gap-4 border-b border-[#dcebe3] px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8 md:px-10 md:py-8">
                <div>
                  <EyebrowLabel>Clinic Map</EyebrowLabel>
                  <h2
                    data-cursor="invert"
                    className="max-w-[14ch] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[0.97] tracking-[-0.04em] text-secondary"
                  >
                    Find us with ease
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-secondary-light">
                  Use the live map for directions before your visit to Sarangi
                  Dentistry.
                </p>
              </div>

              <div className="relative min-h-[420px] bg-background sm:min-h-[560px]">
                <iframe
                  src={data.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={data.mapTitle}
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden px-5 pb-28 sm:px-6 md:px-10 lg:px-16">
        <div className="relative mx-auto max-w-7xl">
          <SectionReveal>
            <div className="overflow-hidden rounded-[30px] border border-[#dce9e2] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(239,248,243,0.94))] shadow-[0_30px_80px_rgba(20,40,34,0.07)]">
              <div className="grid items-center gap-10 px-6 py-10 sm:px-8 md:px-10 md:py-12 lg:grid-cols-12 lg:px-14">
                <div className="lg:col-span-7">
                  <EyebrowLabel>Book a Visit</EyebrowLabel>

                  <h2
                    data-cursor="invert"
                    className="max-w-[12ch] text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary"
                  >
                    Crafted for Comfort. Defined by Excellence.
                  </h2>

                  <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-secondary-light sm:text-[1.05rem] sm:leading-8">
                    Experience personalized dental care designed around your
                    comfort, confidence, and long-term oral health.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button href="/book-appointment">Book Appointment</Button>
                    <Button href="/procedure" variant="outline">
                      Explore Procedures
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {data.quickHighlights.slice(0, 4).map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.48,
                          delay: i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="rounded-[22px] border border-[#d9e8e0] bg-white/92 p-5 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-light shadow-[0_12px_28px_rgba(20,40,34,0.04)]"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
