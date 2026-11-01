
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowUpRight,
  BookCheck,
  BookMarked,
  BookOpen,
  Layers3,
  Loader2,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import EditBookModal from "@/components/books/edit-book-modal";
import DeleteBookModal from "@/components/books/delete-book-modal";
import { authClient } from "@/lib/auth-client";
import { toBook, type ApiBook } from "@/lib/books-api";
import type { Book } from "@/data/books";

const API_URL =
  process.env.NEXT_PUBLIC_BOOKNOOK_API_URL || "http://localhost:5000";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function getAccessToken() {
  const response = await fetch("/api/auth/token", {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  const result: unknown = await response.json();

  if (
    !result ||
    typeof result !== "object" ||
    !("token" in result) ||
    typeof result.token !== "string" ||
    !result.token
  ) {
    throw new Error("Unable to verify your session. Please sign in again.");
  }

  return result.token;
}

async function readError(response: Response, fallback: string) {
  try {
    const result: unknown = await response.json();

    if (
      result &&
      typeof result === "object" &&
      "message" in result &&
      typeof result.message === "string"
    ) {
      return result.message;
    }
  } catch {}

  return fallback;
}

function BookCover({ book }: { book: Book }) {
  const [failedImage, setFailedImage] = useState(false);

  return (
    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md border border-[#E5EBE6] bg-[#EEF3EF]">
      {failedImage || !book.image ? (
        <div className="flex h-full items-center justify-center">
          <BookOpen size={23} className="text-[#829D8C]" />
        </div>
      ) : (
        <Image
          src={book.image}
          alt={`${book.title} cover`}
          fill
          sizes="56px"
          className="object-contain"
          onError={() => setFailedImage(true)}
        />
      )}
    </div>
  );
}

export default function MyBooksTable() {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBooks = useCallback(async () => {
    if (!userId) {
      setMyBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/books`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load your books. Please try again.");
      }

      const result: unknown = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("The server returned invalid book data.");
      }

      const owned = (result as ApiBook[])
        .filter((book) => book.addedById === userId)
        .map(toBook);

      setMyBooks(owned);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load books."
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!isPending) void loadBooks();
  }, [isPending, loadBooks]);

  const stats = useMemo(() => {
    const totalCopies = myBooks.reduce(
      (sum, book) => sum + book.totalCopies,
      0
    );

    const availableCopies = myBooks.reduce(
      (sum, book) => sum + book.availableCopies,
      0
    );

    return [
      {
        label: "Shared Books",
        value: myBooks.length,
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
        value: totalCopies - availableCopies,
        icon: BookMarked,
      },
    ];
  }, [myBooks]);

  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return myBooks
      .filter(
        (book) =>
          book.title.toLowerCase().includes(keyword) ||
          book.author.toLowerCase().includes(keyword) ||
          book.category.toLowerCase().includes(keyword)
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [myBooks, search]);

  const handleSave = async (updatedBook: Book): Promise<boolean> => {
    try {
      const token = await getAccessToken();

      const response = await fetch(`${API_URL}/books/${updatedBook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedBook.title,
          author: updatedBook.author,
          category: updatedBook.category,
          description: updatedBook.description,
          totalCopies: updatedBook.totalCopies,
        }),
      });

      if (!response.ok) {
        throw new Error(
          await readError(response, "Unable to update the book.")
        );
      }

      const result: {
        book: ApiBook;
        message?: string;
      } = await response.json();

      if (!result.book?._id) {
        throw new Error("The server did not return an updated book.");
      }

      const saved = toBook(result.book);

      setMyBooks((current) =>
        current.map((book) =>
          book.id === saved.id ? saved : book
        )
      );

      toast.success("Book updated successfully.");

      return true;
    } catch (cause) {
      toast.error(
        cause instanceof Error ? cause.message : "Update failed."
      );

      return false;
    }
  };

  const handleDelete = async (bookId: string): Promise<boolean> => {
    try {
      const token = await getAccessToken();

      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          await readError(response, "Unable to delete the book.")
        );
      }

      setMyBooks((current) =>
        current.filter((book) => book.id !== bookId)
      );

      toast.success("Book deleted successfully.");

      return true;
    } catch (cause) {
      toast.error(
        cause instanceof Error ? cause.message : "Delete failed."
      );

      return false;
    }
  };

  const renderActions = (book: Book) => (
    <div className="flex items-center gap-2">
      <EditBookModal book={book} onSave={handleSave} />
      <DeleteBookModal book={book} onDelete={handleDelete} />
    </div>
  );

  if (isPending || loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 rounded-2xl border border-[#E5EBE6] bg-white text-sm text-[#64776D]">
        <Loader2 size={20} className="animate-spin" />
        Loading your books...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="rounded-2xl border border-[#E5EBE6] bg-white p-10 text-center">
        <p className="font-serif text-2xl font-bold text-[#07352C]">
          Sign in to see your books
        </p>

        <Link
          href="/login"
          className="mt-5 inline-flex rounded-lg bg-[#07352C] px-6 py-3 text-sm font-semibold text-white"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <AlertCircle size={30} className="mx-auto text-red-600" />

        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>

        <button
          type="button"
          onClick={() => void loadBooks()}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#07352C] px-5 py-3 text-sm font-semibold text-white"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-[#E5EBE6] bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E7F0E9]">
                <Icon size={21} className="text-[#07352C]" />
              </div>

              <span className="font-serif text-3xl font-bold text-[#DCE7DF]">
                {String(value).padStart(2, "0")}
              </span>
            </div>

            <h2 className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#829188]">
              {label}
            </h2>

            <p className="mt-2 font-serif text-3xl font-bold text-[#07352C]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5EBE6] bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-[#E5EBE6] p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#07352C]">
              Shared Bookshelf
            </h2>

            <p className="mt-2 text-sm text-[#64776D]">
              Showing {filteredBooks.length} of {myBooks.length} books you&apos;ve shared
            </p>
          </div>

          <div className="flex w-full items-center gap-3 lg:max-w-md">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, author, category..."
                aria-label="Search my books"
                className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-11 pr-10 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#829188] hover:text-[#07352C]"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadBooks()}
              title="Refresh books"
              aria-label="Refresh books"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E1E8E2] text-[#07352C] hover:bg-[#F8FAF7]"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-14 text-center">
            <BookOpen size={36} className="text-[#829D8C]" />

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#07352C]">
              {myBooks.length
                ? "No Books Found"
                : "Your Bookshelf Is Empty"}
            </h3>

            <p className="mt-3 max-w-sm text-center text-sm leading-7 text-[#64776D]">
              {myBooks.length
                ? "Try a different search term."
                : "Books you add to BookNook will appear here."}
            </p>

            {myBooks.length === 0 ? (
              <Link
                href="/add-book"
                className="mt-5 rounded-lg bg-[#07352C] px-6 py-3 text-xs font-semibold text-white"
              >
                Add Your First Book
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-lg bg-[#07352C] px-6 py-3 text-xs font-semibold text-white"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#F2F5F1]">
                  <tr className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64776D]">
                    <th className="px-6 py-5">Book Details</th>
                    <th className="px-5 py-5">Category</th>
                    <th className="px-5 py-5">Total</th>
                    <th className="px-5 py-5">Available</th>
                    <th className="px-5 py-5">Date Added</th>
                    <th className="px-5 py-5">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E9EEEA]">
                  {filteredBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="transition-colors hover:bg-[#FAFBF9]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <BookCover book={book} />

                          <div className="min-w-0">
                            <Link
                              href={`/books/${book.id}`}
                              className="font-serif text-base font-bold text-[#07352C] hover:text-[#A34D32]"
                            >
                              {book.title}
                            </Link>

                            <p className="mt-1 text-xs text-[#829188]">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-full bg-[#EAF0EA] px-3 py-1.5 text-xs font-medium text-[#426957]">
                          {book.category}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm font-semibold text-[#07352C]">
                        {book.totalCopies}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                            book.availableCopies > 0
                              ? "bg-[#E4F2E9] text-[#167454]"
                              : "bg-[#FBE9E4] text-[#BF654C]"
                          }`}
                        >
                          {book.availableCopies > 0
                            ? `${book.availableCopies} Available`
                            : "Lent Out"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-xs text-[#64776D]">
                        {formatDate(book.createdAt)}
                      </td>

                      <td className="px-5 py-5">
                        {renderActions(book)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#E9EEEA] md:hidden">
              {filteredBooks.map((book) => (
                <article key={book.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <BookCover book={book} />

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/books/${book.id}`}
                        className="font-serif text-lg font-bold text-[#07352C]"
                      >
                        {book.title}
                      </Link>

                      <p className="mt-1 text-sm text-[#64776D]">
                        {book.author}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-[#EAF0EA] px-3 py-1 text-xs text-[#426957]">
                        {book.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 rounded-lg bg-[#F8FAF7] p-4">
                    <div>
                      <p className="text-[10px] text-[#829188]">
                        Total
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#07352C]">
                        {book.totalCopies}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#829188]">
                        Available
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#07352C]">
                        {book.availableCopies}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#829188]">
                        Added
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[#07352C]">
                        {formatDate(book.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      href={`/books/${book.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#A34D32]"
                    >
                      View Book
                      <ArrowUpRight size={14} />
                    </Link>

                    {renderActions(book)}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="border-t border-[#E5EBE6] bg-[#FAFBF9] px-6 py-4">
          <p className="text-xs text-[#829188]">
            Your book updates are saved directly to the BookNook library.
          </p>
        </div>
      </div>
    </div>
  );
}
