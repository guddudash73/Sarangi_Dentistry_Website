import ContactPageClient from "@/components/contact/ContactPageClient";
import { getContactInfo } from "@/data/contact";

export const metadata = {
  title: "Contact | Sarangi Dentistry",
  description:
    "Contact Sarangi Dentistry for appointments, treatment queries, and clinic directions in Bhubaneswar.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const data = await getContactInfo();

  return <ContactPageClient data={data} />;
}
