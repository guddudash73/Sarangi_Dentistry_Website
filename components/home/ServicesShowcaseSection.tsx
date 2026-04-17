"use client";

import CountUp from "react-countup";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type PanInfo,
} from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Oral Hygiene",
    desc: "Professional plaque and tartar removal promoting healthy gums and preventing long-term dental issues.",
    bgImage: "/assets/dental-check-up-fleet-hampshire.jpg",
  },
  {
    id: 2,
    title: "Aesthetic Dentistry",
    desc: "Professional smile designing for a healthier, brighter, and more confident everyday smile.",
    bgImage: "/assets/dental-care-professional-stockcake.webp",
  },
  {
    id: 3,
    title: "Extraction",
    desc: "Careful and painless removal of problematic teeth using modern anesthetic techniques and precision planning.",
    bgImage: "/assets/Dental-Health-Checkup.jpg",
  },
  {
    id: 4,
    title: "Filling",
    desc: "High-quality composite restorations that improve strength, function, and seamless natural appearance.",
    bgImage: "/assets/Medline.jpg",
  },
  {
    id: 5,
    title: "Root Canal",
    desc: "Expert tooth-preserving treatment focused on pain relief, comfort, and long-term oral restoration.",
    bgImage: "/assets/dental-staff.webp",
  },
  {
    id: 6,
    title: "Crown & Bridge",
    desc: "Customized ceramic and porcelain restorations designed for durability, fit, and refined aesthetics.",
    bgImage: "/assets/3-Qualities-To-Look-For.jpg",
  },
  {
    id: 7,
    title: "Implants",
    desc: "Natural-looking implant solutions that restore function, chewing strength, and confidence.",
    bgImage: "/assets/teeth.png",
  },
  {
    id: 8,
    title: "Orthodontics",
    desc: "Modern braces and aligner-based care for straighter smiles, better balance, and healthier alignment.",
    bgImage: "/assets/dental-check-up-fleet-hampshire.jpg",
  },
];

type ServiceItem = (typeof servicesData)[number];

