
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    badge: "THE LITERARY EXCHANGE",
    title: "Every Great Story Begins Somewhere.",
    description:
      "Discover extraordinary books, explore fresh perspectives, and uncover stories worth sharing. A quiet sanctuary for curious readers.",
    image:
      "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    book: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    background: "#F8FAF7",
  },
  {
    badge: "EXPLORE NEW HORIZONS",
    title: "Open a Book. Discover a New World.",
    description:
      "Step into a world of knowledge, imagination, and discovery. Find books that inspire you to see things differently.",
    image:
      "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    book: "A Brief History of Time",
    author: "Stephen Hawking",
    background: "#F5F3ED",
  },
  {
    badge: "SHARE THE JOY OF READING",
    title: "Great Books Are Better When Shared.",
    description:
      "Borrow stories, explore wonderful characters, and share your love of reading with the BookNook community.",
    image:
      "https://covers.openlibrary.org/b/isbn/9780064400558-L.jpg",
    book: "Charlotte's Web",
    author: "E. B. White",
    background: "#F9F3EE",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <section className="booknook-slider bg-[#F8FAF7]">
      <div className="relative mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) =>
            setActiveSlide(swiper.realIndex + 1)
          }
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.book}>
              <div
                style={{ backgroundColor: slide.background }}
                className="grid min-h-[620px] items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12"
              >
                <div className="max-w-xl">
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#EFECE7] px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#A34D32]" />
                    <span className="text-[10px] font-bold tracking-widest text-[#A34D32]">
                      {slide.badge}
                    </span>
                  </div>

                  <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[#07352C] sm:text-5xl xl:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-base leading-8 text-[#60736A]">
                    {slide.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-6">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-3 rounded-lg bg-[#07352C] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all hover:-translate-y-1 hover:bg-[#145244]"
                    >
                      Browse Books
                      <ArrowRight size={18} />
                    </Link>

                    <Link
                      href="/#how-it-works"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#07352C] hover:text-[#A34D32]"
                    >
                      <BookOpen
                        size={18}
                        className="text-[#A34D32]"
                      />
                      How It Works
                    </Link>
                  </div>

                  <div className="mt-12 flex items-center gap-3 border-t border-[#E4E9E2] pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DDE9E0]">
                      <BookOpen
                        size={20}
                        className="text-[#07352C]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#07352C]">
                        A community of readers
                      </p>
                      <p className="mt-1 text-xs text-[#829188]">
                        Discover • Borrow • Return
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex min-h-[410px] items-center justify-center sm:min-h-[500px]">
                  <div className="absolute h-[310px] w-[310px] rounded-full bg-[#DDE8DF] blur-3xl sm:h-[400px] sm:w-[400px]" />

                  <div className="absolute h-[340px] w-[235px] translate-x-7 rotate-6 rounded-xl bg-[#B5C5B8] shadow-lg sm:h-[400px] sm:w-[280px]" />

                  <div className="absolute h-[340px] w-[235px] -translate-x-5 -rotate-6 rounded-xl bg-[#D8C8AE] shadow-lg sm:h-[400px] sm:w-[280px]" />

                  <div className="relative z-10 h-[350px] w-[245px] rotate-[-3deg] overflow-hidden rounded-lg bg-white p-3 shadow-2xl sm:h-[420px] sm:w-[290px]">
                    <div className="relative h-full w-full bg-[#EBE9E1]">
                      <Image
                        src={slide.image}
                        alt={`${slide.book} by ${slide.author}`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 245px, 290px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 z-20 max-w-[230px] rounded-xl border border-[#E9ECE7] bg-white p-4 shadow-xl sm:bottom-4 sm:left-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
                      Featured Selection
                    </p>

                    <h3 className="font-serif mt-2 text-lg font-bold text-[#07352C]">
                      {slide.book}
                    </h3>

                    <p className="mt-1 text-xs text-[#829188]">
                      {slide.author}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute bottom-8 left-6 z-10 flex items-center gap-2 text-xs font-semibold text-[#07352C] lg:left-12">
          <span>{String(activeSlide).padStart(2, "0")}</span>
          <span className="text-[#B1BDB5]">/</span>
          <span className="text-[#8A9A90]">03</span>
        </div>
      </div>
    </section>
  );
}
