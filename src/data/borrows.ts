
import { books } from "@/data/books";

export type Borrow = {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

const sampleBorrowRecords = [
  {
    id: "borrow-1",
    bookId: "9",
    borrowDate: "2026-10-27",
    returnDate: "2026-11-10",
  },
  {
    id: "borrow-2",
    bookId: "3",
    borrowDate: "2026-10-29",
    returnDate: "2026-11-12",
  },
  {
    id: "borrow-3",
    bookId: "8",
    borrowDate: "2026-10-30",
    returnDate: "2026-11-13",
  },
];

export const demoBorrows: Borrow[] = sampleBorrowRecords.map(
  (record) => {
    const book = books.find(
      (item) => item.id === record.bookId
    );

    if (!book) {
      throw new Error(`Book ${record.bookId} not found`);
    }

    return {
      ...record,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookImage: book.image,
      userEmail: "demo@example.com",
    };
  }
);
