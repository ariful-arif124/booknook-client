
import type { Metadata } from "next";
import AddBookForm from "@/components/books/add-book-form";

export const metadata: Metadata = {
  title: "BookNook | Add Book",
  description:
    "Share a book with the BookNook reading community.",
};

export default function AddBookPage() {
  return <AddBookForm />;
}
