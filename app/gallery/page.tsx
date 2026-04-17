import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import { getGalleryImages } from "@/data/gallery";

export const metadata = {
  title: "Gallery | Sarangi Dentistry",
  description:
    "Explore the Sarangi Dentistry gallery featuring clinic spaces, treatment environments, and the patient care experience.",
};

export default async function GalleryPage() {
  const items = await getGalleryImages();

  return <GalleryPageClient items={items} />;
}
