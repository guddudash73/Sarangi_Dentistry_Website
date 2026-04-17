import ProceduresPageClient from "@/components/procedure/ProceduresPageClient";
import { getAllProcedures } from "@/data/procedures";

export const metadata = {
  title: "Procedures | Sarangi Dentistry",
  description:
    "Explore the dental procedures offered at Sarangi Dentistry, from preventive care to advanced restorative and surgical treatments.",
};

export default function ProcedurePage() {
  const procedures = getAllProcedures();

  return <ProceduresPageClient procedures={procedures} />;
}
