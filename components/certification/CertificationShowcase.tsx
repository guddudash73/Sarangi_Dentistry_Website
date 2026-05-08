// components/certification/CertificationShowcase.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
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

function getCardImage(item: CertificationItem): string {
  return item.cardUrl ?? item.thumbnailUrl ?? item.fullUrl ?? item.image;
}

function getModalImage(item: CertificationItem): string {
  return item.fullUrl ?? item.cardUrl ?? item.image;
}

export default function CertificationShowcase({
  items,
}: CertificationShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(
    () => (activeIndex === null ? null : items[activeIndex]),
    [activeIndex, items],
  );

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
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
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
      >
        {items.map((cert, index) => (
          <motion.button
            key={cert.id}
            type="button"
            variants={itemVariants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -8, transition: { duration: 0.4, ease: EASE } }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={() => setActiveIndex(index)}
            className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(54,161,143,0.10)]"
          >
            <div className="relative overflow-hidden bg-[#f4faf7]">
              <img
                src={getCardImage(cert)}
                alt={cert.title}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 3 ? "high" : "auto"}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,28,22,0.04),rgba(10,28,22,0.45))] opacity-80" />

              <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
                {cert.category ?? "Certification"}
              </div>

              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur">
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
                    d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="line-clamp-2 text-[1.25rem] font-bold leading-tight tracking-[-0.03em] text-secondary">
                {cert.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {cert.issuer ? (
                  <span className="rounded-full border border-[#d8e8df] bg-[#f8fcfa] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-hover">
                    {cert.issuer}
                  </span>
                ) : null}

                {cert.year ? (
                  <span className="rounded-full border border-[#d8e8df] bg-[#f8fcfa] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-hover">
                    {cert.year}
                  </span>
                ) : null}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#071410]/80 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title}
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.94,
                y: prefersReducedMotion ? 0 : 20,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.96,
                y: prefersReducedMotion ? 0 : 16,
              }}
              transition={{ duration: 0.32, ease: EASE }}
              className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg backdrop-blur transition hover:bg-white"
                aria-label="Close certificate preview"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="flex items-center justify-center bg-[#f4faf7] p-4">
                  <img
                    src={getModalImage(activeItem)}
                    alt={activeItem.title}
                    loading="eager"
                    decoding="async"
                    className="max-h-[78vh] w-full object-contain"
                  />
                </div>

                <div className="p-7">
                  <div className="mb-4 inline-flex rounded-full border border-[#d8e8df] bg-[#f8fcfa] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                    {activeItem.category ?? "Certification"}
                  </div>

                  <h2 data-cursor="invert" className="text-[2rem] font-bold leading-tight tracking-[-0.04em] text-secondary">
                    {activeItem.title}
                  </h2>

                  <div className="mt-6 space-y-4 text-sm text-secondary-light">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                        Issuer
                      </div>
                      <div className="mt-1">{activeItem.issuer ?? "—"}</div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                        Year
                      </div>
                      <div className="mt-1">{activeItem.year ?? "—"}</div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                        Category
                      </div>
                      <div className="mt-1">{activeItem.category ?? "—"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
