
import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "BookNook | Login",
  description:
    "Sign in to BookNook and access your personal library.",
};

export default function LoginPage() {
  return <LoginForm />;
}
