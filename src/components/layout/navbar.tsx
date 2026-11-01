
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Loader2,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U"
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authError, setAuthError] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const navLinks = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  useEffect(() => {
    if (!profileOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
    };
  }, [profileOpen]);

  const closeMenus = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setAuthError("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setAuthError(
          error.message ||
            "Unable to sign out. Please try again."
        );
        return;
      }

      closeMenus();
      router.replace("/");
      router.refresh();
    } catch {
      setAuthError(
        "Unable to sign out. Please try again."
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8EBE7] bg-[#F8FAF7]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8 xl:px-10">
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <BookOpen
            size={28}
            strokeWidth={1.8}
            className="text-[#A34D32]"
          />

          <span className="font-serif text-2xl font-bold text-[#07352C]">
            BookNook
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-xl border border-[#E6EAE5] bg-[#F1F3EF] p-1 xl:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  active ? "page" : undefined
                }
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#A34D32] text-white shadow-sm"
                    : "text-[#42534A] hover:bg-white hover:text-[#07352C]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          {isPending ? (
            <div className="h-11 w-32 animate-pulse rounded-lg bg-[#E5EBE6]" />
          ) : user ? (
            <div
              ref={profileRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  setAuthError("");
                  setProfileOpen(!profileOpen);
                }}
                aria-label="Open account menu"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-controls="booknook-account-menu"
                className="flex items-center gap-3 rounded-xl border border-[#DCE7DE] bg-white px-3 py-2 transition-colors hover:bg-[#EDF3EC]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#07352C] text-xs font-bold text-white">
                  {getInitials(user.name)}
                </span>

                <span className="max-w-[125px] truncate text-sm font-semibold text-[#07352C]">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className="text-[#64776D]"
                />
              </button>

              {profileOpen && (
                <div
                  id="booknook-account-menu"
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-xl border border-[#E5EBE6] bg-white shadow-xl shadow-[#07352C]/10"
                >
                  <div className="border-b border-[#E5EBE6] bg-[#F8FAF7] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#07352C] font-bold text-white">
                        {getInitials(user.name)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#07352C]">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-[#64776D]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E4F2E9] px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#167454]" />

                      <span className="text-xs font-semibold text-[#167454]">
                        Signed In
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/my-books"
                      role="menuitem"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#42534A] transition-colors hover:bg-[#F1F5F1]"
                    >
                      <BookOpen size={17} />
                      My Books
                    </Link>

                    <Link
                      href="/my-borrows"
                      role="menuitem"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#42534A] transition-colors hover:bg-[#F1F5F1]"
                    >
                      <UserRound size={17} />
                      My Borrows
                    </Link>

                    <div className="my-2 border-t border-[#E5EBE6]" />

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-[#A34D32] transition-colors hover:bg-[#FCF1ED] disabled:opacity-60"
                    >
                      {isSigningOut ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <LogOut size={17} />
                      )}

                      {isSigningOut
                        ? "Signing Out..."
                        : "Sign Out"}
                    </button>

                    {authError && (
                      <p
                        role="alert"
                        className="px-4 pb-3 text-xs leading-5 text-red-600"
                      >
                        {authError}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/login"
                    ? "text-[#A34D32]"
                    : "text-[#42534A] hover:text-[#A34D32]"
                }`}
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
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E6EAE5] text-[#07352C] transition-colors hover:bg-[#EDF1EB] xl:hidden"
          aria-label={
            isOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={isOpen}
          aria-controls="booknook-mobile-menu"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {isOpen && (
        <nav
          id="booknook-mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-[#E8EBE7] bg-[#F8FAF7] px-5 py-5 shadow-lg xl:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {user && (
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#E5EBE6] bg-white p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#07352C] text-sm font-bold text-white">
                  {getInitials(user.name)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#07352C]">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-[#64776D]">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#A34D32] text-white"
                      : "text-[#42534A] hover:bg-[#EDF1EB]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="my-3 h-px bg-[#E6EAE5]" />

            {isPending ? (
              <p className="px-4 py-3 text-sm text-[#64776D]">
                Checking session...
              </p>
            ) : user ? (
              <>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#ECD9D1] bg-[#FCF1ED] px-4 py-3 text-sm font-semibold text-[#A34D32] disabled:opacity-60"
                >
                  {isSigningOut ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <LogOut size={17} />
                  )}

                  {isSigningOut
                    ? "Signing Out..."
                    : "Sign Out"}
                </button>

                {authError && (
                  <p
                    role="alert"
                    className="px-4 text-xs text-red-600"
                  >
                    {authError}
                  </p>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[#42534A] hover:bg-[#EDF1EB]"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#07352C] px-4 py-3 text-sm font-semibold text-white"
                >
                  Register
                  <ArrowUpRight size={16} />
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
