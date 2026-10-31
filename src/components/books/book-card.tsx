
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Book } from "@/data/books";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const isAvailable = book.availableCopies > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E5EBE6] bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#07352C]/10">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F0F3EF]">
        {imageError ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <BookOpen
              size={56}
              strokeWidth={1.2}
              className="text-[#8BA498]"
            />
            <span className="font-serif text-lg font-semibold text-[#07352C]">
              BookNook
            </span>
            <span className="text-xs text-[#7A9083]">
              Cover unavailable
            </span>
          </div>
        ) : (
          <Image
            src={book.image}
            alt={`${book.title} book cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A34D32] shadow-sm">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? "bg-[#29946C]" : "bg-[#D26B4D]"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              isAvailable
                ? "text-[#56796D]"
                : "text-[#C05D43]"
            }`}
          >
            {isAvailable
              ? `${book.availableCopies} ${
                  book.availableCopies === 1 ? "copy" : "copies"
                } available`
              : "Not Available"}
          </span>
        </div>

        <h3 className="font-serif line-clamp-2 text-xl font-bold leading-snug text-[#07352C]">
          {book.title}
        </h3>

        <p className="mt-2 text-sm text-[#66776E]">
          {book.author}
        </p>

        <p className="mt-4 line-clamp-2 text-xs leading-6 text-[#7C8C82]">
          {book.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E7ECE7] pt-5">
          <span className="text-xs font-medium text-[#8B998F]">
            {book.category}
          </span>

          <Link
            href={`/books/${book.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-[#07352C] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#A34D32]"
          >
            View Details
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
