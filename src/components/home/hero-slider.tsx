
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { books } from "@/data/books";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    bookId: "7",
    badge: "THE LITERARY EXCHANGE",
    title: "Every Great Story Begins Somewhere.",
    description:
      "Discover extraordinary books, explore fresh perspectives, and uncover stories worth sharing. Your next literary adventure starts here.",
    background: "#F8FAF7",
    decoration: "#E3E9E0",
    image: "/images/night-circus.jpg",
  },
  {
    bookId: "9",
    badge: "DISCOVER NEW POSSIBILITIES",
    title: "Between the Pages, Find Another World.",
    description:
      "Step into a world of imagination, endless possibilities, and unforgettable characters. A beautiful story is always waiting.",
    background: "#F5F5F0",
    decoration: "#DEE4EA",
    image: null,
  },
  {
    bookId: "8",
    badge: "READ. DREAM. DISCOVER.",
    title: "Little Stories Can Hold Great Wonders.",
    description:
      "Travel beyond the ordinary. Discover timeless tales filled with imagination, wisdom, friendship, and unforgettable moments.",
    background: "#FBF7F1",
    decoration: "#E9DFCE",
    image: null,
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  return (
    <section className="booknook-slider overflow-hidden bg-[#F8FAF7]">
      <div className="relative mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.realIndex + 1);
          }}
          className="w-full"
        >
          {slides.map((slide, index) => {
            const book = books.find(
              (item) => item.id === slide.bookId
            );

            if (!book) return null;

            const imageSrc = slide.image || book.image;

            return (
              <SwiperSlide key={slide.bookId}>
                <div
                  className="grid min-h-[620px] items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12"
                  style={{
                    backgroundColor: slide.background,
                  }}
                >
                  <div className="relative z-10 max-w-xl">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#EFECE7] px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#A34D32]" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A34D32]">
                        {slide.badge}
                      </span>
                    </div>

                    <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[#07352C] sm:text-5xl xl:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-7 max-w-lg text-base leading-8 text-[#60736A]">
                      {slide.description}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-5">
                      <Link
                        href="/books"
                        className="group inline-flex items-center gap-3 rounded-lg bg-[#07352C] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all hover:-translate-y-1 hover:bg-[#145244]"
                      >
                        Browse Books

                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>

                      <Link
                        href="/#how-it-works"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#07352C] transition-colors hover:text-[#A34D32]"
                      >
                        <BookOpen
                          size={18}
                          className="text-[#A34D32]"
                        />

                        How It Works
                      </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-4 border-t border-[#E0E7DF] pt-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2EDE5]">
                        <BookOpen
                          size={21}
                          className="text-[#07352C]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#07352C]">
                          A community of curious readers
                        </p>

                        <p className="mt-1 text-xs text-[#829188]">
                          Discover • Borrow • Return
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex min-h-[400px] items-center justify-center sm:min-h-[480px]">
                    <div
                      className="absolute h-[330px] w-[330px] rounded-full blur-3xl sm:h-[410px] sm:w-[410px]"
                      style={{
                        backgroundColor: slide.decoration,
                      }}
                    />

                    <div className="absolute h-[330px] w-[235px] translate-x-10 rotate-6 rounded-xl border border-white/50 bg-[#AEC3B5] shadow-lg sm:h-[400px] sm:w-[280px]" />

                    <div className="absolute h-[330px] w-[235px] -translate-x-4 -rotate-6 rounded-xl border border-white/50 bg-[#D6C5AA] shadow-lg sm:h-[400px] sm:w-[280px]" />

                    <div className="relative z-10 h-[350px] w-[245px] rotate-[-2deg] overflow-hidden rounded-xl border-[10px] border-white bg-[#F2F2EC] shadow-2xl sm:h-[425px] sm:w-[295px]">
                      {failedImages.includes(book.id) ? (
                        <div className="flex h-full flex-col items-center justify-center gap-6 bg-[#102F29] px-5 text-center text-white">
                          <Sparkles
                            size={36}
                            className="text-[#E7C98D]"
                          />

                          <h2 className="font-serif text-3xl font-bold">
                            {book.title}
                          </h2>

                          <p className="text-sm text-[#D6E2D9]">
                            {book.author}
                          </p>

                          <BookOpen
                            size={48}
                            className="text-[#E7C98D]"
                          />
                        </div>
                      ) : (
                        <Image
                          src={imageSrc}
                          alt={`${book.title} by ${book.author}`}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 640px) 245px, 295px"
                          className="object-contain"
                          onError={() => {
                            setFailedImages((current) =>
                              current.includes(book.id)
                                ? current
                                : [...current, book.id]
                            );
                          }}
                        />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 z-20 max-w-[245px] rounded-xl border border-[#E8ECE7] bg-white p-5 shadow-xl sm:bottom-4 sm:left-2">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles
                          size={13}
                          className="text-[#A34D32]"
                        />

                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
                          Featured Selection
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold leading-snug text-[#07352C]">
                        {book.title}
                      </h3>

                      <p className="mt-2 text-xs text-[#829188]">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="pointer-events-none absolute bottom-7 left-6 z-10 flex items-center gap-2 text-xs font-semibold text-[#07352C] lg:left-12">
          <span>
            {String(activeSlide).padStart(2, "0")}
          </span>

          <span className="text-[#A9B9AF]">/</span>

          <span className="text-[#87988C]">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
