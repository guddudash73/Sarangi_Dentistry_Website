"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { GalleryImage } from "@/types/gallery";
import ExpandableGallery from "@/components/gallery/ExpandableGallery";

type GalleryPageClientProps = {
  items: GalleryImage[];
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

export default function GalleryPageClient({ items }: GalleryPageClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6fbf8]  text-[#24443a]">
      <section className="relative overflow-hidden border-b border-[#dcebe3] bg-[linear-gradient(180deg,rgba(249,253,251,1),rgba(239,248,243,0.96))]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(3,150,106,0.10),transparent_24%),radial-gradient(circle_at_80%_26%,rgba(36,68,58,0.05),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.32),rgba(255,255,255,0.08))]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "url('/assets/sketch_it_sarangi.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="grid items-end gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d8e8df] bg-white/82 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2d6b58] shadow-[0_10px_24px_rgba(20,40,34,0.05)] backdrop-blur sm:text-[11px]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03966a]" />
                Sarangi Dentistry Gallery
              </div>

              <h1 className="max-w-[11ch] text-[clamp(3rem,6vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.06em] text-[#21493d]">
                Moments, spaces, and the care experience
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pb-3">
              <p className="max-w-xl text-[1rem] leading-7 text-[#4a635a] sm:text-[1.05rem] sm:leading-8">
                Explore our clinic through a more immersive visual experience.
                Tap any image to expand it and move through the gallery with a
                more dramatic, refined presentation.
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
