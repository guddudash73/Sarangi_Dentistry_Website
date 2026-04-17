"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ProcedureItem } from "@/types/procedure";

type ProceduresPageClientProps = {
  procedures: ProcedureItem[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

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
    <main className="min-h-screen overflow-x-clip bg-[#f6fbf8] text-[#24443a]">
      <section className="relative max-h-[60vh] overflow-hidden border-b border-[#dcebe3] bg-[linear-gradient(180deg,rgba(247,252,249,1),rgba(240,248,243,0.98))]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0.5)_30%,transparent_68%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,150,106,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,150,106,0.06)_1px,transparent_1px)] bg-size-[38px_38px] sm:bg-size-[44px_44px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(246,251,248,0.88)_100%)]" />

          <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full border border-[#03966a]/10 bg-white/20" />
          <div className="absolute left-[12%] top-[22%] h-16 w-16 rounded-full border border-[#03966a]/12 bg-[#03966a]/3" />

          <div className="absolute right-[18%] top-[20%] h-52 w-52 rounded-full border border-[#03966a]/10 bg-white/20" />
          <div className="absolute right-[20%] top-[38%] h-20 w-20 rounded-full border border-[#03966a]/12 bg-[#03966a]/3" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-38 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mx-auto max-w-5xl text-center"
          >
            <h1 className="text-[clamp(3rem,6vw,6.25rem)] font-bold leading-[0.9] tracking-normal text-[#21493d]">
              Our Dental Procedures
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-[1rem] leading-7 text-[#4a635a] sm:text-[1.05rem] sm:leading-8 md:text-[1.1rem]">
              Explore our specialized treatments designed to restore oral
              health, improve function, and enhance smile aesthetics with
              thoughtful care and modern dental expertise.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-14 sm:px-6 md:px-10 md:pb-32 md:pt-18 lg:px-16">
        <div className="mx-auto max-w-7xl">
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
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-[#11241c]/55 via-transparent to-transparent opacity-70" />
                  <img
                    src={procedure.image}
                    alt={procedure.title}
                    className="aspect-[4/2.85] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  <div className="absolute left-4 top-4 z-20 inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
                    Procedure
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#edf8f2] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2f6e5b]">
                      Dental Care
                    </span>
                    <span className="text-sm font-semibold tracking-[-0.02em] text-[#03966a]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="text-[1.45rem] font-bold leading-tight tracking-[-0.03em] text-[#24443a] transition-colors duration-300 group-hover:text-[#03966a]">
                    {procedure.title}
                  </h2>

                  <p className="mt-4 line-clamp-4 text-[0.98rem] leading-7 text-[#4a635a]">
                    {procedure.shortText}
                  </p>

                  <div className="mt-6">
                    <Link
                      href={procedure.path}
                      className="inline-flex items-center gap-2 rounded-full border border-[#cfe3d8] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2f5548] shadow-[0_8px_18px_rgba(20,40,34,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b8d7c7] hover:text-[#03966a]"
                    >
                      Know More
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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

                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="origin-left h-0.5 w-full bg-linear-to-r from-[#03966a] via-[#7fc6a8] to-transparent"
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
