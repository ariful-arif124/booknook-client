
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LibraryBig,
  Search,
  X,
} from "lucide-react";

import ReturnBookModal from "@/components/books/return-book-modal";
import type { Borrow } from "@/data/borrows";

type Props = {
  borrows: Borrow[];
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (
    !year ||
    !month ||
    !day ||
    month > 12 ||
    month < 1 ||
    day < 1 ||
    day > 31
  ) {
    return date;
  }

  return `${months[month - 1]} ${day}, ${year}`;
}

function BorrowedBookCover({
  borrow,
}: {
  borrow: Borrow;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md border border-[#E5EBE6] bg-[#EEF3EF]">
      {imageError ? (
        <div className="flex h-full items-center justify-center">
          <BookOpen
            size={23}
            className="text-[#829D8C]"
          />
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

export default function MyBorrowsTable({
  borrows,
}: Props) {
  const [myBorrows, setMyBorrows] =
    useState<Borrow[]>(borrows);

  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState<
    string | null
  >(null);

  const activeBorrows = [...myBorrows].sort((a, b) =>
    a.returnDate.localeCompare(b.returnDate)
  );

  const uniqueTitles = new Set(
    activeBorrows.map((borrow) => borrow.bookId)
  ).size;

  const nextReturn = activeBorrows[0]?.returnDate;

  const filteredBorrows = activeBorrows.filter((borrow) => {
    const term = search.trim().toLowerCase();

    return (
      borrow.bookTitle.toLowerCase().includes(term) ||
      borrow.bookAuthor.toLowerCase().includes(term)
    );
  });

  const stats = [
    {
      title: "Active Borrows",
      value: String(activeBorrows.length).padStart(
        2,
        "0"
      ),
      icon: BookOpen,
    },
    {
      title: "Unique Titles",
      value: String(uniqueTitles).padStart(2, "0"),
      icon: LibraryBig,
    },
    {
      title: "Next Return",
      value: nextReturn
        ? formatDate(nextReturn).split(",")[0]
        : "—",
      icon: CalendarDays,
    },
  ];

  const handleReturn = (borrowId: string) => {
    const borrowedBook = myBorrows.find(
      (borrow) => borrow.id === borrowId
    );

    if (!borrowedBook) return;

    setMyBorrows((currentBorrows) =>
      currentBorrows.filter(
        (borrow) => borrow.id !== borrowId
      )
    );

    setNotification(
      `"${borrowedBook.bookTitle}" has been returned in the demo preview.`
    );
  };

  return (
    <div>
      {notification && (
        <div
          role="status"
          className="fixed right-5 top-24 z-50 flex w-[calc(100%-2.5rem)] max-w-sm items-start gap-3 rounded-xl border border-[#CDE2D2] bg-white p-4 shadow-xl"
        >
          <CheckCircle2
            size={22}
            className="shrink-0 text-[#167454]"
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#07352C]">
              Book Returned Successfully
            </p>

            <p className="mt-1 text-xs leading-6 text-[#64776D]">
              {notification}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="Dismiss notification"
            className="shrink-0 text-[#829188] transition-colors hover:text-[#07352C]"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-[#E5EBE6] bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7F0E9]">
                <Icon
                  size={23}
                  className="text-[#07352C]"
                />
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
              Showing {filteredBorrows.length} of{" "}
              {activeBorrows.length} borrowed books
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829188]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
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
              <BookOpen
                size={30}
                className="text-[#07352C]"
              />
            </div>

            <h3 className="font-serif mt-5 text-2xl font-bold text-[#07352C]">
              {activeBorrows.length === 0
                ? "Your Reading List Is Clear"
                : "No Matching Books"}
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-[#64776D]">
              {activeBorrows.length === 0
                ? "You have no active borrowed books. Explore the collection and discover your next favorite story."
                : "Try searching with another book title or author."}
            </p>

            {activeBorrows.length === 0 ? (
              <Link
                href="/books"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#07352C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
              >
                Explore Books
                <ArrowUpRight size={16} />
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
                    <th className="px-6 py-5">
                      Book Details
                    </th>

                    <th className="px-5 py-5">
                      Borrow Date
                    </th>

                    <th className="px-5 py-5">
                      Return Date
                    </th>

                    <th className="px-5 py-5">
                      Status
                    </th>

                    <th className="px-5 py-5">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E9EEEA]">
                  {filteredBorrows.map((borrow) => (
                    <tr
                      key={borrow.id}
                      className="transition-colors hover:bg-[#FAFBF9]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <BorrowedBookCover
                            borrow={borrow}
                          />

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
                        <time dateTime={borrow.borrowDate}>
                          {formatDate(borrow.borrowDate)}
                        </time>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-sm font-medium text-[#07352C]">
                        <time dateTime={borrow.returnDate}>
                          {formatDate(borrow.returnDate)}
                        </time>
                      </td>

                      <td className="px-5 py-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#E4F2E9] px-3 py-2 text-xs font-semibold text-[#167454]">
                          <span className="h-2 w-2 rounded-full bg-[#167454]" />
                          On Loan
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <ReturnBookModal
                          borrow={borrow}
                          onReturn={handleReturn}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#E9EEEA] md:hidden">
              {filteredBorrows.map((borrow) => (
                <article
                  key={borrow.id}
                  className="p-5"
                >
                  <div className="flex items-start gap-4">
                    <BorrowedBookCover borrow={borrow} />

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/books/${borrow.bookId}`}
                        className="font-serif text-lg font-bold text-[#07352C]"
                      >
                        {borrow.bookTitle}
                      </Link>

                      <p className="mt-1 text-sm text-[#64776D]">
                        {borrow.bookAuthor}
                      </p>

                      <span className="mt-3 inline-flex rounded-full bg-[#E4F2E9] px-3 py-1.5 text-xs font-semibold text-[#167454]">
                        On Loan
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-[#F8FAF7] p-4">
                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#829188]">
                        <Clock3 size={13} />
                        Borrowed
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#07352C]">
                        {formatDate(borrow.borrowDate)}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-1 text-xs text-[#829188]">
                        <CalendarDays size={13} />
                        Return By
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#07352C]">
                        {formatDate(borrow.returnDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      href={`/books/${borrow.bookId}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#A34D32]"
                    >
                      View Book
                      <ArrowUpRight size={14} />
                    </Link>

                    <ReturnBookModal
                      borrow={borrow}
                      onReturn={handleReturn}
                    />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="border-t border-[#E5EBE6] bg-[#FAFBF9] px-6 py-4">
          <p className="text-xs leading-6 text-[#829188]">
            Returns update this frontend preview only.
            Database persistence and book inventory updates
            will be connected during backend integration.
          </p>
        </div>
      </div>
    </div>
  );
}
