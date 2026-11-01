"use client";

import Image from "next/image";
import { useState } from "react";
import { BookCheck, BookOpen, CalendarDays, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export type BorrowItem = {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
  actualReturnDate?: string;
};

type Props = {
  borrow: BorrowItem;
  onReturn: (borrowId: string) => Promise<boolean>;
};

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (!year || !month || !day || month > 12 || month < 1 || day < 1 || day > 31) {
    return date;
  }

  return `${months[month - 1]} ${day}, ${year}`;
}

export default function ReturnBookModal({ borrow, onReturn }: Props) {
  const [open, setOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleReturn = async () => {
    if (isReturning) return;

    setIsReturning(true);

    try {
      const succeeded = await onReturn(borrow.id);
      if (succeeded) setOpen(false);
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !isReturning && setOpen(value)}>
      <DialogTrigger
        type="button"
        disabled={isReturning}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D5E7D9] bg-[#EAF4ED] px-4 py-3 text-xs font-semibold text-[#167454] transition-all hover:border-[#A7CCB3] hover:bg-[#DCEEE2] disabled:opacity-60"
      >
        <RotateCcw size={15} />
        Return Book
      </DialogTrigger>

      <DialogContent className="!w-[calc(100vw-2rem)] !max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl border-[#E5EBE6] bg-white p-6 text-[#07352C] sm:p-8">
        <DialogHeader className="text-left">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#E5F0E9]">
            <BookCheck size={27} className="text-[#07352C]" />
          </div>

          <DialogTitle className="font-serif text-3xl font-bold text-[#07352C]">
            Return This Book?
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm leading-7 text-[#64776D]">
            Finished reading? Confirm that you want to return this book to the
            BookNook collection.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex items-center gap-4 rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] p-4">
          <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md border border-[#E5EBE6] bg-white">
            {imageError || !borrow.bookImage ? (
              <div className="flex h-full items-center justify-center">
                <BookOpen size={26} className="text-[#829D8C]" />
              </div>
            ) : (
              <Image
                src={borrow.bookImage}
                alt={`${borrow.bookTitle} cover`}
                fill
                sizes="80px"
                className="object-contain"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
              Borrowed Book
            </span>
            <h3 className="font-serif mt-2 text-xl font-bold text-[#07352C]">
              {borrow.bookTitle}
            </h3>
            <p className="mt-2 text-sm text-[#64776D]">By {borrow.bookAuthor}</p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E4F2E9] px-3 py-1.5 text-xs font-semibold text-[#167454]">
              <span className="h-2 w-2 rounded-full bg-[#167454]" />
              On Loan
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-[#E5EBE6] p-4">
            <CalendarDays size={19} className="text-[#A34D32]" />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#829188]">
              Borrow Date
            </p>
            <p className="mt-2 text-sm font-semibold text-[#07352C]">
              {formatDate(borrow.borrowDate)}
            </p>
          </div>
          <div className="rounded-lg border border-[#E5EBE6] p-4">
            <CalendarDays size={19} className="text-[#167454]" />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#829188]">
              Return By
            </p>
            <p className="mt-2 text-sm font-semibold text-[#07352C]">
              {formatDate(borrow.returnDate)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-lg bg-[#EDF3EE] p-4">
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#167454]" />
          <p className="text-xs leading-6 text-[#64776D]">
            Returning this book will update your borrowing history and restore
            one available copy in the library.
          </p>
        </div>

        <DialogFooter className="mt-7 flex flex-col gap-3 border-t border-[#E5EBE6] pt-6 sm:flex-row sm:justify-end">
          <DialogClose
            type="button"
            disabled={isReturning}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] transition-colors hover:bg-[#F1F5F1] disabled:opacity-60"
          >
            Cancel
          </DialogClose>
          <button
            type="button"
            onClick={handleReturn}
            disabled={isReturning}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#145244] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isReturning ? <Loader2 size={17} className="animate-spin" /> : <RotateCcw size={17} />}
            {isReturning ? "Returning..." : "Confirm Return"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
