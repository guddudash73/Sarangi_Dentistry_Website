// components/layout/Footer.tsx
import { getContactInfo } from "@/data/contact";
import { getAllProcedures } from "@/data/procedures";
import FooterClient from "@/components/layout/FooterClient";

export default async function Footer() {
  const [procedures, contactInfo] = await Promise.all([
    getAllProcedures(),
    getContactInfo(),
  ]);

  return <FooterClient procedures={procedures} contactInfo={contactInfo} />;
}
