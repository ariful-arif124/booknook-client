
import Link from "next/link";
import {
  Search,
  BookOpenCheck,
  RotateCcw,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Your Next Read",
    description:
      "Explore our growing collection of books. Browse different categories and discover stories that spark your curiosity.",
    icon: Search,
    color: "bg-[#F9E9D8]",
    iconColor: "text-[#A34D32]",
  },
  {
    number: "02",
    title: "Borrow With Ease",
    description:
      "Found something interesting? Choose an available book, confirm your borrowing request, and begin your reading journey.",
    icon: BookOpenCheck,
    color: "bg-[#E1EEE7]",
    iconColor: "text-[#17634D]",
  },
  {
    number: "03",
    title: "Return & Share Again",
    description:
      "When you finish reading, return your book to the collection so another curious reader can enjoy it too.",
    icon: RotateCcw,
    color: "bg-[#F6E8C9]",
    iconColor: "text-[#9C7029]",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#F1F5F1] px-5 py-20 sm:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#A34D32]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A34D32]">
              The Borrowing Journey
            </span>

            <span className="h-px w-8 bg-[#A34D32]" />
          </div>

          <h2 className="font-serif text-4xl font-bold leading-tight text-[#07352C] sm:text-5xl">
            From Shelf to Story,
            <br className="hidden sm:block" />
            {" "}in Three Simple Steps.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#64776D] sm:text-base">
            BookNook makes sharing stories simple.
            Discover a book, borrow it, and return it
            when you're ready to explore something new.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E3EAE3] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#C8D7CC] hover:shadow-xl hover:shadow-[#07352C]/5"
              >
                <div className="mb-12 flex items-start justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl ${step.color}`}
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.7}
                      className={step.iconColor}
                    />
                  </div>

                  <span className="font-serif text-5xl font-bold text-[#E5EBE6]">
                    {step.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif text-2xl font-bold text-[#07352C]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#64776D]">
                    {step.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A34D32]">
                      Step {step.number}
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="text-[#A34D32] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-[#64776D]">
            Your next great reading adventure is just a click away.
          </p>

          <Link
            href="/books"
            className="group inline-flex items-center gap-3 rounded-lg bg-[#07352C] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#A34D32]"
          >
            Explore Our Collection

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
