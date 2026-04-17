"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { BlogPost } from "@/types/blog";

type BlogPostPageClientProps = {
  blog: BlogPost;
  relatedBlogs: BlogPost[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function ContentRenderer({ content }: { content: BlogPost["content"] }) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-6 text-[1.6rem] font-bold leading-tight tracking-[-0.03em] text-[#24443a] sm:text-[1.9rem]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={index}
              className="text-[1rem] leading-8 text-[#3f5b51] sm:text-[1.05rem]"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <div
              key={index}
              className="rounded-[28px] border border-[#d9e8e0] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,248,244,0.92))] px-6 py-6 shadow-[0_16px_36px_rgba(20,40,34,0.04)]"
            >
              <p className="text-[1.1rem] font-medium leading-8 tracking-[-0.01em] text-[#24443a] sm:text-[1.2rem]">
                “{block.text}”
              </p>
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-3">
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex gap-3 text-[1rem] leading-7 text-[#3f5b51]"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#03966a] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function BlogPostPageClient({
  blog,
  relatedBlogs,
}: BlogPostPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7fbf9] pt-28 text-[#24443a]">
      <section className="relative overflow-hidden border-b border-[#dcebe3] bg-[linear-gradient(180deg,rgba(249,253,251,1),rgba(239,248,243,0.96))]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(3,150,106,0.12),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(36,68,58,0.06),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-6 md:px-10 lg:px-16">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-[#5a746a]">
            <Link href="/" className="transition-colors hover:text-[#03966a]">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="transition-colors hover:text-[#03966a]"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#03966a]">{blog.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <div className="mb-5 inline-flex items-center rounded-full border border-[#d8e8df] bg-white/82 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2f6e5b] shadow-[0_10px_20px_rgba(20,40,34,0.04)]">
                {blog.category}
              </div>

              <h1 className="max-w-[12ch] text-[clamp(2.7rem,5.4vw,5.6rem)] font-bold leading-[0.92] tracking-[-0.055em] text-[#21493d]">
                {blog.title}
              </h1>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[28px] border border-[#d9e8e0] bg-white/80 p-5 shadow-[0_14px_30px_rgba(20,40,34,0.04)]">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                  Written by
                </div>
                <div className="mt-2 text-lg font-semibold text-[#24443a]">
                  {blog.author}
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                  Published
                </div>
                <div className="mt-2 text-base text-[#4a635a]">{blog.date}</div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                  Reading time
                </div>
                <div className="mt-2 text-base text-[#4a635a]">
                  {blog.readTime}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
            className="mt-10 overflow-hidden rounded-[34px] border border-white/80 shadow-[0_30px_80px_rgba(20,40,34,0.12)]"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-14 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 rounded-[30px] border border-[#d9e8e0] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,250,246,0.95))] p-6 shadow-[0_18px_40px_rgba(20,40,34,0.05)]">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d877d]">
                Article Navigation
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#2f5548] transition-colors duration-300 hover:text-[#03966a]"
                >
                  <svg
                    className="h-4 w-4 rotate-180"
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
                  Back to Blog
                </Link>
              </div>

              <div className="mt-8 rounded-[24px] border border-[#dcebe3] bg-white/80 p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                  Designed for
                </div>
                <div className="mt-2 text-base font-semibold text-[#24443a]">
                  Clear patient education
                </div>
              </div>
            </div>
          </aside>

          <motion.article
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:col-span-6"
          >
            <div className="rounded-[34px] border border-[#dcebe3] bg-white/88 p-6 shadow-[0_24px_60px_rgba(20,40,34,0.05)] sm:p-8 md:p-10">
              <ContentRenderer content={blog.content} />
            </div>
          </motion.article>

          <aside className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-[30px] border border-[#d9e8e0] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,250,246,0.95))] p-6 shadow-[0_18px_40px_rgba(20,40,34,0.05)]"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d877d]">
                More from the journal
              </div>

              <div className="mt-5 space-y-4">
                {relatedBlogs.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.id}`}
                    className="group block rounded-[24px] border border-[#dcebe3] bg-white/76 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8ddd2]"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                      {item.category}
                    </div>
                    <div className="mt-2 text-base font-semibold leading-6 text-[#24443a] transition-colors duration-300 group-hover:text-[#03966a]">
                      {item.title}
                    </div>
                    <div className="mt-3 text-sm text-[#557067]">
                      {item.readTime}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </section>
    </main>
  );
}
