"use client";
import Button from "@/components/ui/Button";
// components/procedure/ProcedureDetailPageClient.tsx

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProcedureItem } from "@/types/procedure";
import PageBackground from "@/components/ui/PageBackground";

type ProcedureDetailPageClientProps = {
  procedure: ProcedureItem;
  relatedProcedures: ProcedureItem[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

function getProcedureHeroImage(procedure: ProcedureItem): string {
  return procedure.fullUrl ?? procedure.cardUrl ?? procedure.image;
}

function getProcedureCardImage(procedure: ProcedureItem): string {
  return (
    procedure.cardUrl ??
    procedure.thumbnailUrl ??
    procedure.fullUrl ??
    procedure.image
  );
}

function FadeUp(props: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.72, delay: props.delay ?? 0, ease: EASE }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
}

function SoftVectors() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute -left-16 top-20 h-56 w-56 rounded-full border border-[#d7e9df] bg-[radial-gradient(circle,rgba(3,150,106,0.08),rgba(3,150,106,0.02)_45%,transparent_72%)]"
      />

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.05, delay: 0.12, ease: EASE }}
        className="absolute right-[-60px] top-36 h-72 w-72 rounded-full border border-[#d9ebe2] bg-[radial-gradient(circle,rgba(36,68,58,0.06),transparent_68%)]"
      />

      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: -6 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="absolute left-[8%] top-[28rem] h-px w-44 bg-gradient-to-r from-transparent via-[#bed7cc] to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 6 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className="absolute right-[10%] top-[54rem] h-px w-56 bg-gradient-to-r from-transparent via-[#bed7cc] to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.22, ease: EASE }}
        className="absolute left-[12%] top-[64rem] h-20 w-20 rounded-full border border-[#d7e8df] bg-white/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.28, ease: EASE }}
        className="absolute right-[14%] top-[92rem] h-24 w-24 rounded-full border border-[#d7e8df] bg-white/30 backdrop-blur-sm"
      />
    </div>
  );
}

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
    <main className="min-h-screen overflow-x-clip bg-background text-secondary">
      <section className="relative pt-20">
        <PageBackground />
        <SoftVectors />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-6 md:px-10 lg:px-16 lg:pb-20">
          <FadeUp>
            <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm font-medium text-secondary-light">
              <Link
                href="/"
                className="transition-colors hover:text-primary-hover"
              >
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
          </FadeUp>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : -24,
                y: prefersReducedMotion ? 0 : 16,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.85, ease: EASE }}
              className="lg:col-span-6"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                  Sarangi Dentistry Procedure
                </span>
              </div>

              <h1
                data-cursor="invert"
                className="max-w-[11ch] text-[clamp(2.9rem,5.8vw,5.7rem)] font-bold leading-[0.92] tracking-[-0.055em] text-secondary"
              >
                {procedure.title}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
                className="mt-6 max-w-2xl text-[1rem] leading-8 text-secondary-light sm:text-[1.05rem]"
              >
                {procedure.shortText}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.24, ease: EASE }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Button href="/book-appointment">Book Appointment</Button>

                <Button href="/procedure" variant="outline">
                  View All Procedures
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: prefersReducedMotion ? 0 : 24,
                y: prefersReducedMotion ? 0 : 16,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              className="lg:col-span-6"
            >
              <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/60 p-3 shadow-[0_30px_80px_rgba(20,40,34,0.10)] backdrop-blur">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,150,106,0.11),transparent_36%)]" />
                <img
                  src={getProcedureHeroImage(procedure)}
                  alt={procedure.title}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative z-10 aspect-[4/3] w-full rounded-[28px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-8 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-10">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                Editorial overview
              </div>
              <h2
                data-cursor="invert"
                className="mt-4 text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-secondary"
              >
                A calmer, clearer understanding of the treatment
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div className="space-y-6">
              <p className="text-[1.05rem] leading-8 text-secondary-light sm:text-[1.1rem]">
                {procedure.longDescription}
              </p>

              <div
                className="max-w-none text-secondary-light
                  [&_p]:my-5 [&_p]:text-[1.02rem] [&_p]:leading-8
                  [&_h1]:pt-8 [&_h1]:text-[2rem] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:tracking-[-0.03em] [&_h1]:text-secondary
                  [&_h2]:pt-8 [&_h2]:text-[1.75rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_h2]:text-secondary
                  [&_h3]:pt-6 [&_h3]:text-[1.35rem] [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:tracking-[-0.02em] [&_h3]:text-secondary
                  [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-6
                  [&_blockquote]:text-[1.12rem] [&_blockquote]:font-medium [&_blockquote]:leading-8 [&_blockquote]:text-secondary
                  [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:pl-6
                  [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6
                  [&_li]:text-[1.02rem] [&_li]:leading-8
                  [&_ul>li]:list-disc [&_ul>li]:marker:text-primary
                  [&_ol>li]:list-decimal [&_ol>li]:marker:text-primary
                  [&_a]:font-medium [&_a]:text-primary-hover [&_a]:underline-offset-4 hover:[&_a]:underline
                  [&_strong]:font-semibold [&_strong]:text-secondary
                  [&_em]:italic"
                dangerouslySetInnerHTML={{ __html: procedure.bodyHtml }}
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative px-5 py-14 sm:px-6 md:px-10 md:py-18 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                  Treatment Journey
                </span>
              </div>

              <h2
                data-cursor="invert"
                className="text-[clamp(2.15rem,4.6vw,3.9rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary"
              >
                What the procedure usually involves
              </h2>
            </div>
          </FadeUp>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {procedure.steps.map((step, index) => (
              <FadeUp key={step.title} delay={index * 0.06}>
                <div className="relative">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="text-[2.8rem] font-black leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#03966a]">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#b9d8ca] to-transparent" />
                  </div>

                  <h3 className="text-[1.22rem] font-semibold leading-tight text-secondary">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-[0.98rem] leading-7 text-secondary-light">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-14 sm:px-6 md:px-10 md:py-18 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                Patient Questions
              </div>
              <h2
                data-cursor="invert"
                className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-bold leading-[0.98] tracking-[-0.04em] text-secondary"
              >
                Answers that are simple, practical, and reassuring
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-8 text-secondary-light">
                Here are the most common questions patients ask before deciding
                on treatment.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-4 lg:col-span-8">
            {procedure.faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <FadeUp key={faq.question} delay={index * 0.04}>
                  <div className="overflow-hidden rounded-[24px] border border-[#d9e8e0] bg-white/80 shadow-[0_10px_24px_rgba(20,40,34,0.04)] backdrop-blur">
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
                          <div className="border-t border-[#e6f0eb] px-6 py-5">
                            <p className="text-[0.98rem] leading-7 text-secondary-light">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative px-5 py-14 sm:px-6 md:px-10 md:py-18 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <FadeUp>
              <div className="mb-10 text-center">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                    Related Procedures
                  </span>
                </div>

                <h2
                  data-cursor="invert"
                  className="text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary"
                >
                  Explore more treatments
                </h2>
              </div>
            </FadeUp>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <FadeUp key={item.id} delay={index * 0.06}>
                  <article className="group">
                    <Link href={item.path} className="block">
                      <div className="overflow-hidden rounded-[28px] border border-[#dcebe3] bg-white/85 shadow-[0_16px_36px_rgba(20,40,34,0.05)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_22px_48px_rgba(20,40,34,0.08)]">
                        <img
                          src={getProcedureCardImage(item)}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/2.75] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="p-6">
                          <h3 className="text-[1.2rem] font-semibold leading-tight text-secondary transition-colors duration-300 group-hover:text-primary-hover">
                            {item.title}
                          </h3>
                          <p className="mt-3 line-clamp-3 text-[0.96rem] leading-7 text-secondary-light">
                            {item.shortText}
                          </p>

                          <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
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
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative px-5 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[36px] border border-[#dce9e2] bg-primary shadow-[0_30px_80px_rgba(20,40,34,0.10)]">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/45 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/45 blur-3xl" />
              <div className="absolute left-[10%] top-[26%] h-px w-28 bg-white/30" />
              <div className="absolute right-[12%] bottom-[30%] h-px w-32 bg-white/30" />

              <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 text-center sm:px-8 md:px-10 md:py-14">
                <h2
                  data-cursor="invert"
                  className="text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white"
                >
                  Ready for a healthier, more confident smile?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-7 text-white/88 sm:text-[1.05rem] sm:leading-8">
                  Schedule a consultation with Sarangi Dentistry and receive
                  thoughtful guidance, expert treatment planning, and
                  personalized dental care.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button href="/contact" variant="white">
                    Schedule a Visit
                  </Button>

                  <Button href="/procedure" variant="ghost">
                    Browse Procedures
                  </Button>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
