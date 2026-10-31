
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8EBE7] bg-[#F8FAF7]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <BookOpen
            size={28}
            strokeWidth={1.8}
            className="text-[#A34D32]"
          />

          <span className="font-serif text-2xl font-bold text-[#07352C]">
            BookNook
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl border border-[#E6EAE5] bg-[#F1F3EF] p-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#A34D32] text-white"
                  : "text-[#42534A] hover:bg-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-[#42534A] hover:text-[#A34D32]"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-md bg-[#07352C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#145244]"
          >
            Register
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#07352C] lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-[#E8EBE7] bg-[#F8FAF7] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-[#07352C] text-white"
                    : "text-[#42534A] hover:bg-[#EDF1EB]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#42534A]"
            >
              Log in
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#07352C] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
