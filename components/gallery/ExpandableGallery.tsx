// components/gallery/ExpandableGallery.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { GalleryImage } from "@/types/gallery";
import Image from "next/image";

type ExpandableGalleryProps = {
  items: GalleryImage[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function getGridImage(item: GalleryImage): string {
  return item.cardUrl ?? item.thumbnailUrl ?? item.fullUrl ?? item.image;
}

function getModalImage(item: GalleryImage): string {
  return item.fullUrl ?? item.cardUrl ?? item.image;
}

function preloadImage(src: string | undefined) {
  if (!src || typeof window === "undefined") return;

  const image = new window.Image();
  image.decoding = "async";
  image.src = src;
}

function getPreviousIndex(index: number, total: number): number {
  return index === 0 ? total - 1 : index - 1;
}

function getNextIndex(index: number, total: number): number {
  return index === total - 1 ? 0 : index + 1;
}

export default function ExpandableGallery({ items }: ExpandableGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = useMemo(
    () => (activeIndex === null ? null : items[activeIndex]),
    [activeIndex, items],
  );

  useEffect(() => {
    if (activeIndex === null || items.length === 0) return;

    const previous = items[getPreviousIndex(activeIndex, items.length)];
    const next = items[getNextIndex(activeIndex, items.length)];

    preloadImage(getModalImage(previous));
    preloadImage(getModalImage(next));
  }, [activeIndex, items]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? null : getPreviousIndex(prev, items.length),
        );
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : getNextIndex(prev, items.length),
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
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
        viewport={{ once: true, margin: "-64px" }}
        className="grid auto-rows-[240px] grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[260px] xl:auto-rows-[290px]"
      >
        {items.map((item, index) => {
          const layoutClass =
            index === 0
              ? "md:col-span-7 md:row-span-2"
              : index === 1
                ? "md:col-span-5 md:row-span-1"
                : index === 2
                  ? "md:col-span-5 md:row-span-1"
                  : index === 3
                    ? "md:col-span-4 md:row-span-1"
                    : index === 4
                      ? "md:col-span-4 md:row-span-1"
                      : index === 5
                        ? "md:col-span-4 md:row-span-1"
                        : index === 6
                          ? "md:col-span-6 md:row-span-1"
                          : "md:col-span-6 md:row-span-1";

          return (
            <motion.button
              key={item.id}
              type="button"
              variants={itemVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.2, ease: EASE } }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.996 }}
              onMouseEnter={() => preloadImage(getModalImage(item))}
              onFocus={() => preloadImage(getModalImage(item))}
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-[30px] border border-[#dcebe3] bg-white text-left shadow-[0_18px_40px_rgba(20,40,34,0.06)] transition-all duration-300 hover:border-[#c8ddd2] hover:shadow-[0_22px_44px_rgba(20,40,34,0.08)] ${layoutClass}`}
            >
              <div className="absolute inset-0">
                <Image width={1200} height={1200}
                  src={getGridImage(item)}
                  alt={item.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index < 2 ? "high" : "auto"}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,26,21,0.08),rgba(11,26,21,0.18)_40%,rgba(11,26,21,0.68)_100%)]" />
              </div>

              <div className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                {item.category}
              </div>

              <div className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
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
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeItem && activeIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              className="fixed inset-0 z-70 bg-[rgba(8,22,17,0.62)] backdrop-blur-sm"
              onClick={() => setActiveIndex(null)}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.985,
                y: prefersReducedMotion ? 0 : 10,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.99,
                y: prefersReducedMotion ? 0 : 6,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.22,
                ease: EASE,
              }}
              className="fixed inset-0 z-71 flex items-center justify-center p-4 sm:p-6 lg:p-10"
            >
              <div className="relative w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/16 bg-white shadow-[0_32px_90px_rgba(0,0,0,0.24)]">
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-transform duration-200 hover:scale-105"
                  aria-label="Close image preview"
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
                  <div className="relative bg-[#10231d] lg:col-span-8">
                    <Image width={1200} height={1200}
                      key={activeItem.id}
                      src={getModalImage(activeItem)}
                      alt={activeItem.alt}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="h-80 w-full object-contain sm:h-110 lg:h-180"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,14,0.02),rgba(8,18,14,0.10)_60%,rgba(8,18,14,0.22)_100%)]" />
                  </div>

                  <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(247,252,249,0.98),rgba(239,248,243,0.96))] p-6 sm:p-8 lg:col-span-4 lg:p-10">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-accent-soft/30 blur-2xl" />
                      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent-soft/30 blur-2xl" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="inline-flex w-fit items-center rounded-full border border-[#d7e7de] bg-white/72 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-hover shadow-[0_10px_20px_rgba(20,40,34,0.04)]">
                        {activeItem.category}
                      </div>

                      <h3 className="mt-5 text-[2rem] font-bold leading-[0.95] tracking-[-0.04em] text-secondary sm:text-[2.4rem]">
                        {activeItem.title}
                      </h3>

                      <p className="mt-5 text-[1rem] leading-7 text-secondary-light sm:text-[1.05rem] sm:leading-8">
                        {activeItem.description}
                      </p>

                      <div className="mt-8 rounded-3xl border border-[#d9e8e0] bg-white/76 p-5 shadow-[0_14px_30px_rgba(20,40,34,0.04)]">
                        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                          Sarangi Dentistry
                        </div>
                        <div className="mt-2 text-[1.05rem] font-semibold text-secondary">
                          Premium clinic environment with patient-first care
                        </div>
                      </div>

                      <div className="mt-auto pt-8">
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveIndex((prev) =>
                                prev === null
                                  ? null
                                  : getPreviousIndex(prev, items.length),
                              )
                            }
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe0d7] bg-white text-secondary shadow-[0_10px_24px_rgba(20,40,34,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b7d7c7] hover:text-primary"
                            aria-label="Previous image"
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

                          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                            {String(activeIndex + 1).padStart(2, "0")} /{" "}
                            {String(items.length).padStart(2, "0")}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveIndex((prev) =>
                                prev === null
                                  ? null
                                  : getNextIndex(prev, items.length),
                              )
                            }
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe0d7] bg-white text-[#24443a] shadow-[0_10px_24px_rgba(20,40,34,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b7d7c7] hover:text-[#03966a]"
                            aria-label="Next image"
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
