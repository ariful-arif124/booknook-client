
"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { BookOpen, Pencil, Save } from "lucide-react";

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
  onSave: (updatedBook: Book) => void;
};

const categories: Book["category"][] = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function EditBookModal({
  book,
  onSave,
}: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(
    book.description
  );
  const [totalCopies, setTotalCopies] = useState(
    String(book.totalCopies)
  );
  const [error, setError] = useState("");

  const borrowedCopies = Math.max(
    0,
    book.totalCopies - book.availableCopies
  );

  const resetForm = () => {
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setDescription(book.description);
    setTotalCopies(String(book.totalCopies));
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const copies = Number(totalCopies);

    if (
      !title.trim() ||
      !author.trim() ||
      !description.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!Number.isInteger(copies) || copies < 1) {
      setError("Total copies must be a positive whole number.");
      return;
    }

    if (copies < borrowedCopies) {
      setError(
        `Total copies cannot be less than ${borrowedCopies} copies currently on loan.`
      );
      return;
    }

    const updatedBook: Book = {
      ...book,
      title: title.trim(),
      author: author.trim(),
      category,
      description: description.trim(),
      totalCopies: copies,
      availableCopies: copies - borrowedCopies,
    };

    onSave(updatedBook);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) resetForm();
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger className="inline-flex items-center gap-2 rounded-lg border border-[#E5EBE6] bg-[#F8FAF7] px-3 py-2 text-xs font-semibold text-[#07352C] transition-colors hover:border-[#A34D32] hover:text-[#A34D32]">
        <Pencil size={14} />
        Edit
      </DialogTrigger>

      <DialogContent className="!w-[92vw] !max-w-[760px] max-h-[90vh] overflow-y-auto rounded-2xl border-[#E5EBE6] bg-white p-6 text-[#07352C] sm:p-8">
        <DialogHeader className="text-left">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F0EA]">
            <Pencil size={22} className="text-[#07352C]" />
          </div>

          <DialogTitle className="font-serif text-3xl font-bold text-[#07352C]">
            Edit Book Information
          </DialogTitle>

          <DialogDescription className="text-sm leading-6 text-[#64776D]">
            Update your book details and save the changes
            to this preview.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] p-4">
          <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-md bg-white">
            <Image
              src={book.image}
              alt={`${book.title} cover`}
              fill
              sizes="72px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A34D32]">
              Current Book
            </p>

            <h3 className="font-serif mt-2 text-lg font-bold text-[#07352C]">
              {book.title}
            </h3>

            <p className="mt-1 text-xs text-[#64776D]">
              {book.author}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`edit-title-${book.id}`}
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Book Title *
              </label>

              <input
                id={`edit-title-${book.id}`}
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32]"
              />
            </div>

            <div>
              <label
                htmlFor={`edit-author-${book.id}`}
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Author Name *
              </label>

              <input
                id={`edit-author-${book.id}`}
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32]"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`edit-category-${book.id}`}
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Category *
              </label>

              <select
                id={`edit-category-${book.id}`}
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Book["category"])
                }
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`edit-copies-${book.id}`}
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Total Copies *
              </label>

              <input
                id={`edit-copies-${book.id}`}
                type="number"
                required
                min={Math.max(1, borrowedCopies)}
                step="1"
                value={totalCopies}
                onChange={(e) => setTotalCopies(e.target.value)}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`edit-description-${book.id}`}
              className="mb-2 block text-sm font-semibold text-[#07352C]"
            >
              Short Description *
            </label>

            <textarea
              id={`edit-description-${book.id}`}
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-y rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] p-4 text-sm leading-7 outline-none focus:border-[#A34D32]"
            />
          </div>

          <div className="rounded-lg bg-[#EDF3EE] p-4">
            <div className="flex items-start gap-3">
              <BookOpen
                size={18}
                className="mt-0.5 shrink-0 text-[#167454]"
              />

              <p className="text-xs leading-6 text-[#64776D]">
                {borrowedCopies} copies are currently on loan
                in the sample data. Available copies will be
                recalculated when you change the total.
              </p>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <DialogFooter className="flex flex-col gap-3 border-t border-[#E5EBE6] pt-6 sm:flex-row">
            <DialogClose
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] hover:bg-[#F1F5F1]"
            >
              Cancel
            </DialogClose>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
            >
              <Save size={17} />
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
