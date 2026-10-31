
"use client";

import Image from "next/image";
import { BookOpen, CalendarDays, LockKeyhole } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { Book } from "@/data/books";

type BorrowBookModalProps = {
  book: Book;
};

export default function BorrowBookModal({
  book,
}: BorrowBookModalProps) {
  const isAvailable = book.availableCopies > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={!isAvailable}
          className={`inline-flex flex-1 items-center justify-center gap-3 rounded-lg px-7 py-4 text-sm font-semibold transition-all ${
            isAvailable
              ? "bg-[#07352C] text-white hover:bg-[#145244]"
              : "cursor-not-allowed bg-[#DCE3DD] text-[#87958B]"
          }`}
        >
          <BookOpen size={19} />
          {isAvailable ? "Borrow This Book" : "Not Available"}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border-[#E5EBE6] bg-white p-0 text-[#07352C] shadow-2xl">
        <div className="p-6 sm:p-8">
          <DialogHeader className="text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4F0E8]">
              <BookOpen size={24} className="text-[#07352C]" />
            </div>

            <DialogTitle className="font-serif text-3xl font-bold text-[#07352C]">
              Borrow This Book
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-[#64776D]">
              Review the book information and your borrowing details.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-7 flex items-center gap-4 rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] p-4">
            <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md bg-[#E9EEEA]">
              <Image
                src={book.image}
                alt={`${book.title} book cover`}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>

            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
                {book.category}
              </span>

              <h3 className="font-serif mt-2 text-lg font-bold text-[#07352C]">
                {book.title}
              </h3>

              <p className="mt-1 text-xs text-[#64776D]">
                By {book.author}
              </p>

              <p className="mt-3 text-xs font-semibold text-[#167454]">
                {book.availableCopies} copies available
              </p>
            </div>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-7 space-y-5"
          >
            <div>
              <label
                htmlFor="borrow-user-name"
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                User Name
              </label>

              <input
                id="borrow-user-name"
                type="text"
                value=""
                readOnly
                placeholder="Available after login"
                className="h-12 w-full rounded-lg border border-[#E5EBE6] bg-[#F3F6F2] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#84948A]"
              />
            </div>

            <div>
              <label
                htmlFor="borrow-user-email"
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                User Email
              </label>

              <input
                id="borrow-user-email"
                type="email"
                value=""
                readOnly
                placeholder="Available after login"
                className="h-12 w-full rounded-lg border border-[#E5EBE6] bg-[#F3F6F2] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#84948A]"
              />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-[#EDF3EE] p-4">
              <CalendarDays
                size={19}
                className="mt-0.5 shrink-0 text-[#A34D32]"
              />

              <p className="text-xs leading-6 text-[#64776D]">
                Your borrowing and return dates will be recorded
                when your request is confirmed.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-[#E5EBE6] p-4">
              <LockKeyhole
                size={18}
                className="mt-0.5 shrink-0 text-[#A34D32]"
              />

              <p className="text-xs leading-6 text-[#64776D]">
                Borrowing will become available after
                authentication and database integration.
              </p>
            </div>

            <DialogFooter className="mt-7 flex flex-col gap-3 sm:flex-row">
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] transition-colors hover:bg-[#F1F5F1]"
                >
                  Cancel
                </button>
              </DialogClose>

              <button
                type="submit"
                disabled
                className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[#07352C]/55 px-6 text-sm font-semibold text-white"
              >
                <BookOpen size={17} />
                Confirm Borrow
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
