
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight, BookOpen } from "lucide-react";

import BookExplorer from "@/components/books/book-explorer";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description:
    "Explore the BookNook collection and discover your next favorite book.",
};

export default function AllBooksPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF7]">
      <section className="border-b border-[#E5EBE6] px-5 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-xs text-[#75857C]">
            <Link
              href="/"
              className="transition-colors hover:text-[#A34D32]"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="font-semibold text-[#07352C]">
              All Books
            </span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#A34D32]" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A34D32]">
                  Communal Repository
                </span>
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight text-[#07352C] sm:text-5xl">
                Explore the Collection.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#64776D] sm:text-base">
                Find your next read among stories, ideas,
                and discoveries shared by our community
                of passionate readers.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-[#E5EBE6] bg-white px-5 py-3">
              <BookOpen size={19} className="text-[#A34D32]" />

              <span className="text-sm font-semibold text-[#07352C]">
                {books.length} Community Books
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Suspense
            fallback={
              <div className="rounded-xl bg-white p-10 text-center text-sm text-[#64776D]">
                Loading the book collection...
              </div>
            }
          >
            <BookExplorer books={books} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
