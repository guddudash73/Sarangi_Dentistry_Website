import CertificationPageClient from "@/components/certification/CertificationPageClient";
import {
  getAllCertifications,
  getFeaturedCertifications,
} from "@/data/certifications";

export const metadata = {
  title: "Certification | Sarangi Dentistry",
  description:
    "Explore the certifications, recognitions, and professional learning archive of Sarangi Dentistry.",
};

export default async function CertificationPage() {
  const items = await getAllCertifications();
  const featuredItems = await getFeaturedCertifications();

  return (
    <CertificationPageClient items={items} featuredItems={featuredItems} />
  );
}
