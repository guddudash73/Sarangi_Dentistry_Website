"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { BlogPost } from "@/types/blog";

type BlogPageClientProps = {
  blogs: BlogPost[];
  featuredBlog?: BlogPost;
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export default function BlogPageClient({
  blogs,
  featuredBlog,
}: BlogPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

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
      y: prefersReducedMotion ? 0 : 28,
      scale: prefersReducedMotion ? 1 : 0.985,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.58,
        ease: EASE,
      },
    },
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7fbf9] pt-28 text-[#24443a]">
      <section className="relative overflow-hidden border-b border-[#dcebe3] bg-[linear-gradient(180deg,rgba(249,253,251,1),rgba(241,248,244,0.96))]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[6%] top-[10%] h-56 w-56 rounded-full bg-[#def2e8] blur-3xl" />
          <div className="absolute right-[8%] top-[16%] h-64 w-64 rounded-full bg-[#edf8f3] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,150,106,0.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9e8e0] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9e8e0] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-4 border-b border-[#dcebe3] pb-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/82 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2d6b58] shadow-[0_10px_24px_rgba(20,40,34,0.05)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                Journal & Insights
              </div>

              <div className="hidden h-px flex-1 bg-gradient-to-r from-[#dcebe3] to-transparent md:block" />

              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#6d877d]">
                Sarangi Dentistry Editorial
              </div>
            </div>

            <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-14 lg:pt-12">
              <div className="lg:col-span-8">
                <div className="max-w-5xl">
                  <div className="mb-6 text-[11px] font-bold uppercase tracking-[0.28em] text-[#6d877d]">
                    Modern patient education
                  </div>

                  <h1 className="max-w-[10ch] text-[clamp(3.1rem,6vw,6.6rem)] font-bold leading-[0.86] tracking-[-0.07em] text-[#21493d]">
                    Thoughtful dental reading, with a sharper editorial feel
                  </h1>

                  <p className="mt-8 max-w-3xl text-[1rem] leading-7 text-[#49635a] sm:text-[1.06rem] sm:leading-8 md:text-[1.1rem]">
                    In-depth articles on oral health, smile restoration,
                    preventive care, and modern treatment guidance — presented
                    in a cleaner journal-style format that feels distinct from
                    the rest of the site while still belonging to the Sarangi
                    Dentistry brand.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[28px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_30px_rgba(20,40,34,0.04)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d877d]">
                      Focus
                    </div>
                    <div className="mt-3 text-lg font-semibold leading-7 text-[#24443a]">
                      Clear patient guidance
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#d9e8e0] bg-[#24443a] p-5 text-white shadow-[0_18px_40px_rgba(20,40,34,0.10)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/68">
                      Tone
                    </div>
                    <div className="mt-3 text-lg font-semibold leading-7">
                      Premium, calm, readable
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_14px_30px_rgba(20,40,34,0.04)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d877d]">
                      Topics
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Oral Health", "Orthodontics", "Restorative"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#d7e7de] bg-[#f8fcfa] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2f6e5b]"
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-[#dcebe3] pt-6 sm:grid-cols-3 lg:max-w-3xl">
              {[
                { value: "03+", label: "Published Articles" },
                { value: "Patient", label: "First Writing" },
                { value: "Clear", label: "Readable Format" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-[#d9e8e0] bg-white/74 p-5 shadow-[0_12px_26px_rgba(20,40,34,0.04)]"
                >
                  <div className="text-[2rem] font-black tracking-[-0.05em] text-[#24443a]">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6d877d]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {featuredBlog && (
        <section className="relative px-5 pb-10 pt-10 sm:px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <motion.article
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden rounded-[36px] border border-[#dcebe3] bg-white shadow-[0_28px_80px_rgba(20,40,34,0.07)]"
            >
              <div className="grid items-stretch lg:grid-cols-12">
                <div className="relative min-h-[320px] lg:col-span-7 lg:min-h-[520px]">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,24,19,0.28),rgba(10,24,19,0.08)_35%,rgba(10,24,19,0.28)_100%)]" />
                </div>

                <div className="relative flex flex-col justify-between bg-[linear-gradient(180deg,rgba(249,253,251,1),rgba(241,248,244,0.96))] p-6 sm:p-8 lg:col-span-5 lg:p-10">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#dff3e8] blur-3xl" />
                    <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#eaf7f0] blur-3xl" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-5 inline-flex items-center rounded-full border border-[#d6e7de] bg-white/76 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2f6e5b]">
                      Featured Article
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d877d]">
                      <span>{featuredBlog.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#9bb7aa]" />
                      <span>{featuredBlog.readTime}</span>
                    </div>

                    <h2 className="text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[#24443a]">
                      {featuredBlog.title}
                    </h2>

                    <p className="mt-5 text-[1rem] leading-7 text-[#49635a] sm:text-[1.05rem] sm:leading-8">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center justify-between gap-4 border-t border-[#dcebe3] pt-6">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d877d]">
                        By {featuredBlog.author}
                      </div>
                      <div className="mt-1 text-sm text-[#49635a]">
                        {featuredBlog.date}
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#cfe0d7] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2f5548] shadow-[0_8px_18px_rgba(20,40,34,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b8d7c7] hover:text-[#03966a]"
                    >
                      Read Article
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
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      <section className="relative px-5 pb-24 pt-6 sm:px-6 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 border-b border-[#dcebe3] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#6d877d]">
                All Posts
              </div>
              <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em] text-[#24443a]">
                Explore the latest insights
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-[#5b756b]">
              Articles designed to inform patients with clarity, warmth, and a
              more contemporary editorial presentation.
            </p>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                variants={itemVariants}
                className="group overflow-hidden rounded-[30px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,250,246,0.98))] shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#cfe3d8] hover:shadow-[0_24px_54px_rgba(20,40,34,0.08)]"
              >
                <div className="grid md:grid-cols-12">
                  <div className="relative min-h-[240px] md:col-span-5">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f19]/46 via-transparent to-white/8" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/14 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 md:col-span-7 sm:p-7">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d877d]">
                        <span>{blog.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[#9bb7aa]" />
                        <span>{blog.readTime}</span>
                      </div>

                      <h4 className="text-[1.55rem] font-bold leading-[1.02] tracking-[-0.04em] text-[#24443a] transition-colors duration-300 group-hover:text-[#03966a]">
                        {blog.title}
                      </h4>

                      <p className="mt-4 line-clamp-3 text-[0.98rem] leading-7 text-[#4a635a]">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#dcebe3] pt-5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d877d]">
                          {blog.author}
                        </div>
                        <div className="mt-1 text-sm text-[#5b756b]">
                          {blog.date}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#2f5548] transition-colors duration-300 hover:text-[#03966a]"
                      >
                        Read More
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
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
