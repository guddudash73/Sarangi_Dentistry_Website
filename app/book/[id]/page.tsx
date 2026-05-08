import { notFound, redirect } from "next/navigation";
import { getAllBooks, getBookById } from "@/data/books";
import BookPageClient from "@/components/book/BookPageClient";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type BookDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getSlugFromBookPath(path: string, fallbackId: string): string {
  const cleanPath = path.trim().replace(/\/+$/, "");

  if (cleanPath.startsWith("/book/")) {
    const slug = cleanPath.replace(/^\/book\//, "").trim();
    if (slug) return slug;
  }

  return fallbackId;
}

export async function generateStaticParams() {
  const books = await getAllBooks();

  return books.map((book) => ({
    id: getSlugFromBookPath(book.path, book.id),
  }));
}

export async function generateMetadata({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return {
      title: "Book not found | Sarangi Dentistry",
      description: "The requested book page could not be found.",
    };
  }

  const image = book.fullUrl ?? book.cardUrl ?? book.coverImage;

  return {
    title: `${book.title} | Dr. Sarangi`,
    description: book.synopsis,
    alternates: {
      canonical: book.path,
    },
    openGraph: {
      title: `${book.title} | Dr. Sarangi`,
      description: book.synopsis,
      url: book.path,
      type: "article",
      images: [
        {
          url: image,
          width: book.width ?? 1200,
          height: book.height ?? 630,
          alt: `${book.title} cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} | Dr. Sarangi`,
      description: book.synopsis,
      images: [image],
    },
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  const canonicalSlug = getSlugFromBookPath(book.path, book.id);

  if (id !== canonicalSlug) {
    redirect(book.path);
  }

  return <BookPageClient book={book} />;
}
