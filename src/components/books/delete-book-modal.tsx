
"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
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
  onDelete: (bookId: string) => Promise<boolean>;
};

export default function DeleteBookModal({
  book,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const borrowedCopies =
    book.totalCopies - book.availableCopies;

  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      const success = await onDelete(book.id);

      if (success) setOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) =>
        !deleting && setOpen(nextOpen)
      }
    >
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
            Are you sure you want to remove this book from your personal library?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
            Selected Book
          </p>

          <h3 className="mt-3 font-serif text-xl font-bold text-[#07352C]">
            {book.title}
          </h3>

          <p className="mt-2 text-sm text-[#64776D]">
            By {book.author}
          </p>
        </div>

        {borrowedCopies > 0 ? (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-[#F0DEDA] bg-[#FCF6F4] p-4 text-sm leading-6 text-[#A34D32]"
          >
            {borrowedCopies}{" "}
            {borrowedCopies === 1 ? "copy is" : "copies are"}{" "}
            currently on loan. This book cannot be deleted until all copies are returned.
          </p>
        ) : (
          <p className="mt-5 text-sm leading-6 text-[#64776D]">
            This action removes the book from MongoDB and cannot be undone.
          </p>
        )}

        <DialogFooter className="mt-7 flex flex-col gap-3 border-t border-[#E5EBE6] pt-6 sm:flex-row sm:justify-end">
          <DialogClose
            type="button"
            disabled={deleting}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] hover:bg-[#F1F5F1] disabled:opacity-60"
          >
            Cancel
          </DialogClose>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || borrowedCopies > 0}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#B34A39] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#973A2C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={17} />
            )}

            {deleting ? "Deleting..." : "Delete Book"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