export default function ServicesShowcaseSection() {
  const prefersReducedMotion = useReducedMotion();
  const [cards, setCards] = useState<ServiceItem[]>(servicesData);
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 18, prefersReducedMotion ? 0 : -14],
  );

  const deckY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 26, prefersReducedMotion ? 0 : -20],
  );

  const deckRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 1.1, prefersReducedMotion ? 0 : -0.9],
  );

  const circleRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 100],
  );

  const logoY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 12, prefersReducedMotion ? 0 : -18],
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 90;

    if (Math.abs(info.offset.x) > threshold) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const topCard = newCards.shift();

        if (!topCard) return prevCards;

        newCards.push(topCard);
        return newCards;
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#a4e0da] py-16 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[42px_42px] opacity-[0.14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.14),transparent_20%),radial-gradient(circle_at_30%_80%,rgba(5,74,67,0.14),transparent_22%),radial-gradient(circle_at_75%_78%,rgba(5,74,67,0.10),transparent_20%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,rgba(0,0,0,0.04)_68%,transparent)] opacity-50" />

        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#b5e4cb]/40 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d8efe1]/70 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute left-[12%] top-[25%] h-28 w-28 rounded-full bg-[#d8efe1]/45 blur-3xl sm:h-40 sm:w-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-2 xl:gap-10">
          <motion.div
            style={{ y: leftY }}
            className="relative w-full text-center xl:text-left"
          >
            <motion.div
              style={{ y: logoY }}
              className="pointer-events-none absolute -left-20 top-0 hidden h-130 w-105 opacity-[0.13] blur-[0.2px] md:block"
            >
              <img
                src="/assets/sd_teeth.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </motion.div>

            <motion.div
              style={{ y: logoY }}
              className="pointer-events-none absolute left-1/2 top-8 h-80 w-60 -translate-x-1/2 opacity-[0.10] md:hidden"
            >
              <img
                src="/assets/sd_teeth.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65 }}
              className="relative z-10 flex flex-col items-center xl:items-start"
            >
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#21584d] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#2b9a86]" />
                Services
              </div>

              <h2 className="max-w-[10.5ch] text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[#173f38]">
                Modern Dental
                <br />
                Therapy
              </h2>

              <p className="mt-5 max-w-lg text-[1rem] leading-8 text-[#244d46] sm:text-lg">
                Experience refined dental care where advanced technology,
                clinical precision, and patient comfort work together to create
                healthier, more confident smiles.
              </p>

              <p className="mt-4 max-w-lg text-[0.96rem] leading-8 text-[#2e5b54] sm:text-lg">
                From preventive maintenance to aesthetic smile enhancement and
                restorative procedures, our service line is designed to feel as
                premium as it is effective.
              </p>

              <p className="mt-4 max-w-lg text-[0.96rem] leading-8 text-[#2e5b54] sm:text-lg">
                Sarangi Dentistry combines modern treatment planning with a
                calm, premium experience so every visit feels reassuring,
                precise, and patient-first.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="relative z-10 mt-7 mx-auto max-w-lg rounded-[28px] border border-white/60 bg-white/58 p-5 shadow-[0_24px_60px_rgba(20,40,34,0.08)] backdrop-blur-md xl:mx-0"
            >
              <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 xl:text-left">
                {[
                  { value: 15000, suffix: "+", label: "Happy Smiles" },
                  { value: 36, suffix: "+", label: "Years Care" },
                  { value: 8, suffix: "+", label: "Key Services" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-3xl font-black tracking-[-0.04em] text-[#173f38]">
                      <CountUp
                        start={0}
                        end={item.value}
                        duration={2}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {item.suffix}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#3c6a62]">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: deckY, rotate: deckRotate }}
            className="relative flex min-h-180 w-full flex-col items-center justify-center overflow-visible pb-20 sm:min-h-190 sm:pb-24 xl:min-h-190 xl:pb-0"
          >
            <motion.div
              style={{ rotate: circleRotate }}
              className="pointer-events-none absolute right-[-32%] top-[38%] h-70 w-70 -translate-y-1/2 overflow-hidden rounded-full border border-white/45 shadow-[0_20px_60px_rgba(20,40,34,0.10)] sm:right-[-26%] sm:top-[40%] sm:h-85 sm:w-85 md:right-[-18%] md:top-[42%] md:h-105 md:w-105 xl:right-[-16%] xl:top-[50%] xl:h-97.5 xl:w-97.5"
              animate={
                prefersReducedMotion
                  ? {}
                  : { scale: [1, 1.05, 1], y: ["-50%", "-47%", "-50%"] }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/assets/teeth.png"
                alt="Dental services visual"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#d8fff6]/28 via-[#7ed6c5]/18 to-[#0f2b22]/22" />
            </motion.div>

            <div className="relative z-20 mt-3 aspect-[3/4.22] w-full max-w-72.5 sm:mt-6 sm:max-w-[320px] md:max-w-95 md:aspect-3/4 xl:mt-0">
              <AnimatePresence initial={false}>
                {cards.map((service, index) => {
                  if (index > 3) return null;
                  const isTop = index === 0;

                  return (
                    <motion.div
                      key={service.id}
                      className="absolute inset-0 flex h-full w-full cursor-grab flex-col overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/72 shadow-[0_22px_52px_rgba(20,40,34,0.16)] backdrop-blur-xl transform-gpu will-change-transform backface-hidden active:cursor-grabbing"
                      layout={false}
                      initial={{
                        opacity: 0,
                        scale: 0.86,
                        y: 80,
                      }}
                      animate={{
                        opacity: isInView ? 1 : 0,
                        scale: isInView ? 1 - index * 0.055 : 0.86,
                        y: isInView ? index * 18 : 80,
                        x: 0,
                        rotateZ: index === 0 ? 0 : index % 2 === 0 ? -1.1 : 1.1,
                        zIndex: cards.length - index,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.86,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 230,
                        damping: 24,
                        mass: 0.9,
                      }}
                      drag={isTop ? "x" : false}
                      dragSnapToOrigin
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.55}
                      whileDrag={{
                        scale: 1.01,
                        rotateZ: 0,
                      }}
                      onDragEnd={isTop ? handleDragEnd : undefined}
                    >
                      <div className="absolute inset-0 z-0">
                        <img
                          src={service.bgImage}
                          alt=""
                          className="h-full w-full object-cover opacity-[0.16]"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-[rgba(255,255,255,0.78)] via-[rgba(244,253,249,0.72)] to-[rgba(218,242,234,0.72)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(32,92,82,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(32,92,82,0.04)_1px,transparent_1px)] bg-size-[26px_26px] opacity-40" />
                      </div>

                      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 md:p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#cfe5dd] bg-white/80 shadow-[0_10px_24px_rgba(20,40,34,0.06)] sm:h-14 sm:w-14">
                            <span className="text-base font-black tracking-[-0.03em] text-[#1d4a43] sm:text-lg">
                              {service.id < 10 ? `0${service.id}` : service.id}
                            </span>
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfe5dd] bg-white/55 text-[#4d7a72]">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#4e7b72] sm:text-[11px]">
                            Premium Service
                          </div>
                          <h3 className="text-[2rem] font-black leading-none tracking-[-0.03em] text-[#173f38] sm:text-3xl">
                            {service.title}
                          </h3>
                          <p className="mt-4 border-b border-[#d5e9e1] pb-4 text-[14px] leading-7 text-[#42675f] sm:pb-5 sm:text-[15px]">
                            {service.desc}
                          </p>
                        </div>

                        {isTop ? (
                          <div className="mt-auto pt-4 sm:pt-5">
                            <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#c8e3da] bg-white/82 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3f6f66] shadow-[0_10px_24px_rgba(20,40,34,0.05)] sm:gap-3 sm:text-[11px]">
                              <svg
                                className="h-4 w-4 rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                              <span>Swipe to Explore</span>
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-auto pt-4 opacity-0">
                            <div className="py-3">placeholder</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
