import { notFound, redirect } from "next/navigation";
import ProcedureDetailPageClient from "@/components/procedure/ProcedureDetailPageClient";
import {
  getAllProcedures,
  getProcedureById,
  getRelatedProcedures,
} from "@/data/procedures";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type ProcedureDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getSlugFromProcedurePath(path: string, fallbackId: string): string {
  const cleanPath = path.trim().replace(/\/+$/, "");

  if (cleanPath.startsWith("/procedure/")) {
    const slug = cleanPath.replace(/^\/procedure\//, "").trim();
    if (slug) return slug;
  }

  return fallbackId;
}

export async function generateStaticParams() {
  try {
    const procedures = await getAllProcedures();

    return procedures.map((item) => ({
      slug: getSlugFromProcedurePath(item.path, item.id),
    }));
  } catch {
    console.warn("Failed to fetch procedures during build. Proceeding with empty static paths.");
    return [];
  }
}

export async function generateMetadata({ params }: ProcedureDetailPageProps) {
  const { slug } = await params;
  const procedure = await getProcedureById(slug);

  if (!procedure) {
    return {
      title: "Procedure Not Found | Sarangi Dentistry",
      description: "The requested procedure page could not be found.",
    };
  }

  return {
    title: `${procedure.title} | Sarangi Dentistry`,
    description: procedure.shortText,
    alternates: {
      canonical: procedure.path,
    },
    openGraph: {
      title: `${procedure.title} | Sarangi Dentistry`,
      description: procedure.shortText,
      url: procedure.path,
      images: procedure.image ? [{ url: procedure.image, width: 1200, height: 630 }] : [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${procedure.title} | Sarangi Dentistry`,
      description: procedure.shortText,
      images: procedure.image ? [procedure.image] : ["/assets/seat_1.jpg"],
    },
  };
}

export default async function ProcedureDetailPage({
  params,
}: ProcedureDetailPageProps) {
  const { slug } = await params;
  const procedure = await getProcedureById(slug);

  if (!procedure) {
    notFound();
  }

  const canonicalSlug = getSlugFromProcedurePath(procedure.path, procedure.id);

  if (slug !== canonicalSlug) {
    redirect(procedure.path);
  }

  const relatedProcedures = await getRelatedProcedures(procedure.id, 3);

  const faqSchema = procedure.faqs && procedure.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": procedure.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ProcedureDetailPageClient
        procedure={procedure}
        relatedProcedures={relatedProcedures}
      />
    </>
  );
}
