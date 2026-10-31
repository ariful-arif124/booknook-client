
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { books } from "@/data/books";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const book = books.find((item) => item.id === id);

  return {
    title: `BookNook | ${book?.title ?? "Book Not Found"}`,
  };
}

export default async function BookDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const book = books.find((item) => item.id === id);

  if (!book) {
    notFound();
  }

  return (
    <section className="min-h-[70vh] bg-[#F8FAF7] px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64776D] transition-colors hover:text-[#A34D32]"
        >
          <ArrowLeft size={18} />
          Back to All Books
        </Link>

        <div className="mt-12 rounded-2xl border border-[#E5EBE6] bg-white p-8 sm:p-12">
          <span className="inline-block rounded-md bg-[#F2E8E0] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#A34D32]">
            {book.category}
          </span>

          <h1 className="font-serif mt-6 text-4xl font-bold text-[#07352C] sm:text-5xl">
            {book.title}
          </h1>

          <p className="mt-4 text-lg text-[#64776D]">
            By {book.author}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <BookOpen size={22} className="text-[#A34D32]" />

            <span className="text-sm font-medium text-[#07352C]">
              {book.availableCopies} of {book.totalCopies} copies available
            </span>
          </div>

          <div className="mt-10 border-t border-[#E5EBE6] pt-8">
            <h2 className="font-serif text-2xl font-bold text-[#07352C]">
              About This Book
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#64776D]">
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
