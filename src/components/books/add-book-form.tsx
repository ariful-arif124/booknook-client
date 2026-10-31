
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Upload,
  UserRound,
  Mail,
  Info,
  CheckCircle2,
} from "lucide-react";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("1");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !title.trim() ||
      !author.trim() ||
      !category ||
      !description.trim() ||
      !image
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      !Number.isInteger(Number(totalCopies)) ||
      Number(totalCopies) < 1
    ) {
      setError("Total copies must be a positive whole number.");
      return;
    }

    if (!image.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setMessage(
      "Your book information is valid. Database submission will be enabled after authentication and backend integration."
    );
  };

  return (
    <section className="min-h-screen bg-[#F8FAF7] px-5 py-14 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64776D] hover:text-[#A34D32]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mt-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F3EAE3] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#A34D32]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A34D32]">
              Community Book Bank
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold text-[#07352C] sm:text-5xl">
            Share a Book With the Community.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#64776D]">
            Every book deserves a reader. Add a title from
            your collection and help someone discover
            their next favorite story.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
          <div className="rounded-2xl border border-[#E5EBE6] bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-9 flex items-center gap-4 border-b border-[#E5EBE6] pb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E5F0E9]">
                <BookOpen
                  size={27}
                  className="text-[#07352C]"
                />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-[#07352C]">
                  Book Information
                </h2>

                <p className="mt-2 text-sm text-[#64776D]">
                  Fill in the details of your book.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-title"
                    className="mb-2 block text-sm font-semibold text-[#07352C]"
                  >
                    Book Title *
                  </label>

                  <input
                    id="book-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="book-author"
                    className="mb-2 block text-sm font-semibold text-[#07352C]"
                  >
                    Author Name *
                  </label>

                  <input
                    id="book-author"
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32]"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-category"
                    className="mb-2 block text-sm font-semibold text-[#07352C]"
                  >
                    Category *
                  </label>

                  <select
                    id="book-category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none focus:border-[#A34D32]"
                  >
                    <option value="">Select category</option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="book-copies"
                    className="mb-2 block text-sm font-semibold text-[#07352C]"
                  >
                    Total Copies *
                  </label>

                  <input
                    id="book-copies"
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={totalCopies}
                    onChange={(e) => setTotalCopies(e.target.value)}
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none focus:border-[#A34D32]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="book-image"
                  className="mb-2 block text-sm font-semibold text-[#07352C]"
                >
                  Book Cover Image *
                </label>

                <div className="rounded-xl border-2 border-dashed border-[#D3DFD5] bg-[#F8FAF7] p-7 text-center">
                  <Upload
                    size={30}
                    className="mx-auto text-[#A34D32]"
                  />

                  <p className="mt-3 text-sm font-semibold text-[#07352C]">
                    Upload a Book Cover
                  </p>

                  <p className="mt-2 text-xs text-[#829188]">
                    Choose an image from your device
                  </p>

                  <input
                    id="book-image"
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      setImage(e.target.files?.[0] ?? null);
                      setMessage("");
                      setError("");
                    }}
                    className="mt-5 block w-full cursor-pointer text-xs text-[#64776D] file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#07352C] file:px-4 file:py-3 file:font-semibold file:text-white"
                  />

                  {image && (
                    <p className="mt-4 text-xs font-medium text-[#167454]">
                      Selected: {image.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="book-description"
                  className="mb-2 block text-sm font-semibold text-[#07352C]"
                >
                  Short Description *
                </label>

                <textarea
                  id="book-description"
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description about this book..."
                  className="w-full resize-y rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] p-4 text-sm leading-7 text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32]"
                />
              </div>

              <div className="border-t border-[#E5EBE6] pt-8">
                <h3 className="font-serif text-xl font-bold text-[#07352C]">
                  Contributor Information
                </h3>

                <p className="mt-2 text-sm text-[#64776D]">
                  These fields will be filled automatically
                  from your logged-in account.
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contributor-name"
                      className="mb-2 block text-sm font-semibold text-[#07352C]"
                    >
                      User Name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                      />

                      <input
                        id="contributor-name"
                        type="text"
                        readOnly
                        placeholder="Available after login"
                        className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#EDF2ED] pl-12 pr-4 text-sm text-[#64776D] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contributor-email"
                      className="mb-2 block text-sm font-semibold text-[#07352C]"
                    >
                      User Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                      />

                      <input
                        id="contributor-email"
                        type="email"
                        readOnly
                        placeholder="Available after login"
                        className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#EDF2ED] pl-12 pr-4 text-sm text-[#64776D] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {message && (
                <div
                  role="status"
                  className="rounded-lg border border-[#D5E7D9] bg-[#F1F6F1] p-4 text-sm leading-6 text-[#52685B]"
                >
                  {message}
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-[#E5EBE6] pt-7 sm:flex-row sm:justify-end">
                <Link
                  href="/books"
                  className="inline-flex h-13 items-center justify-center rounded-lg border border-[#E1E8E2] px-7 text-sm font-semibold text-[#07352C] hover:bg-[#F1F5F1]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#07352C] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
                >
                  <BookOpen size={18} />
                  Add Book
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#07352C] p-8 text-white">
              <BookOpen
                size={34}
                className="text-[#E7C98D]"
              />

              <h2 className="font-serif mt-6 text-3xl font-bold">
                A Story Worth Sharing.
              </h2>

              <p className="mt-5 text-sm leading-8 text-[#C4D9CE]">
                Your contribution could help another reader
                discover a new world. Every shared book
                makes our community a little richer.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/15 pt-7">
                {[
                  "Share your favorite stories",
                  "Help the reading community",
                  "Build a growing collection",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#D8E8DF]"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#E7C98D]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EBE6] bg-white p-7">
              <div className="flex items-center gap-3">
                <Info
                  size={22}
                  className="text-[#A34D32]"
                />

                <h3 className="font-serif text-xl font-bold text-[#07352C]">
                  Before You Submit
                </h3>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#64776D]">
                Make sure the book information is accurate,
                the cover image is clear, and the number
                of copies reflects what you want to share.
              </p>

              <p className="mt-5 text-xs leading-6 text-[#829188]">
                Account authentication and database saving
                will be connected in a later step.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
