import ProceduresPageClient from "@/components/procedure/ProceduresPageClient";
import { getAllProcedures } from "@/data/procedures";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Procedures | Sarangi Dentistry",
  description:
    "Explore the dental procedures offered at Sarangi Dentistry, from preventive care to advanced restorative and surgical treatments.",
  alternates: {
    canonical: "/procedure",
  },
  openGraph: {
    title: "Procedures | Sarangi Dentistry",
    description: "Explore the dental procedures offered at Sarangi Dentistry, from preventive care to advanced restorative and surgical treatments.",
    url: "/procedure",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Procedures | Sarangi Dentistry",
    description: "Explore the dental procedures offered at Sarangi Dentistry, from preventive care to advanced restorative and surgical treatments.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function ProcedurePage() {
  const procedures = await getAllProcedures();

  return <ProceduresPageClient procedures={procedures} />;
}
