// website/app/book-appointment/page.tsx
import BookAppointmentPageClient from "@/components/book-appointment/BookAppointmentPageClient";
import { getContactInfo } from "@/data/contact";

export const metadata = {
  title: "Book Appointment | Sarangi Dentistry",
  description:
    "Schedule your dental appointment at Sarangi Dentistry in Bhubaneswar. Fast, simple, and convenient.",
  alternates: {
    canonical: "/book-appointment",
  },
  openGraph: {
    title: "Book Appointment | Sarangi Dentistry",
    description: "Schedule your dental appointment at Sarangi Dentistry in Bhubaneswar. Fast, simple, and convenient.",
    url: "/book-appointment",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Appointment | Sarangi Dentistry",
    description: "Schedule your dental appointment at Sarangi Dentistry in Bhubaneswar. Fast, simple, and convenient.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function BookAppointmentPage() {
  const data = await getContactInfo();

  return <BookAppointmentPageClient data={data} />;
}
