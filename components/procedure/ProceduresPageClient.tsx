// components/procedure/ProceduresPageClient.tsx
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ProcedureItem } from "@/types/procedure";
import PageBackground from "@/components/ui/PageBackground";

type ProceduresPageClientProps = {
  procedures: ProcedureItem[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function getProcedureCardImage(procedure: ProcedureItem): string {
  return (
    procedure.cardUrl ??
    procedure.thumbnailUrl ??
    procedure.fullUrl ??
    procedure.image
  );
}

export default function ProceduresPageClient({
  procedures,
}: ProceduresPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASE,
      },
    },
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-secondary">
      <section className="relative max-h-[60vh] pt-20 md:pt-28">
        <PageBackground />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col gap-8 items-center"
          >
            <div className="">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                  Sarangi Dentistry Procedures
                </span>
              </div>

              <h1
                data-cursor="invert"
                className="max-w-4xl text-[clamp(3rem,6vw,6.25rem)] font-bold leading-[0.9] tracking-normal text-secondary text-center"
              >
                Where Expertise Meets Seamless Care Process
              </h1>
            </div>

            <p className="mx-auto mt-6 max-w-5xl text-center text-[1rem] leading-7 text-primary-hover sm:text-[1.05rem] sm:leading-8 md:text-[1.1rem]">
              Explore our specialized treatments designed to restore oral
              health, improve function, and enhance smile aesthetics with
              thoughtful care and modern dental expertise.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-14 sm:px-6 md:px-10 md:pb-32 md:pt-18 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {procedures.length === 0 ? (
            <div className="rounded-[30px] border border-[#dcebe3] bg-white/80 px-6 py-14 text-center shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur">
              <h2
                data-cursor="invert"
                className="text-2xl font-bold tracking-[-0.03em] text-secondary"
              >
                Procedures coming soon
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-secondary-light">
                Procedure pages will appear here once they are published from
                the Sarangi Dentistry CMS.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3"
            >
              {procedures.map((procedure, index) => (
                <motion.article
                  key={procedure.id}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  className="group relative overflow-hidden rounded-[30px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,250,246,0.98))] shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:border-[#cfe3d8] hover:shadow-[0_24px_54px_rgba(20,40,34,0.08)]"
                >
                  <Link href={procedure.path} className="block">
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 z-10 bg-linear-to-t from-[#11241c]/55 via-transparent to-transparent opacity-70" />

                      <img
                        src={getProcedureCardImage(procedure)}
                        alt={procedure.title}
                        loading={index < 3 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index < 2 ? "high" : "auto"}
                        className="aspect-[4/2.85] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />

                      <div className="absolute left-4 top-4 z-20 inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
                        Procedure
                      </div>

                      <div className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:scale-105">
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
                            d="M7 17L17 7M17 7H9M17 7v8"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full border border-[#d8e8df] bg-white/75 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover shadow-[0_8px_18px_rgba(20,40,34,0.04)]">
                          Dental Care
                        </span>

                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-light">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h2
                        data-cursor="invert"
                        className="text-[1.55rem] font-bold leading-[1.02] tracking-[-0.04em] text-secondary sm:text-[1.75rem]"
                      >
                        {procedure.title}
                      </h2>

                      <p className="mt-4 line-clamp-3 text-[0.96rem] leading-7 text-secondary-light">
                        {procedure.shortText}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#dcebe3] pt-5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                          View procedure
                        </span>

                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfe3d8] bg-white text-primary-hover shadow-[0_8px_18px_rgba(20,40,34,0.04)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary-hover">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 17L17 7M17 7H9M17 7v8"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
