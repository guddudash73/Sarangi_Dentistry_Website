import { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Dr. Sarangi | Sarangi Dentistry",
  description: "Learn more about Dr. Sarangi's experience and personalized care at Sarangi Dentistry in Bhubaneswar.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Dr. Sarangi | Sarangi Dentistry",
    description: "Learn more about Dr. Sarangi's experience and personalized care at Sarangi Dentistry in Bhubaneswar.",
    url: "/about",
    images: [{ url: "/assets/about-img.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr. Sarangi | Sarangi Dentistry",
    description: "Learn more about Dr. Sarangi's experience and personalized care at Sarangi Dentistry in Bhubaneswar.",
    images: ["/assets/about-img.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
