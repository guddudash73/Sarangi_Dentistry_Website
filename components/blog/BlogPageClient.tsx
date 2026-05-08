// components/blog/BlogPageClient.tsx
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { BlogPost } from "@/types/blog";
import PageBackground from "@/components/ui/PageBackground";

type BlogPageClientProps = {
  blogs: BlogPost[];
  featuredBlog?: BlogPost;
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function getBlogCardImage(blog: BlogPost): string {
  return blog.cardUrl ?? blog.thumbnailUrl ?? blog.fullUrl ?? blog.image;
}

function getFeaturedBlogImage(blog: BlogPost): string {
  return blog.fullUrl ?? blog.cardUrl ?? blog.image;
}

export default function BlogPageClient({
  blogs,
  featuredBlog,
}: BlogPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  const remainingBlogs = featuredBlog
    ? blogs.filter((blog) => blog.id !== featuredBlog.id)
    : blogs;

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
    <main className="min-h-screen overflow-x-clip bg-background text-secondary">
      <section className="relative">
        <PageBackground />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="grid items-end gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                  Sarangi Dentistry Blog
                </span>
              </div>

              <h1
                data-cursor="invert"
                className="max-w-[10ch] text-[clamp(3rem,6vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.06em] text-secondary"
              >
                Stories, care notes, and dental guidance
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pb-3">
              <p className="max-w-xl text-[1rem] leading-7 text-primary-hover sm:text-[1.05rem] sm:leading-8">
                Read patient-friendly articles from Sarangi Dentistry on oral
                health, treatment choices, preventive care, and modern
                dentistry.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-10 sm:px-6 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {blogs.length === 0 ? (
            <div className="rounded-[30px] border border-[#dcebe3] bg-white/80 px-6 py-14 text-center shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur">
              <h2
                data-cursor="invert"
                className="text-2xl font-bold tracking-[-0.03em] text-secondary"
              >
                Blog coming soon
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-secondary-light">
                Articles will appear here once they are published from the
                Sarangi Dentistry CMS.
              </p>
            </div>
          ) : (
            <>
              {featuredBlog ? (
                <motion.article
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className="group overflow-hidden rounded-[34px] border border-[#dcebe3] bg-white/86 shadow-[0_22px_56px_rgba(20,40,34,0.07)]"
                >
                  <div className="grid lg:grid-cols-12">
                    <Link
                      href={featuredBlog.path}
                      className="relative block overflow-hidden lg:col-span-7"
                    >
                      <img
                        src={getFeaturedBlogImage(featuredBlog)}
                        alt={featuredBlog.title}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,28,22,0.04),rgba(10,28,22,0.38))]" />
                    </Link>

                    <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-5 lg:p-12">
                      <div className="mb-5 flex flex-wrap gap-3">
                        <span className="rounded-full border border-[#d8e8df] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                          Featured
                        </span>
                        <span className="rounded-full border border-[#d8e8df] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-hover">
                          {featuredBlog.category}
                        </span>
                      </div>

                      <h2
                        data-cursor="invert"
                        className="text-[clamp(2rem,4vw,3.7rem)] font-bold leading-[0.95] tracking-[-0.05em] text-secondary"
                      >
                        {featuredBlog.title}
                      </h2>

                      <p className="mt-5 line-clamp-4 text-[1rem] leading-7 text-secondary-light">
                        {featuredBlog.excerpt}
                      </p>

                      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#dcebe3] pt-6">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-light">
                            {featuredBlog.author}
                          </div>
                          <div className="mt-1 text-sm text-primary-hover">
                            {featuredBlog.date} · {featuredBlog.readTime}
                          </div>
                        </div>

                        <Link
                          href={featuredBlog.path}
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
              ) : null}

              {remainingBlogs.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.08 }}
                  className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3"
                >
                  {remainingBlogs.map((blog, index) => (
                    <motion.article
                      key={blog.id}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                      className="group overflow-hidden rounded-[30px] border border-[#dcebe3] bg-white/90 shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:border-[#cfe3d8] hover:shadow-[0_24px_54px_rgba(20,40,34,0.08)]"
                    >
                      <Link href={blog.path} className="block">
                        <div className="relative overflow-hidden">
                          <img
                            src={getBlogCardImage(blog)}
                            alt={blog.title}
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={index < 2 ? "high" : "auto"}
                            className="aspect-[4/2.85] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          />
                          <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
                            {blog.category}
                          </div>
                        </div>

                        <div className="p-6 sm:p-7">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                              {blog.readTime}
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-light">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h2
                            data-cursor="invert"
                            className="text-[1.55rem] font-bold leading-[1.02] tracking-[-0.04em] text-secondary sm:text-[1.75rem]"
                          >
                            {blog.title}
                          </h2>

                          <p className="mt-4 line-clamp-3 text-[0.96rem] leading-7 text-secondary-light">
                            {blog.excerpt}
                          </p>

                          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#dcebe3] pt-5">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                              Read article
                            </span>

                            <span className="text-sm text-secondary-light">
                              {blog.date}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
