
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Heart,
  PlusCircle,
} from "lucide-react";

export default function CommunityCTA() {
  return (
    <section className="bg-[#F8FAF7] px-5 py-20 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-[#07352C] px-7 py-14 shadow-xl shadow-[#07352C]/10 sm:px-12 sm:py-20 lg:px-20">
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -right-10 -top-12 h-64 w-64 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-[#215747]/40 blur-3xl" />

          <div className="pointer-events-none absolute bottom-10 right-12 hidden rotate-[-12deg] text-white/10 lg:block">
            <BookOpen size={230} strokeWidth={0.7} />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
              <Heart
                size={14}
                className="text-[#E7C98D]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E7C98D]">
                Community Book Bank
              </span>
            </div>

            <h2 className="font-serif max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Every Book Deserves a Reader.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-[#C5D9CF] sm:text-base">
              Bring a story to the community. Add a book
              from your personal collection and help
              another curious reader discover their next
              favorite story.
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Link
                href="/add-book"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#A34D32] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#BA6247]"
              >
                <PlusCircle size={18} />

                Share a Book

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#E1EDE5] transition-colors hover:text-[#E7C98D]"
              >
                Sign in to your account

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 text-xs text-[#B8D2C5]">
                <span className="h-2 w-2 rounded-full bg-[#E7C98D]" />
                Discover Stories
              </div>

              <div className="flex items-center gap-2 text-xs text-[#B8D2C5]">
                <span className="h-2 w-2 rounded-full bg-[#E7C98D]" />
                Share Knowledge
              </div>

              <div className="flex items-center gap-2 text-xs text-[#B8D2C5]">
                <span className="h-2 w-2 rounded-full bg-[#E7C98D]" />
                Inspire Readers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
