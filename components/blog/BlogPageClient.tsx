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
    <main className="min-h-screen overflow-x-clip text-secondary bg-background">
      <section className="relative overflow-hidden pt-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[6%] top-[10%] h-56 w-56 rounded-full bg-accent-soft/40 blur-3xl" />
          <div className="absolute right-[8%] top-[16%] h-64 w-64 rounded-full bg-accent-soft/40 blur-3xl" />
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

            <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-14 lg:pt-12">
              <div className="lg:col-span-full flex justify-center items-center">
                <div className="max-w-full">
                  <div className=" text-center mb-6 text-[11px] font-bold uppercase tracking-[0.28em] text-secondary-light">
                    Modern patient education
                  </div>
                  <h1 className="max-w-full text-[clamp(3.1rem,6vw,6.6rem)] font-bold leading-[0.86] tracking-[-0.07em] text-secondary text-center"  >
                    Thoughtful dental reading, with a sharper editorial feel
                  </h1>

                  <p className="mt-8 max-w-full text-[1rem] leading-7 text-secondary-light sm:text-[1.06rem] sm:leading-8 md:text-[1.1rem] text-center">
                    In-depth articles on oral health, smile restoration,
                    preventive care, and modern treatment guidance — presented
                    in a cleaner journal-style format that feels distinct from
                    the rest of the site while still belonging to the Sarangi
                    Dentistry brand.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-[#dcebe3] pt-6 sm:grid-cols-3 lg:max-w-full text-center">
              {[
                { value: "03+", label: "Published Articles" },
                { value: "Patient", label: "First Writing" },
                { value: "Clear", label: "Readable Format" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-[#d9e8e0] bg-white/74 p-5 shadow-[0_12px_26px_rgba(20,40,34,0.04)]"
                >
                  <div className="text-[2rem] font-black tracking-[-0.05em] text-primary">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-light">
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
                    <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-accent-soft/30 blur-3xl" />
                    <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent-soft/30 blur-3xl" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-5 inline-flex items-center rounded-full border border-[#d6e7de] bg-white/76 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                      Featured Article
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-light">
                      <span>{featuredBlog.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#9bb7aa]" />
                      <span>{featuredBlog.readTime}</span>
                    </div>

                    <h2 className="text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[0.95] tracking-[-0.05em] text-secondary">
                      {featuredBlog.title}
                    </h2>

                    <p className="mt-5 text-[1rem] leading-7 text-secondary-light sm:text-[1.05rem] sm:leading-8">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center justify-between gap-4 border-t border-[#dcebe3] pt-6">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-hover">
                        By {featuredBlog.author}
                      </div>
                      <div className="mt-1 text-sm text-secondary">
                        {featuredBlog.date}
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#cfe0d7] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary-light shadow-[0_8px_18px_rgba(20,40,34,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-hover hover:text-[#03966a]"
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
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                All Posts
              </div>
              <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em] text-secondary">
                Explore the latest insights
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-primary-hover">
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
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                        <span>{blog.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[#9bb7aa]" />
                        <span>{blog.readTime}</span>
                      </div>

                      <h4 className="text-[1.55rem] font-bold leading-[1.02] tracking-[-0.04em] text-secondary transition-colors duration-300 group-hover:text-primary">
                        {blog.title}
                      </h4>

                      <p className="mt-4 line-clamp-3 text-[0.98rem] leading-7 text-secondary-light">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#dcebe3] pt-5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-light">
                          {blog.author}
                        </div>
                        <div className="mt-1 text-sm text-primary-hover">
                          {blog.date}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:text-secondary-light"
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
