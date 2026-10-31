
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    House,
    SearchX,
    Sparkles,
} from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center overflow-hidden bg-[#F8FAF7] px-5 py-16 sm:py-20 lg:px-10">
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    <div className="max-w-xl">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#64776D] transition-colors hover:text-[#A34D32]"
                        >
                            <ArrowLeft size={17} />
                            Back to Home
                        </Link>

                        <div className="mt-12 flex w-fit items-center gap-3 rounded-full border border-[#E9D8CC] bg-[#F5EBE3] px-4 py-2">              <span className="h-2 w-2 rounded-full bg-[#A34D32]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A34D32]">
                                404 · Story Not Found
                            </span>
                        </div>

                        <h1 className="font-serif mt-8 text-4xl font-bold leading-[1.15] tracking-tight text-[#07352C] sm:text-5xl lg:text-6xl">
                            Oops! This Page Wandered Off the Shelf.
                        </h1>

                        <p className="mt-7 max-w-lg text-base leading-8 text-[#64776D]">
                            Even the best stories sometimes take an
                            unexpected turn. The page you're looking
                            for might have been moved, removed, or
                            never existed.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-[#829188]">
                            Don't worry, there are plenty of wonderful
                            books waiting to be discovered.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#07352C] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#145244]"
                            >
                                <House size={18} />
                                Back to Home
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                href="/books"
                                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[#DCE7DE] bg-white px-7 py-4 text-sm font-semibold text-[#07352C] transition-all duration-300 hover:border-[#A34D32] hover:text-[#A34D32]"
                            >
                                <BookOpen size={18} />
                                Explore Books
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-3 border-t border-[#E3EAE3] pt-7">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F0E9]">
                                <Sparkles
                                    size={19}
                                    className="text-[#A34D32]"
                                />
                            </div>

                            <p className="text-xs leading-6 text-[#829188]">
                                Every great reading adventure begins
                                with discovering something new.
                            </p>
                        </div>
                    </div>

                    <div className="relative mx-auto flex w-full max-w-[550px] items-center justify-center">
                        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-[#EDF3EC]">
                            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#D7E4D7]" />

                            <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full border border-[#D7E4D7]" />

                            <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-[#D7E4D7]" />

                            <div className="absolute left-10 top-12 flex items-center gap-2 rounded-full border border-[#DFE7DE] bg-white px-4 py-2 shadow-sm">
                                <SearchX
                                    size={15}
                                    className="text-[#A34D32]"
                                />

                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#829188]">
                                    Missing Chapter
                                </span>
                            </div>

                            <div className="relative flex h-[300px] w-[240px] items-center justify-center sm:h-[350px] sm:w-[290px]">
                                <div className="absolute left-5 top-7 h-[230px] w-[175px] rotate-[-18deg] rounded-xl border-[7px] border-white bg-[#C9D8C9] shadow-xl sm:h-[265px] sm:w-[205px]" />

                                <div className="absolute right-3 top-8 h-[240px] w-[180px] rotate-[15deg] rounded-xl border-[7px] border-white bg-[#D7BC9C] shadow-xl sm:h-[280px] sm:w-[215px]" />

                                <div className="absolute z-10 flex h-[270px] w-[195px] -rotate-3 flex-col items-center justify-center rounded-xl border-[9px] border-white bg-[#07352C] px-5 text-center shadow-2xl sm:h-[320px] sm:w-[235px]">
                                    <BookOpen
                                        size={50}
                                        strokeWidth={1.3}
                                        className="text-[#E7C98D]"
                                    />

                                    <span className="font-serif mt-5 text-6xl font-bold text-white sm:text-7xl">
                                        404
                                    </span>

                                    <div className="mt-5 h-px w-16 bg-[#E7C98D]/70" />

                                    <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6D9CC]">
                                        Lost Between
                                        <br />
                                        the Pages
                                    </span>
                                </div>
                            </div>

                            <div className="absolute bottom-10 right-8 rounded-xl border border-[#E7EBE5] bg-white px-5 py-4 shadow-lg sm:right-12">
                                <p className="font-serif text-sm font-bold text-[#07352C]">
                                    The story continues...
                                </p>

                                <p className="mt-1 text-xs text-[#829188]">
                                    Find your next chapter
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
