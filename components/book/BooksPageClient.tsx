// components/book/BooksPageClient.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { Book } from "@/types/book";
import PageBackground from "@/components/ui/PageBackground";
import Image from "next/image";

type BooksPageClientProps = {
  books: Book[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function getBookCardImage(book: Book): string {
  return book.cardUrl ?? book.thumbnailUrl ?? book.fullUrl ?? book.coverImage;
}

export default function BooksPageClient({ books }: BooksPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-secondary">
      <section className="relative">
        <PageBackground />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                Author & Writing
              </span>
            </div>

            <h1
              data-cursor="invert"
              className="text-[clamp(3.2rem,6.5vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-secondary"
            >
              Books by Dr. Sarangi
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-8 text-secondary-light sm:text-[1.15rem]">
              Explore published works, reflections, and personal writing
              spanning decades of professional and life experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-8 sm:px-6 md:px-10 md:pb-32 lg:px-16">
        <div className="relative mx-auto max-w-7xl">
          {books.length === 0 ? (
            <div className="rounded-[30px] border border-[#dcebe3] bg-white/80 px-6 py-14 text-center shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur">
              <h2
                data-cursor="invert"
                className="text-2xl font-bold tracking-[-0.03em] text-secondary"
              >
                Books coming soon
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-secondary-light">
                Books will appear here once they are published from the CMS.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <motion.article
                  key={book.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.05,
                    ease: EASE,
                  }}
                  className="group"
                >
                  <Link href={book.path} className="block h-full">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-[#dcebe3] bg-white/90 p-6 sm:p-8 shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_60px_rgba(20,40,34,0.12)]">
                      {/* 3D Book Cover Wrapper */}
                      <div className="relative mx-auto mb-8 w-2/3 max-w-[190px] shrink-0">
                        {/* Drop shadow */}
                        <div className="absolute -right-4 top-4 bottom-2 w-full rounded-xl bg-[#1f3b33]/15 blur-xl transition-all duration-500 group-hover:-right-6 group-hover:top-6 group-hover:blur-2xl" />

                        {/* Book pages edge (right side) */}
                        <div className="absolute inset-y-1 right-0 w-4 translate-x-full rounded-r-md border-y border-r border-[#dcebe3] bg-[linear-gradient(to_right,#f9fdfb,#e6f0eb)] shadow-inner transition-transform duration-500 group-hover:w-5 group-hover:translate-x-full" />

                        <div className="relative aspect-[3/4] overflow-hidden rounded-l-[4px] rounded-r-sm border-l-4 border-black/20 bg-[#f4faf7] shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                          <Image width={1200} height={1200} 
                            src={getBookCardImage(book)}
                            alt={`${book.title} cover`}
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {book.pinned ? (
                          <div className="absolute -left-5 -top-4 rounded-full bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                            Featured
                          </div>
                        ) : null}
                      </div>

                      <div className="text-center">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                          {book.genre} · {book.publishedYear}
                        </div>

                        <h2
                          data-cursor="invert"
                          className="mt-4 line-clamp-2 text-[1.4rem] font-bold leading-tight tracking-[-0.04em] text-secondary transition-colors group-hover:text-primary-hover"
                        >
                          {book.title}
                        </h2>

                        {book.subtitle ? (
                          <p className="mx-auto mt-2 max-w-sm line-clamp-1 text-sm font-medium text-secondary-light/70">
                            {book.subtitle}
                          </p>
                        ) : null}

                        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-[#dcebe3] bg-[#f9fdfb] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white shadow-sm">
                          Explore Book
                          <svg
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
