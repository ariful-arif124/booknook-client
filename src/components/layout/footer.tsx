

import Link from "next/link";
import { BookOpen, Mail, ArrowUpRight } from "lucide-react";
import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";


const footerLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "How It Works", href: "/#how-it-works" },
];


const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/ariful-arif124",
        icon: FaGithub,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: FaLinkedinIn,
    },
    {
        name: "X",
        href: "https://x.com/",
        icon: FaXTwitter,
    },
];

export default function Footer() {
    return (
        <footer className="bg-[#07352C] text-white">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
                <div>
                    <Link
                        href="/"
                        className="mb-6 flex items-center gap-3"
                    >
                        <BookOpen
                            size={28}
                            className="text-[#E7C98D]"
                        />

                        <span className="font-serif text-2xl font-bold">
                            BookNook
                        </span>
                    </Link>

                    <p className="max-w-sm text-sm leading-7 text-[#BFD4CA]">
                        A thoughtful literary sanctuary where
                        readers discover, share, and borrow
                        extraordinary stories. Every book deserves
                        a reader.
                    </p>

                    <div className="mt-7 flex items-center gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;

                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-[#D6E4DC] transition-all hover:-translate-y-1 hover:border-[#E7C98D] hover:text-[#E7C98D]"
                                >
                                    <Icon size={18} />
                                </a>
                            );
                        })}

                    </div>
                </div>

                <div>
                    <h3 className="font-serif mb-7 text-xl font-semibold">
                        Explore & Borrow
                    </h3>

                    <div className="flex flex-col items-start gap-4">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group flex items-center gap-2 text-sm text-[#BFD4CA] transition-colors hover:text-[#E7C98D]"
                            >
                                {link.name}

                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-serif mb-7 text-xl font-semibold">
                        The Exchange Desk
                    </h3>

                    <p className="max-w-xs text-sm leading-7 text-[#BFD4CA]">
                        Have questions about our book collection,
                        borrowing system, or reading community?
                        We would love to hear from you.
                    </p>

                    <a
                        href="mailto:your-email@example.com"
                        className="mt-6 inline-flex items-center gap-3 text-sm text-[#E7C98D] transition-colors hover:text-white"
                    >
                        <Mail size={18} />
                        <span>Contact Us</span>
                    </a>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-center text-xs text-[#A9C3B7] sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-10">
                    <p>© 2026 BookNook. All rights reserved.</p>

                    <p>Every story deserves a reader.</p>
                </div>
            </div>
        </footer>
    );
}
