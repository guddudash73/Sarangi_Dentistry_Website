import type { GalleryImage } from "@/types/gallery";

/**
 * Backend-ready gallery fetch layer.
 * For now it returns static images.
 * Later replace the returned array with API / CMS / database data.
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  return [
    {
      id: "clinic-1",
      title: "Modern Treatment Space",
      alt: "Modern treatment room at Sarangi Dentistry",
      image: "/assets/seat_1.jpg",
      category: "Clinic",
      description:
        "A calm, modern treatment environment designed to make every visit feel refined, comfortable, and reassuring.",
    },
    {
      id: "clinic-2",
      title: "Advanced Dental Setup",
      alt: "Advanced dental setup at Sarangi Dentistry",
      image: "/assets/seat_2.jpg",
      category: "Technology",
      description:
        "Thoughtfully equipped spaces that support precision-driven procedures and a smoother patient experience.",
    },
    {
      id: "clinic-3",
      title: "Precision Care Environment",
      alt: "Precision care environment at Sarangi Dentistry",
      image: "/assets/seat_3.jpg",
      category: "Care",
      description:
        "An elegant treatment setup where advanced dentistry meets warmth, clarity, and personal attention.",
    },
    {
      id: "about-1",
      title: "Clinic Experience",
      alt: "Clinic interior at Sarangi Dentistry",
      image: "/assets/about-img.png",
      category: "Experience",
      description:
        "A thoughtfully designed setting that reflects the clinic’s patient-first philosophy and modern identity.",
    },
    {
      id: "team-1",
      title: "Dental Team",
      alt: "Dental team at Sarangi Dentistry",
      image: "/assets/dental-staff.webp",
      category: "Team",
      description:
        "Experienced professionals working together to deliver confident, personalized, and high-quality dental care.",
    },
    {
      id: "checkup-1",
      title: "Checkup Care",
      alt: "Dental checkup care at Sarangi Dentistry",
      image: "/assets/Dental-Health-Checkup.jpg",
      category: "Checkup",
      description:
        "Routine care focused on prevention, comfort, and long-term oral health for every patient.",
    },
    {
      id: "care-1",
      title: "Professional Care",
      alt: "Professional dental care procedure",
      image: "/assets/dental-care-professional-stockcake.webp",
      category: "Procedure",
      description:
        "Skilled clinical care delivered with precision, attention to detail, and a reassuring patient experience.",
    },
    {
      id: "clinic-4",
      title: "Clinical Ambience",
      alt: "Clinical ambience at Sarangi Dentistry",
      image: "/assets/dental-check-up-fleet-hampshire.jpg",
      category: "Ambience",
      description:
        "A clean, welcoming environment created to help patients feel calm, informed, and cared for.",
    },
  ];
}
