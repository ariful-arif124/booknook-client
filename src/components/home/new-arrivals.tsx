
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "@/components/books/book-card";
import { books } from "@/data/books";

export default function NewArrivals() {
  const latestBooks = books.slice(0, 6);

  return (
    <section
      id="new-arrivals"
      className="bg-white px-5 py-20 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#A34D32]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A34D32]">
                Fresh on the Shelves
              </span>
            </div>

            <h2 className="font-serif text-4xl font-bold leading-tight text-[#07352C] sm:text-5xl">
              Just Added to the Nook.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#64776D] sm:text-base">
              Discover our newest collection of stories,
              fascinating ideas, and timeless classics.
              Your next favorite book could be waiting here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#29946C]" />

            <p className="text-sm font-medium text-[#64776D]">
              {latestBooks.length} Books to Explore
            </p>
          </div>
        </div>

        {latestBooks.length === 0 ? (
          <div className="rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] px-6 py-20 text-center">
            <h3 className="font-serif text-2xl font-bold text-[#07352C]">
              No Books Available Yet
            </h3>

            <p className="mt-3 text-sm text-[#64776D]">
              New books will appear here when they are added
              to our collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            href="/books"
            className="group inline-flex items-center gap-3 rounded-lg bg-[#07352C] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A34D32]"
          >
            See All Books

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
