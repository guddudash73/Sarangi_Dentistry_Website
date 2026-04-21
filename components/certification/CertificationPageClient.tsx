"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { CertificationItem } from "@/types/certification";
import CertificationShowcase from "@/components/certification/CertificationShowcase";

type CertificationPageClientProps = {
  items: CertificationItem[];
  featuredItems: CertificationItem[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export default function CertificationPageClient({
  items,
  featuredItems,
}: CertificationPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="Soverflow-x-clip bg-background text-secondary">
      <section className="relative overflow-hidden pt-28 ">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[12%] h-60 w-60 rounded-full bg-accent-soft/30 blur-3xl" />
          <div className="absolute right-[10%] top-[10%] h-64 w-64 rounded-full bg-accent-soft/30 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,150,106,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,150,106,0.03)_1px,transparent_1px)] bg-[size:110px_110px] opacity-30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-full flex flex-col items-center justify-center"  >
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/82 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary shadow-[0_10px_24px_rgba(20,40,34,0.05)] backdrop-blur sm:text-[11px] text-center">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-hover"  />
                Certifications & Recognition
              </div>

              <h1 className="max-w-5xl text-[clamp(3rem,6vw,6.4rem)] font-bold leading-[0.88] tracking-[-0.055em] text-secondary text-center">
                Credentials that reflect mastery and continued growth
              </h1>

              <p className="mt-8 max-w-5xl leading-7 text-secondary-light sm:text-[1.06rem] sm:leading-8 text-center">
                A curated presentation of recognitions, conference
                participation, advanced learning programs, and certifications
                that reflect sustained commitment to modern dentistry.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 pb-10 pt-10 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 border-b border-[#dcebe3] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Highlighted Credentials
              </div>
              <h2 className="mt-2 text-[clamp(1.9rem,3vw,2.8rem)] font-bold tracking-[-0.04em] text-secondary">
                A featured selection
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-primary-hover">
              A focused introduction to the wider archive of training,
              recognitions, and conference participation.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-[32px] border border-[#dcebe3] bg-white shadow-[0_18px_40px_rgba(20,40,34,0.05)] ${
                  index === 0
                    ? "lg:col-span-6"
                    : index === 1
                      ? "lg:col-span-3"
                      : "lg:col-span-3"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f19]/52 via-transparent to-white/8" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/14 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {item.category ?? "Certification"}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                    {item.issuer ?? "Sarangi Dentistry"}
                  </div>
                  <div className="mt-2 text-[1.05rem] font-semibold leading-6 text-primary-hover">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-24 pt-6 sm:px-6 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 border-b border-[#dcebe3] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-light">
                Full Archive
              </div>
              <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em] text-secondary">
                Browse all certifications
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-primary">
              A visually richer archive designed for production use, with full
              image expansion and a cleaner premium presentation.
            </p>
          </div>

          <CertificationShowcase items={items} />
        </div>
      </section>
    </main>
  );
}
