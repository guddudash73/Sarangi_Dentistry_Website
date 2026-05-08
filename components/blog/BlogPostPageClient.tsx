// components/blog/BlogPostPageClient.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { BlogPost } from "@/types/blog";
import PageBackground from "@/components/ui/PageBackground";
import Button from "@/components/ui/Button";

type BlogPostPageClientProps = {
  blog: BlogPost;
  relatedBlogs: BlogPost[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

function getBlogHeroImage(blog: BlogPost): string {
  return blog.fullUrl ?? blog.cardUrl ?? blog.image;
}

function getBlogCardImage(blog: BlogPost): string {
  return blog.cardUrl ?? blog.thumbnailUrl ?? blog.fullUrl ?? blog.image;
}

function FadeUp(props: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.68, delay: props.delay ?? 0, ease: EASE }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
}

export default function BlogPostPageClient({
  blog,
  relatedBlogs,
}: BlogPostPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-clip bg-background text-secondary">
      <section className="relative pt-20">
        <PageBackground />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-6 md:px-10 lg:px-16 lg:pb-20">
          <FadeUp>
            <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm font-medium text-secondary-light">
              <Link
                href="/"
                className="transition-colors hover:text-primary-hover"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="transition-colors hover:text-primary-hover"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-primary">{blog.title}</span>
            </nav>
          </FadeUp>

          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-primary-hover" />
              {blog.category}
            </motion.div>

            <motion.h1 data-cursor="invert"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
              className="mx-auto max-w-4xl text-[clamp(2.8rem,5.8vw,5.7rem)] font-bold leading-[0.92] tracking-[-0.055em] text-secondary"
            >
              {blog.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
              className="mx-auto mt-6 max-w-3xl text-[1rem] leading-8 text-secondary-light sm:text-[1.05rem]"
            >
              {blog.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: EASE }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-primary-hover"
            >
              <span>{blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
            className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[34px] border border-white/80 bg-white/60 p-3 shadow-[0_30px_80px_rgba(20,40,34,0.10)] backdrop-blur"
          >
            <img
              src={getBlogHeroImage(blog)}
              alt={blog.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[16/9] w-full rounded-[28px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-10 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <div
              className="max-w-none text-secondary-light
                [&_p]:my-5 [&_p]:text-[1.02rem] [&_p]:leading-8
                [&_h1]:pt-8 [&_h1]:text-[2rem] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:tracking-[-0.03em] [&_h1]:text-secondary
                [&_h2]:pt-8 [&_h2]:text-[1.75rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_h2]:text-secondary
                [&_h3]:pt-6 [&_h3]:text-[1.35rem] [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:tracking-[-0.02em] [&_h3]:text-secondary
                [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-6
                [&_blockquote]:text-[1.12rem] [&_blockquote]:font-medium [&_blockquote]:leading-8 [&_blockquote]:text-secondary
                [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:pl-6
                [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6
                [&_li]:text-[1.02rem] [&_li]:leading-8
                [&_ul>li]:list-disc [&_ul>li]:marker:text-primary
                [&_ol>li]:list-decimal [&_ol>li]:marker:text-primary
                [&_a]:font-medium [&_a]:text-primary-hover [&_a]:underline-offset-4 hover:[&_a]:underline
                [&_strong]:font-semibold [&_strong]:text-secondary
                [&_em]:italic"
              dangerouslySetInnerHTML={{ __html: blog.bodyHtml }}
            />
          </FadeUp>
        </div>
      </section>

      {relatedBlogs.length > 0 ? (
        <section className="relative px-5 py-14 sm:px-6 md:px-10 md:py-18 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <FadeUp>
              <div className="mb-10 text-center">
                <div className="mb-6 flex items-center gap-4">
  <div className="flex items-center">
    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
    <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
  </div>
  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
    Related Articles
  </span>
</div>

                <h2 data-cursor="invert" className="text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-secondary">
                  Continue reading
                </h2>
              </div>
            </FadeUp>

            <div className="grid gap-8 md:grid-cols-2">
              {relatedBlogs.map((item, index) => (
                <FadeUp key={item.id} delay={index * 0.06}>
                  <article className="group">
                    <Link href={`/blog/${item.id}`} className="block">
                      <div className="overflow-hidden rounded-[28px] border border-[#dcebe3] bg-white/85 shadow-[0_16px_36px_rgba(20,40,34,0.05)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_22px_48px_rgba(20,40,34,0.08)]">
                        <img
                          src={getBlogCardImage(item)}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/2.75] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />

                        <div className="p-6">
                          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-hover">
                            {item.category}
                          </div>

                          <h3 className="text-[1.2rem] font-semibold leading-tight text-secondary transition-colors duration-300 group-hover:text-primary-hover">
                            {item.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-[0.96rem] leading-7 text-secondary-light">
                            {item.excerpt}
                          </p>

                          <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Read Article
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
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative px-5 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[36px] border border-[#dce9e2] bg-primary shadow-[0_30px_80px_rgba(20,40,34,0.10)]">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/45 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/45 blur-3xl" />

              <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 text-center sm:px-8 md:px-10 md:py-14">
                <h2 data-cursor="invert" className="text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
                  Need personalized dental guidance?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-7 text-white/88 sm:text-[1.05rem] sm:leading-8">
                  Schedule a consultation with Sarangi Dentistry for clear,
                  patient-first advice.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button href="/contact" variant="white">
                    Schedule a Visit
                  </Button>

                  <Button href="/blog" variant="ghost">
                    Browse Articles
                  </Button>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
