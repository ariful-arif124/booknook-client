
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  BookOpen,
  Pencil,
  Trash2,
  X,
  ArrowUpRight,
} from "lucide-react";

import type { Book } from "@/data/books";

type MyBooksTableProps = {
  books: Book[];
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day || month > 12) {
    return date;
  }

  return `${months[month - 1]} ${day}, ${year}`;
}

function BookCover({ book }: { book: Book }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-18 w-14 shrink-0 overflow-hidden rounded-md border border-[#E5EBE6] bg-[#EEF3EF]">
      {hasError ? (
        <div className="flex h-full items-center justify-center">
          <BookOpen
            size={23}
            className="text-[#829D8C]"
          />
        </div>
      ) : (
        <Image
          src={book.image}
          alt={`${book.title} cover`}
          fill
          sizes="56px"
          className="object-contain"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled
        title="Edit Book will be added in Step 12.2"
        className="inline-flex items-center gap-2 rounded-lg border border-[#E5EBE6] bg-[#F8FAF7] px-3 py-2 text-xs font-semibold text-[#64776D] opacity-65"
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        type="button"
        disabled
        title="Delete Book will be added in Step 12.3"
        aria-label="Delete book - coming in Step 12.3"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F0DEDA] bg-[#FCF6F4] text-[#A34D32] opacity-65"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function MyBooksTable({
  books,
}: MyBooksTableProps) {
  const [search, setSearch] = useState("");

  const searchText = search.trim().toLowerCase();

  const filteredBooks = [...books]
    .filter((book) => {
      return (
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText) ||
        book.category.toLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5EBE6] bg-white shadow-sm">
      <div className="flex flex-col gap-5 border-b border-[#E5EBE6] p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#07352C]">
            Shared Bookshelf
          </h2>

          <p className="mt-2 text-sm text-[#64776D]">
            Showing {filteredBooks.length} of {books.length} demo books
          </p>
        </div>

        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, author, category..."
            aria-label="Search my books"
            className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-11 pr-11 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32]"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#829188] hover:text-[#07352C]"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F0EA]">
            <BookOpen
              size={30}
              className="text-[#6D8F7B]"
            />
          </div>

          <h3 className="font-serif mt-5 text-2xl font-bold text-[#07352C]">
            No Books Found
          </h3>

          <p className="mt-3 text-sm text-[#64776D]">
            Try searching with a different title, author, or category.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#F2F5F1]">
                <tr className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64776D]">
                  <th className="px-6 py-5">Book Details</th>
                  <th className="px-5 py-5">Category</th>
                  <th className="px-5 py-5">Total</th>
                  <th className="px-5 py-5">Available</th>
                  <th className="px-5 py-5">Date Added</th>
                  <th className="px-5 py-5">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E9EEEA]">
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="transition-colors hover:bg-[#FAFBF9]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <BookCover book={book} />

                        <div className="min-w-0">
                          <Link
                            href={`/books/${book.id}`}
                            className="font-serif text-base font-bold text-[#07352C] hover:text-[#A34D32]"
                          >
                            {book.title}
                          </Link>

                          <p className="mt-1 text-xs text-[#829188]">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="rounded-full bg-[#EAF0EA] px-3 py-1.5 text-xs font-medium text-[#426957]">
                        {book.category}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm font-semibold text-[#07352C]">
                      {book.totalCopies}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                          book.availableCopies > 0
                            ? "bg-[#E4F2E9] text-[#167454]"
                            : "bg-[#FBE9E4] text-[#BF654C]"
                        }`}
                      >
                        {book.availableCopies > 0
                          ? `${book.availableCopies} Available`
                          : "Lent Out"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-xs text-[#64776D]">
                      <time dateTime={book.createdAt}>
                        {formatDate(book.createdAt)}
                      </time>
                    </td>

                    <td className="px-5 py-5">
                      <ActionButtons />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-[#E9EEEA] md:hidden">
            {filteredBooks.map((book) => (
              <article key={book.id} className="p-5">
                <div className="flex items-start gap-4">
                  <BookCover book={book} />

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/books/${book.id}`}
                      className="font-serif text-lg font-bold text-[#07352C]"
                    >
                      {book.title}
                    </Link>

                    <p className="mt-1 text-sm text-[#64776D]">
                      {book.author}
                    </p>

                    <span className="mt-2 inline-block rounded-full bg-[#EAF0EA] px-3 py-1 text-xs text-[#426957]">
                      {book.category}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 rounded-lg bg-[#F8FAF7] p-4">
                  <div>
                    <p className="text-[10px] text-[#829188]">
                      Total
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#07352C]">
                      {book.totalCopies}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#829188]">
                      Available
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#07352C]">
                      {book.availableCopies}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#829188]">
                      Added
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#07352C]">
                      {formatDate(book.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={`/books/${book.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#A34D32]"
                  >
                    View Book
                    <ArrowUpRight size={14} />
                  </Link>

                  <ActionButtons />
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <div className="border-t border-[#E5EBE6] bg-[#FAFBF9] px-6 py-4">
        <p className="text-xs text-[#829188]">
          Edit and Delete actions will be available in the next steps.
        </p>
      </div>
    </div>
  );
}
