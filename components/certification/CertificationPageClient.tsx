// components/certification/CertificationPageClient.tsx
"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { CertificationItem } from "@/types/certification";
import CertificationShowcase from "@/components/certification/CertificationShowcase";
import PageBackground from "@/components/ui/PageBackground";

type CertificationPageClientProps = {
  items: CertificationItem[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export default function CertificationPageClient({
  items,
}: CertificationPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

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
    Sarangi Dentistry Certifications
  </span>
</div>

              <h1 data-cursor="invert" className="max-w-[11ch] text-[clamp(3rem,6vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.06em] text-secondary">
                Recognition, learning, and clinical excellence
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pb-3">
              <p className="max-w-xl text-[1rem] leading-7 text-primary-hover sm:text-[1.05rem] sm:leading-8">
                Explore professional certifications, awards, conference
                participation, and continuous learning milestones from Sarangi
                Dentistry.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-14 sm:px-6 md:px-10 md:pb-32 lg:px-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,150,106,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,150,106,0.04)_1px,transparent_1px)] bg-size-[34px_34px] opacity-40" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {items.length === 0 ? (
            <div className="rounded-[30px] border border-[#dcebe3] bg-white/80 px-6 py-14 text-center shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur">
              <h2 data-cursor="invert" className="text-2xl font-bold tracking-[-0.03em] text-secondary">
                Certifications coming soon
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-secondary-light">
                Certifications will appear here once they are published from the
                CMS.
              </p>
            </div>
          ) : (
            <CertificationShowcase items={items} />
          )}
        </div>
      </section>
    </main>
  );
}
