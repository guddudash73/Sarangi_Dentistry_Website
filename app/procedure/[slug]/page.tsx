import { notFound } from "next/navigation";
import ProcedureDetailPageClient from "@/components/procedure/ProcedureDetailPageClient";
import {
  getAllProcedures,
  getProcedureById,
  getRelatedProcedures,
} from "@/data/procedures";

type ProcedureDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllProcedures().map((item) => ({
    slug: item.id,
  }));
}

export async function generateMetadata({ params }: ProcedureDetailPageProps) {
  const { slug } = await params;
  const procedure = getProcedureById(slug);

  if (!procedure) {
    return {
      title: "Procedure Not Found | Sarangi Dentistry",
      description: "The requested procedure page could not be found.",
    };
  }

  return {
    title: `${procedure.title} | Sarangi Dentistry`,
    description: procedure.shortText,
  };
}

export default async function ProcedureDetailPage({
  params,
}: ProcedureDetailPageProps) {
  const { slug } = await params;
  const procedure = getProcedureById(slug);

  if (!procedure) {
    notFound();
  }

  const relatedProcedures = getRelatedProcedures(procedure.id, 3);

  return (
    <ProcedureDetailPageClient
      procedure={procedure}
      relatedProcedures={relatedProcedures}
    />
  );
}
