"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Book } from "@/types/book";
import type { Photo } from "@/types/photography";
import SectionReveal from "@/components/ui/SectionReveal";

type Props = {
  pinnedBook: Book;
  featuredPhoto: Photo;
};

/**
 * BeyondDentistrySection — home-page teaser card.
 *
 * Receives server-fetched data as props so the component is
 * fully backend-ready: swap the data source in the parent page
 * and this UI needs zero changes.
 */
export default function BeyondDentistrySection({
  pinnedBook,
  featuredPhoto,
}: Props) {
  return (
    <section className="relative z-20 overflow-hidden bg-[#ffffff] pb-24 pt-12 sm:pb-32 sm:pt-16">
      {/* Decorative Vector Shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* Top-right blob */}
        <svg
          className="absolute -right-[10%] -top-[10%] w-[600px] text-gray-100/80 sm:-top-[20%] sm:w-[800px]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.3C97.5,13.4,92.3,29.3,83.5,43.4C74.7,57.5,62.2,69.9,47.8,77.3C33.4,84.7,17.1,87.1,1.1,85.2C-14.8,83.3,-29.7,77,-43.3,68.9C-56.9,60.8,-69.2,50.8,-76.7,37.8C-84.2,24.8,-86.9,8.7,-84.9,-6.5C-82.9,-21.7,-76.3,-36.1,-67,-48.1C-57.7,-60,-45.8,-69.6,-32.5,-76.3C-19.2,-83,-4.5,-86.7,9.7,-85.4C23.9,-84.1,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Bottom-left blob */}
        <svg
          className="absolute -bottom-[10%] -left-[10%] w-[500px] text-gray-100/80 sm:-bottom-[15%] sm:w-[600px]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.7,-65.4C60.2,-54.6,67.7,-37.6,71.9,-20.3C76.1,-3,77.1,14.6,70.5,30.1C63.9,45.6,49.8,59,33.5,67.1C17.2,75.2,-1.3,77.9,-18.2,74C-35.1,70.1,-50.3,59.5,-61.8,45.5C-73.3,31.5,-81,14.2,-81.4,-3.2C-81.8,-20.6,-74.8,-38.1,-62.7,-50.7C-50.6,-63.3,-33.4,-70.9,-16.4,-73.4C0.6,-75.9,17.6,-73.3,35.2,-66.2C35.2,-66.2,47.7,-65.4,47.7,-65.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionReveal className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
              Passions
            </span>
          </div>
          <h2
            data-cursor="invert"
            className="mb-5 text-[clamp(2.5rem,4.5vw,4.3rem)] font-bold leading-[0.95] tracking-[-0.04em] text-secondary"
          >
            Beyond Dentistry
          </h2>
          <p className="max-w-2xl text-[1rem] leading-8 text-secondary-light sm:text-[1.02rem]">
            Discover the other passions that drive Dr. Sarangi — from capturing
            the raw beauty of wildlife to sharing profound life experiences as
            an author.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ── Author Card ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-4xl bg-white shadow-[0_24px_64px_rgba(20,40,34,0.06)] ring-1 ring-[#dcebe3] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(20,40,34,0.12)]"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative z-10 flex h-full flex-col p-8 sm:p-12">
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  Author
                </span>
                <Link
                  href="/book"
                  className="text-secondary/40 transition-all duration-300 hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-label="View all books"
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-secondary sm:text-3xl">
                {pinnedBook.title}
              </h3>
              {pinnedBook.subtitle && (
                <p className="mb-4 text-sm font-medium text-primary">
                  {pinnedBook.subtitle}
                </p>
              )}
              <p className="mb-8 text-secondary-light/80 line-clamp-3">
                {pinnedBook.synopsis}
              </p>

              <div className="mt-auto flex flex-col items-start gap-8 sm:flex-row sm:items-end">
                {/* Book cover thumbnail */}
                <div className="relative h-44 w-28 shrink-0 overflow-hidden rounded-md shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                  <img
                    src={pinnedBook.coverImage}
                    alt={`${pinnedBook.title} cover`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary/50">
                    {pinnedBook.genre} · {pinnedBook.publishedYear}
                  </p>
                  <Button href={`/book`}>Explore Books</Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Photography Card ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative min-h-[440px] overflow-hidden rounded-4xl shadow-[0_24px_64px_rgba(20,40,34,0.06)] ring-1 ring-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(20,40,34,0.12)]"
          >
            {/* Background image from data */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
              <img
                src={featuredPhoto.src}
                alt={featuredPhoto.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14382c]/90 via-[#14382c]/40 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  Photography
                </span>
                {featuredPhoto.location && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {featuredPhoto.location}
                  </span>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                  {featuredPhoto.title}
                </h3>
                {featuredPhoto.description && (
                  <p className="mb-8 text-[1rem] text-white/80 line-clamp-2">
                    {featuredPhoto.description}
                  </p>
                )}
                <Button href={`/photography`}>Explore Photos</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
