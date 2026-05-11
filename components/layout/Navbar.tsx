import { getAllProcedures } from "@/data/procedures";
import NavbarClient from "@/components/layout/NavbarClient";

export default async function Navbar() {
  const procedures = await getAllProcedures();

  return <NavbarClient procedures={procedures} />;
}
