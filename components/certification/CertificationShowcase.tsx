"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { CertificationItem } from "@/types/certification";

type CertificationShowcaseProps = {
  items: CertificationItem[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export default function CertificationShowcase({
  items,
}: CertificationShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(
    () => (activeIndex === null ? null : items[activeIndex]),
    [activeIndex, items],
  );

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
      scale: prefersReducedMotion ? 1 : 0.985,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: EASE,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {items.map((cert, index) => (
          <motion.button
            key={cert.id}
            type="button"
            variants={itemVariants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -5, transition: { duration: 0.28, ease: EASE } }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-[32px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,250,246,0.98))] text-left shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:border-[#cfe3d8] hover:shadow-[0_24px_54px_rgba(20,40,34,0.09)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#eef7f2]">
              <img
                src={cert.image}
                alt={cert.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,24,19,0.04),rgba(10,24,19,0.08)_38%,rgba(10,24,19,0.58)_100%)]" />

              <div className="absolute left-4 top-4 rounded-full border border-white/24 bg-white/14 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                {cert.category ?? "Certification"}
              </div>

              <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/24 bg-white/14 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
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

            <div className="p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                <span>{cert.issuer ?? "Sarangi Dentistry"}</span>
                {cert.year ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[#9bb7aa]" />
                    <span>{cert.year}</span>
                  </>
                ) : null}
              </div>

              <h3 className="text-[1.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#24443a] transition-colors duration-300 group-hover:text-[#03966a]">
                {cert.title}
              </h3>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#2f5548]">
                View Certificate
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 z-[100] bg-[rgba(9,24,19,0.74)] backdrop-blur-xl"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.95,
                y: prefersReducedMotion ? 0 : 18,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.97,
                y: prefersReducedMotion ? 0 : 10,
              }}
              transition={{ duration: 0.36, ease: EASE }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 lg:p-10"
            >
              <div
                className="relative w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))] shadow-[0_40px_120px_rgba(0,0,0,0.30)] backdrop-blur-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-black/18 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
                  aria-label="Close certificate preview"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="relative bg-[#edf6f1] lg:col-span-8">
                    <motion.img
                      key={activeItem.id}
                      src={activeItem.image}
                      alt={activeItem.title}
                      initial={{
                        opacity: 0,
                        scale: prefersReducedMotion ? 1 : 1.02,
                        filter: prefersReducedMotion ? "none" : "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        scale: prefersReducedMotion ? 1 : 1.01,
                        filter: prefersReducedMotion ? "none" : "blur(6px)",
                      }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="h-[360px] w-full object-contain bg-[#edf6f1] p-4 sm:h-[520px] lg:h-[780px] lg:p-8"
                    />
                  </div>

                  <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(249,253,251,0.98),rgba(240,248,243,0.95))] p-6 sm:p-8 lg:col-span-4 lg:p-10">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#dff3e8] blur-3xl" />
                      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#eaf7f0] blur-3xl" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="inline-flex w-fit items-center rounded-full border border-[#d7e7de] bg-white/76 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2f6e5b] shadow-[0_10px_20px_rgba(20,40,34,0.04)]">
                        {activeItem.category ?? "Certification"}
                      </div>

                      <h3 className="mt-5 text-[2rem] font-bold leading-[0.95] tracking-[-0.04em] text-[#24443a] sm:text-[2.35rem]">
                        {activeItem.title}
                      </h3>

                      <div className="mt-6 rounded-[24px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_30px_rgba(20,40,34,0.04)]">
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                          Issuer
                        </div>
                        <div className="mt-2 text-base font-semibold text-[#24443a]">
                          {activeItem.issuer ?? "Sarangi Dentistry"}
                        </div>

                        {activeItem.year ? (
                          <>
                            <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                              Year
                            </div>
                            <div className="mt-2 text-base text-[#4a635a]">
                              {activeItem.year}
                            </div>
                          </>
                        ) : null}
                      </div>

                      <div className="mt-6 rounded-[24px] border border-[#d9e8e0] bg-[#24443a] p-5 text-white shadow-[0_18px_36px_rgba(20,40,34,0.10)]">
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/68">
                          Significance
                        </div>
                        <p className="mt-3 text-[1rem] leading-7 text-white/90">
                          A reflection of continued learning, clinical
                          development, and commitment to refined modern dental
                          practice.
                        </p>
                      </div>

                      <div className="mt-auto pt-8">
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveIndex((prev) =>
                                prev === null
                                  ? null
                                  : prev === 0
                                    ? items.length - 1
                                    : prev - 1,
                              )
                            }
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe0d7] bg-white text-[#24443a] shadow-[0_10px_24px_rgba(20,40,34,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b7d7c7] hover:text-[#03966a]"
                            aria-label="Previous certificate"
                          >
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
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>

                          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d877d]">
                            {String(activeIndex + 1).padStart(2, "0")} /{" "}
                            {String(items.length).padStart(2, "0")}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveIndex((prev) =>
                                prev === null
                                  ? null
                                  : prev === items.length - 1
                                    ? 0
                                    : prev + 1,
                              )
                            }
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe0d7] bg-white text-[#24443a] shadow-[0_10px_24px_rgba(20,40,34,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b7d7c7] hover:text-[#03966a]"
                            aria-label="Next certificate"
                          >
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
