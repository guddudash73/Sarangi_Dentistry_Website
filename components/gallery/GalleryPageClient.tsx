"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { GalleryImage } from "@/types/gallery";
import ExpandableGallery from "@/components/gallery/ExpandableGallery";
import PageBackground from "@/components/ui/PageBackground";

type GalleryPageClientProps = {
  items: GalleryImage[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export default function GalleryPageClient({ items }: GalleryPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-clip bg-background  text-secondary">
      <section className="relative pt-20 md:pt-28">
        <PageBackground />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col items-center gap-8"
          >
            <div className="">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                  Sarangi Dentistry Gallery
                </span>
              </div>

              <h1
                data-cursor="invert"
                className="max-w-4xl text-center text-[clamp(3rem,6vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.06em] text-secondary"
              >
                A visual journey of restored confidence and healthy smiles
              </h1>
            </div>

            <div className="">
              <p className="max-w-5xl text-[1rem] leading-7 text-primary-hover sm:text-[1.05rem] sm:leading-8 text-center">
                Explore meaningful transformations where dental expertise meets
                patient-focused care to rebuild confidence and create lasting.A
                collection of patient success stories demonstrating how expert
                dental care can dramatically improve both smile aesthetics and
                function.
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
          <ExpandableGallery items={items} />
        </div>
      </section>
    </main>
  );
}
