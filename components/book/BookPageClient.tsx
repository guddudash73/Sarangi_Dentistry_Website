// components/book/BookPageClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

function getBookHeroImage(book: Book): string {
  return book.fullUrl ?? book.cardUrl ?? book.coverImage;
}

export default function BookPageClient({ book }: Props) {
  return (
    <main className="min-h-screen bg-[#f8fffa] text-secondary">
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#03966a]/5 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-[#80c8e5]/10 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#03966a]/10 px-4 py-2 text-sm font-semibold tracking-wide text-[#03966a]">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {book.genre} · {book.publishedYear}
              </div>

              <h1 data-cursor="invert" className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {book.title}
              </h1>

              {book.subtitle ? (
                <p className="mb-6 text-xl font-light text-[#03966a]">
                  {book.subtitle}
                </p>
              ) : null}

              <p className="mb-8 text-lg leading-relaxed text-secondary/75">
                {book.synopsis}
              </p>

              {book.excerpt ? (
                <blockquote className="mb-10 border-l-4 border-[#03966a] pl-5 italic text-secondary/60">
                  “{book.excerpt}”
                </blockquote>
              ) : null}

              <div className="flex flex-col gap-4 sm:flex-row">
                {book.buyLink ? (
                  <a
                    href={book.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#03966a] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#03966a]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#027553] hover:shadow-xl hover:shadow-[#03966a]/30"
                  >
                    Buy on Amazon
                  </a>
                ) : null}

                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-full border-2 border-secondary/20 bg-transparent px-8 py-4 text-base font-semibold text-secondary transition-all duration-300 hover:border-secondary hover:bg-secondary/5"
                >
                  ← All Books
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 flex justify-center lg:order-2 lg:justify-end"
            >
              <div className="relative h-[480px] w-[320px] sm:h-[580px] sm:w-[400px]">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl bg-secondary/10 blur-xl" />
                <div className="relative h-full w-full overflow-hidden rounded-l-md rounded-r-3xl border-l-8 border-[#1f3b33]/80 bg-white shadow-2xl">
                  <img
                    src={getBookHeroImage(book)}
                    alt={`${book.title} cover`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/20 mix-blend-overlay" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-[#dbe9e1] bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
          <div
            className="max-w-none text-secondary/72
              [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#03966a] [&_blockquote]:pl-6 [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-secondary/60
              [&_h2]:mb-5 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-secondary sm:[&_h2]:text-3xl
              [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-secondary
              [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
              [&_p]:my-6 [&_p]:text-lg [&_p]:leading-relaxed
              [&_strong]:font-semibold [&_strong]:text-secondary
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: book.bodyHtml }}
          />

          {book.testimonial ? (
            <div className="mt-16 rounded-2xl bg-[#edf7f1] p-8">
              <div className="mb-4 flex justify-center gap-1 text-[#03966a]">
                {Array.from({ length: Math.round(book.rating ?? 5) }).map(
                  (_, index) => (
                    <svg
                      key={index}
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ),
                )}
              </div>

              <p className="text-center text-lg italic text-secondary/70">
                “{book.testimonial.quote}”
              </p>

              {book.testimonial.author ? (
                <p className="mt-3 text-center text-sm font-medium text-secondary/50">
                  — {book.testimonial.author}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
