
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Link2, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LinkGooglePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isLinking, setIsLinking] = useState(false);
  const [error, setError] = useState("");

  const handleLinkGoogle = async () => {
    if (!session?.user || isLinking) return;

    setError("");
    setIsLinking(true);

    try {
      const { error: linkError } = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/",
      });

      if (linkError) {
        setError(
          linkError.message ||
            "Unable to link your Google account."
        );
      }
    } catch {
      setError(
        "Something went wrong while connecting Google."
      );
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#F8FAF7] px-5 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[#E5EBE6] bg-white p-8 shadow-xl shadow-[#07352C]/5 sm:p-12">
        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2EC]">
          <Link2 size={30} className="text-[#07352C]" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#07352C]">
          Connect Google Account
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#64776D]">
          Link your Google account to your existing BookNook
          profile so you can sign in with either method.
        </p>

        {isPending ? (
          <div className="mt-8 flex items-center gap-3 text-sm text-[#64776D]">
            <Loader2 size={20} className="animate-spin" />
            Checking your session...
          </div>
        ) : !session?.user ? (
          <div className="mt-8">
            <p className="mb-5 text-sm text-[#64776D]">
              Please sign in with your existing email and
              password before connecting Google.
            </p>

            <Link
              href="/login"
              className="flex h-14 items-center justify-center rounded-lg bg-[#07352C] font-semibold text-white hover:bg-[#145244]"
            >
              Sign In to BookNook
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <div className="mb-6 rounded-lg border border-[#DFE8E0] bg-[#F1F6F1] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64776D]">
                Signed in as
              </p>

              <p className="mt-2 font-semibold text-[#07352C]">
                {session.user.name}
              </p>

              <p className="mt-1 break-all text-sm text-[#64776D]">
                {session.user.email}
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleLinkGoogle}
              disabled={isLinking}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-[#E1E8E2] bg-white text-sm font-semibold text-[#07352C] transition-all hover:border-[#B9CFC0] hover:bg-[#F8FAF7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLinking ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Connecting Google...
                </>
              ) : (
                <>
                  <FcGoogle size={24} />
                  Connect Google Account
                </>
              )}
            </button>
          </div>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#A34D32] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
