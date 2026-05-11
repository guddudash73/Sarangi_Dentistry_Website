// app/photography/page.tsx
import { getAllPhotos } from "@/data/photography";
import PhotographyPageClient from "@/components/photography/PhotographyPageClient";

export const metadata = {
  title: "Wildlife Photography — Dr. Sarangi",
  description:
    "A curated gallery of wildlife photography by Dr. Soumendra Sarangi — capturing the untamed spirit of nature from across the globe.",
  alternates: {
    canonical: "/photography",
  },
  openGraph: {
    title: "Wildlife Photography — Dr. Sarangi",
    description:
      "A curated gallery of wildlife photography by Dr. Soumendra Sarangi — capturing the untamed spirit of nature from across the globe.",
    url: "/photography",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildlife Photography — Dr. Sarangi",
    description:
      "A curated gallery of wildlife photography by Dr. Soumendra Sarangi — capturing the untamed spirit of nature from across the globe.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function PhotographyPage() {
  const photos = await getAllPhotos();

  return <PhotographyPageClient photos={photos} />;
}
