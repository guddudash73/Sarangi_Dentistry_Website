// app/book/page.tsx
import { getAllBooks } from "@/data/books";
import BooksPageClient from "@/components/book/BooksPageClient";

export const metadata = {
  title: "Books — Dr. Sarangi | Author",
  description:
    "Explore the published works of Dr. Soumendra Sarangi — a blend of clinical wisdom and profound personal storytelling.",
};

export default async function BooksPage() {
  const books = await getAllBooks();

  return <BooksPageClient books={books} />;
}
