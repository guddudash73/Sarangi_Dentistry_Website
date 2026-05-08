// website/app/book-appointment/page.tsx
import BookAppointmentPageClient from "@/components/book-appointment/BookAppointmentPageClient";
import { getContactInfo } from "@/data/contact";

export const metadata = {
  title: "Book Appointment | Sarangi Dentistry",
  description:
    "Schedule your dental appointment at Sarangi Dentistry in Bhubaneswar. Fast, simple, and convenient.",
};

export default async function BookAppointmentPage() {
  const data = await getContactInfo();

  return <BookAppointmentPageClient data={data} />;
}
