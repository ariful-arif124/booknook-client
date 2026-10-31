
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Layers3,
  UserRound,
} from "lucide-react";

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

  const isAvailable = book.availableCopies > 0;
  const addedBy = book.addedByName ?? "BookNook Demo Catalog";

  return (
    <section className="min-h-screen bg-[#F8FAF7] px-5 py-12 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#07352C] transition-colors hover:text-[#A34D32]"
          >
            <ArrowLeft size={18} />
            Back to All Books
          </Link>

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#829188]"
          >
            <Link href="/" className="hover:text-[#A34D32]">
              Home
            </Link>

            <ChevronRight size={13} />

            <Link href="/books" className="hover:text-[#A34D32]">
              All Books
            </Link>

            <ChevronRight size={13} />

            <span className="font-semibold text-[#07352C]">
              {book.title}
            </span>
          </nav>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#E5EBE6] bg-white p-6 shadow-sm sm:p-10">
              <span className="absolute right-5 top-5 z-10 rounded-md bg-[#A34D32] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                BookNook Collection
              </span>

              <div className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-[350px] overflow-hidden rounded-lg bg-[#F0F3EF]">
                <Image
                  src={book.image}
                  alt={`${book.title} by ${book.author}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 350px"
                  className="object-contain p-4"
                />
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#EDF0EC] pt-5">
                <span className="flex items-center gap-2 text-xs text-[#64776D]">
                  <BookOpen size={15} className="text-[#A34D32]" />
                  Physical Book
                </span>

                <span className="text-xs font-medium text-[#07352C]">
                  {book.category}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EBE6] bg-[#EEF3EF] p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <Layers3 size={21} className="text-[#A34D32]" />

                <h2 className="font-serif text-xl font-bold text-[#07352C]">
                  Book Specifications
                </h2>
              </div>

              <dl className="grid grid-cols-2 gap-x-5 gap-y-7">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#829188]">
                    Category
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-[#07352C]">
                    {book.category}
                  </dd>
                </div>

                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#829188]">
                    Total Copies
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-[#07352C]">
                    {book.totalCopies}
                  </dd>
                </div>

                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#829188]">
                    Available Copies
                  </dt>

                  <dd className="mt-2 text-sm font-semibold text-[#07352C]">
                    {book.availableCopies}
                  </dd>
                </div>

                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[#829188]">
                    Availability
                  </dt>

                  <dd
                    className={`mt-2 text-sm font-semibold ${
                      isAvailable
                        ? "text-[#167454]"
                        : "text-[#C45B43]"
                    }`}
                  >
                    {isAvailable ? "Available" : "Not Available"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F2E9E2] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#A34D32]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A34D32]">
                {book.category} Collection
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#07352C] sm:text-5xl lg:text-6xl">
              {book.title}
            </h1>

            <p className="mt-5 text-lg text-[#A34D32]">
              By {book.author}
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#E5EBE6] bg-white p-5">
                <UserRound
                  size={20}
                  className="mb-4 text-[#A34D32]"
                />

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#829188]">
                  Added By
                </p>

                <p className="mt-2 break-words text-sm font-semibold text-[#07352C]">
                  {addedBy}
                </p>
              </div>

              <div className="rounded-xl border border-[#E5EBE6] bg-white p-5">
                <BookOpen
                  size={20}
                  className="mb-4 text-[#167454]"
                />

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#829188]">
                  Availability
                </p>

                <p
                  className={`mt-2 text-sm font-semibold ${
                    isAvailable
                      ? "text-[#167454]"
                      : "text-[#C45B43]"
                  }`}
                >
                  {isAvailable
                    ? `${book.availableCopies} Available`
                    : "Not Available"}
                </p>
              </div>

              <div className="rounded-xl border border-[#E5EBE6] bg-white p-5">
                <Layers3
                  size={20}
                  className="mb-4 text-[#A34D32]"
                />

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#829188]">
                  Total Copies
                </p>

                <p className="mt-2 text-sm font-semibold text-[#07352C]">
                  {book.totalCopies} Copies
                </p>
              </div>
            </div>

            <div className="mt-9 rounded-xl border border-[#E4EAE4] bg-[#EDF3EE] p-6">
              <p className="font-serif text-lg font-semibold text-[#07352C]">
                A story worth discovering.
              </p>

              <p className="mt-2 text-sm leading-7 text-[#64776D]">
                Explore this title and find your next reading
                experience through the BookNook collection.
              </p>
            </div>

            <div className="mt-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#A34D32]" />

                <span className="text-xs font-bold uppercase tracking-widest text-[#A34D32]">
                  Book Overview
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-[#07352C]">
                Synopsis & Details
              </h2>

              <p className="mt-6 text-base leading-9 text-[#64776D]">
                {book.description}
              </p>

              <div className="mt-8 border-t border-[#E5EBE6] pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#829188]">
                  Shared By
                </p>

                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-[#07352C]">
                  <UserRound size={17} className="text-[#A34D32]" />
                  {addedBy}
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[#E5EBE6] bg-white p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled
                  className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-3 rounded-lg bg-[#07352C] px-7 py-4 text-sm font-semibold text-white"
                >
                  <BookOpen size={19} />

                  {isAvailable
                    ? "Borrow This Book"
                    : "Not Available"}
                </button>

                <Link
                  href="/books"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5EBE6] bg-[#F7F9F6] px-6 py-4 text-sm font-semibold text-[#07352C] transition-colors hover:bg-[#EAF0EA]"
                >
                  Explore More
                  <ArrowRight size={17} />
                </Link>
              </div>

              <p className="mt-5 text-center text-xs leading-6 text-[#829188]">
                {isAvailable
                  ? "Borrowing will be enabled when we add the Borrow modal and authentication."
                  : "All copies are currently unavailable. Please explore another book."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
