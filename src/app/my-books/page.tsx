
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowLeft,
  Plus,
  BookOpen,
  Layers3,
  BookCheck,
  BookMarked,
} from "lucide-react";

import MyBooksTable from "@/components/books/my-books-table";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "BookNook | My Books",
  description:
    "Manage your shared books and personal library.",
};

export default function MyBooksPage() {
  const demoBooks = books.slice(0, 4);

  const totalCopies = demoBooks.reduce(
    (total, book) => total + book.totalCopies,
    0
  );

  const availableCopies = demoBooks.reduce(
    (total, book) => total + book.availableCopies,
    0
  );

  const borrowedCopies = totalCopies - availableCopies;

  const stats = [
    {
      label: "Shared Books",
      value: demoBooks.length,
      icon: BookOpen,
    },
    {
      label: "Total Copies",
      value: totalCopies,
      icon: Layers3,
    },
    {
      label: "Available Copies",
      value: availableCopies,
      icon: BookCheck,
    },
    {
      label: "On Loan",
      value: borrowedCopies,
      icon: BookMarked,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-5 py-12 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64776D] hover:text-[#A34D32]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F3EAE3] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#A34D32]" />

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
                Personal Library
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-[#07352C] sm:text-5xl">
              My Personal Library.
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#64776D] sm:text-base">
              Manage your book contributions and keep track
              of your shared collection.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white transition-all hover:bg-[#A34D32]"
          >
            <Plus size={18} />
            Add New Book
          </Link>
        </div>

        <div className="mt-10 rounded-xl border border-[#E5E5D5] bg-[#FCF9EB] px-5 py-4">
          <p className="text-sm leading-6 text-[#796D48]">
            Demo Preview: This page currently shows four sample
            books. After authentication and MongoDB integration,
            it will display only the books you added.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-[#E5EBE6] bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E7F0E9]">
                    <Icon
                      size={21}
                      className="text-[#07352C]"
                    />
                  </div>

                  <span className="font-serif text-3xl font-bold text-[#DCE7DF]">
                    {String(stat.value).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#829188]">
                  {stat.label}
                </h2>

                <p className="font-serif mt-2 text-3xl font-bold text-[#07352C]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <MyBooksTable books={demoBooks} />
        </div>
      </div>
    </main>
  );
}
