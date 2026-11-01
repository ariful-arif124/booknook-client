import type { Book } from "@/data/books";

export type ApiBook = {
  _id: string;
  title: string;
  author: string;
  category: "Fiction" | "Science" | "History" | "Kids" | "Others";
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedById?: string;
  addedByName?: string;
  addedByEmail?: string | null;
  dateAdded?: string;
  createdAt: string;
  seedKey?: string;
};

const API_URL =
  process.env.BOOKNOOK_API_URL || "http://localhost:5000";

export async function getBooks(): Promise<ApiBook[]> {
  const response = await fetch(`${API_URL}/books`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books from BookNook API.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid books API response.");
  }

  return data as ApiBook[];
}

export async function getBookById(id: string): Promise<ApiBook | null> {
  if (/^\d+$/.test(id)) {
    const books = await getBooks();

    return (
      books.find((book) => book.seedKey === `frontend:${id}`) ?? null
    );
  }

  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    return null;
  }

  const response = await fetch(`${API_URL}/books/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch book details from BookNook API.");
  }

  return (await response.json()) as ApiBook;
}

export function toBook(book: ApiBook): Book {
  return {
    id: book._id,
    title: book.title,
    author: book.author,
    category: book.category,
    image: book.image,
    description: book.description,
    totalCopies: book.totalCopies,
    availableCopies: book.availableCopies,
    createdAt: book.createdAt,
    addedByName: book.addedByName ?? "BookNook Library",
  };
}

export async function getExplorerBooks(): Promise<Book[]> {
  const books = await getBooks();
  return books.map(toBook);
}
