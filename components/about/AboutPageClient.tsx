"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Lenis from "lenis";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const WHY_US_ITEMS = [
  {
    title: "Precision-Driven Dentistry",
    text: "Every treatment at Sarangi Dentistry is guided by thoughtful planning, clinical accuracy, and modern techniques that prioritize long-term oral health, aesthetic harmony, and patient comfort.",
  },
  {
    title: "A Calm Patient Experience",
    text: "We believe dentistry should feel reassuring, clear, and personal. From your first consultation to follow-up care, each step is designed to feel comfortable and confidence-building.",
  },
  {
    title: "Expert-Led Care",
    text: "Our clinic combines experienced dental expertise, refined treatment planning, and advanced clinical systems to deliver dependable outcomes with warmth and precision.",
  },
  {
    title: "Safe, Sterile, Trusted",
    text: "We maintain strict sterilization protocols and disciplined clinical workflows to ensure a clean, safe, and trustworthy environment for every patient.",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Excellence",
    desc: "We uphold high clinical standards and continually invest in modern technologies and refined treatment methods.",
  },
  {
    num: "02",
    title: "Compassion",
    desc: "We approach each patient with empathy, patience, and the gentle care needed for a reassuring experience.",
  },
  {
    num: "03",
    title: "Integrity",
    desc: "We value honest guidance, transparent communication, and ethical decision-making in every treatment plan.",
  },
  {
    num: "04",
    title: "Collaboration",
    desc: "We work closely with our patients so treatment feels understood, personalized, and aligned with their goals.",
  },
  {
    num: "05",
    title: "Trust",
    desc: "We build lasting relationships through safety, consistency, reliability, and truly patient-centered care.",
  },
];

const HIGHLIGHTS = [
  { value: "36+", label: "Years of Experience" },
  { value: "15k+", label: "Healthy Smiles" },
  { value: "Modern", label: "Dental Technology" },
  { value: "1:1", label: "Personalized Care" },
];

