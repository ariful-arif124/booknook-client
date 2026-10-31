
"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

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

import type { Book } from "@/data/books";

type Props = {
  book: Book;
  onDelete: (bookId: string) => void;
};

export default function DeleteBookModal({
  book,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(book.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        aria-label={`Delete ${book.title}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F0DEDA] bg-[#FCF6F4] text-[#B34A39] transition-colors hover:border-[#D9A69D] hover:bg-[#FBE9E4]"
      >
        <Trash2 size={16} />
      </DialogTrigger>

      <DialogContent className="!w-[calc(100vw-2rem)] !max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl border-[#E5EBE6] bg-white p-6 text-[#07352C] sm:p-8">
        <DialogHeader className="text-left">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FCEAE6]">
            <AlertTriangle
              size={27}
              className="text-[#B34A39]"
            />
          </div>

          <DialogTitle className="font-serif text-3xl font-bold text-[#07352C]">
            Delete This Book?
          </DialogTitle>

          <DialogDescription className="mt-2 text-sm leading-7 text-[#64776D]">
            Are you sure you want to remove this book
            from your personal library?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
            Selected Book
          </p>

          <h3 className="font-serif mt-3 text-xl font-bold text-[#07352C]">
            {book.title}
          </h3>

          <p className="mt-2 text-sm text-[#64776D]">
            By {book.author}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#E8EFE9] px-3 py-1.5 text-xs font-medium text-[#426957]">
              {book.category}
            </span>

            <span className="rounded-full bg-[#E8EFE9] px-3 py-1.5 text-xs font-medium text-[#426957]">
              {book.totalCopies} Total Copies
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#F2DED9] bg-[#FFF6F3] p-4">
          <p className="text-xs leading-6 text-[#A34D32]">
            This will remove the book from the current
            preview. Changes will be permanent only
            after we connect the database.
          </p>
        </div>

        <DialogFooter className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <DialogClose
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] transition-colors hover:bg-[#F1F5F1]"
          >
            Cancel
          </DialogClose>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#B34A39] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#963727]"
          >
            <Trash2 size={17} />
            Delete Book
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
