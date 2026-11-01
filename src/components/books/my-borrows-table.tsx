"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  LibraryBig,
  Loader2,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import ReturnBookModal, { type BorrowItem } from "@/components/books/return-book-modal";

const API_URL =
  process.env.NEXT_PUBLIC_BOOKNOOK_API_URL || "http://localhost:5000";

type ApiBorrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
  actualReturnDate?: string;
  createdAt?: string;
};

type BookReference = {
  _id: string;
  author: string;
};

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day || month > 12 || month < 1 || day < 1 || day > 31) {
    return date;
  }

  return `${months[month - 1]} ${day}, ${year}`;
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

function BorrowedBookCover({ borrow }: { borrow: BorrowItem }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md border border-[#E5EBE6] bg-[#EEF3EF]">
      {imageError || !borrow.bookImage ? (
        <div className="flex h-full items-center justify-center">
          <BookOpen size={23} className="text-[#829D8C]" />
        </div>
      ) : (
        <Image
          src={borrow.bookImage}
          alt={`${borrow.bookTitle} cover`}
          fill
          sizes="56px"
          className="object-contain"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}

function BorrowStatus({ status }: { status: BorrowItem["status"] }) {
  const isActive = status === "borrowed";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
        isActive
          ? "bg-[#E4F2E9] text-[#167454]"
          : "bg-[#EDF0F0] text-[#64776D]"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-[#167454]" : "bg-[#829188]"
        }`}
      />
      {isActive ? "On Loan" : "Returned"}
    </span>
  );
}

export default function MyBorrowsTable() {
  const [myBorrows, setMyBorrows] = useState<BorrowItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBorrows = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = await getAccessToken();

      const [borrowsResponse, booksResponse] = await Promise.all([
        fetch(`${API_URL}/borrows`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }),
        fetch(`${API_URL}/books`, { cache: "no-store" }),
      ]);

      if (!borrowsResponse.ok) {
        throw new Error(
          borrowsResponse.status === 401
            ? "Your session has expired. Please sign in again."
            : "Unable to load your borrowed books. Please try again."
        );
      }

      const borrowsData: unknown = await borrowsResponse.json();
      const booksData: unknown = booksResponse.ok
        ? await booksResponse.json()
        : [];

      if (!Array.isArray(borrowsData)) {
        throw new Error("The server returned invalid borrowing data.");
      }

      const authors = new Map<string, string>();

      if (Array.isArray(booksData)) {
        for (const item of booksData as BookReference[]) {
          if (typeof item?._id === "string" && typeof item.author === "string") {
            authors.set(item._id, item.author);
          }
        }
      }

      const records: BorrowItem[] = (borrowsData as ApiBorrow[]).map((borrow) => ({
        id: borrow._id,
        bookId: borrow.bookId,
        bookTitle: borrow.bookTitle,
        bookAuthor: authors.get(borrow.bookId) || "BookNook Collection",
        bookImage: borrow.bookImage,
        userEmail: borrow.userEmail,
        borrowDate: borrow.borrowDate,
        returnDate: borrow.returnDate,
        status: borrow.status,
        actualReturnDate: borrow.actualReturnDate,
      }));

      setMyBorrows(records);
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Unable to load your borrowed books.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBorrows();
  }, [loadBorrows]);

  const activeBorrows = useMemo(
    () => myBorrows.filter((borrow) => borrow.status === "borrowed"),
    [myBorrows]
  );

  const sortedBorrows = useMemo(
    () =>
      [...myBorrows].sort((a, b) => {
        if (a.status !== b.status) return a.status === "borrowed" ? -1 : 1;
        return a.status === "borrowed"
          ? a.returnDate.localeCompare(b.returnDate)
          : b.borrowDate.localeCompare(a.borrowDate);
      }),
    [myBorrows]
  );

  const filteredBorrows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sortedBorrows.filter(
      (borrow) =>
        borrow.bookTitle.toLowerCase().includes(term) ||
        borrow.bookAuthor.toLowerCase().includes(term)
    );
  }, [search, sortedBorrows]);

  const uniqueTitles = new Set(activeBorrows.map((borrow) => borrow.bookId)).size;
  const nextReturn = [...activeBorrows].sort((a, b) =>
    a.returnDate.localeCompare(b.returnDate)
  )[0]?.returnDate;

  const stats = [
    {
      title: "Active Borrows",
      value: String(activeBorrows.length).padStart(2, "0"),
      icon: BookOpen,
    },
    {
      title: "Unique Titles",
      value: String(uniqueTitles).padStart(2, "0"),
      icon: LibraryBig,
    },
    {
      title: "Next Return",
      value: nextReturn ? formatDate(nextReturn).split(",")[0] : "—",
      icon: CalendarDays,
    },
  ];

  const handleReturn = async (borrowId: string): Promise<boolean> => {
    try {
      const token = await getAccessToken();
      const response = await fetch(`${API_URL}/borrows/${borrowId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to return the book.");
      }

      setMyBorrows((records) =>
        records.map((borrow) =>
          borrow.id === borrowId
            ? {
                ...borrow,
                status: "returned" as const,
                actualReturnDate: new Date().toISOString().slice(0, 10),
              }
            : borrow
        )
      );

      toast.success("Book returned successfully.");
      return true;
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "Unable to return the book.");
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-[#E5EBE6] bg-white px-6 py-16 text-center">
        <Loader2 size={32} className="animate-spin text-[#A34D32]" />
        <p className="text-sm text-[#64776D]">Loading your reading journey...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-[#E5EBE6] bg-white px-6 py-16 text-center">
        <AlertCircle size={30} className="text-[#A34D32]" />
        <h2 className="font-serif text-2xl font-bold text-[#07352C]">
          Could Not Load Your Borrows
        </h2>
        <p role="alert" className="max-w-md text-sm leading-7 text-[#64776D]">{error}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => void loadBorrows()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#07352C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#145244]"
          >
            <RefreshCw size={16} /> Try Again
          </button>
          {error.toLowerCase().includes("sign in") && (
            <Link href="/login" className="text-sm font-semibold text-[#A34D32] hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-xl border border-[#E5EBE6] bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7F0E9]">
                <Icon size={23} className="text-[#07352C]" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#829188]">
                {stat.title}
              </p>
              <h2 className="font-serif mt-3 text-4xl font-bold text-[#07352C]">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5EBE6] bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-[#E5EBE6] p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#07352C]">
              My Reading List
            </h2>
            <p className="mt-2 text-sm text-[#64776D]">
              Showing {filteredBorrows.length} of {myBorrows.length} borrowing records
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search borrowed books..."
              aria-label="Search borrowed books"
              className="h-12 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-11 pr-11 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#829188] hover:text-[#07352C]"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {filteredBorrows.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F0E9]">
              <BookOpen size={30} className="text-[#07352C]" />
            </div>
            <h3 className="font-serif mt-5 text-2xl font-bold text-[#07352C]">
              {myBorrows.length === 0 ? "Your Reading List Is Clear" : "No Matching Books"}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-[#64776D]">
              {myBorrows.length === 0
                ? "You have no borrowed books yet. Explore the collection and discover your next favorite story."
                : "Try searching with another book title or author."}
            </p>
            {myBorrows.length === 0 ? (
              <Link
                href="/books"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#07352C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
              >
                Explore Books <ArrowUpRight size={16} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 rounded-lg bg-[#07352C] px-6 py-3 text-sm font-semibold text-white"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-[#F2F5F1]">
                  <tr className="text-[11px] font-bold uppercase tracking-widest text-[#64776D]">
                    <th className="px-6 py-5">Book Details</th>
                    <th className="px-5 py-5">Borrow Date</th>
                    <th className="px-5 py-5">Return Date</th>
                    <th className="px-5 py-5">Status</th>
                    <th className="px-5 py-5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9EEEA]">
                  {filteredBorrows.map((borrow) => (
                    <tr key={borrow.id} className="transition-colors hover:bg-[#FAFBF9]">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <BorrowedBookCover borrow={borrow} />
                          <div className="min-w-0">
                            <Link
                              href={`/books/${borrow.bookId}`}
                              className="font-serif text-base font-bold text-[#07352C] hover:text-[#A34D32]"
                            >
                              {borrow.bookTitle}
                            </Link>
                            <p className="mt-1 text-xs text-[#829188]">
                              {borrow.bookAuthor}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-[#64776D]">
                        <time dateTime={borrow.borrowDate}>{formatDate(borrow.borrowDate)}</time>
                      </td>
                      <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-[#07352C]">
                        <time dateTime={borrow.status === "returned" && borrow.actualReturnDate ? borrow.actualReturnDate : borrow.returnDate}>
                          {formatDate(borrow.status === "returned" && borrow.actualReturnDate ? borrow.actualReturnDate : borrow.returnDate)}
                        </time>
                        {borrow.status === "returned" && borrow.actualReturnDate && (
                          <p className="mt-1 text-xs font-normal text-[#829188]">Returned on</p>
                        )}
                      </td>
                      <td className="px-5 py-5"><BorrowStatus status={borrow.status} /></td>
                      <td className="px-5 py-5">
                        {borrow.status === "borrowed" ? (
                          <ReturnBookModal borrow={borrow} onReturn={handleReturn} />
                        ) : (
                          <span className="text-xs font-medium text-[#829188]">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#E9EEEA] md:hidden">
              {filteredBorrows.map((borrow) => (
                <article key={borrow.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <BorrowedBookCover borrow={borrow} />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/books/${borrow.bookId}`}
                        className="font-serif text-lg font-bold text-[#07352C]"
                      >
                        {borrow.bookTitle}
                      </Link>
                      <p className="mt-1 text-sm text-[#64776D]">{borrow.bookAuthor}</p>
                      <div className="mt-3"><BorrowStatus status={borrow.status} /></div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-[#F8FAF7] p-4">
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#829188]">
                        <Clock3 size={13} /> Borrowed
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#07352C]">
                        {formatDate(borrow.borrowDate)}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#829188]">
                        <CalendarDays size={13} /> {borrow.status === "returned" ? "Returned" : "Return By"}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#07352C]">
                        {formatDate(borrow.status === "returned" && borrow.actualReturnDate ? borrow.actualReturnDate : borrow.returnDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      href={`/books/${borrow.bookId}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#A34D32]"
                    >
                      View Book <ArrowUpRight size={14} />
                    </Link>
                    {borrow.status === "borrowed" ? (
                      <ReturnBookModal borrow={borrow} onReturn={handleReturn} />
                    ) : (
                      <span className="text-xs font-medium text-[#829188]">Completed</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="border-t border-[#E5EBE6] bg-[#FAFBF9] px-6 py-4">
          <p className="text-xs leading-6 text-[#829188]">
            Your borrowing records are loaded from MongoDB. Returning a book restores an available copy and keeps a record in your reading history.
          </p>
        </div>
      </div>
    </div>
  );
}
