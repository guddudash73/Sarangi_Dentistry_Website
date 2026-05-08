"use client";

import Hero from "@/components/home/Hero";
import HomeAbout from "@/components/home/HomeAbout";
import ServicesShowcaseSection from "@/components/home/ServicesShowcaseSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/ScrollVelocity";
import type { ReactNode } from "react";

export default function HomePageClient({ children }: { children?: ReactNode }) {
  return (
    <main className=" text-secondary">
      <Hero />

      <section className="relative z-20 overflow-hidden border-y border-[#dbe9e1] bg-[#edf7f1] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28" />

        <ScrollVelocityContainer className="text-[28px] font-medium uppercase tracking-[0.03em] text-secondary sm:text-5xl md:text-6xl lg:text-7xl">
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

      <div className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0">
          {/* Base soft wash */}
          {/* <div className="absolute inset-0 bg-[rgba(236,247,241,0.7)]" /> */}

          {/* Radial gradient layers (main depth) */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--accent-soft-rgb),0.3),transparent_32%),radial-gradient(circle_at_80%_25%,rgba(var(--accent-soft-rgb),0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(36,68,58,0.05),transparent_34%)]" /> */}

          {/* Light top wash */}
          {/* <div className="absolute inset-0 bg-linear-to-b from-[rgba(255,255,255,0.22)] via-[rgba(248,255,250,0.12)] to-[rgba(248,255,250,0.32)]" /> */}
        </div>

        <WhyChooseUsSection />
        {children}
      </div>
    </main>
  );
}
