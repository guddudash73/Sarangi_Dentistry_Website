import type { ContactInfo } from "@/types/contact";

/**
 * Backend-ready contact data layer.
 * Replace this later with API / CMS / database data.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  return {
    heading: "Let’s make your next dental visit feel effortless",
    subheading:
      "Reach out for appointments, treatment queries, or directions. We’ve designed this page to feel as calm, refined, and reassuring as the clinic experience itself.",
    addressLines: [
      "7RGM+H8G Stalwart Complex, Unit 4",
      "Bhouma Nagar, Bhubaneswar",
      "Odisha 751001",
    ],
    phone: "9938942846",
    email: "info@sarangidentistry.com",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.6620585141246!2d85.8341604!3d20.2728441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a779165bc6f1%3A0xe5eb6c5a363d6b04!2sSarangi%20Dentistry!5e0!3m2!1sen!2sin!4v1709489620000!5m2!1sen!2sin",
    mapTitle: "Sarangi Dentistry Location",
    hours: [
      { label: "Mon - Sat", value: "10:00 AM - 8:00 PM" },
      { label: "Sunday", value: "By prior appointment" },
    ],
    quickHighlights: [
      "Consultations & appointments",
      "Treatment guidance",
      "Directions & location help",
    ],
  };
}
