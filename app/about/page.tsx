import { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Dr. Sarangi | Sarangi Dentistry",
  description: "Learn more about Dr. Sarangi's experience and personalized care at Sarangi Dentistry in Bhubaneswar.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
