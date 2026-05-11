// app/certification/page.tsx
import CertificationPageClient from "@/components/certification/CertificationPageClient";
import { getAllCertifications } from "@/data/certifications";

export const metadata = {
  title: "Certifications | Sarangi Dentistry",
  description:
    "View the professional certifications, awards, and credentials of Dr. Sarangi and the Sarangi Dentistry team.",
  alternates: {
    canonical: "/certification",
  },
  openGraph: {
    title: "Certifications | Sarangi Dentistry",
    description: "View the professional certifications, awards, and credentials of Dr. Sarangi and the Sarangi Dentistry team.",
    url: "/certification",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications | Sarangi Dentistry",
    description: "View the professional certifications, awards, and credentials of Dr. Sarangi and the Sarangi Dentistry team.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function CertificationPage() {
  const items = await getAllCertifications();

  return <CertificationPageClient items={items} />;
}
