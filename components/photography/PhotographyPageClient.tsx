// components/photography/PhotographyPageClient.tsx
"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Photo } from "@/types/photography";

type Props = {
  photos: Photo[];
};

function getPhotoCardImage(photo: Photo): string {
  return photo.cardUrl ?? photo.thumbnailUrl ?? photo.fullUrl ?? photo.src;
}

function getPhotoFullImage(photo: Photo): string {
  return photo.fullUrl ?? photo.cardUrl ?? photo.src;
}

export default function PhotographyPageClient({ photos }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const allTags = useMemo(
    () =>
      Array.from(new Set(photos.flatMap((photo) => photo.tags ?? []))).sort(),
    [photos],
  );

  const displayed = useMemo(
    () =>
      activeTag
        ? photos.filter((photo) => photo.tags?.includes(activeTag))
        : photos,
    [activeTag, photos],
  );

  return (
    <main className="relative min-h-screen bg-background pb-20 pt-32 overflow-hidden">
      {/* Animated Vector Jungle Theme Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft Background Tint */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,150,106,0.03),transparent_50%)]" />

        {/* Abstract Leaf Shape 1 */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-tl-[200px] rounded-br-[200px] rounded-tr-[50px] rounded-bl-[50px] bg-[#d0e5d9]/40 blur-[80px]"
        />

        {/* Abstract Leaf Shape 2 */}
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[5%] top-[30%] h-[600px] w-[400px] rounded-tr-[250px] rounded-bl-[250px] rounded-tl-[60px] rounded-br-[60px] bg-primary/10 blur-[90px]"
        />

        {/* Abstract Leaf Shape 3 */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[20%] h-[450px] w-[450px] rounded-tl-[200px] rounded-br-[200px] bg-[#c0d8cd]/30 blur-[100px]"
        />

        {/* Soft Primary Blob */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#03966a]/10 blur-[120px]"
        />
      </div>

      <section className="relative z-10 px-6 pb-16 text-center sm:px-8 lg:px-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-4">
  <div className="flex items-center">
    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
    <div className="h-[1px] w-8 bg-primary/40 -ml-0.5" />
  </div>
  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
    Wildlife Gallery
  </span>
</div>

          <h1 data-cursor="invert" className="text-[clamp(3.2rem,6.5vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-secondary">
            Through the <span className="text-primary-hover">Lens</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-8 text-secondary-light sm:text-[1.15rem]">
            A visual exploration of the untamed. Moments of raw beauty, grace,
            and survival captured across continents by Dr. Sarangi.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {allTags.length > 0 ? (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTag === null
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                  : "border-[#d8e8df] bg-white text-secondary hover:bg-accent-soft shadow-sm"
              }`}
            >
              All
            </button>

            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeTag === tag
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                    : "border-[#d8e8df] bg-white text-secondary hover:bg-accent-soft shadow-sm"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}

        {displayed.length === 0 ? (
          <div className="rounded-[30px] border border-[#dcebe3] bg-white/80 px-6 py-14 text-center shadow-[0_18px_40px_rgba(20,40,34,0.06)] backdrop-blur">
            <h2 data-cursor="invert" className="text-2xl font-bold tracking-[-0.03em] text-secondary">
              Photography coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-secondary-light">
              Published photography items will appear here once added from the CMS.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {displayed.map((photo, index) => (
              <motion.article
                key={photo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-[28px] border border-[#dcebe3] bg-white shadow-[0_12px_30px_rgba(20,40,34,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(20,40,34,0.1)]"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getPhotoCardImage(photo)}
                    alt={photo.alt ?? photo.title}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {photo.featured ? (
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
                    Featured
                  </div>
                ) : null}

                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <h2 data-cursor="invert" className="text-xl font-bold leading-tight tracking-[-0.02em] text-white">
                    {photo.title}
                  </h2>
                  <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-white/80">
                    <span className="uppercase tracking-widest text-[10px] font-bold text-white">View Photo</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Expandable Lightbox Modal */}
      {selectedPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3b33]/40 px-4 py-6 backdrop-blur-xl transition-opacity duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[80vw] flex-col overflow-hidden rounded-[32px] border border-white/20 bg-white shadow-2xl lg:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-secondary backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary shadow-sm"
              aria-label="Close photo"
            >
              ×
            </button>

            <div className="flex flex-1 items-center justify-center bg-[#f4faf7] p-2">
              <img
                src={getPhotoFullImage(selectedPhoto)}
                alt={selectedPhoto.alt ?? selectedPhoto.title}
                loading="eager"
                decoding="async"
                className="max-h-[60vh] lg:max-h-[90vh] w-full rounded-[24px] object-contain shadow-sm"
              />
            </div>

            <aside className="flex w-full flex-col overflow-y-auto bg-white p-8 lg:w-[400px]">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-hover" />
                Wildlife Showcase
              </div>

              <h2 data-cursor="invert" className="mt-4 text-[2rem] font-bold leading-[1.1] tracking-[-0.04em] text-secondary">
                {selectedPhoto.title}
              </h2>

              {selectedPhoto.description ? (
                <p className="mt-6 text-[1rem] leading-7 text-secondary-light">
                  {selectedPhoto.description}
                </p>
              ) : null}

              <div className="mt-8 space-y-4 border-t border-[#dcebe3] pt-6">
                {selectedPhoto.location ? (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-light">
                      Location
                    </span>
                    <span className="mt-1 font-medium text-secondary">{selectedPhoto.location}</span>
                  </div>
                ) : null}

                {selectedPhoto.takenAt ? (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-light">
                      Date
                    </span>
                    <span className="mt-1 font-medium text-secondary">{selectedPhoto.takenAt}</span>
                  </div>
                ) : null}

                {selectedPhoto.camera ? (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-light">
                      Equipment
                    </span>
                    <span className="mt-1 font-medium text-secondary">{selectedPhoto.camera}</span>
                  </div>
                ) : null}
              </div>

              {selectedPhoto.tags && selectedPhoto.tags.length > 0 ? (
                <div className="mt-auto pt-8 flex flex-wrap gap-2">
                  {selectedPhoto.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f4faf7] border border-[#dcebe3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-hover"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      ) : null}
    </main>
  );
}
