
export type Book = {
  id: string;
  title: string;
  author: string;
  category: "Fiction" | "Science" | "History" | "Kids" | "Others";
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
};

export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image:
      "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    description:
      "A timeless story of love, ambition, and the American Dream.",
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image:
      "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    description:
      "Explore the mysteries of the universe, time, and black holes.",
    totalCopies: 4,
    availableCopies: 2,
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image:
      "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    description:
      "Discover the fascinating history of humankind and civilization.",
    totalCopies: 6,
    availableCopies: 5,
  },
  {
    id: "4",
    title: "Charlotte's Web",
    author: "E. B. White",
    category: "Kids",
    image:
      "https://covers.openlibrary.org/b/isbn/9780064400558-L.jpg",
    description:
      "A beautiful story about friendship, kindness, and loyalty.",
    totalCopies: 5,
    availableCopies: 4,
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    image:
      "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    description:
      "A classic novel about love, society, and personal growth.",
    totalCopies: 4,
    availableCopies: 1,
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image:
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description:
      "Learn how small daily habits can create remarkable changes.",
    totalCopies: 3,
    availableCopies: 2,
  },
];
