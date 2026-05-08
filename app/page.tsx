import { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import BeyondDentistrySection from "@/components/home/BeyondDentistrySection";
import { getPinnedBook } from "@/data/books";
import { getFeaturedPhoto } from "@/data/photography";

export const metadata: Metadata = {
  title: "Best Dentistry in Bhubaneswar | Sarangi Dentistry",
  description: "Experience the best dentistry in Bhubaneswar at Sarangi Dentistry. Dr. Sarangi offers advanced treatments, cosmetic dentistry, and personalized care for radiant smiles.",
  keywords: ["best dentistry in bhubaneswar", "top dentist bhubaneswar", "dental clinic bhubaneswar", "sarangi dentistry", "cosmetic dentistry bhubaneswar"],
  openGraph: {
    title: "Best Dentistry in Bhubaneswar | Sarangi Dentistry",
    description: "Experience the best dentistry in Bhubaneswar at Sarangi Dentistry. We offer advanced dental treatments and cosmetic procedures.",
    url: "https://sarangidentistry.com",
    siteName: "Sarangi Dentistry",
    images: [
      {
        url: "/assets/seat_1.jpg",
        width: 1200,
        height: 630,
        alt: "Sarangi Dentistry - Best Dental Clinic in Bhubaneswar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Sarangi Dentistry",
  "image": "https://sarangidentistry.com/assets/seat_1.jpg",
  "@id": "https://sarangidentistry.com",
  "url": "https://sarangidentistry.com",
  "telephone": "+91-9999999999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bhubaneswar",
    "addressLocality": "Bhubaneswar",
    "addressRegion": "Odisha",
    "postalCode": "751001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 20.296059,
    "longitude": 85.824539
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "20:00"
  },
  "description": "Experience the best dentistry in Bhubaneswar at Sarangi Dentistry. Dr. Sarangi offers advanced treatments, cosmetic dentistry, and personalized care for radiant smiles.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
};

/**
 * Server component — fetches data and passes it into the client shell.
 * When you switch to a real backend, only the data functions need to change.
 */
export default async function Page() {
  const [pinnedBook, featuredPhoto] = await Promise.all([
    getPinnedBook(),
    getFeaturedPhoto(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient>
        {pinnedBook && featuredPhoto && (
          <BeyondDentistrySection
            pinnedBook={pinnedBook}
            featuredPhoto={featuredPhoto}
          />
        )}
      </HomePageClient>
    </>
  );
}
