
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading BookNook content"
      className="min-h-screen bg-[#F8FAF7] px-5 py-14 lg:px-10"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5F0E9]">
            <BookOpen
              size={25}
              className="text-[#07352C]"
            />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#A34D32]">
            The Literary Exchange
          </span>
        </div>

        <div className="mt-10 max-w-3xl">
          <div className="h-12 w-3/4 rounded-lg bg-[#E0E9E1] sm:h-16" />

          <div className="mt-5 h-5 w-full max-w-xl rounded-md bg-[#EAF0EA]" />

          <div className="mt-3 h-5 w-2/3 rounded-md bg-[#EAF0EA]" />
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-8 w-48 rounded-md bg-[#E0E9E1]" />

          <div className="h-11 w-full rounded-lg bg-[#EAF0EA] sm:w-72" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#E5EBE6] bg-white p-4"
            >
              <div className="flex h-72 items-center justify-center rounded-xl bg-[#EDF2ED]">
                <div className="h-56 w-40 rounded-md bg-[#DDE7DF]" />
              </div>

              <div className="mt-5 h-3 w-20 rounded-full bg-[#E0E9E1]" />

              <div className="mt-5 h-6 w-4/5 rounded-md bg-[#E0E9E1]" />

              <div className="mt-3 h-4 w-2/3 rounded-md bg-[#EAF0EA]" />

              <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded-md bg-[#EAF0EA]" />

                <div className="h-3 w-4/5 rounded-md bg-[#EAF0EA]" />
              </div>

              <div className="mt-6 h-11 w-full rounded-lg bg-[#E0E9E1]" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">
        Loading your BookNook library. Please wait.
      </span>
    </main>
  );
}
