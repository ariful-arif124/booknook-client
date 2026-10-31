
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordRules = [
    {
      label: "At least 6 characters",
      valid: password.length >= 6,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(password),
    },
  ];

  const isPasswordValid = passwordRules.every(
    (rule) => rule.valid
  );

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim() || !email.trim() || !photoURL.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    setMessage(
      "Your form is valid. Account registration will be enabled when Better Auth is connected."
    );
  };

  const handleGoogleRegister = () => {
    setError("");
    setMessage(
      "Google registration will be enabled when Better Auth is connected."
    );
  };

  return (
    <section className="bg-[#F8FAF7] px-5 py-14 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-[#E5EBE6] bg-white shadow-xl shadow-[#07352C]/5 lg:grid-cols-2">
        <div className="relative hidden min-h-[850px] flex-col justify-between overflow-hidden bg-[#07352C] p-12 text-white lg:flex">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#24604E]/40 blur-3xl" />

          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-3"
          >
            <BookOpen size={31} className="text-[#E7C98D]" />
            <span className="font-serif text-3xl font-bold">
              BookNook
            </span>
          </Link>

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
                Join Our Reading Community
              </span>
            </div>

            <h2 className="font-serif max-w-md text-5xl font-bold leading-[1.2]">
              Every Reader Has a Story.
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-8 text-[#C4D9CE]">
              Create your personal reading space.
              Discover extraordinary books, share your
              favorite stories, and connect with a
              community that loves reading.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Discover incredible books",
                "Build your personal library",
                "Borrow and share stories",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#D8E8DF]"
                >
                  <CheckCircle2
                    size={20}
                    className="text-[#E7C98D]"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="mb-6 h-px bg-white/15" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E7C98D]">
              Discover · Borrow · Return
            </p>
          </div>
        </div>

        <div className="px-6 py-12 sm:px-12 lg:px-14 lg:py-16">
          <div className="mb-9">
            <Link
              href="/"
              className="mb-9 inline-flex items-center gap-2 font-serif text-2xl font-bold text-[#07352C] lg:hidden"
            >
              <BookOpen size={26} className="text-[#A34D32]" />
              BookNook
            </Link>

            <span className="mb-5 inline-flex items-center rounded-full bg-[#F3EAE3] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#A34D32]">
              Become a Member
            </span>

            <h1 className="font-serif text-4xl font-bold text-[#07352C] sm:text-5xl">
              Create an Account.
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#64776D]">
              Join BookNook and begin your journey
              through stories, knowledge, and discovery.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                />

                <input
                  id="register-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-14 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-12 pr-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                />

                <input
                  id="register-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-12 pr-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-photo"
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Photo URL
              </label>

              <div className="relative">
                <ImageIcon
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                />

                <input
                  id="register-photo"
                  type="url"
                  required
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="h-14 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-12 pr-4 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-semibold text-[#07352C]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84988C]"
                />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  aria-describedby="password-rules"
                  aria-invalid={!!error && !isPasswordValid}
                  placeholder="Create a strong password"
                  className="h-14 w-full rounded-lg border border-[#E1E8E2] bg-[#F8FAF7] pl-12 pr-12 text-sm text-[#07352C] outline-none placeholder:text-[#95A59A] focus:border-[#A34D32] focus:ring-2 focus:ring-[#A34D32]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84988C] hover:text-[#07352C]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <div
                id="password-rules"
                className="mt-4 space-y-2"
              >
                {passwordRules.map((rule) => (
                  <div
                    key={rule.label}
                    className="flex items-center gap-2"
                  >
                    {rule.valid ? (
                      <CheckCircle2
                        size={16}
                        className="text-[#167454]"
                      />
                    ) : (
                      <Circle
                        size={16}
                        className="text-[#9AA99E]"
                      />
                    )}

                    <span
                      className={`text-xs ${
                        rule.valid
                          ? "text-[#167454]"
                          : "text-[#87978C]"
                      }`}
                    >
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                role="status"
                className="rounded-lg border border-[#DFE8E0] bg-[#F1F6F1] p-4 text-sm leading-6 text-[#52685B]"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#07352C] text-sm font-semibold text-white shadow-lg shadow-[#07352C]/10 transition-all hover:bg-[#145244]"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E5EBE6]" />

            <span className="text-xs font-medium text-[#89988D]">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-[#E5EBE6]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-[#E1E8E2] bg-white text-sm font-semibold text-[#07352C] transition-all hover:border-[#B9CFC0] hover:bg-[#F8FAF7]"
          >
            <FcGoogle size={23} />
            Continue with Google
          </button>

          <p className="mt-9 text-center text-sm text-[#64776D]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-bold text-[#A34D32] hover:underline"
            >
              Sign In
              <ArrowUpRight size={15} />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
