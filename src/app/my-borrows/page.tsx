
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

import MyBorrowsTable from "@/components/books/my-borrows-table";
import { demoBorrows } from "@/data/borrows";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
  description:
    "Track your borrowed books and return dates on BookNook.",
};

export default function MyBorrowsPage() {
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
                My Reading Journey
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-[#07352C] sm:text-5xl">
              My Borrowed Books.
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#64776D] sm:text-base">
              Keep track of the stories you have borrowed,
              monitor your return dates, and manage
              your reading journey.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
          >
            <BookOpenCheck size={18} />
            Browse More Books
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 rounded-xl border border-[#E5E5D5] bg-[#FCF9EB] px-5 py-4">
          <p className="text-sm leading-6 text-[#796D48]">
            Demo Preview: This page currently displays
            sample borrowing records. Actual borrowing
            information will be connected through Better Auth
            and MongoDB.
          </p>
        </div>

        <div className="mt-8">
          <MyBorrowsTable borrows={demoBorrows} />
        </div>
      </div>
    </main>
  );
}
