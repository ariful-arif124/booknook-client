
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  LibraryBig,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Novels, short stories, and imaginary worlds.",
    icon: BookOpen,
    background: "bg-[#07352C]",
    textColor: "text-white",
    iconBackground: "bg-white/10",
  },
  {
    name: "Science",
    description: "Discoveries, technology, and scientific ideas.",
    icon: FlaskConical,
    background: "bg-[#14273D]",
    textColor: "text-white",
    iconBackground: "bg-white/10",
  },
  {
    name: "History",
    description: "Explore the past, remarkable people, and events.",
    icon: Landmark,
    background: "bg-[#A34D32]",
    textColor: "text-white",
    iconBackground: "bg-white/10",
  },
  {
    name: "Kids",
    description: "Wonderful adventures for young readers.",
    icon: Baby,
    background: "bg-[#966018]",
    textColor: "text-white",
    iconBackground: "bg-white/10",
  },
  {
    name: "Others",
    description: "Personal growth, inspiration, and much more.",
    icon: LibraryBig,
    background: "bg-[#E5EAE7]",
    textColor: "text-[#07352C]",
    iconBackground: "bg-[#D2DED5]",
  },
];

export default function BookCategories() {
  return (
    <section
      id="book-categories"
      className="bg-[#F8FAF7] px-5 py-20 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#A34D32]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A34D32]">
                Curated Catalog
              </span>
            </div>

            <h2 className="font-serif text-4xl font-bold leading-tight text-[#07352C] sm:text-5xl">
              Where Will Your Curiosity Take You?
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#64776D] sm:text-base">
              Explore our carefully organized collections.
              Find stories, discoveries, and inspiration
              for every kind of reader.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#64776D]">
            <LibraryBig size={18} className="text-[#A34D32]" />
            <span>Explore 5 Categories</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/books?category=${category.name}`}
                className={`group flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${category.background} ${category.textColor}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBackground}`}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="opacity-60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-70">
                    Book Collection
                  </span>

                  <h3 className="font-serif mt-3 text-2xl font-bold">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-xs leading-6 opacity-80">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-current/15 pt-4">
                    <span className="text-xs font-semibold">
                      Explore Category
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
