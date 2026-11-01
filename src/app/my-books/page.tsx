
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import MyBooksTable from "@/components/books/my-books-table";

export const metadata: Metadata = {
  title: "BookNook | My Books",
  description: "Manage books you have contributed to the BookNook library.",
};

export default function MyBooksPage() {
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
              Manage your book contributions and keep track of your shared collection.
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

        <div className="mt-10">
          <MyBooksTable />
        </div>
      </div>
    </main>
  );
}
