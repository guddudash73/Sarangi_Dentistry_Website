import type { CertificationItem } from "@/types/certification";

/**
 * Backend-ready certification data layer.
 * For now it returns static data.
 * Later you can replace this with API / CMS / database data.
 */
const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 1,
    title: "Garden Of Life",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/certificate-1.png",
    issuer: "Professional Program",
    year: "2024",
    category: "Recognition",
  },
  {
    id: 2,
    title: "The National Conference of the Indian Endodontic Society",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Has-actively-participated-in-IESCON-2023-The-National-Conference-of-the-Indian-Endodontic-Society-rotated.jpg",
    issuer: "Indian Endodontic Society",
    year: "2023",
    category: "Conference",
  },
  {
    id: 3,
    title: "Single Sitting Endodontics",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Single-Sitting-Endodontics-rotated.jpg",
    issuer: "Clinical Training",
    year: "2023",
    category: "Endodontics",
  },
  {
    id: 4,
    title: "Best Dentist Odisha",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Best-Dentist-Odisha-rotated.jpg",
    issuer: "Award Recognition",
    year: "2023",
    category: "Award",
  },
  {
    id: 5,
    title: "12th IFEA World Endodontics Congress 2020NE",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Cetificate-of-Commendation-1.jpg",
    issuer: "IFEA",
    year: "2020",
    category: "Congress",
  },
  {
    id: 6,
    title: "Certificate of Appreciation",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Certificate-of-Appreciation1-rotated.jpg",
    issuer: "Professional Appreciation",
    year: "2020",
    category: "Recognition",
  },
  {
    id: 7,
    title: "BioHorizons Day",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/BioHorizons-Day-2018-rotated.jpg",
    issuer: "BioHorizons",
    year: "2018",
    category: "Implantology",
  },
  {
    id: 8,
    title:
      "1st Urban International hard and Soft Tissue Regeneration Symposium",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Certificate-University-Of-Szeged-Urban-Regeneration-Institute-rotated.jpg",
    issuer: "Urban Regeneration Institute",
    year: "2018",
    category: "Symposium",
  },
  {
    id: 9,
    title: "Certificate of Appreciation",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Certificate-of-Appreciation-rotated.jpg",
    issuer: "Professional Appreciation",
    year: "2017",
    category: "Recognition",
  },
  {
    id: 10,
    title:
      "10 World Congress for Oral Implantology & AAID Global Conference 2016",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/10-World-Congress-for-Oral-Implantology-AAID-Global-Conference-2016-rotated.jpg",
    issuer: "AAID",
    year: "2016",
    category: "Implantology",
  },
  {
    id: 11,
    title: "Modern Endodontics (Basic Advanced)",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Modern-Endodontics-Basic-Advanced-rotated-1.jpg",
    issuer: "Clinical Program",
    year: "2016",
    category: "Endodontics",
  },
  {
    id: 12,
    title: "The FDI Annual World Dental Congress",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/The-FDI-Annual-World-Dental-Congress-rotated.jpg",
    issuer: "FDI",
    year: "2015",
    category: "Congress",
  },
  {
    id: 13,
    title: "Complete Guide to Restorative Dental Practice",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Complete-Guide-to-Restorative-Dental-Practice-1.jpg",
    issuer: "Dental Practice Program",
    year: "2015",
    category: "Restorative",
  },
  {
    id: 14,
    title:
      "Achieving Spectacular Results For A Single Missing Tooth in The Aesthetic Zone",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Achieving-Spectacular-Results-For-A-Single-Missing-Tooth-in-The-Aesthetic-Zone-rotated.jpg",
    issuer: "Aesthetic Dentistry",
    year: "2014",
    category: "Aesthetics",
  },
  {
    id: 15,
    title: "BioHorizons Asia Pacific Symposium Series",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/2013-BioHorizons-Asia-Pacific-Symposium-Series-rotated.jpg",
    issuer: "BioHorizons",
    year: "2013",
    category: "Symposium",
  },
  {
    id: 16,
    title: "Idea-i Xcellence",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Idea-i-Xcellence-2013-1.jpg",
    issuer: "Professional Program",
    year: "2013",
    category: "Recognition",
  },
  {
    id: 17,
    title: "Indian Society of Oral Implantologists 19th National Conference",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Indian-Society-of-Oral-Implantologists-19th-National-Conference-rotated.jpg",
    issuer: "ISOI",
    year: "2013",
    category: "Implantology",
  },
  {
    id: 18,
    title: "New Age Aspects of Dentistry",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/New-Age-Aspects-of-Dentistry-2012.jpg",
    issuer: "Dental Education",
    year: "2012",
    category: "Education",
  },
  {
    id: 19,
    title: "One Stage Immediate Loading Implant",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Ida-Odisha-State-Branch-This-Certificate-of-Participation-is-Awarded-rotated.jpg",
    issuer: "IDA Odisha",
    year: "2012",
    category: "Implantology",
  },
  {
    id: 20,
    title:
      "Implant Placement In The Aesthetic Zone & Preparation For Metal Free Restorations",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/Implant-Placement-In-The-Aesthetic-Zone-Preparation-For-Metal-Free-Restorations-rotated.jpg",
    issuer: "Advanced Restorative Training",
    year: "2011",
    category: "Aesthetics",
  },
  {
    id: 21,
    title: "3rd Annual State dental conference & CDE program",
    image:
      "https://sarangidentistry.in/wp-content/uploads/2024/01/3rd-Annual-State-dental-conference-CDE-program-rotated.jpg",
    issuer: "State Dental Conference",
    year: "2011",
    category: "Conference",
  },
];

export async function getAllCertifications(): Promise<CertificationItem[]> {
  return CERTIFICATIONS;
}

export async function getFeaturedCertifications(): Promise<
  CertificationItem[]
> {
  return CERTIFICATIONS.slice(0, 3);
}
