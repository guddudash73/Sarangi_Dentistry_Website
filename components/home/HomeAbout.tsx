"use client";

import Button from "@/components/ui/Button";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Image from "next/image";

function DotFigure({ animated = true }: { animated?: boolean }) {
  const dots = [
    [3, 0],
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [2, 5],
    [3, 5],
    [4, 5],
    [3, 6],
  ];

  const size = 10;
  const gap = 18;

  return (
    <svg viewBox="0 0 140 140" className="h-full w-full" aria-hidden="true">
      {dots.map(([x, y], i) => {
        const delay = y * 0.16 + x * 0.03;

        return animated ? (
          <motion.circle
            key={i}
            cx={20 + x * gap}
            cy={16 + y * gap}
            r={size / 2}
            fill="#67a99b"
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.16, 0.34, 0.16],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            style={{ transformOrigin: `${20 + x * gap}px ${16 + y * gap}px` }}
          />
        ) : (
          <circle
            key={i}
            cx={20 + x * gap}
            cy={16 + y * gap}
            r={size / 2}
            fill="#67a99b"
            opacity="0.18"
          />
        );
      })}
    </svg>
  );
}

export default function HomeAbout() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageWrapY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 36, prefersReducedMotion ? 0 : -28],
  );

  const imageRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 1.2, prefersReducedMotion ? 0 : -1],
  );

  const mainImageY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : -12, prefersReducedMotion ? 0 : 14],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 18, prefersReducedMotion ? 0 : -10],
  );

  const dotsY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 10, prefersReducedMotion ? 0 : -12],
  );

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative" }}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* ✅ NEW HERO-LIKE BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        {/* <div className="absolute inset-0 bg-[rgba(236,247,241,0.7)]" /> */}

        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(100,203,186,0),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(100,203,186,0.3),transparent_30%),radial-gradient(circle_at_50%_75%,rgba(36,68,58,0.06),transparent_34%)]" /> */}

        {/* <div className="absolute inset-0 bg-linear-to-b from-[rgba(255,255,255,0.25)] via-[rgba(248,255,250,0.12)] to-[rgba(248,255,250,0.35)]" /> */}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <motion.div
          style={{ y: imageWrapY, rotate: imageRotate }}
          className="lg:col-span-6"
        >
          <div className="relative mx-auto max-w-135">
            <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full bg-white/85 blur-3xl md:block" />
            <div className="absolute -right-10 bottom-6 hidden h-36 w-36 rounded-full bg-white/85 blur-3xl md:block" />

            <div className="relative isolate overflow-visible">
              <div className="relative overflow-hidden rounded-4xl shadow-[0_24px_64px_rgba(20,40,34,0.12)] ring-1 ring-white/70">
                <motion.div
                  style={{ y: mainImageY }}
                  className="aspect-[4/4.35] sm:aspect-4/3 lg:aspect-[4/3.95]"
                >
                  <Image width={1200} height={1200} 
                    src="/assets/about-img.png"
                    alt="Dr. Soumendra Sarangi"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-linear-to-t from-[#0c3e2f]/30 via-transparent to-white/5" />
                <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/40" />
              </div>

              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : { y: [0, -8, 0], rotate: [0, -1, 0] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-3 hidden h-28 w-28 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_18px_34px_rgba(20,40,34,0.12)] md:block lg:h-32 lg:w-32"
              >
                <Image width={1200} height={1200} 
                  src="/assets/DSC_0005-Copy-scaled.jpg"
                  alt="Dental care"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#14382c]/18 to-transparent" />
              </motion.div>

              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : { y: [0, -10, 0], rotate: [0, 1.2, 0] }
                }
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute -bottom-5 -right-1 rounded-[26px] border border-[#dcebe3] bg-white/30 px-5 py-4 shadow-[0_18px_38px_rgba(20,40,34,0.12)] backdrop-blur md:-right-2.5 lg:-right-4 lg:px-5 lg:py-4"
              >
                <div className="text-4xl font-black tracking-[-0.04em] lg:text-5xl ">
                  36<span>+</span>
                </div>
                <p className="mt-2 max-w-42.5 text-[11px] font-bold uppercase tracking-[0.22em] leading-5">
                  Years Experience Overall
                </p>
              </motion.div>

              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y: contentY }} className="relative lg:col-span-6">
          <motion.div
            style={{ y: dotsY }}
            className="pointer-events-none absolute -right-2 bottom-10 hidden h-52.5 w-52.5 md:block"
          >
            <DotFigure animated={!prefersReducedMotion} />
          </motion.div>

          <motion.div
            style={{ y: dotsY }}
            className="pointer-events-none absolute right-0 bottom-2 h-33 w-33 md:hidden"
          >
            <DotFigure animated={!prefersReducedMotion} />
          </motion.div>

          <SectionReveal>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                About
              </span>
            </div>

            <h2
              data-cursor="invert"
              className="text-[clamp(2.5rem,4.5vw,4.3rem)] font-bold leading-[0.95] tracking-[-0.04em] text-secondary"
            >
              Dr. Soumendra Sarangi
            </h2>

            <div className="mt-5 space-y-5 text-[1rem] leading-8 text-secondary-light sm:text-[1.02rem]">
              <p>
                After his graduation from Dental Wing of S.C.B Medical College,
                Cuttack in year 1988, Dr. Sarangi completed his internship from
                the same institute. He got selected in OPSC and served the
                Government of Odisha, including the Chief Minister and Governor.
              </p>
              <p>
                Besides his specialist expertise in Root Canal Treatment, Crown
                & Bridge, Implantology, and Cosmetic Dentistry, Dr. Sarangi has
                remained an active member of national and international dental
                societies with strong community recognition.
              </p>
            </div>

            <div className="mt-8">
              <Button href="/about">
                Know More
                <svg
                  className="h-5 w-5 transition-transform duration-300"
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
              </Button>
            </div>
          </SectionReveal>
        </motion.div>
      </div>
    </section>
  );
}
