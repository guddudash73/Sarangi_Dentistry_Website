// app/photography/page.tsx
import { getAllPhotos } from "@/data/photography";
import PhotographyPageClient from "@/components/photography/PhotographyPageClient";

export const metadata = {
  title: "Wildlife Photography — Dr. Sarangi",
  description:
    "A curated gallery of wildlife photography by Dr. Soumendra Sarangi — capturing the untamed spirit of nature from across the globe.",
};

export default async function PhotographyPage() {
  const photos = await getAllPhotos();

  return <PhotographyPageClient photos={photos} />;
}
