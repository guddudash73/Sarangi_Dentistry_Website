import ContactPageClient from "@/components/contact/ContactPageClient";
import { getContactInfo } from "@/data/contact";

export const metadata = {
  title: "Contact | Sarangi Dentistry",
  description:
    "Contact Sarangi Dentistry for appointments, treatment queries, and clinic directions in Bhubaneswar.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Sarangi Dentistry",
    description: "Contact Sarangi Dentistry for appointments, treatment queries, and clinic directions in Bhubaneswar.",
    url: "/contact",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Sarangi Dentistry",
    description: "Contact Sarangi Dentistry for appointments, treatment queries, and clinic directions in Bhubaneswar.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function ContactPage() {
  const data = await getContactInfo();

  return <ContactPageClient data={data} />;
}
