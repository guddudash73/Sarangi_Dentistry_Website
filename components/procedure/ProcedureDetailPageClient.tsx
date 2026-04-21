"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProcedureItem } from "@/types/procedure";

type ProcedureDetailPageClientProps = {
  procedure: ProcedureItem;
  relatedProcedures: ProcedureItem[];
};

export default function ProcedureDetailPageClient({
  procedure,
  relatedProcedures,
}: ProcedureDetailPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const related = useMemo(
    () =>
      relatedProcedures.filter((item) => item.id !== procedure.id).slice(0, 3),
    [procedure.id, relatedProcedures],
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6fbf8] pt-12 md:pt-24 text-secondary">
      <section className="relative min-h-screen border-b border-[#dcebe3] bg-[linear-gradient(180deg,rgba(246,251,248,1),rgba(238,248,243,0.97))]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[16%] h-44 w-44 rounded-full bg-accent-soft/40 blur-3xl" />
          <div className="absolute right-[10%] top-[10%] h-60 w-60 rounded-full bg-accent-soft/40 blur-3xl" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.045]"
            style={{ backgroundImage: "url('/assets/sketch_it_sarangi.png')" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 md:px-10 lg:px-16 lg:pb-20">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-secondary">
            <Link href="/" className="transition-colors hover:text-primary-hover">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/procedure"
              className="transition-colors hover:text-primary-hover"
            >
              Procedures
            </Link>
            <span>/</span>
            <span className="text-primary">{procedure.title}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : 24,
                y: prefersReducedMotion ? 0 : 16,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-6"
            >
              <div className="relative overflow-hidden rounded-4xl border border-[#dcebe3] bg-white p-3 shadow-[0_28px_80px_rgba(20,40,34,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,150,106,0.10),transparent_35%)]" />
                <img
                  src={procedure.image}
                  alt={procedure.title}
                  className="relative z-10 aspect-4/3 w-full rounded-3xl object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : -24,
                y: prefersReducedMotion ? 0 : 16,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <h1 className="max-w-[12ch] text-[clamp(2.8rem,5.6vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.05em] text-secondary">
                {procedure.title}
              </h1>

              <p className="mt-6 max-w-2xl text-[1rem] leading-7 text-secondary-light sm:text-[1.05rem] sm:leading-8">
                {procedure.longDescription}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-14 items-center justify-center rounded-[22px] bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_40px_rgba(62,161,111,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
                >
                  Book Appointment
                </Link>

                <Link
                  href="/procedure"
                  className="inline-flex min-h-14 items-center justify-center rounded-[22px] border border-[#cfdfd6] bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-primary shadow-[0_10px_24px_rgba(20,40,34,0.05)] transition-all duration-300 hover:-translate-y-1"
                >
                  View All Procedures
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-20 md:space-y-24">
          <motion.section
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-hover" />
                Treatment Journey
              </div>

              <h2 className="text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary">
                What the procedure usually involves
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {procedure.steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : 24,
                    scale: prefersReducedMotion ? 1 : 0.98,
                  }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group rounded-[28px] border border-[#d9e8e0] bg-white/92 p-7 shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c6dfd3] hover:shadow-[0_24px_48px_rgba(20,40,34,0.08)]"
                >
                  <div className="mb-6 text-[2.8rem] font-black leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#03966a]">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <h3 className="text-[1.25rem] font-semibold leading-tight text-secondary group-hover:text-primary-hover">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-secondary-light">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-10 text-center">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-hover" />
                Frequently Asked Questions
              </div>

              <h2 className="text-[clamp(2.1rem,4.5vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary">
                Answers to common patient questions
              </h2>
            </div>

            <div className="space-y-4">
              {procedure.faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: index * 0.05 }}
                    className="overflow-hidden rounded-[22px] border border-[#d9e8e0] bg-white/92 shadow-[0_10px_24px_rgba(20,40,34,0.04)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-[#f8fcfa]"
                    >
                      <span className="text-base font-semibold leading-7 text-secondary sm:text-lg">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "border-[#03966a] bg-primary text-white rotate-180"
                            : "border-[#d6e7de] bg-background text-[#03966a]"
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#e6f0eb] bg-[#f8fcfa] px-6 py-5">
                            <p className="text-[0.98rem] leading-7 text-secondary-light">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 text-center">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-hover" />
                  Related Procedures
                </div>

                <h2 className="text-[clamp(2.1rem,4.5vw,3.6rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary">
                  Explore more treatments
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[28px] border border-[#dcebe3] bg-white/92 shadow-[0_16px_36px_rgba(20,40,34,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c6dfd3] hover:shadow-[0_22px_48px_rgba(20,40,34,0.08)]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-4/2.75 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-[1.2rem] font-semibold text-secondary">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-[0.96rem] leading-7 text-secondary-light">
                        {item.shortText}
                      </p>
                      <div className="mt-5">
                        <Link
                          href={item.path}
                          className="inline-flex items-center gap-2 rounded-full border border-[#cfe3d8] bg-[#f8fcfa] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary transition-all duration-300 hover:border-[#b8d7c7] hover:text-primary-hover"
                        >
                          View Procedure
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[34px] border border-[#dce9e2] bg-primary shadow-[0_30px_80px_rgba(20,40,34,0.10)]"
          >
            <div className="relative px-6 py-10 sm:px-8 md:px-10 md:py-14 lg:px-14">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/50 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/50 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <h2 className="text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
                  Ready for a healthier, more confident smile?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-7 text-white/88 sm:text-[1.05rem] sm:leading-8">
                  Schedule a consultation with Sarangi Dentistry and receive
                  thoughtful guidance, expert treatment planning, and
                  personalized dental care.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-14 items-center justify-center rounded-[22px] bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#2f5548] shadow-[0_16px_40px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-1"
                  >
                    Schedule a Visit
                  </Link>

                  <Link
                    href="/procedure"
                    className="inline-flex min-h-14 items-center justify-center rounded-[22px] border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/14"
                  >
                    Browse Procedures
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
