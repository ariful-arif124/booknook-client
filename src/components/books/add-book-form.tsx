"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Upload,
  UserRound,
  Mail,
  Info,
  CheckCircle2,
  Trash2,
  RefreshCw,
  FileImage,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const API_URL =
  process.env.NEXT_PUBLIC_BOOKNOOK_API_URL || "http://localhost:5000";

type UploadResponse = {
  success?: boolean;
  url?: string;
  message?: string;
};

type CreateBookResponse = {
  success?: boolean;
  message?: string;
  book?: {
    _id: string;
  };
};

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("1");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<"upload" | "save" | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const removeImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setImage(null);
    setPreviewUrl(null);
    setImageError("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    removeImage();

    if (!allowedImageTypes.includes(file.type)) {
      setImageError("Invalid image format. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size === 0 || file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be smaller than 5 MB and must not be empty.");
      return;
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImage(file);
    setPreviewUrl(url);
    setImageError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!session?.user) {
      setError("Please sign in before adding a book.");
      return;
    }

    if (
      !title.trim() ||
      title.trim().length > 200 ||
      !author.trim() ||
      author.trim().length > 150 ||
      !categories.includes(category) ||
      !description.trim() ||
      description.trim().length > 2000
    ) {
      setError("Please complete all required fields with valid book information.");
      return;
    }

    const copies = Number(totalCopies);

    if (
      !Number.isSafeInteger(copies) ||
      copies < 1 ||
      copies > 1000
    ) {
      setError("Total copies must be between 1 and 1000.");
      return;
    }

    if (
      !image ||
      !allowedImageTypes.includes(image.type) ||
      image.size < 1 ||
      image.size > MAX_IMAGE_SIZE
    ) {
      setError("Please select a valid JPG, PNG, or WEBP book cover under 5 MB.");
      return;
    }

    setIsSubmitting(true);

    try {
      const tokenResult = await authClient.token();

      if (tokenResult.error || !tokenResult.data?.token) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      setSubmitStage("upload");

      const uploadBody = new FormData();
      uploadBody.append("image", image);

      const uploadResponse = await fetch("/api/upload-book-image", {
        method: "POST",
        body: uploadBody,
        credentials: "include",
      });

      const uploadResult = (await uploadResponse.json()) as UploadResponse;

      if (!uploadResponse.ok || !uploadResult.url) {
        throw new Error(uploadResult.message || "Unable to upload book cover.");
      }

      setSubmitStage("save");

      const bookResponse = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResult.data.token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          category,
          image: uploadResult.url,
          description: description.trim(),
          totalCopies: copies,
        }),
      });

      const result = (await bookResponse.json()) as CreateBookResponse;

      if (!bookResponse.ok || !result.success || !result.book?._id) {
        throw new Error(result.message || "Unable to save the book.");
      }

      toast.success("Book added successfully!");
      router.push(`/books/${result.book._id}`);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to add book.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
      setSubmitStage(null);
    }
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
            Every book deserves a reader. Add a title from your collection
            and help someone discover their next favorite story.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
          <div className="rounded-2xl border border-[#E5EBE6] bg-white p-6 shadow-sm sm:p-10">
            <div className="mb-9 flex items-center gap-4 border-b border-[#E5EBE6] pb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E5F0E9]">
                <BookOpen size={27} className="text-[#07352C]" />
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

            <form onSubmit={handleSubmit} className="space-y-7" aria-busy={isSubmitting}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="book-title" className="mb-2 block text-sm font-semibold text-[#07352C]">
                    Book Title *
                  </label>
                  <input
                    id="book-title"
                    type="text"
                    required
                    maxLength={200}
                    value={title}
                    disabled={isSubmitting}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter book title"
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="book-author" className="mb-2 block text-sm font-semibold text-[#07352C]">
                    Author Name *
                  </label>
                  <input
                    id="book-author"
                    type="text"
                    required
                    maxLength={150}
                    value={author}
                    disabled={isSubmitting}
                    onChange={(event) => setAuthor(event.target.value)}
                    placeholder="Enter author name"
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="book-category" className="mb-2 block text-sm font-semibold text-[#07352C]">
                    Category *
                  </label>
                  <select
                    id="book-category"
                    required
                    value={category}
                    disabled={isSubmitting}
                    onChange={(event) => setCategory(event.target.value)}
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none focus:border-[#A34D32] disabled:opacity-60"
                  >
                    <option value="">Select category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="book-copies" className="mb-2 block text-sm font-semibold text-[#07352C]">
                    Total Copies *
                  </label>
                  <input
                    id="book-copies"
                    type="number"
                    min="1"
                    max="1000"
                    step="1"
                    required
                    value={totalCopies}
                    disabled={isSubmitting}
                    onChange={(event) => setTotalCopies(event.target.value)}
                    className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] px-4 text-sm text-[#07352C] outline-none focus:border-[#A34D32] disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="book-image" className="mb-3 block text-sm font-semibold text-[#07352C]">
                  Book Cover Image *
                </label>
                <div className="rounded-xl border-2 border-dashed border-[#D3DFD5] bg-[#F8FAF7] p-5 sm:p-7">
                  <input
                    ref={fileInputRef}
                    id="book-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={isSubmitting}
                    onChange={handleImageChange}
                    aria-describedby="book-image-help"
                    className="sr-only"
                  />
                  {image && previewUrl ? (
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                      <div className="relative h-48 w-36 shrink-0 overflow-hidden rounded-lg border border-[#DFE7E0] bg-white p-2 shadow-md">
                        <Image
                          src={previewUrl}
                          alt="Selected book cover preview"
                          fill
                          unoptimized
                          sizes="144px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
                          <CheckCircle2 size={20} className="text-[#167454]" />
                          <span className="text-sm font-semibold text-[#167454]">
                            Image Selected Successfully
                          </span>
                        </div>
                        <p className="break-all text-sm font-semibold text-[#07352C]">{image.name}</p>
                        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                          <span className="rounded-full bg-[#E2EEE5] px-3 py-1.5 text-xs font-medium text-[#167454]">
                            {image.type === "image/jpeg" ? "JPG" : image.type === "image/png" ? "PNG" : "WEBP"}
                          </span>
                          <span className="rounded-full bg-[#E9EEEA] px-3 py-1.5 text-xs font-medium text-[#64776D]">
                            {(image.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
                          <label
                            htmlFor="book-image"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#07352C] px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#145244]"
                          >
                            <RefreshCw size={15} /> Replace Image
                          </label>
                          <button
                            type="button"
                            onClick={removeImage}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#E1E8E2] bg-white px-4 py-3 text-xs font-semibold text-[#A34D32] transition-colors hover:bg-[#F8EDE9] disabled:opacity-60"
                          >
                            <Trash2 size={15} /> Remove Image
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#E7F0E8]">
                        <Upload size={29} className="text-[#A34D32]" />
                      </div>
                      <h3 className="font-serif mt-5 text-xl font-bold text-[#07352C]">
                        Upload Your Book Cover
                      </h3>
                      <p className="mt-3 text-sm text-[#829188]">
                        Choose a clear image of your book cover
                      </p>
                      <label
                        htmlFor="book-image"
                        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#07352C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
                      >
                        <FileImage size={17} /> Choose Image
                      </label>
                    </div>
                  )}
                  <p id="book-image-help" className="mt-5 text-center text-xs text-[#8A9B90]">
                    Supported formats: JPG, PNG, WEBP · Maximum size: 5 MB
                  </p>
                </div>
                {imageError && (
                  <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {imageError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="book-description" className="mb-2 block text-sm font-semibold text-[#07352C]">
                  Short Description *
                </label>
                <textarea
                  id="book-description"
                  required
                  rows={5}
                  maxLength={2000}
                  value={description}
                  disabled={isSubmitting}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Write a short description about this book..."
                  className="w-full resize-y rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] p-4 text-sm leading-7 text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] disabled:opacity-60"
                />
              </div>

              <div className="border-t border-[#E5EBE6] pt-8">
                <h3 className="font-serif text-xl font-bold text-[#07352C]">
                  Contributor Information
                </h3>
                <p className="mt-2 text-sm text-[#64776D]">
                  These fields are filled automatically from your logged-in account.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contributor-name" className="mb-2 block text-sm font-semibold text-[#07352C]">
                      User Name
                    </label>
                    <div className="relative">
                      <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]" />
                      <input
                        id="contributor-name"
                        type="text"
                        readOnly
                        value={session?.user.name ?? ""}
                        placeholder={isPending ? "Loading account..." : "Sign in required"}
                        className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#EDF2ED] pl-12 pr-4 text-sm text-[#64776D] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contributor-email" className="mb-2 block text-sm font-semibold text-[#07352C]">
                      User Email
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]" />
                      <input
                        id="contributor-email"
                        type="email"
                        readOnly
                        value={session?.user.email ?? ""}
                        placeholder={isPending ? "Loading account..." : "Sign in required"}
                        className="h-13 w-full rounded-lg border border-[#E1E8E2] bg-[#EDF2ED] pl-12 pr-4 text-sm text-[#64776D] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {error}
                </p>
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
                  disabled={isSubmitting || isPending || !session?.user}
                  className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#07352C] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#145244] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {submitStage === "upload" ? "Uploading Cover..." : "Saving Book..."}
                    </>
                  ) : (
                    <>
                      <BookOpen size={18} /> Add Book <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#07352C] p-8 text-white">
              <BookOpen size={34} className="text-[#E7C98D]" />
              <h2 className="font-serif mt-6 text-3xl font-bold">A Story Worth Sharing.</h2>
              <p className="mt-5 text-sm leading-8 text-[#C4D9CE]">
                Your contribution could help another reader discover a new world.
                Every shared book makes our community a little richer.
              </p>
              <div className="mt-8 space-y-4 border-t border-white/15 pt-7">
                {[
                  "Share your favorite stories",
                  "Help the reading community",
                  "Build a growing collection",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#D8E8DF]">
                    <CheckCircle2 size={18} className="shrink-0 text-[#E7C98D]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#E5EBE6] bg-white p-7">
              <div className="flex items-center gap-3">
                <Info size={22} className="text-[#A34D32]" />
                <h3 className="font-serif text-xl font-bold text-[#07352C]">Before You Submit</h3>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#64776D]">
                Make sure the book information is accurate, the cover image is clear,
                and the number of copies reflects what you want to share.
              </p>
              <p className="mt-5 text-xs leading-6 text-[#829188]">
                Your cover is uploaded securely, and your contribution is saved to MongoDB.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
