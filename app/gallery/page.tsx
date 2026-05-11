// app/gallery/page.tsx
import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import { getGalleryImages } from "@/data/gallery";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Sarangi Dentistry",
  description:
    "Explore the Sarangi Dentistry gallery featuring clinic spaces, treatment environments, and the patient care experience.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | Sarangi Dentistry",
    description: "Explore the Sarangi Dentistry gallery featuring clinic spaces, treatment environments, and the patient care experience.",
    url: "/gallery",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Sarangi Dentistry",
    description: "Explore the Sarangi Dentistry gallery featuring clinic spaces, treatment environments, and the patient care experience.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function GalleryPage() {
  const items = await getGalleryImages();

  return <GalleryPageClient items={items} />;
}
