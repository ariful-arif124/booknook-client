
"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  House,
  RefreshCcw,
  ShieldAlert,
} from "lucide-react";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: Props) {
  useEffect(() => {
    console.error("BookNook Error:", error);
  }, [error]);

  return (
    <main
      role="alert"
      className="flex min-h-[75vh] items-center bg-[#F8FAF7] px-5 py-16 sm:py-20 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#E9D8CC] bg-[#F5EBE3] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#A34D32]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A34D32]">
                Something Went Wrong
              </span>
            </div>

            <h1 className="font-serif mt-8 max-w-xl text-4xl font-bold leading-[1.15] tracking-tight text-[#07352C] sm:text-5xl lg:text-6xl">
              A Little Plot Twist!
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#64776D]">
              Even the best stories have unexpected
              chapters. We encountered a problem while
              loading this page, but your reading journey
              doesn't have to end here.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#829188]">
              Please try again, or return to our library
              and continue discovering wonderful books.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#07352C] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#145244]"
              >
                <RefreshCcw size={18} />
                Try Again
                <ArrowRight size={17} />
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[#DCE7DE] bg-white px-7 py-4 text-sm font-semibold text-[#07352C] transition-colors hover:border-[#A34D32] hover:text-[#A34D32]"
              >
                <House size={18} />
                Back to Home
              </Link>
            </div>

            <div className="mt-12 flex items-start gap-3 border-t border-[#E3EAE3] pt-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5F0E9]">
                <ShieldAlert
                  size={19}
                  className="text-[#A34D32]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#07352C]">
                  Your library is still here.
                </p>

                <p className="mt-1 text-xs leading-6 text-[#829188]">
                  If the problem continues, please try
                  again later.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-[#EDF3EC]">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#D7E4D7]" />

              <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-[#D7E4D7]" />

              <div className="absolute left-8 top-9 flex items-center gap-2 rounded-full border border-[#DFE7DE] bg-white px-4 py-2 shadow-sm">
                <AlertTriangle
                  size={15}
                  className="text-[#A34D32]"
                />

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#829188]">
                  Unexpected Chapter
                </span>
              </div>

              <div className="relative flex h-[300px] w-[245px] items-center justify-center sm:h-[350px] sm:w-[290px]">
                <div className="absolute left-5 top-6 h-[235px] w-[175px] -rotate-12 rounded-xl border-[7px] border-white bg-[#C9D8C9] shadow-xl sm:h-[270px] sm:w-[205px]" />

                <div className="absolute right-4 top-8 h-[240px] w-[180px] rotate-12 rounded-xl border-[7px] border-white bg-[#D7BC9C] shadow-xl sm:h-[280px] sm:w-[215px]" />

                <div className="absolute z-10 flex h-[270px] w-[195px] -rotate-3 flex-col items-center justify-center rounded-xl border-[9px] border-white bg-[#07352C] px-5 text-center shadow-2xl sm:h-[320px] sm:w-[235px]">
                  <BookOpen
                    size={48}
                    strokeWidth={1.3}
                    className="text-[#E7C98D]"
                  />

                  <span className="font-serif mt-5 text-5xl font-bold text-white sm:text-6xl">
                    Oops!
                  </span>

                  <div className="mt-6 h-px w-16 bg-[#E7C98D]/70" />

                  <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C6D9CC]">
                    An Unexpected
                    <br />
                    Chapter
                  </span>
                </div>
              </div>

              <div className="absolute bottom-8 right-6 rounded-xl border border-[#E7EBE5] bg-white px-5 py-4 shadow-lg sm:right-10">
                <p className="font-serif text-sm font-bold text-[#07352C]">
                  Every story continues.
                </p>

                <p className="mt-1 text-xs text-[#829188]">
                  Let's get you back on track
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
