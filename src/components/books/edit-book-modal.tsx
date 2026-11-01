
"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { BookOpen, Loader2, Pencil, Save } from "lucide-react";
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
  onSave: (updatedBook: Book) => Promise<boolean>;
};

const categories: Book["category"][] = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function EditBookModal({ book, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description);
  const [totalCopies, setTotalCopies] = useState(String(book.totalCopies));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

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
    setImageError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    setError("");

    const copies = Number(totalCopies);

    if (
      !title.trim() ||
      title.trim().length > 200 ||
      !author.trim() ||
      author.trim().length > 150 ||
      !description.trim() ||
      description.trim().length > 2000
    ) {
      setError("Please complete all fields within the allowed lengths.");
      return;
    }

    if (
      !Number.isSafeInteger(copies) ||
      copies < 1 ||
      copies > 1000
    ) {
      setError("Total copies must be a whole number between 1 and 1000.");
      return;
    }

    if (copies < borrowedCopies) {
      setError(`At least ${borrowedCopies} copies are currently on loan.`);
      return;
    }

    setSaving(true);

    try {
      const success = await onSave({
        ...book,
        title: title.trim(),
        author: author.trim(),
        category,
        description: description.trim(),
        totalCopies: copies,
        availableCopies: copies - borrowedCopies,
      });

      if (success) setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (saving) return;
        if (nextOpen) resetForm();
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-[#E5EBE6] bg-[#F8FAF7] px-3 py-2 text-xs font-semibold text-[#07352C] transition-colors hover:border-[#A34D32] hover:text-[#A34D32]"
      >
        <Pencil size={14} />
        Edit
      </DialogTrigger>

      <DialogContent className="!w-[calc(100vw-2rem)] !max-w-[760px] max-h-[90vh] overflow-y-auto rounded-2xl border-[#E5EBE6] bg-white p-6 text-[#07352C] sm:p-8">
        <DialogHeader className="text-left">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F0EA]">
            <Pencil size={22} className="text-[#07352C]" />
          </div>

          <DialogTitle className="font-serif text-3xl font-bold text-[#07352C]">
            Edit Book Information
          </DialogTitle>

          <DialogDescription className="text-sm leading-6 text-[#64776D]">
            Update the details of a book you added. Changes are saved to MongoDB.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#E5EBE6] bg-[#F8FAF7] p-4">
          <div className="relative h-24 w-[72px] shrink-0 overflow-hidden rounded-md bg-white">
            {!book.image || imageError ? (
              <div className="flex h-full items-center justify-center">
                <BookOpen
                  className="text-[#829D8C]"
                  size={25}
                />
              </div>
            ) : (
              <Image
                src={book.image}
                alt={`${book.title} cover`}
                fill
                sizes="72px"
                className="object-contain"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#A34D32]">
              Current Book
            </p>

            <h3 className="mt-2 font-serif text-lg font-bold text-[#07352C]">
              {book.title}
            </h3>

            <p className="mt-1 text-xs text-[#64776D]">
              By {book.author}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-6">
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
                maxLength={200}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={saving}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32] disabled:opacity-60"
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
                maxLength={150}
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                disabled={saving}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32] disabled:opacity-60"
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
                onChange={(event) =>
                  setCategory(event.target.value as Book["category"])
                }
                disabled={saving}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32] disabled:opacity-60"
              >
                {categories.map((value) => (
                  <option value={value} key={value}>
                    {value}
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
                max={1000}
                step={1}
                value={totalCopies}
                onChange={(event) =>
                  setTotalCopies(event.target.value)
                }
                disabled={saving}
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm outline-none focus:border-[#A34D32] disabled:opacity-60"
              />

              <p className="mt-2 text-xs text-[#829188]">
                {borrowedCopies} copies currently on loan
              </p>
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
              rows={4}
              required
              maxLength={2000}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              disabled={saving}
              className="w-full resize-y rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 py-3 text-sm leading-6 outline-none focus:border-[#A34D32] disabled:opacity-60"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <DialogFooter className="flex flex-col gap-3 border-t border-[#E5EBE6] pt-6 sm:flex-row sm:justify-end">
            <DialogClose
              type="button"
              disabled={saving}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] hover:bg-[#F1F5F1] disabled:opacity-60"
            >
              Cancel
            </DialogClose>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#145244] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Save size={17} />
              )}

              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
