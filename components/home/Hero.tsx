"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PageBackground from "@/components/ui/PageBackground";
import Button from "@/components/ui/Button";

type HeroPair = {
  head: string;
  subhead: string;
  image: string;
  chip: string;
};

const HERO_PAIRS: HeroPair[] = [
  {
    head: "Best Dentistry in Bhubaneswar",
    subhead:
      "Welcome to the best dentistry in Bhubaneswar. Sophisticated dental procedures and advanced treatments carefully tailored to enhance your smile, delivering natural-looking, long-lasting results.",
    image: "/assets/seat_1.jpg",
    chip: "Premium Dental Care",
  },
  {
    head: "Artistic Smile Rejuvenation",
    subhead:
      "Specializing in aesthetic and functional smile restorations, we utilize advanced dental implant techniques and cutting-edge procedures—ranging from minimally invasive solutions to ultra-modern laser surgeries—to deliver precise, comfortable care.",
    image: "/assets/seat_2.jpg",
    chip: "Smile Aesthetics",
  },
  {
    head: "Confidence in Every Smile",
    subhead:
      "Experience customized porcelain and ceramic crowns meticulously designed and crafted to perfection, combining superior craftsmanship with cutting-edge technology to restore the natural beauty, strength, and vitality of your teeth.",
    image: "/assets/seat_3.jpg",
    chip: "Restorative Precision",
  },
];

const AUTO_CHANGE_MS = 5500;
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
const EXIT_EASE: Transition["ease"] = [0.4, 0, 1, 1];

function AnimatedHeading({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  const headingClassName =
    "mx-auto max-w-[12ch] pb-[0.08em] text-center text-5xl font-bold leading-[0.99] tracking-normal text-secondary sm:max-w-[11ch] sm:leading-[0.99] md:max-w-[12ch] md:text-7xl md:leading-[0.99] lg:max-w-[14ch] lg:leading-[0.99]";

  if (prefersReducedMotion) {
    return (
      <h1 data-cursor="invert" className={headingClassName}>
        {text}
      </h1>
    );
  }

  return (
    <motion.h1
      data-cursor="invert"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05, delayChildren: 0.03 },
        },
        exit: {
          transition: { staggerChildren: 0.02, staggerDirection: -1 },
        },
      }}
      className={headingClassName}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.14em] inline-block align-baseline last:mr-0"
        >
          <span className="inline-block overflow-hidden pb-[0.05em]">
            <motion.span
              variants={{
                hidden: { y: "110%", opacity: 0, filter: "blur(10px)" },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.65,
                    ease: EASE,
                  },
                },
                exit: {
                  y: "-110%",
                  opacity: 0,
                  filter: "blur(8px)",
                  transition: { duration: 0.22, ease: EXIT_EASE },
                },
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeSlide = HERO_PAIRS[index];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -36],
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 24],
  );

  const imageRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -1.2],
  );

  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.82]);

  useEffect(() => {
    HERO_PAIRS.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
      img.decoding = "async";
    });

    const bg = new window.Image();
    bg.src = "/assets/sketch_it_sarangi.png";
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      if (!document.hidden) {
        setIndex((prev) => (prev + 1) % HERO_PAIRS.length);
      }
    }, AUTO_CHANGE_MS);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative" }}
      className="relative min-h-screen isolate overflow-hidden"
    >
      <motion.div className="pointer-events-none absolute inset-0">
        <PageBackground withSketch />
      </motion.div>

      <div className="relative mx-auto grid min-h-svh max-w-7xl grid-cols-1 gap-10 px-4 pb-12 pt-28 sm:min-h-[92svh] sm:px-6 sm:pb-14 sm:pt-32 md:gap-12 md:px-10 md:pb-16 md:pt-32 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-16 lg:pb-16 lg:pt-28">
        <motion.div
          style={{ y: textY }}
          className="order-2 min-w-0 lg:order-1 lg:col-span-7 lg:pt-10"
        >
          <div className="max-w-4xl lg:min-h-160">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.45, ease: EASE },
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  filter: "blur(8px)",
                  transition: { duration: 0.22, ease: EXIT_EASE },
                }}
                className="min-w-0"
              >
                <AnimatedHeading text={activeSlide.head} />

                <p className="mx-auto mt-4 max-w-3xl text-[0.98rem] font-light leading-7 text-center text-foreground sm:mt-5 sm:text-[1.02rem] sm:leading-8 md:text-[clamp(1rem,1.7vw,1.25rem)]">
                  {activeSlide.subhead}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button
                href="/book-appointment"
                className="hidden md:inline-flex"
              >
                Book Appointment
              </Button>

              <Button
                href="/gallery"
                variant="outline"
                className="hidden md:inline-flex"
              >
                Explore Clinic
              </Button>
            </div>

            <div className="mt-10 hidden md:grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { value: "36+", label: "Years Experience" },
                { value: "", label: "Same Day Treatment Availability" },
                { value: "15k+", label: "Happy Smiles" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-[#d9e8e0] bg-white/78 p-5 shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur"
                >
                  <div className="text-[2.15rem] font-black tracking-[-0.04em] text-secondary sm:text-4xl">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-light sm:text-xs sm:tracking-[0.2em]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: imageY, rotate: imageRotate }}
          className="order-1 min-w-0 lg:order-2 lg:col-span-5 lg:pt-10"
        >
          <div className="relative mx-auto w-full max-w-155">
            <div className="absolute -right-5 -top-5 hidden h-28 w-28 rounded-full bg-[#dff5e8] blur-2xl md:block" />

            <div className="relative isolate">
              <div className="relative overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_30px_80px_rgba(20,40,34,0.14)] transform-gpu backface-hidden will-change-transform sm:rounded-[30px] md:rounded-[34px]">
                <div className="relative aspect-[4/2.65] overflow-hidden rounded-[26px] backface-hidden sm:rounded-[30px] md:rounded-[34px] lg:aspect-[4/4.8]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeSlide.image}
                      initial={{ opacity: 0, scale: 1.05, rotate: 1 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        transition: { duration: 0.8, ease: EASE },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.03,
                        transition: { duration: 0.28, ease: EXIT_EASE },
                      }}
                      className="absolute inset-0 h-full w-full rounded-[26px] overflow-hidden transform-gpu backface-hidden sm:rounded-[30px] md:rounded-[34px]"
                    >
                      <Image
                        src={activeSlide.image}
                        alt={activeSlide.head}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 rounded-[26px] bg-linear-to-t from-[#0c1b15]/42 via-transparent to-white/10 sm:rounded-[30px] md:rounded-[34px]" />

                  <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-2xl border border-white/20 bg-black/15 px-4 py-3 text-white backdrop-blur-md sm:left-5 sm:top-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                      Sarangi Dentistry
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      Smile aesthetics & advanced care
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
