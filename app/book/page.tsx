// app/book/page.tsx
import { getAllBooks } from "@/data/books";
import BooksPageClient from "@/components/book/BooksPageClient";

export const metadata = {
  title: "Books — Dr. Sarangi | Author",
  description:
    "Explore the published works of Dr. Soumendra Sarangi — a blend of clinical wisdom and profound personal storytelling.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Books — Dr. Sarangi | Author",
    description: "Explore the published works of Dr. Soumendra Sarangi — a blend of clinical wisdom and profound personal storytelling.",
    url: "/book",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books — Dr. Sarangi | Author",
    description: "Explore the published works of Dr. Soumendra Sarangi — a blend of clinical wisdom and profound personal storytelling.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function BooksPage() {
  const books = await getAllBooks();

  return <BooksPageClient books={books} />;
}
