"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/home/Hero";
import HomeAbout from "@/components/home/HomeAbout";
import ServicesShowcaseSection from "@/components/home/ServicesShowcaseSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/ScrollVelocity";

export default function HomePageClient() {
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

  return (
    <main className="bg-[#f8fffa] text-[#1f3b33]">
      <Hero />

      <section className="relative z-20 overflow-hidden border-y border-[#dbe9e1] bg-[#edf7f1] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[#edf7f1] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#edf7f1] to-transparent sm:w-28" />

        <ScrollVelocityContainer className="text-[28px] font-medium uppercase tracking-[0.03em] text-[#24443a] sm:text-5xl md:text-6xl lg:text-7xl">
          <ScrollVelocityRow baseVelocity={2}>
            Premium Dental Care • Gentle Treatment • Modern Technology •
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={-1}>
            Smile Rejuvenation • Precision Dentistry • Radiant Smiles •
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      <HomeAbout />
      <ServicesShowcaseSection />
      <WhyChooseUsSection />
    </main>
  );
}
