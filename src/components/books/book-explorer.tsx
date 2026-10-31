
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  BookOpen,
  RotateCcw,
  SlidersHorizontal,
  ArrowDownWideNarrow,
} from "lucide-react";

import BookCard from "@/components/books/book-card";
import type { Book } from "@/data/books";

type BookExplorerProps = {
  books: Book[];
};

type SortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "copies-high"
  | "copies-low";

const categories = [
  "All Categories",
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function BookExplorer({
  books,
}: BookExplorerProps) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [availableOnly, setAvailableOnly] = useState(false);

  const categoryParam = searchParams.get("category");

  const activeCategory =
    categoryParam && categories.includes(categoryParam)
      ? categoryParam
      : "All Categories";

  const searchText = search.trim().toLowerCase();

  const filteredBooks = books
    .filter((book) => {
      const matchesCategory =
        activeCategory === "All Categories" ||
        book.category === activeCategory;

      const matchesSearch =
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText) ||
        book.category.toLowerCase().includes(searchText) ||
        book.description.toLowerCase().includes(searchText);

      const matchesAvailability =
        !availableOnly || book.availableCopies > 0;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesAvailability
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);

        case "title-desc":
          return b.title.localeCompare(a.title);

        case "copies-high":
          return b.availableCopies - a.availableCopies;

        case "copies-low":
          return a.availableCopies - b.availableCopies;

        default:
          return 0;
      }
    });

  const hasActiveFilters =
    search.length > 0 ||
    activeCategory !== "All Categories" ||
    sort !== "default" ||
    availableOnly;

  const resetFilters = () => {
    setSearch("");
    setSort("default");
    setAvailableOnly(false);
  };

  return (
    <div>
      <div className="rounded-2xl border border-[#E5EBE6] bg-white p-5 sm:p-7">
        <div className="relative">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#799187]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, author, or keyword..."
            aria-label="Search books"
            className="h-14 w-full rounded-lg border border-[#E5EBE6] bg-[#F7F9F6] pl-12 pr-12 text-sm text-[#07352C] outline-none transition-all placeholder:text-[#91A097] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#64776D] hover:bg-[#E5EBE6]"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              const href =
                category === "All Categories"
                  ? "/books"
                  : `/books?category=${encodeURIComponent(category)}`;

              return (
                <Link
                  key={category}
                  href={href}
                  scroll={false}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#07352C] text-white shadow-sm"
                      : "border border-[#E5EBE6] bg-[#F6F8F5] text-[#61736A] hover:border-[#C9D8CE] hover:bg-[#E9F0EA] hover:text-[#07352C]"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label
              htmlFor="book-sort"
              className="flex items-center gap-2 text-sm font-medium text-[#64776D]"
            >
              <ArrowDownWideNarrow
                size={17}
                className="text-[#A34D32]"
              />
              Sort
            </label>

            <select
              id="book-sort"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              className="h-11 min-w-[185px] rounded-lg border border-[#E5EBE6] bg-[#F7F9F6] px-3 text-sm font-medium text-[#07352C] outline-none focus:border-[#A34D32]"
            >
              <option value="default">Default Order</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
              <option value="copies-high">
                Most Copies Available
              </option>
              <option value="copies-low">
                Fewest Copies Available
              </option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E9EEEA] pt-5">
          <div className="flex items-center gap-3">
            <SlidersHorizontal
              size={17}
              className="text-[#A34D32]"
            />

            <span className="text-sm font-medium text-[#07352C]">
              Available Only
            </span>

            <button
              type="button"
              role="switch"
              aria-label="Show available books only"
              aria-checked={availableOnly}
              onClick={() =>
                setAvailableOnly((previous) => !previous)
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                availableOnly
                  ? "bg-[#07352C]"
                  : "bg-[#CBD5CE]"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  availableOnly ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {hasActiveFilters && (
            <Link
              href="/books"
              scroll={false}
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E5EBE6] bg-[#F7F9F6] px-4 py-2.5 text-xs font-semibold text-[#07352C] transition-colors hover:bg-[#E9F0EA]"
            >
              <RotateCcw size={15} />
              Reset Filters
            </Link>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#07352C]">
            Our Book Collection
          </h2>

          <p className="mt-2 text-sm text-[#64776D]">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A34D32]">
          {activeCategory === "All Categories"
            ? "Discover Your Next Read"
            : activeCategory}
        </span>
      </div>

      <div className="mt-8">
        {filteredBooks.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-[#E5EBE6] bg-white px-6 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF0E9]">
              <BookOpen
                size={36}
                strokeWidth={1.4}
                className="text-[#628575]"
              />
            </div>

            <h3 className="font-serif mt-6 text-2xl font-bold text-[#07352C]">
              No Books Found
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-7 text-[#64776D]">
              No books match your current filters.
              Try another category or search term.
            </p>

            <Link
              href="/books"
              scroll={false}
              onClick={resetFilters}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#07352C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#A34D32]"
            >
              <RotateCcw size={16} />
              Clear All Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
