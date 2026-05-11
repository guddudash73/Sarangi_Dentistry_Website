"use client";

import Button from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/ui/SectionReveal";

const features = [
  {
    title: "Personalized Treatment Planning",
    desc: "Every smile is different, so every treatment path is tailored around condition, comfort, and long-term outcomes.",
  },
  {
    title: "Advanced Setup",
    desc: "Utilizing modern technologies to support precise, minimally invasive, and more effective procedures.",
  },
  {
    title: "Gentle Clinical Experience",
    desc: "A calm environment, careful communication, and patient-first execution create a more reassuring visit.",
  },
  {
    title: "Lasting Results",
    desc: "Focused on durable, natural-looking restorations that improve both confidence and oral function.",
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [30, -20]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative" }}
      className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionReveal className="mb-12 text-center">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
              Why Choose Us
            </span>
          </div>

          <h2
            data-cursor="invert"
            className="mx-auto mt-5 max-w-4xl font-['Cormorant_Garamond','Georgia',serif] text-[clamp(2.8rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-secondary"
          >
            A Dental Care Experience Designed Around Your Needs
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-[1.02rem] leading-8 text-secondary-light sm:text-lg">
            Sarangi Dentistry is designed to feel premium without losing warmth:
            refined interiors, focused consultation, careful execution, and a
            lasting commitment to comfort.
          </p>
        </SectionReveal>

        <motion.div style={{ y: cardY }} className="grid gap-5 md:grid-cols-2">
          {features.map((feature, index) => (
            <SectionReveal key={feature.title} delay={index * 0.05}>
              <div className="rounded-[30px] border border-[#dcebe3] bg-white/80 p-7 shadow-[0_20px_50px_rgba(20,40,34,0.08)] backdrop-blur">
                <div className="flex items-start gap-4">
                  <div className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-primary-hover shadow-inner">
                    <svg
                      className="h-6 w-6"
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

                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.03em] text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-secondary">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </motion.div>

        <SectionReveal delay={0.2} className="mt-12">
          <div className="rounded-[34px] border border-[#dcebe3] bg-[#eef8f2] p-8 shadow-[0_24px_60px_rgba(20,40,34,0.08)] sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary-hover">
                  Ready for your consultation?
                </div>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.03em] text-secondary-light sm:text-4xl">
                  Let your first impression feel as good as your final result.
                </h3>
              </div>

              <Button href="/book-appointment">Schedule Visit</Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
