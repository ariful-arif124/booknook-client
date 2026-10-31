
export type Book = {
  id: string;
  title: string;
  author: string;
  category: "Fiction" | "Science" | "History" | "Kids" | "Others";
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  addedByName?: string;
};

export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image: "https://images.thenile.io/r1000/9780241341469.jpg",
    description:
      "A timeless novel about love, ambition, wealth, and the pursuit of the American Dream in the dazzling Jazz Age.",
    totalCopies: 5,
    availableCopies: 3,
    createdAt: "2026-10-20",
  },
  {
    id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image:
      "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    description:
      "Explore the mysteries of space, time, black holes, and the origin of our universe through fascinating scientific ideas.",
    totalCopies: 4,
    availableCopies: 2,
    createdAt: "2026-10-19",
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image:
      "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    description:
      "A fascinating journey through the history of humankind, from early human societies to the modern world.",
    totalCopies: 6,
    availableCopies: 5,
    createdAt: "2026-10-18",
  },
  {
    id: "4",
    title: "Charlotte's Web",
    author: "E. B. White",
    category: "Kids",
    image:
      "https://covers.openlibrary.org/b/isbn/9780064400558-L.jpg",
    description:
      "A heartwarming children's classic about friendship, kindness, and the extraordinary bond between a pig and a spider.",
    totalCopies: 5,
    availableCopies: 4,
    createdAt: "2026-10-17",
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    image:
      "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    description:
      "A beloved literary classic exploring romance, family, social expectations, and personal growth in Georgian England.",
    totalCopies: 4,
    availableCopies: 1,
    createdAt: "2026-10-16",
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image:
      "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description:
      "A practical guide to building good habits, breaking bad ones, and making remarkable improvements through small daily actions.",
    totalCopies: 3,
    availableCopies: 2,
    createdAt: "2026-10-15",
  },
  {
    id: "7",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    category: "Fiction",
    image:
      "https://images.randomhouse.com/cover/9780385534635",
    description:
      "A magical tale of an extraordinary circus, mysterious competition, and two young illusionists whose destinies become intertwined.",
    totalCopies: 5,
    availableCopies: 4,
    createdAt: "2026-10-26",
  },
  {
    id: "8",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Kids",
    image:
      "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    description:
      "A poetic and imaginative adventure about friendship, love, childhood, and discovering what truly matters in life.",
    totalCopies: 6,
    availableCopies: 5,
    createdAt: "2026-10-27",
  },
  {
    id: "9",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    image:
      "https://images.randomhouse.com/cover/9780525559474",
    description:
      "Between life and death lies a mysterious library where every book reveals a different version of the life you could have lived.",
    totalCopies: 4,
    availableCopies: 3,
    createdAt: "2026-10-28",
  },
  {
    id: "10",
    title: "The Hidden Life of Trees",
    author: "Peter Wohlleben",
    category: "Science",
    image:
      "https://covers.openlibrary.org/b/isbn/9781771642484-L.jpg",
    description:
      "Discover the remarkable science of forests and how trees communicate, cooperate, and survive in interconnected ecosystems.",
    totalCopies: 4,
    availableCopies: 2,
    createdAt: "2026-10-29",
  },
  {
    id: "11",
    title: "The Silk Roads",
    author: "Peter Frankopan",
    category: "History",
    image:
      "https://images.randomhouse.com/cover/9781101912379",
    description:
      "A sweeping history of civilizations, trade, cultural exchange, and the powerful connections that shaped the world.",
    totalCopies: 5,
    availableCopies: 3,
    createdAt: "2026-10-30",
  },
  {
    id: "12",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Others",
    image:
      "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    description:
      "Explore the psychology behind wealth, financial decisions, human behavior, and the timeless lessons of managing money.",
    totalCopies: 3,
    availableCopies: 0,
    createdAt: "2026-10-31",
  },
];
