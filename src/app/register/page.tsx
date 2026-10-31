
import type { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "BookNook | Register",
  description:
    "Create your BookNook account and join our reading community.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