export default function AboutPageClient() {
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1.04, prefersReducedMotion ? 1.01 : 1],
  );

  const heroTextY = useTransform(
    scrollYProgress,
    [0, 0.35],
    [0, prefersReducedMotion ? -12 : -42],
  );

  const aboutY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.68],
    ["100%", "88%", "34%", "0%"],
  );

  const aboutScale = useTransform(
    scrollYProgress,
    [0, 0.18, 1],
    [0.94, 0.975, 1],
  );

  const aboutRadius = useTransform(
    scrollYProgress,
    [0, 0.48, 0.68],
    [34, 34, 0],
  );

  const aboutInset = useTransform(
    scrollYProgress,
    [0, 0.18, 0.48, 0.68],
    ["3.5%", "3%", "1.2%", "0%"],
  );

  const scrollHintY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, prefersReducedMotion ? 0 : -10],
  );

  const floatYOne = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -18],
  );

  const floatYTwo = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 22],
  );

  return (
    <main className="min-h-screen bg-[#f6fbf8] text-[#24443a]">
      <section ref={sceneRef} className="relative h-[220vh] bg-[#f6fbf8]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ scale: heroScale }}
              className="absolute inset-0"
            >
              <img
                src="/assets/Dental-Health-Checkup.jpg"
                alt="Sarangi Dentistry Clinic"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-1">
            <div className="absolute inset-0 bg-[#11241c]/72" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(3,150,106,0.24),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(8,18,14,0.24))]" />
          </div>

          <motion.div
            style={{ y: heroTextY }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 md:px-10">
              <h1 className="mx-auto max-w-[16ch] text-7xl leading-[0.9] tracking-normal text-white drop-shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                Dentistry shaped by trust, precision, and care
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] tracking-normal leading-7 font-light text-white/88 sm:text-[1.04rem] sm:leading-8 md:text-lg">
                Discover the people, philosophy, and patient-first approach
                behind Sarangi Dentistry.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ y: scrollHintY }}
            className="absolute bottom-8 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center px-4 text-center text-[11px] uppercase tracking-[0.26em] text-[#f5f9eb] sm:text-sm"
          >
            <span>Scroll to reveal</span>
            <div className="mt-3 h-16 w-px bg-linear-to-b from-[#f5f9eb] via-white/70 to-transparent" />
          </motion.div>

          <motion.div
            style={{
              y: aboutY,
              scale: aboutScale,
              borderTopLeftRadius: aboutRadius,
              borderTopRightRadius: aboutRadius,
              left: aboutInset,
              right: aboutInset,
            }}
            className="absolute inset-x-0 top-0 z-20 min-h-screen origin-top overflow-hidden bg-[#f6fbf8] will-change-transform"
          >
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
                style={{
                  backgroundImage: "url('/assets/sketch_it_sarangi.png')",
                }}
              />
              <div className="absolute inset-0 bg-[#f6fbf8]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(3,150,106,0.08),transparent_24%),radial-gradient(circle_at_86%_18%,rgba(36,68,58,0.04),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(3,150,106,0.05),transparent_28%)]" />
            </div>

            <motion.div
              style={{ y: floatYOne }}
              className="pointer-events-none absolute left-[7%] top-[24%] hidden h-20 w-20 rounded-full bg-[#d9efe4] blur-3xl md:block"
            />
            <motion.div
              style={{ y: floatYTwo }}
              className="pointer-events-none absolute right-[8%] top-[18%] hidden h-24 w-24 rounded-full bg-[#eaf7f0] blur-3xl md:block"
            />

            <div className="relative px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-10 md:pb-20 lg:px-16 lg:pb-20 lg:pt-36">
              <div className="mx-auto max-w-7xl">
                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-7"
                  >
                    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d6e7de] bg-white/82 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6b58] shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                      Who We Are
                    </div>

                    <div className="max-w-4xl border-l border-[#d8e8df] pl-0 lg:pl-8">
                      <h2 className="max-w-[10ch] text-[clamp(2.8rem,7vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.05em] text-[#24443a]">
                        About Sarangi Dentistry
                      </h2>

                      <div className="mt-6 max-w-3xl space-y-5 text-[0.98rem] leading-7 text-[#39554b] sm:text-[1.02rem] sm:leading-8 md:text-[1.05rem]">
                        <p>
                          Sarangi Dentistry is a modern multi-specialty dental
                          clinic in Bhubaneswar, committed to delivering a
                          thoughtful blend of clinical precision, aesthetic
                          excellence, and truly personalized care.
                        </p>

                        <p>
                          Under the guidance of{" "}
                          <span className="font-semibold text-[#03966a]">
                            Dr. Soumendra Sarangi
                          </span>
                          , our clinic brings together experienced
                          professionals, advanced dental technologies, and
                          patient-first treatment planning to create care that
                          feels refined, reassuring, and results-driven.
                        </p>

                        <p>
                          From preventive dentistry and smile design to advanced
                          restorative and surgical procedures, every experience
                          is designed to feel comfortable, transparent, and
                          tailored to long-term oral health.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Link
                        href="/contact"
                        className="inline-flex min-h-13.5 items-center justify-center rounded-[22px] bg-[#5aa876] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_40px_rgba(62,161,111,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4a9766]"
                      >
                        Book Appointment
                      </Link>

                      <Link
                        href="/procedure"
                        className="inline-flex min-h-13.5 items-center justify-center rounded-[22px] border border-[#cfdfd6] bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#314d44] shadow-[0_10px_24px_rgba(20,40,34,0.05)] transition-all duration-300 hover:-translate-y-1"
                      >
                        Explore Procedures
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="lg:col-span-5"
                  >
                    <div className="rounded-[30px] border border-[#dcebe3] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,250,246,1))] p-4 shadow-[0_26px_60px_rgba(20,40,34,0.08)] sm:p-5">
                      <div className="overflow-hidden rounded-3xl">
                        <img
                          src="/assets/about-img.png"
                          alt="Sarangi Dentistry clinic team"
                          className="aspect-[4/2.65] w-full object-cover object-center"
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {HIGHLIGHTS.map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.12 + index * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-[18px] border border-[#d9e8e0] bg-[#f9fdfb] px-4 py-4"
                          >
                            <div className="text-[1.35rem] font-black tracking-[-0.04em] text-[#24443a] sm:text-[1.6rem]">
                              {item.value}
                            </div>
                            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6d877d] sm:text-[10px]">
                              {item.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-30 overflow-hidden bg-[#f6fbf8] px-5 pb-24 pt-16 sm:px-6 sm:pt-20 md:px-10 md:pb-32 md:pt-24 lg:px-16">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.05]"
            style={{
              backgroundImage: "url('/assets/sketch_it_sarangi.png')",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl space-y-28 md:space-y-36">
          <motion.section
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6b58] shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                Why Patients Choose Us
              </div>

              <h2 className="text-[clamp(2.3rem,5vw,4.8rem)] font-bold leading-[0.96] tracking-normal text-[#24443a]">
                Thoughtful dentistry built around trust and excellence
              </h2>

              <p className="mt-5 text-[1rem] leading-7 text-[#4a635a] sm:text-[1.05rem] sm:leading-8">
                We combine advanced care, aesthetic detail, and a calm
                patient-first atmosphere to create a dental experience that
                feels modern, transparent, and deeply reassuring.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {WHY_US_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 26, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.58,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group rounded-[28px] border border-[#d9e8e0] bg-white/86 p-7 shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#bfdccf] hover:shadow-[0_24px_50px_rgba(20,40,34,0.08)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf8f2] text-lg font-black text-[#03966a]">
                    0{i + 1}
                  </div>
                  <h3 className="mb-4 text-[1.32rem] font-semibold leading-tight text-[#24443a]">
                    {item.title}
                  </h3>
                  <p className="leading-7 text-[#4a635a]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-2"
          >
            <div className="rounded-[30px] border border-[#d9e8e0] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,250,246,0.95))] p-8 shadow-[0_24px_60px_rgba(20,40,34,0.05)] sm:p-10 md:p-12">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-[#f8fffa] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6b58] sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                Our Mission
              </div>

              <h3 className="max-w-[14ch] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[0.97] tracking-[-0.04em] text-[#24443a]">
                Enhancing oral health through personalized care
              </h3>

              <p className="mt-6 text-[1rem] leading-7 text-[#4a635a] sm:text-[1.05rem] sm:leading-8">
                Our mission is to improve the oral health and confidence of our
                patients through careful diagnosis, personalized treatment
                planning, and modern dentistry delivered with empathy,
                integrity, and consistency.
              </p>
            </div>

            <div className="rounded-[30px] border border-[#dbe9e1] bg-[linear-gradient(135deg,rgba(235,247,240,0.96),rgba(255,255,255,0.92))] p-8 shadow-[0_24px_60px_rgba(20,40,34,0.05)] sm:p-10 md:p-12">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6b58] sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                Our Vision
              </div>

              <h3 className="max-w-[13ch] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[0.97] tracking-[-0.04em] text-[#24443a]">
                Redefining the dental experience with warmth and precision
              </h3>

              <p className="mt-6 text-[1rem] leading-7 text-[#4a635a] sm:text-[1.05rem] sm:leading-8">
                We envision a future where every dental visit feels refined,
                comfortable, and confidence-building — where advanced
                technology, compassionate care, and aesthetic detail come
                together in every smile we help restore.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6b58] shadow-[0_10px_20px_rgba(20,40,34,0.04)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                Our Core Values
              </div>

              <h2 className="text-[clamp(2.3rem,5vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.045em] text-[#24443a]">
                Principles that shape every patient experience
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.num}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.52,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-[26px] border border-[#d9e8e0] bg-white/88 p-6 shadow-[0_18px_40px_rgba(20,40,34,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c1ddd1] hover:shadow-[0_22px_46px_rgba(20,40,34,0.07)]"
                >
                  <div className="mb-5 text-[2.2rem] font-black tracking-[-0.05em] text-[#03966a]">
                    {value.num}
                  </div>
                  <h4 className="mb-3 text-[1.18rem] font-semibold text-[#24443a]">
                    {value.title}
                  </h4>
                  <p className="text-[15px] leading-7 text-[#4a635a]">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[34px] border border-[#dce9e2] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(239,248,243,0.94))] shadow-[0_30px_80px_rgba(20,40,34,0.07)]"
          >
            <div className="grid items-center gap-10 px-6 py-10 sm:px-8 md:px-10 md:py-12 lg:grid-cols-12 lg:px-14">
              <div className="lg:col-span-7">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2d6b58] sm:text-[11px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                  Begin Your Smile Journey
                </div>

                <h2 className="max-w-[12ch] text-[clamp(2.2rem,4.8vw,4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-[#24443a]">
                  Experience dental care that feels calm, modern, and personal
                </h2>

                <p className="mt-5 max-w-2xl text-[1rem] leading-7 text-[#4a635a] sm:text-[1.05rem] sm:leading-8">
                  Whether you are planning a routine visit, a smile enhancement,
                  or a more advanced procedure, we are here to guide you with
                  expert care and a patient experience designed around comfort
                  and confidence.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-14 items-center justify-center rounded-[22px] bg-[#5aa876] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_40px_rgba(62,161,111,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4a9766]"
                  >
                    Schedule a Visit
                  </Link>

                  <Link
                    href="/gallery"
                    className="inline-flex min-h-14 items-center justify-center rounded-[22px] border border-[#cfdfd6] bg-white/88 px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#314d44] shadow-[0_10px_24px_rgba(20,40,34,0.05)] transition-all duration-300 hover:-translate-y-1"
                  >
                    Explore Clinic
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    "Aesthetic Smile Treatments",
                    "Restorative & Preventive Care",
                    "Advanced Dental Technology",
                    "Comfort-Focused Experience",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.48,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="rounded-[22px] border border-[#d9e8e0] bg-white/92 p-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#2f5548] shadow-[0_12px_28px_rgba(20,40,34,0.04)]"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
