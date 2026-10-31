
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage(
      "Login UI is ready. Authentication will be connected with Better Auth in a later step."
    );
  };

  const handleGoogleLogin = () => {
    setMessage(
      "Google authentication will be enabled when Better Auth is connected."
    );
  };

  return (
    <section className="bg-[#F8FAF7] px-5 py-14 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-[#E5EBE6] bg-white shadow-xl shadow-[#07352C]/5 lg:grid-cols-2">
        <div className="relative hidden min-h-[720px] flex-col justify-between overflow-hidden bg-[#07352C] p-12 text-white lg:flex">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#24604E]/40 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <BookOpen size={31} className="text-[#E7C98D]" />

              <span className="font-serif text-3xl font-bold">
                BookNook
              </span>
            </Link>
          </div>

          <div className="relative z-10">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <BookOpen
                size={43}
                strokeWidth={1.3}
                className="text-[#E7C98D]"
              />
            </div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <Sparkles size={15} className="text-[#E7C98D]" />

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E7C98D]">
                Your Reading Sanctuary
              </span>
            </div>

            <h2 className="font-serif max-w-md text-5xl font-bold leading-[1.2]">
              Your Next Chapter Starts Here.
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-8 text-[#C4D9CE]">
              Every great story begins somewhere.
              Reconnect with your favorite books,
              discover new perspectives, and share
              the joy of reading with our community.
            </p>
          </div>

          <div className="relative z-10">
            <div className="mb-6 h-px w-full bg-white/15" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E7C98D]">
              Discover · Borrow · Return
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14 lg:py-20">
          <div className="mb-10">
            <Link
              href="/"
              className="mb-9 inline-flex items-center gap-2 font-serif text-2xl font-bold text-[#07352C] lg:hidden"
            >
              <BookOpen size={26} className="text-[#A34D32]" />
              BookNook
            </Link>

            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F3EAE3] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
              Welcome to BookNook
            </span>

            <h1 className="font-serif text-4xl font-bold text-[#07352C] sm:text-5xl">
              Welcome Back.
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#64776D]">
              Enter your details to access your personal
              library and continue your reading journey.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2.5 block text-sm font-semibold text-[#07352C]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                />

                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-12 pr-4 text-sm text-[#07352C] outline-none transition-all placeholder:text-[#95A59A] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="text-sm font-semibold text-[#07352C]"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setMessage(
                      "Password recovery is not enabled for this assignment."
                    )
                  }
                  className="text-xs font-semibold text-[#A34D32] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-12 pr-12 text-sm text-[#07352C] outline-none transition-all placeholder:text-[#95A59A] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84988C] transition-colors hover:text-[#07352C]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#07352C] text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all hover:bg-[#145244]"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          {message && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-[#DFE8E0] bg-[#F1F6F1] p-4 text-sm leading-6 text-[#52685B]"
            >
              {message}
            </div>
          )}

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E5EBE6]" />

            <span className="text-xs font-medium text-[#89988D]">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-[#E5EBE6]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-[#E1E8E2] bg-white text-sm font-semibold text-[#07352C] transition-all hover:border-[#B9CFC0] hover:bg-[#F8FAF7]"
          >
            <FcGoogle size={23} />
            Continue with Google
          </button>

          <p className="mt-9 text-center text-sm text-[#64776D]">
            New to BookNook?{" "}
            <Link
              href="/register"
              className="inline-flex items-center gap-1 font-bold text-[#A34D32] hover:underline"
            >
              Create an Account
              <ArrowUpRight size={15} />
            </Link>
          </p>

          <div className="mt-10 border-t border-[#E5EBE6] pt-7 text-center">
            <p className="text-xs text-[#95A59A]">
              Your personal reading journey begins here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
