"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { BookOpen, CalendarDays, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

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

import { authClient } from "@/lib/auth-client";
import type { Book } from "@/data/books";

type BorrowBookModalProps = {
  book: Book;
};

type ApiResult = {
  success?: boolean;
  message?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_BOOKNOOK_API_URL || "http://localhost:5000";

export default function BorrowBookModal({ book }: BorrowBookModalProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [availableCopies, setAvailableCopies] = useState(book.availableCopies);

  useEffect(() => {
    setAvailableCopies(book.availableCopies);
  }, [book.availableCopies]);

  const isAvailable = availableCopies > 0;

  const handleBorrow = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || !isAvailable) return;

    if (!session?.user) {
      setError("Please sign in before borrowing a book.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { data, error: tokenError } = await authClient.token();

      if (tokenError || !data?.token) {
        throw new Error("Your session expired. Please sign in again.");
      }

      const response = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      const result = (await response.json().catch(() => ({}))) as ApiResult;

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to borrow this book. Please try again."
        );
      }

      setAvailableCopies((count) => Math.max(0, count - 1));
      setOpen(false);
      toast.success(result.message || "Book borrowed successfully.");
      router.refresh();
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Unable to borrow this book. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) return;
        if (nextOpen) setError("");
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger
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
                {availableCopies} copies available
              </p>
            </div>
          </div>

          <form onSubmit={handleBorrow} className="mt-7 space-y-5">
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
                value={session?.user.name ?? ""}
                readOnly
                placeholder={isPending ? "Checking account..." : "Sign in to continue"}
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
                value={session?.user.email ?? ""}
                readOnly
                placeholder={isPending ? "Checking account..." : "Sign in to continue"}
                className="h-12 w-full rounded-lg border border-[#E5EBE6] bg-[#F3F6F2] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#84948A]"
              />
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[#EDF3EE] p-4">
              <CalendarDays
                size={19}
                className="mt-0.5 shrink-0 text-[#A34D32]"
              />
              <p className="text-xs leading-6 text-[#64776D]">
                The borrowing date and seven-day return deadline will be
                recorded when you confirm your request.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-[#E5EBE6] p-4">
              <LockKeyhole
                size={18}
                className="mt-0.5 shrink-0 text-[#A34D32]"
              />
              <p className="text-xs leading-6 text-[#64776D]">
                {session?.user
                  ? "Your account is verified before this borrowing request is saved."
                  : "Sign in to your BookNook account to borrow this book."}
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {error}
              </p>
            )}

            {!isPending && !session?.user && (
              <Link
                href="/login"
                className="flex h-12 items-center justify-center rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white hover:bg-[#145244]"
              >
                Sign In to Borrow
              </Link>
            )}

            <DialogFooter className="mt-7 flex flex-col gap-3 sm:flex-row">
              <DialogClose
                type="button"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#E5EBE6] bg-white px-6 text-sm font-semibold text-[#07352C] transition-colors hover:bg-[#F1F5F1] disabled:opacity-60"
              >
                Cancel
              </DialogClose>
              <button
                type="submit"
                disabled={isPending || !session?.user || isSubmitting || !isAvailable}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#07352C] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#145244] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <BookOpen size={17} />
                    Confirm Borrow
                  </>
                )}
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
