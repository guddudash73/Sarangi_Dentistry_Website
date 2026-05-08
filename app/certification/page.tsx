// app/certification/page.tsx
import CertificationPageClient from "@/components/certification/CertificationPageClient";
import { getAllCertifications } from "@/data/certifications";

export default async function CertificationPage() {
  const items = await getAllCertifications();

  return <CertificationPageClient items={items} />;
}
